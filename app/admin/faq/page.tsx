'use client'

import Link from 'next/link'
import { useState } from 'react'

const categories = {
  general: 'Общие',
  documents: 'Документы',
  process: 'Процесс',
  payment: 'Оплата',
}

const initialFaqs = [
  { id: '1', question: 'Нужна ли виза россиянам во Вьетнам?', category: 'general', isActive: true },
  { id: '2', question: 'Сколько стоит электронная виза?', category: 'payment', isActive: true },
  { id: '3', question: 'Как долго оформляется виза?', category: 'process', isActive: true },
  { id: '4', question: 'Какие документы нужны для e-Visa?', category: 'documents', isActive: true },
  { id: '5', question: 'Можно ли продлить визу?', category: 'general', isActive: true },
]

export default function FAQPage() {
  const [faqs, setFaqs] = useState(initialFaqs)
  const [filter, setFilter] = useState('all')

  const filteredFaqs = filter === 'all'
    ? faqs
    : faqs.filter(f => f.category === filter)

  const toggleActive = (id: string) => {
    setFaqs(faqs.map(f =>
      f.id === id ? { ...f, isActive: !f.isActive } : f
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ</h1>
          <p className="text-gray-500">Управление частыми вопросами</p>
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
        {Object.entries(categories).map(([key, label]) => (
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
        {filteredFaqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm w-6">{index + 1}.</span>
              <div>
                <p className="font-medium">{faq.question}</p>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {categories[faq.category as keyof typeof categories]}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleActive(faq.id)}
                className={`px-3 py-1 text-xs rounded-full ${
                  faq.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
