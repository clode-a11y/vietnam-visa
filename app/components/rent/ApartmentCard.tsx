'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLocale } from '@/lib/i18n/context'
import { translations } from '@/lib/i18n/translations'

interface ApartmentCardProps {
  id: string
  title: string
  images: { url: string; isCover: boolean }[]
  priceUsd: number
  rooms: number
  area: number
  district: string
  isAvailable: boolean
  availableFrom?: Date | null
  canShow: boolean
}

export function ApartmentCard({
  id,
  title,
  images,
  priceUsd,
  rooms,
  area,
  district,
  isAvailable,
  availableFrom,
  canShow,
}: ApartmentCardProps) {
  const { locale } = useLocale()
  const t = (key: string) => translations[locale][key] || key
  const [currentImage, setCurrentImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const displayImages = images.length > 0 ? images : [{ url: '/placeholder-apartment.jpg', isCover: true }]

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('apartment-favorites') || '[]')
    setIsFavorite(favorites.includes(id))
  }, [id])

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const favorites = JSON.parse(localStorage.getItem('apartment-favorites') || '[]')
    if (isFavorite) {
      const newFavorites = favorites.filter((fav: string) => fav !== id)
      localStorage.setItem('apartment-favorites', JSON.stringify(newFavorites))
    } else {
      favorites.push(id)
      localStorage.setItem('apartment-favorites', JSON.stringify(favorites))
    }
    setIsFavorite(!isFavorite)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Link href={`/rent/apartments/${id}`} className="group block">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700">
        {/* Image */}
        <Image
          src={displayImages[currentImage]?.url || '/placeholder-apartment.jpg'}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Image dots */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {displayImages.slice(0, 5).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCurrentImage(idx)
                }}
                className={`w-1.5 h-1.5 rounded-full transition ${
                  idx === currentImage ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 transition active:scale-95"
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-300'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Status badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {!isAvailable && (
            <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
              {t('rent.notAvailable')}
            </span>
          )}
          {isAvailable && availableFrom && (
            <span className="px-2 py-1 text-xs font-medium bg-yellow-500 text-white rounded-full">
              {t('rent.availableFrom')} {new Date(availableFrom).toLocaleDateString(locale)}
            </span>
          )}
          {!canShow && (
            <span className="px-2 py-1 text-xs font-medium bg-gray-500 text-white rounded-full">
              {t('rent.cannotShow')}
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{title}</h3>
          <span className="font-bold text-teal-600 dark:text-teal-400 whitespace-nowrap">
            {formatPrice(priceUsd)}{t('rent.perMonth')}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{district}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {rooms} {t('rent.rooms')} • {area} {t('rent.area')}
        </p>
      </div>
    </Link>
  )
}
