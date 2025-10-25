import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request, { params }) {
  try {
    const { slug } = params;

    // CV'yi bul
    const cv = await prisma.cV.findUnique({
      where: {
        slug,
        isPublished: true,
        isActive: true,
      },
    });

    if (!cv) {
      return NextResponse.json({ error: "CV bulunamadı" }, { status: 404 });
    }

    // Like count artır
    const updatedCV = await prisma.cV.update({
      where: { id: cv.id },
      data: { likeCount: cv.likeCount + 1 },
    });

    return NextResponse.json({
      success: true,
      likeCount: updatedCV.likeCount,
    });
  } catch (error) {
    console.error("Like error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

