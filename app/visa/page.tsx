import { prisma } from '@/lib/prisma'
import VisaClient from './VisaClient'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Виза во Вьетнам для россиян 2025 | VietVisa',
  description: 'Полный гайд по визам во Вьетнам: безвизовый въезд до 45 дней, электронная виза e-Visa и виза по прилёту. Калькулятор визы, документы, FAQ.',
  keywords: [
    'виза Вьетнам',
    'e-Visa Вьетнам',
    'виза для россиян Вьетнам',
    'безвизовый въезд Вьетнам',
    'электронная виза Вьетнам',
  ],
  openGraph: {
    title: 'Виза во Вьетнам для россиян 2025 | VietVisa',
    description: 'Полный гайд по визам во Вьетнам: безвизовый въезд, e-Visa, виза по прилёту.',
    url: 'https://visa-beta-azure.vercel.app/visa',
    siteName: 'VietVisa',
    images: [
      {
        url: 'https://static.vecteezy.com/system/resources/previews/045/058/373/non_2x/isolated-illustration-icon-with-simplified-blue-silhouette-of-vietnam-map-polygonal-geometric-style-white-background-vector.jpg',
        width: 1200,
        height: 630,
        alt: 'Виза во Вьетнам',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
}

async function getVisaTypes() {
  try {
    if (!prisma) return []
    return await prisma.visaType.findMany({
      where: { isActive: true },
      orderBy: { price: 'asc' },
    })
  } catch {
    return []
  }
}

async function getFaqs() {
  try {
    if (!prisma) return []
    return await prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    })
  } catch {
    return []
  }
}

export default async function VisaPage() {
  const [visaTypes, faqs] = await Promise.all([getVisaTypes(), getFaqs()])

  // FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  // Service Schema for SEO
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Оформление визы во Вьетнам',
    description: 'Помощь в оформлении электронной визы e-Visa во Вьетнам для россиян',
    provider: {
      '@type': 'Organization',
      name: 'VietVisa',
      url: 'https://visa-beta-azure.vercel.app',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Russia',
    },
    serviceType: 'Visa Services',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="gradient-bg-animated" aria-hidden="true"></div>

      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full text-sm font-semibold text-blue-700 dark:text-blue-400 mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Актуально на 2025 год
              </div>
              <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight dark:text-white">
                Виза во <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-transparent">Вьетнам</span>
              </h1>
              <p className="reveal reveal-delay-2 text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-lg">
                Полный гайд для россиян: безвизовый въезд до 45 дней, электронная виза и виза по прилёту
              </p>
              <a href="#calculator" className="reveal reveal-delay-3 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white font-bold rounded-full hover:shadow-lg active:scale-[0.98] transition text-lg">
                Рассчитать визу
                <span>→</span>
              </a>
            </div>

            {/* Vietnam Map */}
            <div className="reveal reveal-delay-4 relative flex justify-center">
              <img
                src="https://static.vecteezy.com/system/resources/previews/045/058/373/non_2x/isolated-illustration-icon-with-simplified-blue-silhouette-of-vietnam-map-polygonal-geometric-style-white-background-vector.jpg"
                alt="Карта Вьетнама"
                className="vietnam-map w-full max-w-xs md:max-w-sm object-contain"
              />

              {/* Decorative badges */}
              <div className="absolute top-4 right-4 px-3 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-xl shadow-lg flex items-center gap-2">
                <span>🏖️</span>
                <span className="text-sm font-semibold dark:text-white">Пляжи</span>
              </div>
              <div className="absolute bottom-20 left-4 px-3 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-xl shadow-lg flex items-center gap-2">
                <span>🍜</span>
                <span className="text-sm font-semibold dark:text-white">Еда</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '45', label: 'дней без визы' },
              { value: '$25', label: 'стоимость e-Visa' },
              { value: '3', label: 'дня оформление' },
              { value: '90', label: 'дней максимум' },
            ].map((stat, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 text-center shadow-lg border border-white/50 dark:border-slate-700/50 hover:shadow-xl hover:-translate-y-2 transition-all`}>
                <div className="text-4xl font-black bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic content from database */}
        <VisaClient visaTypes={visaTypes} faqs={faqs} />

        {/* CTA */}
        <section className="py-20 px-6 text-center">
          <div className="reveal text-6xl mb-4">🌴</div>
          <h2 className="reveal reveal-delay-1 text-4xl font-black dark:text-white mb-4">Готовы к приключению?</h2>
          <p className="reveal reveal-delay-2 text-xl text-gray-600 dark:text-gray-400 mb-8">Вьетнам ждёт вас!</p>
          <a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="reveal reveal-delay-3 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white font-bold rounded-full hover:shadow-lg active:scale-[0.98] transition text-lg">
            Оформить e-Visa →
          </a>
        </section>
      </main>

      <Footer />
    </>
  )
}
