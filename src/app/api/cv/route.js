import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// GET - Kullanıcının CV'sini getir
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cv = await prisma.cV.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json({ cv });
  } catch (error) {
    console.error("GET CV error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Yeni CV oluştur veya güncelle
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { slug, formData, customization, templateId } = data;

    // Slug unique kontrolü
    const existingCV = await prisma.cV.findUnique({
      where: { slug },
    });

    if (existingCV && existingCV.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Bu URL zaten kullanılıyor" },
        { status: 400 }
      );
    }

    // CV oluştur veya güncelle
    const cv = await prisma.cV.upsert({
      where: { userId: session.user.id },
      update: {
        slug,
        ad: formData.ad,
        soyad: formData.soyad,
        email: formData.iletisim?.email,
        telefon: formData.iletisim?.telefon,
        adres: formData.adres,
        dogumTarihi: formData.dogumTarihi,
        meslek: formData.ozelMeslek || formData.meslek,
        haritaLat: formData.haritaKonumu?.lat,
        haritaLng: formData.haritaKonumu?.lng,
        profilFoto: customization.profilePhoto,
        hayatHikayesi: formData.hayatHikayesi,
        formData,
        customization,
        templateId,
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        slug,
        ad: formData.ad,
        soyad: formData.soyad,
        email: formData.iletisim?.email,
        telefon: formData.iletisim?.telefon,
        adres: formData.adres,
        dogumTarihi: formData.dogumTarihi,
        meslek: formData.ozelMeslek || formData.meslek,
        haritaLat: formData.haritaKonumu?.lat,
        haritaLng: formData.haritaKonumu?.lng,
        profilFoto: customization.profilePhoto,
        hayatHikayesi: formData.hayatHikayesi,
        formData,
        customization,
        templateId,
      },
    });

    return NextResponse.json({ cv });
  } catch (error) {
    console.error("POST CV error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
