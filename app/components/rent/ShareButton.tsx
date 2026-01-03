'use client'

import { useState } from 'react'

interface ShareButtonProps {
  url: string
  title: string
  className?: string
}

export function ShareButton({ url, title, className = '' }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: '💬',
      color: 'hover:bg-green-50 dark:hover:bg-green-900/30',
      onClick: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title}\n${fullUrl}`)}`, '_blank')
        setIsOpen(false)
      },
    },
    {
      name: 'Telegram',
      icon: '✈️',
      color: 'hover:bg-blue-50 dark:hover:bg-blue-900/30',
      onClick: () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`, '_blank')
        setIsOpen(false)
      },
    },
    {
      name: 'Копировать',
      icon: copied ? '✓' : '📋',
      color: copied ? 'bg-green-50 dark:bg-green-900/30' : 'hover:bg-gray-50 dark:hover:bg-slate-700',
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(fullUrl)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (e) {
          console.error('Failed to copy:', e)
        }
      },
    },
  ]

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: fullUrl,
        })
      } catch (e) {
        // User cancelled or error
      }
    } else {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleNativeShare}
        className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Поделиться"
      >
        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 z-50 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 py-2 min-w-[160px]">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.onClick}
                className={`w-full px-4 py-2.5 flex items-center gap-3 text-left text-gray-700 dark:text-gray-200 transition ${option.color}`}
              >
                <span className="text-lg">{option.icon}</span>
                <span className="text-sm font-medium">{option.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
