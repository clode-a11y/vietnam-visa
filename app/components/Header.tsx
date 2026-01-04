'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import { useFavorites } from '@/lib/favorites'
import { useLocale } from '@/lib/i18n/context'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { favorites } = useFavorites()
  const pathname = usePathname()
  const { locale } = useLocale()

  const labels = {
    ru: {
      visa: 'Визы',
      rent: 'Аренда',
      map: 'Карта',
      blog: 'Блог',
      favorites: 'Избранное',
      menu: 'Меню',
      cta: 'Рассчитать визу',
    },
    en: {
      visa: 'Visas',
      rent: 'Rentals',
      map: 'Map',
      blog: 'Blog',
      favorites: 'Favorites',
      menu: 'Menu',
      cta: 'Calculate Visa',
    },
    vi: {
      visa: 'Visa',
      rent: 'Thuê nhà',
      map: 'Bản đồ',
      blog: 'Blog',
      favorites: 'Yêu thích',
      menu: 'Menu',
      cta: 'Tính toán Visa',
    },
  }

  const t = labels[locale as keyof typeof labels] || labels.ru

  const menuItems = [
    { href: '/visa', label: t.visa, icon: '📋' },
    { href: '/rent', label: t.rent, icon: '🏠' },
    { href: '/rent/map', label: t.map, icon: '🗺️' },
    { href: '/blog', label: t.blog, icon: '📖' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleMenuClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header id="header" className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/50 dark:border-slate-700/50 transition-all">
        <Link href="/" className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white">
          <span>🇻🇳</span>
          <span className="bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 bg-clip-text text-transparent">
            VietVisa
          </span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                isActive(item.href)
                  ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/rent/favorites"
            className={`relative w-10 h-10 flex items-center justify-center rounded-full transition ${
              favorites.length > 0
                ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
            title={t.favorites}
          >
            <svg className="w-5 h-5" fill={favorites.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {favorites.length > 9 ? '9+' : favorites.length}
              </span>
            )}
          </Link>
          <ThemeToggle />
          <LanguageSwitcher />
          <Link
            href="/visa#calculator"
            className="px-4 py-2.5 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 text-white font-bold rounded-xl hover:shadow-lg active:scale-[0.98] transition text-sm"
          >
            {t.cta}
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/rent/favorites"
            className={`relative w-10 h-10 flex items-center justify-center rounded-full transition ${
              favorites.length > 0
                ? 'text-red-500 dark:text-red-400'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <svg className="w-5 h-5" fill={favorites.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favorites.length > 9 ? '9+' : favorites.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-5 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/50 dark:bg-black/70 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-slate-800 z-50 md:hidden transform transition-transform duration-300 shadow-2xl ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold dark:text-white">{t.menu}</span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-2xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition"
              >
                ×
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleMenuClick}
                className={`flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-xl transition ${
                  isActive(item.href)
                    ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            <Link
              href="/rent/favorites"
              onClick={handleMenuClick}
              className={`flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-xl transition ${
                isActive('/rent/favorites')
                  ? 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              <svg className="w-5 h-5" fill={favorites.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{t.favorites}</span>
              {favorites.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-sm font-bold px-2 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
            <LanguageSwitcher />
          </div>

          <Link
            href="/visa#calculator"
            onClick={handleMenuClick}
            className="mt-6 block w-full py-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 text-white font-bold rounded-xl text-center hover:shadow-lg active:scale-[0.98] transition"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </>
  )
}
