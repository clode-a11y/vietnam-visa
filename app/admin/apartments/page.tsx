'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Apartment {
  id: string
  titleRu: string
  titleEn: string
  priceUsd: number
  rooms: number
  area: number
  isAvailable: boolean
  canShow: boolean
  district: {
    nameRu: string
  }
  createdAt: string
}

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApartments()
  }, [])

  const fetchApartments = async () => {
    try {
      const res = await fetch('/api/admin/apartments')
      if (res.ok) {
        const data = await res.json()
        setApartments(data)
      }
    } catch (error) {
      console.error('Error fetching apartments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить квартиру?')) return

    try {
      const res = await fetch(`/api/admin/apartments/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setApartments(apartments.filter(a => a.id !== id))
      }
    } catch (error) {
      console.error('Error deleting apartment:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Квартиры</h1>
        <Link
          href="/admin/apartments/new"
          className="px-4 py-2 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition"
        >
          + Добавить квартиру
        </Link>
      </div>

      {apartments.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center">
          <span className="text-4xl block mb-4">🏠</span>
          <p className="text-gray-600 mb-4">Квартиры пока не добавлены</p>
          <Link
            href="/admin/apartments/new"
            className="inline-block px-4 py-2 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition"
          >
            Добавить первую квартиру
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Название</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Район</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Цена</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Комнат</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Статус</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {apartments.map((apartment) => (
                <tr key={apartment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{apartment.titleRu}</div>
                    <div className="text-sm text-gray-500">{apartment.area} м²</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {apartment.district?.nameRu || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-teal-600">${apartment.priceUsd}</span>
                    <span className="text-gray-500">/мес</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{apartment.rooms}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {apartment.isAvailable ? (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full w-fit">
                          Свободна
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full w-fit">
                          Занята
                        </span>
                      )}
                      {!apartment.canShow && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full w-fit">
                          Нельзя показать
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/apartments/${apartment.id}`}
                        className="px-3 py-1.5 text-sm text-teal-600 hover:bg-teal-50 rounded-lg transition"
                      >
                        Редактировать
                      </Link>
                      <button
                        onClick={() => handleDelete(apartment.id)}
                        className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
