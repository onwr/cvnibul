import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CVViewer from "@/components/cv/CVViewer";
import Navigation from "@/components/cv/Navigation";

async function getCVData(slug) {
  try {
    const cv = await prisma.cV.findUnique({
      where: {
        slug,
        isPublished: true,
        isActive: true,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        comments: {
          where: { status: "approved" },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            content: true,
            authorName: true,
            createdAt: true,
          },
        },
      },
    });

    if (!cv) {
      return null;
    }

    // View count artır
    await prisma.cV.update({
      where: { id: cv.id },
      data: { viewCount: cv.viewCount + 1 },
    });

    return cv;
  } catch (error) {
    console.error("CV yükleme hatası:", error);
    return null;
  }
}

export default async function CVPage({ params }) {
  const { slug } = await params; // Next.js 15 uyumluluğu
  const cv = await getCVData(slug);

  if (!cv) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation isScrolled={false} />

      {/* CV Content - Navbar için padding ekle */}
      <div>
        <CVViewer cv={cv} />
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params; // Next.js 15 uyumluluğu
  const cv = await getCVData(slug);

  if (!cv) {
    return {
      title: "CV Bulunamadı",
    };
  }

  return {
    title: `${cv.ad} ${cv.soyad} - CV`,
    description: cv.meslek || "Profesyonel CV",
  };
}
