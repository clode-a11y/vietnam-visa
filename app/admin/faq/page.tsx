'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  isActive: boolean
}

const categoryLabels: Record<string, string> = {
  general: 'Общие',
  evisa: 'E-Visa',
  voa: 'Виза по прилёту',
  work: 'Рабочая виза',
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faq')
      if (res.ok) {
        const data = await res.json()
        setFaqs(data)
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredFaqs = filter === 'all'
    ? faqs
    : faqs.filter(f => f.category === filter)

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/faq/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      })
      if (res.ok) {
        setFaqs(faqs.map(f =>
          f.id === id ? { ...f, isActive: !currentStatus } : f
        ))
      }
    } catch (error) {
      console.error('Error toggling status:', error)
    }
  }

  const deleteFaq = async (id: string) => {
    if (!confirm('Удалить этот вопрос?')) return

    try {
      const res = await fetch(`/api/faq/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setFaqs(faqs.filter(f => f.id !== id))
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error)
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ</h1>
          <p className="text-gray-500">Управление частыми вопросами ({faqs.length})</p>
        </div>
        <Link
          href="/admin/faq/new"
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
        >
          + Добавить вопрос
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            filter === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Все ({faqs.length})
        </button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === key ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {label} ({faqs.filter(f => f.category === key).length})
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-500">
            Нет вопросов. <Link href="/admin/faq/new" className="text-green-600 hover:underline">Добавить первый</Link>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="text-gray-400 text-sm w-6 flex-shrink-0">{index + 1}.</span>
                <div className="min-w-0">
                  <p className="font-medium truncate">{faq.question}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {categoryLabels[faq.category] || faq.category}
                    </span>
                    <span className="text-xs text-gray-400 truncate">
                      {faq.answer.substring(0, 50)}...
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => toggleActive(faq.id, faq.isActive)}
                  className={`px-3 py-1 text-xs rounded-full transition ${
                    faq.isActive
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {faq.isActive ? 'Опубликован' : 'Скрыт'}
                </button>
                <Link
                  href={`/admin/faq/${faq.id}`}
                  className="text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Редактировать
                </Link>
                <button
                  onClick={() => deleteFaq(faq.id)}
                  className="text-red-500 hover:text-red-700 font-medium text-sm"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
