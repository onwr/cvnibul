"use client";

import {
  User,
  Briefcase,
  GraduationCap,
  Zap,
  Award,
  Globe,
  Target,
  Users,
  FileText,
  Heart,
  Camera,
  Trophy,
  Calendar,
} from "lucide-react";

export default function PortfolioSections({
  data,
  design,
  layout,
  onAppointmentRequest,
}) {
  const {
    personalInfo,
    education,
    skills,
    certificates,
    hobbies,
    references,
    services,
    awards,
    publications,
    socialResponsibility,
    photoGallery,
    experience,
  } = data;
  const { selectedColor, customColor, showIcons, cornerRadius } = design;
  const { sectionOrder, visibleSections } = layout;

  const getColorRgb = (colorValue) => {
    if (colorValue === "custom") {
      const hex = customColor.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }
    const colors = {
      blue: "37, 99, 235",
      green: "22, 163, 74",
      purple: "147, 51, 234",
      red: "220, 38, 38",
      orange: "234, 88, 12",
      gray: "55, 65, 81",
    };
    return colors[colorValue] || "37, 99, 235";
  };

  const sections = {
    hakkimda: personalInfo.hayatHikayesi && (
      <section>
        <h2
          className="text-3xl font-bold mb-6 pb-3 border-b-4 flex items-center gap-3"
          style={{
            borderColor: `rgb(${getColorRgb(selectedColor)})`,
            color: `rgb(${getColorRgb(selectedColor)})`,
          }}
        >
          {showIcons && <User className="w-7 h-7" />}
          Hakkımda
        </h2>
        <p
          className="text-gray-700 text-justify bg-gray-50 p-6 border-l-4 rounded-xl"
          style={{
            borderColor: `rgb(${getColorRgb(selectedColor)})`,
          }}
        >
          {personalInfo.hayatHikayesi}
        </p>
      </section>
    ),

    deneyim: experience && experience.length > 0 && (
      <section>
        <h2
          className="text-3xl font-bold mb-6 pb-3 border-b-4 flex items-center gap-3"
          style={{
            borderColor: `rgb(${getColorRgb(selectedColor)})`,
            color: `rgb(${getColorRgb(selectedColor)})`,
          }}
        >
          {showIcons && <Briefcase className="w-7 h-7" />}
          İş Deneyimi
        </h2>
        <div className="space-y-8">
          {experience.map((is, index) => (
            <div
              key={index}
              className="relative pl-10 pb-8 border-l-4 last:border-l-0 last:pb-0"
              style={{
                borderColor: `rgba(${getColorRgb(selectedColor)}, 0.3)`,
              }}
            >
              <div
                className="absolute left-0 top-0 w-6 h-6 rounded-full -translate-x-[13px] border-4 border-white shadow-lg"
                style={{
                  backgroundColor: `rgb(${getColorRgb(selectedColor)})`,
                }}
              ></div>
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {is.pozisyon}
                </h3>
                <p
                  className="text-lg font-semibold mb-2"
                  style={{ color: `rgb(${getColorRgb(selectedColor)})` }}
                >
                  {is.sirketAdi}
                </p>
                <p className="text-gray-500 mb-4">
                  {is.baslangicTarihi} -{" "}
                  {is.halaCalisiyor ? "Devam Ediyor" : is.bitisTarihi}
                </p>
                {is.aciklama && (
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {is.aciklama}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    ),

    egitim: education && education.length > 0 && (
      <section>
        <h2
          className="text-3xl font-bold mb-6 pb-3 border-b-4 flex items-center gap-3"
          style={{
            borderColor: `rgb(${getColorRgb(selectedColor)})`,
            color: `rgb(${getColorRgb(selectedColor)})`,
          }}
        >
          {showIcons && <GraduationCap className="w-7 h-7" />}
          Eğitim
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {education.map((egitim, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border-l-4"
              style={{
                borderColor: `rgb(${getColorRgb(selectedColor)})`,
              }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {egitim.okulAdi}
              </h3>
              <p className="text-gray-600 font-medium mb-3">{egitim.bolum}</p>
              <div className="flex items-center justify-between">
                <span
                  className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                  style={{
                    backgroundColor: `rgb(${getColorRgb(selectedColor)})`,
                  }}
                >
                  {egitim.derece}
                </span>
                <span className="text-gray-500 text-sm">
                  {egitim.mezunTarihi}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    ),

    yetenekler: skills && skills.length > 0 && (
      <section>
        <h2
          className="text-3xl font-bold mb-6 pb-3 border-b-4 flex items-center gap-3"
          style={{
            borderColor: `rgb(${getColorRgb(selectedColor)})`,
            color: `rgb(${getColorRgb(selectedColor)})`,
          }}
        >
          {showIcons && <Zap className="w-7 h-7" />}
          Yetenekler & Uzmanlık
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {skills.map((yetenek, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-gray-900">{yetenek.ad}</span>
                <span className="text-sm text-gray-500 capitalize">
                  {yetenek.seviye}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full transition-all"
                  style={{
                    width:
                      yetenek.seviye === "uzman"
                        ? "100%"
                        : yetenek.seviye === "ileri"
                        ? "80%"
                        : yetenek.seviye === "orta"
                        ? "60%"
                        : "40%",
                    backgroundColor: `rgb(${getColorRgb(selectedColor)})`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    ),

    sertifikalar: certificates && certificates.length > 0 && (
      <section>
        <h2
          className="text-3xl font-bold mb-6 pb-3 border-b-4 flex items-center gap-3"
          style={{
            borderColor: `rgb(${getColorRgb(selectedColor)})`,
            color: `rgb(${getColorRgb(selectedColor)})`,
          }}
        >
          {showIcons && <Award className="w-7 h-7" />}
          Sertifikalar & Belgeler
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {certificates.map((sertifika, index) => (
            <div
              key={index}
              className="p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2"
              style={{
                borderColor: `rgba(${getColorRgb(selectedColor)}, 0.2)`,
              }}
            >
              <div
                className="w-full h-1 rounded-t-xl mb-3"
                style={{
                  backgroundColor: `rgb(${getColorRgb(selectedColor)})`,
                }}
              ></div>
              <Award className="w-10 h-10 text-yellow-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">{sertifika.ad}</h3>
              <p className="text-sm text-gray-600 font-medium mb-2">
                {sertifika.verenKurum}
              </p>
              <p className="text-xs text-gray-500">{sertifika.tarih}</p>
            </div>
          ))}
        </div>
      </section>
    ),

    hobiler: hobbies && hobbies.length > 0 && (
      <section>
        <h2
          className="text-3xl font-bold mb-6 pb-3 border-b-4 flex items-center gap-3"
          style={{
            borderColor: `rgb(${getColorRgb(selectedColor)})`,
            color: `rgb(${getColorRgb(selectedColor)})`,
          }}
        >
          {showIcons && <Target className="w-7 h-7" />}
          Hobiler & İlgi Alanları
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {hobbies.map((hobi, index) => (
            <div
              key={index}
              className="p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-t-4"
              style={{
                borderColor: `rgb(${getColorRgb(selectedColor)})`,
              }}
            >
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                {hobi.ad}
              </h3>
              {hobi.aciklama && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {hobi.aciklama}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    ),

    referanslar: references && references.length > 0 && (
      <section>
        <h2
          className="text-3xl font-bold mb-6 pb-3 border-b-4 flex items-center gap-3"
          style={{
            borderColor: `rgb(${getColorRgb(selectedColor)})`,
            color: `rgb(${getColorRgb(selectedColor)})`,
          }}
        >
          {showIcons && <Users className="w-7 h-7" />}
          Referanslar
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {references.map((referans, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow-lg border-l-4"
              style={{
                borderColor: `rgb(${getColorRgb(selectedColor)})`,
              }}
            >
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {referans.ad} {referans.soyad}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{referans.pozisyon}</p>
              <p className="text-gray-700 font-medium mb-3">
                {referans.sirket}
              </p>
              {referans.email && (
                <p className="text-sm text-gray-600">📧 {referans.email}</p>
              )}
              {referans.telefon && (
                <p className="text-sm text-gray-600">📞 {referans.telefon}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    ),

    hizmetler: services && services.length > 0 && (
      <section>
        <h2
          className="text-3xl font-bold mb-6 pb-3 border-b-4 flex items-center gap-3"
          style={{
            borderColor: `rgb(${getColorRgb(selectedColor)})`,
            color: `rgb(${getColorRgb(selectedColor)})`,
          }}
        >
          {showIcons && <Briefcase className="w-7 h-7" />}
          Sunduğum Hizmetler
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((hizmet, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2"
              style={{
                borderColor: `rgba(${getColorRgb(selectedColor)}, 0.3)`,
              }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {hizmet.ad}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {hizmet.aciklama}
              </p>
              <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fiyat</p>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: `rgb(${getColorRgb(selectedColor)})` }}
                  >
                    {hizmet.fiyat}
                  </p>
                </div>
                {hizmet.sure && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Süre</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {hizmet.sure}
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={() => onAppointmentRequest(hizmet)}
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Randevu Al
              </button>
            </div>
          ))}
        </div>
      </section>
    ),

    oduller: awards && awards.length > 0 && (
      <section>
        <h2
          className="text-3xl font-bold mb-6 pb-3 border-b-4 flex items-center gap-3"
          style={{
            borderColor: `rgb(${getColorRgb(selectedColor)})`,
            color: `rgb(${getColorRgb(selectedColor)})`,
          }}
        >
          {showIcons && <Award className="w-7 h-7" />}
          Ödüller & Başarılar
        </h2>
        <div className="space-y-4">
          {awards.map((odul, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                style={{
                  backgroundColor: `rgb(${getColorRgb(selectedColor)})`,
                }}
              >
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {odul.ad}
                </h3>
                <p className="text-gray-600 font-medium mb-2">
                  {odul.verenKurum}
                </p>
                <p className="text-sm text-gray-500">{odul.tarih}</p>
                {odul.aciklama && (
                  <p className="text-gray-700 text-sm mt-3">{odul.aciklama}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    ),

    yayinlar: publications && publications.length > 0 && (
      <section>
        <h2
          className="text-3xl font-bold mb-6 pb-3 border-b-4 flex items-center gap-3"
          style={{
            borderColor: `rgb(${getColorRgb(selectedColor)})`,
            color: `rgb(${getColorRgb(selectedColor)})`,
          }}
        >
          {showIcons && <FileText className="w-7 h-7" />}
          Yayınlar & Makaleler
        </h2>
        <div className="space-y-4">
          {publications.map((yayin, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border-l-4"
              style={{
                borderColor: `rgb(${getColorRgb(selectedColor)})`,
              }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {yayin.baslik}
              </h3>
              <p className="text-gray-600 mb-2">
                {yayin.yayinYeri} • {yayin.tarih}
              </p>
              {yayin.aciklama && (
                <p className="text-gray-700 leading-relaxed mb-3">
                  {yayin.aciklama}
                </p>
              )}
              {yayin.link && (
                <a
                  href={yayin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold hover:underline"
                  style={{ color: `rgb(${getColorRgb(selectedColor)})` }}
                >
                  Yayını Görüntüle →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    ),

    sosyalSorumluluk: socialResponsibility &&
      socialResponsibility.length > 0 && (
        <section>
          <h2
            className="text-3xl font-bold mb-6 pb-3 border-b-4 flex items-center gap-3"
            style={{
              borderColor: `rgb(${getColorRgb(selectedColor)})`,
              color: `rgb(${getColorRgb(selectedColor)})`,
            }}
          >
            {showIcons && <Heart className="w-7 h-7" />}
            Sosyal Sorumluluk Projeleri
          </h2>
          <div className="space-y-4">
            {socialResponsibility.map((proje, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-md border-2"
                style={{
                  borderColor: `rgba(${getColorRgb(selectedColor)}, 0.2)`,
                }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {proje.ad}
                </h3>
                <p className="text-gray-600 font-medium mb-3">
                  {proje.organizasyon}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {proje.tarih} • {proje.sure}
                </p>
                {proje.aciklama && (
                  <p className="text-gray-700 leading-relaxed">
                    {proje.aciklama}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ),

    fotografArsivi: photoGallery && photoGallery.length > 0 && (
      <section>
        <h2
          className="text-3xl font-bold mb-6 pb-3 border-b-4 flex items-center gap-3"
          style={{
            borderColor: `rgb(${getColorRgb(selectedColor)})`,
            color: `rgb(${getColorRgb(selectedColor)})`,
          }}
        >
          {showIcons && <Camera className="w-7 h-7" />}
          Fotoğraf Arşivi
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photoGallery.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
            >
              <img
                src={photo.url}
                alt={`Arşiv ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>
    ),
  };

  return (
    <div className="space-y-10">
      {sectionOrder.map((sectionId) => {
        if (!visibleSections[sectionId]) return null;
        return <div key={sectionId}>{sections[sectionId]}</div>;
      })}
    </div>
  );
}
