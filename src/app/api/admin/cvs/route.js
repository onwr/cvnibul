import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Admin kontrolü (email ile)
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",") || [];

async function isAdmin(session) {
  return session && ADMIN_EMAILS.includes(session.user.email);
}

// GET - Tüm CV'leri listele
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAdmin(session))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const where = search
      ? {
          OR: [
            { ad: { contains: search } },
            { soyad: { contains: search } },
            { email: { contains: search } },
            { slug: { contains: search } },
          ],
        }
      : {};

    const [cvs, total] = await Promise.all([
      prisma.cV.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.cV.count({ where }),
    ]);

    return NextResponse.json({
      cvs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Admin GET CVs error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - CV sil
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAdmin(session))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const cvId = searchParams.get("id");

    await prisma.cV.delete({
      where: { id: cvId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin DELETE CV error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH - CV güncelle
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAdmin(session))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cvId, updates } = await request.json();

    if (!cvId || !updates) {
      return NextResponse.json(
        { error: "CV ID ve güncelleme verileri gerekli" },
        { status: 400 }
      );
    }

    // CV'yi güncelle
    const updatedCV = await prisma.cV.update({
      where: { id: cvId },
      data: {
        ...updates,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "CV başarıyla güncellendi",
      cv: updatedCV,
    });
  } catch (error) {
    console.error("Admin PATCH CV error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
