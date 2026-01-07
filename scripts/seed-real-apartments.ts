import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Real apartment photos from Unsplash
const photos = {
  modern: [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
  ],
  cozy: [
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
  ],
  luxury: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
  ],
  seaview: [
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
    'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  ],
  studio: [
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800',
    'https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=800',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800',
  ],
}

async function main() {
  console.log('Deleting existing apartments...')

  // Delete in correct order due to foreign keys
  await prisma.viewingRequest.deleteMany()
  await prisma.apartmentAmenity.deleteMany()
  await prisma.apartmentImage.deleteMany()
  await prisma.apartment.deleteMany()

  console.log('Deleted all apartments')

  // Get districts
  const districts = await prisma.district.findMany()
  const districtMap = Object.fromEntries(districts.map(d => [d.nameRu, d.id]))

  // Get amenities
  const amenities = await prisma.amenity.findMany()
  const amenityIds = amenities.map(a => a.id)

  console.log('Creating real apartments...')

  const apartments = [
    {
      titleRu: 'Современная студия с панорамным видом на море',
      titleEn: 'Modern Studio with Panoramic Sea View',
      titleVi: 'Studio hiện đại với tầm nhìn toàn cảnh ra biển',
      descriptionRu: 'Уютная студия на 15 этаже с потрясающим видом на море и город. Полностью меблирована, новый ремонт 2024 года. В комплексе: бассейн на крыше, фитнес-зал, охрана 24/7. До пляжа 3 минуты пешком. Идеально для одного человека или пары.',
      descriptionEn: 'Cozy studio on the 15th floor with stunning sea and city views. Fully furnished with 2024 renovation. Building amenities: rooftop pool, gym, 24/7 security. 3 minutes walk to the beach. Perfect for singles or couples.',
      descriptionVi: 'Studio ấm cúng tầng 15 với tầm nhìn tuyệt đẹp ra biển và thành phố.',
      priceUsd: 420,
      priceVnd: 10500000,
      rooms: 0,
      area: 32,
      floor: 15,
      totalFloors: 25,
      address: '78 Trần Phú, Lộc Thọ',
      lat: 12.2451,
      lng: 109.1943,
      districtName: 'Центр (Европейский квартал)',
      photos: photos.seaview,
      amenityCount: 8,
    },
    {
      titleRu: '2-комнатная квартира в Muong Thanh',
      titleEn: '2-Bedroom Apartment in Muong Thanh',
      titleVi: 'Căn hộ 2 phòng ngủ tại Mường Thanh',
      descriptionRu: 'Просторная квартира в известном комплексе Muong Thanh. Две спальни, большая гостиная, полностью оборудованная кухня. Прямой вид на море с балкона. Бассейн, спортзал, детская площадка. Рядом рестораны и магазины.',
      descriptionEn: 'Spacious apartment in the famous Muong Thanh complex. Two bedrooms, large living room, fully equipped kitchen. Direct sea view from balcony. Pool, gym, playground. Near restaurants and shops.',
      descriptionVi: 'Căn hộ rộng rãi trong khu phức hợp Mường Thanh nổi tiếng.',
      priceUsd: 650,
      priceVnd: 16250000,
      rooms: 2,
      area: 68,
      floor: 22,
      totalFloors: 45,
      address: '60 Trần Phú, Lộc Thọ',
      lat: 12.2388,
      lng: 109.1956,
      districtName: 'Центр (Европейский квартал)',
      photos: photos.luxury,
      amenityCount: 10,
    },
    {
      titleRu: 'Уютная 1-комнатная у моря',
      titleEn: 'Cozy 1-Bedroom Near the Sea',
      titleVi: 'Căn hộ 1 phòng ngủ ấm cúng gần biển',
      descriptionRu: 'Светлая квартира с отдельной спальней в 5 минутах от пляжа. Свежий ремонт, качественная мебель. Тихий двор, охраняемая парковка для байка. Рядом местный рынок и кафе. Отлично подходит для длительного проживания.',
      descriptionEn: 'Bright apartment with separate bedroom, 5 minutes from the beach. Fresh renovation, quality furniture. Quiet yard, secure bike parking. Near local market and cafes. Great for long-term stay.',
      descriptionVi: 'Căn hộ sáng sủa với phòng ngủ riêng, cách biển 5 phút.',
      priceUsd: 380,
      priceVnd: 9500000,
      rooms: 1,
      area: 42,
      floor: 5,
      totalFloors: 12,
      address: '15 Hùng Vương, Lộc Thọ',
      lat: 12.2467,
      lng: 109.1889,
      districtName: 'Нячанг Центр',
      photos: photos.cozy,
      amenityCount: 6,
    },
    {
      titleRu: 'Семейная 3-комнатная с видом на горы',
      titleEn: 'Family 3-Bedroom with Mountain View',
      titleVi: 'Căn hộ 3 phòng ngủ gia đình với view núi',
      descriptionRu: 'Большая квартира для семьи с детьми. Три спальни, два санузла, просторная кухня-гостиная. Вид на горы и город. В комплексе детская площадка и бассейн. Рядом международная школа и супермаркет Big C.',
      descriptionEn: 'Large apartment for families with children. Three bedrooms, two bathrooms, spacious kitchen-living room. Mountain and city views. Playground and pool in the complex. Near international school and Big C supermarket.',
      descriptionVi: 'Căn hộ lớn cho gia đình có trẻ em.',
      priceUsd: 850,
      priceVnd: 21250000,
      rooms: 3,
      area: 95,
      floor: 8,
      totalFloors: 15,
      address: '88 Lê Hồng Phong, Phước Hải',
      lat: 12.2356,
      lng: 109.1834,
      districtName: 'Фыок Хай (Phuoc Hai)',
      photos: photos.modern,
      amenityCount: 12,
    },
    {
      titleRu: 'Стильная студия в новостройке',
      titleEn: 'Stylish Studio in New Building',
      titleVi: 'Studio phong cách trong tòa nhà mới',
      descriptionRu: 'Новая студия в современном жилом комплексе 2024 года. Дизайнерский ремонт, smart-TV, быстрый интернет. Бассейн на крыше с видом на море. До пляжа 10 минут на байке. Отличный вариант для digital nomads.',
      descriptionEn: 'New studio in modern 2024 residential complex. Designer renovation, smart TV, fast internet. Rooftop pool with sea view. 10 minutes to beach by bike. Great option for digital nomads.',
      descriptionVi: 'Studio mới trong khu dân cư hiện đại năm 2024.',
      priceUsd: 450,
      priceVnd: 11250000,
      rooms: 0,
      area: 35,
      floor: 12,
      totalFloors: 20,
      address: '25 Nguyễn Thị Minh Khai, Vĩnh Hòa',
      lat: 12.2678,
      lng: 109.1923,
      districtName: 'Северный Нячанг',
      photos: photos.studio,
      amenityCount: 7,
    },
    {
      titleRu: 'Апартаменты бизнес-класса в Gold Coast',
      titleEn: 'Business Class Apartment in Gold Coast',
      titleVi: 'Căn hộ cao cấp tại Gold Coast',
      descriptionRu: 'Премиальные апартаменты в элитном комплексе Gold Coast. Две спальни, панорамные окна, дорогая мебель. Приватный пляж, спа-центр, несколько бассейнов. Консьерж-сервис. Для тех, кто ценит комфорт и приватность.',
      descriptionEn: 'Premium apartments in the elite Gold Coast complex. Two bedrooms, panoramic windows, expensive furniture. Private beach, spa center, multiple pools. Concierge service. For those who value comfort and privacy.',
      descriptionVi: 'Căn hộ cao cấp trong khu phức hợp Gold Coast.',
      priceUsd: 1200,
      priceVnd: 30000000,
      rooms: 2,
      area: 85,
      floor: 18,
      totalFloors: 30,
      address: '1 Trần Phú, Lộc Thọ',
      lat: 12.2512,
      lng: 109.1967,
      districtName: 'Центр (Европейский квартал)',
      photos: photos.luxury,
      amenityCount: 14,
    },
    {
      titleRu: 'Бюджетная студия для студентов',
      titleEn: 'Budget Studio for Students',
      titleVi: 'Studio giá rẻ cho sinh viên',
      descriptionRu: 'Компактная студия по доступной цене. Всё необходимое: кровать, стол, кондиционер, холодильник. Быстрый интернет включён. Тихий район, рядом кафе и магазины. Идеально для студентов или одиночных путешественников.',
      descriptionEn: 'Compact studio at affordable price. All essentials: bed, desk, AC, fridge. Fast internet included. Quiet area, near cafes and shops. Ideal for students or solo travelers.',
      descriptionVi: 'Studio nhỏ gọn với giá phải chăng.',
      priceUsd: 280,
      priceVnd: 7000000,
      rooms: 0,
      area: 25,
      floor: 3,
      totalFloors: 6,
      address: '45 Yersin, Phương Sài',
      lat: 12.2398,
      lng: 109.1812,
      districtName: 'Южный Нячанг',
      photos: photos.studio,
      amenityCount: 4,
    },
    {
      titleRu: '1-комнатная с большой террасой',
      titleEn: '1-Bedroom with Large Terrace',
      titleVi: 'Căn hộ 1 phòng ngủ với sân thượng lớn',
      descriptionRu: 'Уникальная квартира с огромной террасой 20 м². Отдельная спальня, современная кухня. С террасы открывается вид на море. Можно завтракать на свежем воздухе. В 2 минутах от пляжа. Для ценителей outdoor-жизни.',
      descriptionEn: 'Unique apartment with huge 20 sqm terrace. Separate bedroom, modern kitchen. Sea view from terrace. Outdoor breakfast possible. 2 minutes from beach. For outdoor lifestyle lovers.',
      descriptionVi: 'Căn hộ độc đáo với sân thượng rộng 20m².',
      priceUsd: 520,
      priceVnd: 13000000,
      rooms: 1,
      area: 48,
      floor: 7,
      totalFloors: 10,
      address: '32 Biệt Thự, Lộc Thọ',
      lat: 12.2445,
      lng: 109.1934,
      districtName: 'Центр (Европейский квартал)',
      photos: photos.seaview,
      amenityCount: 8,
    },
    {
      titleRu: 'Vinpearl Condotel с полным сервисом',
      titleEn: 'Vinpearl Condotel with Full Service',
      titleVi: 'Vinpearl Condotel với dịch vụ đầy đủ',
      descriptionRu: 'Кондо-отель в комплексе Vinpearl. Ежедневная уборка, смена белья. Завтрак включён. Частный пляж, аквапарк, гольф. Идеально для первого месяца во Вьетнаме или отпуска с семьёй.',
      descriptionEn: 'Condo-hotel in Vinpearl complex. Daily cleaning, linen change. Breakfast included. Private beach, aquapark, golf. Perfect for first month in Vietnam or family vacation.',
      descriptionVi: 'Căn hộ khách sạn trong khu phức hợp Vinpearl.',
      priceUsd: 950,
      priceVnd: 23750000,
      rooms: 1,
      area: 55,
      floor: 10,
      totalFloors: 25,
      address: 'Vinpearl Resort, Hòn Tre',
      lat: 12.2123,
      lng: 109.2234,
      districtName: 'Винком (Vincom)',
      photos: photos.luxury,
      amenityCount: 15,
    },
    {
      titleRu: 'Тихая квартира в местном районе',
      titleEn: 'Quiet Apartment in Local Area',
      titleVi: 'Căn hộ yên tĩnh trong khu dân cư địa phương',
      descriptionRu: 'Аутентичный вьетнамский опыт! Квартира в тихом местном районе вдали от туристов. Две комнаты, балкон. Рядом местный рынок с самыми низкими ценами. До моря 15 минут на байке. Для тех, кто хочет настоящий Вьетнам.',
      descriptionEn: 'Authentic Vietnamese experience! Apartment in quiet local area away from tourists. Two rooms, balcony. Near local market with lowest prices. 15 minutes to sea by bike. For those who want real Vietnam.',
      descriptionVi: 'Trải nghiệm Việt Nam đích thực! Căn hộ trong khu yên tĩnh.',
      priceUsd: 320,
      priceVnd: 8000000,
      rooms: 2,
      area: 55,
      floor: 4,
      totalFloors: 5,
      address: '78 Ngô Gia Tự, Vĩnh Hải',
      lat: 12.2534,
      lng: 109.1756,
      districtName: 'Вынь Хай (Vinh Hai)',
      photos: photos.cozy,
      amenityCount: 5,
    },
    {
      titleRu: 'Пентхаус с джакузи на крыше',
      titleEn: 'Penthouse with Rooftop Jacuzzi',
      titleVi: 'Penthouse với bồn sục trên sân thượng',
      descriptionRu: 'Эксклюзивный пентхаус на последнем этаже. Две спальни, гостиная с панорамными окнами. Частная терраса с джакузи и зоной барбекю. 360° вид на море и горы. Для особенных клиентов.',
      descriptionEn: 'Exclusive penthouse on top floor. Two bedrooms, living room with panoramic windows. Private terrace with jacuzzi and BBQ area. 360° view of sea and mountains. For special clients.',
      descriptionVi: 'Penthouse độc quyền trên tầng cao nhất.',
      priceUsd: 1800,
      priceVnd: 45000000,
      rooms: 2,
      area: 120,
      floor: 28,
      totalFloors: 28,
      address: '55 Trần Phú, Lộc Thọ',
      lat: 12.2423,
      lng: 109.1951,
      districtName: 'Центр (Европейский квартал)',
      photos: photos.luxury,
      amenityCount: 16,
    },
    {
      titleRu: 'Уютный дом в районе An Viên',
      titleEn: 'Cozy House in An Vien Area',
      titleVi: 'Nhà ấm cúng tại khu vực An Viên',
      descriptionRu: 'Отдельный дом в тихом районе An Viên. Три спальни, два этажа, маленький сад. Парковка для машины и байков. До пляжа Bai Dai 5 минут. Идеально для семьи, которая ценит приватность и тишину.',
      descriptionEn: 'Separate house in quiet An Vien area. Three bedrooms, two floors, small garden. Parking for car and bikes. 5 minutes to Bai Dai beach. Perfect for family valuing privacy and quiet.',
      descriptionVi: 'Nhà riêng trong khu An Viên yên tĩnh.',
      priceUsd: 750,
      priceVnd: 18750000,
      rooms: 3,
      area: 110,
      floor: 1,
      totalFloors: 2,
      address: '12 Đường An Viên, Phước Đồng',
      lat: 12.1923,
      lng: 109.2123,
      districtName: 'Ан Вьен (An Vien)',
      photos: photos.modern,
      amenityCount: 9,
    },
  ]

  for (const apt of apartments) {
    const districtId = districtMap[apt.districtName]
    if (!districtId) {
      console.log(`District not found: ${apt.districtName}`)
      continue
    }

    // Create apartment
    const created = await prisma.apartment.create({
      data: {
        titleRu: apt.titleRu,
        titleEn: apt.titleEn,
        titleVi: apt.titleVi,
        descriptionRu: apt.descriptionRu,
        descriptionEn: apt.descriptionEn,
        descriptionVi: apt.descriptionVi,
        priceUsd: apt.priceUsd,
        priceVnd: apt.priceVnd,
        rooms: apt.rooms,
        area: apt.area,
        floor: apt.floor,
        totalFloors: apt.totalFloors,
        address: apt.address,
        lat: apt.lat,
        lng: apt.lng,
        districtId: districtId,
        isAvailable: true,
        canShow: true,
        hasVideo: Math.random() > 0.7,
        views: Math.floor(Math.random() * 200) + 10,
      },
    })

    // Add images
    for (let i = 0; i < apt.photos.length; i++) {
      await prisma.apartmentImage.create({
        data: {
          apartmentId: created.id,
          url: apt.photos[i],
          order: i,
          isCover: i === 0,
        },
      })
    }

    // Add random amenities
    const shuffled = amenityIds.sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, Math.min(apt.amenityCount, amenityIds.length))

    for (const amenityId of selected) {
      await prisma.apartmentAmenity.create({
        data: {
          apartmentId: created.id,
          amenityId: amenityId,
        },
      })
    }

    console.log(`Created: ${apt.titleRu} - $${apt.priceUsd}`)
  }

  console.log(`\nTotal: ${apartments.length} apartments created`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
