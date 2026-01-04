'use client'

import { useState } from 'react'
import { useLocale } from '@/lib/i18n/context'
import { Locale, localeNames, localeFlags } from '@/lib/i18n/translations'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  const locales: Locale[] = ['ru', 'en', 'vi']

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/80 dark:bg-slate-700/80 backdrop-blur rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-slate-600 transition"
      >
        <span>{localeFlags[locale]}</span>
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden z-50">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLocale(l)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition ${
                  locale === l ? 'bg-teal-50 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300' : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                <span>{localeFlags[l]}</span>
                <span>{localeNames[l]}</span>
                {locale === l && (
                  <svg className="w-4 h-4 ml-auto text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
