"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { FiX, FiMapPin, FiSearch, FiLoader } from "react-icons/fi";
import "leaflet/dist/leaflet.css";

// Dynamic import for Leaflet components (SSR fix)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const useMapEvents = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMapEvents),
  { ssr: false }
);

// LocationMarker component - handles map clicks and marker dragging
function LocationMarker({ position, onPositionChange }) {
  const map = useMapEvents({
    click(e) {
      onPositionChange(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position ? (
    <Marker
      position={[position.lat, position.lng]}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const pos = e.target.getLatLng();
          onPositionChange(pos.lat, pos.lng);
        },
      }}
    />
  ) : null;
}

const MapModal = ({ isOpen, onClose, onSave, initialData = {} }) => {
  const [location, setLocation] = useState({
    lat: initialData?.lat || 39.9334,
    lng: initialData?.lng || 32.8597,
    adres: initialData?.adres || "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (initialData?.lat && initialData?.lng) {
      setLocation({
        lat: initialData.lat,
        lng: initialData.lng,
        adres: initialData.adres || "",
      });
    }
  }, [initialData]);

  // Reverse Geocoding - koordinatlardan adres bul
  const updateAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?` +
          `format=json&` +
          `lat=${lat}&` +
          `lon=${lng}&` +
          `addressdetails=1`,
        {
          headers: {
            "Accept-Language": "tr",
            "User-Agent": "CV-Builder-App",
          },
        }
      );
      const data = await response.json();
      if (data.display_name) {
        setLocation({
          lat,
          lng,
          adres: data.display_name,
        });
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      setLocation((prev) => ({ ...prev, lat, lng }));
    }
  };

  // Otomatik arama (debounced)
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        // Nominatim API - Geliştirilmiş parametreler
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
            `format=json&` +
            `q=${encodeURIComponent(searchQuery)}&` +
            `countrycodes=tr&` +
            `limit=10&` +
            `addressdetails=1&` +
            `extratags=1&` +
            `namedetails=1`,
          {
            headers: {
              "Accept-Language": "tr",
              "User-Agent": "CV-Builder-App",
            },
          }
        );
        const data = await response.json();

        if (data && data.length > 0) {
          setSearchResults(data);
          setShowDropdown(true);
        } else {
          setSearchResults([]);
          setShowDropdown(false);
        }
      } catch (error) {
        console.error("Arama hatası:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500); // 500ms debounce

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSelectLocation = (result) => {
    setLocation({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      adres: result.display_name,
    });
    setSearchQuery(result.display_name);
    setShowDropdown(false);
    setSearchResults([]);
  };

  const handleMapClick = (e) => {
    // iframe içinde click olayı yakalanması zor olduğu için
    // kullanıcı koordinatları manuel girebilir
  };

  const handleSave = () => {
    onSave(location);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiMapPin className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Konum Seçimi</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Arama */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adres veya Konum Ara
            </label>
            <div className="relative">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                {isSearching && (
                  <FiLoader className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 z-10 animate-spin" />
                )}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() =>
                    searchResults.length > 0 && setShowDropdown(true)
                  }
                  placeholder="Örn: Ankara, İstanbul, İzmir..."
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Dropdown Sonuçlar */}
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectLocation(result)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-start gap-3 group"
                    >
                      <FiMapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0 group-hover:text-blue-600" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">
                          {result.name || result.display_name.split(",")[0]}
                        </p>
                        {result.address && (
                          <>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {result.address.road &&
                                `${result.address.road}, `}
                              {result.address.suburb ||
                                result.address.neighbourhood ||
                                result.address.quarter ||
                                ""}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {result.address.city ||
                                result.address.town ||
                                result.address.province ||
                                result.address.state}
                            </p>
                          </>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Arama Mesajları */}
              {searchQuery.trim().length >= 2 &&
                !isSearching &&
                searchResults.length === 0 && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 text-center">
                    <p className="text-sm text-gray-500">
                      Sonuç bulunamadı. Farklı bir arama deneyin.
                    </p>
                  </div>
                )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 En az 2 karakter yazın, sonuçlar otomatik görünecek
            </p>
          </div>

          {/* Harita */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İnteraktif Harita
            </label>
            <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
              {typeof window !== "undefined" && (
                <MapContainer
                  center={[location.lat, location.lng]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                  className="z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker
                    position={location}
                    onPositionChange={updateAddressFromCoords}
                  />
                </MapContainer>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              💡 İpucu: Haritaya tıklayarak veya pin'i sürükleyerek konum
              seçebilirsiniz. Adres otomatik güncellenecektir.
            </p>
          </div>

          {/* Koordinatlar */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enlem (Latitude)
              </label>
              <input
                type="number"
                step="0.000001"
                value={location.lat}
                onChange={(e) =>
                  setLocation({ ...location, lat: parseFloat(e.target.value) })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                placeholder="39.9334"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Boylam (Longitude)
              </label>
              <input
                type="number"
                step="0.000001"
                value={location.lng}
                onChange={(e) =>
                  setLocation({ ...location, lng: parseFloat(e.target.value) })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                placeholder="32.8597"
              />
            </div>
          </div>

          {/* Adres */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adres
            </label>
            <textarea
              value={location.adres}
              onChange={(e) =>
                setLocation({ ...location, adres: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-400"
              placeholder="Detaylı adres giriniz..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              İptal
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg"
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
