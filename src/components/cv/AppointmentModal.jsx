"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiCalendar,
  FiClock,
  FiUser,
  FiPhone,
  FiMail,
  FiMessageSquare,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";

export default function AppointmentModal({
  isOpen,
  onClose,
  service,
  cvId,
  cvOwner,
}) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    customerName: "",
    customerSurname: "",
    customerPhone: "",
    customerEmail: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Saat seçenekleri (09:00 - 18:00)
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  // Minimum tarih (bugün)
  const getTodayDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const today = getTodayDate();

  console.log("📅 Minimum tarih (bugün):", today);

  // Tarih veya saat değiştiğinde müsaitlik kontrolü
  useEffect(() => {
    if (formData.date && formData.time) {
      checkAvailability();
    } else {
      setAvailabilityMessage(null);
    }
  }, [formData.date, formData.time]);

  // Müsaitlik kontrolü
  const checkAvailability = async () => {
    setIsCheckingAvailability(true);
    try {
      const appointmentDateTime = new Date(
        `${formData.date}T${formData.time}:00`
      );

      const response = await fetch("/api/appointments/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvId,
          appointmentDate: appointmentDateTime.toISOString(),
        }),
      });

      const data = await response.json();

      setAvailabilityMessage(data);
    } catch (error) {
      console.error("Availability check error:", error);
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  // Form validasyonu
  const validate = () => {
    const newErrors = {};

    console.log("📝 Form Data:", formData);
    console.log("🔍 Availability Message:", availabilityMessage);

    if (!formData.date) {
      newErrors.date = "Tarih seçiniz";
      console.log("❌ Tarih yok");
    }

    if (!formData.time) {
      newErrors.time = "Saat seçiniz";
      console.log("❌ Saat yok");
    }

    if (!formData.customerName) {
      newErrors.customerName = "Ad gerekli";
      console.log("❌ Ad yok");
    }

    if (!formData.customerSurname) {
      newErrors.customerSurname = "Soyad gerekli";
      console.log("❌ Soyad yok");
    }

    if (!formData.customerPhone) {
      newErrors.customerPhone = "Telefon gerekli";
      console.log("❌ Telefon yok");
    } else {
      const phoneRegex = /^(\+90|0)?5\d{9}$/;
      const cleanPhone = formData.customerPhone.replace(/\s/g, "");
      console.log("📞 Temiz telefon:", cleanPhone);
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.customerPhone = "Geçerli bir telefon numarası girin";
        console.log("❌ Telefon formatı hatalı");
      }
    }

    // Müsaitlik kontrolü - sadece mesaj varsa ve müsait değilse
    if (availabilityMessage && !availabilityMessage.available) {
      newErrors.time = "Bu saat dolu, başka bir saat seçiniz";
      console.log("❌ Saat dolu");
    }

    console.log("📋 Validation Errors:", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔍 Form validasyonu başlıyor...");
    if (!validate()) {
      console.log("❌ Form validasyonu başarısız:", errors);
      return;
    }

    console.log("✅ Form validasyonu başarılı");
    setIsLoading(true);
    setSuccessMessage("");
    setErrors({});

    try {
      const appointmentDateTime = new Date(
        `${formData.date}T${formData.time}:00`
      );

      const requestBody = {
        cvId,
        serviceId: service?.id ? String(service.id) : null, // Int → String dönüşümü
        serviceName: service?.ad || "Genel Randevu",
        appointmentDate: appointmentDateTime.toISOString(),
        customerName: formData.customerName,
        customerSurname: formData.customerSurname,
        customerPhone: formData.customerPhone.replace(/\s/g, ""),
        customerEmail: formData.customerEmail || null,
        notes: formData.notes || null,
      };

      console.log("📤 API'ye gönderilen veri:", requestBody);

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      console.log("📥 API Response Status:", response.status);

      const data = await response.json();
      console.log("📥 API Response Data:", data);

      if (response.ok && data.success) {
        console.log("✅ Randevu başarıyla oluşturuldu!");
        setSuccessMessage("Randevu başarıyla oluşturuldu!");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        console.error("❌ API Hatası:", data.error || "Bilinmeyen hata");
        setErrors({ submit: data.error || "Bir hata oluştu" });
      }
    } catch (error) {
      console.error("❌ Network/Parse Hatası:", error);
      setErrors({ submit: "Bağlantı hatası: " + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Randevu Al</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {cvOwner.name} {cvOwner.surname}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Service Info */}
            {service && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-emerald-100">
                <h3 className="text-xl font-bold text-gray-900">
                  {service.ad}
                </h3>
                {service.aciklama && (
                  <p className="text-gray-700 text-sm mt-2">
                    {service.aciklama}
                  </p>
                )}
                <div className="flex gap-4 mt-3">
                  {service.fiyat && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white rounded-lg font-semibold text-sm">
                      💰 {service.fiyat}
                    </span>
                  )}
                  {service.sure && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm">
                      ⏱ {service.sure}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-800 font-medium">{successMessage}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Tarih ve Saat */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tarih */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                    <FiCalendar className="w-4 h-4 text-emerald-600" />
                    Tarih *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    className={`w-full px-4 py-3 border-2 rounded-xl text-gray-900 bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Saat */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                    <FiClock className="w-4 h-4 text-emerald-600" />
                    Saat *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl text-gray-900 bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all ${
                      errors.time ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="" className="text-gray-500">
                      Saat seçiniz
                    </option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time} className="text-gray-900">
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.time}
                    </p>
                  )}
                </div>
              </div>

              {/* Availability Message */}
              {availabilityMessage && (
                <div
                  className={`p-4 rounded-lg flex items-center gap-3 ${
                    availabilityMessage.available
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  {isCheckingAvailability ? (
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  ) : availabilityMessage.available ? (
                    <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <p
                    className={`text-sm font-medium ${
                      availabilityMessage.available
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {availabilityMessage.message}
                  </p>
                </div>
              )}

              {/* Ad Soyad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                    <FiUser className="w-4 h-4 text-emerald-600" />
                    Ad *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Adınız"
                    className={`w-full px-4 py-3 border-2 rounded-xl text-gray-900 bg-white placeholder-gray-500 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all ${
                      errors.customerName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                    <FiUser className="w-4 h-4 text-emerald-600" />
                    Soyad *
                  </label>
                  <input
                    type="text"
                    name="customerSurname"
                    value={formData.customerSurname}
                    onChange={handleChange}
                    placeholder="Soyadınız"
                    className={`w-full px-4 py-3 border-2 rounded-xl text-gray-900 bg-white placeholder-gray-500 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all ${
                      errors.customerSurname
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.customerSurname && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.customerSurname}
                    </p>
                  )}
                </div>
              </div>

              {/* Telefon */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                  <FiPhone className="w-4 h-4 text-emerald-600" />
                  Telefon *
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="0555 123 4567"
                  className={`w-full px-4 py-3 border-2 rounded-xl text-gray-900 bg-white placeholder-gray-500 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all ${
                    errors.customerPhone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.customerPhone && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.customerPhone}
                  </p>
                )}
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                  <FiMail className="w-4 h-4 text-emerald-600" />
                  Email (İsteğe Bağlı)
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="ornek@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 bg-white placeholder-gray-500 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                  <FiMessageSquare className="w-4 h-4 text-emerald-600" />
                  Not / Açıklama (İsteğe Bağlı)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Randevu ile ilgili eklemek istediğiniz bir not varsa yazabilirsiniz..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 bg-white placeholder-gray-500 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all resize-none"
                />
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-800 font-medium">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    (availabilityMessage && !availabilityMessage.available)
                  }
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-5 h-5" />
                      Randevu Oluştur
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
