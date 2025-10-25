"use client";

export default function Step1PersonalInfo({
  formData,
  handleInputChange,
  errors,
  setErrors,
}) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-slate-900 mb-2">
          Kişisel Bilgiler
        </h3>
        <p className="text-slate-600 text-lg">Kendinizi tanıtalım</p>
      </div>

      {/* Ad Soyad */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Ad *
          </label>
          <input
            type="text"
            value={formData.ad}
            onChange={(e) => {
              handleInputChange("ad", e.target.value);
              if (errors.ad) {
                setErrors((prev) => ({ ...prev, ad: null }));
              }
            }}
            className={`w-full rounded-xl border bg-white px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
              errors.ad ? "border-red-500" : "border-slate-300"
            }`}
            placeholder="Adınızı girin"
          />
          {errors.ad && (
            <p className="text-red-500 text-sm mt-1">{errors.ad}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Soyad *
          </label>
          <input
            type="text"
            value={formData.soyad}
            onChange={(e) => {
              handleInputChange("soyad", e.target.value);
              if (errors.soyad) {
                setErrors((prev) => ({ ...prev, soyad: null }));
              }
            }}
            className={`w-full rounded-xl border bg-white px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
              errors.soyad ? "border-red-500" : "border-slate-300"
            }`}
            placeholder="Soyadınızı girin"
          />
          {errors.soyad && (
            <p className="text-red-500 text-sm mt-1">{errors.soyad}</p>
          )}
        </div>
      </div>

      {/* Cinsiyet ve Doğum Tarihi */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Cinsiyet *
          </label>
          <select
            value={formData.cinsiyet}
            onChange={(e) => {
              handleInputChange("cinsiyet", e.target.value);
              if (errors.cinsiyet) {
                setErrors((prev) => ({ ...prev, cinsiyet: null }));
              }
            }}
            className={`w-full rounded-xl border bg-white px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
              errors.cinsiyet ? "border-red-500" : "border-slate-300"
            }`}
          >
            <option value="">Seçiniz</option>
            <option value="kadin">Kadın</option>
            <option value="erkek">Erkek</option>
            <option value="diger">Diğer</option>
          </select>
          {errors.cinsiyet && (
            <p className="text-red-500 text-sm mt-1">{errors.cinsiyet}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Doğum Tarihi *
          </label>
          <input
            type="date"
            value={formData.dogumTarihi}
            onChange={(e) => {
              handleInputChange("dogumTarihi", e.target.value);
              if (errors.dogumTarihi) {
                setErrors((prev) => ({ ...prev, dogumTarihi: null }));
              }
            }}
            className={`w-full rounded-xl border bg-white px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
              errors.dogumTarihi ? "border-red-500" : "border-slate-300"
            }`}
          />
          {errors.dogumTarihi && (
            <p className="text-red-500 text-sm mt-1">{errors.dogumTarihi}</p>
          )}
        </div>
      </div>

      {/* Vefat Durumu */}
      <div className="bg-slate-50 rounded-xl p-6">
        <label className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={formData.vefatDurumu}
            onChange={(e) => handleInputChange("vefatDurumu", e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-lg font-medium text-slate-700">
            Vefat etmiş kişi
          </span>
        </label>

        {formData.vefatDurumu && (
          <div className="ml-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Ölüm Tarihi
            </label>
            <input
              type="date"
              value={formData.olumTarihi}
              onChange={(e) => handleInputChange("olumTarihi", e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
