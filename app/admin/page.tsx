import Link from 'next/link'

const stats = [
  { label: 'Новых заявок', value: '12', change: '+3 сегодня', color: 'green' },
  { label: 'Типов виз', value: '4', change: 'активных', color: 'blue' },
  { label: 'FAQ вопросов', value: '15', change: 'опубликовано', color: 'purple' },
  { label: 'Посещений', value: '1.2K', change: 'за неделю', color: 'orange' },
]

const quickActions = [
  { label: 'Добавить тип визы', href: '/admin/visa-types/new', icon: '➕' },
  { label: 'Новый FAQ', href: '/admin/faq/new', icon: '❓' },
  { label: 'Просмотреть заявки', href: '/admin/requests', icon: '📩' },
]

const recentRequests = [
  { id: 1, name: 'Иван Петров', type: 'E-Visa 90 дней', time: '5 мин назад', status: 'new' },
  { id: 2, name: 'Анна Сидорова', type: 'Виза по прилёту', time: '1 час назад', status: 'new' },
  { id: 3, name: 'Михаил Козлов', type: 'Продление визы', time: '3 часа назад', status: 'contacted' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className={`text-sm text-${stat.color}-600 mt-1`}>{stat.change}</p>
          </div>
        ))}
      </div>

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
            {recentRequests.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-medium">{req.name}</p>
                  <p className="text-sm text-gray-500">{req.type}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    req.status === 'new'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {req.status === 'new' ? 'Новая' : 'В работе'}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">{req.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Добро пожаловать в админ-панель VietVisa!</h3>
        <p className="opacity-90">
          Здесь вы можете управлять типами виз, FAQ, просматривать заявки и настраивать сайт.
        </p>
      </div>
    </div>
  )
}
