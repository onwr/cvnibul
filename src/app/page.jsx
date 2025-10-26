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
import { FiSearch } from "react-icons/fi";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
