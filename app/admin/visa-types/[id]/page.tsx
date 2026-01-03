'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditVisaTypePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    nameRu: '',
    nameEn: '',
    icon: '',
    duration: '',
    price: '',
    description: '',
    isPopular: false,
    isActive: true,
  })

  useEffect(() => {
    fetchVisaType()
  }, [id])

  const fetchVisaType = async () => {
    try {
      const res = await fetch(`/api/visa-types/${id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          nameRu: data.nameRu || '',
          nameEn: data.nameEn || '',
          icon: data.icon || '',
          duration: data.duration || '',
          price: data.price?.toString() || '0',
          description: data.description || '',
          isPopular: data.isPopular || false,
          isActive: data.isActive ?? true,
        })
      } else {
        setError('Тип визы не найден')
      }
    } catch (err) {
      setError('Ошибка загрузки данных')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const res = await fetch(`/api/visa-types/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price) || 0,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to update visa type')
      }

      router.push('/admin/visa-types')
      router.refresh()
    } catch (err) {
      setError('Ошибка при сохранении. Попробуйте ещё раз.')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Удалить этот тип визы?')) return

    try {
      const res = await fetch(`/api/visa-types/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.push('/admin/visa-types')
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
        <Link href="/admin/visa-types" className="text-gray-500 hover:text-gray-700 text-sm">
          ← Назад к списку
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Редактировать тип визы</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название (RU) *
            </label>
            <input
              type="text"
              name="nameRu"
              value={formData.nameRu}
              onChange={handleChange}
              required
              placeholder="E-Visa"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название (EN)
            </label>
            <input
              type="text"
              name="nameEn"
              value={formData.nameEn}
              onChange={handleChange}
              placeholder="E-Visa"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Иконка (emoji)
            </label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="💻"
              maxLength={4}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-2xl text-center"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Срок действия *
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              placeholder="до 90 дней"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Цена (USD)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="25"
              min="0"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              &nbsp;
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-500 text-sm">
              0 = Бесплатно
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Электронная виза для туристов..."
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="col-span-2 flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700">Популярная</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700">Активна</span>
            </label>
          </div>
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
            href="/admin/visa-types"
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
