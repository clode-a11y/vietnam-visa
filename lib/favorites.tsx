'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface FavoritesContextType {
  favorites: string[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

const STORAGE_KEY = 'apartment-favorites'

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setFavorites(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Error loading favorites:', e)
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage when favorites change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  const isFavorite = (id: string) => favorites.includes(id)

  const toggleFavorite = (id: string) => {
    if (isFavorite(id)) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  const addFavorite = (id: string) => {
    setFavorites(prev => [...prev, id])
  }

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(f => f !== id))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

// Heart button component
interface FavoriteButtonProps {
  apartmentId: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function FavoriteButton({ apartmentId, className = '', size = 'md' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(apartmentId)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(apartmentId)
      }}
      className={`${sizeClasses[size]} rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${className}`}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className={`${iconSizes[size]} transition-colors ${favorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-400'}`}
        fill={favorite ? 'currentColor' : 'none'}
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
  )
}
