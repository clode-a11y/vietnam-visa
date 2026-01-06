import { prisma } from '@/lib/prisma'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeContent from './components/HomeContent'
import HomeHeroClient from './components/HomeHeroClient'
import { Metadata } from 'next'

// ISR: revalidate every 60 seconds for fresh data with caching
export const revalidate = 60

export const metadata: Metadata = {
  title: 'VietVisa - Визы и аренда во Вьетнаме | Nha Trang',
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
      {/* SEO Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <Header />

      <HomeContent
        stats={stats}
        apartments={apartments}
        posts={posts}
      />

      <Footer />

      <HomeHeroClient />
    </>
  )
}
