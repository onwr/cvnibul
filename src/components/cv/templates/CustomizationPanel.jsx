"use client";

import {
  Settings,
  Camera,
  User,
  MapPin,
  FileText,
  Palette,
  Type,
  Eye,
  Check,
  Target,
  RotateCcw,
  X,
  Lightbulb,
} from "lucide-react";

export default function CustomizationPanel({
  selectedTemplate,
  formData,
  setFormData,
  colors,
  selectedColor,
  setSelectedColor,
  customColor,
  setCustomColor,
  setAccentColor,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  lineSpacing,
  setLineSpacing,
  headerStyle,
  setHeaderStyle,
  cornerRadius,
  setCornerRadius,
  showIcons,
  setShowIcons,
  showProfilePhoto,
  setShowProfilePhoto,
  uploadingPhoto,
  uploadToImgBB,
  backgroundImage,
  setBackgroundImage,
  selectedLocation,
  setShowMap,
  setSelectedLocation,
  photoGallery,
  setPhotoGallery,
  sectionOrder,
  setSectionOrder,
  draggedSection,
  setDraggedSection,
  visibleSections,
  setVisibleSections,
}) {
  const sectionNames = {
    hakkimda: "Hakkımda",
    deneyim: "İş Deneyimi",
    egitim: "Eğitim",
    yetenekler: "Yetenekler",
    sertifikalar: "Sertifikalar",
    dil: "Dil Bilgisi",
    hobiler: "Hobiler",
    referanslar: "Referanslar",
    hizmetler: "Hizmetler",
    oduller: "Ödüller",
    yayinlar: "Yayınlar",
    sosyalSorumluluk: "Sosyal Sorumluluk",
    fotografArsivi: "Fotoğraf Arşivi",
  };

  return (
    <div className="w-80 bg-white border-r shadow-xl overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-600" />
            Özelleştirme Paneli
          </h2>
          <p className="text-xs text-gray-500">
            Tüm değişiklikler canlı olarak yansır
          </p>
        </div>

        {/* Seçili Şablon Kartı */}
        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <selectedTemplate.icon className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {selectedTemplate.name}
              </h3>
              <span className="inline-block px-2 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold">
                Aktif Tema
              </span>
            </div>
          </div>
        </div>

        {/* Profil Fotoğrafı */}
        <div className="border-t pt-6">
          <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            Profil Fotoğrafı
          </h3>
          <div className="space-y-4">
            <div className="w-full aspect-square rounded-2xl border-4 border-dashed border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
              {formData.profilFotografi ? (
                <img
                  src={
                    formData.profilFotografi instanceof File
                      ? URL.createObjectURL(formData.profilFotografi)
                      : formData.profilFotografi
                  }
                  alt="Profil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <label className="w-full block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const uploadedUrl = await uploadToImgBB(file);
                    if (uploadedUrl) {
                      setFormData((prev) => ({
                        ...prev,
                        profilFotografi: uploadedUrl,
                      }));
                    }
                  }
                }}
              />
              <div className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold cursor-pointer text-center transition-colors flex items-center justify-center gap-2">
                {uploadingPhoto ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    Fotoğraf Yükle
                  </>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Arkaplan Fotoğrafı */}
        <div className="border-t pt-6">
          <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-purple-600" />
            Header Arkaplan Fotoğrafı
          </h3>
          <div className="space-y-4">
            <div className="w-full aspect-video rounded-xl border-4 border-dashed border-purple-300 overflow-hidden bg-purple-50 flex items-center justify-center">
              {backgroundImage ? (
                <img
                  src={backgroundImage}
                  alt="Arkaplan"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-purple-400">
                  <Camera className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Arkaplan Resmi</p>
                </div>
              )}
            </div>
            <label className="w-full block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const uploadedUrl = await uploadToImgBB(file);
                    if (uploadedUrl) {
                      setBackgroundImage(uploadedUrl);
                    }
                  }
                }}
              />
              <div className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold cursor-pointer text-center transition-colors flex items-center justify-center gap-2">
                <Camera className="w-5 h-5" />
                Arkaplan Yükle
              </div>
            </label>
            {backgroundImage && (
              <button
                onClick={() => setBackgroundImage(null)}
                className="w-full px-4 py-2 border-2 border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors"
              >
                Arkaplanı Kaldır
              </button>
            )}
          </div>
        </div>

        {/* Konum/Harita */}
        <div className="border-t pt-6">
          <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            Konum & Harita
          </h3>
          <div className="space-y-3">
            {selectedLocation && (
              <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Seçili Konum:
                </p>
                <p className="text-sm text-gray-600">
                  {selectedLocation.address || "Konum seçildi"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedLocation.lat?.toFixed(6)},{" "}
                  {selectedLocation.lng?.toFixed(6)}
                </p>
              </div>
            )}
            <button
              onClick={() => setShowMap(true)}
              className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              {selectedLocation ? "Konumu Değiştir" : "Konum Seç"}
            </button>
            {selectedLocation && (
              <button
                onClick={() => setSelectedLocation(null)}
                className="w-full px-4 py-2 border-2 border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors"
              >
                Konumu Kaldır
              </button>
            )}
          </div>
        </div>

        {/* Renk Ayarları */}
        <div className="border-t pt-6">
          <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-600" />
            Renk Ayarları
          </h3>
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Ana Tema Rengi
            </label>
            <div className="grid grid-cols-2 gap-3">
              {colors.slice(0, 4).map((color) => (
                <button
                  key={color.value}
                  onClick={() => {
                    setSelectedColor(color.value);
                    setAccentColor(color.value);
                  }}
                  className={`relative h-20 rounded-xl transition-all ${
                    color.class
                  } ${
                    selectedColor === color.value
                      ? "ring-2 ring-offset-2 ring-blue-600"
                      : "opacity-90 hover:opacity-100"
                  }`}
                  title={color.name}
                >
                  {selectedColor === color.value && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4 text-gray-800" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="text-sm font-bold text-white drop-shadow-lg">
                      {color.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Özel Renk Seçici */}
            <div className="mt-4">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Özel Renk Seçin
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    setSelectedColor("custom");
                    setAccentColor("custom");
                  }}
                  className="w-full h-12 rounded-xl border-2 border-gray-300 cursor-pointer"
                />
                <button
                  onClick={() => {
                    setSelectedColor("custom");
                    setAccentColor("custom");
                  }}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                    selectedColor === "custom"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {selectedColor === "custom" ? "Seçili" : "Uygula"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Mevcut renk: {customColor}
              </p>
            </div>
          </div>
        </div>

        {/* Görünüm Ayarları */}
        <div className="border-t pt-6">
          <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            Görünüm Ayarları
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">
                  Profil Fotoğrafı
                </span>
              </div>
              <button
                onClick={() => setShowProfilePhoto(!showProfilePhoto)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  showProfilePhoto ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    showProfilePhoto ? "translate-x-6" : ""
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">
                  İkonları Göster
                </span>
              </div>
              <button
                onClick={() => setShowIcons(!showIcons)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  showIcons ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    showIcons ? "translate-x-6" : ""
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Bölüm Sıralaması */}
        <div className="border-t pt-6">
          <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-orange-600" />
            Bölüm Sıralaması
          </h3>
          <p className="text-xs text-gray-600 mb-4 bg-orange-50 p-3 rounded-lg border border-orange-200">
            🔄 Bölümleri sürükleyerek sıralamayı değiştirebilirsiniz
          </p>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {sectionOrder.map((sectionId, index) => (
              <div
                key={sectionId}
                draggable
                onDragStart={() => setDraggedSection(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggedSection !== null && draggedSection !== index) {
                    const newOrder = [...sectionOrder];
                    const [removed] = newOrder.splice(draggedSection, 1);
                    newOrder.splice(index, 0, removed);
                    setSectionOrder(newOrder);
                    setDraggedSection(null);
                  }
                }}
                className={`flex items-center gap-3 p-3 bg-white border-2 rounded-xl cursor-move hover:border-orange-400 transition-all ${
                  draggedSection === index
                    ? "opacity-50 scale-95"
                    : "opacity-100 scale-100"
                }`}
              >
                <div className="flex items-center gap-2 flex-1">
                  <div className="text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {index + 1}. {sectionNames[sectionId]}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisibleSections({
                      ...visibleSections,
                      [sectionId]: !visibleSections[sectionId],
                    });
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title={visibleSections[sectionId] ? "Gizle" : "Göster"}
                >
                  {visibleSections[sectionId] ? (
                    <Eye className="w-5 h-5 text-green-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* İpucu Kartı */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 mb-1">Pro İpucu</h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                Tüm değişiklikler anında önizlemede görünür. Farklı
                kombinasyonları deneyerek size en uygun stili bulabilirsiniz!
              </p>
            </div>
          </div>
        </div>

        {/* Reset Butonu */}
        <button
          onClick={() => {
            setSelectedColor("blue");
            setCustomColor("#2563eb");
            setFontSize("medium");
            setFontFamily("inter");
            setLineSpacing("normal");
            setHeaderStyle("gradient");
            setCornerRadius("medium");
            setShowIcons(true);
            setShowProfilePhoto(true);
          }}
          className="w-full p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Ayarları Sıfırla
        </button>
      </div>
    </div>
  );
}
