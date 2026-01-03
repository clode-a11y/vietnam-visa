'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import FloatingContact from '@/app/components/FloatingContact'
import { useLocale } from '@/lib/i18n/context'
import { translations } from '@/lib/i18n/translations'

export default function ApartmentsPage() {
  const { locale } = useLocale()
  const t = (key: string) => translations[locale][key] || key
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedRooms, setSelectedRooms] = useState<number | null>(null)

  const districts = [
    { id: '1', name: 'Центр', nameEn: 'Center', nameVi: 'Trung tâm' },
    { id: '2', name: 'Vincom', nameEn: 'Vincom', nameVi: 'Vincom' },
    { id: '3', name: 'An Viên', nameEn: 'An Vien', nameVi: 'An Viên' },
    { id: '4', name: 'Hòn Chồng', nameEn: 'Hon Chong', nameVi: 'Hòn Chồng' },
  ]

  const getDistrictName = (d: typeof districts[0]) => {
    if (locale === 'vi') return d.nameVi
    if (locale === 'en') return d.nameEn
    return d.name
  }

  // Mock apartments
  const apartments = [
    { id: '1', title: 'Студия с видом на море', titleEn: 'Sea View Studio', titleVi: 'Studio nhìn ra biển', district: 'Центр', districtEn: 'Center', districtVi: 'Trung tâm', price: 400, rooms: 1, area: 35, image: '🏠' },
    { id: '2', title: '2-комнатная в Vincom', titleEn: '2-room at Vincom', titleVi: 'Căn hộ 2 phòng Vincom', district: 'Vincom', districtEn: 'Vincom', districtVi: 'Vincom', price: 600, rooms: 2, area: 55, image: '🏢' },
    { id: '3', title: 'Апартаменты у пляжа', titleEn: 'Beach Apartment', titleVi: 'Căn hộ gần biển', district: 'An Viên', districtEn: 'An Vien', districtVi: 'An Viên', price: 500, rooms: 1, area: 40, image: '🏖️' },
    { id: '4', title: 'Семейная квартира', titleEn: 'Family Apartment', titleVi: 'Căn hộ gia đình', district: 'Hòn Chồng', districtEn: 'Hon Chong', districtVi: 'Hòn Chồng', price: 700, rooms: 3, area: 80, image: '👨‍👩‍👧‍👦' },
    { id: '5', title: 'Современная студия', titleEn: 'Modern Studio', titleVi: 'Studio hiện đại', district: 'Центр', districtEn: 'Center', districtVi: 'Trung tâm', price: 450, rooms: 1, area: 38, image: '✨' },
    { id: '6', title: 'Квартира с бассейном', titleEn: 'Apartment with Pool', titleVi: 'Căn hộ có hồ bơi', district: 'Vincom', districtEn: 'Vincom', districtVi: 'Vincom', price: 800, rooms: 2, area: 65, image: '🏊' },
  ]

  const getAptTitle = (apt: typeof apartments[0]) => {
    if (locale === 'vi') return apt.titleVi
    if (locale === 'en') return apt.titleEn
    return apt.title
  }

  const getAptDistrict = (apt: typeof apartments[0]) => {
    if (locale === 'vi') return apt.districtVi
    if (locale === 'en') return apt.districtEn
    return apt.district
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24">
        {/* Page title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {t('rent.title')}
        </h1>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex flex-wrap gap-3">
            {/* District filter */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t('rent.filters.district')}: {t('rent.filters.all')}</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>{getDistrictName(d)}</option>
              ))}
            </select>

            {/* Rooms filter */}
            <div className="flex gap-1 bg-gray-100 dark:bg-slate-700 rounded-xl p-1">
              {[
                { value: null, label: t('rent.filters.all') },
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3+' },
              ].map(opt => (
                <button
                  key={opt.value ?? 'all'}
                  onClick={() => setSelectedRooms(opt.value)}
                  className={`px-3 py-2 text-sm rounded-lg transition ${
                    selectedRooms === opt.value
                      ? 'bg-white dark:bg-slate-600 shadow text-gray-900 dark:text-white font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apartments grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {apartments.map(apt => (
            <Link
              key={apt.id}
              href={`/rent/apartments/${apt.id}`}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-5xl group-hover:scale-105 transition">
                {apt.image}
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
          ))}
        </div>
      </main>

      <FloatingContact />
    </div>
  )
}
