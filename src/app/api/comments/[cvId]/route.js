import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// CV'nin onaylanmış yorumlarını getir
export async function GET(request, { params }) {
  try {
    const { cvId } = await params;

    // CV'nin var olduğunu kontrol et
    const cv = await prisma.cV.findUnique({
      where: { id: cvId },
      select: { id: true, slug: true },
    });

    if (!cv) {
      return NextResponse.json({ error: "CV bulunamadı" }, { status: 404 });
    }

    // Sadece onaylanmış yorumları getir
    const comments = await prisma.comment.findMany({
      where: {
        cvId,
        status: "approved",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        authorName: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("Yorumlar getirme hatası:", error);
    return NextResponse.json(
      { error: "Yorumlar yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
