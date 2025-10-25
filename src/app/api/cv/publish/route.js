import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cv = await prisma.cV.update({
      where: { userId: session.user.id },
      data: {
        isPublished: true,
        publishedAt: new Date(),
      },
    });

    return NextResponse.json({ cv });
  } catch (error) {
    console.error("Publish CV error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
