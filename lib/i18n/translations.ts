export type Locale = 'ru' | 'en' | 'vi'

export const translations: Record<Locale, Record<string, string>> = {
  ru: {
    // Header
    'nav.visaTypes': 'Типы виз',
    'nav.comparison': 'Сравнение',
    'nav.calculator': 'Калькулятор',
    'nav.blog': 'Блог',
    'nav.contact': 'Заявка',
    'nav.calculateVisa': 'Рассчитать визу',

    // Hero
    'hero.badge': 'Актуально на 2025 год',
    'hero.title': 'Виза во',
    'hero.titleHighlight': 'Вьетнам',
    'hero.subtitle': 'Полный гайд для россиян: безвизовый въезд до 45 дней, электронная виза и виза по прилёту',
    'hero.cta': 'Рассчитать визу',

    // Stats
    'stats.days': 'дней без визы',
    'stats.price': 'стоимость e-Visa',
    'stats.processing': 'дня оформление',
    'stats.max': 'дней максимум',

    // Visa Types
    'visaTypes.title': 'Типы виз',
    'visaTypes.heading': 'Выберите подходящий вариант',
    'visaTypes.subtitle': 'Способы легально находиться во Вьетнаме',
    'visaTypes.popular': 'ПОПУЛЯРНО',
    'visaTypes.free': 'Бесплатно',

    // Comparison
    'comparison.title': 'Сравнение',
    'comparison.heading': 'Какая виза вам подходит?',
    'comparison.subtitle': 'Детальное сравнение всех вариантов',
    'comparison.parameter': 'Параметр',
    'comparison.visaFree': 'Безвизовый',
    'comparison.evisa': 'E-Visa',
    'comparison.voa': 'По прилёту',
    'comparison.duration': 'Срок пребывания',
    'comparison.cost': 'Стоимость',
    'comparison.processingTime': 'Время оформления',
    'comparison.extension': 'Продление',
    'comparison.multiEntry': 'Многократный въезд',
    'comparison.entryPoints': 'Пункты въезда',
    'comparison.invitation': 'Приглашение',
    'comparison.notNeeded': 'Не нужно',
    'comparison.needed': 'Нужно',
    'comparison.immediately': 'Сразу',
    'comparison.onSite': 'На месте',
    'comparison.all': 'Все',
    'comparison.airportsOnly': 'Только аэропорты',

    // Documents
    'documents.title': 'Документы',
    'documents.heading': 'Чек-лист документов',
    'documents.subtitle': 'Что нужно подготовить для каждого типа визы',

    // Calculator
    'calculator.title': 'Калькулятор',
    'calculator.heading': 'Узнайте какая виза нужна',
    'calculator.arrivalDate': 'Дата прилёта',
    'calculator.departureDate': 'Дата вылета',
    'calculator.purpose': 'Цель поездки',
    'calculator.entries': 'Въезды',
    'calculator.tourism': 'Туризм',
    'calculator.business': 'Бизнес',
    'calculator.work': 'Работа',
    'calculator.single': 'Однократный',
    'calculator.multiple': 'Многократный',
    'calculator.calculate': 'Рассчитать',
    'calculator.days': 'дней',
    'calculator.cost': 'стоимость',
    'calculator.processing': 'оформление',

    // FAQ
    'faq.title': 'FAQ',
    'faq.heading': 'Частые вопросы',

    // Testimonials
    'testimonials.title': 'Отзывы',
    'testimonials.heading': 'Что говорят клиенты',
    'testimonials.subtitle': 'Истории успешного оформления виз',

    // Contact
    'contact.title': 'Консультация',
    'contact.heading': 'Оставить заявку',
    'contact.subtitle': 'Мы свяжемся с вами в ближайшее время',
    'contact.name': 'Ваше имя',
    'contact.phone': 'Телефон',
    'contact.messenger': 'Мессенджер',
    'contact.visaType': 'Тип визы',
    'contact.message': 'Сообщение',
    'contact.submit': 'Отправить заявку',
    'contact.sending': 'Отправка...',
    'contact.success': 'Заявка отправлена!',
    'contact.successMessage': 'Мы свяжемся с вами в ближайшее время',
    'contact.sendAnother': 'Отправить ещё',
    'contact.noVisa': 'Не знаю / нужна консультация',

    // CTA
    'cta.emoji': '🌴',
    'cta.heading': 'Готовы к приключению?',
    'cta.subtitle': 'Вьетнам ждёт вас!',
    'cta.button': 'Оформить e-Visa',

    // Footer
    'footer.sections': 'Разделы',
    'footer.useful': 'Полезное',
    'footer.cities': 'Города',
    'footer.privacy': 'Конфиденциальность',
    'footer.admin': 'Админ',
  },

  en: {
    // Header
    'nav.visaTypes': 'Visa Types',
    'nav.comparison': 'Compare',
    'nav.calculator': 'Calculator',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.calculateVisa': 'Calculate Visa',

    // Hero
    'hero.badge': 'Updated for 2025',
    'hero.title': 'Visa to',
    'hero.titleHighlight': 'Vietnam',
    'hero.subtitle': 'Complete guide: visa-free entry up to 45 days, e-Visa and visa on arrival',
    'hero.cta': 'Calculate Visa',

    // Stats
    'stats.days': 'visa-free days',
    'stats.price': 'e-Visa cost',
    'stats.processing': 'days processing',
    'stats.max': 'days maximum',

    // Visa Types
    'visaTypes.title': 'Visa Types',
    'visaTypes.heading': 'Choose the right option',
    'visaTypes.subtitle': 'Ways to legally stay in Vietnam',
    'visaTypes.popular': 'POPULAR',
    'visaTypes.free': 'Free',

    // Comparison
    'comparison.title': 'Comparison',
    'comparison.heading': 'Which visa suits you?',
    'comparison.subtitle': 'Detailed comparison of all options',
    'comparison.parameter': 'Parameter',
    'comparison.visaFree': 'Visa-Free',
    'comparison.evisa': 'E-Visa',
    'comparison.voa': 'On Arrival',
    'comparison.duration': 'Stay Duration',
    'comparison.cost': 'Cost',
    'comparison.processingTime': 'Processing Time',
    'comparison.extension': 'Extension',
    'comparison.multiEntry': 'Multiple Entry',
    'comparison.entryPoints': 'Entry Points',
    'comparison.invitation': 'Invitation',
    'comparison.notNeeded': 'Not needed',
    'comparison.needed': 'Required',
    'comparison.immediately': 'Instantly',
    'comparison.onSite': 'On-site',
    'comparison.all': 'All',
    'comparison.airportsOnly': 'Airports only',

    // Documents
    'documents.title': 'Documents',
    'documents.heading': 'Document Checklist',
    'documents.subtitle': 'What to prepare for each visa type',

    // Calculator
    'calculator.title': 'Calculator',
    'calculator.heading': 'Find out which visa you need',
    'calculator.arrivalDate': 'Arrival Date',
    'calculator.departureDate': 'Departure Date',
    'calculator.purpose': 'Purpose',
    'calculator.entries': 'Entries',
    'calculator.tourism': 'Tourism',
    'calculator.business': 'Business',
    'calculator.work': 'Work',
    'calculator.single': 'Single',
    'calculator.multiple': 'Multiple',
    'calculator.calculate': 'Calculate',
    'calculator.days': 'days',
    'calculator.cost': 'cost',
    'calculator.processing': 'processing',

    // FAQ
    'faq.title': 'FAQ',
    'faq.heading': 'Frequently Asked Questions',

    // Testimonials
    'testimonials.title': 'Reviews',
    'testimonials.heading': 'What clients say',
    'testimonials.subtitle': 'Success stories of visa applications',

    // Contact
    'contact.title': 'Consultation',
    'contact.heading': 'Submit Request',
    'contact.subtitle': 'We will contact you shortly',
    'contact.name': 'Your Name',
    'contact.phone': 'Phone',
    'contact.messenger': 'Messenger',
    'contact.visaType': 'Visa Type',
    'contact.message': 'Message',
    'contact.submit': 'Submit Request',
    'contact.sending': 'Sending...',
    'contact.success': 'Request Sent!',
    'contact.successMessage': 'We will contact you shortly',
    'contact.sendAnother': 'Send Another',
    'contact.noVisa': "Don't know / need consultation",

    // CTA
    'cta.emoji': '🌴',
    'cta.heading': 'Ready for adventure?',
    'cta.subtitle': 'Vietnam awaits!',
    'cta.button': 'Apply for e-Visa',

    // Footer
    'footer.sections': 'Sections',
    'footer.useful': 'Useful',
    'footer.cities': 'Cities',
    'footer.privacy': 'Privacy',
    'footer.admin': 'Admin',
  },

  vi: {
    // Header
    'nav.visaTypes': 'Loại Visa',
    'nav.comparison': 'So sánh',
    'nav.calculator': 'Tính toán',
    'nav.blog': 'Blog',
    'nav.contact': 'Liên hệ',
    'nav.calculateVisa': 'Tính Visa',

    // Hero
    'hero.badge': 'Cập nhật năm 2025',
    'hero.title': 'Visa đến',
    'hero.titleHighlight': 'Việt Nam',
    'hero.subtitle': 'Hướng dẫn đầy đủ: miễn thị thực đến 45 ngày, e-Visa và thị thực khi đến',
    'hero.cta': 'Tính Visa',

    // Stats
    'stats.days': 'ngày miễn visa',
    'stats.price': 'phí e-Visa',
    'stats.processing': 'ngày xử lý',
    'stats.max': 'ngày tối đa',

    // Visa Types
    'visaTypes.title': 'Loại Visa',
    'visaTypes.heading': 'Chọn phương án phù hợp',
    'visaTypes.subtitle': 'Các cách ở lại Việt Nam hợp pháp',
    'visaTypes.popular': 'PHỔ BIẾN',
    'visaTypes.free': 'Miễn phí',

    // Comparison
    'comparison.title': 'So sánh',
    'comparison.heading': 'Visa nào phù hợp với bạn?',
    'comparison.subtitle': 'So sánh chi tiết các loại',
    'comparison.parameter': 'Thông số',
    'comparison.visaFree': 'Miễn visa',
    'comparison.evisa': 'E-Visa',
    'comparison.voa': 'Khi đến',
    'comparison.duration': 'Thời gian lưu trú',
    'comparison.cost': 'Chi phí',
    'comparison.processingTime': 'Thời gian xử lý',
    'comparison.extension': 'Gia hạn',
    'comparison.multiEntry': 'Nhập cảnh nhiều lần',
    'comparison.entryPoints': 'Điểm nhập cảnh',
    'comparison.invitation': 'Thư mời',
    'comparison.notNeeded': 'Không cần',
    'comparison.needed': 'Cần thiết',
    'comparison.immediately': 'Ngay lập tức',
    'comparison.onSite': 'Tại chỗ',
    'comparison.all': 'Tất cả',
    'comparison.airportsOnly': 'Chỉ sân bay',

    // Documents
    'documents.title': 'Tài liệu',
    'documents.heading': 'Danh sách tài liệu',
    'documents.subtitle': 'Cần chuẩn bị gì cho từng loại visa',

    // Calculator
    'calculator.title': 'Tính toán',
    'calculator.heading': 'Tìm hiểu loại visa bạn cần',
    'calculator.arrivalDate': 'Ngày đến',
    'calculator.departureDate': 'Ngày đi',
    'calculator.purpose': 'Mục đích',
    'calculator.entries': 'Nhập cảnh',
    'calculator.tourism': 'Du lịch',
    'calculator.business': 'Kinh doanh',
    'calculator.work': 'Làm việc',
    'calculator.single': 'Một lần',
    'calculator.multiple': 'Nhiều lần',
    'calculator.calculate': 'Tính toán',
    'calculator.days': 'ngày',
    'calculator.cost': 'chi phí',
    'calculator.processing': 'xử lý',

    // FAQ
    'faq.title': 'FAQ',
    'faq.heading': 'Câu hỏi thường gặp',

    // Testimonials
    'testimonials.title': 'Đánh giá',
    'testimonials.heading': 'Khách hàng nói gì',
    'testimonials.subtitle': 'Những câu chuyện thành công',

    // Contact
    'contact.title': 'Tư vấn',
    'contact.heading': 'Gửi yêu cầu',
    'contact.subtitle': 'Chúng tôi sẽ liên hệ sớm',
    'contact.name': 'Tên của bạn',
    'contact.phone': 'Điện thoại',
    'contact.messenger': 'Messenger',
    'contact.visaType': 'Loại Visa',
    'contact.message': 'Tin nhắn',
    'contact.submit': 'Gửi yêu cầu',
    'contact.sending': 'Đang gửi...',
    'contact.success': 'Đã gửi yêu cầu!',
    'contact.successMessage': 'Chúng tôi sẽ liên hệ sớm',
    'contact.sendAnother': 'Gửi thêm',
    'contact.noVisa': 'Không biết / cần tư vấn',

    // CTA
    'cta.emoji': '🌴',
    'cta.heading': 'Sẵn sàng cho cuộc phiêu lưu?',
    'cta.subtitle': 'Việt Nam đang chờ bạn!',
    'cta.button': 'Đăng ký e-Visa',

    // Footer
    'footer.sections': 'Mục',
    'footer.useful': 'Hữu ích',
    'footer.cities': 'Thành phố',
    'footer.privacy': 'Bảo mật',
    'footer.admin': 'Admin',
  },
}

export const localeNames: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  vi: 'Tiếng Việt',
}

export const localeFlags: Record<Locale, string> = {
  ru: '🇷🇺',
  en: '🇬🇧',
  vi: '🇻🇳',
}
