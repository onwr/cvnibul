"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/cv/Navigation";
import Features from "@/components/cv/Features";
import Templates from "@/components/cv/Templates";
import Pricing from "@/components/cv/Pricing";
import CTA from "@/components/cv/CTA";
import Footer from "@/components/cv/Footer";
import StepliKayitFormu from "@/components/cv/StepliKayitFormu";
import TemplateShowcase from "@/components/cv/TemplateShowcase";
import { FiSearch, FiUsers, FiEye } from "react-icons/fi";

// Animasyonlu Sayaç Component
function AnimatedCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString("tr-TR")}</span>;
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [stats, setStats] = useState({ totalUsers: 0, totalVisitors: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats/public");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Stats yüklenemedi:", error);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <Navigation isScrolled={isScrolled} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600"></div>

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Profesyonel Portfolyonuzu
              <br />
              <span className="text-blue-400">Kolayca Oluşturun</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8">
              Modern ve şık tasarımlarla profesyonel varlığınızı dijital dünyada
              sergileyin
            </p>

            {/* Keşfet Butonu */}
            <Link
              href="/kesfet"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 rounded-2xl font-bold text-lg transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              <FiSearch className="w-6 h-6" />
              CV'leri Keşfet
            </Link>
          </div>

          {/* Form */}
          <div className="w-full max-w-full mx-auto px-4">
            <StepliKayitFormu />
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <TemplateShowcase />

      {/* Features Section */}
      <Features />

      {/* Templates Preview */}
      <Templates />

      {/* Pricing Section */}
      <Pricing />

      {/* CTA Section */}
      <CTA />

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Toplam Kullanıcı */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform">
              <FiUsers className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-5xl font-bold text-gray-900 mb-2">
                {statsLoading ? (
                  <span className="text-gray-400">...</span>
                ) : (
                  <AnimatedCounter end={stats.totalUsers} />
                )}
              </h3>
              <p className="text-xl text-gray-600">Toplam Kullanıcı</p>
            </div>

            {/* Toplam Ziyaretçi */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform">
              <FiEye className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
              <h3 className="text-5xl font-bold text-gray-900 mb-2">
                {statsLoading ? (
                  <span className="text-gray-400">...</span>
                ) : (
                  <AnimatedCounter end={stats.totalVisitors} />
                )}
              </h3>
              <p className="text-xl text-gray-600">Toplam Ziyaretçi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
