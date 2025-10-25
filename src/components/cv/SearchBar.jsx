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

      {/* Dropdown Results */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Results List */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-emerald-500 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50 search-results-scroll"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#10b981 #f3f4f6",
              }}
            >
              <div className="p-2">
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
            </motion.div>
          </>
        )}

        {/* No Results */}
        {isOpen && query.length >= 3 && results.length === 0 && !isLoading && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* No Results Message */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-lg z-50"
            >
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">Sonuç bulunamadı</p>
                <p className="text-xs text-gray-400 mt-1">
                  "{query}" için eşleşen CV bulunamadı
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
