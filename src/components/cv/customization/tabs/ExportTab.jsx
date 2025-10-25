"use client";

import { FiDownload, FiRefreshCw } from "react-icons/fi";
import { themePresets } from "../presets/themePresets";

const ExportTab = ({ customization, setCustomization }) => {
  const applyTheme = (themeKey) => {
    const theme = themePresets[themeKey];
    if (theme) {
      setCustomization((prev) => ({
        ...prev,
        ...theme.customization,
      }));
    }
  };

  const resetToDefault = () => {
    setCustomization({
      fontFamily: "Inter",
      fontSize: { heading: 28, subheading: 18, body: 14 },
      lineHeight: 1.6,
      letterSpacing: "normal",
      primaryColor: "#10b981",
      secondaryColor: "#3b82f6",
      accentColor: "#8b5cf6",
      backgroundType: "solid",
      backgroundColor: "#ffffff",
      gradient: null,
      backgroundImage: null,
      backgroundBlur: 0,
      backgroundOpacity: 1,
      padding: 24,
      sectionGap: 32,
      borderRadius: 12,
      shadow: "medium",
      layout: "two-column",
      cardStyle: "elevated",
      profilePhoto: null,
      sectionVisibility: {},
    });
  };

  return (
    <div className="space-y-4">
      {/* Theme Presets */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-3">
          Hazır Temalar
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(themePresets).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => applyTheme(key)}
              className="text-left p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-500 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 transition-all duration-200 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-sm font-semibold text-gray-800 group-hover:text-emerald-700">
                    {theme.name}
                  </h5>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {theme.description}
                  </p>
                </div>
                {/* Preview colors */}
                <div className="flex gap-1">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{
                      backgroundColor: theme.customization.primaryColor,
                    }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{
                      backgroundColor: theme.customization.secondaryColor,
                    }}
                  />
                </div>
              </div>

              {/* Font & Layout info */}
              <div className="flex gap-2 mt-2 text-[10px] text-gray-500">
                <span className="px-2 py-0.5 bg-gray-100 rounded">
                  {theme.customization.fontFamily}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 rounded">
                  {theme.customization.layout === "single-column"
                    ? "1 Kolon"
                    : "2 Kolon"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <div className="pt-3 border-t border-gray-200">
        <button
          onClick={resetToDefault}
          className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <FiRefreshCw className="w-4 h-4" />
          Varsayılana Dön
        </button>
      </div>

      {/* Export Info */}
      <div className="pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-600 mb-2">
          💡 İpucu: Özelleştirmeleriniz otomatik olarak kaydediliyor
        </div>
      </div>
    </div>
  );
};

export default ExportTab;
