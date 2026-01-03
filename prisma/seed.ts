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

// Test apartments data
const testApartments = [
  {
    titleRu: 'Студия с видом на море',
    titleEn: 'Sea View Studio',
    titleVi: 'Studio nhìn ra biển',
    descriptionRu: 'Уютная студия на 15 этаже с панорамным видом на море и город. Полностью меблирована, есть бассейн на крыше и тренажёрный зал.',
    descriptionEn: 'Cozy studio on the 15th floor with panoramic sea and city views. Fully furnished, rooftop pool and gym.',
    descriptionVi: 'Studio ấm cúng tầng 15 với tầm nhìn toàn cảnh biển và thành phố. Đầy đủ nội thất, hồ bơi và phòng gym.',
    priceUsd: 450,
    priceVnd: 11000000,
    rooms: 0,
    area: 35,
    floor: 15,
    totalFloors: 25,
    address: '45 Phạm Văn Đồng, Nha Trang',
    lat: 12.2451,
    lng: 109.1943,
    districtName: 'Center (European Quarter)',
    isAvailable: true,
    canShow: true,
    hasVideo: true,
    amenities: ['Air Conditioning', 'Wi-Fi', 'TV', 'Balcony', 'Sea View', 'Kitchen', 'Refrigerator', 'Elevator', 'Swimming Pool', 'Gym', 'Washing Machine'],
  },
  {
    titleRu: '2-комнатная квартира в Vincom',
    titleEn: '2-Bedroom Apartment near Vincom',
    titleVi: 'Căn hộ 2 phòng ngủ gần Vincom',
    descriptionRu: 'Просторная 2-комнатная квартира рядом с ТЦ Vincom. Современный ремонт, полностью оборудованная кухня. Рядом супермаркеты и рестораны.',
    descriptionEn: 'Spacious 2-bedroom apartment near Vincom Mall. Modern renovation, fully equipped kitchen. Supermarkets and restaurants nearby.',
    descriptionVi: 'Căn hộ 2 phòng ngủ rộng rãi gần Vincom. Nội thất hiện đại, bếp đầy đủ tiện nghi.',
    priceUsd: 650,
    priceVnd: 16000000,
    rooms: 2,
    area: 65,
    floor: 8,
    totalFloors: 20,
    address: '12 Nguyễn Thiện Thuật, Nha Trang',
    lat: 12.2356,
    lng: 109.1912,
    districtName: 'Vincom Area',
    isAvailable: true,
    canShow: true,
    hasVideo: false,
    amenities: ['Air Conditioning', 'Wi-Fi', 'TV', 'City View', 'Kitchen', 'Refrigerator', 'Microwave', 'Stove', 'Elevator', 'Parking', '24/7 Security'],
  },
  {
    titleRu: '1-комнатная у пляжа',
    titleEn: '1-Bedroom Beachfront',
    titleVi: 'Căn hộ 1 phòng ngủ ven biển',
    descriptionRu: 'Квартира в 50 метрах от пляжа! Отличный вид на море с балкона. Идеально для пары или одного человека.',
    descriptionEn: 'Apartment just 50 meters from the beach! Great sea view from the balcony. Perfect for a couple or single person.',
    descriptionVi: 'Căn hộ cách biển chỉ 50m! View biển tuyệt đẹp từ ban công.',
    priceUsd: 550,
    priceVnd: 13500000,
    rooms: 1,
    area: 45,
    floor: 6,
    totalFloors: 12,
    address: '78 Trần Phú, Nha Trang',
    lat: 12.2398,
    lng: 109.1978,
    districtName: 'Center (European Quarter)',
    isAvailable: true,
    canShow: true,
    hasVideo: true,
    amenities: ['Air Conditioning', 'Wi-Fi', 'TV', 'Balcony', 'Sea View', 'Kitchen', 'Refrigerator', 'Hot Water', 'Double Bed', 'Elevator'],
  },
  {
    titleRu: 'Семейная 3-комнатная квартира',
    titleEn: 'Family 3-Bedroom Apartment',
    titleVi: 'Căn hộ 3 phòng ngủ cho gia đình',
    descriptionRu: 'Большая квартира для семьи. 3 спальни, 2 санузла, просторная гостиная. Детская площадка во дворе.',
    descriptionEn: 'Large family apartment. 3 bedrooms, 2 bathrooms, spacious living room. Playground in the yard.',
    descriptionVi: 'Căn hộ lớn cho gia đình. 3 phòng ngủ, 2 phòng tắm, phòng khách rộng rãi.',
    priceUsd: 850,
    priceVnd: 21000000,
    rooms: 3,
    area: 95,
    floor: 10,
    totalFloors: 18,
    address: '23 Hùng Vương, Nha Trang',
    lat: 12.2489,
    lng: 109.1856,
    districtName: 'Nha Trang Center',
    isAvailable: true,
    canShow: true,
    hasVideo: false,
    amenities: ['Air Conditioning', 'Wi-Fi', 'TV', 'City View', 'Kitchen', 'Refrigerator', 'Microwave', 'Stove', 'Dishwasher', 'Elevator', 'Swimming Pool', 'Gym', 'Parking', 'Playground'],
  },
  {
    titleRu: 'Студия в новом доме',
    titleEn: 'Studio in New Building',
    titleVi: 'Studio trong tòa nhà mới',
    descriptionRu: 'Новая студия в только что сданном доме. Современный дизайн, качественная мебель. Тихий район.',
    descriptionEn: 'New studio in a recently completed building. Modern design, quality furniture. Quiet area.',
    descriptionVi: 'Studio mới trong tòa nhà mới hoàn thành. Thiết kế hiện đại, nội thất chất lượng.',
    priceUsd: 380,
    priceVnd: 9300000,
    rooms: 0,
    area: 30,
    floor: 12,
    totalFloors: 22,
    address: '56 Lê Hồng Phong, Nha Trang',
    lat: 12.2612,
    lng: 109.1889,
    districtName: 'North Nha Trang',
    isAvailable: true,
    canShow: true,
    hasVideo: false,
    amenities: ['Air Conditioning', 'Wi-Fi', 'TV', 'Kitchen', 'Refrigerator', 'Hot Water', 'Elevator', '24/7 Security', 'Washing Machine'],
  },
  {
    titleRu: '1-комнатная с видом на горы',
    titleEn: '1-Bedroom with Mountain View',
    titleVi: 'Căn hộ 1 phòng ngủ view núi',
    descriptionRu: 'Уютная квартира с потрясающим видом на горы. Тихий район, свежий воздух. До центра 10 минут на байке.',
    descriptionEn: 'Cozy apartment with stunning mountain views. Quiet area, fresh air. 10 minutes to center by motorbike.',
    descriptionVi: 'Căn hộ ấm cúng với view núi tuyệt đẹp. Khu vực yên tĩnh, không khí trong lành.',
    priceUsd: 350,
    priceVnd: 8500000,
    rooms: 1,
    area: 40,
    floor: 5,
    totalFloors: 10,
    address: '89 Võ Văn Kiệt, Nha Trang',
    lat: 12.2678,
    lng: 109.1823,
    districtName: 'Vinh Hoa',
    isAvailable: true,
    canShow: false,
    hasVideo: false,
    amenities: ['Air Conditioning', 'Wi-Fi', 'TV', 'Balcony', 'Kitchen', 'Refrigerator', 'Hot Water', 'Parking'],
  },
  {
    titleRu: 'Премиум апартаменты в An Viên',
    titleEn: 'Premium Apartment in An Vien',
    titleVi: 'Căn hộ cao cấp An Viên',
    descriptionRu: 'Роскошные апартаменты в элитном районе An Viên. Панорамный вид на залив, премиум отделка. Консьерж 24/7.',
    descriptionEn: 'Luxury apartment in elite An Vien area. Panoramic bay view, premium finishing. 24/7 concierge.',
    descriptionVi: 'Căn hộ sang trọng tại khu An Viên. View vịnh toàn cảnh, nội thất cao cấp.',
    priceUsd: 1200,
    priceVnd: 29000000,
    rooms: 2,
    area: 85,
    floor: 18,
    totalFloors: 25,
    address: '15 An Viên, Nha Trang',
    lat: 12.2156,
    lng: 109.2134,
    districtName: 'An Vien',
    isAvailable: false,
    canShow: false,
    hasVideo: true,
    amenities: ['Air Conditioning', 'Wi-Fi', 'TV', 'Balcony', 'Sea View', 'Workspace', 'Safe', 'Kitchen', 'Refrigerator', 'Dishwasher', 'Bathtub', 'Elevator', 'Swimming Pool', 'Gym', 'Parking', '24/7 Security', 'Concierge'],
  },
  {
    titleRu: 'Бюджетная студия для студентов',
    titleEn: 'Budget Studio for Students',
    titleVi: 'Studio giá rẻ cho sinh viên',
    descriptionRu: 'Компактная студия по доступной цене. Всё необходимое есть. Рядом университет и кафе.',
    descriptionEn: 'Compact studio at an affordable price. Everything you need. Near university and cafes.',
    descriptionVi: 'Studio nhỏ gọn giá phải chăng. Đầy đủ tiện nghi. Gần trường đại học.',
    priceUsd: 280,
    priceVnd: 6800000,
    rooms: 0,
    area: 25,
    floor: 3,
    totalFloors: 8,
    address: '34 Nguyễn Trãi, Nha Trang',
    lat: 12.2523,
    lng: 109.1798,
    districtName: 'Phuoc Hai',
    isAvailable: true,
    canShow: true,
    hasVideo: false,
    amenities: ['Air Conditioning', 'Wi-Fi', 'Kitchen', 'Refrigerator', 'Hot Water', 'Single Bed'],
  },
  {
    titleRu: '2-комнатная рядом с ночным рынком',
    titleEn: '2-Bedroom near Night Market',
    titleVi: 'Căn hộ 2 phòng ngủ gần chợ đêm',
    descriptionRu: 'Квартира в самом центре туристической жизни! 3 минуты до ночного рынка. Много ресторанов рядом.',
    descriptionEn: 'Apartment in the heart of tourist life! 3 minutes to night market. Many restaurants nearby.',
    descriptionVi: 'Căn hộ ngay trung tâm du lịch! 3 phút đến chợ đêm. Nhiều nhà hàng gần đây.',
    priceUsd: 500,
    priceVnd: 12200000,
    rooms: 2,
    area: 55,
    floor: 4,
    totalFloors: 9,
    address: '67 Trần Quang Khải, Nha Trang',
    lat: 12.2412,
    lng: 109.1956,
    districtName: 'Loc Tho',
    isAvailable: true,
    canShow: true,
    hasVideo: true,
    amenities: ['Air Conditioning', 'Wi-Fi', 'TV', 'Kitchen', 'Refrigerator', 'Hot Water', 'Double Bed', 'Washing Machine'],
  },
  {
    titleRu: '1-комнатная у порта',
    titleEn: '1-Bedroom near Port',
    titleVi: 'Căn hộ 1 phòng ngủ gần cảng',
    descriptionRu: 'Квартира рядом с портом и канатной дорогой на Vinpearl. Удобно для путешествий на острова.',
    descriptionEn: 'Apartment near the port and Vinpearl cable car. Convenient for island trips.',
    descriptionVi: 'Căn hộ gần cảng và cáp treo Vinpearl. Thuận tiện đi đảo.',
    priceUsd: 420,
    priceVnd: 10200000,
    rooms: 1,
    area: 42,
    floor: 7,
    totalFloors: 15,
    address: '23 Phạm Văn Đồng, Nha Trang',
    lat: 12.2234,
    lng: 109.2067,
    districtName: 'South Nha Trang',
    isAvailable: true,
    canShow: true,
    hasVideo: false,
    amenities: ['Air Conditioning', 'Wi-Fi', 'TV', 'Balcony', 'Sea View', 'Kitchen', 'Refrigerator', 'Hot Water', 'Elevator', 'Parking'],
  },
  {
    titleRu: 'Пентхаус с террасой',
    titleEn: 'Penthouse with Terrace',
    titleVi: 'Penthouse có sân thượng',
    descriptionRu: 'Уникальный пентхаус на последнем этаже с большой террасой. 360° вид на город и море. Для ценителей комфорта.',
    descriptionEn: 'Unique penthouse on the top floor with large terrace. 360° view of city and sea. For comfort lovers.',
    descriptionVi: 'Penthouse độc đáo tầng cao nhất với sân thượng lớn. View 360° thành phố và biển.',
    priceUsd: 1500,
    priceVnd: 36500000,
    rooms: 3,
    area: 120,
    floor: 30,
    totalFloors: 30,
    address: '1 Trần Phú, Nha Trang',
    lat: 12.2367,
    lng: 109.1989,
    districtName: 'Center (European Quarter)',
    isAvailable: true,
    canShow: false,
    hasVideo: true,
    amenities: ['Air Conditioning', 'Wi-Fi', 'TV', 'Balcony', 'Sea View', 'City View', 'Workspace', 'Safe', 'Kitchen', 'Refrigerator', 'Dishwasher', 'Bathtub', 'Elevator', 'Swimming Pool', 'Gym', 'Parking', '24/7 Security', 'Concierge', 'Garden'],
  },
  {
    titleRu: 'Уютная 1-комнатная в тихом месте',
    titleEn: 'Cozy 1-Bedroom in Quiet Area',
    titleVi: 'Căn hộ 1 phòng ngủ ấm cúng khu yên tĩnh',
    descriptionRu: 'Спокойное место вдали от шума. Зелёный двор, детская площадка. Отлично для семьи с ребёнком.',
    descriptionEn: 'Peaceful place away from noise. Green yard, playground. Great for family with child.',
    descriptionVi: 'Nơi yên bình xa ồn ào. Sân xanh, sân chơi trẻ em. Tuyệt vời cho gia đình có con nhỏ.',
    priceUsd: 400,
    priceVnd: 9800000,
    rooms: 1,
    area: 48,
    floor: 2,
    totalFloors: 6,
    address: '45 Lê Thanh Tông, Nha Trang',
    lat: 12.2567,
    lng: 109.1934,
    districtName: 'Vinh Hai',
    isAvailable: true,
    canShow: true,
    hasVideo: false,
    amenities: ['Air Conditioning', 'Wi-Fi', 'TV', 'Balcony', 'Kitchen', 'Refrigerator', 'Hot Water', 'Double Bed', 'Parking', 'Playground', 'Garden'],
  },
]

async function seedTestApartments() {
  console.log('\nSeeding test apartments...')

  // Get all districts
  const allDistricts = await prisma.district.findMany()
  const districtMap = new Map(allDistricts.map(d => [d.nameEn, d.id]))

  // Get all amenities
  const allAmenities = await prisma.amenity.findMany()
  const amenityMap = new Map(allAmenities.map(a => [a.nameEn, a.id]))

  for (const apt of testApartments) {
    // Check if apartment already exists
    const existing = await prisma.apartment.findFirst({
      where: { titleRu: apt.titleRu },
    })

    if (existing) {
      console.log(`Skipped apartment (exists): ${apt.titleRu}`)
      continue
    }

    const districtId = districtMap.get(apt.districtName)
    if (!districtId) {
      console.log(`District not found for: ${apt.titleRu}, skipping`)
      continue
    }

    // Create apartment
    const apartment = await prisma.apartment.create({
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
        isAvailable: apt.isAvailable,
        canShow: apt.canShow,
        hasVideo: apt.hasVideo,
      },
    })

    console.log(`Created apartment: ${apartment.titleRu}`)

    // Add amenities
    for (const amenityName of apt.amenities) {
      const amenityId = amenityMap.get(amenityName)
      if (amenityId) {
        await prisma.apartmentAmenity.create({
          data: {
            apartmentId: apartment.id,
            amenityId: amenityId,
          },
        })
      }
    }

    console.log(`  Added ${apt.amenities.length} amenities`)
  }
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

  // Seed test apartments
  await seedTestApartments()

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
