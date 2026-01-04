import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Аренда квартир в Нячанге | VietVisa Rent',
  description: 'Каталог квартир для долгосрочной аренды в Нячанге, Вьетнам. Студии и апартаменты от $300/мес. Фильтры по району, цене, площади.',
  keywords: [
    'аренда квартиры Нячанг',
    'снять квартиру Вьетнам',
    'долгосрочная аренда Нячанг',
    'квартира Nha Trang',
    'apartment rental Vietnam',
    'long term rental Nha Trang',
  ],
  openGraph: {
    title: 'Аренда квартир в Нячанге | VietVisa Rent',
    description: 'Каталог квартир для долгосрочной аренды в Нячанге, Вьетнам. Студии и апартаменты от $300/мес.',
    url: 'https://visa-beta-azure.vercel.app/rent/apartments',
    siteName: 'VietVisa Rent',
    images: [
      {
        url: '/og-apartments.jpg',
        width: 1200,
        height: 630,
        alt: 'Квартиры в аренду в Нячанге',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Аренда квартир в Нячанге',
    description: 'Каталог квартир для долгосрочной аренды в Нячанге, Вьетнам.',
  },
  alternates: {
    canonical: 'https://visa-beta-azure.vercel.app/rent/apartments',
  },
}

export default function ApartmentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
