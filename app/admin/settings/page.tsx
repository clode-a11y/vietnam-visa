'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 500))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-500">Общие настройки сайта</p>
      </div>

      {saved && (
        <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl">
          Настройки сохранены!
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold border-b pb-3">Контактные данные</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telegram
          </label>
          <input
            type="text"
            defaultValue="@vietvisa"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp
          </label>
          <input
            type="text"
            defaultValue="+84 xxx xxx xxx"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            defaultValue="info@vietvisa.com"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold border-b pb-3">SEO</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Заголовок сайта
          </label>
          <input
            type="text"
            defaultValue="Виза во Вьетнам 2025 | VietVisa"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Описание (meta description)
          </label>
          <textarea
            rows={3}
            defaultValue="Полный гайд по визам во Вьетнам для россиян. Безвизовый въезд, электронная виза, виза по прилёту."
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-bold border-b pb-3">Уведомления</h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
          <div>
            <p className="font-medium">Telegram уведомления</p>
            <p className="text-sm text-gray-500">Получать уведомления о новых заявках в Telegram</p>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
          <div>
            <p className="font-medium">Email уведомления</p>
            <p className="text-sm text-gray-500">Получать уведомления о новых заявках на email</p>
          </div>
        </label>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition disabled:opacity-50"
      >
        {saving ? 'Сохранение...' : 'Сохранить настройки'}
      </button>
    </div>
  )
}
