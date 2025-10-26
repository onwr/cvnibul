"use client";

import { useState, useEffect, Suspense, useRef, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiPhone,
  FiMail,
  FiGlobe,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
const TemplateRenderer = dynamic(
  () => import("@/components/cv/TemplateRenderer"),
  { ssr: false }
);
import CustomizationPanel from "@/components/cv/CustomizationPanel";

// Lazy load modals and editor
const PublishModal = dynamic(
  () => import("@/components/cv/templates/PublishModal"),
  { ssr: false }
);
const MapModal = dynamic(() => import("@/components/cv/MapModal"), {
  ssr: false,
});

function TemplatesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isEditing, setIsEditing] = useState(true); // Her zaman düzenleme modu aktif
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSectionKey, setEditingSectionKey] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapData, setMapData] = useState(null);
  const [joditContent, setJoditContent] = useState("");
  const editorRef = useRef(null);
  const [customization, setCustomization] = useState({
    // Typography
    fontFamily: "inter",
    fontSize: { heading: 28, subheading: 18, body: 14 },
    lineHeight: 1.6,
    letterSpacing: "normal",

    // Colors
    primaryColor: "#10b981", // emerald-500
    secondaryColor: "#3b82f6",
    accentColor: "#8b5cf6",

    // Background
    backgroundType: "solid", // solid, gradient, image
    backgroundColor: "#ffffff",
    gradient: null,
    backgroundImage: null,
    backgroundBlur: 15,
    backgroundOpacity: 0.6,

    // Spacing
    padding: 24,
    sectionGap: 32,
    borderRadius: 12,
    columnGap: 24,

    // Effects
    shadow: "medium",

    // Other
    textColor: "#1f2937",
    profilePhoto: null,
    layout: "two-column",
    cardStyle: "elevated",
    sectionVisibility: {},
    photoGallery: [], // { id, url, uploadDate, approved, uploading }

    // Modern Tema Renkleri (Her section için)
    modernColors: {
      contact: "#3b82f6", // blue-500
      education: "#10b981", // green-500
      skills: "#8b5cf6", // purple-500
      about: "#f97316", // orange-500
      experience: "#ef4444", // red-500
      services: "#6366f1", // indigo-500
      publications: "#ec4899", // pink-500
      certificates: "#eab308", // yellow-500
      awards: "#14b8a6", // teal-500
      hobbies: "#f43f5e", // rose-500
      social: "#06b6d4", // cyan-500
      references: "#10b981", // emerald-500
      languages: "#2563eb", // blue-600
      specialSkills: "#4f46e5", // indigo-600
      projects: "#16a34a", // green-600
      map: "#4b5563", // gray-600
    },

    // Renk Paleti (Tüm tema için)
    colorPalette: {
      primary: "#10b981", // Ana renk
      secondary: "#3b82f6", // İkincil renk
      accent: "#8b5cf6", // Vurgu rengi
      cardBg: "rgba(255, 255, 255, 0.1)", // Kart arkaplanı
      cardBorder: "rgba(255, 255, 255, 0.2)", // Kart border
    },

    // Özel Bölümler (Kullanıcı tarafından oluşturulan)
    customSections: [], // { id, title, content, visible }
  });
  const [sectionOrder, setSectionOrder] = useState([
    "contact",
    "education",
    "skills",
    "services",
    "about",
    "experience",
    "publications",
    "certificates",
    "awards",
    "hobbies",
    "social",
    "references",
    "photoArchive",
    "languages",
    "specialSkills",
    "projects",
    "map",
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Admin edit state'leri
  const [isAdminEdit, setIsAdminEdit] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingCVId, setEditingCVId] = useState(null);

  // Özel bölüm modal state'leri
  const [showCustomSectionModal, setShowCustomSectionModal] = useState(false);
  const [editingCustomSection, setEditingCustomSection] = useState(null);
  const [customSectionAction, setCustomSectionAction] = useState("add"); // 'add', 'edit', 'delete'
  const [customSectionForm, setCustomSectionForm] = useState({
    title: "",
    content: "",
  });

  // Bölüm sıralaması değiştirme fonksiyonları
  const moveSectionUp = (index) => {
    if (index === 0) return;
    const newOrder = [...sectionOrder];
    [newOrder[index - 1], newOrder[index]] = [
      newOrder[index],
      newOrder[index - 1],
    ];
    setSectionOrder(newOrder);
  };

  const moveSectionDown = (index) => {
    if (index === sectionOrder.length - 1) return;
    const newOrder = [...sectionOrder];
    [newOrder[index], newOrder[index + 1]] = [
      newOrder[index + 1],
      newOrder[index],
    ];
    setSectionOrder(newOrder);
  };

  // Auto-save function (debounced)
  const saveToAPI = async (data, customizationData) => {
    if (isAdminEdit) {
      // Admin edit modu - özel endpoint
      try {
        await fetch("/api/admin/cvs", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cvId: editingCVId,
            updates: {
              formData: data,
              customization: customizationData,
              slug: customSlug,
              templateId: selectedTheme?.id, // themeId yerine templateId
            },
          }),
        });
        console.log("Admin tarafından CV güncellendi");
      } catch (error) {
        console.error("Admin güncelleme hatası:", error);
      }
      return;
    }

    if (!session || !selectedTheme) return;

    try {
      await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: customSlug || generateSlug(data.ad, data.soyad),
          formData: data,
          customization: customizationData,
          templateId: "sidebar", // Artık hep profesyonel şablon
          themeId: selectedTheme.id, // Tema bilgisi
        }),
      });
      console.log("CV otomatik kaydedildi");
    } catch (error) {
      console.error("Auto-save hatası:", error);
    }
  };

  // Jodit Editor Config - Memoized to prevent re-renders
  const joditConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Hayat hikayenizi yazın...",
      height: 400,
      minHeight: 400,
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "align",
        "|",
        "undo",
        "redo",
      ],
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_clear_html",
      enter: "P",
      enterBlock: "div",
      useSplitMode: false,
      removeEmptyBlocks: true,
      cleanHTML: {
        removeEmptyElements: true,
        replaceNBSP: true,
        fillEmptyParagraph: false,
      },
      style: {
        background: "#ffffff",
        color: "#1f2937",
        fontSize: "14px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      },
      editorClassName: "jodit-wysiwyg",
      defaultMode: 1,
    }),
    []
  );

  // URL'den form verilerini al veya API'den yükle
  useEffect(() => {
    const loadCVData = async () => {
      const dataParam = searchParams.get("data");
      const adminEditParam = searchParams.get("adminEdit");

      // Admin edit modu kontrolü
      if (adminEditParam) {
        try {
          const decodedData = decodeURIComponent(adminEditParam);
          const adminData = JSON.parse(decodedData);

          setIsAdminEdit(true);
          setEditingUserId(adminData.userId);
          setEditingCVId(adminData.cvId);
          setFormData(adminData.formData);
          setCustomization(adminData.customization || customization);
          setCustomSlug(adminData.slug);

          const themeId = adminData.themeId || "tech";
          setSelectedTheme(
            PROFESSION_THEMES.find((t) => t.id === themeId) ||
              PROFESSION_THEMES[0]
          );

          console.log("Admin edit modu aktif:", adminData);
          return;
        } catch (error) {
          console.error("Admin edit verisi parse edilemedi:", error);
        }
      }

      // ÖNCE URL'deki data parametresini kontrol et (öncelik burada)
      if (dataParam) {
        try {
          const decodedData = decodeURIComponent(dataParam);
          const parsedData = JSON.parse(decodedData);
          setFormData(parsedData);
          console.log("URL'den yüklendi:", parsedData);
          return; // İşlemi bitir, API kontrolüne gerek yok
        } catch (error) {
          console.error("Form verileri parse edilemedi:", error);
          // Parse hatası olursa devam et, API'yi dene
        }
      }

      // URL'de data yoksa ve kullanıcı giriş yapmışsa API'den yükle
      if (session) {
        try {
          const response = await fetch("/api/cv");
          const data = await response.json();

          if (data.cv) {
            setFormData(data.cv.formData);
            setCustomization(data.cv.customization);
            // Tema ID'sini yükle, yoksa varsayılan "tech" teması kullan
            const themeId = data.cv.themeId || data.cv.templateId || "tech";
            setSelectedTheme(
              PROFESSION_THEMES.find((t) => t.id === themeId) ||
                PROFESSION_THEMES[0]
            );
            setCustomSlug(data.cv.slug || "");
            console.log("API'den yüklendi:", data.cv);
            return;
          } else {
            // CV yoksa, kullanıcıyı ana sayfaya yönlendir (form doldurmak için)
            console.log("CV bulunamadı, ana sayfaya yönlendiriliyor...");
            router.push("/");
            return;
          }
        } catch (error) {
          console.error("API'den CV yükleme hatası:", error);
          // API hatası durumunda ana sayfaya yönlendir
          router.push("/");
          return;
        }
      }

      // Giriş yapılmamış ve URL'de data yok
      if (!session && !dataParam) {
        router.push("/");
      }
    };

    if (status !== "loading") {
      loadCVData();
    }
  }, [searchParams, router, session, status]);

  // Meslek Bazlı Temalar
  const PROFESSION_THEMES = [
    {
      id: "tech",
      name: "Teknoloji & Yazılım",
      description: "Yazılım geliştirici, veri bilimci, IT uzmanı",
      icon: "💻",
      backgroundImage:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80",
      colors: {
        primary: "#3b82f6",
        secondary: "#2563eb",
        accent: "#60a5fa",
        cardBg: "rgba(59, 130, 246, 0.1)",
        cardBorder: "rgba(59, 130, 246, 0.3)",
      },
    },
    {
      id: "construction",
      name: "Mimarlık & İnşaat",
      description: "Mimar, inşaat mühendisi, şehir plancısı",
      icon: "🏗️",
      backgroundImage:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
      colors: {
        primary: "#f97316",
        secondary: "#475569",
        accent: "#94a3b8",
        cardBg: "rgba(249, 115, 22, 0.1)",
        cardBorder: "rgba(249, 115, 22, 0.3)",
      },
    },
    {
      id: "health",
      name: "Sağlık & Tıp",
      description: "Doktor, hemşire, eczacı, sağlık profesyoneli",
      icon: "🏥",
      backgroundImage:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80",
      colors: {
        primary: "#14b8a6",
        secondary: "#0f766e",
        accent: "#5eead4",
        cardBg: "rgba(20, 184, 166, 0.1)",
        cardBorder: "rgba(20, 184, 166, 0.3)",
      },
    },
    {
      id: "education",
      name: "Eğitim & Akademik",
      description: "Öğretmen, akademisyen, eğitmen, öğretim görevlisi",
      icon: "📚",
      backgroundImage:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80",
      colors: {
        primary: "#f59e0b",
        secondary: "#92400e",
        accent: "#fbbf24",
        cardBg: "rgba(245, 158, 11, 0.1)",
        cardBorder: "rgba(245, 158, 11, 0.3)",
      },
    },
    {
      id: "creative",
      name: "Yaratıcı & Tasarım",
      description: "Grafik tasarımcı, sanatçı, fotoğrafçı, içerik üreticisi",
      icon: "🎨",
      backgroundImage:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1920&q=80",
      colors: {
        primary: "#a855f7",
        secondary: "#7c3aed",
        accent: "#d946ef",
        cardBg: "rgba(168, 85, 247, 0.1)",
        cardBorder: "rgba(168, 85, 247, 0.3)",
      },
    },
    {
      id: "business",
      name: "İş & Yönetim",
      description: "İşletme, yönetici, insan kaynakları, proje yöneticisi",
      icon: "💼",
      backgroundImage:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
      colors: {
        primary: "#475569",
        secondary: "#1e3a8a",
        accent: "#94a3b8",
        cardBg: "rgba(71, 85, 105, 0.1)",
        cardBorder: "rgba(71, 85, 105, 0.3)",
      },
    },
    {
      id: "law",
      name: "Hukuk & Finans",
      description: "Avukat, mali müşavir, bankacı, finans uzmanı",
      icon: "⚖️",
      backgroundImage:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80",
      colors: {
        primary: "#b91c1c",
        secondary: "#7f1d1d",
        accent: "#d97706",
        cardBg: "rgba(185, 28, 28, 0.1)",
        cardBorder: "rgba(185, 28, 28, 0.3)",
      },
    },
    {
      id: "engineering",
      name: "Mühendislik & Üretim",
      description: "Makine, endüstri, elektrik mühendisi, üretim uzmanı",
      icon: "🔧",
      backgroundImage:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80",
      colors: {
        primary: "#ea580c",
        secondary: "#1f2937",
        accent: "#f97316",
        cardBg: "rgba(234, 88, 12, 0.1)",
        cardBorder: "rgba(234, 88, 12, 0.3)",
      },
    },
    {
      id: "marketing",
      name: "Pazarlama & Reklam",
      description:
        "Pazarlamacı, reklamcı, sosyal medya uzmanı, marka yöneticisi",
      icon: "📢",
      backgroundImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
      colors: {
        primary: "#ec4899",
        secondary: "#be185d",
        accent: "#f472b6",
        cardBg: "rgba(236, 72, 153, 0.1)",
        cardBorder: "rgba(236, 72, 153, 0.3)",
      },
    },
    {
      id: "design",
      name: "Grafik Tasarım",
      description: "Grafik tasarımcı, UI/UX tasarımcı, illüstratör",
      icon: "🎨",
      backgroundImage:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=80",
      colors: {
        primary: "#f43f5e",
        secondary: "#be123c",
        accent: "#fb7185",
        cardBg: "rgba(244, 63, 94, 0.1)",
        cardBorder: "rgba(244, 63, 94, 0.3)",
      },
    },
    {
      id: "sales",
      name: "Satış & Ticaret",
      description: "Satış temsilcisi, ticaret, mağaza müdürü",
      icon: "💰",
      backgroundImage:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80",
      colors: {
        primary: "#eab308",
        secondary: "#a16207",
        accent: "#facc15",
        cardBg: "rgba(234, 179, 8, 0.1)",
        cardBorder: "rgba(234, 179, 8, 0.3)",
      },
    },
    {
      id: "consultant",
      name: "Danışmanlık",
      description: "Strateji uzmanı, iş danışmanı, profesyonel danışman",
      icon: "🎯",
      backgroundImage:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80",
      colors: {
        primary: "#06b6d4",
        secondary: "#0891b2",
        accent: "#22d3ee",
        cardBg: "rgba(6, 182, 212, 0.1)",
        cardBorder: "rgba(6, 182, 212, 0.3)",
      },
    },
    {
      id: "media",
      name: "Medya & İletişim",
      description: "Gazeteci, muhabir, sunucu, içerik editörü",
      icon: "📺",
      backgroundImage:
        "https://images.unsplash.com/photo-1589270222752-cff8833b47bf?w=1920&q=80",
      colors: {
        primary: "#6366f1",
        secondary: "#4338ca",
        accent: "#818cf8",
        cardBg: "rgba(99, 102, 241, 0.1)",
        cardBorder: "rgba(99, 102, 241, 0.3)",
      },
    },
    {
      id: "food",
      name: "Gastronomi & Mutfak",
      description: "Şef, aşçı, restoran yöneticisi, barista",
      icon: "🍽️",
      backgroundImage:
        "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&q=80",
      colors: {
        primary: "#f97316",
        secondary: "#c2410c",
        accent: "#fb923c",
        cardBg: "rgba(249, 115, 22, 0.1)",
        cardBorder: "rgba(249, 115, 22, 0.3)",
      },
    },
    {
      id: "sports",
      name: "Spor & Fitness",
      description: "Antrenör, sporcu, fitness eğitmeni, wellness uzmanı",
      icon: "⚽",
      backgroundImage:
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1920&q=80",
      colors: {
        primary: "#22c55e",
        secondary: "#15803d",
        accent: "#4ade80",
        cardBg: "rgba(34, 197, 94, 0.1)",
        cardBorder: "rgba(34, 197, 94, 0.3)",
      },
    },
    {
      id: "beauty",
      name: "Güzellik & Estetik",
      description: "Kuaför, makyöz, estetisyen, spa uzmanı",
      icon: "💅",
      backgroundImage:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1920&q=80",
      colors: {
        primary: "#ec4899",
        secondary: "#be185d",
        accent: "#f472b6",
        cardBg: "rgba(236, 72, 153, 0.1)",
        cardBorder: "rgba(236, 72, 153, 0.3)",
      },
    },
    {
      id: "travel",
      name: "Turizm & Seyahat",
      description: "Turist rehberi, otel yöneticisi, seyahat acentesi",
      icon: "✈️",
      backgroundImage:
        "https://images.unsplash.com/photo-1469856573086-9ca3aa26f4c0?w=1920&q=80",
      colors: {
        primary: "#0ea5e9",
        secondary: "#0284c7",
        accent: "#38bdf8",
        cardBg: "rgba(14, 165, 233, 0.1)",
        cardBorder: "rgba(14, 165, 233, 0.3)",
      },
    },
    {
      id: "green",
      name: "Yeşil & Doğa",
      description: "Renk teması: Doğa, sürdürülebilirlik, yeşil",
      icon: "🌿",
      backgroundImage:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80",
      colors: {
        primary: "#10b981",
        secondary: "#059669",
        accent: "#34d399",
        cardBg: "rgba(16, 185, 129, 0.1)",
        cardBorder: "rgba(16, 185, 129, 0.3)",
      },
    },
    {
      id: "ocean",
      name: "Okyanus & Mavi",
      description: "Renk teması: Mavi tonlar, profesyonel, güvenilir",
      icon: "🌊",
      backgroundImage:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80",
      colors: {
        primary: "#0ea5e9",
        secondary: "#0284c7",
        accent: "#38bdf8",
        cardBg: "rgba(14, 165, 233, 0.1)",
        cardBorder: "rgba(14, 165, 233, 0.3)",
      },
    },
    {
      id: "sunset",
      name: "Gün Batımı & Turuncu",
      description: "Renk teması: Sıcak turuncu-kırmızı tonlar",
      icon: "🌅",
      backgroundImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
      colors: {
        primary: "#f97316",
        secondary: "#ea580c",
        accent: "#fb923c",
        cardBg: "rgba(249, 115, 22, 0.1)",
        cardBorder: "rgba(249, 115, 22, 0.3)",
      },
    },
    {
      id: "purple",
      name: "Mor & Lila",
      description: "Renk teması: Yaratıcı mor-lila tonları",
      icon: "💜",
      backgroundImage:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&q=80",
      colors: {
        primary: "#a855f7",
        secondary: "#7c3aed",
        accent: "#c084fc",
        cardBg: "rgba(168, 85, 247, 0.1)",
        cardBorder: "rgba(168, 85, 247, 0.3)",
      },
    },
    {
      id: "gold",
      name: "Altın & Lüks",
      description: "Renk teması: Premium, lüks, altın tonları",
      icon: "👑",
      backgroundImage:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80",
      colors: {
        primary: "#eab308",
        secondary: "#ca8a04",
        accent: "#fde047",
        cardBg: "rgba(234, 179, 8, 0.1)",
        cardBorder: "rgba(234, 179, 8, 0.3)",
      },
    },
    {
      id: "dark",
      name: "Siyah & Koyu",
      description: "Renk teması: Koyu, minimal, profesyonel",
      icon: "🖤",
      backgroundImage:
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1920&q=80",
      colors: {
        primary: "#1f2937",
        secondary: "#111827",
        accent: "#4b5563",
        cardBg: "rgba(31, 41, 55, 0.1)",
        cardBorder: "rgba(31, 41, 55, 0.3)",
      },
    },
    {
      id: "neon",
      name: "Neon & Parlak",
      description: "Renk teması: Neon renkler, modern, dinamik",
      icon: "⚡",
      backgroundImage:
        "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&q=80",
      colors: {
        primary: "#8b5cf6",
        secondary: "#7c3aed",
        accent: "#a78bfa",
        cardBg: "rgba(139, 92, 246, 0.1)",
        cardBorder: "rgba(139, 92, 246, 0.3)",
      },
    },
  ];

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setCustomization((prev) => ({
      ...prev,
      backgroundImage: theme.backgroundImage,
      colorPalette: theme.colors,
      // Sidebar sol tarafı için renk
      primaryColor: theme.colors.primary,
      secondaryColor: theme.colors.secondary,
      accentColor: theme.colors.accent,
    }));
  };

  // State for publish modal
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishUrl, setPublishUrl] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [customSlug, setCustomSlug] = useState("");
  const [slugError, setSlugError] = useState("");

  // URL slug oluşturma fonksiyonu
  const generateSlug = (ad, soyad) => {
    const turkishMap = {
      ç: "c",
      ğ: "g",
      ı: "i",
      İ: "i",
      ö: "o",
      ş: "s",
      ü: "u",
      Ç: "c",
      Ğ: "g",
      Ö: "o",
      Ş: "s",
      Ü: "u",
    };

    const fullName = `${ad} ${soyad}`;
    const slug = fullName
      .split("")
      .map((char) => turkishMap[char] || char)
      .join("")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .substring(0, 50); // Maksimum 50 karakter

    return slug;
  };

  // Modal açıldığında slug'ı başlat
  useEffect(() => {
    if (showPublishModal && !customSlug && formData) {
      setCustomSlug(generateSlug(formData.ad, formData.soyad));
    }
  }, [showPublishModal, formData]);

  // Slug validasyonu
  const validateSlug = (slug) => {
    if (!slug || slug.trim().length === 0) {
      return "URL boş olamaz";
    }
    if (slug.length > 50) {
      return "URL 50 karakterden uzun olamaz";
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return "URL sadece küçük harf, rakam ve tire içerebilir";
    }
    if (slug.startsWith("-") || slug.endsWith("-")) {
      return "URL tire ile başlayamaz veya bitemez";
    }
    return "";
  };

  // Slug değişikliği
  const handleSlugChange = (value) => {
    const turkishMap = {
      ç: "c",
      ğ: "g",
      ı: "i",
      İ: "i",
      ö: "o",
      ş: "s",
      ü: "u",
      Ç: "c",
      Ğ: "g",
      Ö: "o",
      Ş: "s",
      Ü: "u",
    };

    // Türkçe karakterleri dönüştür ve temizle
    let cleanedSlug = value
      .split("")
      .map((char) => turkishMap[char] || char)
      .join("")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .substring(0, 50);

    setCustomSlug(cleanedSlug);
    setSlugError(validateSlug(cleanedSlug));
  };

  const handleFinishEditing = async () => {
    // Önce düzenleme modundan çık
    setIsEditing(false);

    if (isAdminEdit) {
      // Admin edit modu - direkt kaydet ve yayınla
      try {
        console.log("Admin edit modu - CV kaydediliyor:", {
          cvId: editingCVId,
          userId: editingUserId,
          formData,
          customization,
        });

        // Önce CV'yi kaydet
        await saveToAPI(formData, customization);

        console.log("CV kaydedildi, şimdi yayınlanıyor...");

        // Sonra yayınla (eğer yayınlanmamışsa)
        const publishResponse = await fetch("/api/admin/cvs", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cvId: editingCVId,
            updates: {
              isPublished: true,
              isActive: true,
            },
          }),
        });

        console.log("Publish response:", publishResponse.status);

        if (publishResponse.ok) {
          alert("CV başarıyla kaydedildi ve yayınlandı!");
          // Sayfayı kapat
          window.close();
        } else {
          const errorData = await publishResponse.json();
          console.error("Publish error:", errorData);
          alert("CV kaydedildi ancak yayınlanırken bir hata oluştu");
        }
      } catch (error) {
        console.error("Admin güncelleme hatası:", error);
        alert("Bir hata oluştu: " + error.message);
      }
      return;
    }

    // Session kontrolü
    if (!session) {
      alert("CV yayınlamak için giriş yapmalısınız");
      router.push("/auth/signin");
      return;
    }

    // Slug'ı otomatik oluştur
    const autoSlug = generateSlug(formData.ad, formData.soyad);
    setCustomSlug(autoSlug);

    // Validasyon kontrolü
    const error = validateSlug(autoSlug);
    if (error) {
      setSlugError(error);
      return;
    }

    setIsPublishing(true);

    try {
      // CV'yi kaydet
      const saveResponse = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: autoSlug,
          formData,
          customization,
          templateId: "sidebar",
          themeId: selectedTheme.id,
        }),
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json();
        throw new Error(errorData.error || "CV kaydedilemedi");
      }

      // Yayınla
      const publishResponse = await fetch("/api/cv/publish", {
        method: "POST",
      });

      if (!publishResponse.ok) {
        throw new Error("Yayınlama başarısız");
      }

      // URL'yi oluştur
      const url = `${window.location.origin}/${autoSlug}`;
      setPublishUrl(url);
      setShowPublishModal(true);
    } catch (error) {
      alert(error.message || "Bir hata oluştu");
      setIsPublishing(false);
      return;
    }

    setIsPublishing(false);
  };

  const closePublishModal = () => {
    setShowPublishModal(false);
    setPublishUrl("");
    setCustomSlug("");
    setSlugError("");
  };

  const handlePublish = async () => {
    if (!customSlug.trim()) {
      setSlugError("URL adresi boş olamaz");
      return;
    }

    const error = validateSlug(customSlug);
    if (error) {
      setSlugError(error);
      return;
    }

    setIsPublishing(true);

    try {
      // CV'yi kaydet
      const saveResponse = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: customSlug,
          formData,
          customization,
          templateId: "sidebar",
          themeId: selectedTheme.id,
        }),
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json();
        throw new Error(errorData.error || "CV kaydedilemedi");
      }

      // Yayınla
      const publishResponse = await fetch("/api/cv/publish", {
        method: "POST",
      });

      if (!publishResponse.ok) {
        throw new Error("Yayınlama başarısız");
      }

      // URL'yi oluştur
      const url = `${window.location.origin}/${customSlug}`;
      setPublishUrl(url);
      setSlugError("");
    } catch (error) {
      setSlugError(error.message || "Bir hata oluştu");
    } finally {
      setIsPublishing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publishUrl);
    alert("URL kopyalandı!");
  };

  // Sıralama fonksiyonları (Yukarı/Aşağı)
  const handleMoveUp = (sectionKey, index) => {
    if (index === 0) return;

    const newFormData = { ...formData };

    // Section mapping
    const sectionMap = {
      education: "egitimler",
      skills: "yetenekler",
      experience: "calismaGecmisi",
      publications: "yayinlar",
      services: "hizmetler",
      certificates: "sertifikalar",
      awards: "oduller",
      hobbies: "hobiler",
      social: "sosyalSorumluluk",
      references: "referanslar",
      languages: "dilBilgisi",
      specialSkills: "ozelBeceriler",
      projects: "projeler",
      network: "network",
      books: "okuduguKitaplar",
      teams: "tuttuguTakimlar",
    };

    const arrayKey = sectionMap[sectionKey];

    if (
      arrayKey &&
      newFormData[arrayKey] &&
      Array.isArray(newFormData[arrayKey])
    ) {
      const items = [...newFormData[arrayKey]];
      [items[index - 1], items[index]] = [items[index], items[index - 1]];
      newFormData[arrayKey] = items;

      setFormData(newFormData);
      localStorage.setItem("cvData", JSON.stringify(newFormData));
    }
  };

  const handleMoveDown = (sectionKey, index) => {
    const newFormData = { ...formData };

    // Section mapping
    const sectionMap = {
      education: "egitimler",
      skills: "yetenekler",
      experience: "calismaGecmisi",
      publications: "yayinlar",
      services: "hizmetler",
      certificates: "sertifikalar",
      awards: "oduller",
      hobbies: "hobiler",
      social: "sosyalSorumluluk",
      references: "referanslar",
      languages: "dilBilgisi",
      specialSkills: "ozelBeceriler",
      projects: "projeler",
      network: "network",
      books: "okuduguKitaplar",
      teams: "tuttuguTakimlar",
    };

    const arrayKey = sectionMap[sectionKey];

    if (
      arrayKey &&
      newFormData[arrayKey] &&
      Array.isArray(newFormData[arrayKey])
    ) {
      const items = newFormData[arrayKey];
      if (index === items.length - 1) return;

      const newItems = [...newFormData[arrayKey]];
      [newItems[index], newItems[index + 1]] = [
        newItems[index + 1],
        newItems[index],
      ];
      newFormData[arrayKey] = newItems;

      setFormData(newFormData);
      localStorage.setItem("cvData", JSON.stringify(newFormData));
    }
  };

  // Düzenleme/Ekleme fonksiyonu
  const handleEditItem = (sectionKey, item, index) => {
    // Map için özel modal aç
    if (sectionKey === "map") {
      setMapData({
        lat: formData.haritaKonumu?.lat || 39.9334,
        lng: formData.haritaKonumu?.lng || 32.8597,
        adres: formData.adres || "",
      });
      setShowMapModal(true);
      return;
    }

    // About için Jodit content'i ayarla
    if (sectionKey === "about") {
      setJoditContent(formData?.hayatHikayesi || "");
    }

    setEditingSectionKey(sectionKey);
    setEditingItem(item || null);
    setEditingIndex(index !== undefined ? index : null);
    setIsAddingNew(index === null);
    setShowEditModal(true);
  };

  // Fotoğraf Yükleme Fonksiyonları (Admin Onayı ile)
  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    const currentPhotos = customization.photoGallery?.length || 0;

    if (currentPhotos + files.length > 20) {
      alert("Maksimum 20 fotoğraf ekleyebilirsiniz.");
      return;
    }

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} 5MB'dan büyük olamaz.`);
        continue;
      }

      // Temporary item ekle (string ID kullan - float hassasiyet problemi önlenir)
      const tempId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setCustomization((prev) => ({
        ...prev,
        photoGallery: [
          ...(prev.photoGallery || []),
          {
            id: tempId,
            url: "",
            uploadDate: new Date().toISOString(),
            uploading: true,
            approved: false, // Admin onayı bekliyor
            adminApproved: false,
          },
        ],
      }));

      // ImgBB upload
      const formDataImg = new FormData();
      formDataImg.append("image", file);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=d31794837252249df832c8f59cf80110`,
          { method: "POST", body: formDataImg }
        );
        const data = await response.json();

        if (data.success) {
          setCustomization((prev) => ({
            ...prev,
            photoGallery: prev.photoGallery.map((p) =>
              p.id === tempId
                ? {
                    ...p,
                    url: data.data.url,
                    uploading: false,
                    approved: false, // Admin onayı bekliyor
                    adminApproved: false,
                  }
                : p
            ),
          }));

          // Fotoğraf onay tablosuna ekle
          try {
            await fetch("/api/admin/photo-approval", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                photoId: tempId, // Artık zaten string
                photoUrl: data.data.url,
                userId: session?.user?.id || session?.user?.email,
                userName: `${formData?.ad} ${formData?.soyad}`,
                action: "create", // Yeni fotoğraf oluştur
              }),
            });
          } catch (error) {
            console.error("Fotoğraf onay tablosuna ekleme hatası:", error);
          }

          // CV'yi veritabanına kaydet (fotoğraf dahil)
          await saveCVToDatabase();
        }
      } catch (error) {
        console.error("Fotoğraf yükleme hatası:", error);
        // Remove failed upload
        setCustomization((prev) => ({
          ...prev,
          photoGallery: prev.photoGallery.filter((p) => p.id !== tempId),
        }));
        alert("Fotoğraf yüklenirken bir hata oluştu.");
      }
    }
  };

  const handlePhotoDelete = async (photoId) => {
    if (!confirm("Bu fotoğrafı silmek istediğinizden emin misiniz?")) return;
    setCustomization((prev) => ({
      ...prev,
      photoGallery: prev.photoGallery.filter((p) => p.id !== photoId),
    }));

    // CV'yi veritabanına kaydet (fotoğraf silindi)
    await saveCVToDatabase();
  };

  // CV kaydetme fonksiyonu
  const saveCVToDatabase = async () => {
    try {
      const response = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          customization,
          templateType: "sidebar", // Professional template
        }),
      });

      if (!response.ok) {
        throw new Error("CV kaydetme hatası");
      }

      console.log("CV başarıyla kaydedildi");
    } catch (error) {
      console.error("CV kaydetme hatası:", error);
    }
  };

  // Silme fonksiyonu
  const handleDeleteItem = (sectionKey, index) => {
    if (!confirm("Bu öğeyi silmek istediğinizden emin misiniz?")) return;

    const newFormData = { ...formData };

    // Section mapping
    const sectionMap = {
      education: "egitimler",
      skills: "yetenekler",
      experience: "calismaGecmisi",
      publications: "yayinlar",
      services: "hizmetler",
      certificates: "sertifikalar",
      awards: "oduller",
      hobbies: "hobiler",
      social: "sosyalSorumluluk",
      references: "referanslar",
      languages: "dilBilgisi",
      specialSkills: "ozelBeceriler",
      projects: "projeler",
      cities: "yasadigiYerler",
      network: "network",
      books: "okuduguKitaplar",
      teams: "tuttuguTakimlar",
    };

    const arrayKey = sectionMap[sectionKey];

    if (
      arrayKey &&
      newFormData[arrayKey] &&
      Array.isArray(newFormData[arrayKey])
    ) {
      newFormData[arrayKey].splice(index, 1);
      setFormData(newFormData);
      localStorage.setItem("cvData", JSON.stringify(newFormData));
    }
  };

  // Yeni kaydetme fonksiyonu
  const handleSaveEdit = (newData) => {
    if (!editingSectionKey) return;

    console.log("handleSaveEdit çağrıldı, section:", editingSectionKey);
    console.log("Gelen data:", newData);

    const newFormData = { ...formData };

    // About için özel işlem - Jodit Content kullan
    if (editingSectionKey === "about") {
      console.log("About section kaydediliyor, joditContent:", joditContent);
      newFormData.hayatHikayesi = joditContent;
      setFormData(newFormData);
      localStorage.setItem("cvData", JSON.stringify(newFormData));
      setShowEditModal(false);
      setJoditContent("");
      setEditingSectionKey(null);
      setEditingItem(null);
      setEditingIndex(null);
      setIsAddingNew(false);
      return;
    }

    // Contact için özel işlem
    if (editingSectionKey === "contact") {
      newFormData.iletisim = {
        ...newFormData.iletisim,
        ...newData,
      };
      setFormData(newFormData);
      localStorage.setItem("cvData", JSON.stringify(newFormData));
      setShowEditModal(false);
      setEditingSectionKey(null);
      setEditingItem(null);
      setEditingIndex(null);
      setIsAddingNew(false);
      return;
    }

    // Relationship için özel işlem
    if (editingSectionKey === "relationship") {
      newFormData.iliskiDurumu = {
        durum: newData.durum,
      };
      setFormData(newFormData);
      localStorage.setItem("cvData", JSON.stringify(newFormData));
      setShowEditModal(false);
      setEditingSectionKey(null);
      setEditingItem(null);
      setEditingIndex(null);
      setIsAddingNew(false);
      return;
    }

    // Section mapping
    const sectionMap = {
      education: "egitimler",
      skills: "yetenekler",
      experience: "calismaGecmisi",
      publications: "yayinlar",
      services: "hizmetler",
      certificates: "sertifikalar",
      awards: "oduller",
      hobbies: "hobiler",
      social: "sosyalSorumluluk",
      references: "referanslar",
      languages: "dilBilgisi",
      specialSkills: "ozelBeceriler",
      projects: "projeler",
      cities: "yasadigiYerler",
      network: "network",
      books: "okuduguKitaplar",
      teams: "tuttuguTakimlar",
    };

    const arrayKey = sectionMap[editingSectionKey];

    if (arrayKey) {
      if (editingIndex !== null) {
        // Güncelleme
        newFormData[arrayKey][editingIndex] = {
          ...newFormData[arrayKey][editingIndex],
          ...newData,
        };
      } else {
        // Yeni ekleme
        if (!newFormData[arrayKey]) {
          newFormData[arrayKey] = [];
        }
        newFormData[arrayKey].push({ id: Date.now(), ...newData });
      }
    }

    setFormData(newFormData);
    localStorage.setItem("cvData", JSON.stringify(newFormData));
    setShowEditModal(false);
    setJoditContent("");
    setEditingSectionKey(null);
    setEditingItem(null);
    setEditingIndex(null);
    setIsAddingNew(false);
  };

  const handleSaveItem = () => {
    if (!editingSectionKey) return;

    // Form verilerini topla
    const inputs = document.querySelectorAll(
      `#edit-form input, #edit-form select, #edit-form textarea`
    );

    const newData = {};
    inputs.forEach((input) => {
      if (input.name) {
        newData[input.name] = input.value;
      }
    });

    // About için Jodit content'i ekle
    if (editingSectionKey === "about") {
      console.log("Kaydedilen içerik:", joditContent);
      newData.hayatHikayesi = joditContent;
    }

    // FormData'yı kopyala
    const updatedFormData = { ...formData };

    // Section'dan array key'e mapping
    const sectionMap = {
      education: "egitimler",
      skills: "yetenekler",
      experience: "calismaGecmisi",
      publications: "yayinlar",
      services: "hizmetler",
      certificates: "sertifikalar",
      awards: "oduller",
      hobbies: "hobiler",
      social: "sosyalSorumluluk",
      references: "referanslar",
      photoArchive: "fotoArsivi",
      languages: "dilBilgisi",
      specialSkills: "ozelBeceriler",
      projects: "projeler",
      cities: "yasadigiYerler",
      network: "network",
      books: "okuduguKitaplar",
      teams: "tuttuguTakimlar",
    };

    if (isAddingNew) {
      // Yeni öğe ekle
      const arrayKey = sectionMap[editingSectionKey];

      if (arrayKey) {
        // Array section için
        updatedFormData[arrayKey] = [
          ...(updatedFormData[arrayKey] || []),
          { id: Date.now(), ...newData },
        ];
      } else if (editingSectionKey === "contact") {
        // İletişim bilgileri için
        updatedFormData.iletisim = {
          ...updatedFormData.iletisim,
          ...newData,
        };
      } else if (editingSectionKey === "about") {
        // Hayat hikayesi için
        updatedFormData.hayatHikayesi = joditContent;
      } else if (editingSectionKey === "map") {
        // Harita için
        updatedFormData.haritaKonumu = {
          lat: parseFloat(newData.lat),
          lng: parseFloat(newData.lng),
        };
      }
    } else {
      // Mevcut öğeyi güncelle
      const arrayKey = sectionMap[editingSectionKey];

      if (arrayKey && editingItem) {
        updatedFormData[arrayKey] = updatedFormData[arrayKey].map((item) =>
          item.id === editingItem.id ? { ...item, ...newData } : item
        );
      } else if (editingSectionKey === "contact") {
        updatedFormData.iletisim = {
          ...updatedFormData.iletisim,
          ...newData,
        };
      } else if (editingSectionKey === "about") {
        updatedFormData.hayatHikayesi = joditContent;
      } else if (editingSectionKey === "map") {
        updatedFormData.haritaKonumu = {
          lat: parseFloat(newData.lat),
          lng: parseFloat(newData.lng),
        };
      }
    }

    // State'i güncelle
    setFormData(updatedFormData);

    // localStorage'a kaydet
    try {
      localStorage.setItem("cvData", JSON.stringify(updatedFormData));
    } catch (error) {
      console.error("localStorage kaydetme hatası:", error);
    }

    // Modal'ı kapat
    setShowEditModal(false);
    setEditingSectionKey(null);
    setEditingItem(null);
    setEditingIndex(null);
    setIsAddingNew(false);
    setJoditContent("");
  };

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  };

  const handleBackToThemeSelection = () => {
    setSelectedTheme(null);
  };

  // Özel bölüm fonksiyonları
  const openCustomSectionModal = (section = null, action = "add") => {
    setCustomSectionAction(action);

    if (action === "delete") {
      if (!confirm("Bu özel bölümü silmek istediğinizden emin misiniz?"))
        return;

      const customSections = customization.customSections || [];
      const updatedSections = customSections.filter((s) => s.id !== section.id);
      setCustomization((prev) => ({
        ...prev,
        customSections: updatedSections,
      }));
      return;
    }

    if (section) {
      setEditingCustomSection(section);
      setCustomSectionForm({
        title: section.title,
        content: section.content,
      });
    } else {
      setEditingCustomSection(null);
      setCustomSectionForm({ title: "", content: "" });
    }
    setShowCustomSectionModal(true);
  };

  const closeCustomSectionModal = () => {
    setShowCustomSectionModal(false);
    setEditingCustomSection(null);
    setCustomSectionForm({ title: "", content: "" });
    setCustomSectionAction("add");
  };

  const saveCustomSection = () => {
    if (!customSectionForm.title.trim()) {
      alert("Lütfen bölüm başlığı girin");
      return;
    }

    const customSections = customization.customSections || [];

    if (editingCustomSection) {
      // Güncelleme
      const updatedSections = customSections.map((section) =>
        section.id === editingCustomSection.id
          ? { ...section, ...customSectionForm }
          : section
      );
      setCustomization((prev) => ({
        ...prev,
        customSections: updatedSections,
      }));
    } else {
      // Yeni ekleme
      const newSection = {
        id: Date.now().toString(),
        title: customSectionForm.title,
        content: customSectionForm.content,
        visible: true,
      };
      setCustomization((prev) => ({
        ...prev,
        customSections: [...customSections, newSection],
      }));
    }

    closeCustomSectionModal();
  };

  // Custom Section Visibility Toggle
  const handleToggleCustomSectionVisibility = (sectionId) => {
    setCustomization((prev) => ({
      ...prev,
      customSections: prev.customSections.map((section) =>
        section.id === sectionId
          ? { ...section, visible: !section.visible }
          : section
      ),
    }));
  };

  // Section Visibility Toggle
  const handleToggleSectionVisibility = (sectionKey) => {
    // Custom section kontrolü
    if (sectionKey.startsWith("custom_")) {
      const customSectionId = sectionKey.replace("custom_", "");
      handleToggleCustomSectionVisibility(customSectionId);
      return;
    }

    // Normal section
    setCustomization((prev) => {
      const currentVisibility = prev.sectionVisibility?.[sectionKey] ?? true;

      return {
        ...prev,
        sectionVisibility: {
          ...prev.sectionVisibility,
          [sectionKey]: !currentVisibility,
        },
      };
    });
  };

  // Map kaydetme fonksiyonu
  const handleMapSave = (locationData) => {
    const updatedFormData = {
      ...formData,
      haritaKonumu: {
        lat: locationData.lat,
        lng: locationData.lng,
      },
      adres: locationData.adres,
    };

    setFormData(updatedFormData);
    localStorage.setItem("cvData", JSON.stringify(updatedFormData));
    setShowMapModal(false);
  };

  // Section field mappings
  const getSectionFields = (sectionKey) => {
    const fieldMappings = {
      contact: [
        { name: "telefon", label: "Telefon", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "website", label: "Website", type: "text" },
        { name: "linkedin", label: "LinkedIn", type: "text" },
        { name: "instagram", label: "Instagram", type: "text" },
      ],
      about: [
        { name: "hayatHikayesi", label: "Hayat Hikayesi", type: "jodit" },
      ],
      map: [
        { name: "lat", label: "Enlem", type: "hidden" },
        { name: "lng", label: "Boylam", type: "hidden" },
        { name: "adres", label: "Adres", type: "text" },
      ],
      education: [
        { name: "okulAdi", label: "Okul Adı", type: "text", required: true },
        { name: "bolum", label: "Bölüm", type: "text", required: true },
        {
          name: "derece",
          label: "Derece",
          type: "select",
          options: ["lise", "on_lisans", "lisans", "yuksek_lisans", "doktora"],
        },
        { name: "mezunTarihi", label: "Mezuniyet Tarihi", type: "date" },
      ],
      experience: [
        {
          name: "sirketAdi",
          label: "Şirket Adı",
          type: "text",
          required: true,
        },
        { name: "pozisyon", label: "Pozisyon", type: "text", required: true },
        { name: "baslangicTarihi", label: "Başlangıç", type: "date" },
        { name: "bitisTarihi", label: "Bitiş", type: "date" },
        { name: "halaCalisiyor", label: "Hala Çalışıyor", type: "checkbox" },
        { name: "aciklama", label: "Açıklama", type: "textarea" },
      ],
      skills: [
        { name: "ad", label: "Yetenek Adı", type: "text", required: true },
        {
          name: "seviye",
          label: "Seviye",
          type: "select",
          options: ["baslangic", "orta", "ileri", "uzman"],
        },
      ],
      services: [
        { name: "ad", label: "Hizmet Adı", type: "text", required: true },
        { name: "aciklama", label: "Açıklama", type: "textarea" },
        { name: "fiyat", label: "Fiyat", type: "text" },
        { name: "sure", label: "Süre", type: "text" },
        {
          name: "kategori",
          label: "Kategori",
          type: "select",
          options: ["yazilim", "tasarim", "danismanlik", "diger"],
        },
      ],
      publications: [
        { name: "baslik", label: "Başlık", type: "text", required: true },
        { name: "yayinYeri", label: "Yayın Yeri", type: "text" },
        { name: "tarih", label: "Tarih", type: "date" },
        { name: "link", label: "Link", type: "text" },
        { name: "aciklama", label: "Açıklama", type: "textarea" },
      ],
      certificates: [
        { name: "ad", label: "Sertifika Adı", type: "text", required: true },
        { name: "verenKurum", label: "Veren Kurum", type: "text" },
        { name: "tarih", label: "Tarih", type: "date" },
        { name: "gecerlilikSuresi", label: "Geçerlilik Süresi", type: "text" },
        { name: "sertifikaNo", label: "Sertifika No", type: "text" },
        { name: "link", label: "Link", type: "text" },
      ],
      awards: [
        { name: "ad", label: "Ödül Adı", type: "text", required: true },
        { name: "verenKurum", label: "Veren Kurum", type: "text" },
        { name: "tarih", label: "Tarih", type: "date" },
        {
          name: "kategori",
          label: "Kategori",
          type: "select",
          options: ["mesleki", "akademik", "sosyal", "diger"],
        },
        { name: "aciklama", label: "Açıklama", type: "textarea" },
      ],
      hobbies: [
        { name: "ad", label: "Hobi Adı", type: "text", required: true },
        {
          name: "seviye",
          label: "Seviye",
          type: "select",
          options: ["baslangic", "orta", "ileri", "uzman"],
        },
        { name: "aciklama", label: "Açıklama", type: "textarea" },
      ],
      social: [
        { name: "ad", label: "Proje Adı", type: "text", required: true },
        { name: "organizasyon", label: "Organizasyon", type: "text" },
        { name: "tarih", label: "Tarih", type: "date" },
        { name: "sure", label: "Süre", type: "text" },
        { name: "aciklama", label: "Açıklama", type: "textarea" },
      ],
      references: [
        { name: "ad", label: "Ad", type: "text", required: true },
        { name: "soyad", label: "Soyad", type: "text", required: true },
        { name: "pozisyon", label: "Pozisyon", type: "text" },
        { name: "sirket", label: "Şirket", type: "text" },
        { name: "telefon", label: "Telefon", type: "text" },
        { name: "email", label: "Email", type: "email" },
        {
          name: "iliski",
          label: "İlişki",
          type: "select",
          options: ["is", "akademik", "sosyal", "diger"],
        },
      ],
      languages: [
        {
          name: "dil",
          label: "Dil",
          type: "select",
          options: [
            "turkce",
            "ingilizce",
            "almanca",
            "fransizca",
            "ispanyolca",
            "diger",
          ],
        },
        {
          name: "konusma",
          label: "Konuşma",
          type: "select",
          options: ["ana_dil", "ileri", "orta", "baslangic"],
        },
        {
          name: "yazma",
          label: "Yazma",
          type: "select",
          options: ["ana_dil", "ileri", "orta", "baslangic"],
        },
        {
          name: "okuma",
          label: "Okuma",
          type: "select",
          options: ["ana_dil", "ileri", "orta", "baslangic"],
        },
        {
          name: "dinleme",
          label: "Dinleme",
          type: "select",
          options: ["ana_dil", "ileri", "orta", "baslangic"],
        },
      ],
      specialSkills: [
        { name: "ad", label: "Beceri Adı", type: "text", required: true },
        {
          name: "seviye",
          label: "Seviye",
          type: "select",
          options: ["baslangic", "orta", "ileri", "uzman"],
        },
        { name: "aciklama", label: "Açıklama", type: "textarea" },
      ],
      projects: [
        { name: "ad", label: "Proje Adı", type: "text", required: true },
        { name: "aciklama", label: "Açıklama", type: "textarea" },
        {
          name: "teknolojiler",
          label: "Anahtar Kelimeler / Kullanılan Araçlar (virgülle ayırın)",
          type: "text",
        },
        { name: "link", label: "Link", type: "text" },
      ],
      cities: [{ name: "sehir", label: "Şehir", type: "text", required: true }],
      relationship: [
        {
          name: "durum",
          label: "İlişki Durumu",
          type: "select",
          options: ["bekar", "evli"],
        },
      ],
      network: [
        { name: "ad", label: "İsim", type: "text", required: true },
        {
          name: "iliskiTuru",
          label: "İlişki Türü",
          type: "select",
          options: [
            "ogrenci",
            "hoca",
            "lise_arkadasi",
            "universite_arkadasi",
            "meslektas",
            "diger",
          ],
        },
        {
          name: "digerIliski",
          label: "Diğer İlişki (opsiyonel)",
          type: "text",
        },
        { name: "aciklama", label: "Açıklama/Not", type: "textarea" },
      ],
      books: [
        { name: "kitapAdi", label: "Kitap Adı", type: "text", required: true },
        { name: "yazar", label: "Yazar", type: "text", required: true },
      ],
      teams: [
        { name: "takimAdi", label: "Takım Adı", type: "text", required: true },
      ],
      photoGallery: [], // Modal custom UI kullanacak
    };

    return fieldMappings[sectionKey] || [];
  };

  // Customization değiştiğinde API'ye kaydet (debounced)
  useEffect(() => {
    if (customization && formData && selectedTheme && session) {
      const timer = setTimeout(() => {
        saveToAPI(formData, customization);
      }, 1000); // 1 saniye debounce

      return () => clearTimeout(timer);
    }
  }, [customization]);

  // Loading state
  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Verileriniz yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Tema seçilmemişse tema listesi göster
  if (!selectedTheme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Başlık */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-bold text-white mb-6"
            >
              Mesleğinize Uygun Tema Seçin
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-gray-300"
            >
              <span className="text-emerald-400 font-semibold">
                {formData.ad} {formData.soyad}
              </span>{" "}
              - {formData.ozelMeslek}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 mt-4"
            >
              💡 CV'niz için en uygun tema tasarımını seçin
            </motion.p>
          </div>

          {/* Tema Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {PROFESSION_THEMES.map((theme, index) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleThemeSelect(theme)}
                className="relative group cursor-pointer rounded-3xl overflow-hidden shadow-2xl h-[400px]"
              >
                {/* Arka Plan */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${theme.backgroundImage})`,
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* İçerik */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  {/* Icon */}
                  <div className="text-6xl mb-4 transform transition-transform group-hover:scale-125">
                    {theme.icon}
                  </div>

                  {/* Başlık */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {theme.name}
                  </h3>

                  {/* Açıklama */}
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                    {theme.description}
                  </p>

                  {/* Renk Paleti Önizleme */}
                  <div className="flex gap-2 mb-4">
                    {[
                      theme.colors.primary,
                      theme.colors.secondary,
                      theme.colors.accent,
                    ].map((color, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Hover Button */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-full font-bold shadow-xl">
                      <span>Bu Temayı Seç</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-emerald-500/20 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>

          {/* Alt Bilgi */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 text-lg">
              ✨ Temayı seçtikten sonra renkleri ve diğer özellikleri
              özelleştirebilirsiniz
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Şablon seçildi - CV düzenleme arayüzü
  return (
    <div className="min-h-screen bg-gray-800 relative">
      {/* Arkaplan Önizleme veya Boş Ekran */}
      {selectedTheme ? (
        <div
          className={`absolute inset-0 bg-gray-900 overflow-y-auto transition-all duration-300 ${
            isAdminEdit ? "pt-20" : ""
          } ${isSidebarOpen ? "lg:ml-80" : ""}`}
        >
          {/* CV Önizleme - TemplateRenderer Component */}
          <TemplateRenderer
            formData={formData}
            templateType="sidebar"
            isEditing={isEditing}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            viewCount={viewCount}
            likeCount={likeCount}
            onLikeClick={handleLikeClick}
            customization={customization}
            sectionOrder={sectionOrder}
            moveSectionUp={moveSectionUp}
            moveSectionDown={moveSectionDown}
            onToggleSectionVisibility={handleToggleSectionVisibility}
          />
        </div>
      ) : (
        /* Boş Ekran - Şablon Seçiniz Mesajı */
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                CV Şablonunuzu Seçin
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Aşağıdaki şablonlardan birini seçerek CV'nizi oluşturmaya
                başlayın
              </p>
            </div>

            {/* Özellikler */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-4 h-4 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  Kolay Düzenleme
                </h3>
                <p className="text-xs text-gray-600">Tıklayarak düzenleyin</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  Profesyonel Tasarım
                </h3>
                <p className="text-xs text-gray-600">Modern şablonlar</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  Mobil Uyumlu
                </h3>
                <p className="text-xs text-gray-600">Her cihazda mükemmel</p>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>✨ Aşağıdaki şablonlardan birini seçerek başlayın</p>
            </div>
          </div>
        </div>
      )}

      {/* Left Sidebar - Customization Panel - Her zaman göster */}
      {selectedTheme && (
        <>
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition-colors"
            aria-label="Toggle Sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Backdrop for mobile */}
          {isSidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`fixed left-0 top-0 h-screen w-80 bg-gradient-to-b from-emerald-500 to-emerald-600 shadow-2xl overflow-y-auto z-40 transition-transform duration-300 ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="sticky top-0 bg-emerald-600/90 backdrop-blur-sm px-6 py-4 border-b border-white/10 z-10">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-xl font-bold text-white">
                    CV Özelleştir
                  </h1>
                  <button
                    onClick={handleBackToThemeSelection}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                    title="Tema Seçimine Dön"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-white/80 text-sm">
                  {formData.ad} {formData.soyad}
                </p>
                <p className="text-white/60 text-xs mt-1">
                  {selectedTheme.name}
                </p>
              </div>

              {/* Customization Panel */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <CustomizationPanel
                  customization={customization}
                  setCustomization={setCustomization}
                  onBack={handleBackToThemeSelection}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  selectedTheme={selectedTheme}
                  onFinishEditing={handleFinishEditing}
                  onOpenCustomSectionModal={openCustomSectionModal}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Düzenleme Modu Üst Bar - Sadece admin edit modunda göster */}
      {isAdminEdit && (
        <div className="fixed top-0 left-0 right-0 bg-emerald-400 shadow-lg z-50">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-white">
                  🛡️ Admin Düzenleme Modu -{" "}
                  {selectedTheme?.name || "Profesyonel Şablon"}
                </h1>
                {formData && (
                  <p className="text-sm text-white/90 mt-1">
                    Kullanıcı: {formData.ad} {formData.soyad} (ID:{" "}
                    {editingUserId})
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleFinishEditing}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
                >
                  Kaydet ve Yayınla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Düzenleme Modal - Framer Motion */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3,
              }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 text-white"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">
                    {editingSectionKey === "contact" &&
                      "İletişim Bilgilerini Düzenle"}
                    {editingSectionKey === "education" &&
                      (editingIndex === null
                        ? "Yeni Eğitim Ekle"
                        : "Eğitim Düzenle")}
                    {editingSectionKey === "skills" &&
                      (editingIndex === null
                        ? "Yeni Yetenek Ekle"
                        : "Yetenek Düzenle")}
                    {editingSectionKey === "about" &&
                      "Hayat Hikayesini Düzenle"}
                    {editingSectionKey === "publications" &&
                      (editingIndex === null
                        ? "Yeni Yayın Ekle"
                        : "Yayın Düzenle")}
                    {editingSectionKey === "experience" &&
                      (editingIndex === null
                        ? "Yeni İş Deneyimi Ekle"
                        : "İş Deneyimi Düzenle")}
                    {editingSectionKey === "services" &&
                      (editingIndex === null
                        ? "Yeni Hizmet Ekle"
                        : "Hizmet Düzenle")}
                    {editingSectionKey === "certificates" &&
                      (editingIndex === null
                        ? "Yeni Sertifika Ekle"
                        : "Sertifika Düzenle")}
                    {editingSectionKey === "awards" &&
                      (editingIndex === null
                        ? "Yeni Ödül Ekle"
                        : "Ödül Düzenle")}
                    {editingSectionKey === "hobbies" &&
                      (editingIndex === null
                        ? "Yeni Hobi Ekle"
                        : "Hobi Düzenle")}
                    {editingSectionKey === "social" &&
                      (editingIndex === null
                        ? "Yeni Sosyal Sorumluluk Ekle"
                        : "Sosyal Sorumluluk Düzenle")}
                    {editingSectionKey === "references" &&
                      (editingIndex === null
                        ? "Yeni Referans Ekle"
                        : "Referans Düzenle")}
                    {editingSectionKey === "languages" &&
                      (editingIndex === null ? "Yeni Dil Ekle" : "Dil Düzenle")}
                    {editingSectionKey === "cities" &&
                      (editingIndex === null
                        ? "Yeni Şehir Ekle"
                        : "Şehir Düzenle")}
                    {editingSectionKey === "relationship" &&
                      "İlişki Durumu Düzenle"}
                    {editingSectionKey === "network" &&
                      (editingIndex === null
                        ? "Yeni Kişi Ekle"
                        : "Kişi Düzenle")}
                    {editingSectionKey === "books" &&
                      (editingIndex === null
                        ? "Yeni Kitap Ekle"
                        : "Kitap Düzenle")}
                    {editingSectionKey === "teams" &&
                      (editingIndex === null
                        ? "Yeni Takım Ekle"
                        : "Takım Düzenle")}
                    {editingSectionKey === "photoGallery" &&
                      "Fotoğraf Galerisi Yönetimi"}
                    {editingSectionKey === "projects" &&
                      (editingIndex === null
                        ? "Yeni Proje Ekle"
                        : "Proje Düzenle")}
                    {editingSectionKey === "map" && "Konum Düzenle"}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowEditModal(false)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Modal Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <form id="edit-form">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Contact Form */}
                    {editingSectionKey === "contact" && (
                      <motion.div
                        id="contact-form"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-5"
                      >
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <FiPhone className="w-4 h-4 mr-2 text-emerald-600" />
                            Telefon
                          </label>
                          <input
                            type="tel"
                            name="telefon"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={
                              editingItem?.telefon ||
                              formData?.iletisim?.telefon ||
                              ""
                            }
                            placeholder="+90 5XX XXX XX XX"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <FiMail className="w-4 h-4 mr-2 text-emerald-600" />
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={formData?.iletisim?.email || ""}
                            placeholder="ornek@email.com"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <FiGlobe className="w-4 h-4 mr-2 text-emerald-600" />
                            Website
                          </label>
                          <input
                            type="url"
                            name="website"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={formData?.iletisim?.website || ""}
                            placeholder="https://www.example.com"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <FiInstagram className="w-4 h-4 mr-2 text-emerald-600" />
                            Instagram
                          </label>
                          <input
                            type="text"
                            name="instagram"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={formData?.iletisim?.instagram || ""}
                            placeholder="@kullaniciadi"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <FiLinkedin className="w-4 h-4 mr-2 text-emerald-600" />
                            LinkedIn
                          </label>
                          <input
                            type="text"
                            name="linkedin"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={formData?.iletisim?.linkedin || ""}
                            placeholder="linkedin.com/in/kullaniciadi"
                          />
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Education Form */}
                    {editingSectionKey === "education" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Okul Adı
                          </label>
                          <input
                            type="text"
                            name="okulAdi"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.okulAdi || ""}
                            placeholder="Üniversite/Lise adı"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bölüm
                          </label>
                          <input
                            type="text"
                            name="bolum"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.bolum || ""}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Mezun Tarihi
                            </label>
                            <input
                              type="date"
                              name="mezunTarihi"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.mezunTarihi || ""}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Derece
                            </label>
                            <select
                              name="derece"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.derece || ""}
                            >
                              <option value="">Seçiniz</option>
                              <option value="lise">Lise</option>
                              <option value="on_lisans">Ön Lisans</option>
                              <option value="lisans">Lisans</option>
                              <option value="yuksek_lisans">
                                Yüksek Lisans
                              </option>
                              <option value="doktora">Doktora</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Skills Form */}
                    {editingSectionKey === "skills" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Yetenek Adı
                          </label>
                          <input
                            type="text"
                            name="ad"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.ad || ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Seviye
                          </label>
                          <select
                            name="seviye"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.seviye || ""}
                          >
                            <option value="">Seçiniz</option>
                            <option value="baslangic">Başlangıç</option>
                            <option value="orta">Orta</option>
                            <option value="ileri">İleri</option>
                            <option value="uzman">Uzman</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* About Form */}
                    {editingSectionKey === "about" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hayat Hikayesi
                          </label>
                          <div className="border border-gray-200 rounded-xl overflow-hidden min-h-[400px]">
                            <JoditEditor
                              ref={editorRef}
                              value={joditContent}
                              config={joditConfig}
                              onBlur={(newContent) => {
                                setJoditContent(newContent);
                              }}
                              tabIndex={-1}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "publications" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Başlık
                          </label>
                          <input
                            type="text"
                            name="baslik"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.baslik || ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Yayın Yeri
                          </label>
                          <input
                            type="text"
                            name="yayinYeri"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.yayinYeri || ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tarih
                          </label>
                          <input
                            type="date"
                            name="tarih"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.tarih || ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Link
                          </label>
                          <input
                            type="url"
                            name="link"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.link || ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Açıklama
                          </label>
                          <textarea
                            rows={3}
                            name="aciklama"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.aciklama || ""}
                            placeholder="Açıklama yazın..."
                          />
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "experience" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pozisyon
                          </label>
                          <input
                            type="text"
                            name="pozisyon"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.pozisyon || ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Şirket Adı
                          </label>
                          <input
                            type="text"
                            name="sirketAdi"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.sirketAdi || ""}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Başlangıç Tarihi
                            </label>
                            <input
                              type="date"
                              name="baslangicTarihi"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.baslangicTarihi || ""}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Bitiş Tarihi
                            </label>
                            <input
                              type="date"
                              name="bitisTarihi"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.bitisTarihi || ""}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Açıklama
                          </label>
                          <textarea
                            rows={3}
                            name="aciklama"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.aciklama || ""}
                            placeholder="Açıklama yazın..."
                          />
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "services" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hizmet Adı
                          </label>
                          <input
                            type="text"
                            name="ad"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.ad || ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Açıklama
                          </label>
                          <textarea
                            rows={3}
                            name="aciklama"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.aciklama || ""}
                            placeholder="Açıklama yazın..."
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Fiyat
                            </label>
                            <input
                              type="text"
                              name="fiyat"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.fiyat || ""}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Süre
                            </label>
                            <input
                              type="text"
                              name="sure"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.sure || ""}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "certificates" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sertifika Adı
                          </label>
                          <input
                            type="text"
                            name="ad"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.ad || ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Veren Kurum
                          </label>
                          <input
                            type="text"
                            name="verenKurum"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.verenKurum || ""}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Tarih
                            </label>
                            <input
                              type="date"
                              name="tarih"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.tarih || ""}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Geçerlilik Süresi
                            </label>
                            <input
                              type="text"
                              name="gecerlilikSuresi"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.gecerlilikSuresi || ""}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sertifika No
                          </label>
                          <input
                            type="text"
                            name="sertifikaNo"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.sertifikaNo || ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Link
                          </label>
                          <input
                            type="url"
                            name="link"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.link || ""}
                          />
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "awards" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ödül Adı
                          </label>
                          <input
                            type="text"
                            name="ad"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.ad || ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Veren Kurum
                          </label>
                          <input
                            type="text"
                            name="verenKurum"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.verenKurum || ""}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Tarih
                            </label>
                            <input
                              type="date"
                              name="tarih"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.tarih || ""}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Kategori
                            </label>
                            <select
                              name="kategori"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.kategori || ""}
                            >
                              <option value="">Seçiniz</option>
                              <option value="mesleki">Mesleki</option>
                              <option value="akademik">Akademik</option>
                              <option value="sosyal">Sosyal</option>
                              <option value="spor">Spor</option>
                              <option value="sanat">Sanat</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Açıklama
                          </label>
                          <textarea
                            rows={3}
                            name="aciklama"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.aciklama || ""}
                            placeholder="Açıklama yazın..."
                          />
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "hobbies" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hobi Adı
                          </label>
                          <input
                            type="text"
                            name="ad"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.ad || ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Seviye
                          </label>
                          <select
                            name="seviye"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.seviye || ""}
                          >
                            <option value="">Seçiniz</option>
                            <option value="baslangic">Başlangıç</option>
                            <option value="orta">Orta</option>
                            <option value="ileri">İleri</option>
                            <option value="uzman">Uzman</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Açıklama
                          </label>
                          <textarea
                            rows={3}
                            name="aciklama"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.aciklama || ""}
                            placeholder="Açıklama yazın..."
                          />
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "social" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Proje Adı
                          </label>
                          <input
                            type="text"
                            name="ad"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.ad || ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Organizasyon
                          </label>
                          <input
                            type="text"
                            name="organizasyon"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.organizasyon || ""}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Tarih
                            </label>
                            <input
                              type="date"
                              name="tarih"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.tarih || ""}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Süre
                            </label>
                            <input
                              type="text"
                              name="sure"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.sure || ""}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Açıklama
                          </label>
                          <textarea
                            rows={3}
                            name="aciklama"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.aciklama || ""}
                            placeholder="Açıklama yazın..."
                          />
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "references" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Ad
                            </label>
                            <input
                              type="text"
                              name="ad"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.ad || ""}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Soyad
                            </label>
                            <input
                              type="text"
                              name="soyad"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.soyad || ""}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pozisyon
                          </label>
                          <input
                            type="text"
                            name="pozisyon"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.pozisyon || ""}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Şirket
                          </label>
                          <input
                            type="text"
                            name="sirket"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.sirket || ""}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Telefon
                            </label>
                            <input
                              type="tel"
                              name="telefon"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.telefon || ""}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.email || ""}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "languages" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dil
                          </label>
                          <select
                            name="dil"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.dil || ""}
                          >
                            <option value="">Seçiniz</option>
                            <option value="turkce">Türkçe</option>
                            <option value="ingilizce">İngilizce</option>
                            <option value="almanca">Almanca</option>
                            <option value="fransizca">Fransızca</option>
                            <option value="ispanyolca">İspanyolca</option>
                            <option value="arapca">Arapça</option>
                            <option value="rusca">Rusça</option>
                            <option value="italyanca">İtalyanca</option>
                            <option value="japonca">Japonca</option>
                            <option value="cince">Çince</option>
                            <option value="diger">Diğer</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Konuşma
                            </label>
                            <select
                              name="konusma"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.konusma || ""}
                            >
                              <option value="">Seçiniz</option>
                              <option value="ana_dil">Ana Dil</option>
                              <option value="ileri">İleri (C1-C2)</option>
                              <option value="orta">Orta (B1-B2)</option>
                              <option value="baslangic">
                                Başlangıç (A1-A2)
                              </option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Yazma
                            </label>
                            <select
                              name="yazma"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.yazma || ""}
                            >
                              <option value="">Seçiniz</option>
                              <option value="ana_dil">Ana Dil</option>
                              <option value="ileri">İleri (C1-C2)</option>
                              <option value="orta">Orta (B1-B2)</option>
                              <option value="baslangic">
                                Başlangıç (A1-A2)
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Okuma
                            </label>
                            <select
                              name="okuma"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.okuma || ""}
                            >
                              <option value="">Seçiniz</option>
                              <option value="ana_dil">Ana Dil</option>
                              <option value="ileri">İleri (C1-C2)</option>
                              <option value="orta">Orta (B1-B2)</option>
                              <option value="baslangic">
                                Başlangıç (A1-A2)
                              </option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Dinleme
                            </label>
                            <select
                              name="dinleme"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.dinleme || ""}
                            >
                              <option value="">Seçiniz</option>
                              <option value="ana_dil">Ana Dil</option>
                              <option value="ileri">İleri (C1-C2)</option>
                              <option value="orta">Orta (B1-B2)</option>
                              <option value="baslangic">
                                Başlangıç (A1-A2)
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "cities" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Şehir
                          </label>
                          <input
                            type="text"
                            name="sehir"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.sehir || ""}
                            placeholder="Örn: İstanbul, Ankara, İzmir"
                          />
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "relationship" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            İlişki Durumu
                          </label>
                          <select
                            name="durum"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={
                              editingItem?.durum ||
                              formData?.iliskiDurumu?.durum ||
                              ""
                            }
                          >
                            <option value="">Seçiniz</option>
                            <option value="bekar">Bekar</option>
                            <option value="evli">Evli</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "network" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            İsim
                          </label>
                          <input
                            type="text"
                            name="ad"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.ad || ""}
                            placeholder="Örn: Ahmet Yılmaz"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            İlişki Türü
                          </label>
                          <select
                            name="iliskiTuru"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.iliskiTuru || ""}
                          >
                            <option value="">Seçiniz</option>
                            <option value="ogrenci">Öğrencim</option>
                            <option value="hoca">Hocam</option>
                            <option value="lise_arkadasi">
                              Lise Arkadaşım
                            </option>
                            <option value="universite_arkadasi">
                              Üniversite Arkadaşım
                            </option>
                            <option value="meslektas">Meslektaşım</option>
                            <option value="diger">Diğer</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Diğer İlişki Türü (Sadece "Diğer" seçiliyse)
                          </label>
                          <input
                            type="text"
                            name="digerIliski"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.digerIliski || ""}
                            placeholder="Örn: Kuzen, Komşu, Mentor"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Açıklama/Not
                          </label>
                          <textarea
                            rows={3}
                            name="aciklama"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.aciklama || ""}
                            placeholder="Kısa bir not ekleyebilirsiniz..."
                          />
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "books" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kitap Adı
                          </label>
                          <input
                            type="text"
                            name="kitapAdi"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.kitapAdi || ""}
                            placeholder="Örn: Suç ve Ceza"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Yazar
                          </label>
                          <input
                            type="text"
                            name="yazar"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.yazar || ""}
                            placeholder="Örn: Dostoyevski"
                          />
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "teams" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Takım Adı
                          </label>
                          <input
                            type="text"
                            name="takimAdi"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.takimAdi || ""}
                            placeholder="Örn: Galatasaray, Fenerbahçe"
                          />
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "photoGallery" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">
                              Fotoğraflar:{" "}
                              {customization.photoGallery?.length || 0} / 20
                            </p>
                            <p className="text-xs text-gray-500">
                              Onaylı:{" "}
                              {customization.photoGallery?.filter(
                                (p) => p.adminApproved
                              ).length || 0}{" "}
                              | Beklemede:{" "}
                              {customization.photoGallery?.filter(
                                (p) => !p.adminApproved && !p.uploading
                              ).length || 0}
                            </p>
                          </div>
                          <label className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                            Fotoğraf Yükle
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                          {customization.photoGallery?.map((photo) => (
                            <div key={photo.id} className="relative group">
                              {photo.url ? (
                                <img
                                  src={photo.url}
                                  alt="Galeri"
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              ) : (
                                <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <div className="text-gray-400 text-xs">
                                    Yükleniyor...
                                  </div>
                                </div>
                              )}

                              {/* Durum Göstergeleri */}
                              <div className="absolute top-2 left-2 flex gap-1">
                                {photo.uploading && (
                                  <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded">
                                    Yükleniyor
                                  </span>
                                )}
                                {!photo.uploading && !photo.adminApproved && (
                                  <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded">
                                    Onay Bekliyor
                                  </span>
                                )}
                                {photo.adminApproved && (
                                  <span className="px-2 py-1 bg-green-500 text-white text-xs rounded">
                                    ✓ Onaylı
                                  </span>
                                )}
                              </div>

                              {photo.uploading && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                  <div className="text-white text-xs">
                                    Yükleniyor...
                                  </div>
                                </div>
                              )}
                              {!photo.uploading && (
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    type="button"
                                    onClick={() => handlePhotoDelete(photo.id)}
                                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded shadow-lg transition-colors"
                                    title="Fotoğrafı Sil"
                                  >
                                    ×
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {customization.photoGallery?.length > 0 && (
                          <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                            <strong>Bilgi:</strong> Fotoğraflar admin onayından
                            sonra CV'nizde görünecektir. Onaylı fotoğrafları
                            silmek için üzerine gelin ve çarpı butonuna
                            tıklayın.
                          </div>
                        )}
                      </div>
                    )}

                    {editingSectionKey === "projects" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Proje Adı
                          </label>
                          <input
                            type="text"
                            name="ad"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.ad || ""}
                            placeholder="Proje adını girin"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Açıklama
                          </label>
                          <textarea
                            rows={3}
                            name="aciklama"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.aciklama || ""}
                            placeholder="Proje hakkında kısa açıklama"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Anahtar Kelimeler / Kullanılan Araçlar (virgülle
                            ayırın)
                          </label>
                          <input
                            type="text"
                            name="teknolojiler"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={
                              Array.isArray(editingItem?.teknolojiler)
                                ? editingItem.teknolojiler.join(", ")
                                : editingItem?.teknolojiler || ""
                            }
                            placeholder="Photoshop, İllustrasyon, Seramik, Arduino"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Link (Opsiyonel)
                          </label>
                          <input
                            type="url"
                            name="link"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                            defaultValue={editingItem?.link || ""}
                            placeholder="https://github.com/kullanici/proje"
                          />
                        </div>
                      </div>
                    )}

                    {editingSectionKey === "map" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Enlem (Latitude)
                            </label>
                            <input
                              type="number"
                              step="0.000001"
                              name="lat"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.lat || ""}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Boylam (Longitude)
                            </label>
                            <input
                              type="number"
                              step="0.000001"
                              name="lng"
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800"
                              defaultValue={editingItem?.lng || ""}
                            />
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Not: Koordinatları Google Maps'ten alabilirsiniz.
                        </div>
                      </div>
                    )}
                  </motion.div>
                </form>

                {/* Modal Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex gap-4 pt-6 border-t border-gray-100"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 hover:bg-gray-50 font-medium transition-all"
                  >
                    İptal
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // Form verilerini topla ve handleSaveEdit'i çağır
                      const formData = new FormData(
                        document.getElementById("edit-form")
                      );
                      const data = {};
                      for (let [key, value] of formData.entries()) {
                        data[key] = value;
                      }
                      handleSaveEdit(data);
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    {editingIndex === null ? "Ekle" : "Kaydet"}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Publish Modal */}
      <AnimatePresence>
        {showPublishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closePublishModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">CV'yi Yayınla</h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closePublishModal}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {!publishUrl ? (
                  // Yayınlama Öncesi
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        CV URL'nizi Özelleştirin:
                      </label>
                      <div className="flex items-center gap-2 bg-gray-50 border-2 border-gray-200 rounded-xl p-3 focus-within:border-blue-500 focus-within:bg-white transition-all">
                        <span className="text-gray-600 font-mono text-sm flex-shrink-0">
                          {window.location.origin}/
                        </span>
                        <input
                          type="text"
                          value={customSlug}
                          onChange={(e) => handleSlugChange(e.target.value)}
                          className="flex-1 bg-transparent outline-none font-mono text-sm text-gray-900 placeholder-gray-400"
                          placeholder="ad-soyad"
                          maxLength={50}
                        />
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {customSlug.length}/50
                        </span>
                      </div>
                      {slugError && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {slugError}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        💡 Sadece küçük harf, rakam ve tire (-)
                        kullanabilirsiniz. Türkçe karakterler otomatik
                        dönüştürülür.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      <h4 className="font-semibold text-gray-800 text-sm">
                        Yayınlama Bilgileri:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ CV'niz herkese açık olarak yayınlanacak</li>
                        <li>✓ Paylaşılabilir özel URL oluşturulacak</li>
                        <li>✓ İstediğiniz zaman güncelleyebilirsiniz</li>
                      </ul>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={closePublishModal}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 hover:bg-gray-50 font-medium transition-all"
                      >
                        İptal
                      </button>
                      <button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                      >
                        {isPublishing ? "Yayınlanıyor..." : "Yayınla"}
                      </button>
                    </div>
                  </div>
                ) : (
                  // Yayınlama Sonrası
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">
                        CV Başarıyla Yayınlandı!
                      </h4>
                      <p className="text-gray-600">
                        CV'niz artık aşağıdaki URL'den erişilebilir
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-200 rounded-xl p-4">
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        CV URL'niz:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={publishUrl}
                          readOnly
                          className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg font-mono text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                        >
                          Kopyala
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={publishUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-center transition-all shadow-lg hover:shadow-xl"
                      >
                        CV'yi Görüntüle
                      </a>
                      <button
                        onClick={closePublishModal}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 hover:bg-gray-50 font-medium transition-all"
                      >
                        Kapat
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Modal */}
      <MapModal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        onSave={handleMapSave}
        initialData={mapData || {}}
      />

      {/* Floating Yayınla Butonu - Sağ Alt Köşe */}
      {selectedTheme && !isEditing && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPublishModal(true)}
          className="fixed right-5 bottom-5 z-50 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 group"
        >
          <svg
            className="w-6 h-6 group-hover:rotate-12 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span>CV'yi Yayınla</span>
        </motion.button>
      )}

      {/* Özel Bölüm Modal */}
      <AnimatePresence>
        {showCustomSectionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeCustomSectionModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-white">
                <h3 className="text-xl font-bold">
                  {editingCustomSection
                    ? "Özel Bölümü Düzenle"
                    : "Yeni Özel Bölüm"}
                </h3>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-4">
                  {/* Başlık */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bölüm Başlığı *
                    </label>
                    <input
                      type="text"
                      value={customSectionForm.title}
                      onChange={(e) =>
                        setCustomSectionForm({
                          ...customSectionForm,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800"
                      placeholder="Örn: Yayınlarım, Projelerim, Referanslarım"
                    />
                  </div>

                  {/* İçerik */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      İçerik
                    </label>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <JoditEditor
                        value={customSectionForm.content}
                        config={{
                          readonly: false,
                          placeholder: "İçerik yazın...",
                          height: 300,
                          minHeight: 300,
                          buttons: [
                            "bold",
                            "italic",
                            "underline",
                            "|",
                            "ul",
                            "ol",
                            "|",
                            "align",
                            "|",
                            "undo",
                            "redo",
                          ],
                          toolbarAdaptive: false,
                          showCharsCounter: false,
                          showWordsCounter: false,
                          showXPathInStatusbar: false,
                        }}
                        onBlur={(newContent) =>
                          setCustomSectionForm({
                            ...customSectionForm,
                            content: newContent,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
                <button
                  onClick={closeCustomSectionModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 hover:bg-gray-100 font-medium transition-all"
                >
                  İptal
                </button>
                <button
                  onClick={saveCustomSection}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  {editingCustomSection ? "Güncelle" : "Ekle"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gray-700">Yükleniyor...</p>
          </div>
        </div>
      }
    >
      <TemplatesContent />
    </Suspense>
  );
}
