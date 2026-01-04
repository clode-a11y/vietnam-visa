'use client'

import { useState } from 'react'

interface CostCalculatorProps {
  rentUsd: number
  locale: string
}

export function CostCalculator({ rentUsd, locale }: CostCalculatorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [electricity, setElectricity] = useState(50) // kWh usage
  const [water, setWater] = useState(5) // cubic meters
  const [internet, setInternet] = useState(true)
  const [cleaning, setCleaning] = useState(false)

  // Approximate rates in Vietnam (USD)
  const electricityRate = 0.08 // per kWh
  const waterRate = 0.50 // per cubic meter
  const internetCost = 15 // monthly
  const cleaningCost = 30 // per cleaning (2x month)

  const electricityCost = Math.round(electricity * electricityRate)
  const waterCost = Math.round(water * waterRate)
  const internetTotal = internet ? internetCost : 0
  const cleaningTotal = cleaning ? cleaningCost * 2 : 0

  const totalUtilities = electricityCost + waterCost + internetTotal + cleaningTotal
  const totalMonthly = rentUsd + totalUtilities
  const deposit = rentUsd * 2 // Usually 2 months

  const labels = {
    ru: {
      title: 'Калькулятор расходов',
      rent: 'Аренда',
      utilities: 'Коммунальные',
      electricity: 'Электричество',
      electricityUnit: 'кВт·ч/мес',
      water: 'Вода',
      waterUnit: 'м³/мес',
      internet: 'Интернет',
      cleaning: 'Уборка 2р/мес',
      total: 'Итого в месяц',
      deposit: 'Депозит (2 мес)',
      firstPayment: 'При заселении',
      note: 'Примерный расчёт. Фактические расходы могут отличаться.',
      calculate: 'Рассчитать расходы',
    },
    en: {
      title: 'Cost Calculator',
      rent: 'Rent',
      utilities: 'Utilities',
      electricity: 'Electricity',
      electricityUnit: 'kWh/mo',
      water: 'Water',
      waterUnit: 'm³/mo',
      internet: 'Internet',
      cleaning: 'Cleaning 2x/mo',
      total: 'Total per month',
      deposit: 'Deposit (2 mo)',
      firstPayment: 'First payment',
      note: 'Approximate calculation. Actual costs may vary.',
      calculate: 'Calculate costs',
    },
    vi: {
      title: 'Tính chi phí',
      rent: 'Tiền thuê',
      utilities: 'Tiện ích',
      electricity: 'Điện',
      electricityUnit: 'kWh/th',
      water: 'Nước',
      waterUnit: 'm³/th',
      internet: 'Internet',
      cleaning: 'Dọn dẹp 2l/th',
      total: 'Tổng mỗi tháng',
      deposit: 'Đặt cọc (2 th)',
      firstPayment: 'Thanh toán đầu',
      note: 'Tính toán gần đúng. Chi phí thực tế có thể khác.',
      calculate: 'Tính chi phí',
    },
  }

  const t = labels[locale as keyof typeof labels] || labels.en

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 px-4 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition flex items-center justify-center gap-2"
      >
        <span>🧮</span>
        {t.calculate}
      </button>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span>🧮</span>
          {t.title}
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
        >
          ×
        </button>
      </div>

      {/* Rent */}
      <div className="flex justify-between items-center py-2 border-b dark:border-slate-600">
        <span className="text-gray-600 dark:text-gray-300">{t.rent}</span>
        <span className="font-bold text-gray-900 dark:text-white">${rentUsd}</span>
      </div>

      {/* Utilities section */}
      <div className="space-y-3">
        <span className="text-sm text-gray-500 dark:text-gray-400">{t.utilities}</span>

        {/* Electricity */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span>⚡</span>
            <span>{t.electricity}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="20"
              max="200"
              value={electricity}
              onChange={(e) => setElectricity(Number(e.target.value))}
              className="w-20 accent-teal-500"
            />
            <span className="text-xs text-gray-500 w-16">{electricity} {t.electricityUnit}</span>
            <span className="font-medium text-gray-900 dark:text-white w-10 text-right">${electricityCost}</span>
          </div>
        </div>

        {/* Water */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span>💧</span>
            <span>{t.water}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="2"
              max="20"
              value={water}
              onChange={(e) => setWater(Number(e.target.value))}
              className="w-20 accent-teal-500"
            />
            <span className="text-xs text-gray-500 w-16">{water} {t.waterUnit}</span>
            <span className="font-medium text-gray-900 dark:text-white w-10 text-right">${waterCost}</span>
          </div>
        </div>

        {/* Internet */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={internet}
              onChange={(e) => setInternet(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span>🌐</span>
            <span>{t.internet}</span>
          </label>
          <span className="font-medium text-gray-900 dark:text-white">${internetTotal}</span>
        </div>

        {/* Cleaning */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={cleaning}
              onChange={(e) => setCleaning(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span>🧹</span>
            <span>{t.cleaning}</span>
          </label>
          <span className="font-medium text-gray-900 dark:text-white">${cleaningTotal}</span>
        </div>
      </div>

      {/* Totals */}
      <div className="border-t dark:border-slate-600 pt-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700 dark:text-gray-200">{t.total}</span>
          <span className="text-xl font-bold text-teal-600 dark:text-teal-400">${totalMonthly}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 dark:text-gray-400">{t.deposit}</span>
          <span className="text-gray-700 dark:text-gray-300">${deposit}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t dark:border-slate-600">
          <span className="font-medium text-gray-700 dark:text-gray-200">{t.firstPayment}</span>
          <span className="font-bold text-gray-900 dark:text-white">${totalMonthly + deposit}</span>
        </div>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        {t.note}
      </p>
    </div>
  )
}
