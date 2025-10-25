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
} from "react-icons/fi";

const SectionsTab = ({ customization, setCustomization }) => {
  const sections = [
    { id: "about", label: "Hakkımda / Hayat Hikayesi", icon: FiFileText },
    { id: "experience", label: "İş Deneyimi", icon: FiBriefcase },
    { id: "education", label: "Eğitim", icon: FiBook },
    { id: "skills", label: "Yetenekler", icon: FiAward },
    { id: "languages", label: "Dil Bilgisi", icon: FiGlobe },
    { id: "location", label: "Konum / Harita", icon: FiGlobe },
    { id: "photoGallery", label: "Fotoğraf Galerisi", icon: FiImage },
    { id: "certificates", label: "Sertifikalar", icon: FiFileText },
    { id: "awards", label: "Ödüller", icon: FiGift },
    { id: "hobbies", label: "Hobiler", icon: FiHeart },
    { id: "projects", label: "Projeler", icon: FiBook },
    { id: "social", label: "Sosyal Sorumluluk", icon: FiUsers },
    { id: "references", label: "Referanslar", icon: FiUsers },
    { id: "publications", label: "Yayınlar", icon: FiFileText },
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

  return (
    <div className="space-y-3">
      <div className="text-xs text-gray-600 mb-3">
        Hangi bölümlerin görüneceğini seçin
      </div>

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

      {/* Quick Actions */}
      <div className="pt-3 border-t border-gray-200 flex gap-2">
        <button
          onClick={() => {
            const allVisible = {};
            sections.forEach((s) => (allVisible[s.id] = true));
            setCustomization((prev) => ({
              ...prev,
              sectionVisibility: allVisible,
            }));
          }}
          className="flex-1 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium transition-colors"
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
          className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
        >
          Tümünü Gizle
        </button>
      </div>
    </div>
  );
};

export default SectionsTab;
