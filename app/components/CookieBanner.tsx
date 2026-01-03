'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 text-center sm:text-left">
          Мы используем cookies для улучшения работы сайта.{' '}
          <Link href="/privacy" className="text-green-600 hover:underline">
            Подробнее
          </Link>
        </p>
        <div className="flex gap-3">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
          >
            Отклонить
          </button>
          <button
            onClick={accept}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold rounded-full hover:shadow-lg transition"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  )
}
