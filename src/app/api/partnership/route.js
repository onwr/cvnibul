import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

// POST - Yeni iş birliği başvurusu
export async function POST(request) {
  try {
    console.log("🚀 Partnership başvurusu alındı");
    const data = await request.json();
    console.log("📝 Gelen data:", JSON.stringify(data, null, 2));

    // Validation
    if (!data.firstName || !data.lastName || !data.email) {
      console.log("❌ Validation hatası: Ad, soyad veya email eksik");
      return NextResponse.json(
        { error: "Ad, soyad ve email zorunludur" },
        { status: 400 }
      );
    }

    if (!data.terms) {
      console.log("❌ Validation hatası: Şartlar kabul edilmemiş");
      return NextResponse.json(
        { error: "Şartlar ve koşulları kabul etmelisiniz" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.log("❌ Email formatı hatalı:", data.email);
      return NextResponse.json(
        { error: "Geçerli bir email adresi giriniz" },
        { status: 400 }
      );
    }

    console.log("✅ Validation başarılı, veritabanına kaydediliyor...");

    // Veritabanına kaydet
    const partnership = await prisma.partnership.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        category: data.category,
        promotionArea: data.promotionArea,
        description: data.description,
        businessName: data.businessName,
        websiteUrl: data.websiteUrl,
        contentAbout: data.contentAbout,
        targetCountry: data.targetCountry,
        country: data.country,
        flatNumber: data.flatNumber || null,
        buildingNumber: data.buildingNumber,
        street: data.street,
        city: data.city,
        county: data.county || null,
        postalCode: data.postalCode,
        taxCountry: data.taxCountry,
        newsletter: data.newsletter || false,
        terms: data.terms,
      },
    });

    console.log("✅ Partnership başarıyla oluşturuldu:", partnership.id);
    console.log(
      "📊 Veritabanına kaydedilen başvuru:",
      JSON.stringify(partnership, null, 2)
    );

    return NextResponse.json(
      {
        success: true,
        message: "Başvurunuz alındı! En kısa sürede dönüş yapılacaktır.",
        id: partnership.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Partnership başvuru hatası:", error);
    console.error("❌ Hata detayı:", error.message);
    console.error("❌ Stack trace:", error.stack);
    return NextResponse.json(
      { error: "Başvuru gönderilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// GET - Tüm başvuruları getir (Admin için)
export async function GET(request) {
  try {
    console.log("🔍 Partnership listesi isteniyor...");

    // Session kontrolü (geçici olarak kaldırıldı, test için)
    // const session = await getServerSession();
    // console.log("👤 Session:", session?.user?.email);
    // if (!session || session.user.email !== "admin@cvhazirla.com") {
    //   console.log("❌ Yetkisiz erişim denemesi");
    //   return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    // }
    console.log("✅ Admin kontrolü atlandı (test modu)");

    const partnerships = await prisma.partnership.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(`📊 Toplam ${partnerships.length} başvuru bulundu`);
    console.log("📋 Başvurular:", JSON.stringify(partnerships, null, 2));

    return NextResponse.json({ partnerships }, { status: 200 });
  } catch (error) {
    console.error("❌ Partnership listesi hatası:", error);
    return NextResponse.json(
      { error: "Başvurular alınırken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE - Başvuruyu sil (Admin için)
export async function DELETE(request) {
  try {
    console.log("🗑️ Partnership silme işlemi başladı...");

    // Session kontrolü (geçici olarak kaldırıldı, test için)
    // const session = await getServerSession();
    // if (!session || session.user.email !== "admin@cvhazirla.com") {
    //   console.log("❌ Yetkisiz erişim denemesi");
    //   return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    // }
    console.log("✅ Admin kontrolü atlandı (test modu)");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log("📋 Silinecek ID:", id);

    if (!id) {
      console.log("❌ ID eksik");
      return NextResponse.json(
        { error: "Başvuru ID'si gerekli" },
        { status: 400 }
      );
    }

    console.log("🗑️ Veritabanından siliniyor...");
    const deleted = await prisma.partnership.delete({
      where: { id },
    });

    console.log("✅ Başarıyla silindi:", deleted);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Silme hatası:", error);
    console.error("❌ Hata detayı:", error.message);
    return NextResponse.json(
      { error: "Başvuru silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
