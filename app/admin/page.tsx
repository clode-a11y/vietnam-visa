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
}

const quickActions = [
  { label: 'Добавить тип визы', href: '/admin/visa-types/new', icon: '➕' },
  { label: 'Новый FAQ', href: '/admin/faq/new', icon: '❓' },
  { label: 'Просмотреть заявки', href: '/admin/requests', icon: '📩' },
]

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
      label: 'Новых заявок',
      value: stats?.requests.new || 0,
      change: `+${stats?.requests.today || 0} сегодня`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: '📩'
    },
    {
      label: 'Всего заявок',
      value: stats?.requests.total || 0,
      change: `${stats?.requests.week || 0} за неделю`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: '📊'
    },
    {
      label: 'Типов виз',
      value: stats?.visaTypes.active || 0,
      change: `из ${stats?.visaTypes.total || 0} всего`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: '🛂'
    },
    {
      label: 'FAQ вопросов',
      value: stats?.faqs.active || 0,
      change: `из ${stats?.faqs.total || 0} всего`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      icon: '❓'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
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
          </div>
        ))}
      </div>

      {/* Status breakdown */}
      {stats?.requests.total && stats.requests.total > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Заявки по статусам</h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Быстрые действия</h2>
          <div className="space-y-3">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-green-700 transition"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-2xl p-6 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Последние заявки</h2>
            <Link href="/admin/requests" className="text-green-600 text-sm hover:underline">
              Все заявки →
            </Link>
          </div>
          <div className="space-y-3">
            {stats?.recentRequests && stats.recentRequests.length > 0 ? (
              stats.recentRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div>
                    <p className="font-medium">{req.name}</p>
                    <p className="text-sm text-gray-500">{req.visaType || 'Не указан'}</p>
                  </div>
                  <div className="text-right">
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
