'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Header from '@/app/components/Header'
import { useLocale } from '@/lib/i18n/context'
import { translations } from '@/lib/i18n/translations'

// Dynamic import for map (SSR disabled - Leaflet needs window)
const ApartmentMap = dynamic(
  () => import('@/app/components/rent/ApartmentMap'),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-200 dark:bg-slate-700 animate-pulse rounded-2xl" /> }
)

interface District {
  id: string
  nameRu: string
  nameEn: string
  nameVi: string
}

interface Apartment {
  id: string
  titleRu: string
  titleEn: string
  titleVi: string
  priceUsd: number
  rooms: number
  area: number
  lat: number | null
  lng: number | null
  isAvailable: boolean
  district: District
  images: { url: string; isCover: boolean }[]
}

export default function MapPage() {
  const { locale } = useLocale()
  const t = (key: string) => translations[locale][key] || key
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedRooms, setSelectedRooms] = useState<number | null>(null)
  const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showList, setShowList] = useState(false)

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

  // Only apartments with coordinates for the map
  const apartmentsWithCoords = filteredApartments.filter(apt => apt.lat && apt.lng)

  const getCoverImage = (apt: Apartment) => {
    const cover = apt.images.find(img => img.isCover)
    return cover?.url || apt.images[0]?.url
  }

  const handleApartmentClick = (id: string) => {
    setSelectedApartmentId(id)
    setShowList(true)
    // Scroll to apartment in list
    setTimeout(() => {
      const element = document.getElementById(`apt-${id}`)
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <Header />

      <main className="flex-1 pt-16 flex flex-col lg:flex-row overflow-hidden">
        {/* Filters bar */}
        <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 px-4 py-3 flex items-center gap-3 flex-wrap lg:absolute lg:top-20 lg:left-4 lg:z-[1000] lg:rounded-xl lg:shadow-lg lg:border dark:lg:border-slate-600">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('rent.filters.district')}: {t('rent.filters.all')}</option>
            {districts.map(d => (
              <option key={d.id} value={d.id}>{getDistrictName(d)}</option>
            ))}
          </select>

          <div className="flex gap-1 bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
            {[
              { value: null, label: t('rent.filters.all') },
              { value: 0, label: 'Ст.' },
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3+' },
            ].map(opt => (
              <button
                key={opt.value ?? 'all'}
                onClick={() => setSelectedRooms(opt.value)}
                className={`px-2.5 py-1.5 text-xs rounded-md transition ${
                  selectedRooms === opt.value
                    ? 'bg-white dark:bg-slate-600 shadow text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            {apartmentsWithCoords.length} {locale === 'ru' ? 'на карте' : locale === 'en' ? 'on map' : 'trên bản đồ'}
          </div>

          {/* Toggle list button (mobile) */}
          <button
            onClick={() => setShowList(!showList)}
            className="lg:hidden ml-auto px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
          >
            {showList ? (locale === 'ru' ? 'Карта' : 'Map') : (locale === 'ru' ? 'Список' : 'List')}
          </button>
        </div>

        {/* Map */}
        <div className={`flex-1 relative ${showList ? 'hidden lg:block' : ''}`}>
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-gray-500 dark:text-gray-400">
                {locale === 'ru' ? 'Загрузка карты...' : locale === 'en' ? 'Loading map...' : 'Đang tải bản đồ...'}
              </div>
            </div>
          ) : (
            <ApartmentMap
              apartments={apartmentsWithCoords}
              locale={locale}
              onApartmentClick={handleApartmentClick}
              selectedApartmentId={selectedApartmentId}
            />
          )}
        </div>

        {/* Apartment list sidebar */}
        <div className={`lg:w-96 bg-white dark:bg-slate-800 border-l dark:border-slate-700 overflow-y-auto ${!showList ? 'hidden lg:block' : ''}`}>
          <div className="p-4 border-b dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
            <h2 className="font-bold text-gray-900 dark:text-white">
              {filteredApartments.length} {locale === 'ru' ? 'квартир' : locale === 'en' ? 'apartments' : 'căn hộ'}
            </h2>
          </div>

          <div className="divide-y dark:divide-slate-700">
            {filteredApartments.map(apt => (
              <Link
                key={apt.id}
                id={`apt-${apt.id}`}
                href={`/rent/apartments/${apt.id}`}
                className={`block p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition ${
                  selectedApartmentId === apt.id ? 'bg-blue-50 dark:bg-slate-700' : ''
                }`}
                onMouseEnter={() => setSelectedApartmentId(apt.id)}
                onMouseLeave={() => setSelectedApartmentId(null)}
              >
                <div className="flex gap-3">
                  {/* Image */}
                  <div className="w-24 h-20 relative rounded-lg overflow-hidden bg-gray-200 dark:bg-slate-600 flex-shrink-0">
                    {getCoverImage(apt) ? (
                      <Image
                        src={getCoverImage(apt)!}
                        alt={getAptTitle(apt)}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-2xl">🏠</div>
                    )}
                    {!apt.isAvailable && (
                      <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                        {locale === 'ru' ? 'Занята' : locale === 'en' ? 'Occupied' : 'Đã thuê'}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
                      {getAptTitle(apt)}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {getDistrictName(apt.district)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      {apt.rooms === 0 ? (locale === 'ru' ? 'Студия' : 'Studio') : `${apt.rooms} ${locale === 'ru' ? 'комн.' : 'rm'}`} • {apt.area} {locale === 'ru' ? 'м²' : 'm²'}
                    </p>
                    <p className="font-bold text-blue-600 dark:text-blue-400 mt-1">
                      ${apt.priceUsd}{t('rent.perMonth')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {filteredApartments.length === 0 && !loading && (
              <div className="p-8 text-center">
                <span className="text-4xl block mb-2">🏠</span>
                <p className="text-gray-500 dark:text-gray-400">
                  {locale === 'ru' ? 'Квартиры не найдены' : locale === 'en' ? 'No apartments found' : 'Không tìm thấy căn hộ'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
