import Navigation from "@/components/cv/Navigation";
import Footer from "@/components/cv/Footer";
import Image from "next/image";

export const metadata = {
  title: "Kurucu - CvHazirla",
  description: "CvHazirla kurucusu hakkında bilgi edinin",
};

export default function KurucuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation isScrolled={false} />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
              Kurucu
            </h1>
            <p className="text-lg text-gray-600">
              CvHazirla'nın yaratıcısı hakkında
            </p>
          </div>

          {/* Geliştirici Bilgisi */}
          <div className="bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl shadow-xl p-8 md:p-12 text-white mb-8">
            <div className="text-center">
              <div className="w-40 h-40 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white/30 p-1">
                <Image
                  src="/profil.jpg"
                  alt="Adem Özkul"
                  width={144}
                  height={144}
                  className="rounded-full w-full h-full object-cover"
                  quality={100}
                />
              </div>
              <h2 className="text-4xl font-bold mb-3">Adem Özkul</h2>
              <p className="text-emerald-100 text-xl mb-6">Yazılımcı</p>
              <p className="text-white/90 max-w-2xl mx-auto leading-relaxed text-lg">
                Modern web teknolojileri kullanarak kullanıcı dostu ve etkili
                çözümler geliştiriyorum. CvHazirla platformunu, iş arayanların
                hayatını kolaylaştırmak ve profesyonel CV'ler oluşturmalarına
                yardımcı olmak amacıyla geliştirdim.
              </p>
            </div>
          </div>

          {/* Deneyim ve Teknolojiler */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  💻 Teknolojiler ve Beceriler
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "React",
                    "Next.js",
                    "Node.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "Prisma",
                    "MySQL",
                    "Git",
                    "VS Code",
                    "AWS",
                    "Docker",
                    "Linux",
                  ].map((tech, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                    >
                      <span className="text-emerald-700 font-semibold">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  🎯 Vizyon
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Teknoloji ile hayatları kolaylaştırmak, kullanıcı deneyimini
                  ön planda tutmak ve herkesin profesyonel bir online varlığa
                  sahip olmasını sağlamak. CvHazirla, bu vizyonun bir
                  yansımasıdır - kullanıcıların en iyi versiyonlarını yansıtan
                  profesyonel CV'ler oluşturmalarına yardımcı oluyorum.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  📧 İletişim
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600 text-2xl">📧</span>
                    <span className="text-gray-600">
                      Sorularınız için:
                      <a
                        href="mailto:adem.ozkul@cvhazirla.com"
                        className="text-emerald-600 hover:text-emerald-700 ml-2 font-medium"
                      >
                        adem.ozkul@cvhazirla.com
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600 text-2xl">📱</span>
                    <span className="text-gray-600">
                      Telefon:
                      <a
                        href="tel:+905540105044"
                        className="text-emerald-600 hover:text-emerald-700 ml-2 font-medium"
                      >
                        +90 554 010 50 44
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Geri Dön */}
          <div className="text-center">
            <div className="flex gap-4 justify-center">
              <a
                href="/hakkinda"
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
              >
                ← Hakkında'ya Dön
              </a>
              <a
                href="/"
                className="inline-block px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
              >
                Ana Sayfaya Dön
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
