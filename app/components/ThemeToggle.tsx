'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check initial theme
    const html = document.documentElement
    const savedSettings = localStorage.getItem('accessibility-settings')

    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      if (settings.theme === 'dark') {
        setIsDark(true)
      } else if (settings.theme === 'system') {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
      }
    } else {
      setIsDark(html.classList.contains('dark'))
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    const newIsDark = !isDark
    setIsDark(newIsDark)

    // Update class
    html.classList.remove('dark', 'light')
    html.classList.add(newIsDark ? 'dark' : 'light')

    // Update localStorage - merge with defaults to ensure complete settings
    const defaultSettings = {
      highContrast: false,
      fontSize: 'normal',
      reduceMotion: false,
      dyslexiaFont: false,
      theme: 'system',
    }
    const savedSettings = localStorage.getItem('accessibility-settings')
    const parsed = savedSettings ? JSON.parse(savedSettings) : {}
    const settings = { ...defaultSettings, ...parsed, theme: newIsDark ? 'dark' : 'light' }
    localStorage.setItem('accessibility-settings', JSON.stringify(settings))
  }

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
        aria-label="Переключить тему"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}
