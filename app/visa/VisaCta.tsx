'use client'

import { useLocale } from '@/lib/i18n/context'

export default function VisaCta() {
  const { t } = useLocale()

  return (
    <section className="py-20 px-6 text-center">
      <div className="reveal text-6xl mb-4">{t('cta.emoji')}</div>
      <h2 className="reveal reveal-delay-1 text-4xl font-black dark:text-white mb-4">{t('cta.heading')}</h2>
      <p className="reveal reveal-delay-2 text-xl text-gray-600 dark:text-gray-400 mb-8">{t('cta.subtitle')}</p>
      <a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="reveal reveal-delay-3 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 text-white font-bold rounded-full hover:shadow-lg active:scale-[0.98] transition text-lg">
        {t('cta.button')} →
      </a>
    </section>
  )
}
