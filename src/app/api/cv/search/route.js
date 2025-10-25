import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    // Minimum 3 karakter kontrolü
    if (query.length < 3) {
      return NextResponse.json({ results: [] });
    }

    // Public CV'leri ara
    const results = await prisma.cV.findMany({
      where: {
        isPublished: true,
        isActive: true,
        OR: [
          { ad: { contains: query } },
          { soyad: { contains: query } },
          { meslek: { contains: query } },
        ],
      },
      select: {
        slug: true,
        ad: true,
        soyad: true,
        meslek: true,
        profilFoto: true,
        customization: true, // profilePhoto için
      },
      take: 10,
      orderBy: { viewCount: "desc" },
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("CV search error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
