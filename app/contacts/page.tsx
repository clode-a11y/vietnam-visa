'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { useLocale } from '@/lib/i18n/context'

const content = {
  ru: {
    title: 'Контакты',
    subtitle: 'Свяжитесь с нами удобным способом',
    backHome: 'На главную',
    // Contact info
    address: 'Адрес',
    addressValue: 'Нячанг, Вьетнам',
    phone: 'Телефон',
    phoneValue: '+84 xxx xxx xxx',
    email: 'Email',
    emailValue: 'info@nhatranglife.com',
    workHours: 'Время работы',
    workHoursValue: 'Пн - Сб: 9:00 - 18:00 (по Вьетнаму)',
    // Messengers
    messengers: 'Мессенджеры',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    // Form
    formTitle: 'Напишите нам',
    formSubtitle: 'Мы ответим в течение 24 часов',
    name: 'Ваше имя',
    namePlaceholder: 'Иван Иванов',
    emailLabel: 'Email',
    emailPlaceholder: 'ivan@example.com',
    subject: 'Тема',
    subjectPlaceholder: 'Выберите тему',
    subjects: {
      visa: 'Вопрос по визам',
      rent: 'Аренда квартиры',
      other: 'Другое',
    },
    message: 'Сообщение',
    messagePlaceholder: 'Опишите ваш вопрос...',
    send: 'Отправить',
    sending: 'Отправка...',
    success: 'Сообщение отправлено! Мы свяжемся с вами в ближайшее время.',
    // FAQ
    faqTitle: 'Частые вопросы',
    faq: [
      {
        q: 'Как быстро вы отвечаете?',
        a: 'Мы стараемся отвечать в течение 24 часов в рабочие дни. Срочные вопросы лучше задавать в Telegram.',
      },
      {
        q: 'Можно ли позвонить?',
        a: 'Да, вы можете позвонить по указанному номеру или заказать обратный звонок через мессенджеры.',
      },
      {
        q: 'На каких языках вы общаетесь?',
        a: 'Мы говорим на русском, английском и вьетнамском языках.',
      },
    ],
  },
  en: {
    title: 'Contacts',
    subtitle: 'Get in touch with us',
    backHome: 'Back to Home',
    // Contact info
    address: 'Address',
    addressValue: 'Nha Trang, Vietnam',
    phone: 'Phone',
    phoneValue: '+84 xxx xxx xxx',
    email: 'Email',
    emailValue: 'info@nhatranglife.com',
    workHours: 'Working Hours',
    workHoursValue: 'Mon - Sat: 9:00 AM - 6:00 PM (Vietnam time)',
    // Messengers
    messengers: 'Messengers',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    // Form
    formTitle: 'Write to Us',
    formSubtitle: 'We will respond within 24 hours',
    name: 'Your Name',
    namePlaceholder: 'John Doe',
    emailLabel: 'Email',
    emailPlaceholder: 'john@example.com',
    subject: 'Subject',
    subjectPlaceholder: 'Select subject',
    subjects: {
      visa: 'Visa Question',
      rent: 'Apartment Rental',
      other: 'Other',
    },
    message: 'Message',
    messagePlaceholder: 'Describe your question...',
    send: 'Send',
    sending: 'Sending...',
    success: 'Message sent! We will contact you soon.',
    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faq: [
      {
        q: 'How quickly do you respond?',
        a: 'We try to respond within 24 hours on business days. For urgent questions, Telegram is the best option.',
      },
      {
        q: 'Can I call you?',
        a: 'Yes, you can call the number listed or request a callback through messengers.',
      },
      {
        q: 'What languages do you speak?',
        a: 'We speak Russian, English, and Vietnamese.',
      },
    ],
  },
  vi: {
    title: 'Liên hệ',
    subtitle: 'Liên hệ với chúng tôi',
    backHome: 'Về trang chủ',
    // Contact info
    address: 'Địa chỉ',
    addressValue: 'Nha Trang, Việt Nam',
    phone: 'Điện thoại',
    phoneValue: '+84 xxx xxx xxx',
    email: 'Email',
    emailValue: 'info@nhatranglife.com',
    workHours: 'Giờ làm việc',
    workHoursValue: 'Thứ 2 - Thứ 7: 9:00 - 18:00',
    // Messengers
    messengers: 'Tin nhắn',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    // Form
    formTitle: 'Viết cho chúng tôi',
    formSubtitle: 'Chúng tôi sẽ phản hồi trong vòng 24 giờ',
    name: 'Tên của bạn',
    namePlaceholder: 'Nguyễn Văn A',
    emailLabel: 'Email',
    emailPlaceholder: 'email@example.com',
    subject: 'Chủ đề',
    subjectPlaceholder: 'Chọn chủ đề',
    subjects: {
      visa: 'Câu hỏi về visa',
      rent: 'Thuê căn hộ',
      other: 'Khác',
    },
    message: 'Tin nhắn',
    messagePlaceholder: 'Mô tả câu hỏi của bạn...',
    send: 'Gửi',
    sending: 'Đang gửi...',
    success: 'Tin nhắn đã được gửi! Chúng tôi sẽ liên hệ với bạn sớm.',
    // FAQ
    faqTitle: 'Câu hỏi thường gặp',
    faq: [
      {
        q: 'Bạn phản hồi nhanh như thế nào?',
        a: 'Chúng tôi cố gắng phản hồi trong vòng 24 giờ vào các ngày làm việc. Đối với các câu hỏi khẩn cấp, Telegram là lựa chọn tốt nhất.',
      },
      {
        q: 'Tôi có thể gọi điện không?',
        a: 'Có, bạn có thể gọi theo số điện thoại được liệt kê hoặc yêu cầu gọi lại qua tin nhắn.',
      },
      {
        q: 'Bạn nói những ngôn ngữ nào?',
        a: 'Chúng tôi nói tiếng Nga, tiếng Anh và tiếng Việt.',
      },
    ],
  },
}

export default function ContactsPage() {
  const { locale } = useLocale()
  const t = content[locale] || content.ru

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500))

    setLoading(false)
    setSuccess(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 mb-6 transition"
            >
              ← {t.backHome}
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{t.address}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{t.addressValue}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{t.phone}</h3>
                      <a href="tel:+84xxxxxxxxx" className="text-teal-600 dark:text-teal-400 hover:underline text-sm">
                        {t.phoneValue}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{t.email}</h3>
                      <a href="mailto:info@nhatranglife.com" className="text-teal-600 dark:text-teal-400 hover:underline text-sm">
                        {t.emailValue}
                      </a>
                    </div>
                  </div>

                  {/* Work Hours */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{t.workHours}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{t.workHoursValue}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messengers */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.messengers}</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://t.me/nhatranglife"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#0088cc] text-white rounded-full hover:bg-[#0077b5] transition"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    {t.telegram}
                  </a>
                  <a
                    href="https://wa.me/84xxxxxxxxx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-full hover:bg-[#20bd5a] transition"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {t.whatsapp}
                  </a>
                  <a
                    href="https://zalo.me/84xxxxxxxxx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#0068FF] text-white rounded-full hover:bg-[#0055cc] transition"
                  >
                    <span className="font-bold text-sm">Zalo</span>
                  </a>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.faqTitle}</h3>
                <div className="space-y-4">
                  {t.faq.map((item, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.q}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm h-fit">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t.formTitle}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                {t.formSubtitle}
              </p>

              {success && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl text-sm">
                  {t.success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.name} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.namePlaceholder}
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.emailLabel} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.emailPlaceholder}
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.subject} *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  >
                    <option value="">{t.subjectPlaceholder}</option>
                    <option value="visa">{t.subjects.visa}</option>
                    <option value="rent">{t.subjects.rent}</option>
                    <option value="other">{t.subjects.other}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.message} *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.messagePlaceholder}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? t.sending : t.send}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
