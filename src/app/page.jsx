"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/cv/Navigation";
import Features from "@/components/cv/Features";
import Templates from "@/components/cv/Templates";
import Pricing from "@/components/cv/Pricing";
import CTA from "@/components/cv/CTA";
import Footer from "@/components/cv/Footer";
import StepliKayitFormu from "@/components/cv/StepliKayitFormu";

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
              Profesyonel Portfolyonuzu
              <br />
              <span className="text-blue-400">Kolayca Oluşturun</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Modern ve şık tasarımlarla profesyonel varlığınızı dijital dünyada
              sergileyin
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-full mx-auto px-4">
            <StepliKayitFormu />
          </div>
        </div>
      </section>

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
