'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUploader from '@/components/admin/ImageUploader'
import AmenitySelector from '@/components/admin/AmenitySelector'

interface District {
  id: string
  nameRu: string
}

interface ApartmentImage {
  id: string
  url: string
  order: number
  isCover: boolean
}

interface Amenity {
  id: string
  nameRu: string
  nameEn: string
  icon: string
  category: string
}

export default function EditApartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [districts, setDistricts] = useState<District[]>([])
  const [images, setImages] = useState<ApartmentImage[]>([])
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    titleRu: '',
    titleEn: '',
    titleVi: '',
    descriptionRu: '',
    descriptionEn: '',
    descriptionVi: '',
    priceUsd: '',
    priceVnd: '',
    rooms: '1',
    area: '',
    floor: '',
    totalFloors: '',
    address: '',
    lat: '',
    lng: '',
    districtId: '',
    isAvailable: true,
    canShow: true,
    hasVideo: false,
  })

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      const [apartmentRes, districtsRes] = await Promise.all([
        fetch(`/api/admin/apartments/${id}`),
        fetch('/api/admin/districts'),
      ])

      if (apartmentRes.ok) {
        const apartment = await apartmentRes.json()
        setFormData({
          titleRu: apartment.titleRu || '',
          titleEn: apartment.titleEn || '',
          titleVi: apartment.titleVi || '',
          descriptionRu: apartment.descriptionRu || '',
          descriptionEn: apartment.descriptionEn || '',
          descriptionVi: apartment.descriptionVi || '',
          priceUsd: apartment.priceUsd?.toString() || '',
          priceVnd: apartment.priceVnd?.toString() || '',
          rooms: apartment.rooms?.toString() || '1',
          area: apartment.area?.toString() || '',
          floor: apartment.floor?.toString() || '',
          totalFloors: apartment.totalFloors?.toString() || '',
          address: apartment.address || '',
          lat: apartment.lat?.toString() || '',
          lng: apartment.lng?.toString() || '',
          districtId: apartment.districtId || '',
          isAvailable: apartment.isAvailable ?? true,
          canShow: apartment.canShow ?? true,
          hasVideo: apartment.hasVideo ?? false,
        })
        // Set images from apartment data
        if (apartment.images) {
          setImages(apartment.images)
        }
        // Set amenities from apartment data
        if (apartment.amenities) {
          setAmenities(apartment.amenities.map((aa: { amenity: Amenity }) => aa.amenity))
        }
      }

      if (districtsRes.ok) {
        const data = await districtsRes.json()
        setDistricts(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`/api/admin/apartments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          priceUsd: parseInt(formData.priceUsd) || 0,
          priceVnd: parseInt(formData.priceVnd) || 0,
          rooms: parseInt(formData.rooms) || 1,
          area: parseFloat(formData.area) || 0,
          floor: formData.floor ? parseInt(formData.floor) : null,
          totalFloors: formData.totalFloors ? parseInt(formData.totalFloors) : null,
          lat: parseFloat(formData.lat) || 12.2388,
          lng: parseFloat(formData.lng) || 109.1967,
        }),
      })

      if (res.ok) {
        router.push('/admin/apartments')
      } else {
        alert('Ошибка при сохранении')
      }
    } catch (error) {
      console.error('Error saving apartment:', error)
      alert('Ошибка при сохранении')
    } finally {
      setSaving(false)
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
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/apartments"
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          ← Назад
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Редактировать квартиру</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Основная информация</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название (RU) *</label>
              <input
                type="text"
                required
                value={formData.titleRu}
                onChange={(e) => setFormData({ ...formData, titleRu: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название (EN)</label>
              <input
                type="text"
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название (VI)</label>
              <input
                type="text"
                value={formData.titleVi}
                onChange={(e) => setFormData({ ...formData, titleVi: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Описание (RU) *</label>
              <textarea
                required
                value={formData.descriptionRu}
                onChange={(e) => setFormData({ ...formData, descriptionRu: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Описание (EN)</label>
              <textarea
                value={formData.descriptionEn}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Описание (VI)</label>
              <textarea
                value={formData.descriptionVi}
                onChange={(e) => setFormData({ ...formData, descriptionVi: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Параметры</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Район *</label>
              <select
                required
                value={formData.districtId}
                onChange={(e) => setFormData({ ...formData, districtId: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Выберите район</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>{d.nameRu}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Цена (USD) *</label>
                <input
                  type="number"
                  required
                  value={formData.priceUsd}
                  onChange={(e) => setFormData({ ...formData, priceUsd: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Цена (VND)</label>
                <input
                  type="number"
                  value={formData.priceVnd}
                  onChange={(e) => setFormData({ ...formData, priceVnd: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Комнат *</label>
                <select
                  value={formData.rooms}
                  onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="0">Студия</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Площадь (м²) *</label>
                <input
                  type="number"
                  required
                  step="0.1"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Этаж</label>
                <input
                  type="number"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Всего этажей</label>
                <input
                  type="number"
                  value={formData.totalFloors}
                  onChange={(e) => setFormData({ ...formData, totalFloors: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Адрес *</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Широта</label>
                <input
                  type="number"
                  step="any"
                  value={formData.lat}
                  onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Долгота</label>
                <input
                  type="number"
                  step="any"
                  value={formData.lng}
                  onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Статус</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="w-5 h-5 rounded text-blue-600"
                />
                <span className="text-gray-700">Свободна</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.canShow}
                  onChange={(e) => setFormData({ ...formData, canShow: e.target.checked })}
                  className="w-5 h-5 rounded text-blue-600"
                />
                <span className="text-gray-700">Можно показать</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasVideo}
                  onChange={(e) => setFormData({ ...formData, hasVideo: e.target.checked })}
                  className="w-5 h-5 rounded text-blue-600"
                />
                <span className="text-gray-700">Есть видео</span>
              </label>
            </div>
          </div>
        </div>

        {/* Photos section */}
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Фотографии</h2>
          <ImageUploader
            apartmentId={id}
            images={images}
            onImagesChange={setImages}
          />
        </div>

        {/* Amenities section */}
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Удобства</h2>
          <AmenitySelector
            apartmentId={id}
            selectedAmenities={amenities}
            onAmenitiesChange={setAmenities}
          />
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
          <Link href="/admin/apartments" className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition">
            Отмена
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  )
}
