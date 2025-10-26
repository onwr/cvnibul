import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Yorum oluşturma
export async function POST(request) {
  try {
    const { content, authorName, authorEmail, cvId } = await request.json();

    // Validasyon
    if (!content || !authorName || !authorEmail || !cvId) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur" },
        { status: 400 }
      );
    }

    // Email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authorEmail)) {
      return NextResponse.json(
        { error: "Geçerli bir email adresi giriniz" },
        { status: 400 }
      );
    }

    // CV'nin var olduğunu kontrol et
    const cv = await prisma.cV.findUnique({
      where: { id: cvId },
    });

    if (!cv) {
      return NextResponse.json({ error: "CV bulunamadı" }, { status: 404 });
    }

    // Yorumu oluştur
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        authorName: authorName.trim(),
        authorEmail: authorEmail.trim(),
        cvId,
        status: "pending", // Admin onayına gönder
      },
    });

    return NextResponse.json({
      success: true,
      message: "Yorumunuz admin onayına gönderildi",
      comment: {
        id: comment.id,
        content: comment.content,
        authorName: comment.authorName,
        createdAt: comment.createdAt,
      },
    });
  } catch (error) {
    console.error("Yorum oluşturma hatası:", error);
    return NextResponse.json(
      { error: "Yorum oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}
