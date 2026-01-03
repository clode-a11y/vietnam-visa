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

// Test apartment images from Unsplash
const apartmentImages = {
  studio: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', // Living room
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', // Modern interior
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', // Kitchen
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800', // Bathroom
  ],
  oneBedroom: [
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800', // Bedroom
    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800', // Living area
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', // Kitchen
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800', // Balcony view
    'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800', // Bathroom
  ],
  twoBedroom: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', // Exterior
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', // Living room
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800', // Master bedroom
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', // Kitchen
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800', // Second bedroom
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800', // Bathroom
  ],
  threeBedroom: [
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800', // Exterior
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800', // Living room
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800', // Dining
    'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800', // Master bedroom
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800', // Kitchen
    'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800', // Bedroom 2
    'https://images.unsplash.com/photo-1600566752734-2a0cd66c42e0?w=800', // Bathroom
  ],
  luxury: [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', // Luxury exterior
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800', // Luxury living
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800', // Luxury bedroom
    'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800', // Luxury kitchen
    'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800', // Luxury bathroom
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', // Terrace
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800', // Pool view
  ],
  seaView: [
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', // Sea view balcony
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', // Resort style
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', // Beach view
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', // Ocean room
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800', // Beach apartment
  ],
  budget: [
    'https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=800', // Simple room
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800', // Basic interior
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', // Small kitchen
  ],
}

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
    imageSet: 'seaView',
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
    imageSet: 'twoBedroom',
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
    imageSet: 'seaView',
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
    imageSet: 'threeBedroom',
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
    imageSet: 'studio',
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
    imageSet: 'oneBedroom',
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
    imageSet: 'luxury',
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
    imageSet: 'budget',
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
    imageSet: 'twoBedroom',
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
    imageSet: 'oneBedroom',
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
    imageSet: 'luxury',
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
    imageSet: 'oneBedroom',
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

    // Add images
    const imageSet = apt.imageSet as keyof typeof apartmentImages
    const images = apartmentImages[imageSet] || apartmentImages.studio
    for (let i = 0; i < images.length; i++) {
      await prisma.apartmentImage.create({
        data: {
          apartmentId: apartment.id,
          url: images[i],
          order: i,
          isCover: i === 0, // First image is cover
        },
      })
    }

    console.log(`  Added ${apt.amenities.length} amenities, ${images.length} images`)
  }
}

async function addImagesToExistingApartments() {
  console.log('\nAdding images to existing apartments...')

  // Get all apartments without images
  const apartments = await prisma.apartment.findMany({
    include: { images: true },
  })

  for (const apt of apartments) {
    if (apt.images.length > 0) {
      console.log(`Skipped (has images): ${apt.titleRu}`)
      continue
    }

    // Find matching imageSet based on apartment characteristics
    let imageSet: keyof typeof apartmentImages = 'studio'

    if (apt.priceUsd >= 1000) {
      imageSet = 'luxury'
    } else if (apt.titleRu.toLowerCase().includes('море') || apt.titleRu.toLowerCase().includes('пляж')) {
      imageSet = 'seaView'
    } else if (apt.rooms === 0) {
      imageSet = apt.priceUsd < 350 ? 'budget' : 'studio'
    } else if (apt.rooms === 1) {
      imageSet = 'oneBedroom'
    } else if (apt.rooms === 2) {
      imageSet = 'twoBedroom'
    } else if (apt.rooms >= 3) {
      imageSet = 'threeBedroom'
    }

    const images = apartmentImages[imageSet]
    for (let i = 0; i < images.length; i++) {
      await prisma.apartmentImage.create({
        data: {
          apartmentId: apt.id,
          url: images[i],
          order: i,
          isCover: i === 0,
        },
      })
    }

    console.log(`Added ${images.length} images to: ${apt.titleRu}`)
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

  // Add images to existing apartments without images
  await addImagesToExistingApartments()

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
