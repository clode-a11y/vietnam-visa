'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Stats {
  requests: {
    total: number
    new: number
    today: number
    week: number
    byStatus: Record<string, number>
  }
  visaTypes: {
    total: number
    active: number
  }
  faqs: {
    total: number
    active: number
  }
  recentRequests: Array<{
    id: string
    name: string
    visaType: string
    status: string
    createdAt: string
  }>
  viewingRequests: {
    total: number
    new: number
    today: number
    week: number
    byStatus: Record<string, number>
    byType: Record<string, number>
  }
  recentViewingRequests: Array<{
    id: string
    name: string
    type: string
    status: string
    apartmentTitle: string
    createdAt: string
  }>
  apartments: {
    total: number
    available: number
  }
}

const quickActions = [
  { label: 'Заявки на аренду', href: '/admin/viewing-requests', icon: '🔑' },
  { label: 'Добавить квартиру', href: '/admin/apartments/new', icon: '🏠' },
  { label: 'Заявки на визы', href: '/admin/requests', icon: '📩' },
  { label: 'Добавить тип визы', href: '/admin/visa-types/new', icon: '➕' },
]

const typeLabels: Record<string, string> = {
  viewing: '🏠 Просмотр',
  video_call: '🎥 Видео',
}

const statusLabels: Record<string, string> = {
  new: 'Новая',
  contacted: 'В работе',
  completed: 'Завершена',
  cancelled: 'Отменена',
}

const statusColors: Record<string, string> = {
  new: 'bg-green-100 text-green-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-700',
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'только что'
  if (minutes < 60) return `${minutes} мин назад`
  if (hours < 24) return `${hours} ч назад`
  return `${days} дн назад`
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  const statCards = [
    {
      label: 'Заявки аренда',
      value: stats?.viewingRequests.new || 0,
      change: `+${stats?.viewingRequests.today || 0} сегодня`,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      icon: '🔑',
      href: '/admin/viewing-requests',
    },
    {
      label: 'Квартиры',
      value: stats?.apartments.available || 0,
      change: `из ${stats?.apartments.total || 0} всего`,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      icon: '🏠',
      href: '/admin/apartments',
    },
    {
      label: 'Заявки визы',
      value: stats?.requests.new || 0,
      change: `+${stats?.requests.today || 0} сегодня`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: '📩',
      href: '/admin/requests',
    },
    {
      label: 'Типы виз',
      value: stats?.visaTypes.active || 0,
      change: `из ${stats?.visaTypes.total || 0} всего`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: '🛂',
      href: '/admin/visa-types',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Link key={i} href={stat.href} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition block">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.color} mt-1`}>{stat.change}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Viewing requests status breakdown */}
      {stats?.viewingRequests.total && stats.viewingRequests.total > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Заявки на аренду</h2>
            <span className="text-sm text-gray-500">Всего: {stats.viewingRequests.total}</span>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-3 flex-wrap">
              {Object.entries(stats.viewingRequests.byStatus).map(([status, count]) => (
                <div key={status} className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[status] || 'bg-gray-100'}`}>
                    {statusLabels[status] || status}
                  </span>
                  <span className="font-bold text-gray-700">{count}</span>
                </div>
              ))}
            </div>
            <div className="border-l pl-6 flex gap-3">
              {Object.entries(stats.viewingRequests.byType).map(([type, count]) => (
                <div key={type} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{typeLabels[type] || type}</span>
                  <span className="font-bold text-gray-700">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Visa requests status breakdown */}
      {stats?.requests.total && stats.requests.total > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Заявки на визы</h2>
            <span className="text-sm text-gray-500">Всего: {stats.requests.total}</span>
          </div>
          <div className="flex gap-4 flex-wrap">
            {Object.entries(stats.requests.byStatus).map(([status, count]) => (
              <div key={status} className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[status] || 'bg-gray-100'}`}>
                  {statusLabels[status] || status}
                </span>
                <span className="font-bold text-gray-700">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Viewing Requests */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Заявки на аренду</h2>
            <Link href="/admin/viewing-requests" className="text-teal-600 text-sm hover:underline">
              Все →
            </Link>
          </div>
          <div className="space-y-3">
            {stats?.recentViewingRequests && stats.recentViewingRequests.length > 0 ? (
              stats.recentViewingRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{req.name}</p>
                    <p className="text-sm text-gray-500 truncate">{req.apartmentTitle}</p>
                  </div>
                  <div className="text-right ml-3 flex-shrink-0">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${statusColors[req.status] || 'bg-gray-100'}`}>
                      {statusLabels[req.status] || req.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{timeAgo(req.createdAt)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-4xl mb-2">🔑</p>
                <p>Заявок пока нет</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Visa Requests */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Заявки на визы</h2>
            <Link href="/admin/requests" className="text-green-600 text-sm hover:underline">
              Все →
            </Link>
          </div>
          <div className="space-y-3">
            {stats?.recentRequests && stats.recentRequests.length > 0 ? (
              stats.recentRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{req.name}</p>
                    <p className="text-sm text-gray-500 truncate">{req.visaType || 'Не указан'}</p>
                  </div>
                  <div className="text-right ml-3 flex-shrink-0">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${statusColors[req.status] || 'bg-gray-100'}`}>
                      {statusLabels[req.status] || req.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{timeAgo(req.createdAt)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-4xl mb-2">📭</p>
                <p>Заявок пока нет</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-teal-50 hover:text-teal-700 transition"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="font-medium text-sm">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">VietVisa Admin Panel</h3>
        <p className="opacity-90">
          Управляйте типами виз, FAQ, просматривайте заявки и настраивайте сайт.
        </p>
      </div>
    </div>
  )
}
