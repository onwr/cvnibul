# CV Şablon ve Özelleştirme Sistemi

## Hedef

Şablon sayısını azaltmak, şablon isimlerini değiştirmek ve özelleştirme paneli eklemek.

## 1. Şablon İsimlerini Değiştir ve Card'ı Kaldır

**Dosya:** `src/app/templates/page.jsx`

### Yapılacaklar:

- Card şablonunu kaldır
- 3 şablon bırak: Hero, Sidebar, Classic
- Şablon isimlerini değiştir (açıklamalar sabit)

```javascript
const templates = [
  {
    id: "hero",
    name: "Modern", // Hero -> Modern
    description: "Arkaplan resimli tasarım",
    type: "hero",
  },
  {
    id: "sidebar",
    name: "Profesyonel", // Sidebar -> Profesyonel
    description: "Sol-sağ bölünmüş düzen",
    type: "sidebar",
  },
  {
    id: "classic",
    name: "Minimalist", // Classic -> Minimalist
    description: "Üst-alt geleneksel düzen",
    type: "classic",
  },
];
```

## 2. PDF İndir Butonunu Kaldır

**Dosya:** `src/app/templates/page.jsx`

### Yapılacaklar:

- `handleExport` fonksiyonunu kaldır
- PDF butonunu UI'dan kaldır
- Sadece "Yayınla" ve "Düzenle" butonları kalsın

## 3. Şablon Seçici Küçültme

**Dosya:** `src/app/templates/page.jsx`

### Yapılacaklar:

- Şablon seçildiğinde `TemplateSlider` yüksekliğini küçült
- `selectedTemplate` state'ine göre dinamik class
- Seçilmediğinde: `h-[33.33vh]`
- Seçildiğinde: `h-[120px]` (veya daha küçük)

```javascript
<div className={`fixed bottom-0 left-0 right-0 transition-all duration-300 ${
  selectedTemplate ? 'h-[120px]' : 'h-[33.33vh]'
}`}>
```

## 4. Özelleştirme Paneli Oluştur

**Yeni Dosya:** `src/components/cv/CustomizationPanel.jsx`

### Özellikler:

1. **Renk Seçici**

   - Primary color (accent color)
   - Background color
   - Text color
   - Preset renkler (6-8 adet)

2. **Arkaplan Resmi**

   - Resim yükleme (ImgBB API)
   - Blur seviyesi slider
   - Opacity slider
   - Resmi kaldır butonu

3. **Profil Fotoğrafı**
   - Fotoğraf yükleme (ImgBB API)
   - Crop/resize önizleme
   - Fotoğrafı kaldır butonu

### UI Tasarımı:

```
┌─────────────────────────────────┐
│  ÖZELLEŞTIRME                   │
├─────────────────────────────────┤
│  🎨 Renk Şeması                 │
│  ⬜⬜⬜⬜⬜⬜ (preset renkler)    │
│                                 │
│  🖼️ Arkaplan Resmi              │
│  [Resim Yükle] [X Kaldır]      │
│  Blur: ─────●───── (slider)    │
│  Opaklık: ─────●───── (slider) │
│                                 │
│  👤 Profil Fotoğrafı            │
│  [Fotoğraf Yükle] [X Kaldır]   │
└─────────────────────────────────┘
```

## 5. State Yönetimi

**Dosya:** `src/app/templates/page.jsx`

### Yeni State'ler:

```javascript
const [customization, setCustomization] = useState({
  primaryColor: "#10b981", // emerald-500
  backgroundColor: "#ffffff",
  textColor: "#1f2937",
  backgroundImage: null,
  backgroundBlur: 3,
  backgroundOpacity: 0.6,
  profilePhoto: null,
});
```

### Props:

- `customization` -> `TemplateRenderer`'a gönder
- `setCustomization` -> `CustomizationPanel`'e gönder
- localStorage'a kaydet

## 6. TemplateRenderer Güncellemeleri

**Dosya:** `src/components/cv/TemplateRenderer.jsx`

### Yapılacaklar:

- `customization` prop'u al
- Renkleri dinamik uygula:
  ```javascript
  style={{
    backgroundColor: customization.backgroundColor,
    color: customization.textColor,
    backgroundImage: customization.backgroundImage ? `url(${customization.backgroundImage})` : undefined,
  }}
  ```
- Accent color'ları override et
- Profil fotoğrafını göster

## 7. ImgBB API Entegrasyonu

**Dosya:** `src/lib/imgbbUpload.js`

### API Key:

- ImgBB API key'i environment variable olarak ekle
- `.env.local`: `NEXT_PUBLIC_IMGBB_API_KEY=xxx`

### Upload Fonksiyonu:

```javascript
export async function uploadToImgBB(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.data.url;
}
```

## 8. UI Layout

**Ana Sayfa Yapısı:**

```
┌───────────────────────────────────────┐
│         Template Preview              │
│         (scrollable)                  │
│                                       │
│                                       │
│                                       │
├───────────────────────────────────────┤
│  Customization Panel (şablon seçili) │ <- 200px height
├───────────────────────────────────────┤
│  Template Slider (küçük)              │ <- 120px height
└───────────────────────────────────────┘
```

## Uygulama Sırası

1. Şablon isimlerini değiştir ve Card'ı kaldır
2. PDF butonunu kaldır
3. Şablon seçildiğinde slider'ı küçült
4. `customization` state'ini ekle
5. `CustomizationPanel` component'ini oluştur
6. Renk seçici ekle
7. ImgBB API entegrasyonu
8. Arkaplan resmi yükleme
9. Profil fotoğrafı yükleme
10. localStorage'a customization kaydet
11. TemplateRenderer'a customization uygula

## Notlar

- Framer Motion ile animasyonlar eklenebilir
- Özelleştirmeler localStorage'da tutulacak
- Responsive tasarım önemli (mobilde panel kapatılabilir)
