"use client";

import { FiMaximize2 } from "react-icons/fi";

const SpacingControl = ({ spacing, onChange }) => {
  const handleChange = (key, value) => {
    onChange({
      ...spacing,
      [key]: parseInt(value),
    });
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-medium text-gray-700 flex items-center">
        <FiMaximize2 className="w-3 h-3 mr-1 text-emerald-600" />
        Boşluk Ayarları
      </label>

      {/* Padding */}
      <div>
        <label className="text-xs text-gray-600 mb-1 block">
          İç Boşluk (Padding): {spacing.padding}px
        </label>
        <input
          type="range"
          min="0"
          max="48"
          step="4"
          value={spacing.padding}
          onChange={(e) => handleChange("padding", e.target.value)}
          className="w-full h-2.5 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:bg-emerald-600 [&::-webkit-slider-thumb]:transition-colors"
        />
      </div>

      {/* Section Gap */}
      <div>
        <label className="text-xs text-gray-600 mb-1 block">
          Bölüm Arası: {spacing.sectionGap}px
        </label>
        <input
          type="range"
          min="8"
          max="64"
          step="4"
          value={spacing.sectionGap}
          onChange={(e) => handleChange("sectionGap", e.target.value)}
          className="w-full h-2.5 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:bg-emerald-600 [&::-webkit-slider-thumb]:transition-colors"
        />
      </div>

      {/* Border Radius */}
      <div>
        <label className="text-xs text-gray-600 mb-1 block">
          Köşe Yuvarlaklığı: {spacing.borderRadius}px
        </label>
        <input
          type="range"
          min="0"
          max="32"
          step="2"
          value={spacing.borderRadius}
          onChange={(e) => handleChange("borderRadius", e.target.value)}
          className="w-full h-2.5 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:bg-emerald-600 [&::-webkit-slider-thumb]:transition-colors"
        />
      </div>

      {/* Column Gap (for two-column layout) */}
      <div>
        <label className="text-xs text-gray-600 mb-1 block">
          Kolon Arası: {spacing.columnGap || 24}px
        </label>
        <input
          type="range"
          min="8"
          max="48"
          step="4"
          value={spacing.columnGap || 24}
          onChange={(e) => handleChange("columnGap", e.target.value)}
          className="w-full h-2.5 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:bg-emerald-600 [&::-webkit-slider-thumb]:transition-colors"
        />
      </div>
    </div>
  );
};

export default SpacingControl;
