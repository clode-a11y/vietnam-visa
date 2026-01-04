'use client'

import { useState, useEffect } from 'react'

interface ViewCounterProps {
  apartmentId: string
  locale: string
  initialViews?: number
}

const LABELS = {
  ru: {
    views: 'просмотров',
    view: 'просмотр',
    views2: 'просмотра',
    watching: 'смотрят сейчас',
  },
  en: {
    views: 'views',
    view: 'view',
    views2: 'views',
    watching: 'watching now',
  },
  vi: {
    views: 'lượt xem',
    view: 'lượt xem',
    views2: 'lượt xem',
    watching: 'đang xem',
  },
}

export function ViewCounter({ apartmentId, locale, initialViews = 0 }: ViewCounterProps) {
  const [views, setViews] = useState(initialViews)
  const [hasIncremented, setHasIncremented] = useState(false)

  const t = LABELS[locale as keyof typeof LABELS] || LABELS.en

  // Russian plural forms
  const getViewsLabel = (count: number) => {
    if (locale !== 'ru') {
      return count === 1 ? t.view : t.views
    }
    const mod10 = count % 10
    const mod100 = count % 100
    if (mod10 === 1 && mod100 !== 11) return t.view
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return t.views2
    return t.views
  }

  useEffect(() => {
    // Only increment once per session per apartment
    const viewedKey = `viewed_${apartmentId}`
    const hasViewed = sessionStorage.getItem(viewedKey)

    if (!hasViewed && !hasIncremented) {
      // Increment view count
      fetch(`/api/rent/apartments/${apartmentId}/views`, {
        method: 'POST',
      })
        .then(res => res.json())
        .then(data => {
          if (data.views) {
            setViews(data.views)
          }
        })
        .catch(console.error)

      sessionStorage.setItem(viewedKey, 'true')
      setHasIncremented(true)
    } else if (!hasIncremented) {
      // Just fetch current count
      fetch(`/api/rent/apartments/${apartmentId}/views`)
        .then(res => res.json())
        .then(data => {
          if (data.views) {
            setViews(data.views)
          }
        })
        .catch(console.error)
    }
  }, [apartmentId, hasIncremented])

  // Simulate "watching now" (random 1-5 for demo, or could be real-time)
  const watchingNow = Math.floor(Math.random() * 4) + 1

  return (
    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex items-center gap-1.5">
        <span>👁️</span>
        <span>{views.toLocaleString()} {getViewsLabel(views)}</span>
      </div>
      {watchingNow > 1 && (
        <div className="flex items-center gap-1.5 text-orange-500 dark:text-orange-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span>{watchingNow} {t.watching}</span>
        </div>
      )}
    </div>
  )
}
