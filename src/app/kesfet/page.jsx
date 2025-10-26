"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/cv/Navigation";
import { FiSearch, FiUser } from "react-icons/fi";

export default function KesfetPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Sayfa yüklendiğinde tüm CV'leri getir
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("q", searchQuery);

      const response = await fetch(`/api/cv/search?${params.toString()}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Arama hatası:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getInitials = (ad, soyad) => {
    return `${ad?.[0] || ""}${soyad?.[0] || ""}`.toUpperCase();
  };

  const getProfilePhoto = (result) => {
    if (result.customization?.profilePhoto) {
      return result.customization.profilePhoto;
    }
    if (result.profilFoto) {
      return result.profilFoto;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <Navigation isScrolled={isScrolled} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-back.jpg')",
            filter: "blur(3px)",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              CV'leri Keşfet
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8">
              Binlerce profesyonelin CV'sine göz atın
            </p>

            {/* Ana Arama Kutusu */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl">
              <div className="relative">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="İsim, soyisim veya meslek ara..."
                  className="w-full pl-16 pr-6 py-5 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sonuç Sayısı */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {loading ? (
              "Aranıyor..."
            ) : (
              <>
                {results.length} CV Bulundu
                {searchQuery && (
                  <span className="text-gray-500 font-normal ml-2">
                    "{searchQuery}" için
                  </span>
                )}
              </>
            )}
          </h2>
        </div>

        {/* Sonuç Listesi */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-md animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result) => {
              const profilePhoto = getProfilePhoto(result);

              return (
                <Link
                  key={result.slug}
                  href={`/${result.slug}`}
                  className="block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
                >
                  <div className="flex items-center gap-6">
                    {/* Profil Fotoğrafı */}
                    <div className="flex-shrink-0">
                      {profilePhoto ? (
                        <img
                          src={profilePhoto}
                          alt={`${result.ad} ${result.soyad}`}
                          className="w-20 h-20 rounded-full object-cover border-4 border-gray-100"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center border-4 border-gray-100">
                          <span className="text-white font-bold text-2xl">
                            {getInitials(result.ad, result.soyad)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bilgiler */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {result.ad} {result.soyad}
                      </h3>
                      {result.meslek && (
                        <p className="text-gray-600 font-medium">
                          {result.meslek}
                        </p>
                      )}
                    </div>

                    {/* Görüntüle Butonu */}
                    <div>
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                        <FiUser className="w-5 h-5" />
                        CV'yi Görüntüle
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <FiSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Sonuç Bulunamadı
            </h3>
            <p className="text-gray-600 mb-6">
              Arama kriterlerinize uygun CV bulunamadı. Farklı bir arama terimi
              deneyin.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all"
            >
              Aramayı Temizle
            </button>
          </div>
        )}
      </div>

      {/* Ana Sayfaya Dön */}
      <div className="text-center py-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 font-bold transition-colors inline-flex items-center gap-2"
        >
          ← Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
