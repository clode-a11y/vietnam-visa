import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import CookieBanner from './components/CookieBanner'
import FloatingContact from './components/FloatingContact'
import YandexMetrika from './components/YandexMetrika'
import ServiceWorkerRegistration from './components/ServiceWorkerRegistration'
import AccessibilityPanel from './components/AccessibilityPanel'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3D9DA1',
}

export const metadata: Metadata = {
  title: 'Виза во Вьетнам 2025 | VietVisa - Гайд для россиян',
  description: 'Полный гайд по визам во Вьетнам для россиян. Безвизовый въезд до 45 дней, электронная виза E-Visa за $25, виза по прилёту. Калькулятор визы и консультация.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'VietVisa',
  },
  formatDetection: {
    telephone: false,
  },
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
    images: [
      {
        url: 'https://visa-beta-azure.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VietVisa - Визы и аренда во Вьетнаме',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Виза во Вьетнам 2025 | VietVisa',
    description: 'Безвизовый въезд до 45 дней, E-Visa за $25. Калькулятор визы для россиян.',
    images: ['https://visa-beta-azure.vercel.app/og-image.jpg'],
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
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Critical CSS for above-the-fold content - eliminates render blocking */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root{--teal-light:#A8D8D8;--teal:#3D9DA1;--teal-dark:#115E67;--text-primary:#1A2A2A;--text-secondary:#4A6B6B}
              html.dark{--teal-light:#1E4A4D;--teal-dark:#A8D8D8;--text-primary:#F8FAFA;--text-secondary:#A8C8C8}
              body{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased;background:#fff;margin:0}
              html.dark body{background:#0D1717;color:#F8FAFA}
              .gradient-bg-animated{position:fixed;inset:0;background:linear-gradient(180deg,#fff 0%,#fff 40%,rgba(168,216,216,.15) 70%,rgba(61,157,161,.08) 85%,rgba(168,216,216,.12) 100%);z-index:-1}
              html.dark .gradient-bg-animated{background:linear-gradient(180deg,#0D1717 0%,#0D1717 40%,rgba(61,157,161,.1) 70%,rgba(17,94,103,.15) 85%,rgba(61,157,161,.08) 100%)}
              header{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border-bottom:1px solid rgba(0,0,0,.05)}
              html.dark header{background:rgba(13,23,23,.9);border-color:rgba(61,157,161,.2)}
              .skip-link{position:absolute;top:-100px;left:50%;transform:translateX(-50%);background:var(--teal-dark);color:#fff;padding:1rem 2rem;border-radius:0 0 12px 12px;font-weight:600;z-index:9999;transition:top .3s}
              .skip-link:focus{top:0}
              .reveal{opacity:1;transform:none}
            `,
          }}
        />
        {/* Theme detection script - runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var settings = JSON.parse(localStorage.getItem('accessibility-settings') || '{}');
                  var theme = settings.theme;
                  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <FloatingContact />
          <AccessibilityPanel />
          <CookieBanner />
          <ServiceWorkerRegistration />
          <YandexMetrika />
        </Providers>
      </body>
    </html>
  )
}
