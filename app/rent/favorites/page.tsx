'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/app/components/Header'
import FloatingContact from '@/app/components/FloatingContact'
import { useLocale } from '@/lib/i18n/context'
import { translations } from '@/lib/i18n/translations'
import { useFavorites, FavoriteButton } from '@/lib/favorites'

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
  isAvailable: boolean
  district: District
  images: { url: string; isCover: boolean }[]
}

export default function FavoritesPage() {
  const { locale } = useLocale()
  const t = (key: string) => translations[locale][key] || key
  const { favorites, removeFavorite } = useFavorites()
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (favorites.length > 0) {
      fetchFavoriteApartments()
    } else {
      setLoading(false)
    }
  }, [favorites])

  const fetchFavoriteApartments = async () => {
    try {
      const res = await fetch('/api/rent/apartments')
      if (res.ok) {
        const allApartments: Apartment[] = await res.json()
        const favoriteApartments = allApartments.filter(apt => favorites.includes(apt.id))
        setApartments(favoriteApartments)
      }
    } catch (error) {
      console.error('Error fetching apartments:', error)
    } finally {
      setLoading(false)
    }
  }

  const getAptTitle = (apt: Apartment) => {
    if (locale === 'vi') return apt.titleVi
    if (locale === 'en') return apt.titleEn
    return apt.titleRu
  }

  const getDistrictName = (d: District) => {
    if (locale === 'vi') return d.nameVi
    if (locale === 'en') return d.nameEn
    return d.nameRu
  }

  const getCoverImage = (apt: Apartment) => {
    const cover = apt.images.find(img => img.isCover)
    return cover?.url || apt.images[0]?.url
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t('rent.favorites.title')}
            {apartments.length > 0 && (
              <span className="ml-3 text-lg font-normal text-gray-500">({apartments.length})</span>
            )}
          </h1>
          <Link
            href="/rent/apartments"
            className="text-teal-600 hover:text-teal-700 text-sm font-medium"
          >
            {t('rent.viewAll')} →
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        ) : apartments.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center">
            <span className="text-6xl block mb-4">💔</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('rent.favorites.empty')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {locale === 'ru' ? 'Нажмите на сердечко, чтобы сохранить квартиру' : 'Click the heart to save an apartment'}
            </p>
            <Link
              href="/rent/apartments"
              className="inline-block px-6 py-3 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 text-white font-bold rounded-xl hover:shadow-lg transition"
            >
              {t('rent.favorites.browse')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {apartments.map(apt => (
              <div
                key={apt.id}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group relative"
              >
                <FavoriteButton
                  apartmentId={apt.id}
                  className="absolute top-3 right-3 z-10"
                  size="md"
                />
                <Link href={`/rent/apartments/${apt.id}`}>
                  <div className="aspect-[4/3] relative bg-gradient-to-br from-teal-100 to-teal-200 dark:from-slate-700 dark:to-slate-600 overflow-hidden">
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
                        {locale === 'ru' ? 'Занята' : 'Occupied'}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{getAptTitle(apt)}</h3>
                      <span className="font-bold text-teal-600 dark:text-teal-400 whitespace-nowrap">
                        ${apt.priceUsd}{t('rent.perMonth')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{getDistrictName(apt.district)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {apt.rooms === 0 ? (locale === 'ru' ? 'Студия' : 'Studio') : `${apt.rooms} ${t('rent.rooms')}`} • {apt.area} {t('rent.area')}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      <FloatingContact />
    </div>
  )
}
