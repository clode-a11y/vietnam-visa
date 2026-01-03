'use client'

import { useState, useEffect } from 'react'

interface District {
  id: string
  nameRu: string
  nameEn: string
  nameVi: string
  description: string | null
  order: number
  isActive: boolean
  _count?: {
    apartments: number
  }
}

export default function DistrictsPage() {
  const [districts, setDistricts] = useState<District[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nameRu: '',
    nameEn: '',
    nameVi: '',
    description: '',
    order: '0',
    isActive: true,
  })

  useEffect(() => {
    fetchDistricts()
  }, [])

  const fetchDistricts = async () => {
    try {
      const res = await fetch('/api/admin/districts')
      if (res.ok) {
        const data = await res.json()
        setDistricts(data)
      }
    } catch (error) {
      console.error('Error fetching districts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const url = editingId
      ? `/api/admin/districts/${editingId}`
      : '/api/admin/districts'
    const method = editingId ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          order: parseInt(formData.order) || 0,
        }),
      })

      if (res.ok) {
        fetchDistricts()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving district:', error)
    }
  }

  const handleEdit = (district: District) => {
    setEditingId(district.id)
    setFormData({
      nameRu: district.nameRu,
      nameEn: district.nameEn,
      nameVi: district.nameVi,
      description: district.description || '',
      order: district.order.toString(),
      isActive: district.isActive,
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить район? Все квартиры в этом районе также будут удалены!')) return

    try {
      const res = await fetch(`/api/admin/districts/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setDistricts(districts.filter(d => d.id !== id))
      }
    } catch (error) {
      console.error('Error deleting district:', error)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      nameRu: '',
      nameEn: '',
      nameVi: '',
      description: '',
      order: '0',
      isActive: true,
    })
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Районы</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Редактировать район' : 'Добавить район'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название (RU) *
              </label>
              <input
                type="text"
                required
                value={formData.nameRu}
                onChange={(e) => setFormData({ ...formData, nameRu: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Центр"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название (EN) *
              </label>
              <input
                type="text"
                required
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Center"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название (VI) *
              </label>
              <input
                type="text"
                required
                value={formData.nameVi}
                onChange={(e) => setFormData({ ...formData, nameVi: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Trung tâm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Порядок
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded text-blue-600"
                  />
                  <span className="text-gray-700">Активен</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition"
                >
                  Отмена
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
              >
                {editingId ? 'Сохранить' : 'Добавить'}
              </button>
            </div>
          </form>
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {districts.length === 0 ? (
            <div className="p-8 text-center">
              <span className="text-4xl block mb-4">📍</span>
              <p className="text-gray-600">Районы пока не добавлены</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Район</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Квартир</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {districts.map((district) => (
                  <tr key={district.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{district.nameRu}</div>
                      <div className="text-sm text-gray-500">{district.nameEn}</div>
                      {!district.isActive && (
                        <span className="text-xs text-red-600">Неактивен</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {district._count?.apartments || 0}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleEdit(district)}
                          className="px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(district.id)}
                          className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
