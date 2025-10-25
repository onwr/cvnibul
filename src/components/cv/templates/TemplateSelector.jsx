"use client";

import { Palette, Maximize2, X, Check } from "lucide-react";

export default function TemplateSelector({
  templates,
  formData,
  getColorRgb,
  onTemplateSelect,
  previewModal,
  setPreviewModal,
}) {
  return (
    <>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Renk Temanızı Seçin
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            4 farklı renk teması arasından size en uygun olanı seçin. Renk
            seçiminiz CV'nizin genel görünümünü belirler.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {formData.ad} {formData.soyad}
            </span>
            <span>•</span>
            <span>{formData.ozelMeslek || "Profesyonel"}</span>
          </div>
        </div>

        {/* Şablon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => setPreviewModal(template)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 cursor-pointer hover:scale-105"
            >
              <div
                className="relative aspect-[3/4] flex flex-col items-center justify-center p-6"
                style={{
                  background: `linear-gradient(135deg, rgba(${getColorRgb(
                    template.color
                  )}, 0.1) 0%, rgba(${getColorRgb(
                    template.color
                  )}, 0.05) 100%)`,
                }}
              >
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, rgba(${getColorRgb(
                      template.color
                    )}, 1) 0%, rgba(${getColorRgb(template.color)}, 0.8) 100%)`,
                  }}
                >
                  <template.icon className="w-12 h-12 text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                  {template.name}
                </h3>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-t-2xl">
                  <div className="text-center text-white">
                    <Maximize2 className="w-12 h-12 mx-auto mb-3" />
                    <p className="font-bold text-lg">Önizle</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alt Bilgi */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 shadow-2xl text-white">
              <h3 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2">
                <Palette className="w-7 h-7" />
                Profesyonel CV Şablonları
              </h3>
              <p className="text-blue-100 mb-6">
                Meslek alanınıza özel tasarlanmış, detaylı şablonlar ile öne
                çıkın!
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold">{templates.length}</div>
                  <div className="text-sm text-blue-100">Renk Teması</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold">∞</div>
                  <div className="text-sm text-blue-100">Özelleştirme</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm text-blue-100">Ücretsiz</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <previewModal.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {previewModal.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    CV Önizleme - {formData.ad} {formData.soyad}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewModal(null)}
                className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-md border-2 border-gray-200"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
                <p className="text-gray-600 text-center">
                  Detaylı önizleme burada görünecek...
                </p>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex gap-3">
              <button
                onClick={() => setPreviewModal(null)}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Kapat
              </button>
              <button
                onClick={() => {
                  onTemplateSelect(previewModal);
                  setPreviewModal(null);
                }}
                className="flex-1 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 text-lg"
              >
                <Check className="w-6 h-6" />
                Bu Şablonu Kullan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
