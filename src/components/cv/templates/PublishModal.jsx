"use client";

import { X, Check } from "lucide-react";

export default function PublishModal({
  showModal,
  publishStep,
  publishData,
  setPublishData,
  formData,
  publishedUrl,
  onRegisterSubmit,
  onPublish,
  onClose,
  setPublishStep,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {publishStep === 1 && "Hesap Oluştur"}
                {publishStep === 2 && "URL Belirle"}
                {publishStep === 3 && "🎉 Başarılı!"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {publishStep === 1 &&
                  "Portfolyonuzu yayınlamak için kayıt olun"}
                {publishStep === 2 && "Portfolyonuz için özel URL seçin"}
                {publishStep === 3 && "Portfolyonuz başarıyla yayınlandı"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-md"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Kayıt Formu */}
          {publishStep === 1 && (
            <form onSubmit={onRegisterSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Adresi
                </label>
                <input
                  type="email"
                  required
                  value={publishData.email}
                  onChange={(e) =>
                    setPublishData({
                      ...publishData,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-gray-900"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Şifre
                </label>
                <input
                  type="password"
                  required
                  value={publishData.password}
                  onChange={(e) =>
                    setPublishData({
                      ...publishData,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-gray-900"
                  placeholder="En az 6 karakter"
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Şifre Tekrar
                </label>
                <input
                  type="password"
                  required
                  value={publishData.confirmPassword}
                  onChange={(e) =>
                    setPublishData({
                      ...publishData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-gray-900"
                  placeholder="Şifrenizi tekrar girin"
                />
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  ✅ Ücretsiz hesap oluşturun
                  <br />
                  ✅ Portfolyonuzu anında yayınlayın
                  <br />✅ İstediğiniz zaman düzenleyin
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                Devam Et
              </button>
            </form>
          )}

          {/* Step 2: URL Belirleme */}
          {publishStep === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Portfolyo URL'niz
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">
                    siteadi.com/
                  </span>
                  <input
                    type="text"
                    value={publishData.customUrl}
                    onChange={(e) =>
                      setPublishData({
                        ...publishData,
                        customUrl: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, "-")
                          .replace(/-+/g, "-"),
                      })
                    }
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all font-mono text-gray-900"
                    placeholder="ad-soyad"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Otomatik oluşturulan URL'yi değiştirebilirsiniz
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-2">
                  Portfolyo Önizleme:
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>URL:</strong>{" "}
                  <span className="text-blue-600 font-mono">
                    siteadi.com/{publishData.customUrl}
                  </span>
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Sahip:</strong> {formData.ad} {formData.soyad}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setPublishStep(1)}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Geri
                </button>
                <button
                  onClick={onPublish}
                  className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Yayınla
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Başarılı */}
          {publishStep === 3 && (
            <div className="space-y-5 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-12 h-12 text-green-600" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Portfolyonuz Yayında!
                </h3>
                <p className="text-gray-600">
                  Portfolyonuz başarıyla yayınlandı ve artık herkes tarafından
                  görüntülenebilir.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Portfolyo Adresiniz:
                </p>
                <a
                  href={`https://${publishedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-green-600 hover:text-green-700 hover:underline break-all"
                >
                  {publishedUrl}
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://${publishedUrl}`);
                    alert("URL kopyalandı!");
                  }}
                  className="mt-3 w-full py-2 bg-white border-2 border-green-300 text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-all"
                >
                  📋 Linki Kopyala
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                  <p className="font-bold text-gray-900 mb-1">
                    {formData.ad} {formData.soyad}
                  </p>
                  <p className="text-gray-600">{formData.ozelMeslek}</p>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                  <p className="font-bold text-gray-900 mb-1">Hesap</p>
                  <p className="text-gray-600 text-xs break-all">
                    {publishData.email}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                Harika! Kapat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
