import Navigation from "@/components/cv/Navigation";
import Footer from "@/components/cv/Footer";

export const metadata = {
  title: "Gizlilik Politikası - CvHazirla",
  description: "CvHazirla gizlilik politikası",
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation isScrolled={false} />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Gizlilik Politikası
            </h1>
            <p className="text-lg text-gray-600">
              Kişisel verilerinizin korunması bizim önceliğimizdir
            </p>
          </div>

          {/* İçerik */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                1. KİŞİSEL BİLGİLERİN TOPLANMASI
              </h2>
              <p className="text-gray-600 leading-relaxed">
                CvHazirla platformunu kullanırken, isim, e-posta adresi, telefon
                numarası, CV içeriği ve diğer kişisel bilgiler gibi veriler
                toplanmaktadır. Bu bilgiler, hizmetlerimizi sağlamak ve
                platformu geliştirmek amacıyla kullanılmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                2. BİLGİLERİN KULLANILMASI
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Topladığımız kişisel bilgiler aşağıdaki amaçlarla
                kullanılmaktadır:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Hesap oluşturma ve yönetimi</li>
                <li>CV'lerinizi oluşturma ve düzenleme hizmetleri</li>
                <li>Kullanıcı desteği sağlama</li>
                <li>Platformu geliştirme ve iyileştirme</li>
                <li>Yasal gereklilikleri yerine getirme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                3. BİLGİ GÜVENLİĞİ
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Kişisel bilgilerinizin güvenliği bizim için çok önemlidir.
                Verilerinizi korumak için uygun teknik ve idari önlemler
                alınmaktadır. Ancak, internet üzerinden veri iletiminin tam
                güvenliği garantilenemez.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                4. ÇEREZLER
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Web sitemizde deneyiminizi iyileştirmek için çerezler
                kullanılmaktadır. Bu çerezler, oturum yönetimi, tercihlerinizi
                saklama ve site performansını analiz etme amacıyla
                kullanılabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                5. ÜÇÜNCÜ TARAFLARLA PAYLAŞIM
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Kişisel bilgileriniz, yasaların gerektirdiği durumlar dışında,
                sizin izniniz olmadan üçüncü taraflarla paylaşılmaz.
                Hizmetlerimizin sağlanması için iş ortaklarımızla veri paylaşımı
                yapılabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                6. KULLANICI HAKLARI
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Hesabınızdaki kişisel bilgilerinizle ilgili şu haklara
                sahipsiniz:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Bilgilerinize erişim hakkı</li>
                <li>Bilgilerinizi düzeltme hakkı</li>
                <li>Bilgilerinizi silme hakkı</li>
                <li>Veri portabilitesi hakkı</li>
                <li>İtiraz etme hakkı</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                7. İLETİŞİM
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Gizlilik politikanızla ilgili sorularınız, istekleriniz veya
                şikayetleriniz için bizimle iletişime geçebilirsiniz:
              </p>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <p className="text-gray-700">
                  <strong>E-posta:</strong> hello@cvhazirla.com
                </p>
                <p className="text-gray-700">
                  <strong>Telefon:</strong> +90 554 010 50 44
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                8. POLİTİKA DEĞİŞİKLİKLERİ
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Bu gizlilik politikası zaman zaman güncellenebilir. Önemli
                değişiklikler için size bildirim yapılacaktır. Değişiklikleri bu
                sayfada takip edebilirsiniz.
              </p>
            </section>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Son güncelleme: 2025
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
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
