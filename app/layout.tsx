import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import CookieBanner from './components/CookieBanner'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#22C55E',
}

export const metadata: Metadata = {
  title: 'Виза во Вьетнам 2025 | VietVisa - Гайд для россиян',
  description: 'Полный гайд по визам во Вьетнам для россиян. Безвизовый въезд до 45 дней, электронная виза E-Visa за $25, виза по прилёту. Калькулятор визы и консультация.',
  keywords: [
    'виза вьетнам',
    'виза во вьетнам',
    'вьетнам виза для россиян',
    'электронная виза вьетнам',
    'e-visa вьетнам',
    'безвизовый вьетнам',
    'виза по прилету вьетнам',
    'нячанг виза',
    'хошимин виза',
    'фукуок виза',
  ],
  authors: [{ name: 'VietVisa' }],
  creator: 'VietVisa',
  publisher: 'VietVisa',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://visa-beta-azure.vercel.app',
    siteName: 'VietVisa',
    title: 'Виза во Вьетнам 2025 | Гайд для россиян',
    description: 'Безвизовый въезд до 45 дней, E-Visa за $25, виза по прилёту. Калькулятор визы и бесплатная консультация.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Виза во Вьетнам 2025 | VietVisa',
    description: 'Безвизовый въезд до 45 дней, E-Visa за $25. Калькулятор визы для россиян.',
  },
  alternates: {
    canonical: 'https://visa-beta-azure.vercel.app',
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  )
}
