-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 25 Eki 2025, 10:17:28
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `cvhazirla`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `account`
--

CREATE TABLE `account` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `provider` varchar(191) NOT NULL,
  `providerAccountId` varchar(191) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `expires_at` int(11) DEFAULT NULL,
  `token_type` varchar(191) DEFAULT NULL,
  `scope` varchar(191) DEFAULT NULL,
  `id_token` text DEFAULT NULL,
  `session_state` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `appointment`
--

CREATE TABLE `appointment` (
  `id` varchar(191) NOT NULL,
  `cvId` varchar(191) NOT NULL,
  `serviceId` varchar(191) DEFAULT NULL,
  `serviceName` varchar(191) NOT NULL,
  `appointmentDate` datetime(3) NOT NULL,
  `customerName` varchar(191) NOT NULL,
  `customerSurname` varchar(191) NOT NULL,
  `customerPhone` varchar(191) NOT NULL,
  `customerEmail` varchar(191) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `cv`
--

CREATE TABLE `cv` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `ad` varchar(191) NOT NULL,
  `soyad` varchar(191) NOT NULL,
  `email` varchar(191) DEFAULT NULL,
  `telefon` varchar(191) DEFAULT NULL,
  `adres` varchar(191) DEFAULT NULL,
  `dogumTarihi` varchar(191) DEFAULT NULL,
  `meslek` varchar(191) DEFAULT NULL,
  `haritaLat` double DEFAULT NULL,
  `haritaLng` double DEFAULT NULL,
  `profilFoto` varchar(191) DEFAULT NULL,
  `hayatHikayesi` text DEFAULT NULL,
  `formData` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`formData`)),
  `customization` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`customization`)),
  `templateId` varchar(191) NOT NULL DEFAULT 'hero',
  `isPublished` tinyint(1) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `viewCount` int(11) NOT NULL DEFAULT 0,
  `publishedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `likeCount` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `cv`
--

INSERT INTO `cv` (`id`, `userId`, `slug`, `ad`, `soyad`, `email`, `telefon`, `adres`, `dogumTarihi`, `meslek`, `haritaLat`, `haritaLng`, `profilFoto`, `hayatHikayesi`, `formData`, `customization`, `templateId`, `isPublished`, `isActive`, `viewCount`, `publishedAt`, `createdAt`, `updatedAt`, `likeCount`) VALUES
('7293db77-4e54-406c-a41b-dcc15d22a2bf', '9e299467-966f-4d39-83f8-8a6b38ed502a', 'salih-kurkaya', 'Salih', 'Kürkaya', 'test@gmail.com', '541 196 18 30', 'Atakule AVM, Çankaya Caddesi, Atakule, Çankaya Mahallesi, Ankara, Çankaya, Ankara, İç Anadolu Bölgesi, 06690, Türkiye', '2000-04-12', 'Frontend Developer', 39.88616254942065, 32.85633087158204, 'https://i.ibb.co/BKrK27Wn/yazilim-mimarisi1.jpg', 'test\n\nben merhaba', '{\"ad\":\"Salih\",\"soyad\":\"Kürkaya\",\"cinsiyet\":\"\",\"dogumTarihi\":\"2000-04-12\",\"vefatDurumu\":false,\"olumTarihi\":\"\",\"profilFotografi\":null,\"adres\":\"Atakule AVM, Çankaya Caddesi, Atakule, Çankaya Mahallesi, Ankara, Çankaya, Ankara, İç Anadolu Bölgesi, 06690, Türkiye\",\"haritaKonumu\":{\"lat\":39.88616254942065,\"lng\":32.85633087158204},\"hayatHikayesi\":\"test\\n\\nben merhaba\",\"egitimler\":[{\"id\":1761233011834,\"okulAdi\":\"Test Mtal\",\"bolum\":\"Bilişim\",\"mezunTarihi\":\"20002-02-02\",\"derece\":\"lise\"}],\"yetenekler\":[{\"id\":1761233030002,\"ad\":\"Yazılım\",\"seviye\":\"uzman\"}],\"calismaGecmisi\":[{\"id\":1761233035930,\"sirketAdi\":\"Kürkaya Yazılım\",\"pozisyon\":\"CEO\",\"baslangicTarihi\":\"2004-09-16\",\"bitisTarihi\":\"\",\"halaCalisiyor\":true,\"aciklama\":\"Kendi işim\"}],\"iletisim\":{\"telefon\":\"541 196 18 30\",\"email\":\"test@gmail.com\",\"website\":\"test.com\",\"linkedin\":\"test\",\"instagram\":\"test\",\"twitter\":\"\",\"facebook\":\"\",\"youtube\":\"\",\"github\":\"\",\"behance\":\"\",\"dribbble\":\"\"},\"fotoArsivi\":[],\"hizmetler\":[{\"id\":1761233159282,\"ad\":\"Web Tasarım\",\"aciklama\":\"Test Hizmet\",\"fiyat\":\"500₺\",\"sure\":\"1 Saat\",\"kategori\":\"yazilim\"}],\"paket\":\"ucretsiz\",\"hobiler\":[{\"id\":1761233080098,\"ad\":\"Yüzmek\",\"aciklama\":\"Testtt\",\"seviye\":\"baslangic\"}],\"sertifikalar\":[{\"id\":1761233055810,\"ad\":\"Yazılım\",\"verenKurum\":\"Yazılımcılar Derneği\",\"tarih\":\"2009-06-15\",\"gecerlilikSuresi\":\"2 Yıl\",\"sertifikaNo\":\"1024df\",\"link\":\"test\"}],\"projeler\":[],\"referanslar\":[{\"id\":1761233138977,\"ad\":\"Taha\",\"soyad\":\"Toha\",\"pozisyon\":\"CEO\",\"sirket\":\"TAHATOHA\",\"telefon\":\"\",\"email\":\"\",\"iliski\":\"musteri\"}],\"dilBilgisi\":[{\"id\":1761233074594,\"dil\":\"fransizca\",\"konusma\":\"ana_dil\",\"yazma\":\"ileri\",\"okuma\":\"baslangic\",\"dinleme\":\"orta\"}],\"ozelBeceriler\":[],\"sosyalSorumluluk\":[{\"id\":1761233086930,\"ad\":\"Test Projem\",\"organizasyon\":\"asdfasdfSADFDASF\",\"tarih\":\"2025-10-23\",\"sure\":\"faadfafasdf\",\"aciklama\":\"asdfdafdafdsaf\"}],\"yayinlar\":[{\"id\":1761233107586,\"baslik\":\"Test Yayınım\",\"yayinYeri\":\"Deneme\",\"tarih\":\"2014-04-12\",\"link\":\"test.com\",\"aciklama\":\"asdfasdfsadf\"}],\"oduller\":[{\"id\":1761233127650,\"ad\":\"Y Ödül\",\"verenKurum\":\"Y Kurum\",\"tarih\":\"2025-10-23\",\"kategori\":\"sanat\",\"aciklama\":\"Test\"}],\"tercihEdilenRenk\":\"blue\",\"meslek\":\"teknoloji\",\"ozelMeslek\":\"Frontend Developer\",\"cvAyarlari\":{\"fotoGoster\":true,\"sosyalMedyaGoster\":true,\"hobilerGoster\":true,\"sertifikalarGoster\":true,\"projelerGoster\":true,\"referanslarGoster\":true,\"dilBilgisiGoster\":true,\"ozelBecerilerGoster\":true,\"sosyalSorumlulukGoster\":true,\"yayinlarGoster\":true,\"odullerGoster\":true}}', '{\"fontFamily\":\"montserrat\",\"fontSize\":{\"heading\":30,\"subheading\":19,\"body\":14},\"lineHeight\":1.65,\"letterSpacing\":\"normal\",\"primaryColor\":\"#8b5cf6\",\"secondaryColor\":\"#ec4899\",\"accentColor\":\"#f59e0b\",\"backgroundType\":\"image\",\"backgroundColor\":\"#ffffff\",\"gradient\":{\"type\":\"radial\",\"angle\":45,\"colors\":[\"#301051\",\"#fdf2f8\"]},\"backgroundImage\":\"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80\",\"backgroundBlur\":0,\"backgroundOpacity\":0.1,\"padding\":4,\"sectionGap\":12,\"borderRadius\":20,\"shadow\":\"none\",\"layout\":\"two-column\",\"cardStyle\":\"outlined\",\"profilePhoto\":\"https://i.ibb.co/BKrK27Wn/yazilim-mimarisi1.jpg\",\"sectionVisibility\":{},\"professionalLeftBg\":\"#6b6b6b\",\"colorPalette\":{\"primary\":\"#475569\",\"secondary\":\"#1e3a8a\",\"accent\":\"#94a3b8\",\"cardBg\":\"rgba(71, 85, 105, 0.1)\",\"cardBorder\":\"rgba(71, 85, 105, 0.3)\"},\"professionalLeftText\":\"#ffffff\",\"columnGap\":24,\"photoGallery\":[]}', 'sidebar', 1, 1, 277, '2025-10-24 23:00:53.235', '2025-10-23 15:33:20.982', '2025-10-24 23:12:57.513', 2);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `photoapproval`
--

CREATE TABLE `photoapproval` (
  `id` varchar(191) NOT NULL,
  `photoId` varchar(191) NOT NULL,
  `photoUrl` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `userName` varchar(191) NOT NULL,
  `approvedBy` varchar(191) DEFAULT NULL,
  `approvedAt` datetime(3) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `photoapproval`
--

INSERT INTO `photoapproval` (`id`, `photoId`, `photoUrl`, `userId`, `userName`, `approvedBy`, `approvedAt`, `status`, `createdAt`, `updatedAt`) VALUES
('5d4388be-426b-429e-9ee9-385df3e7af25', '1761347532812-6i1i2t3ex', 'https://i.ibb.co/3mf4Fpvg/urun1.jpg', '9e299467-966f-4d39-83f8-8a6b38ed502a', 'Salih Kürkaya', 'salihkurkaya@gmail.com', '2025-10-24 23:12:21.251', 'approved', '2025-10-24 23:12:14.025', '2025-10-24 23:12:21.252'),
('6a88509f-663b-4782-9b91-cacde349b62a', '1761347365315-r9o619ioo', 'https://i.ibb.co/fVHF0D1H/urun2.jpg', '9e299467-966f-4d39-83f8-8a6b38ed502a', 'Salih Kürkaya', 'salihkurkaya@gmail.com', '2025-10-24 23:09:28.455', 'approved', '2025-10-24 23:09:26.347', '2025-10-24 23:09:28.456'),
('79f27e36-5dcd-499a-b11c-601ca36d0a42', '1761347346878-8z0ofof1q', 'https://i.ibb.co/S7mnDBVP/banner3.jpg', '9e299467-966f-4d39-83f8-8a6b38ed502a', 'Salih Kürkaya', 'salihkurkaya@gmail.com', '2025-10-24 23:09:50.252', 'approved', '2025-10-24 23:09:07.600', '2025-10-24 23:09:50.253'),
('8707f5f0-592a-437f-930d-57f4b1037955', '1761347099851.5671', 'https://i.ibb.co/ccZjn1qq/banner-4-mobil.png', '9e299467-966f-4d39-83f8-8a6b38ed502a', 'Salih Kürkaya', 'salihkurkaya@gmail.com', '2025-10-24 23:05:09.842', 'rejected', '2025-10-24 23:05:02.520', '2025-10-24 23:05:09.844'),
('d203ab24-da28-4e61-b145-f0669b1fc897', '1761347104998.1558', 'https://i.ibb.co/607Cryqh/hallowen.jpg', '9e299467-966f-4d39-83f8-8a6b38ed502a', 'Salih Kürkaya', 'salihkurkaya@gmail.com', '2025-10-24 23:05:14.394', 'approved', '2025-10-24 23:05:05.235', '2025-10-24 23:05:14.396');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `session`
--

CREATE TABLE `session` (
  `id` varchar(191) NOT NULL,
  `sessionToken` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `password` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `emailVerified`, `image`, `password`, `createdAt`, `updatedAt`) VALUES
('9e299467-966f-4d39-83f8-8a6b38ed502a', 'Salih Kürkay', 'salihkurkaya@gmail.com', NULL, NULL, '$2b$10$XutM9IptwHjcfcSyrcp9f.YT.f6tz5A39cv0F8oftNMhvG6uoczxO', '2025-10-23 15:14:30.842', '2025-10-23 15:14:30.842');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `verificationtoken`
--

CREATE TABLE `verificationtoken` (
  `identifier` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('442ba00b-9651-450d-a784-6c473aed80fe', 'f1973d2122a5d6501cfd34fbe8ea57b17e16ebfb5400984e23adc3705c360f52', '2025-10-23 15:06:57.281', '20251023150657_init', NULL, NULL, '2025-10-23 15:06:57.147', 1),
('773ff994-0916-45ee-aba4-50fd219e4c8f', '79edd4808bb85ee64d3b1bf8c29004d2aeb88e24b4f2009e7bf2c2e8b318bbf0', '2025-10-24 22:30:04.105', '20251024223004_add_photo_approval', NULL, NULL, '2025-10-24 22:30:04.090', 1),
('91bbd1c6-13ef-48be-b78a-6eef5fe1e44b', '1a733160a36821f2fd1fba929399f2a9c8e7aae7777c64efb2ac617ae466dab8', '2025-10-24 20:08:25.988', '20251024200825_add_appointments', NULL, NULL, '2025-10-24 20:08:25.936', 1),
('f3e79e26-71ba-4bc5-a325-c411374aedcb', 'c629b96ddce3bbe7225e14ecc6cc6dcc7632fd7d019aefbdf42cbbc98b34fefd', '2025-10-24 22:40:12.274', '20251024224012_add_photo_approval_user_relation', NULL, NULL, '2025-10-24 22:40:12.244', 1),
('fb8d3da3-358f-4733-b2ba-d6bebc7593ee', '356672ab6d2be140613fc4794de09e752e8d67f097e07345a6aa525e7643f1ee', '2025-10-23 15:54:48.733', '20251023155448_add_like_count', NULL, NULL, '2025-10-23 15:54:48.729', 1);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  ADD KEY `Account_userId_fkey` (`userId`);

--
-- Tablo için indeksler `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Appointment_cvId_idx` (`cvId`),
  ADD KEY `Appointment_appointmentDate_idx` (`appointmentDate`),
  ADD KEY `Appointment_status_idx` (`status`);

--
-- Tablo için indeksler `cv`
--
ALTER TABLE `cv`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CV_userId_key` (`userId`),
  ADD UNIQUE KEY `CV_slug_key` (`slug`),
  ADD KEY `CV_slug_idx` (`slug`),
  ADD KEY `CV_userId_idx` (`userId`),
  ADD KEY `CV_isPublished_idx` (`isPublished`);

--
-- Tablo için indeksler `photoapproval`
--
ALTER TABLE `photoapproval`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PhotoApproval_userId_idx` (`userId`),
  ADD KEY `PhotoApproval_status_idx` (`status`),
  ADD KEY `PhotoApproval_createdAt_idx` (`createdAt`);

--
-- Tablo için indeksler `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  ADD KEY `Session_userId_fkey` (`userId`);

--
-- Tablo için indeksler `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Tablo için indeksler `verificationtoken`
--
ALTER TABLE `verificationtoken`
  ADD UNIQUE KEY `VerificationToken_token_key` (`token`),
  ADD UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`,`token`);

--
-- Tablo için indeksler `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `Appointment_cvId_fkey` FOREIGN KEY (`cvId`) REFERENCES `cv` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `cv`
--
ALTER TABLE `cv`
  ADD CONSTRAINT `CV_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `photoapproval`
--
ALTER TABLE `photoapproval`
  ADD CONSTRAINT `PhotoApproval_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
