'use client'

import { useState } from 'react'
import { useLocale } from '@/lib/i18n/context'
import { translations } from '@/lib/i18n/translations'

interface ViewingRequestModalProps {
  isOpen: boolean
  onClose: () => void
  apartmentId: string
  apartmentTitle: string
  type: 'viewing' | 'video_call'
}

export function ViewingRequestModal({
  isOpen,
  onClose,
  apartmentId,
  apartmentTitle,
  type,
}: ViewingRequestModalProps) {
  const { locale } = useLocale()
  const t = (key: string) => translations[locale][key] || key
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    messenger: 'whatsapp',
    date: '',
    comment: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/rent/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          apartmentId,
          type,
        }),
      })

      if (res.ok) {
        setStatus('success')
        setTimeout(() => {
          onClose()
          setStatus('idle')
          setFormData({ name: '', phone: '', messenger: 'whatsapp', date: '', comment: '' })
        }, 2000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b dark:border-slate-700 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {type === 'viewing' ? t('rent.request.title') : t('rent.request.videoTitle')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition"
            >
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{apartmentTitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('rent.request.name')} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border dark:border-slate-600 rounded-xl text-base bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('rent.request.phone')} *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border dark:border-slate-600 rounded-xl text-base bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="+7 999 123 4567"
            />
          </div>

          {/* Messenger */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('rent.request.messenger')}
            </label>
            <div className="flex gap-2">
              {['whatsapp', 'telegram', 'zalo'].map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setFormData({ ...formData, messenger: m })}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-sm font-medium transition ${
                    formData.messenger === m
                      ? 'bg-teal-50 dark:bg-teal-900/50 border-teal-500 text-teal-700 dark:text-teal-300'
                      : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  {m === 'whatsapp' ? 'WhatsApp' : m === 'telegram' ? 'Telegram' : 'Zalo'}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('rent.request.preferredDate')}
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 border dark:border-slate-600 rounded-xl text-base bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('rent.request.comment')}
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border dark:border-slate-600 rounded-xl text-base bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full py-3.5 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 text-white font-bold rounded-xl hover:shadow-lg active:scale-[0.98] transition disabled:opacity-50"
          >
            {status === 'loading' ? '...' : status === 'success' ? '✓' : t('rent.request.submit')}
          </button>

          {/* Status messages */}
          {status === 'success' && (
            <p className="text-center text-green-600 dark:text-green-400 text-sm">{t('rent.request.success')}</p>
          )}
          {status === 'error' && (
            <p className="text-center text-red-600 dark:text-red-400 text-sm">{t('rent.request.error')}</p>
          )}
        </form>
      </div>
    </div>
  )
}
