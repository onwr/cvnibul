import Navigation from "@/components/cv/Navigation";
import Footer from "@/components/cv/Footer";
import { FiPhone, FiMail, FiSend } from "react-icons/fi";

export const metadata = {
  title: "İletişim - CvHazirla",
  description: "CvHazirla ile iletişime geçin",
};

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation isScrolled={false} />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              İletişim
            </h1>
            <p className="text-lg text-gray-600">
              Sorularınız, önerileriniz veya destek için bizimle iletişime geçin
            </p>
          </div>

          {/* İletişim Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Telefon */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiPhone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Telefon</h3>
              <a
                href="tel:+905540105044"
                className="text-lg text-blue-600 hover:text-blue-700 font-medium"
              >
                +90 554 010 50 44
              </a>
              <p className="text-sm text-gray-600 mt-2">
                Telefon veya WhatsApp
              </p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiMail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">E-posta</h3>
              <a
                href="mailto:hello@cvhazirla.com"
                className="text-lg text-emerald-600 hover:text-emerald-700 font-medium break-all"
              >
                hello@cvhazirla.com
              </a>
              <p className="text-sm text-gray-600 mt-2">
                Email ile bize ulaşın
              </p>
            </div>
          </div>

          {/* Mesaj Bölümü */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSend className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Mesaj Gönderin
              </h2>
              <p className="text-gray-600">
                Yandaki iletişim bilgilerimizden bizimle iletişime
                geçebilirsiniz. Size en kısa sürede geri dönüş yapacağız.
              </p>
            </div>

            {/* İletişim Detayları */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Telefon</p>
                  <p className="font-semibold text-gray-800">
                    +90 554 010 50 44
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">E-posta</p>
                  <p className="font-semibold text-gray-800">
                    hello@cvhazirla.com
                  </p>
                </div>
              </div>
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
