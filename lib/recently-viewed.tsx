'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface RecentlyViewedContextType {
  recentIds: string[]
  addToRecent: (id: string) => void
  clearRecent: () => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | null>(null)

const STORAGE_KEY = 'recently-viewed-apartments'
const MAX_ITEMS = 10

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentIds, setRecentIds] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setRecentIds(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Error loading recently viewed:', e)
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage when list changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentIds))
    }
  }, [recentIds, isLoaded])

  const addToRecent = (id: string) => {
    setRecentIds(prev => {
      // Remove if already exists, then add to front
      const filtered = prev.filter(existingId => existingId !== id)
      const updated = [id, ...filtered].slice(0, MAX_ITEMS)
      return updated
    })
  }

  const clearRecent = () => {
    setRecentIds([])
  }

  return (
    <RecentlyViewedContext.Provider value={{ recentIds, addToRecent, clearRecent }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider')
  }
  return context
}
