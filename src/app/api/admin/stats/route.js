import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Admin kontrolü (email ile)
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",") || [];

async function isAdmin(session) {
  return session && ADMIN_EMAILS.includes(session.user.email);
}

// GET - İstatistikleri getir
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAdmin(session))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Temel istatistikler
    const [
      totalCVs,
      totalUsers,
      pendingPhotos,
      totalAppointments,
      publishedCVs,
      totalViews,
      totalLikes,
    ] = await Promise.all([
      prisma.cV.count(),
      prisma.user.count(),
      prisma.photoApproval.count({ where: { status: "pending" } }),
      prisma.appointment.count(),
      prisma.cV.count({ where: { isPublished: true } }),
      prisma.cV.aggregate({
        _sum: { viewCount: true },
      }),
      prisma.cV.aggregate({
        _sum: { likeCount: true },
      }),
    ]);

    // En çok görüntülenen CV'ler
    const topViewedCVs = await prisma.cV.findMany({
      select: {
        id: true,
        ad: true,
        soyad: true,
        slug: true,
        viewCount: true,
      },
      orderBy: { viewCount: "desc" },
      take: 10,
    });

    // En çok beğenilen CV'ler
    const topLikedCVs = await prisma.cV.findMany({
      select: {
        id: true,
        ad: true,
        soyad: true,
        slug: true,
        likeCount: true,
      },
      orderBy: { likeCount: "desc" },
      take: 10,
    });

    // Son 7 gün randevu istatistiği
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentAppointments = await prisma.appointment.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        createdAt: true,
        status: true,
      },
    });

    // Günlük randevu sayıları
    const dailyAppointments = {};
    recentAppointments.forEach((apt) => {
      const date = apt.createdAt.toISOString().split("T")[0];
      if (!dailyAppointments[date]) {
        dailyAppointments[date] = { total: 0, confirmed: 0 };
      }
      dailyAppointments[date].total++;
      if (apt.status === "confirmed") {
        dailyAppointments[date].confirmed++;
      }
    });

    // Son 30 gün CV oluşturma istatistiği
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentCVs = await prisma.cV.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Günlük CV oluşturma sayıları
    const dailyCVs = {};
    recentCVs.forEach((cv) => {
      const date = cv.createdAt.toISOString().split("T")[0];
      dailyCVs[date] = (dailyCVs[date] || 0) + 1;
    });

    // Durum bazlı randevu istatistikleri
    const appointmentStats = await prisma.appointment.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

    const statusStats = {};
    appointmentStats.forEach((stat) => {
      statusStats[stat.status] = stat._count.status;
    });

    return NextResponse.json({
      totalCVs,
      totalUsers,
      pendingPhotos,
      totalAppointments,
      publishedCVs,
      totalViews: totalViews._sum.viewCount || 0,
      totalLikes: totalLikes._sum.likeCount || 0,
      topViewedCVs,
      topLikedCVs,
      dailyAppointments,
      dailyCVs,
      statusStats,
      recentStats: {
        cvGrowth: recentCVs.length,
        appointmentGrowth: recentAppointments.length,
      },
    });
  } catch (error) {
    console.error("Admin GET stats error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
