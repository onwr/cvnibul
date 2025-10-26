"use client";

import { useState } from "react";
import Navigation from "@/components/cv/Navigation";
import Footer from "@/components/cv/Footer";
import { FiCheck, FiAlertCircle } from "react-icons/fi";

export default function IsbirligiPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    category: "",
    promotionArea: "",
    description: "",
    businessName: "",
    websiteUrl: "",
    contentAbout: "",
    targetCountry: "",
    country: "",
    flatNumber: "",
    buildingNumber: "",
    street: "",
    city: "",
    county: "",
    postalCode: "",
    taxCountry: "",
    newsletter: false,
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "İçerik Oluşturucular ve Etkileyiciler",
    "Topluluklar ve Kullanıcı Tarafından Oluşturulan İçerik",
    "Editöryal İçerik",
    "İndirim Kodu",
    "Medya İçeriği",
  ];

  const promotionAreas = [
    "Giyim",
    "Giyim Aksesuarları",
    "Sağlık ve Güzellik",
    "Erkek Giyim",
    "Fotoğrafçılık",
    "Ayakkabı",
    "Spor Giyim",
    "Kadın Giyim",
    "Yerel Tatiller",
    "Turizm ve Gezilecek Yerler",
    "Teknoloji",
    "Ev ve Yaşam",
    "Gıda ve İçecek",
  ];

  const countries = [
    "Türkiye",
    "ABD",
    "İngiltere",
    "Almanya",
    "Fransa",
    "İtalya",
    "İspanya",
    "Hollanda",
    "Belçika",
    "Diğer",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("=== FORM GÖNDERİM BAŞLADI ===");
    console.log("📝 Form data (JSON):", JSON.stringify(formData, null, 2));
    console.log("📝 Form data (object):", formData);

    try {
      const response = await fetch("/api/partnership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("📡 API Response Status:", response.status);
      console.log("📡 API Response OK:", response.ok);

      const data = await response.json();
      console.log("📦 API Response Data:", data);

      if (response.ok) {
        console.log("✅ ✅ ✅ BAŞVURU BAŞARILI! ✅ ✅ ✅");
        console.log("📋 Başvuru ID:", data.id);
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          category: "",
          promotionArea: "",
          description: "",
          businessName: "",
          websiteUrl: "",
          contentAbout: "",
          targetCountry: "",
          country: "",
          flatNumber: "",
          buildingNumber: "",
          street: "",
          city: "",
          county: "",
          postalCode: "",
          taxCountry: "",
          newsletter: false,
          terms: false,
        });
      } else {
        console.error("❌ ❌ ❌ BAŞVURU HATASI ❌ ❌ ❌");
        console.error("❌ Hata mesajı:", data.error);
        setError(data.error || "Bir hata oluştu");
      }
    } catch (err) {
      console.error("=== FORM GÖNDERİM HATASI ===");
      console.error("❌ Catch bloğu:", err);
      console.error("❌ Error message:", err.message);
      console.error("❌ Error stack:", err.stack);
      setError("Başvuru gönderilirken bir hata oluştu");
    } finally {
      console.log("=== FORM İŞLEMİ TAMAMLANDI ===");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation isScrolled={false} />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              İş Birliği Başvurusu
            </h1>
            <p className="text-lg text-gray-600">
              CvHazirla ile iş birliği yapmak için formu doldurun
            </p>
          </div>

          {/* Success Modal */}
          {success && (
            <div className="mb-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Başvurunuz Alındı!</h3>
                  <p className="text-white/90">
                    En kısa sürede dönüş yapılacaktır.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="mb-8 bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8"
          >
            {/* Kişisel Bilgiler */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Kişisel Bilgiler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                    placeholder="Adınız"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soyad *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  />
                </div>
              </div>
            </div>

            {/* İş Bilgileri */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                İş Bilgileri
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yaptığınız işi en iyi tanımlayan kategori *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  >
                    <option value="">Kategori Seçin</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genellikle neyi teşvik ediyorsunuz? *
                  </label>
                  <select
                    name="promotionArea"
                    value={formData.promotionArea}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  >
                    <option value="">Alan Seçin</option>
                    {promotionAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ne yaptığınız hakkında bize biraz daha bilgi verin *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-black placeholder-gray-400"
                    placeholder="İşiniz hakkında kısa bir açıklama yazın..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İşletmenizin, sosyal medyanızın veya web sitenizin adı *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                    placeholder="Marka/İşletme Adı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Web sitenizin veya sosyal medya adresinizin URL'si *
                  </label>
                  <input
                    type="url"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                    placeholder="https://"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İçeriğiniz ne hakkında? *
                  </label>
                  <textarea
                    name="contentAbout"
                    value={formData.contentAbout}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-black placeholder-gray-400"
                    placeholder="Örneğin, son teknoloji aletlerini inceleyen bir YouTube kanalı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hedef kitleniz nerede yaşıyor? *
                  </label>
                  <select
                    name="targetCountry"
                    value={formData.targetCountry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  >
                    <option value="">Ülke Seçin</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Adres Bilgileri */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Adres Bilgileri
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ülke *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  >
                    <option value="">Ülke Seçin</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daire Numarası
                    </label>
                    <input
                      type="text"
                      name="flatNumber"
                      value={formData.flatNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bina Numarası *
                    </label>
                    <input
                      type="text"
                      name="buildingNumber"
                      value={formData.buildingNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sokak *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Şehir/Kasaba *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İlçe
                    </label>
                    <input
                      type="text"
                      name="county"
                      value={formData.county}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Posta Kodu *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vergiyi nereye ödüyorsunuz? *
                  </label>
                  <select
                    name="taxCountry"
                    value={formData.taxCountry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                  >
                    <option value="">Ülke Seçin</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Onaylar */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-700">
                  CvHazirla bültenlerine abone olmak istiyorum. Bültendeki
                  abonelikten çıkma bağlantısını tıklayarak istediğiniz zaman
                  aboneliğinizi iptal edebilirsiniz.
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                  className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  En az 18 yaşındayım ve{" "}
                  <a
                    href="/gizlilik-politikasi"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Gizlilik Politikası
                  </a>
                  ,{" "}
                  <a
                    href="/kullanim-kosullari"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Kullanım Koşulları
                  </a>{" "}
                  ve CvHazirla Şartlar ve Koşullarını okudum ve kabul ediyorum.
                  *
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {loading ? "Gönderiliyor..." : "Başvuruyu Gönder"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
