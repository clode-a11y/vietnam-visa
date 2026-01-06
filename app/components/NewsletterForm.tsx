'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  variant?: 'inline' | 'card'
}

export default function NewsletterForm({ variant = 'card' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('Вы успешно подписались на рассылку!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Произошла ошибка. Попробуйте позже.')
      }
    } catch {
      setStatus('error')
      setMessage('Произошла ошибка. Попробуйте позже.')
    }
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ваш email"
          required
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 transition"
        >
          {status === 'loading' ? '...' : 'OK'}
        </button>
      </form>
    )
  }

  return (
    <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-white">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-4xl mb-4">📬</div>
        <h3 className="text-2xl font-bold mb-2">
          Подпишитесь на обновления
        </h3>
        <p className="text-teal-100 mb-6">
          Получайте уведомления об изменениях визовых правил и полезные советы для путешественников
        </p>

        {status === 'success' ? (
          <div className="bg-white/20 rounded-xl p-4">
            <p className="font-medium">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите ваш email"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-white text-teal-700 font-semibold rounded-xl hover:bg-teal-50 disabled:opacity-50 transition"
            >
              {status === 'loading' ? 'Подписка...' : 'Подписаться'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-4 text-red-200">{message}</p>
        )}

        <p className="text-xs text-teal-200 mt-4">
          Нажимая кнопку, вы соглашаетесь с{' '}
          <a href="/privacy" className="underline hover:text-white">политикой конфиденциальности</a>
        </p>
      </div>
    </div>
  )
}
