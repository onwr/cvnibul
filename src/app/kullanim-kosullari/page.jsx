import Navigation from "@/components/cv/Navigation";
import Footer from "@/components/cv/Footer";

export const metadata = {
  title: "Kullanım Koşulları - CvHazirla",
  description: "CvHazirla kullanım koşulları ve şartları",
};

export default function KullanimKosullariPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation isScrolled={false} />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Kullanım Koşulları
            </h1>
            <p className="text-lg text-gray-600">
              Lütfen kullanım koşullarımızı dikkatlice okuyun
            </p>
          </div>

          {/* İçerik */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                1. BU KULLANIM ŞARTLARININ UYGULANABİLİRLİĞİ VE KABULÜ
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Hizmetler üzerinden veya Hizmetlere herhangi bir içerik veya
                materyali indirerek, görüntüleyerek, kullanarak, erişerek,
                tarayarak veya göndererek, bu Kullanım Koşullarını sizinle
                Working Media Inc. arasında bağlayıcı bir yasal sözleşme olarak,
                herhangi bir sınırlama veya sınırlama olmaksızın kabul etmiş
                olursunuz. "Siz" veya "Siz" terimi, Hizmetlere herhangi bir
                içerik veya materyali indiren, görüntüleyen, kullanan, erişen,
                tarayan veya gönderen herhangi bir kişi veya kuruluşu ifade
                eder.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Bu Kullanım Koşulları'nı kabul etmiyorsanız, Hizmetleri
                kullanamazsınız. Working Media Inc., bu Kullanım Koşulları'nı
                herhangi bir zamanda önceden bildirimde bulunmaksızın değiştirme
                hakkını saklı tutar. Hizmetlere her eriştiğinizde, o tarihte
                geçerli olan Kullanım Koşulları'na tabi olacağınızı ve bu
                Kullanım Koşulları'nda yapılan değişiklikleri takiben veya şimdi
                Hizmetleri kullanmaya devam etmeniz, söz konusu değişiklikleri
                okuduğunuzu, kabul ettiğinizi ve bunlara bağlı kalmayı kabul
                ettiğinizi teyit eder.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                2. KULLANICI LİSANSI
              </h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Kapsam
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Working Media Inc., bu Kullanım Koşulları uyarınca ve yalnızca
                kişisel, ticari olmayan kullanımınız için Hizmetleri
                görüntülemenize, indirmenize, yetkili sosyal medya uygulaması
                aracılığıyla entegre etmenize, e-posta göndermenize veya
                Hizmetlerin ayrı sayfalarını yazdırmanıza izin verir; ancak bu
                sayfalarda bulunan herhangi bir ticari markayı, telif hakkını
                veya diğer bildirimleri kaldırmamanız gerekir.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Başka hiçbir kullanıma izin verilmez. Örneğin, bilgileri,
                içeriği veya diğer materyalleri herhangi bir veritabanına veya
                önbelleğe dahil edemezsiniz. Hizmet aracılığıyla elde edilen
                hiçbir bilgiyi, içeriği, materyali, yazılımı, ürünü veya
                hizmeti, yukarıda açıkça belirtilen veya Working Media Inc.
                tarafından verilen durumlar dışında, yeniden yayınlayamaz,
                iletemez, görüntüleyemez, icra edemez, çoğaltamaz, yeniden
                satamaz, lisanslayamaz, bunlardan türev çalışmalar oluşturamaz,
                devredemez veya satamazsınız.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
                Kullanıcı Davranışı
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Hizmetleri kullanımınızın tüm geçerli yerel, eyalet, ulusal ve
                uluslararası yasa ve yönetmeliklere tabi olduğunu kabul
                edersiniz. Ayrıca şunları da kabul edersiniz:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>
                  ABD yasalarına ve çevrimiçi davranış ve kabul edilebilir
                  Materyal ile ilgili yerel yasalara veya kurallara uymak
                </li>
                <li>
                  13 yaşından küçükseniz ebeveyninizin, velinizin veya eğitim
                  denetleyicinizin izni olmadan Hizmetleri kullanmamak
                </li>
                <li>Hizmetleri yasa dışı amaçlar için kullanmamak</li>
                <li>
                  Hizmetler üzerinde veya Hizmet içeriğiyle ilgili herhangi bir
                  ihlal eyleminde bulunmamak
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                3. HİZMET İÇERİĞİ
              </h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Kullanıcı Materyalinin Niteliği
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bazı Hizmetler, sizin ve başkalarının, görseller, bilgiler,
                makaleler, çizimler, şarkı sözleri, fotoğraflar, ses dosyaları,
                şiirler, videolar veya metinler dahil ancak bunlarla sınırlı
                olmamak üzere materyal göndermenize olanak tanır.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Aşağıdaki özelliklere sahip hiçbir Materyal Göndermemeyi kabul
                edersiniz: kaba, küfürlü, aşağılayıcı, nefret dolu veya cinsel
                içerikli dil, hakaret veya hakaretler, iftira niteliğinde,
                tehdit edici, herhangi bir üçüncü tarafın gizlilik haklarını
                ihlal eden içerikler.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                4. GARANTİLERİN REDDİ
              </h2>
              <p className="text-gray-600 leading-relaxed">
                HİZMETLER TARAFINDAN SAĞLANAN BİLGİ, İÇERİK, ÜRÜNLER, HİZMETLER
                VE MALZEMELER, AÇIK VEYA ZIMNİ HERHANGİ BİR GARANTİ OLMADAN
                "OLDUĞU GİBİ" VE "MEVCUT OLDUĞU GİBİ" SAĞLANMAKTADIR. Working
                Media Inc., TİCARİ ELVERİŞLİLİK, BELİRLİ BİR AMACA UYGUNLUK,
                MÜLKİYET, İHLAL ETMEME GARANTİLERİ DAHİL OLMAK ÜZERE TÜM BEYAN
                VE GARANTİLERİ REDDEDER.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                5. SORUMLULUĞUN SINIRLANDIRILMASI
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Working Media Inc. HİÇBİR DURUMDA, HİZMETLERİN KULLANIMI,
                KULLANILAMAMASI VEYA PERFORMANSINDAN KAYNAKLANAN VEYA BUNLARLA
                BAĞLANTILI OLARAK ORTAYA ÇIKAN HERHANGİ BİR DOĞRUDAN, DOLAYLI,
                ÖZEL, CEZAİ, ARIZİ VEYA SONUÇ OLARAK OLUŞAN ZARARLARDAN SORUMLU
                TUTULAMAZ.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                6. HESABIN VEYA HİZMETLERİN İPTALİ VE SONLANDIRILMASI
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Şifrenizi, hesabınızı ve/veya Hizmetlerin kullanımını, Working
                Media Inc.'e yazılı bildirimde bulunarak, herhangi bir zamanda,
                sebepli veya sebepsiz olarak iptal edebilir veya
                sonlandırabilirsiniz.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Working Media Inc., kendi mutlak takdirine bağlı olarak ve
                herhangi bir zamanda, size önceden bildirimde bulunup
                bulunmamasına bakılmaksızın, şifrenizi, hesabınızı veya herhangi
                bir Hizmetin kullanımını herhangi bir nedenle askıya alabilir,
                iptal edebilir veya sonlandırabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                7. KÜÇÜKLER
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Bir Küçük'ün Hizmetleri kullanabilmesi için ebeveyninin,
                vasisinin veya eğitim sorumlusunun onayı gereklidir. Bir
                ebeveyn, vasi veya eğitim sorumlusu, Küçük'ün Hizmetlerle
                bağlantılı tüm faaliyetlerinden sorumlu olacaktır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                8. YARGI YETKİSİ VE UYGULANACAK HUKUK
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Bu Kullanım Koşulları'nın, kanunlar ihtilafı hükümleri dikkate
                alınmaksızın, Amerika Birleşik Devletleri ve New York Eyaleti
                yasalarına tabi olacağını ve bu yasalara göre yorumlanacağını
                kabul edersiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                9. İLETİŞİM
              </h2>
              <p className="text-gray-600 leading-relaxed">
                İptal veya fesih bildirimi sağlamak için Working Media Inc. ile
                iletişime geçin: Working Media Inc., 2 US Executive Center, 560
                Sylvan Ave #1000, Englewood Cliffs, NJ 07632, ABD
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
