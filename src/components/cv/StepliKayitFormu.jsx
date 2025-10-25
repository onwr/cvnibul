"use client";

import { useState } from "react";
import MapModal from "./MapModal";

// Stepli Kayıt Formu Component'i
export default function StepliKayitFormu() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showMapModal, setShowMapModal] = useState(false);
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    cinsiyet: "",
    dogumTarihi: "",
    vefatDurumu: false,
    olumTarihi: "",
    profilFotografi: null,
    adres: "",
    haritaKonumu: null,
    hayatHikayesi: "",
    egitimler: [],
    yetenekler: [],
    calismaGecmisi: [],
    iletisim: {
      telefon: "",
      email: "",
      website: "",
      linkedin: "",
      instagram: "",
      twitter: "",
      facebook: "",
      youtube: "",
      github: "",
      behance: "",
      dribbble: "",
    },
    fotoArsivi: [],
    hizmetler: [],
    paket: "ucretsiz",
    hobiler: [],
    sertifikalar: [],
    projeler: [],
    referanslar: [],
    dilBilgisi: [],
    ozelBeceriler: [],
    sosyalSorumluluk: [],
    yayinlar: [],
    oduller: [],
    tercihEdilenRenk: "blue",
    meslek: "",
    ozelMeslek: "",
    cvAyarlari: {
      fotoGoster: true,
      sosyalMedyaGoster: true,
      hobilerGoster: true,
      sertifikalarGoster: true,
      projelerGoster: true,
      referanslarGoster: true,
      dilBilgisiGoster: true,
      ozelBecerilerGoster: true,
      sosyalSorumlulukGoster: true,
      yayinlarGoster: true,
      odullerGoster: true,
    },
  });

  const steps = [
    {
      id: 1,
      title: "Kişisel Bilgiler",
      description: "Ad ve soyad",
    },
    {
      id: 2,
      title: "Meslek Bilgileri",
      description: "Doğum tarihi ve meslek",
    },
    {
      id: 3,
      title: "İletişim Bilgileri",
      description: "Telefon, email ve sosyal medya",
    },
    { id: 4, title: "Adres & Konum", description: "Adres ve harita konumu" },
    { id: 5, title: "Hayat Hikayesi", description: "Kendinizi tanıtan yazı" },
    {
      id: 6,
      title: "Eğitim Bilgileri",
      description: "Okul, bölüm ve dereceler",
    },
    {
      id: 7,
      title: "İş Deneyimi",
      description: "Çalışma geçmişi ve pozisyonlar",
    },
    { id: 8, title: "Sertifikalar", description: "Aldığınız sertifikalar" },
    { id: 9, title: "Dil Bilgisi", description: "Bildiğiniz diller" },
    {
      id: 10,
      title: "Hobiler & İlgi Alanları",
      description: "Kişisel hobileriniz",
    },
    { id: 11, title: "Sosyal Sorumluluk", description: "Gönüllü çalışmalar" },
    {
      id: 12,
      title: "Yayınlar & Makaleler",
      description: "Yazdığınız içerikler",
    },
    {
      id: 13,
      title: "Ödüller & Başarılar",
      description: "Kazandığınız ödüller",
    },
    { id: 14, title: "Referanslar", description: "İş referanslarınız" },
    { id: 15, title: "Hizmetler", description: "Sunduğunuz hizmetler" },
    { id: 16, title: "Paket Seçimi", description: "CV paketinizi seçin" },
  ];

  const next = () => setStep((s) => Math.min(s + 1, steps.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.ad.trim()) {
      errors.push({ step: 1, field: "ad", message: "Ad alanı zorunludur" });
    }
    if (!formData.soyad.trim()) {
      errors.push({
        step: 1,
        field: "soyad",
        message: "Soyad alanı zorunludur",
      });
    }
    if (!formData.dogumTarihi) {
      errors.push({
        step: 2,
        field: "dogumTarihi",
        message: "Doğum tarihi zorunludur",
      });
    }
    if (!formData.adres.trim()) {
      errors.push({
        step: 4,
        field: "adres",
        message: "Adres alanı zorunludur",
      });
    }
    if (!formData.hayatHikayesi.trim()) {
      errors.push({
        step: 5,
        field: "hayatHikayesi",
        message: "Hayat hikayesi zorunludur",
      });
    }
    return errors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      const errorMap = {};
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      const firstError = validationErrors[0];
      setStep(firstError.step);
      alert(`Eksik bilgi: ${firstError.message}`);
      return;
    }
    setErrors({});

    // Direk templates sayfasına yönlendir
    const encodedData = encodeURIComponent(JSON.stringify(formData));
    window.location.href = `/templates?data=${encodedData}`;
  };

  return (
    <div className="w-full max-w-full mx-auto px-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-medium text-white">
            Adım {step} / {steps.length}
          </span>
          <span className="text-lg text-white">{steps[step - 1].title}</span>
        </div>
        <div className="h-4 rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg transition-all duration-300"
            style={{ width: `${(step / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-fit max-h-[700px] p-8 overflow-y-auto bg-white rounded-xl shadow-lg border">
        {/* Step 1 - Kişisel Bilgiler */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Kişisel Bilgiler
              </h3>
              <p className="text-slate-600 text-lg">Adınız ve soyadınız</p>
            </div>

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
          </div>
        )}

        {/* Step 2 - Meslek Bilgileri */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Meslek Bilgileri
              </h3>
              <p className="text-slate-600 text-lg">
                Doğum tarihi ve meslek bilgileriniz
              </p>
            </div>

            <div className="space-y-6">
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dogumTarihi}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Meslek Kategorisi
                </label>
                <select
                  value={formData.meslek}
                  onChange={(e) => handleInputChange("meslek", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                  <option value="">Meslek seçiniz</option>
                  <option value="teknoloji">Teknoloji & Yazılım</option>
                  <option value="finans">Finans & Muhasebe</option>
                  <option value="saglik">Sağlık & Tıp</option>
                  <option value="egitim">Eğitim & Öğretim</option>
                  <option value="sanat">Sanat & Tasarım</option>
                  <option value="muhendislik">Mühendislik</option>
                  <option value="pazarlama">Pazarlama & Satış</option>
                  <option value="hukuk">Hukuk</option>
                  <option value="insan_kaynaklari">İnsan Kaynakları</option>
                  <option value="operasyon">Operasyon & Lojistik</option>
                  <option value="arastirma">Araştırma & Geliştirme</option>
                  <option value="danismanlik">Danışmanlık</option>
                  <option value="gayrimenkul">Gayrimenkul</option>
                  <option value="turizm">Turizm & Otelcilik</option>
                  <option value="medya">Medya & İletişim</option>
                  <option value="spor">Spor & Fitness</option>
                  <option value="tarim">Tarım & Hayvancılık</option>
                  <option value="enerji">Enerji & Çevre</option>
                  <option value="gida">Gıda & Tarım</option>
                  <option value="diger">Diğer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Meslek Adı (Kendi Mesleğinizi Yazın)
                </label>
                <input
                  type="text"
                  value={formData.ozelMeslek}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ozelMeslek: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Örn: Frontend Developer, Pazarlama Uzmanı, Doktor, Öğretmen..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3 - İletişim Bilgileri */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                İletişim Bilgileri
              </h3>
              <p className="text-slate-600 text-lg">
                Telefon, email ve sosyal medya hesaplarınız
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-slate-900">
                Temel İletişim
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.iletisim.telefon}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        iletisim: { ...prev.iletisim, telefon: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="+90 5XX XXX XX XX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={formData.iletisim.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        iletisim: { ...prev.iletisim, email: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-slate-900">
                Sosyal Medya & Profesyonel Hesaplar
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.iletisim.website}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        iletisim: { ...prev.iletisim, website: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="https://www.website.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={formData.iletisim.linkedin}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        iletisim: {
                          ...prev.iletisim,
                          linkedin: e.target.value,
                        },
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="https://linkedin.com/in/kullaniciadi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.iletisim.instagram}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        iletisim: {
                          ...prev.iletisim,
                          instagram: e.target.value,
                        },
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="@kullaniciadi"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 - Adres & Konum */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Adres</h3>
              <p className="text-slate-600">Konumunuzu belirtin</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Adres / Konum
                </label>
                <textarea
                  value={formData.adres}
                  onChange={(e) => {
                    handleInputChange("adres", e.target.value);
                    if (errors.adres) {
                      setErrors((prev) => ({ ...prev, adres: null }));
                    }
                  }}
                  rows={4}
                  className={`w-full rounded-xl border bg-white px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg resize-none ${
                    errors.adres ? "border-red-500" : "border-slate-300"
                  }`}
                  placeholder="Adresinizi detaylı bir şekilde girin..."
                />
                {errors.adres && (
                  <p className="text-red-500 text-sm mt-1">{errors.adres}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Haritadan Konum Seç
                </label>
                <button
                  type="button"
                  onClick={() => setShowMapModal(true)}
                  className="w-full rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors p-8 text-center"
                >
                  <svg
                    className="w-12 h-12 text-blue-500 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-blue-600 font-medium">
                    Haritadan Konum Seç
                  </p>
                  <p className="text-blue-500 text-sm">
                    Tıklayarak haritadan konumunuzu işaretleyin
                  </p>
                </button>

                {formData.haritaKonumu && (
                  <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">
                      <strong>Seçilen Konum:</strong>{" "}
                      {formData.haritaKonumu.lat.toFixed(6)},{" "}
                      {formData.haritaKonumu.lng.toFixed(6)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 5 - Hayat Hikayesi */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Hayat Hikayesi
              </h3>
              <p className="text-slate-600">Sizi anlatan bir yazı</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Hayat Hikayeniz
              </label>
              <textarea
                value={formData.hayatHikayesi}
                onChange={(e) => {
                  handleInputChange("hayatHikayesi", e.target.value);
                  if (errors.hayatHikayesi) {
                    setErrors((prev) => ({ ...prev, hayatHikayesi: null }));
                  }
                }}
                rows={6}
                className={`w-full rounded-xl border bg-white px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg ${
                  errors.hayatHikayesi ? "border-red-500" : "border-slate-300"
                }`}
                placeholder="Kendinizi tanıtan bir yazı yazın..."
              />
              {errors.hayatHikayesi && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.hayatHikayesi}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 6 - Eğitim Bilgileri */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                CV Bilgileri
              </h3>
              <p className="text-slate-600">Eğitim ve yetkinlikler</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-slate-900">
                  Eğitim Bilgileri
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const yeniEgitim = {
                      id: Date.now(),
                      okulAdi: "",
                      bolum: "",
                      mezunTarihi: "",
                      derece: "",
                    };
                    setFormData((prev) => ({
                      ...prev,
                      egitimler: [...prev.egitimler, yeniEgitim],
                    }));
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  + Eğitim Ekle
                </button>
              </div>

              {formData.egitimler.map((egitim, index) => (
                <div
                  key={egitim.id}
                  className="bg-slate-50 p-4 rounded-xl border"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Okul Adı
                      </label>
                      <input
                        type="text"
                        value={egitim.okulAdi}
                        onChange={(e) => {
                          const yeniEgitimler = [...formData.egitimler];
                          yeniEgitimler[index].okulAdi = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            egitimler: yeniEgitimler,
                          }));
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Okul adını girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Bölüm
                      </label>
                      <input
                        type="text"
                        value={egitim.bolum}
                        onChange={(e) => {
                          const yeniEgitimler = [...formData.egitimler];
                          yeniEgitimler[index].bolum = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            egitimler: yeniEgitimler,
                          }));
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Bölüm adını girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Mezun Tarihi
                      </label>
                      <input
                        type="date"
                        value={egitim.mezunTarihi}
                        onChange={(e) => {
                          const yeniEgitimler = [...formData.egitimler];
                          yeniEgitimler[index].mezunTarihi = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            egitimler: yeniEgitimler,
                          }));
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Derece
                      </label>
                      <select
                        value={egitim.derece}
                        onChange={(e) => {
                          const yeniEgitimler = [...formData.egitimler];
                          yeniEgitimler[index].derece = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            egitimler: yeniEgitimler,
                          }));
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Seçiniz</option>
                        <option value="lisans">Lisans</option>
                        <option value="yuksek_lisans">Yüksek Lisans</option>
                        <option value="doktora">Doktora</option>
                        <option value="on_lisans">Ön Lisans</option>
                        <option value="lise">Lise</option>
                        <option value="ortaokul">Ortaokul</option>
                        <option value="ilkokul">İlkokul</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const yeniEgitimler = formData.egitimler.filter(
                        (_, i) => i !== index
                      );
                      setFormData((prev) => ({
                        ...prev,
                        egitimler: yeniEgitimler,
                      }));
                    }}
                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-slate-900">
                  Yetenekler
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const yeniYetenek = {
                      id: Date.now(),
                      ad: "",
                      seviye: "",
                    };
                    setFormData((prev) => ({
                      ...prev,
                      yetenekler: [...prev.yetenekler, yeniYetenek],
                    }));
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                >
                  + Yetenek Ekle
                </button>
              </div>

              {formData.yetenekler.map((yetenek, index) => (
                <div
                  key={yetenek.id}
                  className="bg-slate-50 p-4 rounded-xl border"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Yetenek Adı
                      </label>
                      <input
                        type="text"
                        value={yetenek.ad}
                        onChange={(e) => {
                          const yeniYetenekler = [...formData.yetenekler];
                          yeniYetenekler[index].ad = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            yetenekler: yeniYetenekler,
                          }));
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Yetenek adını girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Seviye
                      </label>
                      <select
                        value={yetenek.seviye}
                        onChange={(e) => {
                          const yeniYetenekler = [...formData.yetenekler];
                          yeniYetenekler[index].seviye = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            yetenekler: yeniYetenekler,
                          }));
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Seçiniz</option>
                        <option value="baslangic">Başlangıç</option>
                        <option value="orta">Orta</option>
                        <option value="ileri">İleri</option>
                        <option value="uzman">Uzman</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const yeniYetenekler = formData.yetenekler.filter(
                        (_, i) => i !== index
                      );
                      setFormData((prev) => ({
                        ...prev,
                        yetenekler: yeniYetenekler,
                      }));
                    }}
                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 7 - İş Deneyimi */}
        {step === 7 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Çalışma Geçmişi
              </h3>
              <p className="text-slate-600">Yerler & tarihler</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-slate-900">
                  İş Deneyimleri
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const yeniIs = {
                      id: Date.now(),
                      sirketAdi: "",
                      pozisyon: "",
                      baslangicTarihi: "",
                      bitisTarihi: "",
                      halaCalisiyor: false,
                      aciklama: "",
                    };
                    setFormData((prev) => ({
                      ...prev,
                      calismaGecmisi: [...prev.calismaGecmisi, yeniIs],
                    }));
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                >
                  + İş Deneyimi Ekle
                </button>
              </div>

              {formData.calismaGecmisi.map((is, index) => (
                <div key={is.id} className="bg-slate-50 p-4 rounded-xl border">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Şirket Adı
                        </label>
                        <input
                          type="text"
                          value={is.sirketAdi}
                          onChange={(e) => {
                            const yeniIsler = [...formData.calismaGecmisi];
                            yeniIsler[index].sirketAdi = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              calismaGecmisi: yeniIsler,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Şirket adını girin"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Pozisyon
                        </label>
                        <input
                          type="text"
                          value={is.pozisyon}
                          onChange={(e) => {
                            const yeniIsler = [...formData.calismaGecmisi];
                            yeniIsler[index].pozisyon = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              calismaGecmisi: yeniIsler,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Pozisyon adını girin"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Başlangıç Tarihi
                        </label>
                        <input
                          type="date"
                          value={is.baslangicTarihi}
                          onChange={(e) => {
                            const yeniIsler = [...formData.calismaGecmisi];
                            yeniIsler[index].baslangicTarihi = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              calismaGecmisi: yeniIsler,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Bitiş Tarihi
                        </label>
                        <input
                          type="date"
                          value={is.bitisTarihi}
                          onChange={(e) => {
                            const yeniIsler = [...formData.calismaGecmisi];
                            yeniIsler[index].bitisTarihi = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              calismaGecmisi: yeniIsler,
                            }));
                          }}
                          disabled={is.halaCalisiyor}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-3 mb-2">
                        <input
                          type="checkbox"
                          checked={is.halaCalisiyor}
                          onChange={(e) => {
                            const yeniIsler = [...formData.calismaGecmisi];
                            yeniIsler[index].halaCalisiyor = e.target.checked;
                            if (e.target.checked) {
                              yeniIsler[index].bitisTarihi = "";
                            }
                            setFormData((prev) => ({
                              ...prev,
                              calismaGecmisi: yeniIsler,
                            }));
                          }}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-slate-700">
                          Hala çalışıyorum
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Açıklama
                      </label>
                      <textarea
                        value={is.aciklama}
                        onChange={(e) => {
                          const yeniIsler = [...formData.calismaGecmisi];
                          yeniIsler[index].aciklama = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            calismaGecmisi: yeniIsler,
                          }));
                        }}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="İş açıklaması girin..."
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const yeniIsler = formData.calismaGecmisi.filter(
                        (_, i) => i !== index
                      );
                      setFormData((prev) => ({
                        ...prev,
                        calismaGecmisi: yeniIsler,
                      }));
                    }}
                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 8 - Sertifikalar */}
        {step === 8 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Sertifikalar
              </h3>
              <p className="text-slate-600 text-lg">
                Aldığınız sertifikaları ve belgeleri ekleyin
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-slate-900">
                  Sertifikalarınız
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const yeniSertifika = {
                      id: Date.now(),
                      ad: "",
                      verenKurum: "",
                      tarih: "",
                      gecerlilikSuresi: "",
                      sertifikaNo: "",
                      link: "",
                    };
                    setFormData((prev) => ({
                      ...prev,
                      sertifikalar: [...prev.sertifikalar, yeniSertifika],
                    }));
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                >
                  + Sertifika Ekle
                </button>
              </div>

              {formData.sertifikalar.map((sertifika, index) => (
                <div
                  key={sertifika.id}
                  className="bg-slate-50 p-6 rounded-xl border"
                >
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Sertifika Adı
                        </label>
                        <input
                          type="text"
                          value={sertifika.ad}
                          onChange={(e) => {
                            const yeniSertifikalar = [...formData.sertifikalar];
                            yeniSertifikalar[index].ad = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              sertifikalar: yeniSertifikalar,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Sertifika adını girin"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Veren Kurum
                        </label>
                        <input
                          type="text"
                          value={sertifika.verenKurum}
                          onChange={(e) => {
                            const yeniSertifikalar = [...formData.sertifikalar];
                            yeniSertifikalar[index].verenKurum = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              sertifikalar: yeniSertifikalar,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Kurum adını girin"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Alınma Tarihi
                        </label>
                        <input
                          type="date"
                          value={sertifika.tarih}
                          onChange={(e) => {
                            const yeniSertifikalar = [...formData.sertifikalar];
                            yeniSertifikalar[index].tarih = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              sertifikalar: yeniSertifikalar,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Geçerlilik Süresi
                        </label>
                        <input
                          type="text"
                          value={sertifika.gecerlilikSuresi}
                          onChange={(e) => {
                            const yeniSertifikalar = [...formData.sertifikalar];
                            yeniSertifikalar[index].gecerlilikSuresi =
                              e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              sertifikalar: yeniSertifikalar,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Örn: 2 yıl, Süresiz"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Sertifika No
                        </label>
                        <input
                          type="text"
                          value={sertifika.sertifikaNo}
                          onChange={(e) => {
                            const yeniSertifikalar = [...formData.sertifikalar];
                            yeniSertifikalar[index].sertifikaNo =
                              e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              sertifikalar: yeniSertifikalar,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Sertifika numarası"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Sertifika Linki
                      </label>
                      <input
                        type="url"
                        value={sertifika.link}
                        onChange={(e) => {
                          const yeniSertifikalar = [...formData.sertifikalar];
                          yeniSertifikalar[index].link = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            sertifikalar: yeniSertifikalar,
                          }));
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const yeniSertifikalar = formData.sertifikalar.filter(
                        (_, i) => i !== index
                      );
                      setFormData((prev) => ({
                        ...prev,
                        sertifikalar: yeniSertifikalar,
                      }));
                    }}
                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 9 - Dil Bilgisi */}
        {step === 9 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Dil Bilgisi
              </h3>
              <p className="text-slate-600 text-lg">
                Bildiğiniz dilleri ve seviyelerini ekleyin
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-slate-900">
                  Bildiğiniz Diller
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const yeniDil = {
                      id: Date.now(),
                      dil: "",
                      konusma: "",
                      yazma: "",
                      okuma: "",
                      dinleme: "",
                    };
                    setFormData((prev) => ({
                      ...prev,
                      dilBilgisi: [...prev.dilBilgisi, yeniDil],
                    }));
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  + Dil Ekle
                </button>
              </div>

              {formData.dilBilgisi.map((dil, index) => (
                <div key={dil.id} className="bg-slate-50 p-6 rounded-xl border">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Dil
                        </label>
                        <select
                          value={dil.dil}
                          onChange={(e) => {
                            const yeniDiller = [...formData.dilBilgisi];
                            yeniDiller[index].dil = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              dilBilgisi: yeniDiller,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Dil seçiniz</option>
                          <option value="turkce">Türkçe</option>
                          <option value="ingilizce">İngilizce</option>
                          <option value="almanca">Almanca</option>
                          <option value="fransizca">Fransızca</option>
                          <option value="ispanyolca">İspanyolca</option>
                          <option value="italyanca">İtalyanca</option>
                          <option value="rusca">Rusça</option>
                          <option value="arapca">Arapça</option>
                          <option value="cince">Çince</option>
                          <option value="japonca">Japonca</option>
                          <option value="korece">Korece</option>
                          <option value="diger">Diğer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Konuşma Seviyesi
                        </label>
                        <select
                          value={dil.konusma}
                          onChange={(e) => {
                            const yeniDiller = [...formData.dilBilgisi];
                            yeniDiller[index].konusma = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              dilBilgisi: yeniDiller,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seviye seçiniz</option>
                          <option value="baslangic">Başlangıç</option>
                          <option value="orta">Orta</option>
                          <option value="ileri">İleri</option>
                          <option value="ana_dil">Ana Dil</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Yazma Seviyesi
                        </label>
                        <select
                          value={dil.yazma}
                          onChange={(e) => {
                            const yeniDiller = [...formData.dilBilgisi];
                            yeniDiller[index].yazma = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              dilBilgisi: yeniDiller,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seviye seçiniz</option>
                          <option value="baslangic">Başlangıç</option>
                          <option value="orta">Orta</option>
                          <option value="ileri">İleri</option>
                          <option value="ana_dil">Ana Dil</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Okuma Seviyesi
                        </label>
                        <select
                          value={dil.okuma}
                          onChange={(e) => {
                            const yeniDiller = [...formData.dilBilgisi];
                            yeniDiller[index].okuma = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              dilBilgisi: yeniDiller,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seviye seçiniz</option>
                          <option value="baslangic">Başlangıç</option>
                          <option value="orta">Orta</option>
                          <option value="ileri">İleri</option>
                          <option value="ana_dil">Ana Dil</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Dinleme Seviyesi
                        </label>
                        <select
                          value={dil.dinleme}
                          onChange={(e) => {
                            const yeniDiller = [...formData.dilBilgisi];
                            yeniDiller[index].dinleme = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              dilBilgisi: yeniDiller,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seviye seçiniz</option>
                          <option value="baslangic">Başlangıç</option>
                          <option value="orta">Orta</option>
                          <option value="ileri">İleri</option>
                          <option value="ana_dil">Ana Dil</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const yeniDiller = formData.dilBilgisi.filter(
                        (_, i) => i !== index
                      );
                      setFormData((prev) => ({
                        ...prev,
                        dilBilgisi: yeniDiller,
                      }));
                    }}
                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 10 - Hobiler - TAM DETAYLI */}
        {step === 10 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Hobiler & İlgi Alanları
              </h3>
              <p className="text-slate-600 text-lg">
                Kişisel hobilerinizi ve ilgi alanlarınızı ekleyin
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-slate-900">
                  Hobileriniz
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const yeniHobi = {
                      id: Date.now(),
                      ad: "",
                      aciklama: "",
                      seviye: "",
                    };
                    setFormData((prev) => ({
                      ...prev,
                      hobiler: [...prev.hobiler, yeniHobi],
                    }));
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                >
                  + Hobi Ekle
                </button>
              </div>

              {formData.hobiler.map((hobi, index) => (
                <div
                  key={hobi.id}
                  className="bg-slate-50 p-6 rounded-xl border"
                >
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Hobi Adı
                        </label>
                        <input
                          type="text"
                          value={hobi.ad}
                          onChange={(e) => {
                            const yeniHobiler = [...formData.hobiler];
                            yeniHobiler[index].ad = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              hobiler: yeniHobiler,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Örn: Fotoğrafçılık, Müzik, Spor..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Seviye
                        </label>
                        <select
                          value={hobi.seviye}
                          onChange={(e) => {
                            const yeniHobiler = [...formData.hobiler];
                            yeniHobiler[index].seviye = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              hobiler: yeniHobiler,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seviye seçiniz</option>
                          <option value="baslangic">Başlangıç</option>
                          <option value="orta">Orta</option>
                          <option value="ileri">İleri</option>
                          <option value="uzman">Uzman</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Açıklama
                      </label>
                      <textarea
                        value={hobi.aciklama}
                        onChange={(e) => {
                          const yeniHobiler = [...formData.hobiler];
                          yeniHobiler[index].aciklama = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            hobiler: yeniHobiler,
                          }));
                        }}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Hobiniz hakkında detaylı bilgi..."
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const yeniHobiler = formData.hobiler.filter(
                        (_, i) => i !== index
                      );
                      setFormData((prev) => ({
                        ...prev,
                        hobiler: yeniHobiler,
                      }));
                    }}
                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 11 - Sosyal Sorumluluk - TAM DETAYLI */}
        {step === 11 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Sosyal Sorumluluk
              </h3>
              <p className="text-slate-600 text-lg">
                Gönüllü çalışmalarınızı ve sosyal sorumluluk projelerinizi
                ekleyin
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-slate-900">
                  Sosyal Sorumluluk Projeleri
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const yeniProje = {
                      id: Date.now(),
                      ad: "",
                      organizasyon: "",
                      tarih: "",
                      sure: "",
                      aciklama: "",
                    };
                    setFormData((prev) => ({
                      ...prev,
                      sosyalSorumluluk: [...prev.sosyalSorumluluk, yeniProje],
                    }));
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                >
                  + Proje Ekle
                </button>
              </div>

              {formData.sosyalSorumluluk.map((proje, index) => (
                <div
                  key={proje.id}
                  className="bg-slate-50 p-6 rounded-xl border"
                >
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Proje Adı
                        </label>
                        <input
                          type="text"
                          value={proje.ad}
                          onChange={(e) => {
                            const yeniProjeler = [...formData.sosyalSorumluluk];
                            yeniProjeler[index].ad = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              sosyalSorumluluk: yeniProjeler,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Proje adını girin"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Organizasyon
                        </label>
                        <input
                          type="text"
                          value={proje.organizasyon}
                          onChange={(e) => {
                            const yeniProjeler = [...formData.sosyalSorumluluk];
                            yeniProjeler[index].organizasyon = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              sosyalSorumluluk: yeniProjeler,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Organizasyon adı"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Tarih
                        </label>
                        <input
                          type="date"
                          value={proje.tarih}
                          onChange={(e) => {
                            const yeniProjeler = [...formData.sosyalSorumluluk];
                            yeniProjeler[index].tarih = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              sosyalSorumluluk: yeniProjeler,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Süre
                        </label>
                        <input
                          type="text"
                          value={proje.sure}
                          onChange={(e) => {
                            const yeniProjeler = [...formData.sosyalSorumluluk];
                            yeniProjeler[index].sure = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              sosyalSorumluluk: yeniProjeler,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Örn: 3 ay, 1 yıl..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Açıklama
                      </label>
                      <textarea
                        value={proje.aciklama}
                        onChange={(e) => {
                          const yeniProjeler = [...formData.sosyalSorumluluk];
                          yeniProjeler[index].aciklama = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            sosyalSorumluluk: yeniProjeler,
                          }));
                        }}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Proje hakkında detaylı bilgi..."
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const yeniProjeler = formData.sosyalSorumluluk.filter(
                        (_, i) => i !== index
                      );
                      setFormData((prev) => ({
                        ...prev,
                        sosyalSorumluluk: yeniProjeler,
                      }));
                    }}
                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 12 - Yayınlar - TAM DETAYLI */}
        {step === 12 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Yayınlar & Makaleler
              </h3>
              <p className="text-slate-600 text-lg">
                Yazdığınız makaleleri, blog yazılarını ve yayınlarınızı ekleyin
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-slate-900">
                  Yayınlarınız
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const yeniYayin = {
                      id: Date.now(),
                      baslik: "",
                      yayinYeri: "",
                      tarih: "",
                      link: "",
                      aciklama: "",
                    };
                    setFormData((prev) => ({
                      ...prev,
                      yayinlar: [...prev.yayinlar, yeniYayin],
                    }));
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                >
                  + Yayın Ekle
                </button>
              </div>

              {formData.yayinlar.map((yayin, index) => (
                <div
                  key={yayin.id}
                  className="bg-slate-50 p-6 rounded-xl border"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Başlık
                      </label>
                      <input
                        type="text"
                        value={yayin.baslik}
                        onChange={(e) => {
                          const yeniYayinlar = [...formData.yayinlar];
                          yeniYayinlar[index].baslik = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            yayinlar: yeniYayinlar,
                          }));
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Makale/yayın başlığı"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Yayın Yeri
                        </label>
                        <input
                          type="text"
                          value={yayin.yayinYeri}
                          onChange={(e) => {
                            const yeniYayinlar = [...formData.yayinlar];
                            yeniYayinlar[index].yayinYeri = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              yayinlar: yeniYayinlar,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Dergi, blog, platform..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Tarih
                        </label>
                        <input
                          type="date"
                          value={yayin.tarih}
                          onChange={(e) => {
                            const yeniYayinlar = [...formData.yayinlar];
                            yeniYayinlar[index].tarih = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              yayinlar: yeniYayinlar,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Link
                      </label>
                      <input
                        type="url"
                        value={yayin.link}
                        onChange={(e) => {
                          const yeniYayinlar = [...formData.yayinlar];
                          yeniYayinlar[index].link = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            yayinlar: yeniYayinlar,
                          }));
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Açıklama
                      </label>
                      <textarea
                        value={yayin.aciklama}
                        onChange={(e) => {
                          const yeniYayinlar = [...formData.yayinlar];
                          yeniYayinlar[index].aciklama = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            yayinlar: yeniYayinlar,
                          }));
                        }}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Yayın hakkında kısa açıklama..."
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const yeniYayinlar = formData.yayinlar.filter(
                        (_, i) => i !== index
                      );
                      setFormData((prev) => ({
                        ...prev,
                        yayinlar: yeniYayinlar,
                      }));
                    }}
                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 13 - Ödüller - TAM DETAYLI */}
        {step === 13 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Ödüller & Başarılar
              </h3>
              <p className="text-slate-600 text-lg">
                Kazandığınız ödülleri ve başarılarınızı ekleyin
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-slate-900">
                  Ödülleriniz
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const yeniOdul = {
                      id: Date.now(),
                      ad: "",
                      verenKurum: "",
                      tarih: "",
                      kategori: "",
                      aciklama: "",
                    };
                    setFormData((prev) => ({
                      ...prev,
                      oduller: [...prev.oduller, yeniOdul],
                    }));
                  }}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700 transition-colors"
                >
                  + Ödül Ekle
                </button>
              </div>

              {formData.oduller.map((odul, index) => (
                <div
                  key={odul.id}
                  className="bg-slate-50 p-6 rounded-xl border"
                >
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Ödül Adı
                        </label>
                        <input
                          type="text"
                          value={odul.ad}
                          onChange={(e) => {
                            const yeniOduller = [...formData.oduller];
                            yeniOduller[index].ad = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              oduller: yeniOduller,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ödül adını girin"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Veren Kurum
                        </label>
                        <input
                          type="text"
                          value={odul.verenKurum}
                          onChange={(e) => {
                            const yeniOduller = [...formData.oduller];
                            yeniOduller[index].verenKurum = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              oduller: yeniOduller,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Kurum adı"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Tarih
                        </label>
                        <input
                          type="date"
                          value={odul.tarih}
                          onChange={(e) => {
                            const yeniOduller = [...formData.oduller];
                            yeniOduller[index].tarih = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              oduller: yeniOduller,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Kategori
                        </label>
                        <select
                          value={odul.kategori}
                          onChange={(e) => {
                            const yeniOduller = [...formData.oduller];
                            yeniOduller[index].kategori = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              oduller: yeniOduller,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Kategori seçiniz</option>
                          <option value="akademik">Akademik</option>
                          <option value="mesleki">Mesleki</option>
                          <option value="sanat">Sanat</option>
                          <option value="spor">Spor</option>
                          <option value="sosyal">Sosyal</option>
                          <option value="diger">Diğer</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Açıklama
                      </label>
                      <textarea
                        value={odul.aciklama}
                        onChange={(e) => {
                          const yeniOduller = [...formData.oduller];
                          yeniOduller[index].aciklama = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            oduller: yeniOduller,
                          }));
                        }}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Ödül hakkında detaylı bilgi..."
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const yeniOduller = formData.oduller.filter(
                        (_, i) => i !== index
                      );
                      setFormData((prev) => ({
                        ...prev,
                        oduller: yeniOduller,
                      }));
                    }}
                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 14 - Referanslar - TAM DETAYLI */}
        {step === 14 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Referanslar
              </h3>
              <p className="text-slate-600 text-lg">
                İş referanslarınızı ve tanıdıklarınızı ekleyin
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-slate-900">
                  Referanslarınız
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const yeniReferans = {
                      id: Date.now(),
                      ad: "",
                      soyad: "",
                      pozisyon: "",
                      sirket: "",
                      telefon: "",
                      email: "",
                      iliski: "",
                    };
                    setFormData((prev) => ({
                      ...prev,
                      referanslar: [...prev.referanslar, yeniReferans],
                    }));
                  }}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700 transition-colors"
                >
                  + Referans Ekle
                </button>
              </div>

              {formData.referanslar.map((referans, index) => (
                <div
                  key={referans.id}
                  className="bg-slate-50 p-6 rounded-xl border"
                >
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Ad
                        </label>
                        <input
                          type="text"
                          value={referans.ad}
                          onChange={(e) => {
                            const yeniReferanslar = [...formData.referanslar];
                            yeniReferanslar[index].ad = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              referanslar: yeniReferanslar,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ad"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Soyad
                        </label>
                        <input
                          type="text"
                          value={referans.soyad}
                          onChange={(e) => {
                            const yeniReferanslar = [...formData.referanslar];
                            yeniReferanslar[index].soyad = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              referanslar: yeniReferanslar,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Soyad"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Pozisyon
                        </label>
                        <input
                          type="text"
                          value={referans.pozisyon}
                          onChange={(e) => {
                            const yeniReferanslar = [...formData.referanslar];
                            yeniReferanslar[index].pozisyon = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              referanslar: yeniReferanslar,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Pozisyon"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Şirket
                        </label>
                        <input
                          type="text"
                          value={referans.sirket}
                          onChange={(e) => {
                            const yeniReferanslar = [...formData.referanslar];
                            yeniReferanslar[index].sirket = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              referanslar: yeniReferanslar,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Şirket adı"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          value={referans.telefon}
                          onChange={(e) => {
                            const yeniReferanslar = [...formData.referanslar];
                            yeniReferanslar[index].telefon = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              referanslar: yeniReferanslar,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="+90 5XX XXX XX XX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          E-posta
                        </label>
                        <input
                          type="email"
                          value={referans.email}
                          onChange={(e) => {
                            const yeniReferanslar = [...formData.referanslar];
                            yeniReferanslar[index].email = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              referanslar: yeniReferanslar,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="ornek@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        İlişki
                      </label>
                      <select
                        value={referans.iliski}
                        onChange={(e) => {
                          const yeniReferanslar = [...formData.referanslar];
                          yeniReferanslar[index].iliski = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            referanslar: yeniReferanslar,
                          }));
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">İlişki seçiniz</option>
                        <option value="eski_patron">Eski Patron</option>
                        <option value="eski_meslektas">Eski Meslektaş</option>
                        <option value="mentor">Mentor</option>
                        <option value="profesor">Profesör</option>
                        <option value="musteri">Müşteri</option>
                        <option value="diger">Diğer</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const yeniReferanslar = formData.referanslar.filter(
                        (_, i) => i !== index
                      );
                      setFormData((prev) => ({
                        ...prev,
                        referanslar: yeniReferanslar,
                      }));
                    }}
                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 15 - Hizmetler */}
        {step === 15 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Hizmetler
              </h3>
              <p className="text-slate-600 text-lg">
                Sunduğunuz hizmetleri ve uzmanlık alanlarınızı ekleyin
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-slate-900">
                  Hizmetleriniz
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const yeniHizmet = {
                      id: Date.now(),
                      ad: "",
                      aciklama: "",
                      fiyat: "",
                      sure: "",
                      kategori: "",
                    };
                    setFormData((prev) => ({
                      ...prev,
                      hizmetler: [...prev.hizmetler, yeniHizmet],
                    }));
                  }}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700 transition-colors"
                >
                  + Hizmet Ekle
                </button>
              </div>

              {formData.hizmetler.map((hizmet, index) => (
                <div
                  key={hizmet.id}
                  className="bg-slate-50 p-6 rounded-xl border"
                >
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Hizmet Adı
                        </label>
                        <input
                          type="text"
                          value={hizmet.ad}
                          onChange={(e) => {
                            const yeniHizmetler = [...formData.hizmetler];
                            yeniHizmetler[index].ad = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              hizmetler: yeniHizmetler,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Hizmet adını girin"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Kategori
                        </label>
                        <select
                          value={hizmet.kategori}
                          onChange={(e) => {
                            const yeniHizmetler = [...formData.hizmetler];
                            yeniHizmetler[index].kategori = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              hizmetler: yeniHizmetler,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Kategori seçiniz</option>
                          <option value="danismanlik">Danışmanlık</option>
                          <option value="egitim">Eğitim</option>
                          <option value="tasarim">Tasarım</option>
                          <option value="yazilim">Yazılım</option>
                          <option value="pazarlama">Pazarlama</option>
                          <option value="muhasebe">Muhasebe</option>
                          <option value="hukuk">Hukuk</option>
                          <option value="saglik">Sağlık</option>
                          <option value="diger">Diğer</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Fiyat
                        </label>
                        <input
                          type="text"
                          value={hizmet.fiyat}
                          onChange={(e) => {
                            const yeniHizmetler = [...formData.hizmetler];
                            yeniHizmetler[index].fiyat = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              hizmetler: yeniHizmetler,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Örn: 500₺, 50$/saat..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Süre
                        </label>
                        <input
                          type="text"
                          value={hizmet.sure}
                          onChange={(e) => {
                            const yeniHizmetler = [...formData.hizmetler];
                            yeniHizmetler[index].sure = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              hizmetler: yeniHizmetler,
                            }));
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Örn: 2 saat, 1 hafta..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Açıklama
                      </label>
                      <textarea
                        value={hizmet.aciklama}
                        onChange={(e) => {
                          const yeniHizmetler = [...formData.hizmetler];
                          yeniHizmetler[index].aciklama = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            hizmetler: yeniHizmetler,
                          }));
                        }}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Hizmet hakkında detaylı bilgi..."
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const yeniHizmetler = formData.hizmetler.filter(
                        (_, i) => i !== index
                      );
                      setFormData((prev) => ({
                        ...prev,
                        hizmetler: yeniHizmetler,
                      }));
                    }}
                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 16 - Paket Seçimi */}
        {step === 16 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Paket Seçimi
              </h3>
              <p className="text-slate-600 text-lg">
                Size en uygun paketi seçin
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Ücretsiz Paket - SEÇİLEBİLİR */}
              <div
                className={`relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 cursor-pointer transition-all duration-300 ${
                  formData.paket === "ucretsiz"
                    ? "border-emerald-500 shadow-xl scale-105"
                    : "border-gray-300 hover:border-emerald-400 hover:shadow-lg"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, paket: "ucretsiz" }))
                }
              >
                {formData.paket === "ucretsiz" && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    ✓ Seçildi
                  </div>
                )}
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    Ücretsiz
                  </h4>
                  <div className="text-4xl font-extrabold text-emerald-600 mb-2">
                    ₺0
                  </div>
                  <p className="text-gray-600 text-sm">
                    Sonsuza kadar ücretsiz
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span className="text-sm">1 CV şablonu</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span className="text-sm">Temel özelleştirme</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span className="text-sm">PDF indirme</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400">
                    <span className="text-gray-400 font-bold mt-0.5">✗</span>
                    <span className="text-sm">Premium şablonlar</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400">
                    <span className="text-gray-400 font-bold mt-0.5">✗</span>
                    <span className="text-sm">Gelişmiş özelleştirme</span>
                  </li>
                </ul>
                <button
                  type="button"
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    formData.paket === "ucretsiz"
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {formData.paket === "ucretsiz" ? "Seçildi" : "Seç"}
                </button>
              </div>

              {/* Premium Paket - STATİK */}
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-purple-300 opacity-60 cursor-not-allowed">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  YAKINDA
                </div>
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    Premium
                  </h4>
                  <div className="text-4xl font-extrabold text-purple-600 mb-2">
                    ₺299
                  </div>
                  <p className="text-gray-600 text-sm">Yıllık</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-500 font-bold mt-0.5">✓</span>
                    <span className="text-sm">Tüm ücretsiz özellikler</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-500 font-bold mt-0.5">✓</span>
                    <span className="text-sm">10+ premium şablon</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-500 font-bold mt-0.5">✓</span>
                    <span className="text-sm">Gelişmiş özelleştirme</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-500 font-bold mt-0.5">✓</span>
                    <span className="text-sm">Öncelikli destek</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-500 font-bold mt-0.5">✓</span>
                    <span className="text-sm">Logo kaldırma</span>
                  </li>
                </ul>
                <button
                  type="button"
                  disabled
                  className="w-full py-3 rounded-xl font-semibold bg-gray-300 text-gray-500 cursor-not-allowed"
                >
                  Yakında Gelecek
                </button>
              </div>

              {/* Enterprise Paket - STATİK */}
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-300 opacity-60 cursor-not-allowed">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  YAKINDA
                </div>
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    Enterprise
                  </h4>
                  <div className="text-4xl font-extrabold text-amber-600 mb-2">
                    ₺999
                  </div>
                  <p className="text-gray-600 text-sm">Yıllık</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-amber-500 font-bold mt-0.5">✓</span>
                    <span className="text-sm">Tüm premium özellikler</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-amber-500 font-bold mt-0.5">✓</span>
                    <span className="text-sm">Sınırsız CV</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-amber-500 font-bold mt-0.5">✓</span>
                    <span className="text-sm">AI destekli içerik</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-amber-500 font-bold mt-0.5">✓</span>
                    <span className="text-sm">Özel şablonlar</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-amber-500 font-bold mt-0.5">✓</span>
                    <span className="text-sm">7/24 VIP destek</span>
                  </li>
                </ul>
                <button
                  type="button"
                  disabled
                  className="w-full py-3 rounded-xl font-semibold bg-gray-300 text-gray-500 cursor-not-allowed"
                >
                  Yakında Gelecek
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <p className="text-sm text-blue-800">
                💡 <strong>İpucu:</strong> Ücretsiz paket ile başlayın,
                istediğiniz zaman Premium'a yükseltebilirsiniz!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          disabled={step === 1}
          className="rounded-xl border border-slate-300 bg-white px-8 py-4 text-lg font-medium text-slate-700 disabled:opacity-50 hover:bg-slate-50 transition-all duration-200"
        >
          Geri
        </button>
        <button
          type="button"
          onClick={step === steps.length ? handleSubmit : next}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-4 text-lg font-medium text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
        >
          {step === steps.length ? "Şablon Seç" : "İleri"}
        </button>
      </div>

      {/* Harita Modal */}
      {showMapModal && (
        <MapModal
          isOpen={showMapModal}
          onClose={() => setShowMapModal(false)}
          onSave={(locationData) => {
            setFormData((prev) => ({
              ...prev,
              haritaKonumu: {
                lat: locationData.lat,
                lng: locationData.lng,
              },
              adres: locationData.adres,
            }));
            setShowMapModal(false);
          }}
          initialData={{
            lat: formData.haritaKonumu?.lat,
            lng: formData.haritaKonumu?.lng,
            adres: formData.adres,
          }}
        />
      )}
    </div>
  );
}
