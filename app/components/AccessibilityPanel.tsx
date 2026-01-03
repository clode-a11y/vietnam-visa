'use client'

import { useState, useEffect } from 'react'

type FontSize = 'normal' | 'large' | 'xlarge'

type ThemeMode = 'light' | 'dark' | 'system'

interface AccessibilitySettings {
  highContrast: boolean
  fontSize: FontSize
  reduceMotion: boolean
  dyslexiaFont: boolean
  theme: ThemeMode
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  fontSize: 'normal',
  reduceMotion: false,
  dyslexiaFont: false,
  theme: 'system',
}

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-settings')
    if (saved) {
      const parsed = JSON.parse(saved) as AccessibilitySettings
      setSettings(parsed)
      applySettings(parsed)
    }
  }, [])

  // Apply settings to document
  const applySettings = (s: AccessibilitySettings) => {
    const html = document.documentElement

    // High contrast
    html.classList.toggle('high-contrast', s.highContrast)

    // Font size
    html.classList.remove('font-large', 'font-xlarge')
    if (s.fontSize === 'large') html.classList.add('font-large')
    if (s.fontSize === 'xlarge') html.classList.add('font-xlarge')

    // Reduce motion
    html.classList.toggle('reduce-motion', s.reduceMotion)

    // Dyslexia font
    html.classList.toggle('dyslexia-font', s.dyslexiaFont)

    // Theme
    html.classList.remove('dark', 'light')
    if (s.theme === 'dark') {
      html.classList.add('dark')
    } else if (s.theme === 'light') {
      html.classList.add('light')
    } else {
      // System preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark')
      }
    }
  }

  // Update and save settings
  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    applySettings(newSettings)
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings))
  }

  // Reset all settings
  const resetSettings = () => {
    setSettings(defaultSettings)
    applySettings(defaultSettings)
    localStorage.removeItem('accessibility-settings')
  }

  const fontSizeLabels: Record<FontSize, string> = {
    normal: 'A',
    large: 'A+',
    xlarge: 'A++',
  }

  const themeLabels: Record<ThemeMode, { icon: string; label: string }> = {
    light: { icon: '☀️', label: 'Светлая' },
    dark: { icon: '🌙', label: 'Тёмная' },
    system: { icon: '💻', label: 'Авто' },
  }

  return (
    <>
      {/* Accessibility toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 bottom-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Настройки доступности"
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>

      {/* Panel overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Accessibility panel */}
      <div
        id="accessibility-panel"
        role="dialog"
        aria-label="Панель настроек доступности"
        aria-modal="true"
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Доступность
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
              aria-label="Закрыть панель"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Settings */}
          <div className="space-y-6">
            {/* Theme */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Тема оформления
              </label>
              <div className="flex gap-2">
                {(['light', 'dark', 'system'] as ThemeMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => updateSetting('theme', mode)}
                    className={`flex-1 py-3 px-2 rounded-xl font-medium text-sm transition flex flex-col items-center gap-1 ${
                      settings.theme === mode
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-pressed={settings.theme === mode}
                  >
                    <span className="text-lg">{themeLabels[mode].icon}</span>
                    <span>{themeLabels[mode].label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Размер шрифта
              </label>
              <div className="flex gap-2">
                {(['normal', 'large', 'xlarge'] as FontSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => updateSetting('fontSize', size)}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-lg transition ${
                      settings.fontSize === size
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-pressed={settings.fontSize === size}
                  >
                    {fontSizeLabels[size]}
                  </button>
                ))}
              </div>
            </div>

            {/* High contrast */}
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Высокий контраст
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Черно-белые цвета
                </p>
              </div>
              <button
                onClick={() => updateSetting('highContrast', !settings.highContrast)}
                className={`relative w-14 h-8 rounded-full transition ${
                  settings.highContrast ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={settings.highContrast}
                aria-label="Включить высокий контраст"
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    settings.highContrast ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            {/* Reduce motion */}
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Отключить анимации
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Убрать движущиеся элементы
                </p>
              </div>
              <button
                onClick={() => updateSetting('reduceMotion', !settings.reduceMotion)}
                className={`relative w-14 h-8 rounded-full transition ${
                  settings.reduceMotion ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={settings.reduceMotion}
                aria-label="Отключить анимации"
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    settings.reduceMotion ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            {/* Dyslexia font */}
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Шрифт для дислексии
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Удобочитаемый шрифт
                </p>
              </div>
              <button
                onClick={() => updateSetting('dyslexiaFont', !settings.dyslexiaFont)}
                className={`relative w-14 h-8 rounded-full transition ${
                  settings.dyslexiaFont ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={settings.dyslexiaFont}
                aria-label="Включить шрифт для дислексии"
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    settings.dyslexiaFont ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            {/* Reset button */}
            <button
              onClick={resetSettings}
              className="w-full py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
            >
              Сбросить настройки
            </button>
          </div>

          {/* Keyboard shortcuts info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              Горячие клавиши
            </h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li><kbd className="px-1.5 py-0.5 bg-blue-100 rounded">Tab</kbd> — навигация</li>
              <li><kbd className="px-1.5 py-0.5 bg-blue-100 rounded">Enter</kbd> — активация</li>
              <li><kbd className="px-1.5 py-0.5 bg-blue-100 rounded">Esc</kbd> — закрыть</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
