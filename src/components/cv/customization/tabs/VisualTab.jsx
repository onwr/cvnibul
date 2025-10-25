"use client";

import { useState } from "react";
import { FiImage, FiUpload, FiX } from "react-icons/fi";
import GradientBuilder from "../controls/GradientBuilder";

const VisualTab = ({ customization, setCustomization }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleBackgroundUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const mockUrl = URL.createObjectURL(file);
      setCustomization((prev) => ({
        ...prev,
        backgroundType: "image",
        backgroundImage: mockUrl,
      }));
    } catch (error) {
      console.error("Resim yükleme hatası:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Profesyonel Şablon Renkleri */}
      <div className="space-y-3 pb-4 border-b-2 border-emerald-200 bg-emerald-50 p-4 rounded-xl">
        <label className="text-sm font-bold text-emerald-800 flex items-center">
          🎨 Profesyonel Şablon Renkleri
        </label>
        <p className="text-xs text-emerald-600">
          Sol kolon ve sağ taraftaki kutuların renklerini özelleştirin
        </p>

        {/* Sol Kolon Rengi */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-800">
            Sol Kolon Arkaplan Rengi
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customization.professionalLeftBg || "#1e3a8a"}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  professionalLeftBg: e.target.value,
                }))
              }
              className="w-14 h-12 rounded-xl border-3 border-gray-400 cursor-pointer hover:border-emerald-500 transition-colors shadow-sm"
            />
            <input
              type="text"
              value={customization.professionalLeftBg || "#1e3a8a"}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  professionalLeftBg: e.target.value,
                }))
              }
              className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
              placeholder="#1e3a8a"
            />
          </div>
        </div>

        {/* Sol Kolon Yazı Rengi */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-800">
            Sol Kolon Yazı Rengi
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customization.professionalLeftText || "#ffffff"}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  professionalLeftText: e.target.value,
                }))
              }
              className="w-14 h-12 rounded-xl border-3 border-gray-400 cursor-pointer hover:border-emerald-500 transition-colors shadow-sm"
            />
            <input
              type="text"
              value={customization.professionalLeftText || "#ffffff"}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  professionalLeftText: e.target.value,
                }))
              }
              className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
              placeholder="#ffffff"
            />
          </div>
        </div>

        {/* Sağ Kutu Kenarlık Rengi */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-800">
            Sağ Taraf Kutu Kenarlık Rengi
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customization.professionalCardBorder || "#3b82f6"}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  professionalCardBorder: e.target.value,
                }))
              }
              className="w-14 h-12 rounded-xl border-3 border-gray-400 cursor-pointer hover:border-emerald-500 transition-colors shadow-sm"
            />
            <input
              type="text"
              value={customization.professionalCardBorder || "#3b82f6"}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  professionalCardBorder: e.target.value,
                }))
              }
              className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
              placeholder="#3b82f6"
            />
          </div>
        </div>

        {/* Sağ Taraf Yazı Rengi */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-800">
            Sağ Taraf Yazı Rengi
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customization.professionalRightText || "#1f2937"}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  professionalRightText: e.target.value,
                }))
              }
              className="w-14 h-12 rounded-xl border-3 border-gray-400 cursor-pointer hover:border-emerald-500 transition-colors shadow-sm"
            />
            <input
              type="text"
              value={customization.professionalRightText || "#1f2937"}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  professionalRightText: e.target.value,
                }))
              }
              className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
              placeholder="#1f2937"
            />
          </div>
        </div>

        {/* Preset Renkler */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-800">
            Hazır Renk Paletleri
          </label>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() =>
                setCustomization((prev) => ({
                  ...prev,
                  professionalLeftBg: "#1e3a8a",
                  professionalLeftText: "#ffffff",
                  professionalCardBorder: "#3b82f6",
                  professionalRightText: "#1f2937",
                }))
              }
              className="h-10 rounded-lg border-2 border-gray-300 hover:border-emerald-500 transition-all shadow-sm"
              style={{
                background: `linear-gradient(to right, #1e3a8a 50%, #3b82f6 50%)`,
              }}
              title="Mavi"
            />
            <button
              onClick={() =>
                setCustomization((prev) => ({
                  ...prev,
                  professionalLeftBg: "#065f46",
                  professionalLeftText: "#ffffff",
                  professionalCardBorder: "#10b981",
                  professionalRightText: "#1f2937",
                }))
              }
              className="h-10 rounded-lg border-2 border-gray-300 hover:border-emerald-500 transition-all shadow-sm"
              style={{
                background: `linear-gradient(to right, #065f46 50%, #10b981 50%)`,
              }}
              title="Yeşil"
            />
            <button
              onClick={() =>
                setCustomization((prev) => ({
                  ...prev,
                  professionalLeftBg: "#7c2d12",
                  professionalLeftText: "#ffffff",
                  professionalCardBorder: "#f97316",
                  professionalRightText: "#1f2937",
                }))
              }
              className="h-10 rounded-lg border-2 border-gray-300 hover:border-emerald-500 transition-all shadow-sm"
              style={{
                background: `linear-gradient(to right, #7c2d12 50%, #f97316 50%)`,
              }}
              title="Turuncu"
            />
            <button
              onClick={() =>
                setCustomization((prev) => ({
                  ...prev,
                  professionalLeftBg: "#4c1d95",
                  professionalLeftText: "#ffffff",
                  professionalCardBorder: "#8b5cf6",
                  professionalRightText: "#1f2937",
                }))
              }
              className="h-10 rounded-lg border-2 border-gray-300 hover:border-emerald-500 transition-all shadow-sm"
              style={{
                background: `linear-gradient(to right, #4c1d95 50%, #8b5cf6 50%)`,
              }}
              title="Mor"
            />
          </div>
        </div>
      </div>

      {/* Background Type Selector */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-700">
          Arkaplan Türü
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() =>
              setCustomization((prev) => ({
                ...prev,
                backgroundType: "solid",
              }))
            }
            className={`px-3 py-2 text-xs rounded-lg border-2 transition-all ${
              customization.backgroundType === "solid"
                ? "border-emerald-500 bg-emerald-100 text-emerald-700 font-semibold"
                : "border-gray-400 bg-gray-50 text-gray-700 hover:border-emerald-400 hover:bg-emerald-50"
            }`}
          >
            Düz Renk
          </button>
          <button
            onClick={() =>
              setCustomization((prev) => ({
                ...prev,
                backgroundType: "gradient",
              }))
            }
            className={`px-3 py-2 text-xs rounded-lg border-2 transition-all ${
              customization.backgroundType === "gradient"
                ? "border-emerald-500 bg-emerald-100 text-emerald-700 font-semibold"
                : "border-gray-400 bg-gray-50 text-gray-700 hover:border-emerald-400 hover:bg-emerald-50"
            }`}
          >
            Gradyan
          </button>
          <button
            onClick={() =>
              setCustomization((prev) => ({
                ...prev,
                backgroundType: "image",
              }))
            }
            className={`px-3 py-2 text-xs rounded-lg border-2 transition-all ${
              customization.backgroundType === "image"
                ? "border-emerald-500 bg-emerald-100 text-emerald-700 font-semibold"
                : "border-gray-400 bg-gray-50 text-gray-700 hover:border-emerald-400 hover:bg-emerald-50"
            }`}
          >
            Resim
          </button>
        </div>
      </div>

      {/* Solid Color */}
      {customization.backgroundType === "solid" && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-700">
            Arkaplan Rengi
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customization.backgroundColor || "#ffffff"}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  backgroundColor: e.target.value,
                }))
              }
              className="w-14 h-12 rounded-xl border-3 border-gray-400 cursor-pointer hover:border-emerald-500 transition-colors shadow-sm"
            />
            <input
              type="text"
              value={customization.backgroundColor || "#ffffff"}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  backgroundColor: e.target.value,
                }))
              }
              className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-400 rounded-xl text-gray-900 font-mono text-sm placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
              placeholder="#ffffff"
            />
          </div>
        </div>
      )}

      {/* Gradient */}
      {customization.backgroundType === "gradient" && (
        <GradientBuilder
          gradient={customization.gradient}
          onChange={(gradient) =>
            setCustomization((prev) => ({ ...prev, gradient }))
          }
        />
      )}

      {/* Image Upload */}
      {customization.backgroundType === "image" && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-700 flex items-center">
            <FiImage className="w-3 h-3 mr-1 text-emerald-600" />
            Arkaplan Resmi
          </label>

          <div className="flex gap-2">
            <label className="flex-1 px-4 py-3 bg-gray-100 border-2 border-gray-400 border-dashed hover:bg-emerald-50 hover:border-emerald-500 text-gray-700 hover:text-emerald-700 rounded-xl cursor-pointer transition-all text-sm font-medium flex items-center justify-center shadow-sm">
              <FiUpload className="w-4 h-4 mr-2" />
              {isUploading ? "Yükleniyor..." : "Resim Seç"}
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
            {customization.backgroundImage && (
              <button
                onClick={() =>
                  setCustomization((prev) => ({
                    ...prev,
                    backgroundImage: null,
                  }))
                }
                className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 border-2 border-red-400 rounded-xl transition-all shadow-sm"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualTab;
