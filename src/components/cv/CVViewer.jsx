"use client";

import { useState, useEffect } from "react";
import TemplateRenderer from "./TemplateRenderer";
import AppointmentModal from "./AppointmentModal";
import { FiHeart, FiLoader } from "react-icons/fi";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <TemplateRenderer
        formData={cv.formData}
        templateType="sidebar"
        customization={cv.customization}
        isEditing={false}
        viewCount={cv.viewCount}
        onAppointmentClick={handleAppointmentClick}
      />

      {/* Stats Counter */}
      <div className="fixed bottom-2 right-2 md:bottom-4 md:right-4 flex flex-col gap-2 z-50">
        {/* View Counter */}
        <div className="bg-white rounded-lg shadow-lg px-2 py-1 md:px-4 md:py-2">
          <p className="text-xs md:text-sm text-gray-600">
            Görüntülenme:{" "}
            <span className="font-bold text-blue-600">{cv.viewCount}</span>
          </p>
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          disabled={hasLiked || isLiking}
          className={`bg-white rounded-lg shadow-lg px-2 py-2 md:px-4 md:py-3 flex items-center gap-1 md:gap-2 transition-all ${
            hasLiked || isLiking
              ? "cursor-not-allowed opacity-70"
              : "hover:shadow-xl hover:scale-105 active:scale-95"
          }`}
        >
          {isLiking ? (
            <FiLoader className="w-4 h-4 md:w-5 md:h-5 animate-spin text-gray-600" />
          ) : (
            <FiHeart
              className={`w-4 h-4 md:w-5 md:h-5 transition-all ${
                hasLiked
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600 hover:text-red-500"
              }`}
            />
          )}
          <span
            className={`font-bold text-xs md:text-sm ${
              hasLiked ? "text-red-500" : "text-gray-700"
            }`}
          >
            {likeCount}
          </span>
          {hasLiked && (
            <span className="hidden md:inline text-xs text-gray-500">
              Beğendin
            </span>
          )}
        </button>
      </div>

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
