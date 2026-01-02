'use client'

import { useState } from 'react'

const statusLabels = {
  new: { label: 'Новая', color: 'green' },
  contacted: { label: 'Связались', color: 'yellow' },
  completed: { label: 'Завершена', color: 'gray' },
  cancelled: { label: 'Отменена', color: 'red' },
}

const initialRequests = [
  { id: '1', name: 'Иван Петров', phone: '+7 999 123-45-67', messenger: 'telegram', visaType: 'E-Visa 90 дней', status: 'new', createdAt: '2025-01-03 10:30' },
  { id: '2', name: 'Анна Сидорова', phone: '+7 916 987-65-43', messenger: 'whatsapp', visaType: 'Виза по прилёту', status: 'new', createdAt: '2025-01-03 09:15' },
  { id: '3', name: 'Михаил Козлов', phone: '+7 903 555-12-34', messenger: 'telegram', visaType: 'Продление визы', status: 'contacted', createdAt: '2025-01-02 18:00' },
  { id: '4', name: 'Елена Новикова', phone: '+7 925 111-22-33', messenger: 'whatsapp', visaType: 'E-Visa 90 дней', status: 'completed', createdAt: '2025-01-01 14:20' },
]

export default function RequestsPage() {
  const [requests, setRequests] = useState(initialRequests)
  const [filter, setFilter] = useState('all')

  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter(r => r.status === filter)

  const updateStatus = (id: string, newStatus: string) => {
    setRequests(requests.map(r =>
      r.id === id ? { ...r, status: newStatus } : r
    ))
  }

  const messengerIcon = (m: string) => {
    switch (m) {
      case 'telegram': return '📱'
      case 'whatsapp': return '💬'
      case 'zalo': return '📞'
      default: return '📧'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Заявки</h1>
        <p className="text-gray-500">Управление заявками на визы</p>
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
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredRequests.map((req) => {
              const status = statusLabels[req.status as keyof typeof statusLabels]
              return (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{req.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span>{messengerIcon(req.messenger)}</span>
                      <span className="text-gray-600">{req.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{req.visaType}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{req.createdAt}</td>
                  <td className="px-6 py-4">
                    <select
                      value={req.status}
                      onChange={(e) => updateStatus(req.id, e.target.value)}
                      className={`px-3 py-1.5 text-sm rounded-lg border-0 ${
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
                </tr>
              )
            })}
          </tbody>
        </table>

        {filteredRequests.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            Нет заявок с таким статусом
          </div>
        )}
      </div>
    </div>
  )
}
