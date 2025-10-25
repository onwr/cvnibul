"use client";

import { FiZap, FiCircle } from "react-icons/fi";
import { useState } from "react";

const GradientBuilder = ({ gradient, onChange }) => {
  const [color1, setColor1] = useState(gradient?.colors?.[0] || "#10b981");
  const [color2, setColor2] = useState(gradient?.colors?.[1] || "#3b82f6");
  const [type, setType] = useState(gradient?.type || "linear");
  const [angle, setAngle] = useState(gradient?.angle || 45);

  const handleUpdate = (updates) => {
    const newGradient = {
      type,
      angle,
      colors: [color1, color2],
      ...updates,
    };

    if (updates.color1) setColor1(updates.color1);
    if (updates.color2) setColor2(updates.color2);
    if (updates.type) setType(updates.type);
    if (updates.angle !== undefined) setAngle(updates.angle);

    onChange(newGradient);
  };

  const gradientStyle =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;

  return (
    <div className="space-y-3">
      <label className="text-xs font-medium text-gray-700 flex items-center">
        <FiZap className="w-3 h-3 mr-1 text-emerald-600" />
        Gradyan Oluşturucu
      </label>

      {/* Preview */}
      <div
        className="h-16 rounded-lg border border-gray-200"
        style={{ background: gradientStyle }}
      />

      {/* Type selector */}
      <div className="flex gap-2">
        <button
          onClick={() => handleUpdate({ type: "linear" })}
          className={`flex-1 px-3 py-1.5 text-xs rounded border transition-colors ${
            type === "linear"
              ? "bg-emerald-500 text-white border-emerald-600"
              : "bg-white text-gray-700 border-gray-200 hover:border-emerald-500"
          }`}
        >
          Doğrusal
        </button>
        <button
          onClick={() => handleUpdate({ type: "radial" })}
          className={`flex-1 px-3 py-1.5 text-xs rounded border transition-colors ${
            type === "radial"
              ? "bg-emerald-500 text-white border-emerald-600"
              : "bg-white text-gray-700 border-gray-200 hover:border-emerald-500"
          }`}
        >
          Dairesel
        </button>
      </div>

      {/* Angle (for linear) */}
      {type === "linear" && (
        <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Açı: {angle}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            step="15"
            value={angle}
            onChange={(e) => handleUpdate({ angle: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}

      {/* Color pickers */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-600 mb-1 flex items-center">
            <FiCircle className="w-2 h-2 mr-1" />
            Renk 1
          </label>
          <input
            type="color"
            value={color1}
            onChange={(e) => handleUpdate({ color1: e.target.value })}
            className="w-full h-8 rounded border border-gray-300 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 mb-1 flex items-center">
            <FiCircle className="w-2 h-2 mr-1" />
            Renk 2
          </label>
          <input
            type="color"
            value={color2}
            onChange={(e) => handleUpdate({ color2: e.target.value })}
            className="w-full h-8 rounded border border-gray-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default GradientBuilder;
