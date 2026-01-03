'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import Link from 'next/link'

interface CompareContextType {
  compareIds: string[]
  isInCompare: (id: string) => boolean
  toggleCompare: (id: string) => void
  addToCompare: (id: string) => void
  removeFromCompare: (id: string) => void
  clearCompare: () => void
  canAdd: boolean
}

const CompareContext = createContext<CompareContextType | null>(null)

const MAX_COMPARE = 3

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([])

  const isInCompare = (id: string) => compareIds.includes(id)
  const canAdd = compareIds.length < MAX_COMPARE

  const toggleCompare = (id: string) => {
    if (isInCompare(id)) {
      removeFromCompare(id)
    } else if (canAdd) {
      addToCompare(id)
    }
  }

  const addToCompare = (id: string) => {
    if (canAdd && !isInCompare(id)) {
      setCompareIds(prev => [...prev, id])
    }
  }

  const removeFromCompare = (id: string) => {
    setCompareIds(prev => prev.filter(i => i !== id))
  }

  const clearCompare = () => {
    setCompareIds([])
  }

  return (
    <CompareContext.Provider value={{
      compareIds,
      isInCompare,
      toggleCompare,
      addToCompare,
      removeFromCompare,
      clearCompare,
      canAdd
    }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider')
  }
  return context
}

// Compare button component
interface CompareButtonProps {
  apartmentId: string
  className?: string
  size?: 'sm' | 'md'
}

export function CompareButton({ apartmentId, className = '', size = 'md' }: CompareButtonProps) {
  const { isInCompare, toggleCompare, canAdd } = useCompare()
  const inCompare = isInCompare(apartmentId)
  const disabled = !inCompare && !canAdd

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-sm',
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleCompare(apartmentId)
      }}
      disabled={disabled}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all ${
        inCompare
          ? 'bg-blue-600 text-white shadow-md'
          : disabled
            ? 'bg-white/50 dark:bg-slate-800/50 text-gray-300 dark:text-gray-600 cursor-not-allowed'
            : 'bg-white/90 dark:bg-slate-800/90 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 shadow-md hover:scale-110'
      } ${className}`}
      aria-label={inCompare ? 'Убрать из сравнения' : 'Добавить к сравнению'}
      title={inCompare ? 'Убрать из сравнения' : disabled ? 'Максимум 3 квартиры' : 'Сравнить'}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    </button>
  )
}

// Floating compare bar
interface CompareBarProps {
  locale: string
}

export function CompareBar({ locale }: CompareBarProps) {
  const { compareIds, clearCompare } = useCompare()

  if (compareIds.length === 0) return null

  const labels = {
    ru: {
      selected: 'Выбрано для сравнения',
      compare: 'Сравнить',
      clear: 'Очистить',
    },
    en: {
      selected: 'Selected for comparison',
      compare: 'Compare',
      clear: 'Clear',
    },
    vi: {
      selected: 'Đã chọn để so sánh',
      compare: 'So sánh',
      clear: 'Xóa',
    },
  }

  const t = labels[locale as keyof typeof labels] || labels.en

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 px-4 py-3 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
          <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{compareIds.length}</span>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">
          {t.selected}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/rent/compare"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition text-sm"
        >
          {t.compare}
        </Link>
        <button
          onClick={clearCompare}
          className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-sm transition"
        >
          {t.clear}
        </button>
      </div>
    </div>
  )
}
