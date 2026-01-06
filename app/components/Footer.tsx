'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n/context'

export default function Footer() {
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
