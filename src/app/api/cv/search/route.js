import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const meslek = searchParams.get("meslek") || "";
    const sehir = searchParams.get("sehir") || "";
    const yetenek = searchParams.get("yetenek") || "";

    // Filtreleme koşulları
    const whereConditions = {
      isPublished: true,
      isActive: true,
    };

    // Arama sorgusu varsa
    if (query.length >= 3) {
      const normalizedQuery = query.trim().toLowerCase();
      const words = normalizedQuery.split(/\s+/).filter((w) => w.length > 0);

      const searchConditions = words.flatMap((word) => [
        { ad: { contains: word } },
        { soyad: { contains: word } },
        { meslek: { contains: word } },
      ]);

      whereConditions.OR =
        searchConditions.length > 0
          ? searchConditions
          : [
              { ad: { contains: normalizedQuery } },
              { soyad: { contains: normalizedQuery } },
              { meslek: { contains: normalizedQuery } },
            ];
    }

    // Meslek filtresi
    if (meslek) {
      whereConditions.meslek = { contains: meslek };
    }

    const results = await prisma.cV.findMany({
      where: whereConditions,
      select: {
        slug: true,
        ad: true,
        soyad: true,
        meslek: true,
        profilFoto: true,
        customization: true,
        formData: true,
      },
      take: 50,
      orderBy: { viewCount: "desc" },
    });

    // Şehir ve yetenek filtreleri için client-side filtreleme
    let filteredResults = results;

    if (sehir) {
      filteredResults = filteredResults.filter((cv) => {
        const cities = cv.formData?.yasadigiYerler || [];
        return cities.some((city) =>
          city.sehir?.toLowerCase().includes(sehir.toLowerCase())
        );
      });
    }

    if (yetenek) {
      filteredResults = filteredResults.filter((cv) => {
        const skills = cv.formData?.yetenekler || [];
        return skills.some((skill) =>
          skill.ad?.toLowerCase().includes(yetenek.toLowerCase())
        );
      });
    }

    // formData'yı sonuçlardan çıkar (frontend'e gönderme)
    const cleanedResults = filteredResults.map(({ formData, ...rest }) => rest);

    return NextResponse.json({ results: cleanedResults });
  } catch (error) {
    console.error("CV search error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
