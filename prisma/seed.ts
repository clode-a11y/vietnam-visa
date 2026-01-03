import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const districts = [
  {
    nameRu: 'Центр (Европейский квартал)',
    nameEn: 'Center (European Quarter)',
    nameVi: 'Trung tâm (Khu châu Âu)',
    description: 'Самый популярный район среди иностранцев. Много ресторанов, кафе, магазинов. Близко к пляжу.',
    order: 1,
  },
  {
    nameRu: 'Нячанг Центр',
    nameEn: 'Nha Trang Center',
    nameVi: 'Nha Trang Center',
    description: 'Район вокруг торгового центра Nha Trang Center. Современные высотки, развитая инфраструктура.',
    order: 2,
  },
  {
    nameRu: 'Северный Нячанг',
    nameEn: 'North Nha Trang',
    nameVi: 'Bắc Nha Trang',
    description: 'Район к северу от центра. Более тихий, много новых жилых комплексов. Хороший вид на залив.',
    order: 3,
  },
  {
    nameRu: 'Южный Нячанг',
    nameEn: 'South Nha Trang',
    nameVi: 'Nam Nha Trang',
    description: 'Район к югу от центра. Близко к порту и канатной дороге на Vinpearl.',
    order: 4,
  },
  {
    nameRu: 'Винком (Vincom)',
    nameEn: 'Vincom Area',
    nameVi: 'Khu Vincom',
    description: 'Район вокруг ТЦ Vincom Plaza. Много магазинов, ресторанов, развлечений.',
    order: 5,
  },
  {
    nameRu: 'Вынь Хоа (Vinh Hoa)',
    nameEn: 'Vinh Hoa',
    nameVi: 'Vĩnh Hòa',
    description: 'Северный пригород. Тихий спальный район с доступными ценами.',
    order: 6,
  },
  {
    nameRu: 'Вынь Хай (Vinh Hai)',
    nameEn: 'Vinh Hai',
    nameVi: 'Vĩnh Hải',
    description: 'Прибрежный район на севере. Красивые пляжи, много курортных отелей.',
    order: 7,
  },
  {
    nameRu: 'Фыок Хай (Phuoc Hai)',
    nameEn: 'Phuoc Hai',
    nameVi: 'Phước Hải',
    description: 'Центральный район с местным колоритом. Рынки, вьетнамская кухня.',
    order: 8,
  },
  {
    nameRu: 'Лок Тхо (Loc Tho)',
    nameEn: 'Loc Tho',
    nameVi: 'Lộc Thọ',
    description: 'Район у ночного рынка. Много туристов, ночная жизнь.',
    order: 9,
  },
  {
    nameRu: 'Ан Вьен (An Vien)',
    nameEn: 'An Vien',
    nameVi: 'An Viên',
    description: 'Элитный район на холме. Виллы с видом на море, тихо и престижно.',
    order: 10,
  },
]

const amenities = [
  // General
  { nameRu: 'Кондиционер', nameEn: 'Air Conditioning', nameVi: 'Điều hòa', icon: '❄️', category: 'general' },
  { nameRu: 'Wi-Fi', nameEn: 'Wi-Fi', nameVi: 'Wi-Fi', icon: '📶', category: 'general' },
  { nameRu: 'Телевизор', nameEn: 'TV', nameVi: 'TV', icon: '📺', category: 'general' },
  { nameRu: 'Балкон', nameEn: 'Balcony', nameVi: 'Ban công', icon: '🌅', category: 'general' },
  { nameRu: 'Вид на море', nameEn: 'Sea View', nameVi: 'View biển', icon: '🌊', category: 'general' },
  { nameRu: 'Вид на город', nameEn: 'City View', nameVi: 'View thành phố', icon: '🏙️', category: 'general' },
  { nameRu: 'Рабочее место', nameEn: 'Workspace', nameVi: 'Bàn làm việc', icon: '💻', category: 'general' },
  { nameRu: 'Сейф', nameEn: 'Safe', nameVi: 'Két sắt', icon: '🔒', category: 'general' },

  // Kitchen
  { nameRu: 'Кухня', nameEn: 'Kitchen', nameVi: 'Bếp', icon: '🍳', category: 'kitchen' },
  { nameRu: 'Холодильник', nameEn: 'Refrigerator', nameVi: 'Tủ lạnh', icon: '🧊', category: 'kitchen' },
  { nameRu: 'Микроволновка', nameEn: 'Microwave', nameVi: 'Lò vi sóng', icon: '📡', category: 'kitchen' },
  { nameRu: 'Электрочайник', nameEn: 'Electric Kettle', nameVi: 'Ấm đun nước', icon: '☕', category: 'kitchen' },
  { nameRu: 'Плита', nameEn: 'Stove', nameVi: 'Bếp nấu', icon: '🔥', category: 'kitchen' },
  { nameRu: 'Посудомоечная машина', nameEn: 'Dishwasher', nameVi: 'Máy rửa bát', icon: '🍽️', category: 'kitchen' },
  { nameRu: 'Посуда и приборы', nameEn: 'Cookware & Utensils', nameVi: 'Dụng cụ nấu ăn', icon: '🥄', category: 'kitchen' },

  // Bathroom
  { nameRu: 'Горячая вода', nameEn: 'Hot Water', nameVi: 'Nước nóng', icon: '🚿', category: 'bathroom' },
  { nameRu: 'Ванна', nameEn: 'Bathtub', nameVi: 'Bồn tắm', icon: '🛁', category: 'bathroom' },
  { nameRu: 'Фен', nameEn: 'Hair Dryer', nameVi: 'Máy sấy tóc', icon: '💨', category: 'bathroom' },
  { nameRu: 'Полотенца', nameEn: 'Towels', nameVi: 'Khăn tắm', icon: '🧴', category: 'bathroom' },
  { nameRu: 'Туалетные принадлежности', nameEn: 'Toiletries', nameVi: 'Đồ vệ sinh', icon: '🧼', category: 'bathroom' },

  // Bedroom
  { nameRu: 'Двуспальная кровать', nameEn: 'Double Bed', nameVi: 'Giường đôi', icon: '🛏️', category: 'bedroom' },
  { nameRu: 'Односпальная кровать', nameEn: 'Single Bed', nameVi: 'Giường đơn', icon: '🛏️', category: 'bedroom' },
  { nameRu: 'Постельное бельё', nameEn: 'Bed Linen', nameVi: 'Chăn ga', icon: '🛌', category: 'bedroom' },
  { nameRu: 'Шкаф', nameEn: 'Wardrobe', nameVi: 'Tủ quần áo', icon: '🚪', category: 'bedroom' },
  { nameRu: 'Кондиционер в спальне', nameEn: 'Bedroom AC', nameVi: 'Điều hòa phòng ngủ', icon: '❄️', category: 'bedroom' },

  // Building
  { nameRu: 'Лифт', nameEn: 'Elevator', nameVi: 'Thang máy', icon: '🛗', category: 'building' },
  { nameRu: 'Бассейн', nameEn: 'Swimming Pool', nameVi: 'Hồ bơi', icon: '🏊', category: 'building' },
  { nameRu: 'Тренажёрный зал', nameEn: 'Gym', nameVi: 'Phòng gym', icon: '💪', category: 'building' },
  { nameRu: 'Парковка', nameEn: 'Parking', nameVi: 'Bãi đậu xe', icon: '🅿️', category: 'building' },
  { nameRu: 'Охрана 24/7', nameEn: '24/7 Security', nameVi: 'Bảo vệ 24/7', icon: '👮', category: 'building' },
  { nameRu: 'Консьерж', nameEn: 'Concierge', nameVi: 'Lễ tân', icon: '🛎️', category: 'building' },
  { nameRu: 'Детская площадка', nameEn: 'Playground', nameVi: 'Sân chơi trẻ em', icon: '🎠', category: 'building' },
  { nameRu: 'Сад/зелёная зона', nameEn: 'Garden', nameVi: 'Vườn', icon: '🌳', category: 'building' },

  // Entertainment
  { nameRu: 'Кабельное ТВ', nameEn: 'Cable TV', nameVi: 'Truyền hình cáp', icon: '📺', category: 'entertainment' },
  { nameRu: 'Netflix', nameEn: 'Netflix', nameVi: 'Netflix', icon: '🎬', category: 'entertainment' },
  { nameRu: 'Игровая консоль', nameEn: 'Game Console', nameVi: 'Máy chơi game', icon: '🎮', category: 'entertainment' },
  { nameRu: 'Книги', nameEn: 'Books', nameVi: 'Sách', icon: '📚', category: 'entertainment' },

  // Laundry (adding to general)
  { nameRu: 'Стиральная машина', nameEn: 'Washing Machine', nameVi: 'Máy giặt', icon: '🧺', category: 'general' },
  { nameRu: 'Сушильная машина', nameEn: 'Dryer', nameVi: 'Máy sấy', icon: '👕', category: 'general' },
  { nameRu: 'Утюг', nameEn: 'Iron', nameVi: 'Bàn ủi', icon: '👔', category: 'general' },
]

async function seedTestApartment() {
  console.log('\nSeeding test apartment...')

  // Find the Center district
  const centerDistrict = await prisma.district.findFirst({
    where: { nameEn: 'Center (European Quarter)' },
  })

  if (!centerDistrict) {
    console.log('Center district not found, skipping test apartment')
    return
  }

  // Check if test apartment already exists
  const existing = await prisma.apartment.findFirst({
    where: { titleRu: 'Студия с видом на море' },
  })

  if (existing) {
    console.log('Test apartment already exists, skipping')
    return
  }

  // Create apartment
  const apartment = await prisma.apartment.create({
    data: {
      titleRu: 'Студия с видом на море',
      titleEn: 'Sea View Studio',
      titleVi: 'Studio nhìn ra biển',
      descriptionRu: `Уютная студия на 15 этаже с панорамным видом на море и город.

Полностью меблирована, есть всё для комфортной жизни:
• Кондиционер
• Стиральная машина
• Кухня с холодильником и плитой
• Скоростной Wi-Fi

В здании есть бассейн на крыше и тренажёрный зал. До пляжа 5 минут пешком.

Идеально подходит для одного человека или пары. Долгосрочная аренда от 6 месяцев.`,
      descriptionEn: `Cozy studio on the 15th floor with panoramic sea and city views.

Fully furnished with everything for comfortable living:
• Air conditioning
• Washing machine
• Kitchen with fridge and stove
• High-speed Wi-Fi

The building has a rooftop pool and gym. 5 minutes walk to the beach.

Perfect for a single person or couple. Long-term rental from 6 months.`,
      descriptionVi: `Studio ấm cúng tầng 15 với tầm nhìn toàn cảnh biển và thành phố.

Đầy đủ nội thất với mọi thứ cho cuộc sống thoải mái:
• Điều hòa
• Máy giặt
• Bếp có tủ lạnh và bếp
• Wi-Fi tốc độ cao

Tòa nhà có hồ bơi trên sân thượng và phòng gym. Cách biển 5 phút đi bộ.

Hoàn hảo cho một người hoặc cặp đôi. Thuê dài hạn từ 6 tháng.`,
      priceUsd: 450,
      priceVnd: 11000000,
      rooms: 0, // Studio
      area: 35,
      floor: 15,
      totalFloors: 25,
      address: '45 Phạm Văn Đồng, Nha Trang',
      lat: 12.2451,
      lng: 109.1943,
      districtId: centerDistrict.id,
      isAvailable: true,
      canShow: true,
      hasVideo: true,
    },
  })

  console.log(`Created apartment: ${apartment.titleRu}`)

  // Add amenities to apartment
  const amenityNames = [
    'Air Conditioning',
    'Wi-Fi',
    'TV',
    'Balcony',
    'Sea View',
    'Kitchen',
    'Refrigerator',
    'Microwave',
    'Electric Kettle',
    'Stove',
    'Hot Water',
    'Hair Dryer',
    'Towels',
    'Double Bed',
    'Bed Linen',
    'Wardrobe',
    'Elevator',
    'Swimming Pool',
    'Gym',
    '24/7 Security',
    'Washing Machine',
  ]

  const amenities = await prisma.amenity.findMany({
    where: { nameEn: { in: amenityNames } },
  })

  for (const amenity of amenities) {
    await prisma.apartmentAmenity.create({
      data: {
        apartmentId: apartment.id,
        amenityId: amenity.id,
      },
    })
  }

  console.log(`Added ${amenities.length} amenities to apartment`)
}

async function main() {
  // Seed districts
  console.log('Seeding districts...')
  for (const district of districts) {
    const existing = await prisma.district.findFirst({
      where: { nameEn: district.nameEn },
    })

    if (!existing) {
      await prisma.district.create({
        data: district,
      })
      console.log(`Created district: ${district.nameRu}`)
    } else {
      console.log(`Skipped district (exists): ${district.nameRu}`)
    }
  }

  // Seed amenities
  console.log('\nSeeding amenities...')
  for (const amenity of amenities) {
    const existing = await prisma.amenity.findFirst({
      where: { nameEn: amenity.nameEn },
    })

    if (!existing) {
      await prisma.amenity.create({
        data: amenity,
      })
      console.log(`Created amenity: ${amenity.nameRu}`)
    } else {
      console.log(`Skipped amenity (exists): ${amenity.nameRu}`)
    }
  }

  // Seed test apartment
  await seedTestApartment()

  console.log('\nSeeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
