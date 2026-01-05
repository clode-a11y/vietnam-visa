'use client'

import Image from 'next/image'
import { useLocale } from '@/lib/i18n/context'

export default function VisaHero() {
  const { locale, t } = useLocale()

  return (
    <>
      {/* Hero with Photo Background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1528127269322-539801943592?w=1920&q=80"
            alt="Вьетнам - рисовые террасы"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#115E67]/80 via-[#115E67]/60 to-[#115E67]/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-semibold text-white mb-6">
            <span className="w-2 h-2 bg-[#A8D8D8] rounded-full animate-pulse"></span>
            {t('hero.badge')}
          </div>
          <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight text-white">
            {t('hero.title')} <span className="text-[#A8D8D8]">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="reveal reveal-delay-2 text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <a href="#calculator" className="reveal reveal-delay-3 inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 hover:shadow-lg hover:scale-105 active:scale-[0.98] transition text-lg">
            {t('hero.cta')}
            <span>→</span>
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '45', label: t('stats.days') },
            { value: '$25', label: t('stats.price') },
            { value: '3', label: t('stats.processing') },
            { value: '90', label: t('stats.max') },
          ].map((stat, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 text-center shadow-lg border border-white/50 dark:border-slate-700/50 hover:shadow-xl hover:-translate-y-2 transition-all`}>
              <div className="text-4xl font-black bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 bg-clip-text text-transparent mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
