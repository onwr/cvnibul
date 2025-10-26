"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiTrash2,
  FiEye,
  FiLoader,
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiImage,
  FiCalendar,
  FiBarChart,
  FiEdit,
  FiCheck,
  FiX,
  FiZoomIn,
  FiMessageSquare,
  FiEdit3,
} from "react-icons/fi";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Tab state
  const [activeTab, setActiveTab] = useState("cvs");

  // CV Management
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });

  // Photo Approval
  const [pendingPhotos, setPendingPhotos] = useState([]);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [photoFilter, setPhotoFilter] = useState("all");

  // Appointments
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentFilter, setAppointmentFilter] = useState("all");

  // Stats
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // Comments
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentFilter, setCommentFilter] = useState("all");

  // CV Edit Modal
  const [editingCV, setEditingCV] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      if (activeTab === "cvs") {
        loadCVs();
      } else if (activeTab === "photos") {
        loadPendingPhotos();
      } else if (activeTab === "appointments") {
        loadAppointments();
      } else if (activeTab === "stats") {
        loadStats();
      } else if (activeTab === "comments") {
        loadComments();
      }
    }
  }, [
    session,
    activeTab,
    page,
    search,
    appointmentFilter,
    photoFilter,
    commentFilter,
  ]);

  const loadCVs = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/cvs?page=${page}&limit=10&search=${search}`
      );

      if (response.status === 401) {
        alert("Bu sayfayı görüntülemek için yetkiniz yok");
        router.push("/");
        return;
      }

      const data = await response.json();
      setCvs(data.cvs || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error("CV'ler yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadPendingPhotos = async () => {
    setPhotosLoading(true);
    try {
      const response = await fetch("/api/admin/photo-approval");

      if (response.ok) {
        const data = await response.json();
        setPendingPhotos(data.pendingPhotos || []);
      }
    } catch (error) {
      console.error("Fotoğraflar yüklenemedi:", error);
    } finally {
      setPhotosLoading(false);
    }
  };

  const loadAppointments = async () => {
    setAppointmentsLoading(true);
    try {
      const response = await fetch(
        `/api/admin/appointments?status=${appointmentFilter}`
      );

      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.error("Randevular yüklenemedi:", error);
    } finally {
      setAppointmentsLoading(false);
    }
  };

  const loadStats = async () => {
    setStatsLoading(true);
    try {
      const response = await fetch("/api/admin/stats");

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("İstatistikler yüklenemedi:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const loadComments = async () => {
    setCommentsLoading(true);
    try {
      const response = await fetch(
        `/api/admin/comments?status=${commentFilter}`
      );

      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error("Yorumlar yüklenemedi:", error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleDeleteCV = async (cvId) => {
    if (!confirm("Bu CV'yi silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/cvs?id=${cvId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("CV başarıyla silindi");
        loadCVs();
      } else {
        alert("CV silinirken bir hata oluştu");
      }
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Bir hata oluştu");
    }
  };

  const handleApprovePhoto = async (photoId, userId) => {
    try {
      const response = await fetch("/api/admin/photo-approval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoId, userId, action: "approve" }),
      });

      if (response.ok) {
        alert("Fotoğraf onaylandı");
        loadPendingPhotos();
      } else {
        alert("Fotoğraf onaylanırken bir hata oluştu");
      }
    } catch (error) {
      console.error("Onaylama hatası:", error);
      alert("Bir hata oluştu");
    }
  };

  const handleRejectPhoto = async (photoId, userId) => {
    if (!confirm("Bu fotoğrafı reddetmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch("/api/admin/photo-approval", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoId, userId, action: "reject" }),
      });

      if (response.ok) {
        alert("Fotoğraf reddedildi");
        loadPendingPhotos();
      } else {
        alert("Fotoğraf reddedilirken bir hata oluştu");
      }
    } catch (error) {
      console.error("Reddetme hatası:", error);
      alert("Bir hata oluştu");
    }
  };

  const handleUpdateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/appointments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId, status: newStatus }),
      });

      if (response.ok) {
        alert("Randevu durumu güncellendi");
        loadAppointments();
      } else {
        alert("Randevu güncellenirken bir hata oluştu");
      }
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      alert("Bir hata oluştu");
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (!confirm("Bu randevuyu silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/appointments?id=${appointmentId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("Randevu silindi");
        loadAppointments();
      } else {
        alert("Randevu silinirken bir hata oluştu");
      }
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Bir hata oluştu");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadCVs();
  };

  const handleEditCV = (cv) => {
    setEditingCV(cv);
    setShowEditModal(true);
  };

  const handleEditTemplate = (cv) => {
    // CV verisini encode ederek templates sayfasına yönlendir
    const cvData = encodeURIComponent(
      JSON.stringify({
        cvId: cv.id,
        userId: cv.user.id, // cv.user.id olarak düzeltildi
        formData: cv.formData,
        customization: cv.customization,
        slug: cv.slug,
        themeId: cv.themeId || cv.templateId || "tech",
        isPublished: cv.isPublished,
        isActive: cv.isActive,
        isAdminEdit: true, // Admin düzenleme bayrağı
      })
    );

    // Yeni sekmede templates sayfasını aç
    window.open(`/templates?adminEdit=${cvData}`, "_blank");
  };

  const handleSaveCV = async (updates) => {
    try {
      const response = await fetch("/api/admin/cvs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvId: editingCV.id,
          updates,
        }),
      });

      if (response.ok) {
        alert("CV başarıyla güncellendi");
        setShowEditModal(false);
        setEditingCV(null);
        loadCVs();
      } else {
        alert("CV güncellenirken bir hata oluştu");
      }
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      alert("Bir hata oluştu");
    }
  };

  const handleApproveComment = async (commentId) => {
    try {
      const response = await fetch("/api/admin/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
      });

      if (response.ok) {
        alert("Yorum onaylandı");
        loadComments();
      } else {
        alert("Yorum onaylanırken bir hata oluştu");
      }
    } catch (error) {
      console.error("Onaylama hatası:", error);
      alert("Bir hata oluştu");
    }
  };

  const handleRejectComment = async (commentId) => {
    if (!confirm("Bu yorumu reddetmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch("/api/admin/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
      });

      if (response.ok) {
        alert("Yorum reddedildi");
        loadComments();
      } else {
        alert("Yorum reddedilirken bir hata oluştu");
      }
    } catch (error) {
      console.error("Reddetme hatası:", error);
      alert("Bir hata oluştu");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Bu yorumu silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/comments?id=${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Yorum silindi");
        loadComments();
      } else {
        alert("Yorum silinirken bir hata oluştu");
      }
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Bir hata oluştu");
    }
  };

  const tabs = [
    {
      id: "cvs",
      name: "CV Yönetimi",
      icon: FiFileText,
      badge: pagination.total,
    },
    {
      id: "photos",
      name: "Fotoğraf Onayı",
      icon: FiImage,
      badge: pendingPhotos.filter((p) => p.status === "pending").length,
    },
    {
      id: "appointments",
      name: "Randevular",
      icon: FiCalendar,
      badge: appointments.length,
    },
    {
      id: "stats",
      name: "İstatistikler",
      icon: FiBarChart,
    },
    {
      id: "comments",
      name: "Yorumlar",
      icon: FiMessageSquare,
      badge: comments.filter((c) => c.status === "pending").length,
    },
  ];

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <FiLoader className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Tüm sistemi yönetin</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setPage(1);
                  }}
                  className={`flex-1 px-6 py-4 text-sm font-semibold transition-all relative ${
                    activeTab === tab.id
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon className="w-5 h-5" />
                    <span className="hidden md:inline">{tab.name}</span>
                    {tab.badge > 0 && (
                      <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "cvs" && (
            <motion.div
              key="cvs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CVManagementTab
                cvs={cvs}
                loading={loading}
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
                pagination={pagination}
                page={page}
                setPage={setPage}
                handleDelete={handleDeleteCV}
                handleEdit={handleEditCV}
                handleEditTemplate={handleEditTemplate}
              />
            </motion.div>
          )}

          {activeTab === "photos" && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PhotoApprovalTab
                photos={pendingPhotos}
                loading={photosLoading}
                filter={photoFilter}
                setFilter={setPhotoFilter}
                onApprove={handleApprovePhoto}
                onReject={handleRejectPhoto}
                setLightboxPhoto={setLightboxPhoto}
              />
            </motion.div>
          )}

          {activeTab === "appointments" && (
            <motion.div
              key="appointments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AppointmentsTab
                appointments={appointments}
                loading={appointmentsLoading}
                filter={appointmentFilter}
                setFilter={setAppointmentFilter}
                onUpdateStatus={handleUpdateAppointmentStatus}
                onDelete={handleDeleteAppointment}
              />
            </motion.div>
          )}

          {activeTab === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <StatsTab stats={stats} loading={statsLoading} />
            </motion.div>
          )}

          {activeTab === "comments" && (
            <motion.div
              key="comments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CommentsTab
                comments={comments}
                loading={commentsLoading}
                filter={commentFilter}
                setFilter={setCommentFilter}
                onApprove={handleApproveComment}
                onReject={handleRejectComment}
                onDelete={handleDeleteComment}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>

      {/* CV Edit Modal */}
      {showEditModal && editingCV && (
        <CVEditModal
          cv={editingCV}
          onClose={() => {
            setShowEditModal(false);
            setEditingCV(null);
          }}
          onSave={handleSaveCV}
        />
      )}

      {/* Photo Lightbox */}
      {lightboxPhoto && (
        <PhotoLightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
        />
      )}
    </div>
  );
}

// CV Management Tab Component
function CVManagementTab({
  cvs,
  loading,
  search,
  setSearch,
  handleSearch,
  pagination,
  page,
  setPage,
  handleDelete,
  handleEdit,
  handleEditTemplate,
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <FiLoader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ad, soyad, email veya slug ile ara..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Ara
          </button>
        </form>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Toplam CV
          </h3>
          <p className="text-3xl font-bold text-blue-600">{pagination.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Bu Sayfa</h3>
          <p className="text-3xl font-bold text-green-600">{cvs.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Toplam Sayfa
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {pagination.pages}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ad Soyad
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Görüntülenme
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cvs.map((cv) => (
                <tr key={cv.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {cv.user.name}
                      </div>
                      <div className="text-gray-500">{cv.user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {cv.ad} {cv.soyad}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {cv.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cv.isPublished ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Yayında
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Taslak
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cv.viewCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTemplate(cv)}
                        className="text-purple-600 hover:text-purple-900 flex items-center gap-1"
                        title="Şablonu Düzenle"
                      >
                        <FiEdit3 />
                      </button>
                      <button
                        onClick={() => handleEdit(cv)}
                        className="text-green-600 hover:text-green-900 flex items-center gap-1"
                        title="Düzenle"
                      >
                        <FiEdit />
                      </button>
                      <Link
                        href={`/${cv.slug}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        title="Görüntüle"
                      >
                        <FiEye />
                      </Link>
                      <button
                        onClick={() => handleDelete(cv.id)}
                        className="text-red-600 hover:text-red-900 flex items-center gap-1"
                        title="Sil"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Sayfa {pagination.page} / {pagination.pages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => setPage(Math.min(pagination.pages, page + 1))}
                disabled={page === pagination.pages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Photo Approval Tab Component
function PhotoApprovalTab({
  photos,
  loading,
  filter,
  setFilter,
  onApprove,
  onReject,
  setLightboxPhoto,
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <FiLoader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Filter photos based on status
  const filteredPhotos = photos.filter((photo) => {
    if (filter === "all") return true;
    return photo.status === filter;
  });

  if (filteredPhotos.length === 0) {
    return (
      <div className="space-y-6">
        {/* Filter */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex gap-2">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status === "all"
                  ? "Tümü"
                  : status === "pending"
                  ? "Bekleyen"
                  : status === "approved"
                  ? "Onaylanmış"
                  : "Reddedilmiş"}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FiImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {filter === "all"
              ? "Fotoğraf Yok"
              : `${
                  filter === "pending"
                    ? "Bekleyen"
                    : filter === "approved"
                    ? "Onaylanmış"
                    : "Reddedilmiş"
                } Fotoğraf Yok`}
          </h3>
          <p className="text-gray-600">
            {filter === "all"
              ? "Hiçbir fotoğraf bulunmuyor."
              : `${
                  filter === "pending"
                    ? "Onay bekleyen"
                    : filter === "approved"
                    ? "Onaylanmış"
                    : "Reddedilmiş"
                } hiçbir fotoğraf bulunmuyor.`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status === "all"
                ? "Tümü"
                : status === "pending"
                ? "Bekleyen"
                : status === "approved"
                ? "Onaylanmış"
                : "Reddedilmiş"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-video bg-gray-100">
              <img
                src={photo.photoUrl}
                alt="Bekleyen fotoğraf"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setLightboxPhoto(photo)}
                className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
              >
                <FiZoomIn className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-gray-900">
                  {photo.userName}
                </h3>
                <p className="text-sm text-gray-600">
                  {new Date(photo.createdAt).toLocaleDateString("tr-TR")}
                </p>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      photo.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : photo.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {photo.status === "approved"
                      ? "✓ Onaylandı"
                      : photo.status === "rejected"
                      ? "✗ Reddedildi"
                      : "⏳ Bekliyor"}
                  </span>
                </div>
              </div>
              {photo.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => onApprove(photo.photoId, photo.userId)}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <FiCheck /> Onayla
                  </button>
                  <button
                    onClick={() => onReject(photo.photoId, photo.userId)}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <FiX /> Reddet
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Appointments Tab Component
function AppointmentsTab({
  appointments,
  loading,
  filter,
  setFilter,
  onUpdateStatus,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <FiLoader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "cancelled", "completed"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status === "all"
                  ? "Tümü"
                  : status === "pending"
                  ? "Bekleyen"
                  : status === "confirmed"
                  ? "Onaylandı"
                  : status === "cancelled"
                  ? "İptal"
                  : "Tamamlandı"}
              </button>
            )
          )}
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  CV Sahibi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Müşteri
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Tarih/Saat
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Hizmet
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Durum
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {apt.cv.ad} {apt.cv.soyad}
                      </div>
                      <Link
                        href={`/${apt.cv.slug}`}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {apt.cv.slug}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {apt.customerName} {apt.customerSurname}
                      </div>
                      <div className="text-gray-600">{apt.customerPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(apt.appointmentDate).toLocaleString("tr-TR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {apt.serviceName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={apt.status}
                      onChange={(e) => onUpdateStatus(apt.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-2 py-1 text-gray-900"
                    >
                      <option value="pending">Bekleyen</option>
                      <option value="confirmed">Onaylandı</option>
                      <option value="cancelled">İptal</option>
                      <option value="completed">Tamamlandı</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onDelete(apt.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Sil"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Stats Tab Component
function StatsTab({ stats, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <FiLoader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Toplam CV
          </h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalCVs}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Toplam Kullanıcı
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalUsers}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Bekleyen Fotoğraf
          </h3>
          <p className="text-3xl font-bold text-orange-600">
            {stats.pendingPhotos}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Toplam Randevu
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {stats.totalAppointments}
          </p>
        </div>
      </div>

      {/* Top CVs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            En Çok Görüntülenen CV'ler
          </h3>
          <div className="space-y-3">
            {stats.topViewedCVs?.map((cv, index) => (
              <div
                key={cv.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {cv.ad} {cv.soyad}
                    </div>
                    <Link
                      href={`/${cv.slug}`}
                      target="_blank"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {cv.slug}
                    </Link>
                  </div>
                </div>
                <span className="font-semibold text-blue-600">
                  {cv.viewCount} görüntülenme
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            En Çok Beğenilen CV'ler
          </h3>
          <div className="space-y-3">
            {stats.topLikedCVs?.map((cv, index) => (
              <div
                key={cv.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {cv.ad} {cv.soyad}
                    </div>
                    <Link
                      href={`/${cv.slug}`}
                      target="_blank"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {cv.slug}
                    </Link>
                  </div>
                </div>
                <span className="font-semibold text-pink-600">
                  {cv.likeCount} beğeni
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Comments Tab Component
function CommentsTab({
  comments,
  loading,
  filter,
  setFilter,
  onApprove,
  onReject,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <FiLoader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Filter comments based on status
  const filteredComments = comments.filter((comment) => {
    if (filter === "all") return true;
    return comment.status === filter;
  });

  if (filteredComments.length === 0) {
    return (
      <div className="space-y-6">
        {/* Filter */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex gap-2">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status === "all"
                  ? "Tümü"
                  : status === "pending"
                  ? "Bekleyen"
                  : status === "approved"
                  ? "Onaylanmış"
                  : "Reddedilmiş"}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FiMessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {filter === "all"
              ? "Yorum Yok"
              : `${
                  filter === "pending"
                    ? "Bekleyen"
                    : filter === "approved"
                    ? "Onaylanmış"
                    : "Reddedilmiş"
                } Yorum Yok`}
          </h3>
          <p className="text-gray-600">
            {filter === "all"
              ? "Hiçbir yorum bulunmuyor."
              : `${
                  filter === "pending"
                    ? "Onay bekleyen"
                    : filter === "approved"
                    ? "Onaylanmış"
                    : "Reddedilmiş"
                } hiçbir yorum bulunmuyor.`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status === "all"
                ? "Tümü"
                : status === "pending"
                ? "Bekleyen"
                : status === "approved"
                ? "Onaylanmış"
                : "Reddedilmiş"}
            </button>
          ))}
        </div>
      </div>

      {/* Comments Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Yazar
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Yorum
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  CV
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Tarih
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Durum
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredComments.map((comment) => (
                <tr key={comment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {comment.authorName}
                      </div>
                      <div className="text-gray-500">{comment.authorEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      <p className="truncate">{comment.content}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {comment.cv.ad} {comment.cv.soyad}
                      </div>
                      <Link
                        href={`/${comment.cv.slug}`}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {comment.cv.slug}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(comment.createdAt).toLocaleString("tr-TR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        comment.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : comment.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {comment.status === "approved"
                        ? "✓ Onaylandı"
                        : comment.status === "rejected"
                        ? "✗ Reddedildi"
                        : "⏳ Bekliyor"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {comment.status === "pending" && (
                        <>
                          <button
                            onClick={() => onApprove(comment.id)}
                            className="text-green-600 hover:text-green-900 flex items-center gap-1"
                            title="Onayla"
                          >
                            <FiCheck />
                          </button>
                          <button
                            onClick={() => onReject(comment.id)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                            title="Reddet"
                          >
                            <FiX />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => onDelete(comment.id)}
                        className="text-red-600 hover:text-red-900 flex items-center gap-1"
                        title="Sil"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// CV Edit Modal Component
function CVEditModal({ cv, onClose, onSave }) {
  const [formData, setFormData] = useState(cv.formData || {});
  const [isPublished, setIsPublished] = useState(cv.isPublished);
  const [slug, setSlug] = useState(cv.slug);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      formData,
      isPublished,
      slug,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">CV Düzenle</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]"
        >
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Temel Bilgiler
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad
                  </label>
                  <input
                    type="text"
                    value={formData.ad || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, ad: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Soyad
                  </label>
                  <input
                    type="text"
                    value={formData.soyad || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, soyad: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 font-mono"
              />
            </div>

            {/* Publish Status */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPublished"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="isPublished"
                className="text-sm font-medium text-gray-700"
              >
                CV Yayında
              </label>
            </div>

            {/* JSON Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Verileri (JSON)
              </label>
              <textarea
                value={JSON.stringify(formData, null, 2)}
                onChange={(e) => {
                  try {
                    setFormData(JSON.parse(e.target.value));
                  } catch (err) {
                    // Invalid JSON, ignore
                  }
                }}
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm text-gray-900"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Photo Lightbox Component
function PhotoLightbox({ photo, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
      >
        <FiX className="w-6 h-6" />
      </button>
      <img
        src={photo.photoUrl}
        alt="Fotoğraf önizleme"
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3">
        <p className="font-semibold text-gray-900">{photo.userName}</p>
        <p className="text-sm text-gray-600">
          {new Date(photo.createdAt).toLocaleDateString("tr-TR")}
        </p>
      </div>
    </div>
  );
}
