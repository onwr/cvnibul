import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Admin fotoğraf onay sistemi
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { photoId, userId, action, photoUrl, userName } =
      await request.json();

    if (action === "create") {
      // Yeni fotoğraf onay kaydı oluştur (admin kontrolü gerekmez)
      const photoApproval = await prisma.photoApproval.create({
        data: {
          photoId: photoId.toString(),
          photoUrl: photoUrl || "",
          userId,
          userName: userName || "Bilinmeyen Kullanıcı",
          status: "pending",
        },
      });

      return NextResponse.json({
        success: true,
        message: "Fotoğraf onay için eklendi",
        photoApproval,
      });
    }

    // Admin kontrolü (sadece approve/reject için)
    const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
    if (!adminEmails.includes(session.user.email)) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    if (action === "approve") {
      // Mevcut fotoğraf onayını güncelle
      const photoApproval = await prisma.photoApproval.updateMany({
        where: {
          photoId: photoId.toString(),
          userId,
          status: "pending",
        },
        data: {
          approvedBy: session.user.email,
          approvedAt: new Date(),
          status: "approved",
        },
      });

      // CV'deki fotoğrafı güncelle
      const cv = await prisma.cV.findFirst({
        where: { userId },
      });

      console.log("===== DEBUG: Photo Approval =====");
      console.log("PhotoID:", photoId, "Type:", typeof photoId);
      console.log("UserID:", userId);
      console.log("CV Found:", !!cv);

      if (cv) {
        const customization = cv.customization || {};
        const photoGallery = customization.photoGallery || [];

        console.log("PhotoGallery length:", photoGallery.length);
        console.log(
          "PhotoGallery IDs:",
          photoGallery.map((p) => ({ id: p.id, type: typeof p.id }))
        );

        // Fotoğrafı onaylı olarak işaretle (string karşılaştırması)
        const updatedPhotoGallery = photoGallery.map((photo) => {
          const matches = String(photo.id) === String(photoId);
          console.log(
            `Comparing photo.id=${
              photo.id
            } (${typeof photo.id}) with photoId=${photoId} (${typeof photoId}), matches=${matches}`
          );

          return matches
            ? {
                ...photo,
                adminApproved: true,
                approvedAt: new Date().toISOString(),
              }
            : photo;
        });

        console.log(
          "Updated count:",
          updatedPhotoGallery.filter((p) => p.adminApproved).length
        );

        await prisma.cV.update({
          where: { id: cv.id },
          data: {
            customization: {
              ...customization,
              photoGallery: updatedPhotoGallery,
            },
          },
        });

        console.log("CV updated successfully");
      } else {
        console.log("CV not found for userId:", userId);
      }

      return NextResponse.json({
        success: true,
        message: "Fotoğraf onaylandı",
        photoApproval,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Photo approval error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Bekleyen fotoğrafları listele
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admin kontrolü
    const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
    if (!adminEmails.includes(session.user.email)) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    // Tüm fotoğrafları getir (kullanıcı bilgisi ile)
    const pendingPhotos = await prisma.photoApproval.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ pendingPhotos });
  } catch (error) {
    console.error("Get pending photos error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Fotoğraf reddetme
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { photoId, userId, action } = await request.json();

    // Admin kontrolü
    const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
    if (!adminEmails.includes(session.user.email)) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    if (action === "reject") {
      // Fotoğrafı reddet
      const photoApproval = await prisma.photoApproval.updateMany({
        where: {
          photoId: photoId.toString(),
          userId,
          status: "pending",
        },
        data: {
          status: "rejected",
          approvedBy: session.user.email,
          approvedAt: new Date(),
        },
      });

      // CV'deki fotoğrafı kaldır
      const cv = await prisma.cV.findFirst({
        where: { userId },
      });

      console.log("===== DEBUG: Photo Rejection =====");
      console.log("PhotoID:", photoId, "Type:", typeof photoId);
      console.log("UserID:", userId);
      console.log("CV Found:", !!cv);

      if (cv) {
        const customization = cv.customization || {};
        const photoGallery = customization.photoGallery || [];

        console.log("PhotoGallery length before:", photoGallery.length);

        // Fotoğrafı galeriden kaldır (string karşılaştırması)
        const updatedPhotoGallery = photoGallery.filter(
          (photo) => String(photo.id) !== String(photoId)
        );

        console.log("PhotoGallery length after:", updatedPhotoGallery.length);

        await prisma.cV.update({
          where: { id: cv.id },
          data: {
            customization: {
              ...customization,
              photoGallery: updatedPhotoGallery,
            },
          },
        });

        console.log("CV updated - photo removed");
      } else {
        console.log("CV not found for userId:", userId);
      }

      return NextResponse.json({
        success: true,
        message: "Fotoğraf reddedildi",
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Photo rejection error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
