'use client'

import { useState } from 'react'

interface SubscriptionFormProps {
  locale: string
  districts?: { id: string; nameRu: string; nameEn: string; nameVi: string }[]
}

const LABELS = {
  ru: {
    title: 'Подписка на новые квартиры',
    subtitle: 'Получайте уведомления о новых квартирах на email',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    priceRange: 'Цена (USD)',
    from: 'От',
    to: 'До',
    rooms: 'Комнаты',
    anyRooms: 'Любое',
    studio: 'Студия',
    room: 'комн.',
    district: 'Район',
    anyDistrict: 'Любой район',
    subscribe: 'Подписаться',
    subscribing: 'Подписка...',
    success: 'Вы подписаны! Проверьте почту.',
    updated: 'Подписка обновлена!',
    error: 'Ошибка. Попробуйте ещё раз.',
  },
  en: {
    title: 'Subscribe to new apartments',
    subtitle: 'Get email notifications about new apartments',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    priceRange: 'Price (USD)',
    from: 'From',
    to: 'To',
    rooms: 'Rooms',
    anyRooms: 'Any',
    studio: 'Studio',
    room: 'rm',
    district: 'District',
    anyDistrict: 'Any district',
    subscribe: 'Subscribe',
    subscribing: 'Subscribing...',
    success: 'Subscribed! Check your email.',
    updated: 'Subscription updated!',
    error: 'Error. Please try again.',
  },
  vi: {
    title: 'Đăng ký căn hộ mới',
    subtitle: 'Nhận thông báo email về căn hộ mới',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    priceRange: 'Giá (USD)',
    from: 'Từ',
    to: 'Đến',
    rooms: 'Phòng',
    anyRooms: 'Bất kỳ',
    studio: 'Studio',
    room: 'phòng',
    district: 'Quận',
    anyDistrict: 'Bất kỳ quận nào',
    subscribe: 'Đăng ký',
    subscribing: 'Đang đăng ký...',
    success: 'Đã đăng ký! Kiểm tra email.',
    updated: 'Đã cập nhật đăng ký!',
    error: 'Lỗi. Vui lòng thử lại.',
  },
}

export function SubscriptionForm({ locale, districts = [] }: SubscriptionFormProps) {
  const [email, setEmail] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minRooms, setMinRooms] = useState('')
  const [maxRooms, setMaxRooms] = useState('')
  const [districtId, setDistrictId] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [error, setError] = useState(false)

  const t = LABELS[locale as keyof typeof LABELS] || LABELS.en

  const getDistrictName = (d: { nameRu: string; nameEn: string; nameVi: string }) => {
    if (locale === 'vi') return d.nameVi
    if (locale === 'en') return d.nameEn
    return d.nameRu
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setUpdated(false)
    setError(false)

    try {
      const res = await fetch('/api/rent/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          minPrice: minPrice ? parseInt(minPrice) : null,
          maxPrice: maxPrice ? parseInt(maxPrice) : null,
          minRooms: minRooms ? parseInt(minRooms) : null,
          maxRooms: maxRooms ? parseInt(maxRooms) : null,
          districtId: districtId || null,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.updated) {
          setUpdated(true)
        } else {
          setSuccess(true)
        }
        setEmail('')
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 md:p-8">
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">📬</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {t.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {t.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t.email} *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            required
            className="w-full px-4 py-3 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:text-white"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t.priceRange}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder={t.from}
              min="0"
              className="w-1/2 px-4 py-3 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:text-white"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder={t.to}
              min="0"
              className="w-1/2 px-4 py-3 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:text-white"
            />
          </div>
        </div>

        {/* Rooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t.rooms}
          </label>
          <div className="flex gap-2">
            <select
              value={minRooms}
              onChange={(e) => setMinRooms(e.target.value)}
              className="w-1/2 px-4 py-3 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:text-white"
            >
              <option value="">{t.from}</option>
              <option value="0">{t.studio}</option>
              <option value="1">1 {t.room}</option>
              <option value="2">2 {t.room}</option>
              <option value="3">3 {t.room}</option>
              <option value="4">4+ {t.room}</option>
            </select>
            <select
              value={maxRooms}
              onChange={(e) => setMaxRooms(e.target.value)}
              className="w-1/2 px-4 py-3 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:text-white"
            >
              <option value="">{t.to}</option>
              <option value="0">{t.studio}</option>
              <option value="1">1 {t.room}</option>
              <option value="2">2 {t.room}</option>
              <option value="3">3 {t.room}</option>
              <option value="4">4+ {t.room}</option>
            </select>
          </div>
        </div>

        {/* District */}
        {districts.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.district}
            </label>
            <select
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:text-white"
            >
              <option value="">{t.anyDistrict}</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {getDistrictName(d)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg active:scale-[0.98] transition disabled:opacity-50"
        >
          {loading ? t.subscribing : t.subscribe}
        </button>

        {/* Status messages */}
        {success && (
          <p className="text-center text-green-600 dark:text-green-400 font-medium">
            ✅ {t.success}
          </p>
        )}
        {updated && (
          <p className="text-center text-blue-600 dark:text-blue-400 font-medium">
            ✅ {t.updated}
          </p>
        )}
        {error && (
          <p className="text-center text-red-600 dark:text-red-400 font-medium">
            ❌ {t.error}
          </p>
        )}
      </form>
    </div>
  )
}
