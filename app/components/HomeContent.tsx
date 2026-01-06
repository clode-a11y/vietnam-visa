'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/lib/i18n/context'

interface Apartment {
  id: string
  titleRu: string
  titleEn: string | null
  titleVi: string | null
  rooms: number
  area: number
  priceUsd: number
  district: {
    nameRu: string
    nameEn: string | null
    nameVi: string | null
  }
  images: { url: string }[]
}

interface BlogPost {
  id: string
  slug: string
  titleRu: string
  titleEn: string | null
  excerptRu: string | null
  excerptEn: string | null
  coverImage: string | null
  category: string
  readTime: number
}

interface HomeContentProps {
  stats: { apartments: number; districts: number }
  apartments: Apartment[]
  posts: BlogPost[]
}

export default function HomeContent({ stats, apartments, posts }: HomeContentProps) {
  const { t, locale } = useLocale()

  const getLocalizedText = (ru: string, en: string | null, vi: string | null) => {
    if (locale === 'en' && en) return en
    if (locale === 'vi' && vi) return vi
    return ru
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'guides': return t('home.blog.guide')
      case 'news': return t('home.blog.news')
      default: return t('home.blog.tips')
    }
  }

  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        {t('home.skipLink')}
      </a>

      <div className="gradient-bg-animated" aria-hidden="true"></div>

      <main id="main-content">
        {/* Hero Section with Photo */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1920&q=80"
              alt="Nha Trang, Vietnam"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#115E67]/70 via-[#115E67]/50 to-[#115E67]/80"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto text-center px-6 py-20">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold text-white mb-6 border border-white/30">
              <span className="w-2 h-2 bg-[#A8D8D8] rounded-full animate-pulse"></span>
              {t('home.badge')}
            </div>
            <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight text-white">
              {t('home.title')}{' '}
              <span className="text-[#A8D8D8]">
                {t('home.titleHighlight')}
              </span>
            </h1>
            <p className="reveal reveal-delay-2 text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              {t('home.subtitle')}
            </p>

            {/* Main CTA Buttons */}
            <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/visa"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#3D9DA1] hover:bg-[#115E67] text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-black/20 active:scale-[0.98] transition text-lg group"
              >
                <span className="text-2xl">📋</span>
                <span>{t('home.ctaVisa')}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/rent"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl border-2 border-white/50 hover:bg-white/30 active:scale-[0.98] transition text-lg group"
              >
                <span className="text-2xl">🏠</span>
                <span>{t('home.ctaRent')}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="reveal reveal-delay-4 absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: '45', label: t('home.stats.visaFree'), icon: '✈️' },
              { value: '$25', label: t('home.stats.evisaCost'), icon: '📋' },
              { value: stats.apartments > 0 ? String(stats.apartments) : '50+', label: t('home.stats.apartments'), icon: '🏠' },
              { value: stats.districts > 0 ? String(stats.districts) : '5+', label: t('home.stats.districts'), icon: '📍' },
            ].map((stat, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 text-center shadow-lg border border-teal-100 dark:border-teal-900/30 hover:shadow-xl hover:-translate-y-1 transition-all`}>
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-4xl font-black bg-gradient-to-r from-teal-700 via-teal-500 to-teal-300 bg-clip-text text-transparent mb-1">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="reveal text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">{t('home.services.title')}</p>
              <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl font-black dark:text-white">{t('home.services.heading')}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Visa Service */}
              <Link
                href="/visa"
                className="reveal reveal-delay-1 group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all h-80"
              >
                <Image
                  src="https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80"
                  alt={t('home.services.visa')}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#115E67] via-[#115E67]/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-4xl mb-2">📋</div>
                  <h3 className="text-xl font-bold mb-2">{t('home.services.visa')}</h3>
                  <p className="text-white/80 text-sm mb-3">{t('home.services.visaDesc')}</p>
                  <div className="flex items-center gap-2 text-[#A8D8D8] font-semibold group-hover:gap-3 transition-all">
                    <span>{t('home.services.visaCta')}</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>

              {/* Rent Service */}
              <Link
                href="/rent"
                className="reveal reveal-delay-2 group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all h-80"
              >
                <Image
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"
                  alt={t('home.services.rent')}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#115E67] via-[#115E67]/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-4xl mb-2">🏠</div>
                  <h3 className="text-xl font-bold mb-2">{t('home.services.rent')}</h3>
                  <p className="text-white/80 text-sm mb-3">{t('home.services.rentDesc')}</p>
                  <div className="flex items-center gap-2 text-[#A8D8D8] font-semibold group-hover:gap-3 transition-all">
                    <span>{t('home.services.rentCta')}</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>

              {/* Blog Service */}
              <Link
                href="/blog"
                className="reveal reveal-delay-3 group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all h-80"
              >
                <Image
                  src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80"
                  alt={t('home.services.blog')}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#115E67] via-[#115E67]/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-4xl mb-2">📖</div>
                  <h3 className="text-xl font-bold mb-2">{t('home.services.blog')}</h3>
                  <p className="text-white/80 text-sm mb-3">{t('home.services.blogDesc')}</p>
                  <div className="flex items-center gap-2 text-[#A8D8D8] font-semibold group-hover:gap-3 transition-all">
                    <span>{t('home.services.blogCta')}</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Apartments */}
        {apartments.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="reveal text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">{t('home.apartments.title')}</p>
                  <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl font-black dark:text-white">{t('home.apartments.heading')}</h2>
                </div>
                <Link
                  href="/rent/apartments"
                  className="reveal reveal-delay-2 hidden sm:inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:gap-3 transition-all"
                >
                  <span>{t('home.apartments.viewAll')}</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {apartments.map((apt, i) => (
                  <Link
                    key={apt.id}
                    href={`/rent/apartments/${apt.id}`}
                    className={`reveal reveal-delay-${i + 1} group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all`}
                  >
                    <div className="aspect-[4/3] relative bg-gradient-to-br from-teal-100 to-teal-200 dark:from-slate-700 dark:to-slate-600 overflow-hidden">
                      {apt.images[0]?.url ? (
                        <Image
                          src={apt.images[0].url}
                          alt={getLocalizedText(apt.titleRu, apt.titleEn, apt.titleVi)}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-4xl group-hover:scale-110 transition-transform">
                          🏠
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 mb-1">
                        {getLocalizedText(apt.titleRu, apt.titleEn, apt.titleVi)}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {getLocalizedText(apt.district.nameRu, apt.district.nameEn, apt.district.nameVi)}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {apt.rooms === 0 ? t('home.apartments.studio') : `${apt.rooms} ${t('home.apartments.rooms')}`} • {apt.area} m²
                        </span>
                        <span className="font-bold text-teal-600 dark:text-teal-400">
                          ${apt.priceUsd}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-6 sm:hidden">
                <Link
                  href="/rent/apartments"
                  className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold"
                >
                  <span>{t('home.apartments.viewAll')}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Recent Blog Posts */}
        {posts.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="reveal text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">{t('home.blog.title')}</p>
                  <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl font-black dark:text-white">{t('home.blog.heading')}</h2>
                </div>
                <Link
                  href="/blog"
                  className="reveal reveal-delay-2 hidden sm:inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:gap-3 transition-all"
                >
                  <span>{t('home.blog.viewAll')}</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className={`reveal reveal-delay-${i + 1} group bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all`}
                  >
                    {post.coverImage && (
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={getLocalizedText(post.titleRu, post.titleEn, null)}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400 text-xs font-semibold rounded-full">
                          {getCategoryLabel(post.category)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {post.readTime} {t('home.blog.min')}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
                        {getLocalizedText(post.titleRu, post.titleEn, null)}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {getLocalizedText(post.excerptRu || '', post.excerptEn, null)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-6 sm:hidden">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold"
                >
                  <span>{t('home.blog.viewAll')}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1920&q=80"
              alt="Vietnam sunset"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#115E67]/90 to-[#3D9DA1]/80"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="reveal text-6xl mb-4">🌴</div>
            <h2 className="reveal reveal-delay-1 text-3xl md:text-5xl font-black text-white mb-4">{t('home.cta.heading')}</h2>
            <p className="reveal reveal-delay-2 text-xl text-white/80 mb-8">{t('home.cta.subtitle')}</p>
            <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/visa"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#115E67] font-bold rounded-full hover:shadow-lg hover:shadow-black/20 active:scale-[0.98] transition text-lg"
              >
                {t('home.cta.visa')} →
              </Link>
              <Link
                href="/rent/apartments"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white/10 active:scale-[0.98] transition text-lg"
              >
                {t('home.cta.apartments')} →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
