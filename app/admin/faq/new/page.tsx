'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewFAQPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    router.push('/admin/faq')
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link href="/admin/faq" className="text-gray-500 hover:text-gray-700 text-sm">
          ← Назад к списку
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Новый вопрос FAQ</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Вопрос
          </label>
          <input
            type="text"
            required
            placeholder="Нужна ли виза россиянам во Вьетнам?"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ответ
          </label>
          <textarea
            rows={5}
            required
            placeholder="Россияне могут въезжать во Вьетнам без визы на срок до 45 дней..."
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Категория
          </label>
          <select className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option value="general">Общие</option>
            <option value="documents">Документы</option>
            <option value="process">Процесс</option>
            <option value="payment">Оплата</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
            <span className="text-sm font-medium text-gray-700">Опубликовать сразу</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
          <Link
            href="/admin/faq"
            className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  )
}
