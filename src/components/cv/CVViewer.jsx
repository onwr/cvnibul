"use client";

import { useState, useEffect } from "react";
import TemplateRenderer from "./TemplateRenderer";
import AppointmentModal from "./AppointmentModal";

export default function CVViewer({ cv }) {
  const [likeCount, setLikeCount] = useState(cv.likeCount || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  // LocalStorage'dan beğeni durumunu kontrol et
  useEffect(() => {
    const liked = localStorage.getItem(`cv-liked-${cv.slug}`);
    if (liked === "true") {
      setHasLiked(true);
    }
  }, [cv.slug]);

  const handleLike = async () => {
    if (hasLiked || isLiking) return;

    setIsLiking(true);
    try {
      const response = await fetch(`/api/cv/${cv.slug}/like`, {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        setLikeCount(data.likeCount);
        setHasLiked(true);
        localStorage.setItem(`cv-liked-${cv.slug}`, "true");
      }
    } catch (error) {
      console.error("Beğeni hatası:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleAppointmentClick = (service) => {
    setSelectedService(service);
    setIsAppointmentModalOpen(true);
  };

  const handleCommentSubmit = async (commentData) => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...commentData,
          cvId: cv.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        return data;
      } else {
        throw new Error(data.error || "Yorum gönderilirken bir hata oluştu");
      }
    } catch (error) {
      console.error("Yorum gönderme hatası:", error);
      throw error;
    }
  };

  return (
    <div>
      <TemplateRenderer
        formData={cv.formData}
        templateType="sidebar"
        customization={cv.customization}
        isEditing={false}
        viewCount={cv.viewCount}
        likeCount={likeCount}
        onLikeClick={handleLike}
        onAppointmentClick={handleAppointmentClick}
        comments={cv.comments || []}
        onCommentSubmit={handleCommentSubmit}
      />

      {/* Appointment Modal */}
      {isAppointmentModalOpen && (
        <AppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
          service={selectedService}
          cvId={cv.id}
          cvOwner={{ name: cv.ad, surname: cv.soyad }}
        />
      )}
    </div>
  );
}
