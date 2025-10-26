"use client";

import {
  FiEye,
  FiEyeOff,
  FiBriefcase,
  FiBook,
  FiAward,
  FiHeart,
  FiUsers,
  FiFileText,
  FiGift,
  FiGlobe,
  FiImage,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiMapPin,
} from "react-icons/fi";

const SectionsTab = ({
  customization,
  setCustomization,
  onOpenCustomSectionModal,
}) => {
  const sections = [
    { id: "contact", label: "İletişim Bilgileri", icon: FiFileText },
    { id: "about", label: "Hakkımda / Hayat Hikayesi", icon: FiFileText },
    { id: "experience", label: "İş Deneyimi", icon: FiBriefcase },
    { id: "education", label: "Eğitim", icon: FiBook },
    { id: "skills", label: "Yetenekler", icon: FiAward },
    { id: "languages", label: "Dil Bilgisi", icon: FiGlobe },
    { id: "cities", label: "Yaşadığı Yerler", icon: FiMapPin },
    { id: "relationship", label: "İlişki Durumu", icon: FiHeart },
    { id: "location", label: "Konum / Harita", icon: FiGlobe },
    { id: "photoGallery", label: "Fotoğraf Galerisi", icon: FiImage },
    { id: "certificates", label: "Sertifikalar", icon: FiFileText },
    { id: "awards", label: "Ödüller", icon: FiGift },
    { id: "hobbies", label: "Hobiler", icon: FiHeart },
    { id: "projects", label: "Projeler", icon: FiBook },
    { id: "social", label: "Sosyal Sorumluluk", icon: FiUsers },
    { id: "references", label: "Referanslar", icon: FiUsers },
    { id: "publications", label: "Yayınlar", icon: FiFileText },
    { id: "network", label: "Network / Bağlantılar", icon: FiUsers },
    { id: "books", label: "Okuduğu Kitaplar", icon: FiBook },
    { id: "teams", label: "Tuttuğu Takımlar", icon: FiAward },
  ];

  const toggleSection = (sectionId) => {
    setCustomization((prev) => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [sectionId]: !(prev.sectionVisibility?.[sectionId] ?? true),
      },
    }));
  };

  const isSectionVisible = (sectionId) => {
    return customization.sectionVisibility?.[sectionId] ?? true;
  };

  const toggleCustomSectionVisibility = (sectionId) => {
    const customSections = customization.customSections || [];
    const updatedSections = customSections.map((section) =>
      section.id === sectionId
        ? { ...section, visible: !section.visible }
        : section
    );
    setCustomization((prev) => ({
      ...prev,
      customSections: updatedSections,
    }));
  };

  // Gizli bölümleri filtrele
  const hiddenSections = sections.filter((s) => !isSectionVisible(s.id));
  const visibleSections = sections.filter((s) => isSectionVisible(s.id));

  return (
    <div className="space-y-3">
      <div className="text-xs text-white/80 mb-3">
        Hangi bölümlerin görüneceğini seçin
      </div>

      {/* Uyarı: Gizli Bölümler Var */}
      {hiddenSections.length > 0 && (
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-2 text-yellow-200">
            <FiEyeOff className="w-4 h-4" />
            <span className="text-xs font-medium">
              {hiddenSections.length} bölüm gizli - Aşağıdan geri
              getirebilirsiniz
            </span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isVisible = isSectionVisible(section.id);

          return (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                isVisible
                  ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  className={`w-4 h-4 ${
                    isVisible ? "text-emerald-600" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    isVisible ? "text-emerald-900" : "text-gray-500"
                  }`}
                >
                  {section.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isVisible ? (
                  <>
                    <FiEye className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-emerald-600 font-medium">
                      Görünür
                    </span>
                  </>
                ) : (
                  <>
                    <FiEyeOff className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">
                      Gizli
                    </span>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Gizli Bölümler (Eğer varsa) */}
      {hiddenSections.length > 0 && (
        <div className="pt-4 border-t border-white/20">
          <h4 className="text-xs font-bold text-white/60 mb-3 flex items-center gap-2">
            <FiEyeOff className="w-3 h-3" />
            Gizli Bölümler ({hiddenSections.length})
          </h4>
          <div className="space-y-2">
            {hiddenSections.map((section) => {
              const Icon = section.icon;
              const isVisible = isSectionVisible(section.id);

              return (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-200">
                      {section.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiEyeOff className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-yellow-300 font-medium">
                      Görmek için tıklayın
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="pt-3 border-t border-white/20 flex gap-2">
        <button
          onClick={() => {
            const allVisible = {};
            sections.forEach((s) => (allVisible[s.id] = true));
            setCustomization((prev) => ({
              ...prev,
              sectionVisibility: allVisible,
            }));
          }}
          className="flex-1 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 rounded-lg text-xs font-medium transition-colors border border-emerald-500/30"
        >
          Tümünü Göster
        </button>
        <button
          onClick={() => {
            const allHidden = {};
            sections.forEach((s) => (allHidden[s.id] = false));
            setCustomization((prev) => ({
              ...prev,
              sectionVisibility: allHidden,
            }));
          }}
          className="flex-1 px-3 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-200 rounded-lg text-xs font-medium transition-colors border border-gray-500/30"
        >
          Tümünü Gizle
        </button>
      </div>

      {/* Özel Bölümler */}
      <div className="mt-6 pt-6 border-t-2 border-gray-300">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-sm font-bold text-gray-800">Özel Bölümler</h4>
            <p className="text-xs text-gray-600">
              Kendi bölümlerinizi oluşturun (Maks. 5)
            </p>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {(customization.customSections || []).length} / 5
          </span>
        </div>

        {/* Özel Bölümler Listesi */}
        <div className="space-y-2 mb-3">
          {(customization.customSections || []).map((section) => (
            <div
              key={section.id}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                section.visible
                  ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <FiFileText
                  className={`w-4 h-4 flex-shrink-0 ${
                    section.visible ? "text-purple-600" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm font-medium truncate ${
                    section.visible ? "text-purple-900" : "text-gray-500"
                  }`}
                >
                  {section.title}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Görünürlük Toggle */}
                <button
                  onClick={() => toggleCustomSectionVisibility(section.id)}
                  className="p-1.5 hover:bg-white/50 rounded transition-colors"
                  title={section.visible ? "Gizle" : "Göster"}
                >
                  {section.visible ? (
                    <FiEye className="w-4 h-4 text-purple-600" />
                  ) : (
                    <FiEyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {/* Düzenle */}
                <button
                  onClick={() => onOpenCustomSectionModal(section)}
                  className="p-1.5 hover:bg-white/50 rounded transition-colors"
                  title="Düzenle"
                >
                  <FiEdit3 className="w-4 h-4 text-blue-600" />
                </button>

                {/* Sil */}
                <button
                  onClick={() => onOpenCustomSectionModal(section, "delete")}
                  className="p-1.5 hover:bg-white/50 rounded transition-colors"
                  title="Sil"
                >
                  <FiTrash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Yeni Özel Bölüm Ekle Butonu */}
        <button
          onClick={() => onOpenCustomSectionModal()}
          disabled={(customization.customSections || []).length >= 5}
          className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <FiPlus className="w-4 h-4" />
          Özel Bölüm Ekle
        </button>

        {(customization.customSections || []).length >= 5 && (
          <p className="text-xs text-red-600 text-center mt-2">
            Maksimum 5 özel bölüm ekleyebilirsiniz
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionsTab;
