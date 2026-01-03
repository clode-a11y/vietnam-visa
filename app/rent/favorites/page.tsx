'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import FloatingContact from '@/app/components/FloatingContact'
import { useLocale } from '@/lib/i18n/context'
import { translations } from '@/lib/i18n/translations'

export default function FavoritesPage() {
  const { locale } = useLocale()
  const t = (key: string) => translations[locale][key] || key
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('apartment-favorites') || '[]')
    setFavorites(saved)
  }, [])

  // Mock apartments - in real app, would fetch from API based on favorite IDs
  const allApartments = [
    { id: '1', title: 'Студия с видом на море', titleEn: 'Sea View Studio', titleVi: 'Studio nhìn ra biển', district: 'Центр', districtEn: 'Center', districtVi: 'Trung tâm', price: 400, rooms: 1, area: 35 },
    { id: '2', title: '2-комнатная в Vincom', titleEn: '2-room at Vincom', titleVi: 'Căn hộ 2 phòng Vincom', district: 'Vincom', districtEn: 'Vincom', districtVi: 'Vincom', price: 600, rooms: 2, area: 55 },
    { id: '3', title: 'Апартаменты у пляжа', titleEn: 'Beach Apartment', titleVi: 'Căn hộ gần biển', district: 'An Viên', districtEn: 'An Vien', districtVi: 'An Viên', price: 500, rooms: 1, area: 40 },
  ]

  const favoriteApartments = allApartments.filter(apt => favorites.includes(apt.id))

  const getAptTitle = (apt: typeof allApartments[0]) => {
    if (locale === 'vi') return apt.titleVi
    if (locale === 'en') return apt.titleEn
    return apt.title
  }

  const getAptDistrict = (apt: typeof allApartments[0]) => {
    if (locale === 'vi') return apt.districtVi
    if (locale === 'en') return apt.districtEn
    return apt.district
  }

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter(f => f !== id)
    setFavorites(newFavorites)
    localStorage.setItem('apartment-favorites', JSON.stringify(newFavorites))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {t('rent.favorites.title')}
        </h1>

        {favoriteApartments.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center">
            <span className="text-6xl block mb-4">💔</span>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{t('rent.favorites.empty')}</p>
            <Link
              href="/rent/apartments"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition"
            >
              {t('rent.favorites.browse')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {favoriteApartments.map(apt => (
              <div
                key={apt.id}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group relative"
              >
                <button
                  onClick={() => removeFavorite(apt.id)}
                  className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 transition"
                >
                  <svg className="w-5 h-5 text-red-500 fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <Link href={`/rent/apartments/${apt.id}`}>
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-5xl group-hover:scale-105 transition">
                    🏠
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{getAptTitle(apt)}</h3>
                      <span className="font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        ${apt.price}{t('rent.perMonth')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{getAptDistrict(apt)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {apt.rooms} {t('rent.rooms')} • {apt.area} {t('rent.area')}
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
