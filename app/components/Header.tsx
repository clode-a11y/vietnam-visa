'use client'

import Link from 'next/link'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import { useFavorites } from '@/lib/favorites'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { favorites } = useFavorites()

  const menuItems = [
    { href: '#features', label: 'Визы' },
    { href: '/rent', label: 'Аренда', isPage: true },
    { href: '#calculator', label: 'Калькулятор' },
    { href: '/blog', label: 'Блог', isPage: true },
    { href: '#contact', label: 'Заявка' },
  ]

  const handleMenuClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header id="header" className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/50 dark:border-slate-700/50 transition-all">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-gray-900 dark:text-white">
          <span>🇻🇳</span>
          VietVisa
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            item.isPage ? (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
              >
                {item.label}
              </a>
            )
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/rent/favorites"
            className="relative w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition"
            title="Избранное"
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
          <a
            href="#calculator"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white font-bold rounded-full hover:shadow-lg transition"
          >
            Рассчитать визу
          </a>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 -mr-2"
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isMenuOpen}
        >
          <span
            className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
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
            <span className="text-xl font-bold dark:text-white">Меню</span>
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

          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              item.isPage ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleMenuClick}
                  className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 border-b border-gray-100 dark:border-slate-700 transition"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleMenuClick}
                  className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 border-b border-gray-100 dark:border-slate-700 transition"
                >
                  {item.label}
                </a>
              )
            ))}
            <Link
              href="/rent/favorites"
              onClick={handleMenuClick}
              className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 font-medium py-2 border-b border-gray-100 dark:border-slate-700 transition"
            >
              <svg className="w-5 h-5" fill={favorites.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Избранное
              {favorites.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-sm font-bold px-2 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>

          <a
            href="#calculator"
            onClick={handleMenuClick}
            className="mt-8 block w-full py-4 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white font-bold rounded-xl text-center hover:shadow-lg transition"
          >
            Рассчитать визу
          </a>
        </div>
      </div>
    </>
  )
}
