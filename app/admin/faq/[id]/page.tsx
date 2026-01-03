'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditFAQPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'general',
    isActive: true,
  })

  useEffect(() => {
    fetchFaq()
  }, [id])

  const fetchFaq = async () => {
    try {
      const res = await fetch(`/api/faq/${id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          question: data.question || '',
          answer: data.answer || '',
          category: data.category || 'general',
          isActive: data.isActive ?? true,
        })
      } else {
        setError('Вопрос не найден')
      }
    } catch (err) {
      setError('Ошибка загрузки данных')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/faq/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Failed to update FAQ')
      }

      router.push('/admin/faq')
      router.refresh()
    } catch (err) {
      setError('Ошибка при сохранении. Попробуйте ещё раз.')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Удалить этот вопрос?')) return

    try {
      const res = await fetch(`/api/faq/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.push('/admin/faq')
        router.refresh()
      }
    } catch (err) {
      setError('Ошибка при удалении')
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link href="/admin/faq" className="text-gray-500 hover:text-gray-700 text-sm">
          ← Назад к списку
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Редактировать вопрос</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Вопрос *
          </label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            placeholder="Нужна ли виза гражданам России?"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ответ *
          </label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Граждане РФ могут въезжать во Вьетнам без визы на срок до 45 дней..."
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Категория
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="general">Общие вопросы</option>
            <option value="evisa">E-Visa</option>
            <option value="voa">Виза по прилёту</option>
            <option value="work">Рабочая виза</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm font-medium text-gray-700">Опубликован</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition disabled:opacity-50"
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
          <Link
            href="/admin/faq"
            className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
          >
            Отмена
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition ml-auto"
          >
            Удалить
          </button>
        </div>
      </form>
    </div>
  )
}
