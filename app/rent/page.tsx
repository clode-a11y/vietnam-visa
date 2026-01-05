'use client'

import Link from 'next/link'
import Image from 'next/image'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import FloatingContact from '@/app/components/FloatingContact'
import { useLocale } from '@/lib/i18n/context'
import { translations } from '@/lib/i18n/translations'

export default function RentPage() {
  const { locale } = useLocale()
  const t = (key: string) => translations[locale][key] || key

  // Mock data for demo
  const districts = [
    { id: '1', name: 'Центр (European Quarter)', nameEn: 'Center (European Quarter)', nameVi: 'Trung tâm', image: '/images/districts/center.jpg', count: 45 },
    { id: '2', name: 'Vincom', nameEn: 'Vincom', nameVi: 'Vincom', image: '/images/districts/vincom.jpg', count: 32 },
    { id: '3', name: 'An Viên', nameEn: 'An Vien', nameVi: 'An Viên', image: '/images/districts/anvien.jpg', count: 28 },
    { id: '4', name: 'Hòn Chồng', nameEn: 'Hon Chong', nameVi: 'Hòn Chồng', image: '/images/districts/honchong.jpg', count: 18 },
  ]

  const getDistrictName = (d: typeof districts[0]) => {
    if (locale === 'vi') return d.nameVi
    if (locale === 'en') return d.nameEn
    return d.name
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center text-white pt-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1920&q=80"
            alt="Панорама Нячанга с высоты"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-800/70 to-teal-700/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('rent.title')}
            </h1>
            <p className="text-lg sm:text-xl text-teal-100 mb-8">
              {t('rent.subtitle')}
            </p>

            {/* Search */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t('rent.search')}
                className="flex-1 px-5 py-4 rounded-xl text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Link
                href="/rent/apartments"
                className="px-6 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 active:scale-95 transition"
              >
                {t('rent.viewAll')}
              </Link>
            </div>

            {/* Quick links */}
            <div className="flex gap-3 mt-4">
              <Link
                href="/rent/apartments"
                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition text-sm"
              >
                <span>📋</span>
                {locale === 'ru' ? 'Каталог' : locale === 'en' ? 'Catalog' : 'Danh mục'}
              </Link>
              <Link
                href="/rent/map"
                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition text-sm"
              >
                <span>🗺️</span>
                {locale === 'ru' ? 'На карте' : locale === 'en' ? 'On Map' : 'Trên bản đồ'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Districts Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {t('rent.popularDistricts')}
            </h2>
            <Link
              href="/rent/apartments"
              className="text-teal-600 dark:text-teal-400 hover:text-teal-700 font-medium text-sm"
            >
              {t('rent.viewAll')} →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {districts.map(district => (
              <Link
                key={district.id}
                href={`/rent/apartments?district=${district.id}`}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-teal-100 to-teal-200 dark:from-slate-700 dark:to-slate-800 hover:shadow-lg transition"
              >
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 group-hover:scale-110 transition">
                  🏢
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-sm sm:text-base line-clamp-2">{getDistrictName(district)}</h3>
                  <p className="text-sm text-white/80">{district.count} {t('rent.apartments')}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* New Listings */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {t('rent.newListings')}
            </h2>
            <Link
              href="/rent/apartments"
              className="text-teal-600 dark:text-teal-400 hover:text-teal-700 font-medium text-sm"
            >
              {t('rent.viewAll')} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: '1', title: 'Студия с видом на море', district: 'Центр', price: 400, rooms: 1, area: 35 },
              { id: '2', title: '2-комнатная в Vincom', district: 'Vincom', price: 600, rooms: 2, area: 55 },
              { id: '3', title: 'Апартаменты у пляжа', district: 'An Viên', price: 500, rooms: 1, area: 40 },
              { id: '4', title: 'Семейная квартира', district: 'Hòn Chồng', price: 700, rooms: 3, area: 80 },
            ].map(apt => (
              <Link
                key={apt.id}
                href={`/rent/apartments/${apt.id}`}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-teal-100 to-teal-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-4xl group-hover:scale-105 transition">
                  🏠
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{apt.title}</h3>
                    <span className="font-bold text-teal-600 dark:text-teal-400 whitespace-nowrap">
                      ${apt.price}{t('rent.perMonth')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{apt.district}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {apt.rooms} {t('rent.rooms')} • {apt.area} {t('rent.area')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {locale === 'ru' ? 'Почему выбирают нас' : locale === 'en' ? 'Why Choose Us' : 'Tại sao chọn chúng tôi'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🎥', title: t('rent.features.video'), desc: t('rent.features.videoDesc') },
              { icon: '✅', title: t('rent.features.verified'), desc: t('rent.features.verifiedDesc') },
              { icon: '🗣️', title: t('rent.features.russian'), desc: t('rent.features.russianDesc') },
            ].map(feature => (
              <div key={feature.title} className="text-center">
                <span className="text-4xl block mb-3">{feature.icon}</span>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <FloatingContact />
    </div>
  )
}
