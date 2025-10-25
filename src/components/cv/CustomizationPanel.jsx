"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSettings,
  FiArrowLeft,
  FiEdit3,
  FiLayout,
  FiImage,
  FiLayers,
  FiSave,
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
}) => {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "Genel", icon: FiLayout },
    { id: "visual", label: "Görsel", icon: FiImage },
    { id: "sections", label: "Bölümler", icon: FiLayers },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <GeneralTab
            customization={customization}
            setCustomization={setCustomization}
          />
        );
      case "visual":
        return (
          <VisualTab
            customization={customization}
            setCustomization={setCustomization}
          />
        );
      case "sections":
        return (
          <SectionsTab
            customization={customization}
            setCustomization={setCustomization}
          />
        );
      case "export":
        return (
          <ExportTab
            customization={customization}
            setCustomization={setCustomization}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-40"
      style={{ height: "45vh" }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg">
          <h3 className="text-base font-bold text-white flex items-center">
            <FiSettings className="w-5 h-5 mr-2" />
            CV Özelleştirme
          </h3>

          <div className="flex gap-3">
            {/* Düzenle Butonu */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 backdrop-blur-sm text-white rounded-xl text-sm font-medium transition-all flex items-center border ${
                isEditing
                  ? "bg-orange-500/30 border-orange-300/50 hover:bg-orange-500/40"
                  : "bg-white/20 border-white/30 hover:bg-white/30 hover:border-white/50"
              }`}
            >
              <FiEdit3 className="w-4 h-4 mr-1.5" />
              {isEditing ? "Düzenlemeyi Bitir" : "Düzenle"}
            </button>

            {/* Geri Butonu */}
            <button
              onClick={onBack}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl text-sm font-medium transition-all flex items-center border border-white/30 hover:border-white/50"
            >
              <FiArrowLeft className="w-4 h-4 mr-1.5" />
              Şablon Seçimi
            </button>
          </div>
        </div>

        {/* Tema Bilgisi ve Değiştir Butonu */}
        {selectedTheme && (
          <div className="mx-4 mt-4 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="text-2xl">{selectedTheme.icon}</span>
                  {selectedTheme.name}
                </div>
                <div className="text-white/80 text-sm mt-1">Mevcut Tema</div>
              </div>
              <button
                onClick={onBack}
                className="px-4 py-2 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md"
              >
                Tema Değiştir
              </button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 px-4 py-3 bg-white border-b border-gray-100 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md scale-105"
                    : "bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border-2 border-gray-100 hover:border-emerald-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomizationPanel;
