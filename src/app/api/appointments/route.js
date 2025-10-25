import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// POST - Randevu oluştur (Public)
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      cvId,
      serviceId,
      serviceName,
      appointmentDate,
      customerName,
      customerSurname,
      customerPhone,
      customerEmail,
      notes,
    } = body;

    // Validasyon
    if (
      !cvId ||
      !serviceName ||
      !appointmentDate ||
      !customerName ||
      !customerSurname ||
      !customerPhone
    ) {
      return NextResponse.json(
        { error: "Gerekli alanlar eksik" },
        { status: 400 }
      );
    }

    // Telefon formatı kontrolü
    const phoneRegex = /^(\+90|0)?5\d{9}$/;
    if (!phoneRegex.test(customerPhone)) {
      return NextResponse.json(
        { error: "Geçerli bir telefon numarası girin" },
        { status: 400 }
      );
    }

    // CV var mı kontrol et
    const cv = await prisma.cV.findUnique({
      where: { id: cvId, isPublished: true, isActive: true },
    });

    if (!cv) {
      return NextResponse.json({ error: "CV bulunamadı" }, { status: 404 });
    }

    // Aynı tarih/saatte randevu var mı kontrol et
    const appointmentDateObj = new Date(appointmentDate);
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        cvId,
        appointmentDate: appointmentDateObj,
        status: { not: "cancelled" },
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { error: "Bu saat için zaten bir randevu var" },
        { status: 409 }
      );
    }

    // Randevu oluştur
    const appointment = await prisma.appointment.create({
      data: {
        cvId,
        serviceId,
        serviceName,
        appointmentDate: appointmentDateObj,
        customerName,
        customerSurname,
        customerPhone,
        customerEmail,
        notes,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET - CV sahibinin randevularını listele (Auth required)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // User'ın CV'sini bul
    const cv = await prisma.cV.findUnique({
      where: { userId: session.user.id },
    });

    if (!cv) {
      return NextResponse.json({ error: "CV bulunamadı" }, { status: 404 });
    }

    // Query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status") || null;

    // Where clause
    const where = {
      cvId: cv.id,
      ...(status && { status }),
    };

    // Randevuları getir
    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        orderBy: { appointmentDate: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.appointment.count({ where }),
    ]);

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
    console.error("Get appointments error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
