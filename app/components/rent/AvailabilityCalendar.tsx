'use client'

import { useState } from 'react'

interface AvailabilityCalendarProps {
  isAvailable: boolean
  availableFrom: string | null
  locale: string
}

const MONTH_NAMES = {
  ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  vi: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
}

const DAY_NAMES = {
  ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  vi: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
}

const LABELS = {
  ru: {
    available: 'Свободна',
    occupied: 'Занята',
    availableFrom: 'Свободна с',
    legend: 'Легенда',
    free: 'Свободно',
    busy: 'Занято',
  },
  en: {
    available: 'Available',
    occupied: 'Occupied',
    availableFrom: 'Available from',
    legend: 'Legend',
    free: 'Available',
    busy: 'Occupied',
  },
  vi: {
    available: 'Còn trống',
    occupied: 'Đã thuê',
    availableFrom: 'Trống từ',
    legend: 'Chú thích',
    free: 'Trống',
    busy: 'Đã thuê',
  },
}

export function AvailabilityCalendar({ isAvailable, availableFrom, locale }: AvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const availableFromDate = availableFrom ? new Date(availableFrom) : null
  if (availableFromDate) {
    availableFromDate.setHours(0, 0, 0, 0)
  }

  const months = MONTH_NAMES[locale as keyof typeof MONTH_NAMES] || MONTH_NAMES.en
  const days = DAY_NAMES[locale as keyof typeof DAY_NAMES] || DAY_NAMES.en
  const t = LABELS[locale as keyof typeof LABELS] || LABELS.en

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of month and total days
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()

  // Get day of week for first day (0 = Sunday, convert to Monday = 0)
  let startDay = firstDay.getDay() - 1
  if (startDay < 0) startDay = 6

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const isDateAvailable = (date: Date): boolean => {
    if (!isAvailable) {
      // If not available but has availableFrom date
      if (availableFromDate && date >= availableFromDate) {
        return true
      }
      return false
    }
    return true
  }

  const isDateInPast = (date: Date): boolean => {
    return date < today
  }

  const renderCalendar = () => {
    const cells = []

    // Empty cells for days before first day of month
    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`empty-${i}`} className="h-8" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isPast = isDateInPast(date)
      const available = isDateAvailable(date)
      const isToday = date.getTime() === today.getTime()
      const isAvailableFromDay = availableFromDate && date.getTime() === availableFromDate.getTime()

      let bgClass = ''
      let textClass = 'text-gray-400 dark:text-gray-600'

      if (isPast) {
        bgClass = ''
        textClass = 'text-gray-300 dark:text-gray-700'
      } else if (available) {
        bgClass = 'bg-green-100 dark:bg-green-900/30'
        textClass = 'text-green-700 dark:text-green-400'
      } else {
        bgClass = 'bg-red-100 dark:bg-red-900/30'
        textClass = 'text-red-700 dark:text-red-400'
      }

      cells.push(
        <div
          key={day}
          className={`h-8 flex items-center justify-center text-sm rounded-lg ${bgClass} ${textClass} ${
            isToday ? 'ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-slate-800' : ''
          } ${isAvailableFromDay ? 'font-bold' : ''}`}
        >
          {day}
        </div>
      )
    }

    return cells
  }

  // Status badge
  const getStatusBadge = () => {
    if (isAvailable) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          {t.available}
        </span>
      )
    }
    if (availableFromDate && availableFromDate > today) {
      const formattedDate = availableFromDate.toLocaleDateString(
        locale === 'ru' ? 'ru-RU' : locale === 'vi' ? 'vi-VN' : 'en-US',
        { day: 'numeric', month: 'short' }
      )
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-amber-500 rounded-full" />
          {t.availableFrom} {formattedDate}
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
        <span className="w-2 h-2 bg-red-500 rounded-full" />
        {t.occupied}
      </span>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
      {/* Status */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          📅 {locale === 'ru' ? 'Доступность' : locale === 'vi' ? 'Tình trạng' : 'Availability'}
        </span>
        {getStatusBadge()}
      </div>

      {/* Calendar header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="p-1.5 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition text-gray-600 dark:text-gray-300"
        >
          ←
        </button>
        <span className="font-medium text-gray-900 dark:text-white text-sm">
          {months[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="p-1.5 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition text-gray-600 dark:text-gray-300"
        >
          →
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {days.map(day => (
          <div key={day} className="h-6 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t dark:border-slate-600">
        <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
          <span className="w-3 h-3 bg-green-100 dark:bg-green-900/30 rounded" />
          {t.free}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
          <span className="w-3 h-3 bg-red-100 dark:bg-red-900/30 rounded" />
          {t.busy}
        </div>
      </div>
    </div>
  )
}
