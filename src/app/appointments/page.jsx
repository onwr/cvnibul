"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/cv/Navigation";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiPhone,
  FiMail,
  FiMessageSquare,
  FiCheck,
  FiX,
  FiTrash2,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiArrowLeft,
} from "react-icons/fi";

export default function AppointmentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);

  // Auth check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Fetch appointments
  useEffect(() => {
    if (session) {
      fetchAppointments();
    }
  }, [session, currentPage, statusFilter]);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
        ...(statusFilter && { status: statusFilter }),
      });

      const response = await fetch(`/api/appointments?${params}`);
      const data = await response.json();

      if (data.appointments) {
        setAppointments(data.appointments);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Fetch appointments error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update appointment status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        fetchAppointments(); // Refresh list
      }
    } catch (error) {
      console.error("Update status error:", error);
    }
  };

  // Delete appointment
  const deleteAppointment = async (id) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setDeleteModal(null);
        fetchAppointments(); // Refresh list
      }
    } catch (error) {
      console.error("Delete appointment error:", error);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-gradient-to-r from-amber-400 to-orange-400",
        border: "border-amber-200",
        text: "text-white",
        icon: "⏳",
        label: "Bekliyor",
      },
      confirmed: {
        bg: "bg-gradient-to-r from-emerald-500 to-green-500",
        border: "border-emerald-200",
        text: "text-white",
        icon: "✅",
        label: "Onaylandı",
      },
      cancelled: {
        bg: "bg-gradient-to-r from-red-500 to-rose-500",
        border: "border-red-200",
        text: "text-white",
        icon: "❌",
        label: "İptal Edildi",
      },
      completed: {
        bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
        border: "border-blue-200",
        text: "text-white",
        icon: "✔️",
        label: "Tamamlandı",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold ${config.bg} ${config.text} shadow-md border-2 ${config.border}`}
      >
        <span className="text-base">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-700 font-medium">
            Randevularınız yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation */}
      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => router.push("/")}
            className="mb-6 flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
          >
            <FiArrowLeft className="w-5 h-5" />
            Anasayfaya Dön
          </button>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <FiCalendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Randevularım
                </h1>
                <p className="text-gray-600 mt-1 font-medium">
                  Tüm randevularınızı buradan yönetebilirsiniz
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-gray-700 font-semibold">
                <FiFilter className="w-5 h-5 text-emerald-600" />
                <span>Filtrele:</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl text-gray-900 font-medium bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all cursor-pointer"
              >
                <option value="" className="text-gray-900">
                  Tüm Durumlar
                </option>
                <option value="pending" className="text-gray-900">
                  ⏳ Bekliyor
                </option>
                <option value="confirmed" className="text-gray-900">
                  ✅ Onaylandı
                </option>
                <option value="cancelled" className="text-gray-900">
                  ❌ İptal Edildi
                </option>
                <option value="completed" className="text-gray-900">
                  ✔️ Tamamlandı
                </option>
              </select>
            </div>
          </div>

          {/* Appointments List */}
          <div className="space-y-5">
            {appointments.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCalendar className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Henüz randevu yok
                </h3>
                <p className="text-gray-600 font-medium text-lg">
                  {statusFilter
                    ? "Bu filtre için randevu bulunamadı"
                    : "İlk randevunuzu bekliyoruz"}
                </p>
              </div>
            ) : (
              appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all p-8"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                    {/* Date/Time */}
                    <div className="flex-shrink-0">
                      <div className="w-28 h-28 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg">
                        <FiCalendar className="w-7 h-7 mb-2" />
                        <span className="text-2xl font-bold">
                          {new Date(appointment.appointmentDate).getDate()}
                        </span>
                        <span className="text-sm font-medium uppercase">
                          {new Date(
                            appointment.appointmentDate
                          ).toLocaleDateString("tr-TR", { month: "short" })}
                        </span>
                      </div>
                      <div className="mt-3 text-center bg-gray-50 rounded-xl py-2 px-3">
                        <FiClock className="w-4 h-4 inline mr-2 text-emerald-600" />
                        <span className="text-base font-bold text-gray-900">
                          {formatTime(appointment.appointmentDate)}
                        </span>
                      </div>
                    </div>

                    {/* Service Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <span className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></span>
                        {appointment.serviceName}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FiUser className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium">
                              Müşteri
                            </p>
                            <p className="text-sm font-bold text-gray-900">
                              {appointment.customerName}{" "}
                              {appointment.customerSurname}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FiPhone className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium">
                              Telefon
                            </p>
                            <a
                              href={`tel:${appointment.customerPhone}`}
                              className="text-sm font-bold text-gray-900 hover:text-emerald-600 transition-colors"
                            >
                              {appointment.customerPhone}
                            </a>
                          </div>
                        </div>
                        {appointment.customerEmail && (
                          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 md:col-span-2">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FiMail className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium">
                                Email
                              </p>
                              <a
                                href={`mailto:${appointment.customerEmail}`}
                                className="text-sm font-bold text-gray-900 hover:text-emerald-600 transition-colors"
                              >
                                {appointment.customerEmail}
                              </a>
                            </div>
                          </div>
                        )}
                        {appointment.notes && (
                          <div className="md:col-span-2 mt-2 p-4 bg-amber-50 border-2 border-amber-100 rounded-xl">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FiMessageSquare className="w-5 h-5 text-amber-700" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold text-amber-700 mb-1 uppercase tracking-wide">
                                  Not:
                                </p>
                                <p className="text-sm font-medium text-gray-800">
                                  {appointment.notes}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex-shrink-0 min-w-[200px] space-y-4">
                      <div className="flex justify-center">
                        {getStatusBadge(appointment.status)}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3">
                        {appointment.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateStatus(appointment.id, "confirmed")
                              }
                              className="w-full px-5 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                              <FiCheck className="w-5 h-5" />
                              Onayla
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(appointment.id, "cancelled")
                              }
                              className="w-full px-5 py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                              <FiX className="w-5 h-5" />
                              İptal Et
                            </button>
                          </>
                        )}
                        {appointment.status === "confirmed" && (
                          <button
                            onClick={() =>
                              updateStatus(appointment.id, "completed")
                            }
                            className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          >
                            <FiCheck className="w-5 h-5" />
                            Tamamlandı
                          </button>
                        )}
                        <button
                          onClick={() => setDeleteModal(appointment)}
                          className="w-full px-5 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <FiTrash2 className="w-5 h-5" />
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-white"
              >
                <FiChevronLeft className="w-5 h-5 text-gray-700" />
              </button>

              <div className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                <span className="font-bold text-white text-lg">
                  {currentPage} / {pagination.pages}
                </span>
              </div>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(pagination.pages, p + 1))
                }
                disabled={currentPage === pagination.pages}
                className="px-5 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-white"
              >
                <FiChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border-2 border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FiTrash2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              Randevuyu Sil
            </h3>
            <p className="text-gray-600 mb-8 text-center font-medium leading-relaxed">
              Bu randevuyu silmek istediğinizden emin misiniz? Bu işlem{" "}
              <span className="font-bold text-red-600">geri alınamaz</span>.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-100 hover:border-gray-400 transition-all"
              >
                İptal
              </button>
              <button
                onClick={() => deleteAppointment(deleteModal.id)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
