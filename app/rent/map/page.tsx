'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Header from '@/app/components/Header'
import { useLocale } from '@/lib/i18n/context'
import { translations } from '@/lib/i18n/translations'
import { FavoriteButton } from '@/lib/favorites'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedRooms, setSelectedRooms] = useState<number | null>(null)
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null)
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [sortBy, setSortBy] = useState<string>('')
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

  const filteredApartments = apartments
    .filter(apt => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = apt.titleRu.toLowerCase().includes(query) ||
          apt.titleEn.toLowerCase().includes(query) ||
          apt.titleVi.toLowerCase().includes(query)
        const matchesDistrict = apt.district.nameRu.toLowerCase().includes(query) ||
          apt.district.nameEn.toLowerCase().includes(query) ||
          apt.district.nameVi.toLowerCase().includes(query)
        if (!matchesTitle && !matchesDistrict) return false
      }
      if (selectedDistrict && apt.district.id !== selectedDistrict) return false
      if (selectedRooms !== null) {
        if (selectedRooms === 3 && apt.rooms < 3) return false
        if (selectedRooms !== 3 && apt.rooms !== selectedRooms) return false
      }
      if (priceRange) {
        if (apt.priceUsd < priceRange.min || apt.priceUsd > priceRange.max) return false
      }
      if (onlyAvailable && !apt.isAvailable) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.priceUsd - b.priceUsd
        case 'price-desc': return b.priceUsd - a.priceUsd
        case 'area-asc': return a.area - b.area
        case 'area-desc': return b.area - a.area
        default: return 0
      }
    })

  const priceRanges = [
    { min: 0, max: 99999, label: locale === 'ru' ? 'Все' : 'All' },
    { min: 0, max: 400, label: '< $400' },
    { min: 400, max: 600, label: '$400-600' },
    { min: 600, max: 1000, label: '$600-1000' },
    { min: 1000, max: 99999, label: '$1000+' },
  ]

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
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'ru' ? 'Поиск...' : 'Search...'}
              className="w-36 px-3 py-2 pl-8 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
          </div>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">{t('rent.filters.district')}: {t('rent.filters.all')}</option>
            {districts.map(d => (
              <option key={d.id} value={d.id}>{getDistrictName(d)}</option>
            ))}
          </select>

          {/* Rooms filter */}
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

          {/* Price filter */}
          <select
            value={priceRange ? `${priceRange.min}-${priceRange.max}` : ''}
            onChange={(e) => {
              if (!e.target.value) {
                setPriceRange(null)
              } else {
                const [min, max] = e.target.value.split('-').map(Number)
                setPriceRange({ min, max })
              }
            }}
            className="px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">{locale === 'ru' ? 'Цена: Все' : 'Price: All'}</option>
            {priceRanges.slice(1).map(range => (
              <option key={`${range.min}-${range.max}`} value={`${range.min}-${range.max}`}>
                {range.label}
              </option>
            ))}
          </select>

          {/* Only available toggle */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {locale === 'ru' ? 'Свободные' : 'Available'}
            </span>
          </label>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            {apartmentsWithCoords.length} {locale === 'ru' ? 'на карте' : locale === 'en' ? 'on map' : 'trên bản đồ'}
          </div>

          {/* Toggle list button (mobile) */}
          <button
            onClick={() => setShowList(!showList)}
            className="lg:hidden ml-auto px-3 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium"
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
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-bold text-gray-900 dark:text-white">
                {filteredApartments.length} {locale === 'ru' ? 'квартир' : locale === 'en' ? 'apartments' : 'căn hộ'}
              </h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-1 text-xs bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none"
              >
                <option value="">{locale === 'ru' ? 'Сортировка' : 'Sort'}</option>
                <option value="price-asc">{locale === 'ru' ? 'Цена ↑' : 'Price ↑'}</option>
                <option value="price-desc">{locale === 'ru' ? 'Цена ↓' : 'Price ↓'}</option>
                <option value="area-asc">{locale === 'ru' ? 'Площадь ↑' : 'Area ↑'}</option>
                <option value="area-desc">{locale === 'ru' ? 'Площадь ↓' : 'Area ↓'}</option>
              </select>
            </div>
          </div>

          <div className="divide-y dark:divide-slate-700">
            {filteredApartments.map(apt => (
              <div
                key={apt.id}
                id={`apt-${apt.id}`}
                className={`relative p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition ${
                  selectedApartmentId === apt.id ? 'bg-teal-50 dark:bg-slate-700' : ''
                }`}
                onMouseEnter={() => setSelectedApartmentId(apt.id)}
                onMouseLeave={() => setSelectedApartmentId(null)}
              >
                <FavoriteButton
                  apartmentId={apt.id}
                  className="absolute top-2 right-2 z-10"
                  size="sm"
                />
                <Link href={`/rent/apartments/${apt.id}`} className="block">
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
                      <p className="font-bold text-teal-600 dark:text-teal-400 mt-1">
                        ${apt.priceUsd}{t('rent.perMonth')}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
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
