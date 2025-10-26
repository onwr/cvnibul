// Örnek CV Verisi - Adem Özkul
export const sampleCVData = {
  ad: "Adem",
  soyad: "Özkul",
  meslek: "Full Stack Developer",
  telefon: "+90 554 010 50 44",
  email: "hello@cvhazirla.com",
  website: "www.cvhazirla.com",
  linkedin: "linkedin.com/in/ademozkul",
  instagram: "instagram.com/ademozkul",
  adres: "İstanbul, Türkiye",
  hakkimda:
    "Profesyonel web uygulamaları geliştiren deneyimli Full Stack Developer. Modern teknolojiler ve kullanıcı odaklı çözümler üretmeye odaklı.",

  egitimler: [
    {
      id: "1",
      okul: "İstanbul Teknik Üniversitesi",
      bolum: "Bilgisayar Mühendisliği",
      baslangic: "2015",
      bitis: "2019",
      aciklama: "Yazılım geliştirme ve veri yapıları üzerine uzmanlaştım.",
    },
  ],

  deneyimler: [
    {
      id: "1",
      sirket: "Tech Solutions Inc.",
      pozisyon: "Senior Full Stack Developer",
      baslangic: "2021",
      bitis: "Devam Ediyor",
      aciklama:
        "React, Node.js ve MongoDB kullanarak kurumsal web uygulamaları geliştirdim. Ekip liderliği ve mentorluk görevlerinde bulundum.",
    },
    {
      id: "2",
      sirket: "Digital Agency",
      pozisyon: "Frontend Developer",
      baslangic: "2019",
      bitis: "2021",
      aciklama:
        "Modern frontend teknolojileri ile kullanıcı arayüzleri oluşturdum. Responsive ve performanslı web siteleri geliştirdim.",
    },
  ],

  beceriler: [
    { id: "1", baslik: "JavaScript", seviye: 90 },
    { id: "2", baslik: "React & Next.js", seviye: 85 },
    { id: "3", baslik: "Node.js", seviye: 80 },
    { id: "4", baslik: "TypeScript", seviye: 75 },
    { id: "5", baslik: "MongoDB", seviye: 70 },
  ],

  diller: [
    { id: "1", dil: "turkce", seviye: 100 },
    { id: "2", dil: "ingilizce", seviye: 80 },
  ],

  sertifikalar: [
    {
      id: "1",
      baslik: "AWS Certified Developer",
      kurum: "Amazon Web Services",
      tarih: "2023",
    },
    {
      id: "2",
      baslik: "React Advanced Patterns",
      kurum: "Frontend Masters",
      tarih: "2022",
    },
  ],

  referanslar: [
    {
      id: "1",
      ad: "Mehmet Yılmaz",
      unvan: "CTO",
      sirket: "Tech Solutions",
      telefon: "+90 555 123 45 67",
      email: "mehmet@example.com",
    },
  ],

  hobiler: [
    { id: "1", baslik: "Açık Kaynak Projelere Katkı" },
    { id: "2", baslik: "Teknoloji Blogları Yazmak" },
    { id: "3", baslik: "Fotoğrafçılık" },
  ],

  ozelBolumler: [],
  portfolioItems: [],
  hizmetler: [],
};

export const sampleCustomization = {
  profilePhoto: null,
  selectedTemplate: "sidebar",
  primaryColor: "#3b82f6", // blue-600
  secondaryColor: "#6366f1", // indigo-600
  fontFamily: "inter",
  fontSize: {
    body: 14,
    subheading: 18,
    heading: 28,
  },
  lineHeight: 1.6,
  sectionSpacing: 24,
  cardBorderRadius: 12,
  shadowIntensity: "medium",
  backgroundImage: null,
  backgroundOpacity: 0.6,
  backgroundBlur: 0,
  layout: "left-sidebar",
  sidebarWidth: 35,
  showBorders: true,
  borderColor: "#e5e7eb",
  borderWidth: 1,
  gradientAngle: 135,
  useGradient: true,
  sectionVisibility: {
    egitim: true,
    deneyim: true,
    beceriler: true,
    diller: true,
    sertifikalar: true,
    referanslar: false,
    hobiler: true,
    portfolio: false,
    hizmetler: false,
    location: false,
  },
};
