'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/lib/i18n/context'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribeStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubscribeStatus('success')
        setEmail('')
      } else {
        setSubscribeStatus('error')
      }
    } catch {
      setSubscribeStatus('error')
    }
  }
  const { locale } = useLocale()

  const labels = {
    ru: {
      brand: 'VietVisa',
      tagline: 'Всё для жизни во Вьетнаме',
      sections: 'Разделы',
      visa: 'Визы',
      rent: 'Аренда',
      blog: 'Блог',
      useful: 'Полезное',
      contacts: 'Контакты',
      about: 'О нас',
      evisa: 'Сайт e-Visa',
      cities: 'Города',
      nhatrang: 'Нячанг',
      hcmc: 'Хошимин',
      hanoi: 'Ханой',
      phuquoc: 'Фукуок',
      copyright: '© 2025 VietVisa',
      privacy: 'Конфиденциальность',
      terms: 'Условия',
      admin: 'Админ',
      newsletter: 'Подписка на новости',
      newsletterDesc: 'Получайте уведомления об изменениях визовых правил',
      emailPlaceholder: 'Ваш email',
      subscribe: 'OK',
      subscribed: 'Вы подписаны!',
    },
    en: {
      brand: 'VietVisa',
      tagline: 'Everything for living in Vietnam',
      sections: 'Sections',
      visa: 'Visas',
      rent: 'Rentals',
      blog: 'Blog',
      useful: 'Useful',
      contacts: 'Contacts',
      about: 'About Us',
      evisa: 'e-Visa Website',
      cities: 'Cities',
      nhatrang: 'Nha Trang',
      hcmc: 'Ho Chi Minh',
      hanoi: 'Hanoi',
      phuquoc: 'Phu Quoc',
      copyright: '© 2025 VietVisa',
      privacy: 'Privacy',
      terms: 'Terms',
      admin: 'Admin',
      newsletter: 'Newsletter',
      newsletterDesc: 'Get notified about visa rule changes',
      emailPlaceholder: 'Your email',
      subscribe: 'OK',
      subscribed: 'Subscribed!',
    },
    vi: {
      brand: 'VietVisa',
      tagline: 'Tất cả cho cuộc sống tại Việt Nam',
      sections: 'Mục',
      visa: 'Visa',
      rent: 'Thuê nhà',
      blog: 'Blog',
      useful: 'Hữu ích',
      contacts: 'Liên hệ',
      about: 'Về chúng tôi',
      evisa: 'Trang e-Visa',
      cities: 'Thành phố',
      nhatrang: 'Nha Trang',
      hcmc: 'TP. Hồ Chí Minh',
      hanoi: 'Hà Nội',
      phuquoc: 'Phú Quốc',
      copyright: '© 2025 VietVisa',
      privacy: 'Bảo mật',
      terms: 'Điều khoản',
      admin: 'Quản trị',
      newsletter: 'Đăng ký nhận tin',
      newsletterDesc: 'Nhận thông báo về thay đổi quy định visa',
      emailPlaceholder: 'Email của bạn',
      subscribe: 'OK',
      subscribed: 'Đã đăng ký!',
    },
  }

  const t = labels[locale as keyof typeof labels] || labels.ru

  return (
    <footer className="py-12 px-6 border-t border-black/5 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white">
            <span>🇻🇳</span> {t.brand}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{t.tagline}. 2025</p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-gray-800 dark:text-white">{t.sections}</h4>
          <div className="space-y-2">
            <Link href="/visa" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
              {t.visa}
            </Link>
            <Link href="/rent" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
              {t.rent}
            </Link>
            <Link href="/blog" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
              {t.blog}
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-gray-800 dark:text-white">{t.useful}</h4>
          <div className="space-y-2">
            <Link href="/contacts" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
              {t.contacts}
            </Link>
            <Link href="/about" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
              {t.about}
            </Link>
            <a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
              {t.evisa}
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-gray-800 dark:text-white">{t.cities}</h4>
          <div className="space-y-2">
            <span className="block text-gray-600 dark:text-gray-400 text-sm">{t.nhatrang}</span>
            <span className="block text-gray-600 dark:text-gray-400 text-sm">{t.hcmc}</span>
            <span className="block text-gray-600 dark:text-gray-400 text-sm">{t.hanoi}</span>
            <span className="block text-gray-600 dark:text-gray-400 text-sm">{t.phuquoc}</span>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-5xl mx-auto py-8 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-gray-800 dark:text-white">{t.newsletter}</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{t.newsletterDesc}</p>
          </div>
          {subscribeStatus === 'success' ? (
            <p className="text-teal-600 dark:text-teal-400 font-medium">{t.subscribed}</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                required
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm w-48"
              />
              <button
                type="submit"
                disabled={subscribeStatus === 'loading'}
                className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 transition text-sm"
              >
                {subscribeStatus === 'loading' ? '...' : t.subscribe}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm">{t.copyright}</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm">
            {t.privacy}
          </Link>
          <Link href="/terms" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm">
            {t.terms}
          </Link>
          <Link href="/admin" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm">
            {t.admin}
          </Link>
        </div>
      </div>
    </footer>
  )
}
