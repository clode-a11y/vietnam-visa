'use client'

import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { useLocale } from '@/lib/i18n/context'

const content = {
  ru: {
    title: 'Условия использования',
    updated: 'Последнее обновление: Январь 2025',
    backHome: 'На главную',
    sections: [
      {
        title: '1. Общие положения',
        content: `Настоящие Условия использования (далее — «Условия») регулируют использование сайта NhaTrangLife (далее — «Сайт»).

Сайт предоставляет информационные услуги по оформлению виз во Вьетнам и аренде квартир в Нячанге.

Используя Сайт, вы подтверждаете, что прочитали, поняли и согласны соблюдать настоящие Условия.`
      },
      {
        title: '2. Описание услуг',
        content: `Сайт предоставляет следующие услуги:`,
        list: [
          'Информация о типах виз во Вьетнам и процессе их оформления',
          'Консультации по визовым вопросам',
          'Каталог квартир для долгосрочной аренды в Нячанге',
          'Организация просмотров квартир (личных и по видеосвязи)',
          'Помощь в подборе жилья по вашим критериям'
        ],
        extra: 'Мы являемся информационным посредником и не несём ответственности за действия третьих сторон (арендодателей, государственных органов).'
      },
      {
        title: '3. Использование сайта',
        content: `При использовании Сайта вы обязуетесь:`,
        list: [
          'Предоставлять достоверную информацию при заполнении форм',
          'Не использовать Сайт для незаконных целей',
          'Не пытаться получить несанкционированный доступ к системам Сайта',
          'Не размещать вредоносный код или спам',
          'Уважать права других пользователей и третьих лиц'
        ]
      },
      {
        title: '4. Визовые услуги',
        content: `Важная информация о визовых услугах:`,
        list: [
          'Мы предоставляем информационные консультации, а не официальное оформление виз',
          'Окончательное решение о выдаче визы принимается миграционными органами Вьетнама',
          'Мы не гарантируем одобрение визы',
          'Информация о визах может изменяться — всегда проверяйте актуальные требования',
          'Стоимость и сроки оформления виз зависят от типа визы и могут меняться'
        ]
      },
      {
        title: '5. Услуги по аренде',
        content: `Условия использования услуг по аренде квартир:`,
        list: [
          'Информация о квартирах предоставляется на основании данных от арендодателей',
          'Мы стараемся поддерживать актуальность информации, но не гарантируем её полноту',
          'Цены и доступность квартир могут изменяться без предварительного уведомления',
          'Договор аренды заключается напрямую между вами и арендодателем',
          'Мы не несём ответственности за состояние квартир или действия арендодателей'
        ]
      },
      {
        title: '6. Стоимость услуг',
        content: `Информация о стоимости:`,
        list: [
          'Консультации по визам — бесплатно',
          'Помощь в подборе квартир — бесплатно для арендаторов',
          'Организация просмотров — бесплатно',
          'Дополнительные услуги оговариваются индивидуально'
        ],
        extra: 'Мы не взимаем скрытых комиссий с арендаторов.'
      },
      {
        title: '7. Интеллектуальная собственность',
        content: `Все материалы на Сайте (тексты, изображения, дизайн, логотипы) являются собственностью NhaTrangLife или используются с разрешения правообладателей.

Запрещается копирование, распространение или модификация материалов Сайта без письменного разрешения.

Фотографии квартир принадлежат их владельцам или арендодателям.`
      },
      {
        title: '8. Ограничение ответственности',
        content: `NhaTrangLife не несёт ответственности за:`,
        list: [
          'Решения миграционных органов по визовым заявкам',
          'Действия или бездействие арендодателей',
          'Состояние арендуемых квартир',
          'Убытки, возникшие в результате использования информации с Сайта',
          'Временную недоступность Сайта по техническим причинам',
          'Действия третьих лиц'
        ]
      },
      {
        title: '9. Разрешение споров',
        content: `В случае возникновения споров стороны будут стремиться разрешить их путём переговоров.

Если спор не удаётся разрешить мирным путём, он подлежит рассмотрению в соответствии с законодательством Социалистической Республики Вьетнам.`
      },
      {
        title: '10. Изменение условий',
        content: `Мы оставляем за собой право изменять настоящие Условия в любое время.

Изменения вступают в силу с момента публикации на Сайте. Продолжая использовать Сайт после внесения изменений, вы принимаете новые Условия.

Рекомендуем периодически проверять эту страницу.`
      },
      {
        title: '11. Контакты',
        content: `По вопросам, связанным с настоящими Условиями, вы можете связаться с нами через форму на сайте или по контактам, указанным на главной странице.`
      }
    ]
  },
  en: {
    title: 'Terms of Service',
    updated: 'Last updated: January 2025',
    backHome: 'Back to Home',
    sections: [
      {
        title: '1. General Provisions',
        content: `These Terms of Service (hereinafter — "Terms") govern the use of the NhaTrangLife website (hereinafter — "Website").

The Website provides information services for obtaining visas to Vietnam and renting apartments in Nha Trang.

By using the Website, you confirm that you have read, understood, and agree to comply with these Terms.`
      },
      {
        title: '2. Description of Services',
        content: `The Website provides the following services:`,
        list: [
          'Information about visa types for Vietnam and the application process',
          'Visa consultation services',
          'Catalog of apartments for long-term rent in Nha Trang',
          'Organization of apartment viewings (in-person and via video call)',
          'Assistance in finding housing according to your criteria'
        ],
        extra: 'We are an information intermediary and are not responsible for the actions of third parties (landlords, government agencies).'
      },
      {
        title: '3. Website Usage',
        content: `When using the Website, you agree to:`,
        list: [
          'Provide accurate information when filling out forms',
          'Not use the Website for illegal purposes',
          'Not attempt to gain unauthorized access to Website systems',
          'Not post malicious code or spam',
          'Respect the rights of other users and third parties'
        ]
      },
      {
        title: '4. Visa Services',
        content: `Important information about visa services:`,
        list: [
          'We provide information consultations, not official visa processing',
          'The final decision on visa issuance is made by Vietnamese immigration authorities',
          'We do not guarantee visa approval',
          'Visa information may change — always check current requirements',
          'Visa costs and processing times depend on visa type and may vary'
        ]
      },
      {
        title: '5. Rental Services',
        content: `Terms of use for apartment rental services:`,
        list: [
          'Apartment information is provided based on data from landlords',
          'We strive to maintain up-to-date information but do not guarantee its completeness',
          'Prices and availability may change without prior notice',
          'The rental agreement is concluded directly between you and the landlord',
          'We are not responsible for the condition of apartments or actions of landlords'
        ]
      },
      {
        title: '6. Service Costs',
        content: `Pricing information:`,
        list: [
          'Visa consultations — free',
          'Apartment search assistance — free for tenants',
          'Viewing organization — free',
          'Additional services are discussed individually'
        ],
        extra: 'We do not charge hidden fees from tenants.'
      },
      {
        title: '7. Intellectual Property',
        content: `All materials on the Website (texts, images, design, logos) are the property of NhaTrangLife or used with permission of the rights holders.

Copying, distribution, or modification of Website materials without written permission is prohibited.

Apartment photos belong to their owners or landlords.`
      },
      {
        title: '8. Limitation of Liability',
        content: `NhaTrangLife is not liable for:`,
        list: [
          'Decisions of immigration authorities on visa applications',
          'Actions or inactions of landlords',
          'Condition of rented apartments',
          'Losses resulting from the use of information from the Website',
          'Temporary unavailability of the Website for technical reasons',
          'Actions of third parties'
        ]
      },
      {
        title: '9. Dispute Resolution',
        content: `In case of disputes, the parties will seek to resolve them through negotiations.

If a dispute cannot be resolved amicably, it shall be considered in accordance with the laws of the Socialist Republic of Vietnam.`
      },
      {
        title: '10. Changes to Terms',
        content: `We reserve the right to change these Terms at any time.

Changes take effect upon publication on the Website. By continuing to use the Website after changes are made, you accept the new Terms.

We recommend checking this page periodically.`
      },
      {
        title: '11. Contacts',
        content: `For questions related to these Terms, you can contact us through the form on the website or using the contacts listed on the main page.`
      }
    ]
  },
  vi: {
    title: 'Điều khoản sử dụng',
    updated: 'Cập nhật lần cuối: Tháng 1 năm 2025',
    backHome: 'Về trang chủ',
    sections: [
      {
        title: '1. Quy định chung',
        content: `Điều khoản Sử dụng này (sau đây gọi là "Điều khoản") quy định việc sử dụng trang web NhaTrangLife (sau đây gọi là "Trang web").

Trang web cung cấp dịch vụ thông tin về xin thị thực vào Việt Nam và cho thuê căn hộ tại Nha Trang.

Bằng việc sử dụng Trang web, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý tuân thủ các Điều khoản này.`
      },
      {
        title: '2. Mô tả dịch vụ',
        content: `Trang web cung cấp các dịch vụ sau:`,
        list: [
          'Thông tin về các loại thị thực vào Việt Nam và quy trình xin thị thực',
          'Dịch vụ tư vấn thị thực',
          'Danh mục căn hộ cho thuê dài hạn tại Nha Trang',
          'Tổ chức xem căn hộ (trực tiếp và qua cuộc gọi video)',
          'Hỗ trợ tìm kiếm nhà ở theo tiêu chí của bạn'
        ],
        extra: 'Chúng tôi là trung gian thông tin và không chịu trách nhiệm về hành động của bên thứ ba (chủ nhà, cơ quan nhà nước).'
      },
      {
        title: '3. Sử dụng trang web',
        content: `Khi sử dụng Trang web, bạn đồng ý:`,
        list: [
          'Cung cấp thông tin chính xác khi điền vào các biểu mẫu',
          'Không sử dụng Trang web cho mục đích bất hợp pháp',
          'Không cố gắng truy cập trái phép vào hệ thống Trang web',
          'Không đăng mã độc hại hoặc spam',
          'Tôn trọng quyền của người dùng khác và bên thứ ba'
        ]
      },
      {
        title: '4. Dịch vụ thị thực',
        content: `Thông tin quan trọng về dịch vụ thị thực:`,
        list: [
          'Chúng tôi cung cấp tư vấn thông tin, không phải xử lý thị thực chính thức',
          'Quyết định cuối cùng về việc cấp thị thực do cơ quan xuất nhập cảnh Việt Nam đưa ra',
          'Chúng tôi không đảm bảo phê duyệt thị thực',
          'Thông tin thị thực có thể thay đổi — luôn kiểm tra các yêu cầu hiện hành',
          'Chi phí và thời gian xử lý thị thực phụ thuộc vào loại thị thực và có thể thay đổi'
        ]
      },
      {
        title: '5. Dịch vụ cho thuê',
        content: `Điều khoản sử dụng dịch vụ cho thuê căn hộ:`,
        list: [
          'Thông tin căn hộ được cung cấp dựa trên dữ liệu từ chủ nhà',
          'Chúng tôi cố gắng duy trì thông tin cập nhật nhưng không đảm bảo tính đầy đủ',
          'Giá cả và tình trạng có thể thay đổi mà không cần thông báo trước',
          'Hợp đồng thuê nhà được ký kết trực tiếp giữa bạn và chủ nhà',
          'Chúng tôi không chịu trách nhiệm về tình trạng căn hộ hoặc hành động của chủ nhà'
        ]
      },
      {
        title: '6. Chi phí dịch vụ',
        content: `Thông tin về giá:`,
        list: [
          'Tư vấn thị thực — miễn phí',
          'Hỗ trợ tìm kiếm căn hộ — miễn phí cho người thuê',
          'Tổ chức xem nhà — miễn phí',
          'Các dịch vụ bổ sung được thảo luận riêng'
        ],
        extra: 'Chúng tôi không thu phí ẩn từ người thuê.'
      },
      {
        title: '7. Sở hữu trí tuệ',
        content: `Tất cả tài liệu trên Trang web (văn bản, hình ảnh, thiết kế, logo) là tài sản của NhaTrangLife hoặc được sử dụng với sự cho phép của chủ sở hữu quyền.

Việc sao chép, phân phối hoặc sửa đổi tài liệu Trang web mà không có sự cho phép bằng văn bản là bị cấm.

Ảnh căn hộ thuộc về chủ sở hữu hoặc chủ nhà của chúng.`
      },
      {
        title: '8. Giới hạn trách nhiệm',
        content: `NhaTrangLife không chịu trách nhiệm về:`,
        list: [
          'Quyết định của cơ quan xuất nhập cảnh về đơn xin thị thực',
          'Hành động hoặc không hành động của chủ nhà',
          'Tình trạng căn hộ cho thuê',
          'Thiệt hại phát sinh từ việc sử dụng thông tin từ Trang web',
          'Trang web tạm thời không khả dụng vì lý do kỹ thuật',
          'Hành động của bên thứ ba'
        ]
      },
      {
        title: '9. Giải quyết tranh chấp',
        content: `Trong trường hợp có tranh chấp, các bên sẽ tìm cách giải quyết thông qua đàm phán.

Nếu tranh chấp không thể được giải quyết một cách hòa giải, nó sẽ được xem xét theo luật pháp của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.`
      },
      {
        title: '10. Thay đổi điều khoản',
        content: `Chúng tôi có quyền thay đổi các Điều khoản này bất cứ lúc nào.

Các thay đổi có hiệu lực khi được đăng trên Trang web. Bằng việc tiếp tục sử dụng Trang web sau khi có thay đổi, bạn chấp nhận các Điều khoản mới.

Chúng tôi khuyên bạn nên kiểm tra trang này định kỳ.`
      },
      {
        title: '11. Liên hệ',
        content: `Đối với các câu hỏi liên quan đến các Điều khoản này, bạn có thể liên hệ với chúng tôi qua biểu mẫu trên trang web hoặc sử dụng thông tin liên hệ trên trang chủ.`
      }
    ]
  }
}

export default function TermsPage() {
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
