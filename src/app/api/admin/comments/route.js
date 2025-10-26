import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Admin kontrolü (email ile)
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",") || [];

async function isAdmin(session) {
  return session?.user?.email && ADMIN_EMAILS.includes(session.user.email);
}

// Tüm yorumları getir (admin)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAdmin(session))) {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;

    // Filtreleme
    const where = status === "all" ? {} : { status };

    // Yorumları getir
    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          cv: {
            select: {
              id: true,
              slug: true,
              ad: true,
              soyad: true,
            },
          },
        },
      }),
      prisma.comment.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      comments,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Admin yorumlar getirme hatası:", error);
    return NextResponse.json(
      { error: "Yorumlar yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// Yorum onayla
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAdmin(session))) {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 401 }
      );
    }

    const { commentId } = await request.json();

    if (!commentId) {
      return NextResponse.json({ error: "Yorum ID gerekli" }, { status: 400 });
    }

    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { status: "approved" },
    });

    return NextResponse.json({
      success: true,
      message: "Yorum onaylandı",
      comment,
    });
  } catch (error) {
    console.error("Yorum onaylama hatası:", error);
    return NextResponse.json(
      { error: "Yorum onaylanırken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// Yorum reddet
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAdmin(session))) {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 401 }
      );
    }

    const { commentId } = await request.json();

    if (!commentId) {
      return NextResponse.json({ error: "Yorum ID gerekli" }, { status: 400 });
    }

    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { status: "rejected" },
    });

    return NextResponse.json({
      success: true,
      message: "Yorum reddedildi",
      comment,
    });
  } catch (error) {
    console.error("Yorum reddetme hatası:", error);
    return NextResponse.json(
      { error: "Yorum reddedilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// Yorum sil
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAdmin(session))) {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("id");

    if (!commentId) {
      return NextResponse.json({ error: "Yorum ID gerekli" }, { status: 400 });
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    return NextResponse.json({
      success: true,
      message: "Yorum silindi",
    });
  } catch (error) {
    console.error("Yorum silme hatası:", error);
    return NextResponse.json(
      { error: "Yorum silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
