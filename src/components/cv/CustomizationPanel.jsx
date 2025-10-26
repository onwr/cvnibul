"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSettings,
  FiChevronDown,
  FiChevronUp,
  FiLayout,
  FiImage,
  FiLayers,
} from "react-icons/fi";
import GeneralTab from "./customization/tabs/GeneralTab";
import VisualTab from "./customization/tabs/VisualTab";
import SectionsTab from "./customization/tabs/SectionsTab";

const CustomizationPanel = ({
  customization,
  setCustomization,
  onBack,
  isEditing,
  setIsEditing,
  selectedTheme,
  onFinishEditing,
  onOpenCustomSectionModal,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    visual: false,
    sections: false,
  });

  const sections = [
    {
      id: "general",
      label: "Genel Ayarlar",
      icon: FiLayout,
      component: GeneralTab,
      description: "Font, renk ve temel ayarlar",
    },
    {
      id: "visual",
      label: "Görsel Ayarlar",
      icon: FiImage,
      component: VisualTab,
      description: "Arkaplan ve görsel efektler",
    },
    {
      id: "sections",
      label: "Bölüm Yönetimi",
      icon: FiLayers,
      component: SectionsTab,
      description: "CV bölümlerini düzenle",
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="space-y-4">
      {/* Tema Bilgisi */}
      {selectedTheme && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{selectedTheme.icon}</span>
            <div>
              <h3 className="text-white font-semibold text-sm">
                {selectedTheme.name}
              </h3>
              <p className="text-white/70 text-xs">Mevcut Tema</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="w-full px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors border border-white/30"
          >
            Tema Değiştir
          </button>
        </div>
      )}

      {/* Özelleştirme Bölümleri */}
      <div className="space-y-3">
        {sections.map((section) => {
          const Icon = section.icon;
          const Component = section.component;
          const isExpanded = expandedSections[section.id];

          return (
            <div
              key={section.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-white" />
                  <div>
                    <h4 className="text-white font-medium text-sm">
                      {section.label}
                    </h4>
                    <p className="text-white/60 text-xs">
                      {section.description}
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <FiChevronUp className="w-4 h-4 text-white/60" />
                ) : (
                  <FiChevronDown className="w-4 h-4 text-white/60" />
                )}
              </button>

              {/* Section Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 border-t border-white/10">
                      <Component
                        customization={customization}
                        setCustomization={setCustomization}
                        onOpenCustomSectionModal={onOpenCustomSectionModal}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Düzenle Butonu */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <button
          onClick={() => {
            if (isEditing) {
              // Düzenleme modundaysa direkt yayınla
              onFinishEditing();
            } else {
              // Düzenleme modunda değilse düzenleme moduna geç
              setIsEditing(true);
            }
          }}
          className={`w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            isEditing
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-white hover:bg-gray-50 text-gray-800"
          }`}
        >
          <FiSettings className="w-4 h-4" />
          {isEditing ? "Sayfayı Yayınla" : "CV'yi Düzenle"}
        </button>
      </div>
    </div>
  );
};

export default CustomizationPanel;
