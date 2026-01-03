'use client'

import { useState } from 'react'

interface CurrencyConverterProps {
  priceUsd: number
  locale: string
}

// Approximate exchange rates (can be updated or fetched from API)
const RATES = {
  USD: 1,
  VND: 25000,
  RUB: 95,
  EUR: 0.92,
  CNY: 7.2,
}

type Currency = keyof typeof RATES

const CURRENCY_INFO: Record<Currency, { symbol: string; name: { ru: string; en: string; vi: string } }> = {
  USD: { symbol: '$', name: { ru: 'Доллар США', en: 'US Dollar', vi: 'Đô la Mỹ' } },
  VND: { symbol: '₫', name: { ru: 'Вьетнамский донг', en: 'Vietnamese Dong', vi: 'Đồng Việt Nam' } },
  RUB: { symbol: '₽', name: { ru: 'Российский рубль', en: 'Russian Ruble', vi: 'Rúp Nga' } },
  EUR: { symbol: '€', name: { ru: 'Евро', en: 'Euro', vi: 'Euro' } },
  CNY: { symbol: '¥', name: { ru: 'Китайский юань', en: 'Chinese Yuan', vi: 'Nhân dân tệ' } },
}

export function CurrencyConverter({ priceUsd, locale }: CurrencyConverterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD')

  const convertedPrice = priceUsd * RATES[selectedCurrency]

  const formatPrice = (price: number, currency: Currency) => {
    if (currency === 'VND') {
      return price.toLocaleString('vi-VN')
    }
    if (currency === 'RUB') {
      return price.toLocaleString('ru-RU')
    }
    return price.toLocaleString('en-US', { maximumFractionDigits: 0 })
  }

  const labels = {
    ru: {
      convert: 'Конвертер валют',
      rate: 'Курс',
      perMonth: '/мес',
      note: 'Примерный курс. Актуальный курс уточняйте.',
    },
    en: {
      convert: 'Currency converter',
      rate: 'Rate',
      perMonth: '/mo',
      note: 'Approximate rate. Check current rates.',
    },
    vi: {
      convert: 'Chuyển đổi tiền tệ',
      rate: 'Tỷ giá',
      perMonth: '/th',
      note: 'Tỷ giá gần đúng. Kiểm tra tỷ giá hiện tại.',
    },
  }

  const t = labels[locale as keyof typeof labels] || labels.en
  const getName = (currency: Currency) => CURRENCY_INFO[currency].name[locale as 'ru' | 'en' | 'vi'] || CURRENCY_INFO[currency].name.en

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-2.5 px-4 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition flex items-center justify-center gap-2 text-sm"
      >
        <span>💱</span>
        {t.convert}
      </button>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2 text-sm">
          <span>💱</span>
          {t.convert}
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg"
        >
          ×
        </button>
      </div>

      {/* Currency buttons */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(RATES) as Currency[]).map(currency => (
          <button
            key={currency}
            onClick={() => setSelectedCurrency(currency)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              selectedCurrency === currency
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600'
            }`}
          >
            {CURRENCY_INFO[currency].symbol} {currency}
          </button>
        ))}
      </div>

      {/* Converted price */}
      <div className="text-center py-3 bg-white dark:bg-slate-800 rounded-xl">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {CURRENCY_INFO[selectedCurrency].symbol}{formatPrice(convertedPrice, selectedCurrency)}
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{t.perMonth}</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {getName(selectedCurrency)}
        </div>
      </div>

      {/* Exchange rate info */}
      <div className="text-xs text-gray-400 dark:text-gray-500 text-center space-y-1">
        <div>
          {t.rate}: $1 = {CURRENCY_INFO[selectedCurrency].symbol}{RATES[selectedCurrency].toLocaleString()}
        </div>
        <div>{t.note}</div>
      </div>
    </div>
  )
}
