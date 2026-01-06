'use client'

import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'
import { useLocale } from '@/lib/i18n/context'

export default function NotFound() {
  const { locale } = useLocale()

  const content = {
    ru: {
      title: '404',
      subtitle: 'Страница не найдена',
      description: 'Похоже, эта страница уехала во Вьетнам без визы. Но не волнуйтесь — мы поможем вам найти то, что нужно!',
      home: 'На главную',
      visa: 'Визы',
      rent: 'Аренда',
      contacts: 'Контакты',
      suggestions: 'Возможно, вас заинтересует:'
    },
    en: {
      title: '404',
      subtitle: 'Page not found',
      description: 'It looks like this page went to Vietnam without a visa. But don\'t worry — we\'ll help you find what you need!',
      home: 'Go Home',
      visa: 'Visas',
      rent: 'Rentals',
      contacts: 'Contacts',
      suggestions: 'You might be interested in:'
    },
    vi: {
      title: '404',
      subtitle: 'Không tìm thấy trang',
      description: 'Có vẻ như trang này đã đi Việt Nam mà không có visa. Nhưng đừng lo — chúng tôi sẽ giúp bạn tìm thấy những gì bạn cần!',
      home: 'Trang chủ',
      visa: 'Visa',
      rent: 'Thuê nhà',
      contacts: 'Liên hệ',
      suggestions: 'Bạn có thể quan tâm:'
    }
  }

  const t = content[locale as keyof typeof content] || content.ru

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-teal-50/30 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center py-16">
          {/* Icon */}
          <div className="text-8xl mb-6">🌴</div>

          {/* 404 Number */}
          <div className="text-[120px] md:text-[150px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
            {t.title}
          </div>

          {/* Subtitle */}
          <h1 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
            {t.subtitle}
          </h1>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-md mx-auto">
            {t.description}
          </p>

          {/* Main CTA */}
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition mb-12"
          >
            ← {t.home}
          </Link>

          {/* Suggestions */}
          <div className="pt-8 border-t border-gray-200 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {t.suggestions}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/visa"
                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 transition"
              >
                <span>📋</span>
                <span className="font-medium dark:text-white">{t.visa}</span>
              </Link>
              <Link
                href="/rent"
                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 transition"
              >
                <span>🏠</span>
                <span className="font-medium dark:text-white">{t.rent}</span>
              </Link>
              <Link
                href="/contacts"
                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 transition"
              >
                <span>📞</span>
                <span className="font-medium dark:text-white">{t.contacts}</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
