"use client";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-6">
          Hemen Başlayın ve Fark Yaratın
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Binlerce kişi zaten profesyonel CV'lerini oluşturdu. Siz de katılın!
        </p>
        <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
          Ücretsiz Hesap Oluştur
        </button>
      </div>
    </section>
  );
}
