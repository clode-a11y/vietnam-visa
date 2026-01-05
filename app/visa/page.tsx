import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import VisaClient from './VisaClient'
import VisaHero from './VisaHero'
import VisaCta from './VisaCta'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { Metadata } from 'next'

// ISR: revalidate every 5 minutes (visa info changes rarely)
export const revalidate = 300

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
              <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full text-sm font-semibold text-teal-700 dark:text-teal-400 mb-6">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                Актуально на 2025 год
              </div>
              <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight dark:text-white">
                Виза во <span className="bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 bg-clip-text text-transparent">Вьетнам</span>
              </h1>
              <p className="reveal reveal-delay-2 text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-lg">
                Полный гайд для россиян: безвизовый въезд до 45 дней, электронная виза и виза по прилёту
              </p>
              <a href="#calculator" className="reveal reveal-delay-3 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 text-white font-bold rounded-full hover:shadow-lg active:scale-[0.98] transition text-lg">
                Рассчитать визу
                <span>→</span>
              </a>
            </div>

            {/* Vietnam Map */}
            <div className="reveal reveal-delay-4 relative flex justify-center">
              <img
                src="data:image/jpeg;base64,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"
                alt="Карта Вьетнама"
                className="vietnam-map w-full max-w-[180px] md:max-w-[220px] h-auto"
              />
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
              <div key={i} className={`reveal reveal-delay-${i + 1} bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 text-center shadow-lg border border-white/50 dark:border-slate-700/50 hover:shadow-xl hover:-translate-y-2 transition-all`}>
                <div className="text-4xl font-black bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 bg-clip-text text-transparent mb-2">{stat.value}</div>
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
          <a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="reveal reveal-delay-3 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 text-white font-bold rounded-full hover:shadow-lg active:scale-[0.98] transition text-lg">
            Оформить e-Visa →
          </a>
        </section>
      </main>

      <Footer />
    </>
  )
}
