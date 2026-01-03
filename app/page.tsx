import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import HomeClient from './components/HomeClient'
import Header from './components/Header'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

export default async function HomePage() {
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

      {/* Header */}
      <Header />

      {/* Hero */}
      <main id="main-content">
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full text-sm font-semibold text-green-700 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Актуально на 2025 год
            </div>
            <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
              Виза во <span className="bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Вьетнам</span>
            </h1>
            <p className="reveal reveal-delay-2 text-lg sm:text-xl text-gray-700 mb-8 max-w-lg">
              Полный гайд для россиян: безвизовый въезд до 45 дней, электронная виза и виза по прилёту
            </p>
            <a href="#calculator" className="reveal reveal-delay-3 inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition text-lg">
              Рассчитать визу
              <span>→</span>
            </a>
          </div>

          {/* Vietnam Map */}
          <div className="reveal reveal-delay-4 relative">
            <svg className="vietnam-map" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#22C55E'}}/>
                  <stop offset="50%" style={{stopColor:'#FB7185'}}/>
                  <stop offset="100%" style={{stopColor:'#F97316'}}/>
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="#22C55E" floodOpacity="0.3"/>
                </filter>
              </defs>

              <path className="map-shape" d="M 145 25 C 160 28, 175 35, 185 45 C 195 55, 200 70, 195 85 C 190 100, 175 110, 170 125 C 165 140, 170 155, 180 170 C 190 185, 200 195, 195 215 C 190 235, 175 250, 170 270 C 165 290, 170 310, 175 330 C 180 350, 175 370, 165 390 C 155 410, 140 425, 125 440 C 110 455, 90 465, 75 470 C 60 475, 45 470, 40 455 C 35 440, 45 420, 55 400 C 65 380, 75 360, 80 340 C 85 320, 80 300, 85 280 C 90 260, 100 245, 105 225 C 110 205, 105 185, 100 165 C 95 145, 90 125, 95 105 C 100 85, 115 70, 125 55 C 135 40, 140 30, 145 25 Z" fill="url(#mapGradient)" filter="url(#shadow)"/>

              {/* City markers */}
              <g className="city-markers">
                <g className="city-marker">
                  <circle cx="155" cy="75" r="8" fill="#FFFFFF" stroke="url(#mapGradient)" strokeWidth="3"/>
                  <circle cx="155" cy="75" r="4" fill="url(#mapGradient)"/>
                </g>
                <g className="city-marker" style={{animationDelay: '0.3s'}}>
                  <circle cx="175" cy="200" r="7" fill="#FFFFFF" stroke="url(#mapGradient)" strokeWidth="3"/>
                  <circle cx="175" cy="200" r="3" fill="url(#mapGradient)"/>
                </g>
                <g className="city-marker" style={{animationDelay: '0.6s'}}>
                  <circle cx="160" cy="300" r="7" fill="#FFFFFF" stroke="url(#mapGradient)" strokeWidth="3"/>
                  <circle cx="160" cy="300" r="3" fill="url(#mapGradient)"/>
                </g>
                <g className="city-marker" style={{animationDelay: '0.9s'}}>
                  <circle cx="100" cy="400" r="8" fill="#FFFFFF" stroke="url(#mapGradient)" strokeWidth="3"/>
                  <circle cx="100" cy="400" r="4" fill="url(#mapGradient)"/>
                </g>
                <g className="city-marker" style={{animationDelay: '1.2s'}}>
                  <circle cx="55" cy="445" r="6" fill="#FFFFFF" stroke="url(#mapGradient)" strokeWidth="3"/>
                  <circle cx="55" cy="445" r="2.5" fill="url(#mapGradient)"/>
                </g>
              </g>

              {/* City labels */}
              <g fill="#1A1A1A" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="12">
                <text x="175" y="80">Ханой</text>
                <text x="195" y="205">Дананг</text>
                <text x="180" y="305">Нячанг</text>
                <text x="120" y="405">Хошимин</text>
                <text x="70" y="455">Фукуок</text>
              </g>
            </svg>

            {/* Decorative badges */}
            <div className="absolute top-4 right-0 px-3 py-2 bg-white/90 backdrop-blur rounded-xl shadow-lg flex items-center gap-2">
              <span>🏖️</span>
              <span className="text-sm font-semibold">Пляжи</span>
            </div>
            <div className="absolute bottom-20 left-0 px-3 py-2 bg-white/90 backdrop-blur rounded-xl shadow-lg flex items-center gap-2">
              <span>🍜</span>
              <span className="text-sm font-semibold">Еда</span>
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
            <div key={i} className={`reveal reveal-delay-${i + 1} bg-white/80 backdrop-blur-xl rounded-3xl p-6 text-center shadow-lg border border-white/50 hover:shadow-xl hover:-translate-y-2 transition-all`}>
              <div className="text-4xl font-black bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic content from database */}
      <HomeClient visaTypes={visaTypes} faqs={faqs} />

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="reveal text-6xl mb-4">🌴</div>
        <h2 className="reveal reveal-delay-1 text-4xl font-black mb-4">Готовы к приключению?</h2>
        <p className="reveal reveal-delay-2 text-xl text-gray-600 mb-8">Вьетнам ждёт вас!</p>
        <a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="reveal reveal-delay-3 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg transition text-lg">
          Оформить e-Visa →
        </a>
      </section>

      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-black/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">🇻🇳 VietVisa</h3>
            <p className="text-gray-600 text-sm">Гайд по визам во Вьетнам для россиян. 2025</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-800">Разделы</h4>
            <div className="space-y-2">
              <a href="#features" className="block text-gray-600 hover:text-green-600 text-sm">Типы виз</a>
              <a href="#process" className="block text-gray-600 hover:text-green-600 text-sm">Процесс</a>
              <a href="#calculator" className="block text-gray-600 hover:text-green-600 text-sm">Калькулятор</a>
              <a href="#faq" className="block text-gray-600 hover:text-green-600 text-sm">FAQ</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-800">Полезное</h4>
            <div className="space-y-2">
              <a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="block text-gray-600 hover:text-green-600 text-sm">Сайт e-Visa</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-800">Города</h4>
            <div className="space-y-2">
              <span className="block text-gray-600 text-sm">Нячанг</span>
              <span className="block text-gray-600 text-sm">Хошимин</span>
              <span className="block text-gray-600 text-sm">Ханой</span>
              <span className="block text-gray-600 text-sm">Фукуок</span>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-8 border-t border-gray-100 flex justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 VietVisa</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-gray-400 hover:text-gray-600 text-sm">
              Конфиденциальность
            </Link>
            <Link href="/admin" className="text-gray-400 hover:text-gray-600 text-sm">
              Админ
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
