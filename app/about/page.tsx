'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocale } from '@/lib/i18n/context'

export default function AboutPage() {
  const { locale } = useLocale()

  const content = {
    ru: {
      title: 'О нас',
      subtitle: 'Ваш надёжный партнёр во Вьетнаме',
      heroText: 'Мы помогаем русскоязычным клиентам комфортно обустроиться во Вьетнаме — от оформления визы до поиска идеального жилья.',

      missionTitle: 'Наша миссия',
      missionText: 'Сделать переезд и жизнь во Вьетнаме простыми и понятными для каждого. Мы берём на себя все сложности с документами, языковым барьером и поиском жилья.',

      whyTitle: 'Почему выбирают нас',
      whyItems: [
        {
          icon: '🏠',
          title: 'Проверенное жильё',
          text: 'Каждая квартира лично проверена. Мы работаем только с надёжными владельцами.'
        },
        {
          icon: '📋',
          title: 'Визовая поддержка',
          text: 'Полное сопровождение по всем типам виз. Знаем все нюансы вьетнамского законодательства.'
        },
        {
          icon: '🌏',
          title: 'Местная экспертиза',
          text: 'Живём в Нячанге и знаем город изнутри. Подскажем лучшие районы, магазины, школы.'
        },
        {
          icon: '💬',
          title: 'На связи 24/7',
          text: 'Отвечаем в Telegram, WhatsApp и Zalo. Всегда поможем решить любой вопрос.'
        }
      ],

      servicesTitle: 'Наши услуги',
      services: [
        {
          title: 'Визы и документы',
          items: ['Туристические визы', 'Бизнес-визы', 'Рабочие разрешения', 'Продление виз', 'Visa-run сопровождение']
        },
        {
          title: 'Аренда жилья',
          items: ['Долгосрочная аренда', 'Просмотры квартир', 'Видео-звонки из квартир', 'Помощь с договором', 'Заселение и поддержка']
        },
        {
          title: 'Дополнительно',
          items: ['Трансфер из аэропорта', 'Сим-карты и интернет', 'Открытие банковского счёта', 'Консультации по жизни во Вьетнаме']
        }
      ],

      numbersTitle: 'Немного цифр',
      numbers: [
        { value: '500+', label: 'Довольных клиентов' },
        { value: '200+', label: 'Квартир в базе' },
        { value: '5', label: 'Лет опыта' },
        { value: '24/7', label: 'На связи' }
      ],

      teamTitle: 'Наша команда',
      teamText: 'Мы — небольшая команда профессионалов, которые любят Вьетнам и помогают другим открыть эту удивительную страну. Каждый из нас прошёл путь переезда и знает все сложности из первых рук.',

      ctaTitle: 'Готовы начать?',
      ctaText: 'Свяжитесь с нами, и мы поможем вам с переездом во Вьетнам',
      ctaButton: 'Связаться с нами',
      ctaVisa: 'Рассчитать визу'
    },
    en: {
      title: 'About Us',
      subtitle: 'Your reliable partner in Vietnam',
      heroText: 'We help international clients settle comfortably in Vietnam — from visa processing to finding the perfect home.',

      missionTitle: 'Our Mission',
      missionText: 'To make moving and living in Vietnam simple and straightforward for everyone. We handle all the complexities of documents, language barriers, and housing search.',

      whyTitle: 'Why Choose Us',
      whyItems: [
        {
          icon: '🏠',
          title: 'Verified Housing',
          text: 'Every apartment is personally inspected. We work only with reliable landlords.'
        },
        {
          icon: '📋',
          title: 'Visa Support',
          text: 'Full assistance with all visa types. We know all the nuances of Vietnamese legislation.'
        },
        {
          icon: '🌏',
          title: 'Local Expertise',
          text: 'We live in Nha Trang and know the city inside out. We\'ll recommend the best areas, shops, schools.'
        },
        {
          icon: '💬',
          title: 'Available 24/7',
          text: 'We respond on Telegram, WhatsApp and Zalo. Always ready to help with any question.'
        }
      ],

      servicesTitle: 'Our Services',
      services: [
        {
          title: 'Visas & Documents',
          items: ['Tourist visas', 'Business visas', 'Work permits', 'Visa extensions', 'Visa-run assistance']
        },
        {
          title: 'Property Rental',
          items: ['Long-term rentals', 'Apartment viewings', 'Video calls from apartments', 'Contract assistance', 'Move-in support']
        },
        {
          title: 'Additional Services',
          items: ['Airport transfer', 'SIM cards & internet', 'Bank account opening', 'Living in Vietnam consultations']
        }
      ],

      numbersTitle: 'Some Numbers',
      numbers: [
        { value: '500+', label: 'Happy clients' },
        { value: '200+', label: 'Apartments listed' },
        { value: '5', label: 'Years of experience' },
        { value: '24/7', label: 'Available' }
      ],

      teamTitle: 'Our Team',
      teamText: 'We are a small team of professionals who love Vietnam and help others discover this amazing country. Each of us has gone through the relocation process and knows all the challenges firsthand.',

      ctaTitle: 'Ready to Start?',
      ctaText: 'Contact us and we\'ll help you with your move to Vietnam',
      ctaButton: 'Contact Us',
      ctaVisa: 'Calculate Visa'
    },
    vi: {
      title: 'Về chúng tôi',
      subtitle: 'Đối tác đáng tin cậy của bạn tại Việt Nam',
      heroText: 'Chúng tôi giúp khách hàng quốc tế định cư thoải mái tại Việt Nam — từ thủ tục visa đến tìm nhà ở lý tưởng.',

      missionTitle: 'Sứ mệnh của chúng tôi',
      missionText: 'Làm cho việc chuyển đến và sống tại Việt Nam trở nên đơn giản và dễ hiểu cho mọi người. Chúng tôi xử lý tất cả các phức tạp về giấy tờ, rào cản ngôn ngữ và tìm kiếm nhà ở.',

      whyTitle: 'Tại sao chọn chúng tôi',
      whyItems: [
        {
          icon: '🏠',
          title: 'Nhà ở đã xác minh',
          text: 'Mỗi căn hộ được kiểm tra trực tiếp. Chúng tôi chỉ làm việc với chủ nhà đáng tin cậy.'
        },
        {
          icon: '📋',
          title: 'Hỗ trợ Visa',
          text: 'Hỗ trợ đầy đủ với tất cả các loại visa. Chúng tôi hiểu rõ pháp luật Việt Nam.'
        },
        {
          icon: '🌏',
          title: 'Chuyên môn địa phương',
          text: 'Chúng tôi sống ở Nha Trang và hiểu thành phố từ bên trong. Sẽ giới thiệu các khu vực, cửa hàng, trường học tốt nhất.'
        },
        {
          icon: '💬',
          title: 'Hỗ trợ 24/7',
          text: 'Chúng tôi phản hồi qua Telegram, WhatsApp và Zalo. Luôn sẵn sàng giúp đỡ.'
        }
      ],

      servicesTitle: 'Dịch vụ của chúng tôi',
      services: [
        {
          title: 'Visa & Giấy tờ',
          items: ['Visa du lịch', 'Visa kinh doanh', 'Giấy phép lao động', 'Gia hạn visa', 'Hỗ trợ visa-run']
        },
        {
          title: 'Thuê nhà',
          items: ['Thuê dài hạn', 'Xem căn hộ', 'Gọi video từ căn hộ', 'Hỗ trợ hợp đồng', 'Hỗ trợ nhận phòng']
        },
        {
          title: 'Dịch vụ bổ sung',
          items: ['Đưa đón sân bay', 'SIM & internet', 'Mở tài khoản ngân hàng', 'Tư vấn sống tại Việt Nam']
        }
      ],

      numbersTitle: 'Một số con số',
      numbers: [
        { value: '500+', label: 'Khách hàng hài lòng' },
        { value: '200+', label: 'Căn hộ trong danh sách' },
        { value: '5', label: 'Năm kinh nghiệm' },
        { value: '24/7', label: 'Luôn sẵn sàng' }
      ],

      teamTitle: 'Đội ngũ của chúng tôi',
      teamText: 'Chúng tôi là một đội ngũ nhỏ các chuyên gia yêu Việt Nam và giúp người khác khám phá đất nước tuyệt vời này. Mỗi người trong chúng tôi đã trải qua quá trình di chuyển và hiểu tất cả các thách thức.',

      ctaTitle: 'Sẵn sàng bắt đầu?',
      ctaText: 'Liên hệ với chúng tôi và chúng tôi sẽ giúp bạn chuyển đến Việt Nam',
      ctaButton: 'Liên hệ',
      ctaVisa: 'Tính toán Visa'
    }
  }

  const t = content[locale as keyof typeof content] || content.ru

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-teal-50/30 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="px-6 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-teal-600 dark:text-teal-400 font-medium mb-6">
              {t.subtitle}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t.heroText}
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="px-6 py-12 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
              {t.missionTitle}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t.missionText}
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center dark:text-white">
              {t.whyTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {t.whyItems.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="px-6 py-16 bg-gradient-to-r from-teal-600 to-teal-500">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-white">
              {t.numbersTitle}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t.numbers.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {item.value}
                  </div>
                  <div className="text-teal-100">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center dark:text-white">
              {t.servicesTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {t.services.map((service, index) => (
                <div
                  key={index}
                  className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700"
                >
                  <h3 className="text-xl font-bold mb-4 text-teal-600 dark:text-teal-400">
                    {service.title}
                  </h3>
                  <ul className="space-y-2">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <span className="text-teal-500 mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="px-6 py-12 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
              {t.teamTitle}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t.teamText}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
              {t.ctaTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contacts"
                className="px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition"
              >
                {t.ctaButton}
              </a>
              <a
                href="/visa#calculator"
                className="px-8 py-4 bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 font-bold rounded-xl border-2 border-teal-600 dark:border-teal-400 hover:bg-teal-50 dark:hover:bg-slate-700 transition"
              >
                {t.ctaVisa}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
