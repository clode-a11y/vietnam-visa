'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/Header'
import FloatingContact from '@/app/components/FloatingContact'
import { useLocale } from '@/lib/i18n/context'
import { translations } from '@/lib/i18n/translations'
import { FavoriteButton } from '@/lib/favorites'
import { useRecentlyViewed } from '@/lib/recently-viewed'
import { CompareButton, CompareBar } from '@/lib/compare'
import { distanceToBeach, formatDistance } from '@/lib/distance'

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

interface Amenity {
  id: string
  nameRu: string
  nameEn: string
  nameVi: string
  icon: string
  category: string
}

interface Apartment {
  id: string
  titleRu: string
  titleEn: string
  titleVi: string
  descriptionRu: string
  descriptionEn: string
  descriptionVi: string
  priceUsd: number
  rooms: number
  area: number
  address: string
  lat: number | null
  lng: number | null
  isAvailable: boolean
  district: District
  images: ApartmentImage[]
  amenities?: { amenity: Amenity }[]
  createdAt: string
}

export default function ApartmentsPage() {
  const { locale } = useLocale()
  const t = (key: string) => translations[locale][key] || key
  const { recentIds } = useRecentlyViewed()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedRooms, setSelectedRooms] = useState<number | null>(null)
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null)
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [sortBy, setSortBy] = useState<string>('')
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [showAmenityFilter, setShowAmenityFilter] = useState(false)
  const [loading, setLoading] = useState(true)

  // Get recently viewed apartments (maintain order from recentIds)
  const recentlyViewedApartments = recentIds
    .map(id => apartments.find(apt => apt.id === id))
    .filter((apt): apt is Apartment => apt !== undefined)
    .slice(0, 6)

  const priceRanges = [
    { min: 0, max: 400, label: '< $400' },
    { min: 400, max: 600, label: '$400-600' },
    { min: 600, max: 1000, label: '$600-1000' },
    { min: 1000, max: 99999, label: '$1000+' },
  ]

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [apartmentsRes, districtsRes, amenitiesRes] = await Promise.all([
        fetch('/api/rent/apartments'),
        fetch('/api/admin/districts'),
        fetch('/api/rent/amenities'),
      ])

      if (apartmentsRes.ok) {
        const data = await apartmentsRes.json()
        setApartments(data)
      }

      if (districtsRes.ok) {
        const data = await districtsRes.json()
        setDistricts(data)
      }

      if (amenitiesRes.ok) {
        const data = await amenitiesRes.json()
        setAmenities(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getAmenityName = (a: Amenity) => {
    if (locale === 'vi') return a.nameVi
    if (locale === 'en') return a.nameEn
    return a.nameRu
  }

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
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
        const matchesAddress = apt.address.toLowerCase().includes(query)
        const matchesDescription = apt.descriptionRu.toLowerCase().includes(query) ||
          apt.descriptionEn.toLowerCase().includes(query) ||
          apt.descriptionVi.toLowerCase().includes(query)
        if (!matchesTitle && !matchesDistrict && !matchesAddress && !matchesDescription) return false
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
      // Amenities filter
      if (selectedAmenities.length > 0) {
        const aptAmenityIds = apt.amenities?.map(a => a.amenity.id) || []
        const hasAllSelected = selectedAmenities.every(id => aptAmenityIds.includes(id))
        if (!hasAllSelected) return false
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.priceUsd - b.priceUsd
        case 'price-desc': return b.priceUsd - a.priceUsd
        case 'area-asc': return a.area - b.area
        case 'area-desc': return b.area - a.area
        case 'rooms-asc': return a.rooms - b.rooms
        case 'rooms-desc': return b.rooms - a.rooms
        case 'date-desc': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'date-asc': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        default: return 0
      }
    })

  const getCoverImage = (apt: Apartment) => {
    const cover = apt.images.find(img => img.isCover)
    return cover?.url || apt.images[0]?.url
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24">
        {/* Page title with map toggle */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t('rent.title')}
          </h1>
          <Link
            href="/rent/map"
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition shadow-sm"
          >
            <span>🗺️</span>
            <span className="hidden sm:inline">{locale === 'ru' ? 'Карта' : locale === 'en' ? 'Map' : 'Bản đồ'}</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === 'ru' ? 'Название, адрес, район...' : locale === 'vi' ? 'Tên, địa chỉ, quận...' : 'Name, address, district...'}
                className="w-full px-4 py-2.5 pl-10 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              )}
            </div>

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
              className="px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{locale === 'ru' ? 'Цена: Все' : 'Price: All'}</option>
              {priceRanges.map(range => (
                <option key={`${range.min}-${range.max}`} value={`${range.min}-${range.max}`}>
                  {range.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{locale === 'ru' ? 'Сортировка' : locale === 'vi' ? 'Sắp xếp' : 'Sort'}</option>
              <option value="date-desc">{locale === 'ru' ? 'Сначала новые' : locale === 'vi' ? 'Mới nhất' : 'Newest first'}</option>
              <option value="price-asc">{locale === 'ru' ? 'Цена ↑' : locale === 'vi' ? 'Giá ↑' : 'Price ↑'}</option>
              <option value="price-desc">{locale === 'ru' ? 'Цена ↓' : locale === 'vi' ? 'Giá ↓' : 'Price ↓'}</option>
              <option value="area-desc">{locale === 'ru' ? 'Площадь ↓' : locale === 'vi' ? 'Diện tích ↓' : 'Area ↓'}</option>
              <option value="area-asc">{locale === 'ru' ? 'Площадь ↑' : locale === 'vi' ? 'Diện tích ↑' : 'Area ↑'}</option>
              <option value="rooms-desc">{locale === 'ru' ? 'Комнаты ↓' : locale === 'vi' ? 'Phòng ↓' : 'Rooms ↓'}</option>
              <option value="rooms-asc">{locale === 'ru' ? 'Комнаты ↑' : locale === 'vi' ? 'Phòng ↑' : 'Rooms ↑'}</option>
            </select>

            {/* Only available toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {locale === 'ru' ? 'Только свободные' : 'Available only'}
              </span>
            </label>

            {/* Amenities filter button */}
            <button
              onClick={() => setShowAmenityFilter(!showAmenityFilter)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                selectedAmenities.length > 0
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                  : 'bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-600'
              }`}
            >
              <span>✨</span>
              <span>{locale === 'ru' ? 'Удобства' : locale === 'en' ? 'Amenities' : 'Tiện nghi'}</span>
              {selectedAmenities.length > 0 && (
                <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {selectedAmenities.length}
                </span>
              )}
            </button>
          </div>

          {/* Amenities filter dropdown */}
          {showAmenityFilter && amenities.length > 0 && (
            <div className="mt-4 pt-4 border-t dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {locale === 'ru' ? 'Выберите удобства:' : locale === 'en' ? 'Select amenities:' : 'Chọn tiện nghi:'}
                </span>
                {selectedAmenities.length > 0 && (
                  <button
                    onClick={() => setSelectedAmenities([])}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {locale === 'ru' ? 'Сбросить' : 'Clear'}
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {amenities.map(amenity => (
                  <button
                    key={amenity.id}
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition ${
                      selectedAmenities.includes(amenity.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    <span>{amenity.icon}</span>
                    <span>{getAmenityName(amenity)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recently viewed */}
        {!loading && recentlyViewedApartments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {locale === 'ru' ? 'Недавно просмотренные' : locale === 'en' ? 'Recently viewed' : 'Đã xem gần đây'}
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
              {recentlyViewedApartments.map(apt => (
                <div
                  key={apt.id}
                  className="flex-shrink-0 w-64 bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group relative"
                >
                  <FavoriteButton
                    apartmentId={apt.id}
                    className="absolute top-2 right-2 z-10"
                    size="sm"
                  />
                  <Link href={`/rent/apartments/${apt.id}`}>
                    <div className="aspect-[4/3] relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-700 dark:to-slate-600 overflow-hidden">
                      {getCoverImage(apt) ? (
                        <Image
                          src={getCoverImage(apt)!}
                          alt={getAptTitle(apt)}
                          fill
                          className="object-cover group-hover:scale-105 transition"
                          sizes="256px"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-4xl">🏠</div>
                      )}
                      {!apt.isAvailable && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                          {locale === 'ru' ? 'Занята' : 'Occupied'}
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{getAptTitle(apt)}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{getDistrictName(apt.district)}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {apt.rooms === 0 ? 'Ст.' : `${apt.rooms} к.`} • {apt.area} м²
                          {distanceToBeach(apt.lat, apt.lng) !== null && (
                            <span className="text-cyan-600 dark:text-cyan-400"> • 🏖️ {formatDistance(distanceToBeach(apt.lat, apt.lng), locale)}</span>
                          )}
                        </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">${apt.priceUsd}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

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
              <div
                key={apt.id}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group relative"
              >
                <div className="absolute top-3 right-3 z-10 flex gap-1.5">
                  <CompareButton apartmentId={apt.id} size="md" />
                  <FavoriteButton apartmentId={apt.id} size="md" />
                </div>
                <Link href={`/rent/apartments/${apt.id}`}>
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
                    {distanceToBeach(apt.lat, apt.lng) !== null && (
                      <span className="text-cyan-600 dark:text-cyan-400"> • 🏖️ {formatDistance(distanceToBeach(apt.lat, apt.lng), locale)}</span>
                    )}
                  </p>
                </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      <CompareBar locale={locale} />
      <FloatingContact />
    </div>
  )
}
