'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface VisaType {
  id: string
  icon: string
  nameRu: string
  duration: string
  price: number
  isPopular: boolean
  isActive: boolean
}

export default function VisaTypesPage() {
  const [visaTypes, setVisaTypes] = useState<VisaType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVisaTypes()
  }, [])

  const fetchVisaTypes = async () => {
    try {
      const res = await fetch('/api/visa-types')
      if (res.ok) {
        const data = await res.json()
        setVisaTypes(data)
      }
    } catch (error) {
      console.error('Error fetching visa types:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/visa-types/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      })
      if (res.ok) {
        setVisaTypes(visaTypes.map(v =>
          v.id === id ? { ...v, isActive: !currentStatus } : v
        ))
      }
    } catch (error) {
      console.error('Error toggling status:', error)
    }
  }

  const deleteVisaType = async (id: string) => {
    if (!confirm('Удалить этот тип визы?')) return

    try {
      const res = await fetch(`/api/visa-types/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setVisaTypes(visaTypes.filter(v => v.id !== id))
      }
    } catch (error) {
      console.error('Error deleting visa type:', error)
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
          <h1 className="text-2xl font-bold text-gray-900">Типы виз</h1>
          <p className="text-gray-500">Управление типами виз на сайте ({visaTypes.length})</p>
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
            {visaTypes.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  Нет типов виз. <Link href="/admin/visa-types/new" className="text-green-600 hover:underline">Добавить первый</Link>
                </td>
              </tr>
            ) : (
              visaTypes.map((visa) => (
                <tr key={visa.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{visa.icon}</span>
                      <span className="font-medium">{visa.nameRu}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{visa.duration}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {visa.price === 0 ? 'Бесплатно' : `$${visa.price}`}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {visa.isPopular && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Да
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleActive(visa.id, visa.isActive)}
                      className={`px-3 py-1 text-xs rounded-full transition ${
                        visa.isActive
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {visa.isActive ? 'Активна' : 'Скрыта'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link
                      href={`/admin/visa-types/${visa.id}`}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Редактировать
                    </Link>
                    <button
                      onClick={() => deleteVisaType(visa.id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
