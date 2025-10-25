"use client";

import { FiCircle } from "react-icons/fi";

const ColorPicker = ({ label, value, onChange, presetColors, icon: Icon }) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-700 flex items-center">
        {Icon && <Icon className="w-3 h-3 mr-1 text-emerald-600" />}
        {label}
      </label>

      <div className="grid grid-cols-4 gap-1.5">
        {presetColors.map((color) => (
          <button
            key={color.value}
            onClick={() => onChange(color.value)}
            className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
              value === color.value
                ? "border-gray-800 scale-110 ring-2 ring-emerald-500 ring-offset-1"
                : "border-gray-300 hover:border-gray-400"
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>

      {/* Custom color input */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-emerald-500 transition-colors"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 font-mono text-sm placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
          placeholder="#000000"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
