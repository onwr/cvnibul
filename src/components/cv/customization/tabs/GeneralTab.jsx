"use client";

import { useState } from "react";
import FontSelector from "../controls/FontSelector";
import { FiUpload, FiTrash2, FiImage, FiLoader } from "react-icons/fi";

const IMGBB_API_KEY = "d31794837252249df832c8f59cf80110";

const GeneralTab = ({ customization, setCustomization }) => {
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Dosya boyutu kontrolü (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Dosya boyutu 5MB'dan küçük olmalıdır");
      return;
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith("image/")) {
      setUploadError("Lütfen geçerli bir resim dosyası seçin");
      return;
    }

    setUploadingPhoto(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setCustomization((prev) => ({
          ...prev,
          profilePhoto: data.data.url,
        }));
        setUploadError(null);
      } else {
        setUploadError("Yükleme başarısız oldu");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Yükleme sırasında bir hata oluştu");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = () => {
    setCustomization((prev) => ({
      ...prev,
      profilePhoto: null,
    }));
  };

  return (
    <div className="space-y-4">
      {/* Profil Fotoğrafı */}
      <div className="space-y-3 pb-4 border-b border-gray-100">
        <label className="text-sm font-semibold text-gray-800 flex items-center">
          <FiImage className="w-4 h-4 mr-2" />
          Profil Fotoğrafı
        </label>

        <div className="flex items-center gap-4">
          {/* Fotoğraf Önizleme */}
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
            {customization.profilePhoto ? (
              <img
                src={customization.profilePhoto}
                alt="Profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <FiImage className="w-8 h-8 text-gray-400" />
            )}
          </div>

          {/* Butonlar */}
          <div className="flex-1 space-y-2">
            {/* Yükleme Butonu */}
            <label className="flex items-center justify-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg cursor-pointer transition-colors text-sm font-medium">
              {uploadingPhoto ? (
                <>
                  <FiLoader className="w-4 h-4 mr-2 animate-spin" />
                  Yükleniyor...
                </>
              ) : (
                <>
                  <FiUpload className="w-4 h-4 mr-2" />
                  Fotoğraf Yükle
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={uploadingPhoto}
                className="hidden"
              />
            </label>

            {/* Kaldırma Butonu */}
            {customization.profilePhoto && (
              <button
                onClick={handleRemovePhoto}
                className="w-full flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <FiTrash2 className="w-4 h-4 mr-2" />
                Fotoğrafı Kaldır
              </button>
            )}

            {/* Hata Mesajı */}
            {uploadError && (
              <p className="text-xs text-red-600 mt-1">{uploadError}</p>
            )}

            {/* Bilgi */}
            <p className="text-xs text-gray-500">Maksimum dosya boyutu: 5MB</p>
          </div>
        </div>
      </div>

      {/* Font Selector */}
      <FontSelector
        selectedFont={customization.fontFamily}
        onChange={(font) =>
          setCustomization((prev) => ({ ...prev, fontFamily: font }))
        }
      />
    </div>
  );
};

export default GeneralTab;
