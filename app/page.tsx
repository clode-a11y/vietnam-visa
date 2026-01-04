import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeHeroClient from './components/HomeHeroClient'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'VietVisa - Визы и аренда во Вьетнаме | Нячанг',
  description: 'Всё для переезда во Вьетнам: оформление виз, аренда квартир в Нячанге, полезные гайды. Безвизовый въезд 45 дней, e-Visa, квартиры от $300/мес.',
  keywords: [
    'виза Вьетнам',
    'аренда Нячанг',
    'квартиры Вьетнам',
    'e-Visa',
    'переезд во Вьетнам',
    'жизнь во Вьетнаме',
  ],
  openGraph: {
    title: 'VietVisa - Визы и аренда во Вьетнаме',
    description: 'Всё для переезда во Вьетнам: визы, аренда квартир, полезные гайды',
    url: 'https://visa-beta-azure.vercel.app',
    siteName: 'VietVisa',
    locale: 'ru_RU',
    type: 'website',
  },
}

async function getStats() {
  try {
    if (!prisma) return { apartments: 0, districts: 0 }
    const [apartments, districts] = await Promise.all([
      prisma.apartment.count({ where: { isAvailable: true } }),
      prisma.district.count({ where: { isActive: true } }),
    ])
    return { apartments, districts }
  } catch {
    return { apartments: 0, districts: 0 }
  }
}

async function getRecentApartments() {
  try {
    if (!prisma) return []
    return await prisma.apartment.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
      include: {
        district: true,
        images: {
          where: { isCover: true },
          take: 1,
        },
      },
    })
  } catch {
    return []
  }
}

async function getRecentPosts() {
  try {
    if (!prisma) return []
    return await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    })
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [stats, apartments, posts] = await Promise.all([
    getStats(),
    getRecentApartments(),
    getRecentPosts(),
  ])

  // Organization Schema for SEO
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VietVisa',
    description: 'Визы и аренда квартир во Вьетнаме',
    url: 'https://visa-beta-azure.vercel.app',
    logo: 'https://visa-beta-azure.vercel.app/logo.png',
    sameAs: [],
  }

  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Перейти к содержимому
      </a>

      {/* SEO Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <div className="gradient-bg-animated" aria-hidden="true"></div>

      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <section className="pt-28 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-slate-800/80 backdrop-blur rounded-full text-sm font-semibold text-teal-700 dark:text-teal-400 mb-6 shadow-sm">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
              Актуально на 2025 год
            </div>
            <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight dark:text-white">
              Всё для жизни во{' '}
              <span className="bg-gradient-to-r from-teal-700 via-teal-500 to-teal-300 bg-clip-text text-transparent">
                Вьетнаме
              </span>
            </h1>
            <p className="reveal reveal-delay-2 text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Визы, аренда квартир в Нячанге и полезные гайды для переезда и жизни во Вьетнаме
            </p>

            {/* Main CTA Buttons */}
            <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/visa"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-teal-500/20 active:scale-[0.98] transition text-lg group"
              >
                <span className="text-2xl">📋</span>
                <span>Оформить визу</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/rent"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-400 font-bold rounded-2xl border-2 border-teal-500 hover:bg-teal-50 dark:hover:bg-slate-700 active:scale-[0.98] transition text-lg group"
              >
                <span className="text-2xl">🏠</span>
                <span>Снять квартиру</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Vietnam Map - SVG without background */}
            <div className="reveal reveal-delay-4 relative flex justify-center mb-8">
              <svg
                viewBox="0 0 100 200"
                className="vietnam-map w-full max-w-[180px] md:max-w-[220px] h-auto"
                fill="url(#vietnamGradient)"
              >
                <defs>
                  <linearGradient id="vietnamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#115E67" />
                    <stop offset="50%" stopColor="#3D9DA1" />
                    <stop offset="100%" stopColor="#A8D8D8" />
                  </linearGradient>
                </defs>
                {/* Simplified Vietnam shape */}
                <path d="M55 5 C60 8, 65 12, 68 18 C72 25, 70 32, 65 38 C60 42, 55 45, 58 52 C62 60, 68 65, 65 72 C60 78, 55 82, 52 88 C50 95, 55 102, 60 108 C65 115, 62 122, 58 128 C54 135, 50 142, 48 150 C46 158, 50 165, 55 172 C60 178, 58 185, 52 190 C48 193, 42 195, 38 192 C32 188, 35 180, 38 172 C40 165, 35 158, 30 152 C25 145, 28 138, 32 132 C35 125, 30 118, 25 112 C20 105, 22 98, 28 92 C32 88, 28 82, 25 78 C22 72, 25 65, 30 60 C35 55, 32 48, 28 42 C25 35, 30 28, 38 22 C45 15, 50 10, 55 5 Z" />
              </svg>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: '45', label: 'дней без визы', icon: '✈️' },
              { value: '$25', label: 'стоимость e-Visa', icon: '📋' },
              { value: stats.apartments > 0 ? String(stats.apartments) : '50+', label: 'квартир в аренду', icon: '🏠' },
              { value: stats.districts > 0 ? String(stats.districts) : '5+', label: 'районов Нячанга', icon: '📍' },
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
              <p className="reveal text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">Наши услуги</p>
              <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl font-black dark:text-white">Что мы предлагаем</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Visa Service */}
              <Link
                href="/visa"
                className="reveal reveal-delay-1 group bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-teal-100 dark:border-teal-900/30 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-2 transition-all"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📋</div>
                <h3 className="text-xl font-bold dark:text-white mb-2">Визы</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Безвизовый въезд до 45 дней, электронная виза e-Visa, калькулятор визы
                </p>
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold group-hover:gap-3 transition-all">
                  <span>Подробнее</span>
                  <span>→</span>
                </div>
              </Link>

              {/* Rent Service */}
              <Link
                href="/rent"
                className="reveal reveal-delay-2 group bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-teal-100 dark:border-teal-900/30 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-2 transition-all"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏠</div>
                <h3 className="text-xl font-bold dark:text-white mb-2">Аренда</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Квартиры в Нячанге от $300/мес, видео-просмотры, помощь с заселением
                </p>
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold group-hover:gap-3 transition-all">
                  <span>Каталог</span>
                  <span>→</span>
                </div>
              </Link>

              {/* Blog Service */}
              <Link
                href="/blog"
                className="reveal reveal-delay-3 group bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-teal-100 dark:border-teal-900/30 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-2 transition-all"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📖</div>
                <h3 className="text-xl font-bold dark:text-white mb-2">Блог</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Полезные статьи о жизни во Вьетнаме, советы, лайфхаки и новости
                </p>
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold group-hover:gap-3 transition-all">
                  <span>Читать</span>
                  <span>→</span>
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
                  <p className="reveal text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">Аренда</p>
                  <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl font-black dark:text-white">Новые квартиры</h2>
                </div>
                <Link
                  href="/rent/apartments"
                  className="reveal reveal-delay-2 hidden sm:inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:gap-3 transition-all"
                >
                  <span>Все квартиры</span>
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
                        <img
                          src={apt.images[0].url}
                          alt={apt.titleRu}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-4xl group-hover:scale-110 transition-transform">
                          🏠
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 mb-1">
                        {apt.titleRu}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {apt.district.nameRu}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {apt.rooms === 0 ? 'Студия' : `${apt.rooms} комн.`} • {apt.area} м²
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
                  <span>Все квартиры</span>
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
                  <p className="reveal text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">Блог</p>
                  <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl font-black dark:text-white">Свежие статьи</h2>
                </div>
                <Link
                  href="/blog"
                  className="reveal reveal-delay-2 hidden sm:inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:gap-3 transition-all"
                >
                  <span>Все статьи</span>
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
                        <img
                          src={post.coverImage}
                          alt={post.titleRu}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400 text-xs font-semibold rounded-full">
                          {post.category === 'guides' ? 'Гайд' : post.category === 'news' ? 'Новости' : 'Советы'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {post.readTime} мин
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
                        {post.titleRu}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {post.excerptRu}
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
                  <span>Все статьи</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 px-6 text-center">
          <div className="reveal text-6xl mb-4">🌴</div>
          <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl font-black dark:text-white mb-4">Готовы к переезду?</h2>
          <p className="reveal reveal-delay-2 text-xl text-gray-600 dark:text-gray-400 mb-8">Вьетнам ждёт вас!</p>
          <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/visa"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 text-white font-bold rounded-full hover:shadow-lg hover:shadow-teal-500/20 active:scale-[0.98] transition text-lg"
            >
              Рассчитать визу →
            </Link>
            <Link
              href="/rent/apartments"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-400 font-bold rounded-full border-2 border-teal-500 hover:bg-teal-50 dark:hover:bg-slate-700 active:scale-[0.98] transition text-lg"
            >
              Смотреть квартиры →
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <HomeHeroClient />
    </>
  )
}
