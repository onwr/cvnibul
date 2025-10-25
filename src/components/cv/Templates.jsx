"use client";

export default function Templates() {
  return (
    <section id="templates" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Profesyonel Şablonlar
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Farklı sektörler için özel olarak tasarlanmış şablonlarımızı
            keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Template 1 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-2xl flex items-center justify-center">
              <div className="w-32 h-40 bg-white rounded-lg shadow-lg p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-blue-600 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-300 rounded w-1/2"></div>
                  <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                  <div className="h-8 bg-slate-200 rounded mt-4"></div>
                  <div className="h-3 bg-slate-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Modern Minimal
              </h3>
              <p className="text-slate-600 text-sm">
                Teknoloji ve yaratıcı sektörler için
              </p>
            </div>
          </div>

          {/* Template 2 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-t-2xl flex items-center justify-center">
              <div className="w-32 h-40 bg-white rounded-lg shadow-lg p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-purple-600 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-300 rounded w-1/2"></div>
                  <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                  <div className="h-8 bg-slate-200 rounded mt-4"></div>
                  <div className="h-3 bg-slate-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Kurumsal Klasik
              </h3>
              <p className="text-slate-600 text-sm">
                Finans ve hukuk sektörleri için
              </p>
            </div>
          </div>

          {/* Template 3 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-t-2xl flex items-center justify-center">
              <div className="w-32 h-40 bg-white rounded-lg shadow-lg p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-green-600 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-300 rounded w-1/2"></div>
                  <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                  <div className="h-8 bg-slate-200 rounded mt-4"></div>
                  <div className="h-3 bg-slate-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Yaratıcı Portföy
              </h3>
              <p className="text-slate-600 text-sm">
                Tasarım ve sanat sektörleri için
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
