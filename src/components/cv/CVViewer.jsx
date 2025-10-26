"use client";

import { useState, useEffect } from "react";
import TemplateRenderer from "./TemplateRenderer";
import AppointmentModal from "./AppointmentModal";
import {
  FiHeart,
  FiLoader,
  FiMessageSquare,
  FiUser,
  FiMail,
  FiSend,
} from "react-icons/fi";

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
        comments={[]}
        onCommentSubmit={handleCommentSubmit}
      />

      {/* Yorumlar Bölümü - CV'nin altında */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CommentsSection
          comments={cv.comments || []}
          onCommentSubmit={handleCommentSubmit}
        />
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

// Comments Section Component
function CommentsSection({ comments, onCommentSubmit }) {
  const [commentForm, setCommentForm] = useState({
    authorName: "",
    authorEmail: "",
    content: "",
  });
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (
      !commentForm.authorName.trim() ||
      !commentForm.authorEmail.trim() ||
      !commentForm.content.trim()
    ) {
      alert("Lütfen tüm alanları doldurun");
      return;
    }

    setIsSubmittingComment(true);
    try {
      await onCommentSubmit(commentForm);
      setCommentForm({
        authorName: "",
        authorEmail: "",
        content: "",
      });
      alert("Yorumunuz admin onayına gönderildi. Teşekkürler!");
    } catch (error) {
      console.error("Yorum gönderme hatası:", error);
      alert("Bir hata oluştu");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FiMessageSquare className="text-blue-500" />
        Yorumlar ({comments.length})
      </h2>

      {/* Yorum Listesi */}
      {comments.length > 0 ? (
        <div className="space-y-4 mb-8">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {comment.authorName}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 mb-8">
          <FiMessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            Henüz yorum yapılmamış. İlk yorumu siz yapın!
          </p>
        </div>
      )}

      {/* Yorum Formu */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Yorum Yap</h3>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adınız *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={commentForm.authorName}
                  onChange={(e) =>
                    setCommentForm({
                      ...commentForm,
                      authorName: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="Adınızı girin"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={commentForm.authorEmail}
                  onChange={(e) =>
                    setCommentForm({
                      ...commentForm,
                      authorEmail: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yorumunuz *
            </label>
            <textarea
              value={commentForm.content}
              onChange={(e) =>
                setCommentForm({ ...commentForm, content: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 resize-none"
              placeholder="Yorumunuzu buraya yazın..."
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmittingComment}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isSubmittingComment ? (
                <FiLoader className="w-4 h-4 animate-spin" />
              ) : (
                <FiSend className="w-4 h-4" />
              )}
              {isSubmittingComment ? "Gönderiliyor..." : "Yorum Gönder"}
            </button>
          </div>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          * Yorumunuz admin onayından sonra yayınlanacaktır.
        </p>
      </div>
    </div>
  );
}
