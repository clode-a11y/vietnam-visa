'use client'

import { useState, useEffect } from 'react'

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
  viewing: '📅 Просмотр',
  video_call: '🎥 Видео-звонок',
}

export default function ViewingRequestsPage() {
  const [requests, setRequests] = useState<ViewingRequest[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Заявки на просмотр</h1>

      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center">
          <span className="text-4xl block mb-4">🔑</span>
          <p className="text-gray-600">Заявок пока нет</p>
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
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{request.name}</div>
                    <div className="text-sm text-gray-500">{request.phone}</div>
                    <div className="text-xs text-gray-400">{request.messenger}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {request.apartment?.titleRu || '—'}
                  </td>
                  <td className="px-6 py-4">
                    {typeLabels[request.type] || request.type}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {request.date
                      ? new Date(request.date).toLocaleDateString('ru')
                      : '—'}
                    <div className="text-xs text-gray-400">
                      Создана: {new Date(request.createdAt).toLocaleDateString('ru')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusLabels[request.status]?.color || 'bg-gray-100 text-gray-700'}`}>
                      {statusLabels[request.status]?.label || request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select
                      value={request.status}
                      onChange={(e) => updateStatus(request.id, e.target.value)}
                      className="px-2 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">Новая</option>
                      <option value="contacted">Связались</option>
                      <option value="completed">Завершена</option>
                      <option value="cancelled">Отменена</option>
                    </select>
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
