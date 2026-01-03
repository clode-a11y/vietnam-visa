'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/app/components/Header'
import FloatingContact from '@/app/components/FloatingContact'
import { useLocale } from '@/lib/i18n/context'
import { translations } from '@/lib/i18n/translations'

interface District {
  id: string
  nameRu: string
  nameEn: string
  nameVi: string
}

interface ApartmentImage {
  id: string
  url: string
  isCover: boolean
}

interface Apartment {
  id: string
  titleRu: string
  titleEn: string
  titleVi: string
  priceUsd: number
  rooms: number
  area: number
  isAvailable: boolean
  district: District
  images: ApartmentImage[]
}

export default function ApartmentsPage() {
  const { locale } = useLocale()
  const t = (key: string) => translations[locale][key] || key
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedRooms, setSelectedRooms] = useState<number | null>(null)
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [apartmentsRes, districtsRes] = await Promise.all([
        fetch('/api/rent/apartments'),
        fetch('/api/admin/districts'),
      ])

      if (apartmentsRes.ok) {
        const data = await apartmentsRes.json()
        setApartments(data)
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

  const getDistrictName = (d: District) => {
    if (locale === 'vi') return d.nameVi
    if (locale === 'en') return d.nameEn
    return d.nameRu
  }

  const getAptTitle = (apt: Apartment) => {
    if (locale === 'vi') return apt.titleVi
    if (locale === 'en') return apt.titleEn
    return apt.titleRu
  }

  const filteredApartments = apartments.filter(apt => {
    if (selectedDistrict && apt.district.id !== selectedDistrict) return false
    if (selectedRooms !== null) {
      if (selectedRooms === 3 && apt.rooms < 3) return false
      if (selectedRooms !== 3 && apt.rooms !== selectedRooms) return false
    }
    return true
  })

  const getCoverImage = (apt: Apartment) => {
    const cover = apt.images.find(img => img.isCover)
    return cover?.url || apt.images[0]?.url
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24">
        {/* Page title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {t('rent.title')}
        </h1>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex flex-wrap gap-3">
            {/* District filter */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t('rent.filters.district')}: {t('rent.filters.all')}</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>{getDistrictName(d)}</option>
              ))}
            </select>

            {/* Rooms filter */}
            <div className="flex gap-1 bg-gray-100 dark:bg-slate-700 rounded-xl p-1">
              {[
                { value: null, label: t('rent.filters.all') },
                { value: 0, label: 'Студия' },
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3+' },
              ].map(opt => (
                <button
                  key={opt.value ?? 'all'}
                  onClick={() => setSelectedRooms(opt.value)}
                  className={`px-3 py-2 text-sm rounded-lg transition ${
                    selectedRooms === opt.value
                      ? 'bg-white dark:bg-slate-600 shadow text-gray-900 dark:text-white font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500 dark:text-gray-400">Загрузка...</div>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredApartments.length === 0 && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🏠</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Квартиры не найдены
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Попробуйте изменить фильтры
            </p>
          </div>
        )}

        {/* Apartments grid */}
        {!loading && filteredApartments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredApartments.map(apt => (
              <Link
                key={apt.id}
                href={`/rent/apartments/${apt.id}`}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group"
              >
                <div className="aspect-[4/3] relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-700 dark:to-slate-600 overflow-hidden">
                  {getCoverImage(apt) ? (
                    <Image
                      src={getCoverImage(apt)!}
                      alt={getAptTitle(apt)}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-5xl group-hover:scale-105 transition">
                      🏠
                    </div>
                  )}
                  {!apt.isAvailable && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Занята
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{getAptTitle(apt)}</h3>
                    <span className="font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      ${apt.priceUsd}{t('rent.perMonth')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{getDistrictName(apt.district)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {apt.rooms === 0 ? 'Студия' : `${apt.rooms} ${t('rent.rooms')}`} • {apt.area} {t('rent.area')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <FloatingContact />
    </div>
  )
}
