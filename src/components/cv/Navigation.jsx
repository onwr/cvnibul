"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FiUser, FiLogOut, FiEdit3, FiCalendar } from "react-icons/fi";
import SearchBar from "./SearchBar";

export default function Navigation({ isScrolled }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-200"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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

          {/* SearchBar (Desktop - Orta) */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : session ? (
              <div className="flex items-center gap-3">
                {/* Randevularım Butonu */}
                <button
                  onClick={() => router.push("/appointments")}
                  className="flex items-center gap-2 px-3 py-2 md:px-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                  title="Randevularım"
                >
                  <FiCalendar className="w-4 h-4" />
                  <span className="hidden sm:inline">Randevularım</span>
                </button>

                {/* CV Düzenle Butonu */}
                <button
                  onClick={() => router.push("/templates")}
                  className="flex items-center gap-2 px-3 py-2 md:px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                  title="CV'mi Düzenle"
                >
                  <FiEdit3 className="w-4 h-4" />
                  <span className="hidden sm:inline">CV'mi Düzenle</span>
                </button>

                {/* Kullanıcı Bilgisi */}
                <div className="flex items-center gap-2 px-3 py-2 md:px-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <FiUser className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-800 hidden md:inline">
                    {session.user.name || session.user.email}
                  </span>
                </div>

                {/* Çıkış Yap Butonu */}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 px-3 py-2 md:px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  title="Çıkış Yap"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Çıkış</span>
                </button>
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

        {/* SearchBar (Mobile - Tam Genişlik) */}
        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
