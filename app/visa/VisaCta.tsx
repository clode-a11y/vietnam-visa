'use client'

import Image from 'next/image'
import { useLocale } from '@/lib/i18n/context'

export default function VisaCta() {
  const { t } = useLocale()

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1920&q=80"
          alt="Вьетнам закат"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#115E67]/90 to-[#3D9DA1]/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="reveal text-6xl mb-4">{t('cta.emoji')}</div>
        <h2 className="reveal reveal-delay-1 text-4xl font-black text-white mb-4">{t('cta.heading')}</h2>
        <p className="reveal reveal-delay-2 text-xl text-white/90 mb-8">{t('cta.subtitle')}</p>
        <a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="reveal reveal-delay-3 inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 hover:shadow-lg hover:scale-105 active:scale-[0.98] transition text-lg">
          {t('cta.button')} →
        </a>
      </div>
    </section>
  )
}
