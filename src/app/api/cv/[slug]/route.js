import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { slug } = params;

    const cv = await prisma.cV.findUnique({
      where: {
        slug,
        isPublished: true,
        isActive: true,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (!cv) {
      return NextResponse.json({ error: "CV bulunamadı" }, { status: 404 });
    }

    // View count artır
    await prisma.cV.update({
      where: { id: cv.id },
      data: { viewCount: cv.viewCount + 1 },
    });

    return NextResponse.json({ cv });
  } catch (error) {
    console.error("Public CV error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
