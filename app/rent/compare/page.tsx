'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/app/components/Header'
import { useLocale } from '@/lib/i18n/context'
import { useCompare } from '@/lib/compare'
import { FavoriteButton } from '@/lib/favorites'

interface District {
  id: string
  nameRu: string
  nameEn: string
  nameVi: string
}

interface Amenity {
  id: string
  nameRu: string
  nameEn: string
  nameVi: string
  icon: string
}

interface Apartment {
  id: string
  titleRu: string
  titleEn: string
  titleVi: string
  priceUsd: number
  priceVnd: number
  rooms: number
  area: number
  floor: number | null
  totalFloors: number | null
  address: string
  isAvailable: boolean
  district: District
  images: { url: string; isCover: boolean }[]
  amenities: { amenity: Amenity }[]
}

export default function ComparePage() {
  const { locale } = useLocale()
  const { compareIds, removeFromCompare, clearCompare } = useCompare()
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (compareIds.length > 0) {
      fetchApartments()
    } else {
      setLoading(false)
    }
  }, [compareIds])

  const fetchApartments = async () => {
    try {
      const res = await fetch('/api/rent/apartments')
      if (res.ok) {
        const allApartments: Apartment[] = await res.json()
        const selected = compareIds
          .map(id => allApartments.find(apt => apt.id === id))
          .filter((apt): apt is Apartment => apt !== undefined)
        setApartments(selected)
      }
    } catch (error) {
      console.error('Error fetching apartments:', error)
    } finally {
      setLoading(false)
    }
  }

  const labels = {
    ru: {
      title: 'Сравнение квартир',
      empty: 'Нет квартир для сравнения',
      emptyDesc: 'Выберите квартиры для сравнения в каталоге',
      browse: 'Перейти в каталог',
      clear: 'Очистить',
      price: 'Цена',
      perMonth: '/мес',
      district: 'Район',
      rooms: 'Комнат',
      studio: 'Студия',
      area: 'Площадь',
      floor: 'Этаж',
      status: 'Статус',
      available: 'Свободна',
      occupied: 'Занята',
      amenities: 'Удобства',
      view: 'Подробнее',
      request: 'Заявка',
    },
    en: {
      title: 'Compare apartments',
      empty: 'No apartments to compare',
      emptyDesc: 'Select apartments for comparison in catalog',
      browse: 'Browse catalog',
      clear: 'Clear',
      price: 'Price',
      perMonth: '/mo',
      district: 'District',
      rooms: 'Rooms',
      studio: 'Studio',
      area: 'Area',
      floor: 'Floor',
      status: 'Status',
      available: 'Available',
      occupied: 'Occupied',
      amenities: 'Amenities',
      view: 'View details',
      request: 'Request',
    },
    vi: {
      title: 'So sánh căn hộ',
      empty: 'Không có căn hộ để so sánh',
      emptyDesc: 'Chọn căn hộ để so sánh trong danh mục',
      browse: 'Xem danh mục',
      clear: 'Xóa',
      price: 'Giá',
      perMonth: '/th',
      district: 'Quận',
      rooms: 'Phòng',
      studio: 'Studio',
      area: 'Diện tích',
      floor: 'Tầng',
      status: 'Tình trạng',
      available: 'Còn trống',
      occupied: 'Đã thuê',
      amenities: 'Tiện nghi',
      view: 'Xem chi tiết',
      request: 'Yêu cầu',
    },
  }

  const t = labels[locale as keyof typeof labels] || labels.en

  const getTitle = (apt: Apartment) => {
    if (locale === 'vi') return apt.titleVi
    if (locale === 'en') return apt.titleEn
    return apt.titleRu
  }

  const getDistrict = (d: District) => {
    if (locale === 'vi') return d.nameVi
    if (locale === 'en') return d.nameEn
    return d.nameRu
  }

  const getAmenityName = (a: Amenity) => {
    if (locale === 'vi') return a.nameVi
    if (locale === 'en') return a.nameEn
    return a.nameRu
  }

  const getCoverImage = (apt: Apartment) => {
    const cover = apt.images.find(img => img.isCover)
    return cover?.url || apt.images[0]?.url
  }

  // Get all unique amenity IDs across all apartments
  const allAmenityIds = [...new Set(apartments.flatMap(apt => apt.amenities.map(a => a.amenity.id)))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        </main>
      </div>
    )
  }

  if (apartments.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center">
            <span className="text-6xl block mb-4">📊</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.empty}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{t.emptyDesc}</p>
            <Link
              href="/rent/apartments"
              className="inline-block px-6 py-3 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 text-white font-bold rounded-xl hover:shadow-lg transition"
            >
              {t.browse}
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/rent/apartments"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ←
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t.title}
            </h1>
          </div>
          <button
            onClick={clearCompare}
            className="text-sm text-gray-500 hover:text-red-500 transition"
          >
            {t.clear}
          </button>
        </div>

        {/* Comparison table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="w-32 p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50"></th>
                  {apartments.map(apt => (
                    <th key={apt.id} className="p-4 text-left bg-gray-50 dark:bg-slate-700/50 min-w-[200px]">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(apt.id)}
                          className="absolute -top-1 -right-1 w-6 h-6 bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/50 transition text-sm"
                        >
                          ×
                        </button>
                        <Link href={`/rent/apartments/${apt.id}`} className="block group">
                          <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-2 bg-gray-200 dark:bg-slate-600">
                            {getCoverImage(apt) ? (
                              <Image
                                src={getCoverImage(apt)!}
                                alt={getTitle(apt)}
                                fill
                                className="object-cover group-hover:scale-105 transition"
                                sizes="200px"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-4xl">🏠</div>
                            )}
                            <FavoriteButton
                              apartmentId={apt.id}
                              className="absolute top-2 right-2"
                              size="sm"
                            />
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
                            {getTitle(apt)}
                          </h3>
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-slate-700">
                {/* Price */}
                <tr>
                  <td className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50">
                    {t.price}
                  </td>
                  {apartments.map(apt => (
                    <td key={apt.id} className="p-4">
                      <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                        ${apt.priceUsd}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{t.perMonth}</span>
                    </td>
                  ))}
                </tr>

                {/* District */}
                <tr>
                  <td className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50">
                    {t.district}
                  </td>
                  {apartments.map(apt => (
                    <td key={apt.id} className="p-4 text-gray-700 dark:text-gray-300">
                      {getDistrict(apt.district)}
                    </td>
                  ))}
                </tr>

                {/* Rooms */}
                <tr>
                  <td className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50">
                    {t.rooms}
                  </td>
                  {apartments.map(apt => (
                    <td key={apt.id} className="p-4 text-gray-700 dark:text-gray-300">
                      {apt.rooms === 0 ? t.studio : apt.rooms}
                    </td>
                  ))}
                </tr>

                {/* Area */}
                <tr>
                  <td className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50">
                    {t.area}
                  </td>
                  {apartments.map(apt => (
                    <td key={apt.id} className="p-4 text-gray-700 dark:text-gray-300">
                      {apt.area} м²
                    </td>
                  ))}
                </tr>

                {/* Floor */}
                <tr>
                  <td className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50">
                    {t.floor}
                  </td>
                  {apartments.map(apt => (
                    <td key={apt.id} className="p-4 text-gray-700 dark:text-gray-300">
                      {apt.floor && apt.totalFloors ? `${apt.floor}/${apt.totalFloors}` : '—'}
                    </td>
                  ))}
                </tr>

                {/* Status */}
                <tr>
                  <td className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50">
                    {t.status}
                  </td>
                  {apartments.map(apt => (
                    <td key={apt.id} className="p-4">
                      {apt.isAvailable ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                          ✓ {t.available}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
                          ✗ {t.occupied}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Amenities */}
                <tr>
                  <td className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50 align-top">
                    {t.amenities}
                  </td>
                  {apartments.map(apt => {
                    const aptAmenityIds = apt.amenities.map(a => a.amenity.id)
                    return (
                      <td key={apt.id} className="p-4 align-top">
                        <div className="flex flex-wrap gap-1">
                          {apt.amenities.slice(0, 8).map(({ amenity }) => (
                            <span
                              key={amenity.id}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                              title={getAmenityName(amenity)}
                            >
                              {amenity.icon}
                            </span>
                          ))}
                          {apt.amenities.length > 8 && (
                            <span className="text-xs text-gray-400">+{apt.amenities.length - 8}</span>
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="p-4 bg-gray-50 dark:bg-slate-700/50"></td>
                  {apartments.map(apt => (
                    <td key={apt.id} className="p-4">
                      <Link
                        href={`/rent/apartments/${apt.id}`}
                        className="block w-full py-2.5 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 text-white font-medium rounded-xl text-center text-sm hover:shadow-lg transition"
                      >
                        {t.view}
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
