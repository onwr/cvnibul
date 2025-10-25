"use client";

import { FiBox } from "react-icons/fi";
import { shadowPresets } from "../presets/themePresets";

const ShadowPicker = ({ value, onChange }) => {
  const shadows = [
    { id: "none", label: "Yok", preview: "shadow-none" },
    { id: "subtle", label: "Hafif", preview: "shadow-sm" },
    { id: "medium", label: "Orta", preview: "shadow-md" },
    { id: "strong", label: "Güçlü", preview: "shadow-xl" },
  ];

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-700 flex items-center">
        <FiBox className="w-3 h-3 mr-1 text-emerald-600" />
        Gölge Yoğunluğu
      </label>

      <div className="grid grid-cols-4 gap-2">
        {shadows.map((shadow) => (
          <button
            key={shadow.id}
            onClick={() => onChange(shadow.id)}
            className={`p-3 rounded-lg border-2 transition-all ${
              value === shadow.id
                ? "border-emerald-500 bg-emerald-50"
                : "border-gray-200 hover:border-emerald-300 bg-white"
            }`}
          >
            <div className={`w-full h-8 bg-white rounded ${shadow.preview}`} />
            <div className="text-[10px] text-gray-600 mt-1 text-center">
              {shadow.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShadowPicker;
