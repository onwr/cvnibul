"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TemplateRenderer from "./TemplateRenderer";
import { sampleCVData, sampleCustomization } from "@/data/sampleCV";
import { FiEye, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function TemplateShowcase() {
  const [isHovered, setIsHovered] = useState(false);

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
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Showcase Card */}
            <motion.div
              animate={{
                scale: isHovered ? 1.02 : 1,
                boxShadow: isHovered
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200"
            >
              {/* Overlay Badge */}
              <div className="absolute top-8 right-8 z-20">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
                >
                  <FiEye className="w-5 h-5" />
                  <span className="font-bold">Canlı Önizleme</span>
                </motion.div>
              </div>

              {/* Template Render */}
              <div className="relative overflow-hidden max-h-[800px]">
                <div className="transform scale-90 origin-top">
                  <TemplateRenderer
                    formData={sampleCVData}
                    templateType="sidebar"
                    customization={sampleCustomization}
                    isEditing={false}
                    viewCount={0}
                    likeCount={0}
                  />
                </div>

                {/* Bottom Gradient Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Hover Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-black/50 backdrop-blur-sm text-white px-8 py-4 rounded-2xl">
                <p className="text-lg font-semibold">
                  Şablonu Detaylı İnceleyin 👇
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              icon: "🎨",
              title: "Özelleştirilebilir",
              description:
                "Renkler, fontlar ve düzen tamamen sizin kontrolünüzde",
            },
            {
              icon: "📱",
              title: "Responsive Tasarım",
              description: "Tüm cihazlarda mükemmel görünüm",
            },
            {
              icon: "⚡",
              title: "Hızlı ve Kolay",
              description: "Dakikalar içinde profesyonel CV oluşturun",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
