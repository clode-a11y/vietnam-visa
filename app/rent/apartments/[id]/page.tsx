'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/app/components/Header'
import FloatingContact from '@/app/components/FloatingContact'
import { ViewingRequestModal } from '@/app/components/rent/ViewingRequestModal'
import { useLocale } from '@/lib/i18n/context'
import { translations } from '@/lib/i18n/translations'
import { FavoriteButton } from '@/lib/favorites'
import { useRecentlyViewed } from '@/lib/recently-viewed'
import { ShareButton } from '@/app/components/rent/ShareButton'
import { CostCalculator } from '@/app/components/rent/CostCalculator'
import { CurrencyConverter } from '@/app/components/rent/CurrencyConverter'
import { AvailabilityCalendar } from '@/app/components/rent/AvailabilityCalendar'
import { ExportPdfButton } from '@/app/components/rent/ExportPdfButton'
import { ViewCounter } from '@/app/components/rent/ViewCounter'
import { distanceToBeach, formatDistance } from '@/lib/distance'

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
  nameVi: string
  icon: string
  category: string
}

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
  descriptionRu: string
  descriptionEn: string
  descriptionVi: string
  priceUsd: number
  priceVnd: number
  rooms: number
  area: number
  floor: number | null
  totalFloors: number | null
  address: string
  lat: number | null
  lng: number | null
  availableFrom: string | null
  isAvailable: boolean
  canShow: boolean
  hasVideo: boolean
  district: District
  images: ApartmentImage[]
  amenities: { amenity: Amenity }[]
}

const categoryLabels: Record<string, Record<string, string>> = {
  general: { ru: 'Общее', en: 'General', vi: 'Chung' },
  kitchen: { ru: 'Кухня', en: 'Kitchen', vi: 'Bếp' },
  bathroom: { ru: 'Ванная', en: 'Bathroom', vi: 'Phòng tắm' },
  building: { ru: 'Здание', en: 'Building', vi: 'Tòa nhà' },
  bedroom: { ru: 'Спальня', en: 'Bedroom', vi: 'Phòng ngủ' },
  entertainment: { ru: 'Развлечения', en: 'Entertainment', vi: 'Giải trí' },
}

interface SimilarApartment {
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

export default function ApartmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { locale } = useLocale()
  const t = (key: string) => translations[locale][key] || key
  const { addToRecent } = useRecentlyViewed()
  const [modalType, setModalType] = useState<'viewing' | 'video_call' | null>(null)
  const [apartment, setApartment] = useState<Apartment | null>(null)
  const [similarApartments, setSimilarApartments] = useState<SimilarApartment[]>([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchApartment()
  }, [id])

  // Track recently viewed
  useEffect(() => {
    if (apartment) {
      addToRecent(apartment.id)
    }
  }, [apartment])

  useEffect(() => {
    if (apartment) {
      fetchSimilarApartments()
    }
  }, [apartment])

  const fetchApartment = async () => {
    try {
      const res = await fetch(`/api/rent/apartments/${id}`)
      if (res.ok) {
        const data = await res.json()
        setApartment(data)
      }
    } catch (error) {
      console.error('Error fetching apartment:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSimilarApartments = async () => {
    if (!apartment) return
    try {
      const res = await fetch('/api/rent/apartments')
      if (res.ok) {
        const allApartments: SimilarApartment[] = await res.json()
        // Filter similar: same district OR similar price (±30%) OR same rooms
        const similar = allApartments
          .filter(apt => apt.id !== apartment.id)
          .map(apt => {
            let score = 0
            // Same district - highest priority
            if (apt.district.id === apartment.district.id) score += 3
            // Similar price (within 30%)
            const priceDiff = Math.abs(apt.priceUsd - apartment.priceUsd) / apartment.priceUsd
            if (priceDiff <= 0.3) score += 2
            // Same number of rooms
            if (apt.rooms === apartment.rooms) score += 1
            return { ...apt, score }
          })
          .filter(apt => apt.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 4)
        setSimilarApartments(similar)
      }
    } catch (error) {
      console.error('Error fetching similar apartments:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500 dark:text-gray-400">Загрузка...</div>
          </div>
        </main>
      </div>
    )
  }

  if (!apartment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24">
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🏠</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Квартира не найдена
            </h1>
            <Link href="/rent/apartments" className="text-blue-600 hover:underline">
              ← Вернуться к списку
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const getTitle = () => {
    if (locale === 'vi') return apartment.titleVi
    if (locale === 'en') return apartment.titleEn
    return apartment.titleRu
  }

  const getDescription = () => {
    if (locale === 'vi') return apartment.descriptionVi
    if (locale === 'en') return apartment.descriptionEn
    return apartment.descriptionRu
  }

  const getDistrict = () => {
    if (locale === 'vi') return apartment.district.nameVi
    if (locale === 'en') return apartment.district.nameEn
    return apartment.district.nameRu
  }

  const getAmenityName = (amenity: Amenity) => {
    if (locale === 'vi') return amenity.nameVi
    if (locale === 'en') return amenity.nameEn
    return amenity.nameRu
  }

  const getCategoryLabel = (category: string) => {
    return categoryLabels[category]?.[locale] || category
  }

  const getSimilarTitle = (apt: SimilarApartment) => {
    if (locale === 'vi') return apt.titleVi
    if (locale === 'en') return apt.titleEn
    return apt.titleRu
  }

  const getSimilarDistrict = (d: District) => {
    if (locale === 'vi') return d.nameVi
    if (locale === 'en') return d.nameEn
    return d.nameRu
  }

  const getSimilarCoverImage = (apt: SimilarApartment) => {
    const cover = apt.images.find(img => img.isCover)
    return cover?.url || apt.images[0]?.url
  }

  // Group amenities by category
  const groupedAmenities = apartment.amenities.reduce((acc, { amenity }) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = []
    }
    acc[amenity.category].push(amenity)
    return acc
  }, {} as Record<string, Amenity[]>)

  const images = apartment.images
  const currentImage = images[currentImageIndex]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href="/rent" className="hover:text-gray-700 dark:hover:text-gray-200">
            {t('rent.title')}
          </Link>
          <span>/</span>
          <Link href="/rent/apartments" className="hover:text-gray-700 dark:hover:text-gray-200">
            {t('nav.rentApartments')}
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{getTitle()}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image gallery */}
            {images.length > 0 ? (
              <div className="relative">
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <ShareButton
                    url={`/rent/apartments/${apartment.id}`}
                    title={getTitle()}
                  />
                  <FavoriteButton
                    apartmentId={apartment.id}
                    size="lg"
                  />
                </div>
                <div className="aspect-[16/10] relative rounded-2xl overflow-hidden bg-gray-200 dark:bg-slate-700">
                  <Image
                    src={currentImage.url}
                    alt={getTitle()}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center text-xl hover:bg-white dark:hover:bg-slate-700 transition shadow-lg"
                      >
                        ←
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center text-xl hover:bg-white dark:hover:bg-slate-700 transition shadow-lg"
                      >
                        →
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={img.id}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${
                          index === currentImageIndex
                            ? 'border-blue-500'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={img.url}
                          alt={`${getTitle()} - ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-[16/10] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl flex items-center justify-center text-8xl relative">
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <ShareButton
                    url={`/rent/apartments/${apartment.id}`}
                    title={getTitle()}
                  />
                  <FavoriteButton
                    apartmentId={apartment.id}
                    size="lg"
                  />
                </div>
                🏠
              </div>
            )}

            {/* Details */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {getTitle()}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mb-2">{getDistrict()} • {apartment.address}</p>

              <div className="mb-4">
                <ViewCounter apartmentId={apartment.id} locale={locale} />
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span>🛏️</span>
                  <span>{apartment.rooms === 0 ? 'Студия' : `${apartment.rooms} ${t('rent.rooms')}`}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span>📐</span>
                  <span>{apartment.area} {t('rent.area')}</span>
                </div>
                {apartment.floor && apartment.totalFloors && (
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span>🏢</span>
                    <span>{t('rent.floor')} {apartment.floor}/{apartment.totalFloors}</span>
                  </div>
                )}
                {apartment.hasVideo && (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <span>🎥</span>
                    <span>Есть видео</span>
                  </div>
                )}
                {distanceToBeach(apartment.lat, apartment.lng) !== null && (
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                    <span>🏖️</span>
                    <span>{locale === 'ru' ? 'До пляжа' : locale === 'vi' ? 'Đến biển' : 'To beach'} {formatDistance(distanceToBeach(apartment.lat, apartment.lng), locale)}</span>
                  </div>
                )}
              </div>

              <div className="border-t dark:border-slate-700 pt-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{t('rent.description')}</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{getDescription()}</p>
              </div>

              {/* Amenities */}
              {apartment.amenities.length > 0 && (
                <div className="border-t dark:border-slate-700 pt-6 mt-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t('rent.amenities')}</h2>

                  <div className="space-y-6">
                    {Object.entries(groupedAmenities).map(([category, amenities]) => (
                      <div key={category}>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                          {getCategoryLabel(category)}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {amenities.map(amenity => (
                            <div
                              key={amenity.id}
                              className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-slate-700/50 rounded-xl text-gray-700 dark:text-gray-300"
                            >
                              <span className="text-lg">{amenity.icon}</span>
                              <span className="text-sm">{getAmenityName(amenity)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
              {/* Price */}
              <div className="text-center mb-6">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  ${apartment.priceUsd}
                  <span className="text-lg font-normal text-gray-500 dark:text-gray-400">{t('rent.perMonth')}</span>
                </div>
                {apartment.priceVnd > 0 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ≈ {apartment.priceVnd.toLocaleString()} VND
                  </div>
                )}

                {/* Currency Converter */}
                <div className="mt-4">
                  <CurrencyConverter priceUsd={apartment.priceUsd} locale={locale} />
                </div>
              </div>

              {/* Availability Calendar */}
              <div className="mt-4">
                <AvailabilityCalendar
                  isAvailable={apartment.isAvailable}
                  availableFrom={apartment.availableFrom}
                  locale={locale}
                />
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setModalType('viewing')}
                  disabled={!apartment.canShow}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  📅 {t('rent.requestViewing')}
                </button>
                <button
                  onClick={() => setModalType('video_call')}
                  className="w-full py-3.5 bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold rounded-xl border-2 border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-600 active:scale-[0.98] transition"
                >
                  🎥 {t('rent.requestVideoCall')}
                </button>
              </div>

              {!apartment.canShow && (
                <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  {t('rent.cannotShow')}
                </p>
              )}

              {/* Cost Calculator */}
              <div className="mt-6">
                <CostCalculator rentUsd={apartment.priceUsd} locale={locale} />
              </div>

              {/* Export PDF */}
              <div className="mt-4">
                <ExportPdfButton
                  apartment={apartment}
                  locale={locale}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Similar apartments */}
        {similarApartments.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {locale === 'ru' ? 'Похожие квартиры' : locale === 'en' ? 'Similar apartments' : 'Căn hộ tương tự'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {similarApartments.map(apt => (
                <div
                  key={apt.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group relative"
                >
                  <FavoriteButton
                    apartmentId={apt.id}
                    className="absolute top-3 right-3 z-10"
                    size="sm"
                  />
                  <Link href={`/rent/apartments/${apt.id}`}>
                    <div className="aspect-[4/3] relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-700 dark:to-slate-600 overflow-hidden">
                      {getSimilarCoverImage(apt) ? (
                        <Image
                          src={getSimilarCoverImage(apt)!}
                          alt={getSimilarTitle(apt)}
                          fill
                          className="object-cover group-hover:scale-105 transition"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-4xl group-hover:scale-105 transition">
                          🏠
                        </div>
                      )}
                      {!apt.isAvailable && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                          {locale === 'ru' ? 'Занята' : locale === 'en' ? 'Occupied' : 'Đã thuê'}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1 mb-1">
                        {getSimilarTitle(apt)}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {getSimilarDistrict(apt.district)}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {apt.rooms === 0 ? (locale === 'ru' ? 'Студия' : 'Studio') : `${apt.rooms} ${locale === 'ru' ? 'комн.' : 'rm'}`} • {apt.area} {locale === 'ru' ? 'м²' : 'm²'}
                          {distanceToBeach(apt.lat, apt.lng) !== null && (
                            <span className="text-cyan-600 dark:text-cyan-400"> • 🏖️ {formatDistance(distanceToBeach(apt.lat, apt.lng), locale)}</span>
                          )}
                        </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                          ${apt.priceUsd}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <FloatingContact />

      {/* Modal */}
      <ViewingRequestModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        apartmentId={apartment.id}
        apartmentTitle={getTitle()}
        type={modalType || 'viewing'}
      />
    </div>
  )
}
