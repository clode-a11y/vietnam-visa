'use client'

import Header from '@/app/components/Header'
import { useLocale } from '@/lib/i18n/context'
import { translations } from '@/lib/i18n/translations'

export default function MapPage() {
  const { locale } = useLocale()
  const t = (key: string) => translations[locale][key] || key

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {t('rent.map.title')}
        </h1>

        {/* Map placeholder */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl block mb-4">🗺️</span>
              <p className="text-gray-600 dark:text-gray-300">
                {locale === 'ru' ? 'Интерактивная карта с квартирами' : locale === 'en' ? 'Interactive apartment map' : 'Bản đồ căn hộ tương tác'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {locale === 'ru' ? 'Карта будет добавлена после настройки Leaflet' : locale === 'en' ? 'Map will be added after Leaflet setup' : 'Bản đồ sẽ được thêm sau khi cài đặt Leaflet'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
