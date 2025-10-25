import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// PATCH - Randevu durumunu güncelle (Auth required)
export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { status } = body;

    // Geçerli status değerleri
    const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Geçersiz status değeri" },
        { status: 400 }
      );
    }

    // Randevuyu bul
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        cv: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Randevu bulunamadı" },
        { status: 404 }
      );
    }

    // CV sahibi mi kontrol et
    if (appointment.cv.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Randevu durumunu güncelle
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Update appointment error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Randevu sil (Auth required)
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Randevuyu bul
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        cv: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Randevu bulunamadı" },
        { status: 404 }
      );
    }

    // CV sahibi mi kontrol et
    if (appointment.cv.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Randevuyu sil
    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Randevu silindi",
    });
  } catch (error) {
    console.error("Delete appointment error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
