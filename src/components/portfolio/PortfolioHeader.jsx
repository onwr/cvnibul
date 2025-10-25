"use client";

import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Heart,
  Cake,
} from "lucide-react";

export default function PortfolioHeader({ data, design, likes, onLike }) {
  const { personalInfo, contact, location } = data;
  const {
    selectedColor,
    customColor,
    cornerRadius,
    headerStyle,
    showProfilePhoto,
  } = design;

  const getColorRgb = (colorValue) => {
    if (colorValue === "custom") {
      const hex = customColor.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }
    const colors = {
      blue: "37, 99, 235",
      green: "22, 163, 74",
      purple: "147, 51, 234",
      red: "220, 38, 38",
      orange: "234, 88, 12",
      gray: "55, 65, 81",
    };
    return colors[colorValue] || "37, 99, 235";
  };

  return (
    <div
      className="relative p-10 mb-10 text-white overflow-hidden"
      style={{
        borderRadius:
          cornerRadius === "sharp"
            ? "8px"
            : cornerRadius === "rounded"
            ? "32px"
            : "24px",
      }}
    >
      {/* Renkli Arkaplan */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            headerStyle === "gradient"
              ? `linear-gradient(135deg, rgba(${getColorRgb(
                  selectedColor
                )}, 1) 0%, rgba(${getColorRgb(
                  selectedColor
                )}, 0.85) 50%, rgba(${getColorRgb(selectedColor)}, 0.7) 100%)`
              : headerStyle === "solid"
              ? `rgba(${getColorRgb(selectedColor)}, 1)`
              : `rgba(${getColorRgb(selectedColor)}, 0.95)`,
        }}
      ></div>

      {/* Dekoratif Arkaplan Şekiller */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 z-0"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 z-0"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profil Fotoğrafı */}
        {personalInfo.profilFotografi && showProfilePhoto && (
          <div className="flex-shrink-0">
            <div
              className="w-40 h-40 overflow-hidden border-4 border-white shadow-2xl transform hover:scale-105 transition-transform"
              style={{
                borderRadius:
                  cornerRadius === "sharp"
                    ? "8px"
                    : cornerRadius === "rounded"
                    ? "32px"
                    : "16px",
              }}
            >
              <img
                src={personalInfo.profilFotografi}
                alt={`${personalInfo.ad} ${personalInfo.soyad}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Kişisel Bilgiler */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h1 className="text-5xl font-bold leading-tight">
              {personalInfo.ad} {personalInfo.soyad}
            </h1>
            {/* Beğeni Butonu */}
            <button
              onClick={onLike}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all group"
            >
              <Heart
                className={`w-6 h-6 transition-all ${
                  likes > 0 ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
              <span className="font-bold text-lg">{likes}</span>
            </button>
          </div>
          <p className="text-2xl opacity-95 mb-3 font-medium">
            {personalInfo.ozelMeslek || "Profesyonel"}
          </p>
          {/* Doğum Tarihi */}
          {personalInfo.dogumTarihi && (
            <div className="flex items-center gap-2 mb-5 text-sm opacity-90">
              <Cake className="w-4 h-4" />
              <span>
                {new Date(personalInfo.dogumTarihi).toLocaleDateString(
                  "tr-TR",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </div>
          )}

          {/* İletişim Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm opacity-90">
            {contact.email && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Mail className="w-4 h-4" />
                {contact.email}
              </div>
            )}
            {contact.telefon && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Phone className="w-4 h-4" />
                {contact.telefon}
              </div>
            )}
            {personalInfo.adres && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg md:col-span-2">
                <MapPin className="w-4 h-4" />
                {personalInfo.adres}
              </div>
            )}
          </div>

          {/* Harita */}
          {location && (
            <div className="mt-4">
              <iframe
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: "12px" }}
                loading="lazy"
                allowFullScreen
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                  location.lng - 0.01
                },${location.lat - 0.01},${location.lng + 0.01},${
                  location.lat + 0.01
                }&marker=${location.lat},${location.lng}`}
              ></iframe>
            </div>
          )}

          {/* Sosyal Medya Linkleri */}
          {(contact.linkedin ||
            contact.github ||
            contact.instagram ||
            contact.website) && (
            <div className="flex flex-wrap gap-3 mt-5">
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all flex items-center gap-2 text-sm font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all flex items-center gap-2 text-sm font-medium"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {contact.instagram && (
                <a
                  href={
                    contact.instagram.startsWith("http")
                      ? contact.instagram
                      : `https://instagram.com/${contact.instagram.replace(
                          "@",
                          ""
                        )}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all flex items-center gap-2 text-sm font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
              )}
              {contact.website && (
                <a
                  href={
                    contact.website.startsWith("http")
                      ? contact.website
                      : `https://${contact.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all flex items-center gap-2 text-sm font-medium"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
