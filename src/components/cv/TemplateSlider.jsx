"use client";

import { useState } from "react";

const TemplateSlider = ({ templates, selectedTemplate, onTemplateSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3 şablon göster
  const visibleTemplates = templates.slice(currentIndex, currentIndex + 3);

  const nextSlide = () => {
    if (currentIndex + 3 < templates.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full">
      {/* Template Grid */}
      <div className="grid grid-cols-3 gap-6">
        {visibleTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => onTemplateSelect(template)}
            className="cursor-pointer group"
          >
            {/* Template Card */}
            <div
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 border-2 ${
                selectedTemplate?.id === template.id
                  ? "border-orange-500 scale-105 shadow-orange-500/25"
                  : "border-gray-200 hover:border-emerald-400 hover:scale-105"
              }`}
            >
              {/* Preview Area */}
              <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                {/* Template Icon */}
                <div className="text-center">
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg transition-all ${
                      selectedTemplate?.id === template.id
                        ? "bg-gradient-to-br from-orange-500 to-orange-600"
                        : "bg-gradient-to-br from-emerald-500 to-emerald-600 group-hover:from-emerald-600 group-hover:to-emerald-700"
                    }`}
                  >
                    <span className="text-3xl text-white">🖼️</span>
                  </div>

                  {/* Decorative Lines */}
                  <div className="space-y-2">
                    <div
                      className={`h-1.5 rounded-full mx-auto transition-all ${
                        selectedTemplate?.id === template.id
                          ? "w-20 bg-orange-500"
                          : "w-20 bg-emerald-500"
                      }`}
                    ></div>
                    <div
                      className={`h-1.5 rounded-full mx-auto transition-all ${
                        selectedTemplate?.id === template.id
                          ? "w-16 bg-orange-400"
                          : "w-16 bg-emerald-400"
                      }`}
                    ></div>
                    <div
                      className={`h-1.5 rounded-full mx-auto transition-all ${
                        selectedTemplate?.id === template.id
                          ? "w-12 bg-orange-300"
                          : "w-12 bg-emerald-300"
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Selection Check */}
                {selectedTemplate?.id === template.id && (
                  <div className="absolute top-3 right-3 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4 text-center">
                <h3
                  className={`font-bold text-base mb-1 transition-colors ${
                    selectedTemplate?.id === template.id
                      ? "text-orange-600"
                      : "text-gray-800 group-hover:text-emerald-600"
                  }`}
                >
                  {template.name}
                </h3>
                <p className="text-xs text-gray-500">{template.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      {templates.length > 3 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              currentIndex === 0
                ? "bg-white/30 text-white/50 cursor-not-allowed"
                : "bg-white/40 text-white hover:bg-white/60"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(templates.length / 3) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * 3)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    Math.floor(currentIndex / 3) === index
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              )
            )}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentIndex + 3 >= templates.length}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              currentIndex + 3 >= templates.length
                ? "bg-white/30 text-white/50 cursor-not-allowed"
                : "bg-white/40 text-white hover:bg-white/60"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateSlider;
