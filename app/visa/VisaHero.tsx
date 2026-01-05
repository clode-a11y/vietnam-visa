'use client'

import { useLocale } from '@/lib/i18n/context'

export default function VisaHero() {
  const { locale, t } = useLocale()

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full text-sm font-semibold text-teal-700 dark:text-teal-400 mb-6">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
              {t('hero.badge')}
            </div>
            <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight dark:text-white">
              {t('hero.title')} <span className="bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 bg-clip-text text-transparent">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="reveal reveal-delay-2 text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-lg">
              {t('hero.subtitle')}
            </p>
            <a href="#calculator" className="reveal reveal-delay-3 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 text-white font-bold rounded-full hover:shadow-lg active:scale-[0.98] transition text-lg">
              {t('hero.cta')}
              <span>→</span>
            </a>
          </div>

          {/* 3D Travel Icon - Airplane with Globe */}
          <div className="reveal reveal-delay-4 relative flex justify-center items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Animated circles background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/30 dark:to-teal-800/30 animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-teal-200 to-teal-300 dark:from-teal-800/40 dark:to-teal-700/40"></div>
              </div>

              {/* Main icon container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Globe */}
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-teal-400 via-teal-500 to-teal-700 shadow-2xl flex items-center justify-center overflow-hidden">
                    {/* Globe lines */}
                    <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                      <ellipse cx="50" cy="50" rx="45" ry="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                      <ellipse cx="50" cy="50" rx="30" ry="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                      <ellipse cx="50" cy="50" rx="15" ry="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                      <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                      <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                      <ellipse cx="50" cy="30" rx="40" ry="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                      <ellipse cx="50" cy="70" rx="40" ry="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                    </svg>
                    {/* Vietnam flag colors accent */}
                    <div className="absolute bottom-2 right-2 w-6 h-4 rounded-sm bg-red-500 flex items-center justify-center">
                      <span className="text-yellow-400 text-xs">★</span>
                    </div>
                  </div>

                  {/* Airplane */}
                  <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 transform rotate-45">
                    <svg className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                  </div>

                  {/* Flight trail */}
                  <svg className="absolute -top-8 -right-8 w-24 h-24 md:w-32 md:h-32" viewBox="0 0 100 100">
                    <path
                      d="M10 90 Q 30 70, 50 60 T 90 10"
                      fill="none"
                      stroke="url(#trailGradient)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="trailGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent"/>
                        <stop offset="100%" stopColor="rgba(255,255,255,0.6)"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-white/80 dark:bg-slate-700/80 rounded-full shadow-lg flex items-center justify-center text-lg animate-bounce" style={{animationDelay: '0s'}}>
                🌴
              </div>
              <div className="absolute bottom-8 left-0 w-8 h-8 bg-white/80 dark:bg-slate-700/80 rounded-full shadow-lg flex items-center justify-center text-lg animate-bounce" style={{animationDelay: '0.5s'}}>
                🏖️
              </div>
              <div className="absolute top-12 right-0 w-8 h-8 bg-white/80 dark:bg-slate-700/80 rounded-full shadow-lg flex items-center justify-center text-lg animate-bounce" style={{animationDelay: '1s'}}>
                ✈️
              </div>
            </div>
          </div>
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
