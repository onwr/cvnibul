import Navigation from "@/components/cv/Navigation";
import Footer from "@/components/cv/Footer";

export const metadata = {
  title: "Hakkında - CvHazirla",
  description: "CvHazirla hakkında bilgi edinin",
};

export default function HakkindaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation isScrolled={false} />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Hakkımızda
            </h1>
            <p className="text-lg text-gray-600">
              Profesyonel CV'lerinizi kolayca oluşturun
            </p>
          </div>

          {/* Platform Tanıtımı */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  CvHazirla Nedir?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  CvHazirla, iş arayanların profesyonel ve etkileyici CV'ler
                  oluşturmasını sağlayan modern bir platformdur. Kullanıcı dostu
                  arayüzü ve çeşitli şablon seçenekleri ile dakikalar içinde göz
                  alıcı CV'ler hazırlayabilirsiniz.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  🎯 Özelliklerimiz
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-600">
                      Modern ve profesyonel CV şablonları
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-600">
                      Kolay düzenleme ve özelleştirme araçları
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-600">
                      Çevrimiçi CV paylaşımı ve yayınlama
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-600">
                      Harita entegrasyonu ile konum gösterimi
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-600">
                      Randevu sistemi ve yorum özellikleri
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-600">
                      Özel bölümler ve portfolyo galerisi
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  💡 Vizyonumuz
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  İş arayanların kendilerini en iyi şekilde ifade edebilmeleri
                  için kullanımı kolay, güçlü ve modern bir platform sunmak.
                  Herkesin profesyonel bir CV'ye sahip olmasını sağlamak ve iş
                  başvuru süreçlerini kolaylaştırmak amacıyla çalışıyoruz.
                </p>
              </div>
            </div>
          </div>

          {/* Geliştirici Bilgisi */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <div className="text-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white/30">
                <span className="text-4xl font-bold">AÖ</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Adem Özkul</h2>
              <p className="text-blue-100 text-lg mb-4">Yazılımcı</p>
              <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
                Modern web teknolojileri kullanarak kullanıcı dostu ve etkili
                çözümler geliştiriyorum. CvHazirla platformunu, iş arayanların
                hayatını kolaylaştırmak ve profesyonel CV'ler oluşturmalarına
                yardımcı olmak amacıyla geliştirdim.
              </p>
            </div>
          </div>

          {/* İletişim CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Sorularınız veya önerileriniz için bizimle iletişime geçin
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
            >
              Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
