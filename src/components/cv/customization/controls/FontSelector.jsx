"use client";

import { motion } from "framer-motion";
import { FiType, FiChevronDown } from "react-icons/fi";
import { availableFonts } from "../presets/themePresets";
import { useState, useRef, useEffect } from "react";

const FontSelector = ({ selectedFont, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectedItemRef = useRef(null);

  // Dropdown açıldığında seçili font'a scroll yap
  useEffect(() => {
    if (isOpen && dropdownRef.current && selectedItemRef.current) {
      setTimeout(() => {
        selectedItemRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100); // Animasyon için kısa bekleme
    }
  }, [isOpen]);

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-700 flex items-center">
        <FiType className="w-3 h-3 mr-1 text-emerald-600" />
        Font Ailesi
      </label>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-left flex items-center justify-between hover:border-emerald-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
        >
          <span className={`font-${selectedFont} text-gray-900`}>
            {availableFonts.find((f) => f.value === selectedFont)?.name ||
              selectedFont}
          </span>
          <FiChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-emerald-500 rounded-xl shadow-2xl max-h-80 overflow-y-scroll z-50 backdrop-blur-sm font-dropdown-scroll"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#10b981 #f3f4f6",
              }}
            >
              {/* Popular fonts */}
              <div className="p-2 border-b border-gray-100">
                <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 px-2">
                  Popüler
                </div>
                {availableFonts
                  .filter((font) => font.popular)
                  .map((font) => (
                    <button
                      key={font.value}
                      ref={selectedFont === font.value ? selectedItemRef : null}
                      onClick={() => {
                        onChange(font.value);
                        setIsOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm rounded-lg transition-all duration-150 ${
                        selectedFont === font.value
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium"
                          : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                      } font-${font.value}`}
                    >
                      {font.name}
                      <span
                        className={`text-xs ml-2 ${
                          selectedFont === font.value
                            ? "text-emerald-100"
                            : "text-gray-400"
                        }`}
                      >
                        {font.category}
                      </span>
                    </button>
                  ))}
              </div>

              {/* All fonts */}
              <div className="p-2">
                <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 px-2">
                  Tümü
                </div>
                {availableFonts
                  .filter((font) => !font.popular)
                  .map((font) => (
                    <button
                      key={font.value}
                      ref={selectedFont === font.value ? selectedItemRef : null}
                      onClick={() => {
                        onChange(font.value);
                        setIsOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm rounded-lg transition-all duration-150 ${
                        selectedFont === font.value
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium"
                          : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                      } font-${font.value}`}
                    >
                      {font.name}
                      <span
                        className={`text-xs ml-2 ${
                          selectedFont === font.value
                            ? "text-emerald-100"
                            : "text-gray-400"
                        }`}
                      >
                        {font.category}
                      </span>
                    </button>
                  ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default FontSelector;
