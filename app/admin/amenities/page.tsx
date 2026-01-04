'use client'

import { useState, useEffect } from 'react'

interface Amenity {
  id: string
  nameRu: string
  nameEn: string
  nameVi: string
  icon: string
  category: string
  _count?: {
    apartments: number
  }
}

const categories = [
  { value: 'general', label: 'Общее' },
  { value: 'kitchen', label: 'Кухня' },
  { value: 'bathroom', label: 'Ванная' },
  { value: 'building', label: 'Здание' },
  { value: 'bedroom', label: 'Спальня' },
  { value: 'entertainment', label: 'Развлечения' },
]

const popularIcons = ['🛋️', '📺', '❄️', '🍳', '🚿', '🛁', '🧺', '🅿️', '🏊', '💪', '🛗', '🔒', '📶', '🌡️', '☀️', '🌙']

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nameRu: '',
    nameEn: '',
    nameVi: '',
    icon: '✨',
    category: 'general',
  })

  useEffect(() => {
    fetchAmenities()
  }, [])

  const fetchAmenities = async () => {
    try {
      const res = await fetch('/api/admin/amenities')
      if (res.ok) {
        const data = await res.json()
        setAmenities(data)
      }
    } catch (error) {
      console.error('Error fetching amenities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const url = editingId
      ? `/api/admin/amenities/${editingId}`
      : '/api/admin/amenities'
    const method = editingId ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchAmenities()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving amenity:', error)
    }
  }

  const handleEdit = (amenity: Amenity) => {
    setEditingId(amenity.id)
    setFormData({
      nameRu: amenity.nameRu,
      nameEn: amenity.nameEn,
      nameVi: amenity.nameVi,
      icon: amenity.icon,
      category: amenity.category,
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить это удобство?')) return

    try {
      const res = await fetch(`/api/admin/amenities/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setAmenities(amenities.filter(a => a.id !== id))
      }
    } catch (error) {
      console.error('Error deleting amenity:', error)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      nameRu: '',
      nameEn: '',
      nameVi: '',
      icon: '✨',
      category: 'general',
    })
  }

  const groupedAmenities = amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = []
    }
    acc[amenity.category].push(amenity)
    return acc
  }, {} as Record<string, Amenity[]>)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Удобства</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Редактировать' : 'Добавить удобство'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Иконка
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {popularIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`w-10 h-10 text-xl rounded-lg border-2 transition ${
                      formData.icon === icon
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Или введите свою иконку"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Категория *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название (RU) *
              </label>
              <input
                type="text"
                required
                value={formData.nameRu}
                onChange={(e) => setFormData({ ...formData, nameRu: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Кондиционер"
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
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Air Conditioning"
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
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Điều hòa"
              />
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
                className="flex-1 px-4 py-2 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition"
              >
                {editingId ? 'Сохранить' : 'Добавить'}
              </button>
            </div>
          </form>
        </div>

        {/* List by categories */}
        <div className="lg:col-span-2 space-y-6">
          {amenities.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
              <span className="text-4xl block mb-4">✨</span>
              <p className="text-gray-600">Удобства пока не добавлены</p>
            </div>
          ) : (
            categories.map((cat) => {
              const catAmenities = groupedAmenities[cat.value] || []
              if (catAmenities.length === 0) return null

              return (
                <div key={cat.value} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b">
                    <h3 className="font-semibold text-gray-900">{cat.label}</h3>
                  </div>
                  <div className="divide-y">
                    {catAmenities.map((amenity) => (
                      <div
                        key={amenity.id}
                        className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{amenity.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">{amenity.nameRu}</div>
                            <div className="text-sm text-gray-500">{amenity.nameEn}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-400">
                            {amenity._count?.apartments || 0} квартир
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEdit(amenity)}
                              className="px-2 py-1 text-sm text-teal-600 hover:bg-teal-50 rounded transition"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDelete(amenity.id)}
                              className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
