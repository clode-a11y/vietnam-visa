import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

interface Props {
  params: Promise<{ id: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  try {
    if (!prisma) {
      return getDefaultMetadata()
    }

    const apartment = await prisma.apartment.findUnique({
      where: { id },
      include: {
        district: true,
        images: {
          where: { isCover: true },
          take: 1,
        },
      },
    })

    if (!apartment) {
      return getDefaultMetadata()
    }

    const title = `${apartment.titleRu} | $${apartment.priceUsd}/мес | Нячанг`
    const description = `${apartment.rooms === 0 ? 'Студия' : `${apartment.rooms}-комн.`} квартира ${apartment.area} м² в районе ${apartment.district.nameRu}. ${apartment.descriptionRu.slice(0, 150)}...`
    const image = apartment.images[0]?.url || '/og-apartment.jpg'
    const url = `https://visa-beta-azure.vercel.app/rent/apartments/${id}`

    return {
      title,
      description,
      keywords: [
        'аренда квартиры Нячанг',
        'снять квартиру Вьетнам',
        apartment.district.nameRu,
        'долгосрочная аренда',
        'Nha Trang apartment',
        'Vietnam rental',
      ],
      openGraph: {
        title,
        description,
        url,
        siteName: 'VietVisa Rent',
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: apartment.titleRu,
          },
        ],
        locale: 'ru_RU',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
      alternates: {
        canonical: url,
      },
      other: {
        'og:price:amount': String(apartment.priceUsd),
        'og:price:currency': 'USD',
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return getDefaultMetadata()
  }
}

function getDefaultMetadata(): Metadata {
  return {
    title: 'Квартира в аренду | Нячанг, Вьетнам',
    description: 'Аренда квартир в Нячанге. Долгосрочная аренда от собственников.',
  }
}

// JSON-LD structured data component
function ApartmentJsonLd({ id }: { id: string }) {
  // This will be rendered on the client, but the script tag helps with SEO
  return null
}

export default async function ApartmentLayout({ params, children }: Props) {
  const { id } = await params

  let jsonLd = null

  try {
    if (prisma) {
      const apartment = await prisma.apartment.findUnique({
        where: { id },
        include: {
          district: true,
          images: {
            orderBy: { order: 'asc' },
            take: 5,
          },
          amenities: {
            include: { amenity: true },
          },
        },
      })

      if (apartment) {
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Apartment',
          name: apartment.titleRu,
          description: apartment.descriptionRu,
          image: apartment.images.map(img => img.url),
          address: {
            '@type': 'PostalAddress',
            streetAddress: apartment.address,
            addressLocality: 'Nha Trang',
            addressRegion: apartment.district.nameEn,
            addressCountry: 'VN',
          },
          geo: apartment.lat && apartment.lng ? {
            '@type': 'GeoCoordinates',
            latitude: apartment.lat,
            longitude: apartment.lng,
          } : undefined,
          floorSize: {
            '@type': 'QuantitativeValue',
            value: apartment.area,
            unitCode: 'MTK',
          },
          numberOfRooms: apartment.rooms || 1,
          amenityFeature: apartment.amenities.map(a => ({
            '@type': 'LocationFeatureSpecification',
            name: a.amenity.nameEn,
            value: true,
          })),
          offers: {
            '@type': 'Offer',
            price: apartment.priceUsd,
            priceCurrency: 'USD',
            availability: apartment.isAvailable
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          },
        }
      }
    }
  } catch (error) {
    console.error('Error generating JSON-LD:', error)
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  )
}
