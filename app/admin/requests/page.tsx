'use client'

import { useState, useEffect } from 'react'

interface ContactRequest {
  id: string
  name: string
  phone: string
  email: string | null
  messenger: string
  visaType: string
  message: string | null
  status: string
  createdAt: string
}

const statusLabels: Record<string, { label: string; color: string }> = {
  new: { label: 'Новая', color: 'green' },
  contacted: { label: 'Связались', color: 'yellow' },
  completed: { label: 'Завершена', color: 'gray' },
  cancelled: { label: 'Отменена', color: 'red' },
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/requests')
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

  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter(r => r.status === filter)

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setRequests(requests.map(r =>
          r.id === id ? { ...r, status: newStatus } : r
        ))
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const deleteRequest = async (id: string) => {
    if (!confirm('Удалить эту заявку?')) return

    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setRequests(requests.filter(r => r.id !== id))
      }
    } catch (error) {
      console.error('Error deleting request:', error)
    }
  }

  const messengerIcon = (m: string) => {
    switch (m) {
      case 'telegram': return '📱'
      case 'whatsapp': return '💬'
      case 'zalo': return '📞'
      default: return '📧'
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Заявки</h1>
        <p className="text-gray-500">Управление заявками на визы ({requests.length})</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            filter === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Все ({requests.length})
        </button>
        {Object.entries(statusLabels).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === key ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {label} ({requests.filter(r => r.status === key).length})
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Клиент</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Контакт</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Тип визы</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Дата</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Статус</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  {filter === 'all' ? 'Нет заявок' : 'Нет заявок с таким статусом'}
                </td>
              </tr>
            ) : (
              filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{req.name}</p>
                    {req.message && (
                      <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">{req.message}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span>{messengerIcon(req.messenger)}</span>
                      <span className="text-gray-600">{req.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{req.visaType}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{formatDate(req.createdAt)}</td>
                  <td className="px-6 py-4">
                    <select
                      value={req.status}
                      onChange={(e) => updateStatus(req.id, e.target.value)}
                      className={`px-3 py-1.5 text-sm rounded-lg border-0 cursor-pointer ${
                        req.status === 'new' ? 'bg-green-100 text-green-700' :
                        req.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                        req.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                        'bg-red-100 text-red-700'
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
                      onClick={() => deleteRequest(req.id)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
