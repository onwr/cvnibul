"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  FiUser,
  FiLogOut,
  FiEdit3,
  FiCalendar,
  FiChevronDown,
} from "react-icons/fi";
import SearchBar from "./SearchBar";

export default function Navigation({ isScrolled }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-200"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst Satır: Logo + Kullanıcı Dropdown */}
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer flex-shrink-0"
            onClick={() => router.push("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CvHazirla
            </span>
          </div>

          {/* Kullanıcı Dropdown veya Giriş Butonu */}
          <div className="flex items-center">
            {status === "loading" ? (
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : session ? (
              <div className="relative" ref={dropdownRef}>
                {/* Dropdown Trigger */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg border border-blue-200 transition-all"
                >
                  <FiUser className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-800 hidden md:inline">
                    {session.user.name || session.user.email}
                  </span>
                  <FiChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => {
                        router.push("/appointments");
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors text-left"
                    >
                      <FiCalendar className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700 font-medium">
                        Randevularım
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        router.push("/templates");
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors text-left"
                    >
                      <FiEdit3 className="w-5 h-5 text-emerald-600" />
                      <span className="text-gray-700 font-medium">
                        CV'mi Düzenle
                      </span>
                    </button>

                    <hr className="my-2 border-gray-200" />

                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                    >
                      <FiLogOut className="w-5 h-5 text-red-600" />
                      <span className="text-gray-700 font-medium">
                        Çıkış Yap
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push("/auth/signin")}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
              >
                Giriş Yap / Kayıt Ol
              </button>
            )}
          </div>
        </div>

        {/* Alt Satır: Linkler + Arama Çubuğu */}
        <div className="border-t border-gray-200 py-2">
          <div className="flex items-center justify-between gap-4">
            {/* Sol: Linkler */}
            <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
              <a
                href="/hakkinda"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Hakkımızda
              </a>
              <a
                href="/kurucu"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Kurucu
              </a>
              <a
                href="/isbirligi"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                İş Birliği
              </a>
              <a
                href="/kullanim-kosullari"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Kullanım Koşulları
              </a>
              <a
                href="/iletisim"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                İletişim
              </a>
              <a
                href="/gizlilik-politikasi"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Gizlilik Politikası
              </a>
            </div>

            {/* Sağ: Arama Çubuğu */}
            <div className="hidden md:block flex-shrink-0 w-full max-w-md">
              <SearchBar />
            </div>
          </div>

          {/* Mobile: Arama Çubuğu Tam Genişlik */}
          <div className="md:hidden mt-2">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
}
