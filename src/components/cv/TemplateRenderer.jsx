"use client";

import { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiGlobe,
  FiInstagram,
  FiLinkedin,
  FiBookOpen,
  FiCode,
  FiTool,
  FiBook,
  FiBriefcase,
  FiAward,
  FiStar,
  FiHeart,
  FiUsers,
  FiUser,
  FiMapPin,
  FiImage,
  FiEdit3,
  FiPlus,
  FiChevronUp,
  FiChevronDown,
  FiTrash2,
  FiMessageSquare,
  FiSend,
  FiFileText,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import EditableCard from "./sections/EditableCard";
import EditableSidebarSection from "./sections/EditableSidebarSection";

// Formatlama fonksiyonları
const formatLanguage = (lang) => {
  const languageMap = {
    turkce: "Türkçe",
    ingilizce: "İngilizce",
    almanca: "Almanca",
    fransizca: "Fransızca",
    ispanyolca: "İspanyolca",
    arapca: "Arapça",
    rusca: "Rusça",
    italyanca: "İtalyanca",
    japonca: "Japonca",
    cince: "Çince",
    diger: "Diğer",
  };
  return languageMap[lang?.toLowerCase()] || lang;
};

const formatLevel = (level) => {
  const levelMap = {
    ana_dil: "Ana Dil",
    ileri: "İleri",
    orta: "Orta",
    baslangic: "Başlangıç",
  };
  return levelMap[level?.toLowerCase()] || level;
};

const formatRelationship = (durum) => {
  const relationshipMap = {
    bekar: "Bekar",
    evli: "Evli",
  };
  return relationshipMap[durum?.toLowerCase()] || durum;
};

const getRelationshipIcon = (durum) => {
  const iconMap = {
    bekar: "💍",
    evli: "👫",
  };
  return iconMap[durum?.toLowerCase()] || "💍";
};

const formatNetworkRelation = (iliski, digerIliski) => {
  if (iliski === "diger" && digerIliski) {
    return digerIliski;
  }
  const relationMap = {
    ogrenci: "Öğrencim",
    hoca: "Hocam",
    lise_arkadasi: "Lise Arkadaşım",
    universite_arkadasi: "Üniversite Arkadaşım",
    meslektas: "Meslektaşım",
    diger: "Diğer",
  };
  return relationMap[iliski?.toLowerCase()] || iliski;
};

const getNetworkIcon = (iliski) => {
  const iconMap = {
    ogrenci: "🎓",
    hoca: "👨‍🏫",
    lise_arkadasi: "🏫",
    universite_arkadasi: "🎓",
    meslektas: "💼",
    diger: "👤",
  };
  return iconMap[iliski?.toLowerCase()] || "👤";
};

const TemplateRenderer = ({
  formData,
  templateType = "modern",
  isEditing = false,
  onEditItem = () => {},
  onDeleteItem = () => {},
  onMoveUp = () => {},
  onMoveDown = () => {},
  viewCount = 0,
  likeCount = 0,
  onLikeClick = () => {},
  onAppointmentClick = () => {},
  customization = {},
  sectionOrder = [],
  moveSectionUp = () => {},
  moveSectionDown = () => {},
  comments = [],
  onCommentSubmit = () => {},
  onToggleSectionVisibility = () => {},
}) => {
  // Bölüm görünürlüğü kontrolü
  const isSectionVisible = (sectionId) => {
    return customization.sectionVisibility?.[sectionId] ?? true;
  };
  // Template configurations
  const templateConfigs = {
    modern: {
      background: "bg-gray-900",
      cardStyle: "bg-white/10 backdrop-blur-sm border border-white/20",
      textColor: "text-white",
      accentColors: {
        contact: "bg-blue-500",
        education: "bg-green-500",
        skills: "bg-purple-500",
        about: "bg-orange-500",
        experience: "bg-red-500",
        services: "bg-indigo-500",
        publications: "bg-pink-500",
        certificates: "bg-yellow-500",
        awards: "bg-teal-500",
        hobbies: "bg-rose-500",
        social: "bg-cyan-500",
        references: "bg-emerald-500",
        languages: "bg-blue-600",
        specialSkills: "bg-indigo-600",
        projects: "bg-green-600",
        map: "bg-gray-600",
      },
    },
    hero: {
      background: "bg-gray-900",
      backgroundImage: "url('/hero-back.jpg')",
      overlay: "bg-black/60",
      cardStyle: "bg-black/30 backdrop-blur-sm border border-white/10",
      textColor: "text-white",
      accentColors: {
        contact: "bg-blue-500",
        education: "bg-green-500",
        skills: "bg-purple-500",
        about: "bg-orange-500",
        experience: "bg-red-500",
        services: "bg-indigo-500",
        publications: "bg-pink-500",
        certificates: "bg-yellow-500",
        awards: "bg-teal-500",
        hobbies: "bg-rose-500",
        social: "bg-cyan-500",
        references: "bg-emerald-500",
        languages: "bg-blue-600",
        specialSkills: "bg-indigo-600",
        projects: "bg-green-600",
        map: "bg-gray-600",
      },
    },
    corporate: {
      background: "bg-gradient-to-br from-slate-900 to-gray-900",
      cardStyle: "bg-white/5 backdrop-blur-sm border border-white/10",
      textColor: "text-white",
      accentColors: {
        contact: "bg-slate-500",
        education: "bg-slate-500",
        skills: "bg-slate-500",
        about: "bg-slate-500",
        experience: "bg-slate-500",
        services: "bg-slate-500",
        publications: "bg-slate-500",
        certificates: "bg-slate-500",
        awards: "bg-slate-500",
        hobbies: "bg-slate-500",
        social: "bg-slate-500",
        references: "bg-slate-500",
        languages: "bg-slate-500",
        specialSkills: "bg-slate-500",
        projects: "bg-slate-500",
        map: "bg-slate-500",
      },
    },
    creative: {
      background:
        "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900",
      cardStyle:
        "bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-300/30",
      textColor: "text-white",
      accentColors: {
        contact: "bg-purple-500",
        education: "bg-blue-500",
        skills: "bg-indigo-500",
        about: "bg-pink-500",
        experience: "bg-cyan-500",
        services: "bg-violet-500",
        publications: "bg-fuchsia-500",
        certificates: "bg-rose-500",
        awards: "bg-sky-500",
        hobbies: "bg-lavender-500",
        social: "Filter-500",
        references: "bg-amber-500",
        languages: "bg-blue-600",
        specialSkills: "bg-indigo-600",
        projects: "bg-green-600",
        map: "bg-gray-600",
      },
    },
    sidebar: {
      layout: "two-column",
      leftColumnWidth: "w-1/4",
      rightColumnWidth: "w-3/4",
      background: "bg-gray-100",
      leftBg: "bg-gradient-to-br from-blue-900 to-blue-800",
      rightBg: "bg-gray-50",
      leftTextColor: "text-white",
      rightTextColor: "text-gray-900",
      textColor: "text-gray-900",
      cardStyle: "bg-white shadow-md rounded-xl border-l-4",
      accentColors: {
        contact: "bg-blue-600",
        education: "bg-emerald-600",
        skills: "bg-purple-600",
        about: "bg-orange-600",
        experience: "bg-red-600",
        services: "bg-indigo-600",
        publications: "bg-pink-600",
        certificates: "bg-yellow-600",
        awards: "bg-teal-600",
        hobbies: "bg-rose-600",
        social: "bg-cyan-600",
        references: "bg-emerald-500",
        languages: "bg-blue-500",
        specialSkills: "bg-indigo-500",
        projects: "bg-green-600",
        map: "bg-blue-600",
      },
    },
    classic: {
      layout: "top-bottom",
      background: "bg-white",
      headerBg: "bg-gradient-to-r from-blue-600 to-purple-600",
      headerTextColor: "text-white",
      textColor: "text-gray-900",
      cardStyle: "bg-white shadow-lg rounded-lg border border-gray-200",
      accentColors: {
        contact: "bg-blue-500",
        education: "bg-green-500",
        skills: "bg-purple-500",
        about: "bg-orange-500",
        experience: "bg-red-500",
        services: "bg-indigo-500",
        publications: "bg-pink-500",
        certificates: "bg-yellow-500",
        awards: "bg-teal-500",
        hobbies: "bg-rose-500",
        social: "bg-cyan-500",
        references: "bg-emerald-500",
        languages: "bg-blue-600",
        specialSkills: "bg-indigo-600",
        projects: "bg-green-600",
        map: "bg-gray-600",
      },
    },
    elegant: {
      background:
        "bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900",
      cardStyle:
        "bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border border-amber-300/30",
      headerStyle: "bg-gradient-to-r from-amber-600 to-yellow-600",
      textColor: "text-white",
      accentColors: {
        contact: "bg-amber-500",
        education: "bg-yellow-500",
        skills: "bg-orange-500",
        about: "bg-red-500",
        experience: "bg-rose-500",
        services: "bg-pink-500",
        publications: "bg-purple-500",
        certificates: "bg-indigo-500",
        awards: "bg-blue-500",
        hobbies: "bg-amber-500",
        social: "bg-yellow-500",
        references: "bg-orange-500",
        languages: "bg-amber-500",
        specialSkills: "bg-yellow-500",
        projects: "bg-orange-500",
        map: "bg-amber-600",
      },
    },
  };

  // Backward compatibility: "hero" type'ını "modern" olarak ele al
  const actualTemplateType = templateType === "hero" ? "modern" : templateType;
  const config = templateConfigs[actualTemplateType] || templateConfigs.modern;

  // Get section color - Modern tema için özel renkler, diğerleri için varsayılan
  const getSectionColor = (sectionKey) => {
    // Modern tema için önce modernColors'dan kontrol et
    if (
      actualTemplateType === "modern" &&
      customization.modernColors?.[sectionKey]
    ) {
      return customization.modernColors[sectionKey];
    }

    // colorPalette varsa primary rengi kullan (tüm section'lar için)
    if (customization.colorPalette?.primary) {
      return customization.colorPalette.primary;
    }

    // Eski sistemle uyumluluk - primaryColor varsa kullan
    if (customization.primaryColor) {
      return customization.primaryColor;
    }

    // Fallback olarak config.accentColors - ama hex değer döndür
    if (config.accentColors && config.accentColors[sectionKey]) {
      // Tailwind class'ı varsa varsayılan bir renk döndür
      const colorMap = {
        "bg-blue-500": "#3b82f6",
        "bg-green-500": "#22c55e",
        "bg-purple-500": "#a855f7",
        "bg-orange-500": "#f97316",
        "bg-red-500": "#ef4444",
        "bg-indigo-500": "#6366f1",
        "bg-pink-500": "#ec4899",
        "bg-yellow-500": "#eab308",
        "bg-teal-500": "#14b8a6",
        "bg-rose-500": "#f43f5e",
        "bg-cyan-500": "#06b6d4",
        "bg-emerald-500": "#10b981",
        "bg-slate-500": "#64748b",
      };
      return (
        colorMap[config.accentColors[sectionKey]] ||
        customization.accentColor ||
        "#10b981"
      );
    }

    return customization.accentColor || "#10b981"; // Default emerald
  };

  // Modern tema için kart stili al (arkaplan ve border)
  const getCardStyle = () => {
    if (actualTemplateType === "modern") {
      const bgColor =
        customization.colorPalette?.cardBg || "rgba(255, 255, 255, 0.1)";
      const borderColor =
        customization.colorPalette?.cardBorder || "rgba(255, 255, 255, 0.2)";

      return {
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: "1px",
      };
    }
    return {};
  };

  // Render section component
  const renderSection = (
    sectionKey,
    title,
    icon,
    children,
    isDraggable = false
  ) => {
    const accentColor = getSectionColor(sectionKey);
    const isVisible = isSectionVisible(sectionKey);

    return (
      <div
        key={sectionKey}
        className={`${config.cardStyle} ${
          isDraggable && isEditing ? "cursor-move" : ""
        } backdrop-blur-sm relative ${
          !isVisible && isEditing ? "opacity-50" : ""
        }`}
        style={{
          borderRadius: `${customization.borderRadius || 12}px`,
          padding: `2rem`,
          marginBottom: `${customization.sectionGap || 32}px`,
          ...getCardStyle(),
        }}
        draggable={false}
      >
        <h2
          className={`text-lg md:text-xl font-bold ${config.textColor} mb-4 flex items-center justify-between`}
          style={{ fontSize: "var(--font-size-subheading)" }}
        >
          <div className="flex items-center">
            <span
              className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-2 md:mr-3 text-sm md:text-base"
              style={{ backgroundColor: accentColor }}
            >
              {icon}
            </span>
            <span className="text-base md:text-lg lg:text-xl">{title}</span>
          </div>

          {isEditing && (
            <div className="flex items-center gap-2">
              {/* Görünürlük Butonu */}
              <button
                onClick={() => onToggleSectionVisibility?.(sectionKey)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
                title={isVisible ? "Bölümü Gizle" : "Bölümü Göster"}
              >
                {isVisible ? (
                  <FiEye className="w-4 h-4 text-white" />
                ) : (
                  <FiEyeOff className="w-4 h-4 text-white/50" />
                )}
              </button>

              {/* Düzenle Butonu */}
              <button
                onClick={() => onEditItem(sectionKey, null)}
                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs transition-all"
              >
                <FiEdit3 className="w-3 h-3" />
              </button>
            </div>
          )}
        </h2>
        {children}
      </div>
    );
  };

  // Render editable item wrapper
  const renderEditableItem = (item, index, sectionKey, content, totalItems) => {
    if (isEditing) {
      return (
        <div
          key={index}
          className="relative group border border-transparent hover:border-emerald-500 rounded-lg p-2 transition-all"
        >
          {content}

          {/* Kontrol Butonları */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
            {/* Yukarı */}
            {index > 0 && (
              <button
                onClick={() => onMoveUp(sectionKey, index)}
                className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-lg"
                title="Yukarı Taşı"
              >
                <FiChevronUp className="w-4 h-4" />
              </button>
            )}

            {/* Aşağı */}
            {index < totalItems - 1 && (
              <button
                onClick={() => onMoveDown(sectionKey, index)}
                className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-lg"
                title="Aşağı Taşı"
              >
                <FiChevronDown className="w-4 h-4" />
              </button>
            )}

            {/* Düzenle */}
            <button
              onClick={() => onEditItem(sectionKey, item, index)}
              className="p-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded shadow-lg"
              title="Düzenle"
            >
              <FiEdit3 className="w-4 h-4" />
            </button>

            {/* Sil */}
            <button
              onClick={() => onDeleteItem(sectionKey, index)}
              className="p-1 bg-red-500 hover:bg-red-600 text-white rounded shadow-lg"
              title="Sil"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }
    return <div key={index}>{content}</div>;
  };

  // Render header for hero template
  const renderHeader = () => {
    if (templateType === "hero") {
      return (
        <div className="text-center py-8 md:py-12 lg:py-16 relative z-10">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center border-4 border-white/30">
            {customization.profilePhoto ? (
              <img
                src={customization.profilePhoto}
                alt="Profil"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
                {formData.ad?.[0]}
                {formData.soyad?.[0]}
              </span>
            )}
          </div>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
            style={{ fontSize: "var(--font-size-heading)" }}
          >
            {formData.ad} {formData.soyad}
          </h1>
          <p className="text-base md:text-lg lg:text-xl opacity-90 mb-4">
            {formData.ozelMeslek || "Profesyonel"}
          </p>
          {isSectionVisible("location") && formData.adres && (
            <p className="opacity-80 mb-4 md:mb-6 text-sm md:text-base px-4">
              {formData.adres}
            </p>
          )}
          {formData.dogumTarihi && (
            <p className="opacity-70 mb-6 md:mb-8 text-sm md:text-base">
              🎂 Doğum Tarihi: {formData.dogumTarihi}
            </p>
          )}

          {/* Beğeni ve Görüntülenme */}
          <div className="flex justify-center gap-6 mb-8">
            <button
              onClick={onLikeClick}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg transition-all"
            >
              <FiStar className="w-4 h-4" />
              {likeCount} Beğeni
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-white rounded-lg">
              <FiUser className="w-4 h-4" />
              {viewCount} Görüntülenme
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Render custom section
  const renderCustomSection = (customSection) => {
    const sectionKey = `custom_${customSection.id}`;
    const isVisible = customSection.visible ?? true;

    // Düzenleme modunda gizli bölümleri de göster ama opacity düşük
    if (!isVisible && !isEditing) return null;

    return renderSection(
      sectionKey,
      customSection.title,
      <FiFileText className="w-4 h-4" />,
      <div
        className={`${config.textColor} leading-relaxed`}
        dangerouslySetInnerHTML={{ __html: customSection.content }}
        style={{
          fontSize: `${customization.fontSize?.body || 14}px`,
          lineHeight: customization.lineHeight || 1.6,
        }}
      />
    );
  };

  // Render content based on layout
  const renderContent = () => {
    const customSections = customization.customSections || [];

    const allSections = (
      <>
        {/* Contact, Education, Skills Grid - Hero ve Default Layout için */}
        {!config.layout && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Contact */}
            {formData.iletisim && (
              <div
                key="contact"
                className={config.cardStyle}
                style={{
                  borderRadius: `${customization.borderRadius || 12}px`,
                  padding: `${customization.padding || 24}px`,
                  marginBottom: `${customization.sectionGap || 32}px`,
                }}
              >
                <h2
                  className={`text-lg md:text-xl font-bold ${config.textColor} mb-4 flex items-center justify-between`}
                  style={{ fontSize: "var(--font-size-subheading)" }}
                >
                  <div className="flex items-center">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: getSectionColor("contact") }}
                    >
                      <FiPhone className="w-5 h-5" />
                    </span>
                    İletişim
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => onEditItem("contact", formData.iletisim)}
                      className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs transition-all"
                    >
                      <FiEdit3 className="w-3 h-3" />
                    </button>
                  )}
                </h2>
                <div className="space-y-3">
                  {formData.iletisim.telefon && (
                    <div className={`flex items-center ${config.textColor}/70`}>
                      <FiPhone className="w-5 h-5 mr-3" />
                      {formData.iletisim.telefon}
                    </div>
                  )}
                  {formData.iletisim.email && (
                    <div className={`flex items-center ${config.textColor}/70`}>
                      <FiMail className="w-5 h-5 mr-3" />
                      {formData.iletisim.email}
                    </div>
                  )}
                  {formData.iletisim.website && (
                    <div className={`flex items-center ${config.textColor}/70`}>
                      <FiGlobe className="w-5 h-5 mr-3" />
                      {formData.iletisim.website}
                    </div>
                  )}
                  {formData.iletisim.instagram && (
                    <div className={`flex items-center ${config.textColor}/70`}>
                      <FiInstagram className="w-5 h-5 mr-3" />
                      {formData.iletisim.instagram}
                    </div>
                  )}
                  {formData.iletisim.linkedin && (
                    <div className={`flex items-center ${config.textColor}/70`}>
                      <FiLinkedin className="w-5 h-5 mr-3" />
                      {formData.iletisim.linkedin}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Education */}
            {formData.egitimler && formData.egitimler.length > 0
              ? renderSection(
                  "education",
                  "Eğitim Ağacı",
                  <FiBookOpen className="w-5 h-5" />,
                  <div className="space-y-4">
                    {formData.egitimler.map((egitim, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-green-500 pl-4"
                      >
                        <h3 className="font-semibold text-white">
                          {egitim.okulAdi}
                        </h3>
                        <p className="text-gray-300">{egitim.bolum}</p>
                        <p className="text-gray-400 text-sm">
                          {egitim.derece} • {egitim.mezunTarihi}
                        </p>
                      </div>
                    ))}
                  </div>
                )
              : isEditing &&
                renderSection(
                  "education",
                  "Eğitim Ağacı",
                  <FiBookOpen className="w-5 h-5" />,
                  <div
                    className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                    onClick={() => onEditItem("education", null)}
                  >
                    <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                    <p className="text-xs mt-1">Eğitim geçmişinizi ekleyin</p>
                  </div>,
                  true
                )}

            {/* Skills */}
            {formData.yetenekler && formData.yetenekler.length > 0
              ? renderSection(
                  "skills",
                  "Yetenekler",
                  <FiCode className="w-5 h-5" />,
                  <div className="flex flex-wrap gap-2">
                    {formData.yetenekler.map((yetenek, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm"
                      >
                        {yetenek.ad}
                      </span>
                    ))}
                  </div>
                )
              : isEditing &&
                renderSection(
                  "skills",
                  "Yetenekler",
                  <FiCode className="w-5 h-5" />,
                  <div
                    className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                    onClick={() => onEditItem("skills", null)}
                  >
                    <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                    <p className="text-xs mt-1">Yeteneklerinizi ekleyin</p>
                  </div>,
                  true
                )}
          </div>
        )}

        {/* Contact - Diğer Layout'lar için */}
        {config.layout &&
          formData.iletisim &&
          renderSection(
            "contact",
            "İletişim",
            <FiPhone className="w-5 h-5" />,
            <div className="space-y-3">
              {formData.iletisim.telefon && (
                <div className={`flex items-center ${config.textColor}/70`}>
                  <FiPhone className="w-5 h-5 mr-3" />
                  {formData.iletisim.telefon}
                </div>
              )}
              {formData.iletisim.email && (
                <div className={`flex items-center ${config.textColor}/70`}>
                  <FiMail className="w-5 h-5 mr-3" />
                  {formData.iletisim.email}
                </div>
              )}
              {formData.iletisim.website && (
                <div className={`flex items-center ${config.textColor}/70`}>
                  <FiGlobe className="w-5 h-5 mr-3" />
                  {formData.iletisim.website}
                </div>
              )}
              {formData.iletisim.instagram && (
                <div className={`flex items-center ${config.textColor}/70`}>
                  <FiInstagram className="w-5 h-5 mr-3" />
                  {formData.iletisim.instagram}
                </div>
              )}
              {formData.iletisim.linkedin && (
                <div className={`flex items-center ${config.textColor}/70`}>
                  <FiLinkedin className="w-5 h-5 mr-3" />
                  {formData.iletisim.linkedin}
                </div>
              )}
            </div>
          )}

        {/* Education - Diğer Layout'lar için */}
        {config.layout &&
          formData.egitimler &&
          formData.egitimler.length > 0 &&
          renderSection(
            "education",
            "Eğitim Ağacı",
            <FiBookOpen className="w-5 h-5" />,
            <div className="space-y-4">
              {formData.egitimler.map((egitim, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-white">{egitim.okulAdi}</h3>
                  <p className="text-gray-300">{egitim.bolum}</p>
                  <p className="text-gray-400 text-sm">
                    {egitim.derece} • {egitim.mezunTarihi}
                  </p>
                </div>
              ))}
            </div>
          )}

        {/* Skills - Diğer Layout'lar için */}
        {config.layout &&
          formData.yetenekler &&
          formData.yetenekler.length > 0 &&
          renderSection(
            "skills",
            "Yetenekler",
            <FiCode className="w-5 h-5" />,
            <div className="flex flex-wrap gap-2">
              {formData.yetenekler.map((yetenek, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm"
                >
                  {yetenek.ad}
                </span>
              ))}
            </div>
          )}

        {/* Services */}
        {formData.hizmetler && formData.hizmetler.length > 0
          ? renderSection(
              "services",
              "Hizmetler",
              <FiTool className="w-5 h-5" />,
              <div className="grid grid-cols-1 gap-4">
                {formData.hizmetler.map((hizmet, index) =>
                  renderEditableItem(
                    hizmet,
                    index,
                    "services",
                    <div
                      className={`${
                        templateType === "hero"
                          ? "bg-black/30 backdrop-blur-sm border border-white/10"
                          : config.cardStyle
                      } rounded-lg p-4`}
                    >
                      <h3 className="font-semibold text-white">{hizmet.ad}</h3>
                      <p className="text-gray-300 text-sm mt-1">
                        {hizmet.aciklama}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-green-400 font-semibold">
                          {hizmet.fiyat}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {hizmet.sure}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() =>
                            !isEditing && onAppointmentClick(hizmet)
                          }
                          disabled={isEditing}
                          className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isEditing ? "Düzenleme Modunda" : "Randevu Al"}
                        </button>
                      </div>
                    </div>,
                    formData.hizmetler.length
                  )
                )}
              </div>
            )
          : isEditing &&
            renderSection(
              "services",
              "Hizmetler",
              <FiTool className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("services", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">Hizmetlerinizi ekleyin</p>
              </div>,
              true
            )}

        {/* About */}
        {formData.hayatHikayesi
          ? renderSection(
              "about",
              "Hayat Hikayesi",
              <FiBook className="w-5 h-5" />,
              <div
                className="text-gray-300 leading-relaxed prose prose-sm prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.hayatHikayesi }}
              />,
              true // draggable
            )
          : isEditing &&
            renderSection(
              "about",
              "Hayat Hikayesi",
              <FiBook className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("about", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">Hayat hikayenizi ekleyin</p>
              </div>,
              true
            )}

        {/* Experience */}
        {formData.calismaGecmisi && formData.calismaGecmisi.length > 0
          ? renderSection(
              "experience",
              "İş Deneyimi",
              <FiBriefcase className="w-5 h-5" />,
              <div className="space-y-4">
                {formData.calismaGecmisi.map((is, index) =>
                  renderEditableItem(
                    is,
                    index,
                    "experience",
                    <>
                      <h3 className="font-semibold text-white">
                        {is.pozisyon}
                      </h3>
                      <p className="text-gray-300">{is.sirketAdi}</p>
                      <p className="text-gray-400 text-sm">
                        {is.baslangicTarihi} -{" "}
                        {is.halaCalisiyor ? "Devam Ediyor" : is.bitisTarihi}
                      </p>
                      {is.aciklama && (
                        <p className="text-gray-300 text-sm mt-2">
                          {is.aciklama}
                        </p>
                      )}
                    </>,
                    formData.calismaGecmisi.length
                  )
                )}
              </div>
            )
          : isEditing &&
            renderSection(
              "experience",
              "İş Deneyimi",
              <FiBriefcase className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("experience", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">İş deneyiminizi ekleyin</p>
              </div>,
              true
            )}

        {/* Publications */}
        {formData.yayinlar && formData.yayinlar.length > 0
          ? renderSection(
              "publications",
              "Yayınlar",
              <FiBook className="w-5 h-5" />,
              <div className="space-y-4">
                {formData.yayinlar.map((yayin, index) =>
                  renderEditableItem(
                    yayin,
                    index,
                    "publications",
                    <>
                      <h3 className="font-semibold text-white">
                        {yayin.baslik}
                      </h3>
                      <p className="text-gray-300 text-sm">{yayin.yayinYeri}</p>
                      <p className="text-gray-400 text-xs">{yayin.tarih}</p>
                      {yayin.aciklama && (
                        <p className="text-gray-300 text-sm mt-1">
                          {yayin.aciklama}
                        </p>
                      )}
                      {yayin.link && (
                        <a
                          href={yayin.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 text-sm hover:underline"
                        >
                          Makaleyi Oku
                        </a>
                      )}
                    </>
                  )
                )}
              </div>
            )
          : isEditing &&
            renderSection(
              "publications",
              "Yayınlar",
              <FiBook className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("publications", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">Yayınlarınızı ekleyin</p>
              </div>,
              true
            )}

        {/* Certificates */}
        {formData.sertifikalar && formData.sertifikalar.length > 0
          ? renderSection(
              "certificates",
              "Sertifikalar",
              <FiAward className="w-5 h-5" />,
              <div className="space-y-4">
                {formData.sertifikalar.map((sertifika, index) =>
                  renderEditableItem(
                    sertifika,
                    index,
                    "certificates",
                    <>
                      <h3 className="font-semibold text-white">
                        {sertifika.ad}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {sertifika.verenKurum}
                      </p>
                      <p className="text-gray-400 text-xs">{sertifika.tarih}</p>
                      {sertifika.gecerlilikSuresi && (
                        <p className="text-gray-400 text-xs">
                          Geçerlilik: {sertifika.gecerlilikSuresi}
                        </p>
                      )}
                      {sertifika.sertifikaNo && (
                        <p className="text-gray-400 text-xs">
                          Sertifika No: {sertifika.sertifikaNo}
                        </p>
                      )}
                      {sertifika.link && (
                        <a
                          href={sertifika.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 text-sm hover:underline"
                        >
                          Sertifikayı Görüntüle
                        </a>
                      )}
                    </>
                  )
                )}
              </div>
            )
          : isEditing &&
            renderSection(
              "certificates",
              "Sertifikalar",
              <FiAward className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("certificates", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">Sertifikalarınızı ekleyin</p>
              </div>,
              true
            )}

        {/* Awards */}
        {formData.oduller && formData.oduller.length > 0
          ? renderSection(
              "awards",
              "Ödüller",
              <FiStar className="w-5 h-5" />,
              <div className="space-y-4">
                {formData.oduller.map((odul, index) =>
                  renderEditableItem(
                    odul,
                    index,
                    "awards",
                    <>
                      <h3 className="font-semibold text-white">{odul.ad}</h3>
                      <p className="text-gray-300 text-sm">{odul.verenKurum}</p>
                      <p className="text-gray-400 text-xs">{odul.tarih}</p>
                      <span className="inline-block px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
                        {odul.kategori}
                      </span>
                      {odul.aciklama && (
                        <p className="text-gray-300 text-sm mt-2">
                          {odul.aciklama}
                        </p>
                      )}
                    </>
                  )
                )}
              </div>
            )
          : isEditing &&
            renderSection(
              "awards",
              "Ödüller",
              <FiStar className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("awards", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">Ödüllerinizi ekleyin</p>
              </div>,
              true
            )}

        {/* Hobbies */}
        {formData.hobiler && formData.hobiler.length > 0
          ? renderSection(
              "hobbies",
              "Hobiler",
              <FiHeart className="w-5 h-5" />,
              <div className="grid grid-cols-1 gap-4">
                {formData.hobiler.map((hobi, index) =>
                  renderEditableItem(
                    hobi,
                    index,
                    "hobbies",
                    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                      <h3 className="font-semibold text-white">{hobi.ad}</h3>
                      <span className="inline-block px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-full mt-1">
                        {hobi.seviye}
                      </span>
                      {hobi.aciklama && (
                        <p className="text-gray-300 text-sm mt-2">
                          {hobi.aciklama}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            )
          : isEditing &&
            renderSection(
              "hobbies",
              "Hobiler",
              <FiHeart className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("hobbies", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">Hobilerinizi ekleyin</p>
              </div>,
              true
            )}

        {/* Social Responsibility */}
        {formData.sosyalSorumluluk && formData.sosyalSorumluluk.length > 0
          ? renderSection(
              "social",
              "Sosyal Sorumluluk",
              <FiUsers className="w-5 h-5" />,
              <div className="space-y-4">
                {formData.sosyalSorumluluk.map((sosyal, index) =>
                  renderEditableItem(
                    sosyal,
                    index,
                    "social",
                    <>
                      <h3 className="font-semibold text-white">{sosyal.ad}</h3>
                      <p className="text-gray-300 text-sm">
                        {sosyal.organizasyon}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {sosyal.tarih} • {sosyal.sure}
                      </p>
                      {sosyal.aciklama && (
                        <p className="text-gray-300 text-sm mt-2">
                          {sosyal.aciklama}
                        </p>
                      )}
                    </>
                  )
                )}
              </div>
            )
          : isEditing &&
            renderSection(
              "social",
              "Sosyal Sorumluluk",
              <FiUsers className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("social", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">
                  Sosyal sorumluluk projelerinizi ekleyin
                </p>
              </div>,
              true
            )}

        {/* References */}
        {formData.referanslar && formData.referanslar.length > 0
          ? renderSection(
              "references",
              "Referanslar",
              <FiUser className="w-5 h-5" />,
              <div className="grid grid-cols-1 gap-4">
                {formData.referanslar.map((ref, index) =>
                  renderEditableItem(
                    ref,
                    index,
                    "references",
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                      <h3 className="font-semibold text-white">
                        {ref.ad} {ref.soyad}
                      </h3>
                      <p className="text-gray-300 text-sm">{ref.pozisyon}</p>
                      <p className="text-gray-400 text-xs">{ref.sirket}</p>
                      {ref.telefon && (
                        <p className="text-gray-300 text-xs mt-1">
                          📞 {ref.telefon}
                        </p>
                      )}
                      {ref.email && (
                        <p className="text-gray-300 text-xs">✉️ {ref.email}</p>
                      )}
                    </div>
                  )
                )}
              </div>
            )
          : isEditing &&
            renderSection(
              "references",
              "Referanslar",
              <FiUser className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("references", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">Referanslarınızı ekleyin</p>
              </div>,
              true
            )}

        {/* Photo Archive */}
        {formData.fotoArsivi && formData.fotoArsivi.length > 0
          ? renderSection(
              "photoArchive",
              "Fotoğraf Arşivi",
              <FiImage className="w-5 h-5" />,
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.fotoArsivi.map((foto, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={foto.url || foto}
                      alt={`Fotoğraf ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {isEditing && (
                      <button
                        onClick={() => onEditItem("photoArchive", foto)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-all"
                      >
                        <FiEdit3 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={() => onEditItem("photoArchive", null)}
                    className="w-full h-32 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-400 hover:border-gray-300 hover:text-gray-300 transition-colors"
                  >
                    <FiPlus className="w-4 h-4 mr-2" /> Fotoğraf Ekle
                  </button>
                )}
              </div>
            )
          : isEditing &&
            renderSection(
              "photoArchive",
              "Fotoğraf Arşivi",
              <FiImage className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("photoArchive", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">Fotoğraflarınızı ekleyin</p>
              </div>,
              true
            )}

        {/* Dil Bilgisi */}
        {formData.dilBilgisi && formData.dilBilgisi.length > 0
          ? renderSection(
              "languages",
              "Dil Bilgisi",
              <FiGlobe className="w-5 h-5" />,
              <div className="space-y-4">
                {formData.dilBilgisi.map((dil, index) =>
                  renderEditableItem(
                    dil,
                    index,
                    "languages",
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <h3 className="font-semibold text-white">
                        {formatLanguage(dil.dil)}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div className="text-gray-300">
                          <span className="text-gray-400">Konuşma:</span>{" "}
                          {formatLevel(dil.konusma)}
                        </div>
                        <div className="text-gray-300">
                          <span className="text-gray-400">Yazma:</span>{" "}
                          {formatLevel(dil.yazma)}
                        </div>
                        <div className="text-gray-300">
                          <span className="text-gray-400">Okuma:</span>{" "}
                          {formatLevel(dil.okuma)}
                        </div>
                        <div className="text-gray-300">
                          <span className="text-gray-400">Dinleme:</span>{" "}
                          {formatLevel(dil.dinleme)}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )
          : isEditing &&
            renderSection(
              "languages",
              "Dil Bilgisi",
              <FiGlobe className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("languages", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">Dil bilgilerinizi ekleyin</p>
              </div>,
              true
            )}

        {/* Özel Beceriler */}
        {formData.ozelBeceriler && formData.ozelBeceriler.length > 0
          ? renderSection(
              "specialSkills",
              "Özel Beceriler",
              <FiStar className="w-5 h-5" />,
              <div className="grid grid-cols-1 gap-4">
                {formData.ozelBeceriler.map((beceri, index) =>
                  renderEditableItem(
                    beceri,
                    index,
                    "specialSkills",
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                      <h3 className="font-semibold text-white">{beceri.ad}</h3>
                      {beceri.aciklama && (
                        <p className="text-gray-300 text-sm mt-1">
                          {beceri.aciklama}
                        </p>
                      )}
                      {beceri.seviye && (
                        <span className="inline-block px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full mt-2">
                          {beceri.seviye}
                        </span>
                      )}
                    </div>
                  )
                )}
              </div>
            )
          : isEditing &&
            renderSection(
              "specialSkills",
              "Özel Beceriler",
              <FiStar className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("specialSkills", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">Özel becerilerinizi ekleyin</p>
              </div>,
              true
            )}

        {/* Projeler */}
        {formData.projeler && formData.projeler.length > 0
          ? renderSection(
              "projects",
              "Projeler",
              <FiCode className="w-5 h-5" />,
              <div className="grid grid-cols-1 gap-4">
                {formData.projeler.map((proje, index) =>
                  renderEditableItem(
                    proje,
                    index,
                    "projects",
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <h3 className="font-semibold text-white">{proje.ad}</h3>
                      {proje.aciklama && (
                        <p className="text-gray-300 text-sm mt-1">
                          {proje.aciklama}
                        </p>
                      )}
                      {proje.teknolojiler && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(Array.isArray(proje.teknolojiler)
                            ? proje.teknolojiler
                            : proje.teknolojiler.split(",").map((t) => t.trim())
                          ).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {proje.link && (
                        <a
                          href={proje.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 text-sm hover:underline mt-2 inline-block"
                        >
                          Projeyi Görüntüle
                        </a>
                      )}
                    </div>
                  )
                )}
              </div>
            )
          : isEditing &&
            renderSection(
              "projects",
              "Projeler",
              <FiCode className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("projects", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">Projelerinizi ekleyin</p>
              </div>,
              true
            )}

        {/* Fotoğraf Galerisi */}
        {isSectionVisible("photoGallery") &&
        customization.photoGallery?.filter((p) => p.url && p.adminApproved)
          .length > 0
          ? renderSection(
              "photoGallery",
              "Fotoğraf Galerisi",
              <FiImage className="w-5 h-5" />,
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {customization.photoGallery
                  .filter((photo) => photo.url && photo.adminApproved)
                  .map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo.url}
                      alt={`Galeri ${idx + 1}`}
                      className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                    />
                  ))}
              </div>,
              true
            )
          : isEditing &&
            isSectionVisible("photoGallery") &&
            renderSection(
              "photoGallery",
              "Fotoğraf Galerisi",
              <FiImage className="w-5 h-5" />,
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("photoGallery", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Fotoğraf galerisi ekleyin</p>
                <p className="text-xs mt-1">
                  Maksimum 20 fotoğraf yükleyebilirsiniz
                </p>
                <p className="text-xs mt-1 text-orange-500">
                  Fotoğraflar admin onayından sonra görünecektir
                </p>
              </div>,
              true
            )}

        {/* Map */}
        {isSectionVisible("location") && formData.haritaKonumu ? (
          <div className={`${config.cardStyle} rounded-lg p-6`}>
            <h2
              className={`text-xl font-bold ${config.textColor} mb-4 flex items-center justify-between`}
            >
              <div className="flex items-center">
                <span
                  className={`w-8 h-8 ${
                    config.accentColors.map || "bg-blue-500"
                  } rounded-full flex items-center justify-center mr-3`}
                >
                  <FiMapPin className="w-5 h-5" />
                </span>
                Konum
              </div>
              {isEditing && (
                <button
                  onClick={() => onEditItem("map", formData.haritaKonumu)}
                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs transition-all"
                >
                  <FiEdit3 className="w-3 h-3" />
                </button>
              )}
            </h2>
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <iframe
                src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${formData.haritaKonumu.lat},${formData.haritaKonumu.lng}&zoom=15`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Konum Haritası"
              />
            </div>
          </div>
        ) : (
          isSectionVisible("location") &&
          isEditing && (
            <div className={`${config.cardStyle} rounded-lg p-6`}>
              <h2
                className={`text-xl font-bold ${config.textColor} mb-4 flex items-center`}
              >
                <span className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                  <FiMapPin className="w-5 h-5" />
                </span>
                Konum
              </h2>
              <div
                className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-400 transition-all"
                onClick={() => onEditItem("map", null)}
              >
                <FiEdit3 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bu bölümü doldurmak için tıklayın</p>
                <p className="text-xs mt-1">Konum bilginizi ekleyin</p>
              </div>
            </div>
          )
        )}
      </>
    );

    // Sidebar Layout - Professional Theme
    if (config.layout === "two-column") {
      return (
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
          {/* Sol Kolon - Profil, İletişim, Yetenekler, Diller */}
          <div
            className={`w-full lg:w-1/4 p-4 md:p-6 lg:p-8 rounded-2xl shadow-2xl`}
            style={{
              background: customization.colorPalette?.primary
                ? `linear-gradient(135deg, ${
                    customization.colorPalette.primary
                  }, ${
                    customization.colorPalette.secondary ||
                    customization.colorPalette.primary
                  })`
                : customization.professionalLeftBg || "#1e3a8a",
              color: customization.professionalLeftText || "#ffffff",
            }}
          >
            {/* Profil */}
            <div className="text-center mb-6 md:mb-8">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full mx-auto mb-4 md:mb-6 p-1">
                {customization.profilePhoto ? (
                  <img
                    src={customization.profilePhoto}
                    alt="Profil"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold">
                      {formData.ad?.[0]}
                      {formData.soyad?.[0]}
                    </span>
                  </div>
                )}
              </div>
              <h1
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ fontSize: "var(--font-size-heading)" }}
              >
                {formData.ad} {formData.soyad}
              </h1>
              <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-white/20 rounded-full text-xs md:text-sm font-medium">
                {formData.ozelMeslek || "Profesyonel"}
              </div>
              {formData.dogumTarihi && (
                <p className="opacity-70 text-sm mt-3">
                  📅 {formData.dogumTarihi}
                </p>
              )}
            </div>

            {/* İletişim Bilgileri */}
            {isSectionVisible("contact") && formData.iletisim && (
              <div className="mb-6 md:mb-8">
                <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 pb-2 border-b border-white/30 flex items-center justify-between">
                  <div className="flex items-center">
                    <FiPhone className="w-5 h-5 mr-2" />
                    İletişim Bilgileri
                  </div>
                  {isEditing && (
                    <div className="flex items-center gap-2">
                      {/* Görünürlük Butonu */}
                      <button
                        onClick={() => onToggleSectionVisibility?.("contact")}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all cursor-pointer relative group"
                        title={
                          isSectionVisible("contact")
                            ? "Bölümü Gizle"
                            : "Bölümü Göster"
                        }
                      >
                        {isSectionVisible("contact") ? (
                          <FiEye className="w-4 h-4 text-white" />
                        ) : (
                          <FiEyeOff className="w-4 h-4 text-white/50" />
                        )}
                        {/* Tooltip */}
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          {isSectionVisible("contact")
                            ? "Bölümü Gizle"
                            : "Bölümü Göster"}
                        </span>
                      </button>

                      {/* Düzenle Butonu */}
                      <button
                        onClick={() => onEditItem("contact", formData.iletisim)}
                        className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs transition-all"
                      >
                        <FiEdit3 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </h3>
                <div className="space-y-3">
                  {formData.iletisim.telefon && (
                    <a
                      href={`tel:${formData.iletisim.telefon}`}
                      className="flex items-center opacity-90 hover:opacity-100 transition-opacity group"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                        <FiPhone className="w-4 h-4" />
                      </div>
                      <span className="text-sm">
                        {formData.iletisim.telefon}
                      </span>
                    </a>
                  )}
                  {formData.iletisim.email && (
                    <a
                      href={`mailto:${formData.iletisim.email}`}
                      className="flex items-center opacity-90 hover:opacity-100 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                        <FiMail className="w-4 h-4" />
                      </div>
                      <span className="text-sm break-all">
                        {formData.iletisim.email}
                      </span>
                    </a>
                  )}
                  {formData.iletisim.website && (
                    <a
                      href={`https://${formData.iletisim.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center opacity-90 hover:opacity-100 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                        <FiGlobe className="w-4 h-4" />
                      </div>
                      <span className="text-sm break-all">
                        {formData.iletisim.website}
                      </span>
                    </a>
                  )}
                  {formData.iletisim.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${formData.iletisim.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center opacity-90 hover:opacity-100 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                        <FiLinkedin className="w-4 h-4" />
                      </div>
                      <span className="text-sm">
                        {formData.iletisim.linkedin}
                      </span>
                    </a>
                  )}
                  {formData.iletisim.instagram && (
                    <a
                      href={`https://instagram.com/${formData.iletisim.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center opacity-90 hover:opacity-100 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                        <FiInstagram className="w-4 h-4" />
                      </div>
                      <span className="text-sm">
                        {formData.iletisim.instagram}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Yetenekler - Progress bars */}
            {isSectionVisible("skills") &&
            formData.yetenekler &&
            formData.yetenekler.length > 0 ? (
              <EditableSidebarSection
                title="Yetenekler"
                icon={<FiCode className="w-5 h-5" />}
                sectionKey="skills"
                items={formData.yetenekler}
                isEditing={isEditing}
                onEdit={onEditItem}
                onDelete={onDeleteItem}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                customization={customization}
                onToggleSectionVisibility={onToggleSectionVisibility}
                renderContent={(yetenek, index) => (
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{yetenek.ad}</span>
                      <span className="text-xs opacity-60 capitalize">
                        {yetenek.seviye}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-200 rounded-full transition-all"
                        style={{
                          width:
                            yetenek.seviye === "uzman"
                              ? "95%"
                              : yetenek.seviye === "ileri"
                              ? "75%"
                              : yetenek.seviye === "orta"
                              ? "50%"
                              : "30%",
                        }}
                      />
                    </div>
                  </div>
                )}
              />
            ) : (
              isSectionVisible("skills") &&
              isEditing && (
                <EditableSidebarSection
                  title="Yetenekler"
                  icon={<FiCode className="w-5 h-5" />}
                  sectionKey="skills"
                  items={[]}
                  isEditing={isEditing}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  renderContent={() => null}
                  customization={customization}
                  onToggleSectionVisibility={onToggleSectionVisibility}
                />
              )
            )}

            {/* Dil Bilgisi */}
            {isSectionVisible("languages") &&
            formData.dilBilgisi &&
            formData.dilBilgisi.length > 0 ? (
              <EditableSidebarSection
                title="Diller"
                icon={<FiGlobe className="w-5 h-5" />}
                sectionKey="languages"
                items={formData.dilBilgisi}
                isEditing={isEditing}
                onEdit={onEditItem}
                onDelete={onDeleteItem}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                customization={customization}
                onToggleSectionVisibility={onToggleSectionVisibility}
                renderContent={(dil, index) => (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {formatLanguage(dil.dil)}
                    </span>
                    <span className="text-xs px-3 py-1 bg-white/20 rounded-full">
                      {formatLevel(dil.konusma)}
                    </span>
                  </div>
                )}
              />
            ) : (
              isSectionVisible("languages") &&
              isEditing && (
                <EditableSidebarSection
                  title="Diller"
                  icon={<FiGlobe className="w-5 h-5" />}
                  sectionKey="languages"
                  items={[]}
                  isEditing={isEditing}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  renderContent={() => null}
                  customization={customization}
                  onToggleSectionVisibility={onToggleSectionVisibility}
                />
              )
            )}

            {/* Yaşadığı Yerler */}
            {isSectionVisible("cities") &&
            formData.yasadigiYerler &&
            formData.yasadigiYerler.length > 0 ? (
              <EditableSidebarSection
                title="Yaşadığı Yerler"
                icon={<FiMapPin className="w-5 h-5" />}
                sectionKey="cities"
                items={formData.yasadigiYerler}
                isEditing={isEditing}
                onEdit={onEditItem}
                onDelete={onDeleteItem}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                customization={customization}
                onToggleSectionVisibility={onToggleSectionVisibility}
                renderContent={(yer, index) => (
                  <div className="flex items-center gap-2">
                    <FiMapPin className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">{yer.sehir}</span>
                  </div>
                )}
              />
            ) : (
              isEditing && (
                <EditableSidebarSection
                  title="Yaşadığı Yerler"
                  icon={<FiMapPin className="w-5 h-5" />}
                  sectionKey="cities"
                  items={[]}
                  isEditing={isEditing}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  renderContent={() => null}
                  customization={customization}
                  onToggleSectionVisibility={onToggleSectionVisibility}
                />
              )
            )}

            {/* İlişki Durumu */}
            {isSectionVisible("relationship") && formData.iliskiDurumu ? (
              <div className="mb-6 md:mb-8">
                <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 pb-2 border-b border-white/30 flex items-center justify-between">
                  <div className="flex items-center">
                    <FiHeart className="w-5 h-5 mr-2" />
                    İlişki Durumu
                  </div>
                  {isEditing && (
                    <div className="flex items-center gap-2">
                      {/* Görünürlük Butonu */}
                      <button
                        onClick={() =>
                          onToggleSectionVisibility?.("relationship")
                        }
                        className="p-2 hover:bg-white/10 rounded-lg transition-all cursor-pointer relative group"
                        title={
                          isSectionVisible("relationship")
                            ? "Bölümü Gizle"
                            : "Bölümü Göster"
                        }
                      >
                        {isSectionVisible("relationship") ? (
                          <FiEye className="w-4 h-4 text-white" />
                        ) : (
                          <FiEyeOff className="w-4 h-4 text-white/50" />
                        )}
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          {isSectionVisible("relationship")
                            ? "Bölümü Gizle"
                            : "Bölümü Göster"}
                        </span>
                      </button>

                      {/* Düzenle Butonu */}
                      <button
                        onClick={() =>
                          onEditItem("relationship", formData.iliskiDurumu)
                        }
                        className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs transition-all"
                      >
                        <FiEdit3 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </h3>
                <div className="flex items-center gap-2 text-white/90">
                  <span className="text-lg">
                    {getRelationshipIcon(formData.iliskiDurumu.durum)}
                  </span>
                  <span className="text-sm">
                    {formatRelationship(formData.iliskiDurumu.durum)}
                  </span>
                </div>
              </div>
            ) : (
              isEditing && (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 pb-2 border-b border-white/30 flex items-center justify-between">
                    <div className="flex items-center">
                      <FiHeart className="w-5 h-5 mr-2" />
                      İlişki Durumu
                    </div>
                    <button
                      onClick={() => onEditItem("relationship", null)}
                      className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs transition-all"
                    >
                      <FiPlus className="w-3 h-3" />
                    </button>
                  </h3>
                  <p className="text-xs text-white/50">
                    İlişki durumu eklemek için + butonuna tıklayın
                  </p>
                </div>
              )
            )}

            {/* Görüntülenme ve Beğeni */}
            {!isEditing && (
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="space-y-3">
                  {/* Görüntülenme */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/80">
                      <FiUser className="w-4 h-4" />
                      <span className="text-sm">Görüntülenme</span>
                    </div>
                    <span className="text-white font-bold text-lg">
                      {viewCount || 0}
                    </span>
                  </div>

                  {/* Beğeni */}
                  {onLikeClick && (
                    <button
                      onClick={onLikeClick}
                      className="w-full flex items-center justify-between hover:bg-white/5 p-2 rounded-lg transition-all"
                    >
                      <div className="flex items-center gap-2 text-white/80">
                        <FiHeart className="w-4 h-4" />
                        <span className="text-sm">Beğeni</span>
                      </div>
                      <span className="text-white font-bold text-lg">
                        {likeCount || 0}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sağ Kolon - 2 Column Grid */}
          <div className={`w-full lg:w-3/4`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Harita */}
              {isSectionVisible("location") && formData.haritaKonumu ? (
                <div className="bg-white rounded-xl shadow-md border-l-4 border-blue-600 p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <FiMapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      Konum
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => onEditItem("map", formData.haritaKonumu)}
                        className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs transition-all"
                      >
                        <FiEdit3 className="w-3 h-3" />
                      </button>
                    )}
                  </h3>
                  <div className="text-gray-600 mb-3 text-sm">
                    {formData.adres}
                  </div>
                  <div className="h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.google.com/maps?q=${formData.haritaKonumu.lat},${formData.haritaKonumu.lng}&hl=tr&z=14&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Konum Haritası"
                    />
                  </div>
                </div>
              ) : (
                isSectionVisible("location") &&
                isEditing && (
                  <div className="bg-white rounded-xl shadow-md border-l-4 border-gray-300 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <FiMapPin className="w-5 h-5 text-gray-600" />
                      </div>
                      Konum
                    </h3>
                    <div
                      className="text-gray-400 text-center py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-600 transition-all"
                      onClick={() => onEditItem("map", null)}
                    >
                      <FiEdit3 className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">Konumunuzu ekleyin</p>
                    </div>
                  </div>
                )
              )}

              {/* Eğitim Ağacı */}
              {isSectionVisible("education") &&
              formData.egitimler &&
              formData.egitimler.length > 0 ? (
                <EditableCard
                  title="Eğitim"
                  icon={<FiBookOpen className="w-5 h-5" />}
                  sectionKey="education"
                  items={formData.egitimler}
                  borderColor="border-emerald-600"
                  bgColor="bg-emerald-100"
                  iconColor="text-emerald-600"
                  isEditing={isEditing}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  customization={customization}
                  renderItem={(egitim, index) => (
                    <div className="relative pl-6 pb-4 border-l-2 border-emerald-200 last:border-l-0 last:pb-0">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-600 rounded-full border-2 border-white shadow-sm" />
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {egitim.okulAdi}
                      </h4>
                      <p className="text-gray-600 text-xs">{egitim.bolum}</p>
                      <p className="text-gray-400 text-xs mt-1 capitalize">
                        {egitim.derece} • {egitim.mezunTarihi}
                      </p>
                    </div>
                  )}
                />
              ) : (
                isSectionVisible("education") &&
                isEditing && (
                  <EditableCard
                    title="Eğitim"
                    icon={<FiBookOpen className="w-5 h-5" />}
                    sectionKey="education"
                    items={[]}
                    borderColor="border-gray-300"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-600"
                    isEditing={isEditing}
                    onDelete={onDeleteItem}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    customization={customization}
                    renderItem={() => null}
                    onToggleSectionVisibility={onToggleSectionVisibility}
                  />
                )
              )}

              {/* İş Deneyimi */}
              {isSectionVisible("experience") &&
              formData.calismaGecmisi &&
              formData.calismaGecmisi.length > 0 ? (
                <EditableCard
                  title="İş Deneyimi"
                  icon={<FiBriefcase className="w-5 h-5" />}
                  sectionKey="experience"
                  items={formData.calismaGecmisi}
                  borderColor="border-red-600"
                  bgColor="bg-red-100"
                  iconColor="text-red-600"
                  colSpan="lg:col-span-2"
                  isEditing={isEditing}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  customization={customization}
                  renderItem={(is, index) => (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900">
                        {is.pozisyon}
                      </h4>
                      <p className="text-gray-600 text-sm">{is.sirketAdi}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {is.baslangicTarihi} -{" "}
                        {is.halaCalisiyor ? "Devam Ediyor" : is.bitisTarihi}
                      </p>
                      {is.aciklama && (
                        <p className="text-gray-600 text-xs mt-2">
                          {is.aciklama}
                        </p>
                      )}
                    </div>
                  )}
                />
              ) : (
                isSectionVisible("experience") &&
                isEditing && (
                  <EditableCard
                    title="İş Deneyimi"
                    icon={<FiBriefcase className="w-5 h-5" />}
                    sectionKey="experience"
                    items={[]}
                    borderColor="border-gray-300"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-600"
                    colSpan="lg:col-span-2"
                    isEditing={isEditing}
                    onDelete={onDeleteItem}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    customization={customization}
                    renderItem={() => null}
                    onToggleSectionVisibility={onToggleSectionVisibility}
                  />
                )
              )}

              {/* Hayat Hikayesi */}
              {isSectionVisible("about") && formData.hayatHikayesi ? (
                <div className="bg-white rounded-xl shadow-md border-l-4 border-orange-600 p-4 md:p-6 lg:col-span-2">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <FiBook className="w-5 h-5 text-orange-600" />
                      </div>
                      Hakkımda
                    </div>
                    {isEditing && (
                      <button
                        onClick={() =>
                          onEditItem("about", formData.hayatHikayesi)
                        }
                        className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs transition-all"
                      >
                        <FiEdit3 className="w-3 h-3" />
                      </button>
                    )}
                  </h3>
                  <div
                    className="text-gray-700 leading-relaxed text-sm prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: formData.hayatHikayesi }}
                  />
                </div>
              ) : (
                isSectionVisible("about") &&
                isEditing && (
                  <div className="bg-white rounded-xl shadow-md border-l-4 border-gray-300 p-6 lg:col-span-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <FiBook className="w-5 h-5 text-gray-600" />
                      </div>
                      Hakkımda
                    </h3>
                    <div
                      className="text-gray-400 text-center py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 hover:text-emerald-600 transition-all"
                      onClick={() => onEditItem("about", null)}
                    >
                      <FiEdit3 className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">
                        Hayat hikayenizi ekleyin
                      </p>
                    </div>
                  </div>
                )
              )}

              {/* Sertifikalar */}
              {isSectionVisible("certificates") &&
              formData.sertifikalar &&
              formData.sertifikalar.length > 0 ? (
                <EditableCard
                  title="Sertifikalar"
                  icon={<FiAward className="w-5 h-5" />}
                  sectionKey="certificates"
                  items={formData.sertifikalar}
                  borderColor="border-yellow-600"
                  bgColor="bg-yellow-100"
                  iconColor="text-yellow-600"
                  isEditing={isEditing}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  customization={customization}
                  renderItem={(sertifika, index) => (
                    <div className="border-b border-gray-100 pb-3 last:border-0">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {sertifika.ad}
                      </h4>
                      <p className="text-gray-600 text-xs">
                        {sertifika.verenKurum}
                      </p>
                      <p className="text-gray-400 text-xs">{sertifika.tarih}</p>
                    </div>
                  )}
                />
              ) : (
                isSectionVisible("certificates") &&
                isEditing && (
                  <EditableCard
                    title="Sertifikalar"
                    icon={<FiAward className="w-5 h-5" />}
                    sectionKey="certificates"
                    items={[]}
                    borderColor="border-gray-300"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-600"
                    isEditing={isEditing}
                    onDelete={onDeleteItem}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    customization={customization}
                    renderItem={() => null}
                    onToggleSectionVisibility={onToggleSectionVisibility}
                  />
                )
              )}

              {/* Ödüller */}
              {isSectionVisible("awards") &&
              formData.oduller &&
              formData.oduller.length > 0 ? (
                <EditableCard
                  title="Ödüller"
                  icon={<FiStar className="w-5 h-5" />}
                  sectionKey="awards"
                  items={formData.oduller}
                  borderColor="border-teal-600"
                  bgColor="bg-teal-100"
                  iconColor="text-teal-600"
                  isEditing={isEditing}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  customization={customization}
                  renderItem={(odul, index) => (
                    <div className="border-b border-gray-100 pb-3 last:border-0">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {odul.ad}
                      </h4>
                      <p className="text-gray-600 text-xs">{odul.verenKurum}</p>
                      <p className="text-gray-400 text-xs">{odul.tarih}</p>
                    </div>
                  )}
                />
              ) : (
                isSectionVisible("awards") &&
                isEditing && (
                  <EditableCard
                    title="Ödüller"
                    icon={<FiStar className="w-5 h-5" />}
                    sectionKey="awards"
                    items={[]}
                    borderColor="border-gray-300"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-600"
                    isEditing={isEditing}
                    onDelete={onDeleteItem}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    customization={customization}
                    renderItem={() => null}
                    onToggleSectionVisibility={onToggleSectionVisibility}
                  />
                )
              )}

              {/* Hobiler */}
              {isSectionVisible("hobbies") &&
              formData.hobiler &&
              formData.hobiler.length > 0 ? (
                <EditableCard
                  title="Hobiler"
                  icon={<FiHeart className="w-5 h-5" />}
                  sectionKey="hobbies"
                  items={formData.hobiler}
                  borderColor="border-rose-600"
                  bgColor="bg-rose-100"
                  iconColor="text-rose-600"
                  isEditing={isEditing}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  customization={customization}
                  renderItem={(hobi, index) => (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {hobi.ad}
                        </h4>
                        {hobi.seviye && (
                          <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs rounded-full capitalize">
                            {hobi.seviye}
                          </span>
                        )}
                      </div>
                      {hobi.aciklama && (
                        <p className="text-gray-600 text-xs mt-1">
                          {hobi.aciklama}
                        </p>
                      )}
                    </div>
                  )}
                />
              ) : (
                isSectionVisible("hobbies") &&
                isEditing && (
                  <EditableCard
                    title="Hobiler"
                    icon={<FiHeart className="w-5 h-5" />}
                    sectionKey="hobbies"
                    items={[]}
                    borderColor="border-gray-300"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-600"
                    isEditing={isEditing}
                    onDelete={onDeleteItem}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    customization={customization}
                    renderItem={() => null}
                    onToggleSectionVisibility={onToggleSectionVisibility}
                  />
                )
              )}

              {/* Projeler */}
              {isSectionVisible("projects") &&
              formData.projeler &&
              formData.projeler.length > 0 ? (
                <EditableCard
                  title="Projeler"
                  icon={<FiCode className="w-5 h-5" />}
                  sectionKey="projects"
                  items={formData.projeler}
                  borderColor="border-green-600"
                  bgColor="bg-green-100"
                  iconColor="text-green-600"
                  isEditing={isEditing}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  customization={customization}
                  onToggleSectionVisibility={onToggleSectionVisibility}
                  renderItem={(proje, index) => {
                    // Teknolojiler string ise array'e çevir
                    const teknolojiler = Array.isArray(proje.teknolojiler)
                      ? proje.teknolojiler
                      : typeof proje.teknolojiler === "string"
                      ? proje.teknolojiler
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean)
                      : [];

                    return (
                      <div className="border-b border-gray-100 pb-3 last:border-0">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {proje.ad}
                        </h4>
                        {proje.aciklama && (
                          <p className="text-gray-600 text-xs mt-1">
                            {proje.aciklama}
                          </p>
                        )}
                        {teknolojiler.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {teknolojiler.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        {proje.link && (
                          <a
                            href={proje.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-xs hover:underline mt-2 inline-block"
                          >
                            Projeyi Görüntüle
                          </a>
                        )}
                      </div>
                    );
                  }}
                />
              ) : (
                isSectionVisible("projects") &&
                isEditing && (
                  <EditableCard
                    title="Projeler"
                    icon={<FiCode className="w-5 h-5" />}
                    sectionKey="projects"
                    items={[]}
                    borderColor="border-gray-300"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-600"
                    isEditing={isEditing}
                    onDelete={onDeleteItem}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    customization={customization}
                    renderItem={() => null}
                    onToggleSectionVisibility={onToggleSectionVisibility}
                  />
                )
              )}

              {/* Fotoğraf Galerisi */}
              {isSectionVisible("photoGallery") &&
              customization.photoGallery?.filter(
                (p) => p.url && p.adminApproved
              ).length > 0 ? (
                <EditableCard
                  title="Fotoğraf Galerisi"
                  icon={<FiImage className="w-5 h-5" />}
                  sectionKey="photoGallery"
                  items={customization.photoGallery.filter(
                    (p) => p.url && p.adminApproved
                  )}
                  borderColor="border-purple-600"
                  bgColor="bg-purple-100"
                  iconColor="text-purple-600"
                  colSpan="lg:col-span-2"
                  isEditing={isEditing}
                  onEdit={onEditItem}
                  onDelete={() => {}}
                  onMoveUp={() => {}}
                  onMoveDown={() => {}}
                  customization={customization}
                  renderItem={(photo, index) => (
                    <img
                      src={photo.url}
                      alt={`Galeri ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                    />
                  )}
                />
              ) : (
                isSectionVisible("photoGallery") &&
                isEditing && (
                  <EditableCard
                    title="Fotoğraf Galerisi"
                    icon={<FiImage className="w-5 h-5" />}
                    sectionKey="photoGallery"
                    items={[]}
                    borderColor="border-gray-300"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-600"
                    colSpan="lg:col-span-2"
                    isEditing={isEditing}
                    onEdit={onEditItem}
                    onDelete={() => {}}
                    onMoveUp={() => {}}
                    onMoveDown={() => {}}
                    customization={customization}
                    renderItem={() => (
                      <div className="text-center py-8">
                        <FiImage className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-400">
                          Fotoğraf galerisi ekleyin
                        </p>
                        <p className="text-xs mt-1 text-gray-500">
                          Maksimum 20 fotoğraf yükleyebilirsiniz
                        </p>
                        <p className="text-xs mt-1 text-orange-500">
                          Fotoğraflar admin onayından sonra görünecektir
                        </p>
                      </div>
                    )}
                  />
                )
              )}

              {/* Yayınlar */}
              {isSectionVisible("publications") &&
              formData.yayinlar &&
              formData.yayinlar.length > 0 ? (
                <EditableCard
                  title="Yayınlar"
                  icon={<FiBook className="w-5 h-5" />}
                  sectionKey="publications"
                  items={formData.yayinlar}
                  borderColor="border-pink-600"
                  bgColor="bg-pink-100"
                  iconColor="text-pink-600"
                  colSpan="lg:col-span-2"
                  isEditing={isEditing}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  customization={customization}
                  renderItem={(yayin, index) => (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {yayin.baslik}
                      </h4>
                      <p className="text-gray-600 text-xs">{yayin.yayinYeri}</p>
                      <p className="text-gray-400 text-xs">{yayin.tarih}</p>
                    </div>
                  )}
                />
              ) : (
                isSectionVisible("publications") &&
                isEditing && (
                  <EditableCard
                    title="Yayınlar"
                    icon={<FiBook className="w-5 h-5" />}
                    sectionKey="publications"
                    items={[]}
                    borderColor="border-gray-300"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-600"
                    colSpan="lg:col-span-2"
                    isEditing={isEditing}
                    onDelete={onDeleteItem}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    customization={customization}
                    renderItem={() => null}
                    onToggleSectionVisibility={onToggleSectionVisibility}
                  />
                )
              )}

              {/* Sosyal Sorumluluk */}
              {isSectionVisible("social") &&
              formData.sosyalSorumluluk &&
              formData.sosyalSorumluluk.length > 0 ? (
                <EditableCard
                  title="Sosyal Sorumluluk"
                  icon={<FiUsers className="w-5 h-5" />}
                  sectionKey="social"
                  items={formData.sosyalSorumluluk}
                  borderColor="border-cyan-600"
                  bgColor="bg-cyan-100"
                  iconColor="text-cyan-600"
                  isEditing={isEditing}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  customization={customization}
                  renderItem={(sosyal, index) => (
                    <div className="border-b border-gray-100 pb-3 last:border-0">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {sosyal.ad}
                      </h4>
                      <p className="text-gray-600 text-xs">
                        {sosyal.organizasyon}
                      </p>
                      <p className="text-gray-400 text-xs">{sosyal.tarih}</p>
                    </div>
                  )}
                />
              ) : (
                isSectionVisible("social") &&
                isEditing && (
                  <EditableCard
                    title="Sosyal Sorumluluk"
                    icon={<FiUsers className="w-5 h-5" />}
                    sectionKey="social"
                    items={[]}
                    borderColor="border-gray-300"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-600"
                    isEditing={isEditing}
                    onDelete={onDeleteItem}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    customization={customization}
                    renderItem={() => null}
                    onToggleSectionVisibility={onToggleSectionVisibility}
                  />
                )
              )}

              {/* Referanslar */}
              {isSectionVisible("references") &&
              formData.referanslar &&
              formData.referanslar.length > 0 ? (
                <EditableCard
                  title="Referanslar"
                  icon={<FiUser className="w-5 h-5" />}
                  sectionKey="references"
                  items={formData.referanslar}
                  borderColor="border-emerald-500"
                  bgColor="bg-emerald-100"
                  iconColor="text-emerald-500"
                  isEditing={isEditing}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  customization={customization}
                  renderItem={(ref, index) => (
                    <div className="border-b border-gray-100 pb-3 last:border-0">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {ref.ad} {ref.soyad}
                      </h4>
                      <p className="text-gray-600 text-xs">{ref.pozisyon}</p>
                      <p className="text-gray-600 text-xs">{ref.sirket}</p>
                    </div>
                  )}
                />
              ) : (
                isSectionVisible("references") &&
                isEditing && (
                  <EditableCard
                    title="Referanslar"
                    icon={<FiUser className="w-5 h-5" />}
                    sectionKey="references"
                    items={[]}
                    borderColor="border-gray-300"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-600"
                    isEditing={isEditing}
                    onDelete={onDeleteItem}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    customization={customization}
                    renderItem={() => null}
                    onToggleSectionVisibility={onToggleSectionVisibility}
                  />
                )
              )}

              {/* Hizmetler */}
              {formData.hizmetler && formData.hizmetler.length > 0 ? (
                <EditableCard
                  title="Hizmetler"
                  icon={<FiTool className="w-5 h-5" />}
                  sectionKey="services"
                  items={formData.hizmetler}
                  borderColor="border-indigo-600"
                  bgColor="bg-indigo-100"
                  iconColor="text-indigo-600"
                  colSpan="lg:col-span-2"
                  isEditing={isEditing}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  customization={customization}
                  renderItem={(hizmet, index) => (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900">
                        {hizmet.ad}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {hizmet.aciklama}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-indigo-600 font-semibold text-sm">
                          {hizmet.fiyat}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {hizmet.sure}
                        </span>
                      </div>
                      {!isEditing && (
                        <button
                          onClick={() => onAppointmentClick(hizmet)}
                          className="w-full mt-3 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
                        >
                          Randevu Al
                        </button>
                      )}
                    </div>
                  )}
                />
              ) : (
                isEditing && (
                  <EditableCard
                    title="Hizmetler"
                    icon={<FiTool className="w-5 h-5" />}
                    sectionKey="services"
                    items={[]}
                    borderColor="border-gray-300"
                    bgColor="bg-gray-100"
                    iconColor="text-gray-600"
                    colSpan="lg:col-span-2"
                    isEditing={isEditing}
                    onDelete={onDeleteItem}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    customization={customization}
                    renderItem={() => null}
                    onToggleSectionVisibility={onToggleSectionVisibility}
                  />
                )
              )}

              {/* Network / Bağlantılar */}
              {isSectionVisible("network") &&
              formData.network &&
              formData.network.length > 0 ? (
                <EditableCard
                  title="Network / Bağlantılar"
                  icon={<FiUsers className="w-5 h-5" />}
                  sectionKey="network"
                  items={formData.network}
                  borderColor="border-purple-300"
                  bgColor="bg-purple-100"
                  iconColor="text-purple-600"
                  colSpan="lg:col-span-2"
                  isEditing={isEditing}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  customization={customization}
                  onToggleSectionVisibility={onToggleSectionVisibility}
                  renderItem={(person, index) => (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">
                          {getNetworkIcon(person.iliskiTuru)}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {person.ad}
                          </h3>
                          <p className="text-sm text-purple-600 font-medium">
                            {formatNetworkRelation(
                              person.iliskiTuru,
                              person.digerIliski
                            )}
                          </p>
                          {person.aciklama && (
                            <p className="text-sm text-gray-600 mt-2">
                              {person.aciklama}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              ) : (
                isEditing && (
                  <EditableCard
                    title="Network / Bağlantılar"
                    icon={<FiUsers className="w-5 h-5" />}
                    sectionKey="network"
                    items={[]}
                    borderColor="border-purple-300"
                    bgColor="bg-purple-100"
                    iconColor="text-purple-600"
                    colSpan="lg:col-span-2"
                    isEditing={isEditing}
                    onEdit={onEditItem}
                    onDelete={onDeleteItem}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    customization={customization}
                    onToggleSectionVisibility={onToggleSectionVisibility}
                    renderItem={() => null}
                  />
                )
              )}

              {/* Okuduğu Kitaplar */}
              {isSectionVisible("books") &&
              formData.okuduguKitaplar &&
              formData.okuduguKitaplar.length > 0 ? (
                <EditableCard
                  title="Okuduğu Kitaplar"
                  icon={<FiBook className="w-5 h-5" />}
                  sectionKey="books"
                  items={formData.okuduguKitaplar}
                  borderColor="border-amber-300"
                  bgColor="bg-amber-100"
                  iconColor="text-amber-600"
                  colSpan="lg:col-span-2"
                  isEditing={isEditing}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  customization={customization}
                  onToggleSectionVisibility={onToggleSectionVisibility}
                  renderItem={(kitap, index) => (
                    <div className="flex items-center gap-3 py-2">
                      <span className="text-2xl flex-shrink-0">📚</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {kitap.kitapAdi}
                        </p>
                        <p className="text-sm text-gray-600">{kitap.yazar}</p>
                      </div>
                    </div>
                  )}
                />
              ) : (
                isEditing && (
                  <EditableCard
                    title="Okuduğu Kitaplar"
                    icon={<FiBook className="w-5 h-5" />}
                    sectionKey="books"
                    items={[]}
                    borderColor="border-amber-300"
                    bgColor="bg-amber-100"
                    iconColor="text-amber-600"
                    colSpan="lg:col-span-2"
                    isEditing={isEditing}
                    onEdit={onEditItem}
                    onDelete={onDeleteItem}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    customization={customization}
                    onToggleSectionVisibility={onToggleSectionVisibility}
                    renderItem={() => null}
                  />
                )
              )}

              {/* Tuttuğu Takımlar */}
              {isSectionVisible("teams") &&
              formData.tuttuguTakimlar &&
              formData.tuttuguTakimlar.length > 0 ? (
                <EditableCard
                  title="Tuttuğu Takımlar"
                  icon={<FiAward className="w-5 h-5" />}
                  sectionKey="teams"
                  items={formData.tuttuguTakimlar}
                  borderColor="border-green-300"
                  bgColor="bg-green-100"
                  iconColor="text-green-600"
                  colSpan="lg:col-span-2"
                  isEditing={isEditing}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  customization={customization}
                  onToggleSectionVisibility={onToggleSectionVisibility}
                  renderItem={(takim, index) => (
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <span className="text-2xl">⚽</span>
                      <span className="text-gray-800 font-medium">
                        {takim.takimAdi}
                      </span>
                    </div>
                  )}
                />
              ) : (
                isEditing && (
                  <EditableCard
                    title="Tuttuğu Takımlar"
                    icon={<FiAward className="w-5 h-5" />}
                    sectionKey="teams"
                    items={[]}
                    borderColor="border-green-300"
                    bgColor="bg-green-100"
                    iconColor="text-green-600"
                    colSpan="lg:col-span-2"
                    isEditing={isEditing}
                    onEdit={onEditItem}
                    onDelete={onDeleteItem}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    customization={customization}
                    onToggleSectionVisibility={onToggleSectionVisibility}
                    renderItem={() => null}
                  />
                )
              )}

              {/* Özel Bölümler */}
              {customSections.map((customSection) => (
                <div key={customSection.id} className="lg:col-span-2">
                  {renderCustomSection(customSection)}
                </div>
              ))}

              {/* Yorumlar Bölümü - Sağ kısımda */}
              {!isEditing && (
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <FiMessageSquare className="text-blue-500" />
                      Yorumlar ({comments?.length || 0})
                    </h2>

                    {/* Yorum Listesi */}
                    {comments && comments.length > 0 ? (
                      <div className="space-y-4 mb-6">
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
                                    {new Date(
                                      comment.createdAt
                                    ).toLocaleDateString("tr-TR")}
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
                      <div className="text-center py-8 mb-6">
                        <FiMessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          Henüz yorum yapılmamış. İlk yorumu siz yapın!
                        </p>
                      </div>
                    )}

                    {/* Yorum Formu */}
                    {onCommentSubmit && (
                      <CommentForm onCommentSubmit={onCommentSubmit} />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Classic Layout (Üst-Alt)
    if (config.layout === "top-bottom") {
      return (
        <div className="space-y-6 md:space-y-8">
          {/* Üst Bölüm - Header */}
          <div
            className={`${config.headerBg} ${config.headerTextColor} rounded-lg p-4 md:p-6 lg:p-8 text-center`}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white/30">
              {customization.profilePhoto ? (
                <img
                  src={customization.profilePhoto}
                  alt="Profil"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  {formData.ad?.[0]}
                  {formData.soyad?.[0]}
                </span>
              )}
            </div>
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2"
              style={{ fontSize: "var(--font-size-heading)" }}
            >
              {formData.ad} {formData.soyad}
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-1">
              {formData.ozelMeslek || "Profesyonel"}
            </p>
            {isSectionVisible("location") && (
              <p className="opacity-80 text-sm md:text-base px-4">
                {formData.adres || "Konum Belirtilmemiş"}
              </p>
            )}
            {formData.dogumTarihi && (
              <p className="opacity-70 mt-2 text-sm md:text-base">
                🎂 Doğum Tarihi: {formData.dogumTarihi}
              </p>
            )}
          </div>

          {/* Alt Bölüm - İçerik */}
          <div className="space-y-4 md:space-y-6">{allSections}</div>
        </div>
      );
    }

    // Default Layout (Hero ve diğerleri)
    return (
      <div className="space-y-4 md:space-y-6 lg:space-y-8">{allSections}</div>
    );
  };

  // Customization ile stil hesapla
  const getCustomizedStyle = () => {
    const style = {};

    // Arkaplan türüne göre stil
    if (customization.backgroundType === "gradient" && customization.gradient) {
      const { type, colors, angle } = customization.gradient;
      if (type === "linear") {
        style.backgroundImage = `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`;
      } else if (type === "radial") {
        style.backgroundImage = `radial-gradient(circle, ${colors[0]}, ${colors[1]})`;
      }
    } else if (
      customization.backgroundType === "image" &&
      customization.backgroundImage
    ) {
      style.backgroundImage = `url(${customization.backgroundImage})`;
      style.backgroundSize = "cover";
      style.backgroundPosition = "center";
      style.backgroundRepeat = "no-repeat";
    } else if (
      customization.backgroundType === "solid" &&
      customization.backgroundColor
    ) {
      style.backgroundColor = customization.backgroundColor;
    }

    // Metin rengi
    if (customization.textColor) {
      style.color = customization.textColor;
    }

    // Spacing
    if (customization.padding) {
      style.padding = `${customization.padding}px`;
    }

    return style;
  };

  return (
    <div
      className={`min-h-screen ${config.background} ${
        config.textColor
      } relative font-${customization.fontFamily || "inter"}`}
      style={{
        ...getCustomizedStyle(),
        "--font-size-body": `${customization.fontSize?.body || 14}px`,
        "--font-size-subheading": `${
          customization.fontSize?.subheading || 18
        }px`,
        "--font-size-heading": `${customization.fontSize?.heading || 28}px`,
        fontSize: `${customization.fontSize?.body || 14}px`,
        lineHeight: customization.lineHeight || 1.6,
      }}
    >
      {/* Overlay for hero template */}
      {config.overlay && (
        <div className={`absolute inset-0 ${config.overlay}`}></div>
      )}

      {/* Customization overlay */}
      {customization.backgroundImage && (
        <div
          className="absolute inset-0 bg-black"
          style={{
            backdropFilter: `blur(${customization.backgroundBlur * 2}px)`,
            WebkitBackdropFilter: `blur(${customization.backgroundBlur * 2}px)`,
            opacity: customization.backgroundOpacity || 0.6,
          }}
        ></div>
      )}

      <div className="relative max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        {!config.layout && renderHeader()}
        {renderContent()}
      </div>
    </div>
  );
};

// Comment Form Component
function CommentForm({ onCommentSubmit }) {
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
              <span className="animate-spin">⏳</span>
            ) : (
              <>
                <FiSend className="w-4 h-4" />
                Yorum Gönder
              </>
            )}
          </button>
        </div>
      </form>
      <p className="text-xs text-gray-500 mt-2">
        * Yorumunuz admin onayından sonra yayınlanacaktır.
      </p>
    </div>
  );
}

// Comments Section Component (deprecated but kept for compatibility)
const CommentsSection = ({
  comments,
  onCommentSubmit,
  templateType,
  config,
}) => {
  return (
    <div className="mt-12">
      <div
        className={`${
          templateType === "hero"
            ? "bg-black/40 backdrop-blur-sm border border-white/20"
            : "bg-white/95 backdrop-blur-sm border border-gray-200"
        } rounded-xl p-8 shadow-lg`}
      >
        <h2
          className={`text-xl font-bold mb-6 flex items-center gap-2 ${
            templateType === "hero" ? "text-white" : "text-gray-800"
          }`}
        >
          <FiMessageSquare className="text-blue-400" />
          Yorumlar ({comments.length})
        </h2>

        {/* Yorum Listesi */}
        {comments.length > 0 ? (
          <div className="space-y-4 mb-8">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`border rounded-lg p-4 backdrop-blur-sm ${
                  templateType === "hero"
                    ? "border-gray-600 bg-gray-800/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      templateType === "hero" ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <FiUser
                      className={`w-5 h-5 ${
                        templateType === "hero"
                          ? "text-gray-300"
                          : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4
                        className={`font-semibold ${
                          templateType === "hero"
                            ? "text-white"
                            : "text-gray-800"
                        }`}
                      >
                        {comment.authorName}
                      </h4>
                      <span
                        className={`text-sm ${
                          templateType === "hero"
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {new Date(comment.createdAt).toLocaleDateString(
                          "tr-TR"
                        )}
                      </span>
                    </div>
                    <p
                      className={`leading-relaxed ${
                        templateType === "hero"
                          ? "text-gray-300"
                          : "text-gray-700"
                      }`}
                    >
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 mb-8">
            <FiMessageSquare
              className={`w-16 h-16 mx-auto mb-4 ${
                templateType === "hero" ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <p
              className={`${
                templateType === "hero" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Henüz yorum yapılmamış. İlk yorumu siz yapın!
            </p>
          </div>
        )}

        {/* Yorum Formu */}
        <div
          className={`border-t pt-6 ${
            templateType === "hero" ? "border-gray-600" : "border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              templateType === "hero" ? "text-white" : "text-gray-800"
            }`}
          >
            Yorum Yap
          </h3>
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    templateType === "hero" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Adınız *
                </label>
                <div className="relative">
                  <FiUser
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                      templateType === "hero"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    value={commentForm.authorName}
                    onChange={(e) =>
                      setCommentForm({
                        ...commentForm,
                        authorName: e.target.value,
                      })
                    }
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      templateType === "hero"
                        ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="Adınızı girin"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    templateType === "hero" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email *
                </label>
                <div className="relative">
                  <FiMail
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                      templateType === "hero"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  />
                  <input
                    type="email"
                    value={commentForm.authorEmail}
                    onChange={(e) =>
                      setCommentForm({
                        ...commentForm,
                        authorEmail: e.target.value,
                      })
                    }
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      templateType === "hero"
                        ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  templateType === "hero" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Yorumunuz *
              </label>
              <textarea
                value={commentForm.content}
                onChange={(e) =>
                  setCommentForm({ ...commentForm, content: e.target.value })
                }
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                  templateType === "hero"
                    ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
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
          <p
            className={`text-xs mt-2 ${
              templateType === "hero" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            * Yorumunuz admin onayından sonra yayınlanacaktır.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateRenderer;
