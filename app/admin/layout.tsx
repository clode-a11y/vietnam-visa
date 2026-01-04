'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/visa-types', label: 'Типы виз', icon: '📋' },
  { href: '/admin/apartments', label: 'Квартиры', icon: '🏠' },
  { href: '/admin/districts', label: 'Районы', icon: '📍' },
  { href: '/admin/amenities', label: 'Удобства', icon: '✨' },
  { href: '/admin/viewing-requests', label: 'Заявки аренды', icon: '🔑' },
  { href: '/admin/faq', label: 'FAQ', icon: '❓' },
  { href: '/admin/blog', label: 'Блог', icon: '📝' },
  { href: '/admin/requests', label: 'Заявки виз', icon: '📩' },
  { href: '/admin/settings', label: 'Настройки', icon: '⚙️' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <Link href="/admin" className="flex items-center gap-2 text-xl font-bold">
            <span>🇻🇳</span>
            <span>VietVisa</span>
            <span className="text-xs text-gray-400">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(item.href))

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive
                        ? 'bg-teal-50 text-teal-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"
          >
            <span className="text-xl">🌐</span>
            <span>На сайт</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Панель управления</h1>

          <div className="flex items-center gap-4">
            {session?.user && (
              <>
                <span className="text-sm text-gray-600">
                  {session.user.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Выйти
                </button>
              </>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
