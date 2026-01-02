'use client'

import Link from 'next/link'
import { useState } from 'react'

const initialVisaTypes = [
  { id: '1', icon: '🆓', name: 'Безвизовый въезд', duration: 'до 45 дней', price: 0, priceNote: 'Бесплатно', isPopular: false, isActive: true },
  { id: '2', icon: '💻', name: 'E-Visa', duration: 'до 90 дней', price: 25, priceNote: 'от $25', isPopular: true, isActive: true },
  { id: '3', icon: '✈️', name: 'Виза по прилёту', duration: 'до 30 дней', price: 50, priceNote: 'от $50', isPopular: false, isActive: true },
  { id: '4', icon: '🔄', name: 'Продление визы', duration: '+30/90 дней', price: 100, priceNote: 'от $100', isPopular: false, isActive: true },
]

export default function VisaTypesPage() {
  const [visaTypes, setVisaTypes] = useState(initialVisaTypes)

  const toggleActive = (id: string) => {
    setVisaTypes(visaTypes.map(v =>
      v.id === id ? { ...v, isActive: !v.isActive } : v
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Типы виз</h1>
          <p className="text-gray-500">Управление типами виз на сайте</p>
        </div>
        <Link
          href="/admin/visa-types/new"
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
        >
          + Добавить тип
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Тип визы</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Срок</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Цена</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Популярная</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Статус</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {visaTypes.map((visa) => (
              <tr key={visa.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{visa.icon}</span>
                    <span className="font-medium">{visa.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{visa.duration}</td>
                <td className="px-6 py-4 text-gray-600">{visa.priceNote}</td>
                <td className="px-6 py-4 text-center">
                  {visa.isPopular && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Да
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => toggleActive(visa.id)}
                    className={`px-3 py-1 text-xs rounded-full ${
                      visa.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {visa.isActive ? 'Активна' : 'Скрыта'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/visa-types/${visa.id}`}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Редактировать
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
