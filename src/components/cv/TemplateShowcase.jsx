"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TemplateRenderer from "./TemplateRenderer";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function TemplateShowcase() {
  const [cvData, setCvData] = useState(null);
  const [customization, setCustomization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCV() {
      try {
        const response = await fetch("/api/cv/adem-ozkul");

        if (!response.ok) {
          // CV bulunamazsa sample verisini kullan
          console.log("CV bulunamadı, sample veri kullanılıyor");
          const { sampleCVData, sampleCustomization } = await import(
            "@/data/sampleCV"
          );
          setCvData(sampleCVData);
          setCustomization(sampleCustomization);
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (data.cv) {
          setCvData(data.cv.formData);
          setCustomization(data.cv.customization);
        }
        setLoading(false);
      } catch (error) {
        console.error("CV yükleme hatası:", error);
        // Hata durumunda sample veri kullan
        try {
          const { sampleCVData, sampleCustomization } = await import(
            "@/data/sampleCV"
          );
          setCvData(sampleCVData);
          setCustomization(sampleCustomization);
        } catch (importError) {
          console.error("Sample veri yüklenemedi:", importError);
        }
        setLoading(false);
      }
    }

    fetchCV();
  }, []);

  if (loading || !cvData || !customization) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse text-gray-400">Yükleniyor...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Örnek Şablon Görünümü
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Profesyonel CV şablonumuzun canlı önizlemesini görün. Hemen başlayın
            ve kendi CV'nizi oluşturun!
          </p>
        </motion.div>

        {/* Şablon Önizleme */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Dekoratif Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl blur-3xl -z-10"></div>

          {/* Container */}
          <div className="relative">
            {/* Showcase Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg"
            >
              {/* Template Render */}
              <div className="relative overflow-y-auto max-h-[800px]">
                <div className="transform scale-90 origin-top">
                  <TemplateRenderer
                    formData={cvData}
                    templateType="sidebar"
                    customization={customization}
                    isEditing={false}
                    viewCount={0}
                    likeCount={0}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/templates"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>CV'mi Oluştur</span>
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
