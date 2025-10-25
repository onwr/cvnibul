import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Saat müsaitlik kontrolü
export async function POST(request) {
  try {
    console.log("🔍 [CHECK API] Müsaitlik kontrolü başladı");

    const body = await request.json();
    console.log("📥 [CHECK API] Request body:", body);

    const { cvId, appointmentDate } = body;

    if (!cvId || !appointmentDate) {
      console.log("❌ [CHECK API] cvId veya appointmentDate eksik");
      return NextResponse.json(
        { error: "cvId ve appointmentDate gerekli" },
        { status: 400 }
      );
    }

    // Aynı tarih/saatte randevu var mı kontrol et
    const appointmentDateObj = new Date(appointmentDate);
    console.log("📅 [CHECK API] Tarih objesi:", appointmentDateObj);
    console.log("🔑 [CHECK API] cvId:", cvId);

    console.log("🔍 [CHECK API] Prisma sorgusu başlıyor...");
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        cvId,
        appointmentDate: appointmentDateObj,
        status: { not: "cancelled" },
      },
    });
    console.log("📊 [CHECK API] Mevcut randevu:", existingAppointment);

    if (existingAppointment) {
      console.log("❌ [CHECK API] Saat dolu");
      return NextResponse.json({
        available: false,
        message: "Bu saat için zaten bir randevu var",
      });
    }

    console.log("✅ [CHECK API] Saat müsait");
    return NextResponse.json({
      available: true,
      message: "Bu saat müsait",
    });
  } catch (error) {
    console.error("❌ [CHECK API] HATA:", error);
    console.error("❌ [CHECK API] Stack:", error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
