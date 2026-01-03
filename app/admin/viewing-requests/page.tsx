'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ViewingRequest {
  id: string
  name: string
  phone: string
  messenger: string
  type: string
  date: string | null
  comment: string | null
  status: string
  createdAt: string
  apartment: {
    id: string
    titleRu: string
  }
}

const statusLabels: Record<string, { label: string; color: string }> = {
  new: { label: 'Новая', color: 'bg-blue-100 text-blue-700' },
  contacted: { label: 'Связались', color: 'bg-yellow-100 text-yellow-700' },
  completed: { label: 'Завершена', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Отменена', color: 'bg-red-100 text-red-700' },
}

const typeLabels: Record<string, string> = {
  viewing: '🏠 Просмотр',
  video_call: '🎥 Видео-звонок',
}

const messengerIcons: Record<string, string> = {
  whatsapp: '💬 WhatsApp',
  telegram: '📱 Telegram',
  zalo: '📞 Zalo',
}

export default function ViewingRequestsPage() {
  const [requests, setRequests] = useState<ViewingRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/admin/viewing-requests')
      if (res.ok) {
        const data = await res.json()
        setRequests(data)
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/viewing-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (res.ok) {
        setRequests(requests.map(r =>
          r.id === id ? { ...r, status } : r
        ))
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const deleteRequest = async (id: string) => {
    if (!confirm('Удалить эту заявку?')) return

    try {
      const res = await fetch(`/api/admin/viewing-requests/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setRequests(requests.filter(r => r.id !== id))
      }
    } catch (error) {
      console.error('Error deleting request:', error)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredRequests = requests
    .filter(r => filter === 'all' || r.status === filter)
    .filter(r => typeFilter === 'all' || r.type === typeFilter)

  const newCount = requests.filter(r => r.status === 'new').length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Заявки на аренду</h1>
          <p className="text-gray-500">
            Всего заявок: {requests.length}
            {newCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-sm rounded-full">
                {newCount} новых
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Status filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Все ({requests.length})
          </button>
          {Object.entries(statusLabels).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                filter === key ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label} ({requests.filter(r => r.status === key).length})
            </button>
          ))}
        </div>

        {/* Type filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
              typeFilter === 'all' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Все типы
          </button>
          <button
            onClick={() => setTypeFilter('viewing')}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
              typeFilter === 'viewing' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            🏠 Просмотр
          </button>
          <button
            onClick={() => setTypeFilter('video_call')}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
              typeFilter === 'video_call' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            🎥 Видео
          </button>
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <span className="text-5xl block mb-4">🔑</span>
          <p className="text-gray-600 text-lg">
            {filter === 'all' && typeFilter === 'all' ? 'Заявок пока нет' : 'Нет заявок с выбранными фильтрами'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Клиент</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Квартира</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Тип</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Дата</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Статус</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredRequests.map((request) => (
                <tr key={request.id} className={`hover:bg-gray-50 ${request.status === 'new' ? 'bg-blue-50/50' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{request.name}</div>
                    <div className="text-sm text-gray-500">{request.phone}</div>
                    <div className="text-xs text-gray-400">
                      {messengerIcons[request.messenger] || request.messenger}
                    </div>
                    {request.comment && (
                      <div className="mt-2 text-xs text-gray-500 bg-gray-100 rounded-lg p-2 max-w-xs">
                        {request.comment}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/apartments/${request.apartment?.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      {request.apartment?.titleRu || '—'}
                    </Link>
                    <div className="mt-1">
                      <Link
                        href={`/rent/apartments/${request.apartment?.id}`}
                        target="_blank"
                        className="text-xs text-gray-400 hover:text-gray-600"
                      >
                        Открыть на сайте ↗
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-lg ${
                      request.type === 'viewing'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-cyan-100 text-cyan-700'
                    }`}>
                      {typeLabels[request.type] || request.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {request.date && (
                      <div className="text-gray-900 font-medium">
                        {new Date(request.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                        })}
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                      Создана: {formatDate(request.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={request.status}
                      onChange={(e) => updateStatus(request.id, e.target.value)}
                      className={`px-3 py-1.5 text-sm rounded-lg border-0 cursor-pointer font-medium ${
                        statusLabels[request.status]?.color || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <option value="new">Новая</option>
                      <option value="contacted">Связались</option>
                      <option value="completed">Завершена</option>
                      <option value="cancelled">Отменена</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteRequest(request.id)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
