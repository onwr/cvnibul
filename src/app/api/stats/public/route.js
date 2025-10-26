import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("📊 Public stats isteniyor...");

    const [totalUsers, viewCountData] = await Promise.all([
      prisma.user.count(),
      prisma.cV.aggregate({
        _sum: {
          viewCount: true,
        },
      }),
    ]);

    const totalVisitors = viewCountData._sum.viewCount || 0;

    console.log(
      `✅ Stats: ${totalUsers} kullanıcı, ${totalVisitors} ziyaretçi`
    );

    return NextResponse.json({
      totalUsers,
      totalVisitors,
    });
  } catch (error) {
    console.error("❌ Public stats hatası:", error);
    return NextResponse.json(
      { error: "İstatistikler alınamadı" },
      { status: 500 }
    );
  }
}
