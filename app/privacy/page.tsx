'use client'

import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { useLocale } from '@/lib/i18n/context'

const content = {
  ru: {
    title: 'Политика конфиденциальности',
    updated: 'Последнее обновление: Январь 2025',
    backHome: 'На главную',
    sections: [
      {
        title: '1. Общие положения',
        content: `Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта NhaTrangLife (далее — «Сайт»).

Сайт предоставляет информационные услуги по оформлению виз во Вьетнам и аренде квартир в Нячанге.

Используя Сайт, вы соглашаетесь с условиями данной Политики конфиденциальности.`
      },
      {
        title: '2. Какие данные мы собираем',
        content: `При использовании Сайта мы можем собирать следующие данные:`,
        list: [
          'Имя и контактные данные (телефон, email)',
          'Предпочтительный способ связи (Telegram, WhatsApp, Zalo)',
          'Информация о запрашиваемом типе визы',
          'Информация о предпочтениях по аренде (район, бюджет, количество комнат)',
          'Сообщения, отправленные через формы обратной связи',
          'Техническая информация (IP-адрес, тип браузера, время посещения)'
        ]
      },
      {
        title: '3. Цели сбора данных',
        content: `Мы используем ваши данные для:`,
        list: [
          'Обработки заявок на консультацию по визам',
          'Организации просмотров квартир и видеозвонков',
          'Связи с вами по указанным контактным данным',
          'Подбора подходящих вариантов аренды',
          'Улучшения качества наших услуг',
          'Анализа использования Сайта'
        ]
      },
      {
        title: '4. Защита данных',
        content: `Мы принимаем все необходимые технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.

Данные хранятся на защищённых серверах и передаются по зашифрованным каналам (HTTPS).`
      },
      {
        title: '5. Передача данных третьим лицам',
        content: `Мы не продаём и не передаём ваши персональные данные третьим лицам, за исключением случаев:`,
        list: [
          'Когда это необходимо для оказания запрошенных услуг (например, передача контактов арендодателю)',
          'Когда это требуется по закону',
          'С вашего явного согласия'
        ]
      },
      {
        title: '6. Cookies и аналитика',
        content: `Сайт может использовать cookies для:`,
        list: [
          'Сохранения ваших языковых предпочтений',
          'Запоминания избранных квартир',
          'Улучшения пользовательского опыта',
          'Сбора статистики посещений'
        ],
        extra: 'Вы можете отключить cookies в настройках вашего браузера.'
      },
      {
        title: '7. Ваши права',
        content: `Вы имеете право:`,
        list: [
          'Запросить информацию о ваших данных, которые мы храним',
          'Потребовать исправления неточных данных',
          'Потребовать удаления ваших данных',
          'Отозвать согласие на обработку данных'
        ]
      },
      {
        title: '8. Хранение данных',
        content: `Мы храним ваши персональные данные только в течение срока, необходимого для достижения целей их сбора, или в соответствии с требованиями законодательства.

Заявки на просмотр квартир хранятся в течение 1 года после их обработки.`
      },
      {
        title: '9. Изменения политики',
        content: `Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная версия всегда доступна на этой странице.

О существенных изменениях мы уведомим пользователей через Сайт.`
      },
      {
        title: '10. Контакты',
        content: `По вопросам, связанным с обработкой персональных данных, вы можете связаться с нами через форму на сайте или по контактам, указанным на главной странице.`
      }
    ]
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: January 2025',
    backHome: 'Back to Home',
    sections: [
      {
        title: '1. General Provisions',
        content: `This Privacy Policy defines the procedure for processing and protecting personal data of users of the NhaTrangLife website (hereinafter — "Website").

The Website provides information services for obtaining visas to Vietnam and renting apartments in Nha Trang.

By using the Website, you agree to the terms of this Privacy Policy.`
      },
      {
        title: '2. What Data We Collect',
        content: `When using the Website, we may collect the following data:`,
        list: [
          'Name and contact details (phone, email)',
          'Preferred method of communication (Telegram, WhatsApp, Zalo)',
          'Information about the requested visa type',
          'Information about rental preferences (district, budget, number of rooms)',
          'Messages sent through feedback forms',
          'Technical information (IP address, browser type, visit time)'
        ]
      },
      {
        title: '3. Purposes of Data Collection',
        content: `We use your data for:`,
        list: [
          'Processing visa consultation requests',
          'Organizing apartment viewings and video calls',
          'Contacting you using the provided contact details',
          'Selecting suitable rental options',
          'Improving the quality of our services',
          'Analyzing Website usage'
        ]
      },
      {
        title: '4. Data Protection',
        content: `We take all necessary technical and organizational measures to protect your personal data from unauthorized access, modification, disclosure, or destruction.

Data is stored on secure servers and transmitted through encrypted channels (HTTPS).`
      },
      {
        title: '5. Data Transfer to Third Parties',
        content: `We do not sell or transfer your personal data to third parties, except in cases:`,
        list: [
          'When it is necessary to provide the requested services (e.g., transferring contacts to a landlord)',
          'When required by law',
          'With your explicit consent'
        ]
      },
      {
        title: '6. Cookies and Analytics',
        content: `The Website may use cookies for:`,
        list: [
          'Saving your language preferences',
          'Remembering favorite apartments',
          'Improving user experience',
          'Collecting visit statistics'
        ],
        extra: 'You can disable cookies in your browser settings.'
      },
      {
        title: '7. Your Rights',
        content: `You have the right to:`,
        list: [
          'Request information about your data that we store',
          'Demand correction of inaccurate data',
          'Demand deletion of your data',
          'Withdraw consent to data processing'
        ]
      },
      {
        title: '8. Data Storage',
        content: `We store your personal data only for the period necessary to achieve the purposes of their collection, or in accordance with legal requirements.

Apartment viewing requests are stored for 1 year after processing.`
      },
      {
        title: '9. Policy Changes',
        content: `We reserve the right to make changes to this Privacy Policy. The current version is always available on this page.

We will notify users of significant changes through the Website.`
      },
      {
        title: '10. Contacts',
        content: `For questions related to personal data processing, you can contact us through the form on the website or using the contacts listed on the main page.`
      }
    ]
  },
  vi: {
    title: 'Chính sách bảo mật',
    updated: 'Cập nhật lần cuối: Tháng 1 năm 2025',
    backHome: 'Về trang chủ',
    sections: [
      {
        title: '1. Quy định chung',
        content: `Chính sách Bảo mật này xác định quy trình xử lý và bảo vệ dữ liệu cá nhân của người dùng trang web NhaTrangLife (sau đây gọi là "Trang web").

Trang web cung cấp dịch vụ thông tin về xin thị thực vào Việt Nam và cho thuê căn hộ tại Nha Trang.

Bằng việc sử dụng Trang web, bạn đồng ý với các điều khoản của Chính sách Bảo mật này.`
      },
      {
        title: '2. Dữ liệu chúng tôi thu thập',
        content: `Khi sử dụng Trang web, chúng tôi có thể thu thập các dữ liệu sau:`,
        list: [
          'Tên và thông tin liên hệ (điện thoại, email)',
          'Phương thức liên lạc ưa thích (Telegram, WhatsApp, Zalo)',
          'Thông tin về loại thị thực yêu cầu',
          'Thông tin về sở thích thuê nhà (quận, ngân sách, số phòng)',
          'Tin nhắn gửi qua biểu mẫu liên hệ',
          'Thông tin kỹ thuật (địa chỉ IP, loại trình duyệt, thời gian truy cập)'
        ]
      },
      {
        title: '3. Mục đích thu thập dữ liệu',
        content: `Chúng tôi sử dụng dữ liệu của bạn để:`,
        list: [
          'Xử lý yêu cầu tư vấn thị thực',
          'Tổ chức xem căn hộ và cuộc gọi video',
          'Liên hệ với bạn qua thông tin liên lạc đã cung cấp',
          'Chọn các tùy chọn cho thuê phù hợp',
          'Cải thiện chất lượng dịch vụ',
          'Phân tích việc sử dụng Trang web'
        ]
      },
      {
        title: '4. Bảo vệ dữ liệu',
        content: `Chúng tôi thực hiện tất cả các biện pháp kỹ thuật và tổ chức cần thiết để bảo vệ dữ liệu cá nhân của bạn khỏi truy cập, sửa đổi, tiết lộ hoặc phá hủy trái phép.

Dữ liệu được lưu trữ trên máy chủ bảo mật và truyền qua các kênh được mã hóa (HTTPS).`
      },
      {
        title: '5. Chuyển dữ liệu cho bên thứ ba',
        content: `Chúng tôi không bán hoặc chuyển dữ liệu cá nhân của bạn cho bên thứ ba, ngoại trừ các trường hợp:`,
        list: [
          'Khi cần thiết để cung cấp dịch vụ được yêu cầu (ví dụ: chuyển liên hệ cho chủ nhà)',
          'Khi pháp luật yêu cầu',
          'Với sự đồng ý rõ ràng của bạn'
        ]
      },
      {
        title: '6. Cookies và phân tích',
        content: `Trang web có thể sử dụng cookies để:`,
        list: [
          'Lưu tùy chọn ngôn ngữ của bạn',
          'Ghi nhớ căn hộ yêu thích',
          'Cải thiện trải nghiệm người dùng',
          'Thu thập thống kê truy cập'
        ],
        extra: 'Bạn có thể tắt cookies trong cài đặt trình duyệt.'
      },
      {
        title: '7. Quyền của bạn',
        content: `Bạn có quyền:`,
        list: [
          'Yêu cầu thông tin về dữ liệu của bạn mà chúng tôi lưu trữ',
          'Yêu cầu sửa chữa dữ liệu không chính xác',
          'Yêu cầu xóa dữ liệu của bạn',
          'Rút lại sự đồng ý xử lý dữ liệu'
        ]
      },
      {
        title: '8. Lưu trữ dữ liệu',
        content: `Chúng tôi chỉ lưu trữ dữ liệu cá nhân của bạn trong thời gian cần thiết để đạt được mục đích thu thập, hoặc theo yêu cầu pháp luật.

Yêu cầu xem căn hộ được lưu trữ trong 1 năm sau khi xử lý.`
      },
      {
        title: '9. Thay đổi chính sách',
        content: `Chúng tôi có quyền thay đổi Chính sách Bảo mật này. Phiên bản hiện tại luôn có sẵn trên trang này.

Chúng tôi sẽ thông báo cho người dùng về những thay đổi quan trọng qua Trang web.`
      },
      {
        title: '10. Liên hệ',
        content: `Đối với các câu hỏi liên quan đến xử lý dữ liệu cá nhân, bạn có thể liên hệ với chúng tôi qua biểu mẫu trên trang web hoặc sử dụng thông tin liên hệ trên trang chủ.`
      }
    ]
  }
}

export default function PrivacyPage() {
  const { locale } = useLocale()
  const t = content[locale] || content.ru

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 mb-8 transition"
          >
            ← {t.backHome}
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            {t.updated}
          </p>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
            {t.sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {section.title}
                </h2>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
                {section.list && (
                  <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700 dark:text-gray-300">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.extra && (
                  <p className="mt-3 text-gray-700 dark:text-gray-300">
                    {section.extra}
                  </p>
                )}
              </section>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 hover:shadow-lg transition"
            >
              ← {t.backHome}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
