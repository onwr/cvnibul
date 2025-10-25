import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Admin kontrolü (email ile)
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",") || [];

async function isAdmin(session) {
  return session && ADMIN_EMAILS.includes(session.user.email);
}

// GET - Tüm randevuları listele
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAdmin(session))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const where = status !== "all" ? { status } : {};

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        cv: {
          select: {
            id: true,
            ad: true,
            soyad: true,
            slug: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { appointmentDate: "desc" },
    });

    const total = await prisma.appointment.count({ where });

    return NextResponse.json({
      appointments,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Admin GET appointments error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH - Randevu durumu güncelle
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAdmin(session))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { appointmentId, status } = await request.json();

    if (!appointmentId || !status) {
      return NextResponse.json(
        { error: "Randevu ID ve durum gerekli" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Geçersiz durum" }, { status: 400 });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status,
        updatedAt: new Date(),
      },
      include: {
        cv: {
          select: {
            ad: true,
            soyad: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Randevu durumu güncellendi",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Admin PATCH appointment error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Randevu sil
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAdmin(session))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const appointmentId = searchParams.get("id");

    if (!appointmentId) {
      return NextResponse.json(
        { error: "Randevu ID gerekli" },
        { status: 400 }
      );
    }

    await prisma.appointment.delete({
      where: { id: appointmentId },
    });

    return NextResponse.json({
      success: true,
      message: "Randevu silindi",
    });
  } catch (error) {
    console.error("Admin DELETE appointment error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
