'use client'

import Link from 'next/link'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: '#features', label: 'Типы виз' },
    { href: '#comparison', label: 'Сравнение' },
    { href: '#calculator', label: 'Калькулятор' },
    { href: '/blog', label: 'Блог', isPage: true },
    { href: '#contact', label: 'Заявка' },
  ]

  const handleMenuClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header id="header" className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-white/70 backdrop-blur-xl border-b border-white/50 transition-all">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-gray-900">
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
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {item.label}
              </a>
            )
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
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
            className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden transform transition-transform duration-300 shadow-2xl ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold">Меню</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-2xl text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              item.isPage ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleMenuClick}
                  className="text-lg text-gray-700 hover:text-green-600 font-medium py-2 border-b border-gray-100 transition"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleMenuClick}
                  className="text-lg text-gray-700 hover:text-green-600 font-medium py-2 border-b border-gray-100 transition"
                >
                  {item.label}
                </a>
              )
            ))}
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
