"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiLoader } from "react-icons/fi";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (query.length >= 3) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        fetchResults(query);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
    }
  }, [query]);

  // Fetch search results
  const fetchResults = async (searchQuery) => {
    try {
      const response = await fetch(
        `/api/cv/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();

      if (data.results) {
        setResults(data.results);
        setIsOpen(data.results.length > 0);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle result click
  const handleResultClick = (slug) => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    router.push(`/${slug}`);
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get profile photo from customization or profilFoto
  const getProfilePhoto = (result) => {
    return result.customization?.profilePhoto || result.profilFoto || null;
  };

  // Get initials
  const getInitials = (ad, soyad) => {
    return `${ad?.[0] || ""}${soyad?.[0] || ""}`.toUpperCase();
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isLoading ? (
            <FiLoader className="w-5 h-5 text-emerald-500 animate-spin" />
          ) : (
            <FiSearch className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="CV Ara... (ad, soyad veya meslek)"
          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
        />
      </div>

      {/* Popup Results Modal */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] bg-white border-2 border-emerald-500 rounded-2xl shadow-2xl overflow-hidden z-50"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FiSearch className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-bold text-white">
                      Arama Sonuçları
                    </h3>
                    <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full font-medium">
                      {results.length} sonuç
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Results List */}
              <div
                className="p-4 max-h-[60vh] overflow-y-auto search-results-scroll"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#10b981 #f3f4f6",
                }}
              >
                <div className="space-y-2">
                  {results.map((result) => {
                    const profilePhoto = getProfilePhoto(result);

                    return (
                      <button
                        key={result.slug}
                        onClick={() => handleResultClick(result.slug)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 transition-all duration-150 text-left group"
                      >
                        {/* Profile Photo or Initials */}
                        <div className="flex-shrink-0">
                          {profilePhoto ? (
                            <img
                              src={profilePhoto}
                              alt={`${result.ad} ${result.soyad}`}
                              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-emerald-500 transition-colors"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center border-2 border-gray-200 group-hover:border-emerald-500 transition-colors">
                              <span className="text-white font-bold text-sm">
                                {getInitials(result.ad, result.soyad)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
                            {result.ad} {result.soyad}
                          </p>
                          {result.meslek && (
                            <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors truncate">
                              {result.meslek}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* No Results Modal */}
        {isOpen && query.length >= 3 && results.length === 0 && !isLoading && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white border-2 border-orange-300 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-400 to-red-400 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FiSearch className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-bold text-white">
                      Sonuç Bulunamadı
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="text-base font-semibold text-gray-800">
                  Arama sonucu bulunamadı
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  "{query}" için eşleşen CV bulunamadı
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  Farklı bir arama terimi deneyin
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
