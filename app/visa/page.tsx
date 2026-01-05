import { prisma } from '@/lib/prisma'
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
        {/* Hero and Stats with photos - using client component */}
        <VisaHero />

        {/* Dynamic content from database */}
        <VisaClient visaTypes={visaTypes} faqs={faqs} />

        {/* CTA with photo background - using client component */}
        <VisaCta />
      </main>

      <Footer />
    </>
  )
}
