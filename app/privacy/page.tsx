import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | VietVisa',
  description: 'Политика конфиденциальности сайта VietVisa. Информация о сборе и обработке персональных данных.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-orange-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-8">
          ← На главную
        </Link>

        <h1 className="text-4xl font-black text-gray-900 mb-8">Политика конфиденциальности</h1>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6 text-gray-700 leading-relaxed">
          <p className="text-sm text-gray-500">Последнее обновление: Январь 2025</p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты
              персональных данных пользователей сайта VietVisa (далее — «Сайт»).
            </p>
            <p className="mt-2">
              Используя Сайт, вы соглашаетесь с условиями данной Политики конфиденциальности.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Какие данные мы собираем</h2>
            <p>При использовании Сайта мы можем собирать следующие данные:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Имя и контактные данные (телефон, email)</li>
              <li>Предпочтительный способ связи (Telegram, WhatsApp, Zalo)</li>
              <li>Информация о запрашиваемом типе визы</li>
              <li>Сообщения, отправленные через форму обратной связи</li>
              <li>Техническая информация (IP-адрес, тип браузера, время посещения)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Цели сбора данных</h2>
            <p>Мы используем ваши данные для:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Обработки заявок на консультацию по визам</li>
              <li>Связи с вами по указанным контактным данным</li>
              <li>Улучшения качества наших услуг</li>
              <li>Анализа использования Сайта</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Защита данных</h2>
            <p>
              Мы принимаем все необходимые технические и организационные меры для защиты
              ваших персональных данных от несанкционированного доступа, изменения,
              раскрытия или уничтожения.
            </p>
            <p className="mt-2">
              Данные хранятся на защищённых серверах и передаются по зашифрованным каналам (HTTPS).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Передача данных третьим лицам</h2>
            <p>
              Мы не продаём и не передаём ваши персональные данные третьим лицам,
              за исключением случаев, предусмотренных законодательством.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies</h2>
            <p>
              Сайт может использовать cookies для улучшения пользовательского опыта
              и сбора статистики посещений. Вы можете отключить cookies в настройках
              вашего браузера.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Ваши права</h2>
            <p>Вы имеете право:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Запросить информацию о ваших данных, которые мы храним</li>
              <li>Потребовать исправления неточных данных</li>
              <li>Потребовать удаления ваших данных</li>
              <li>Отозвать согласие на обработку данных</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Изменения политики</h2>
            <p>
              Мы оставляем за собой право вносить изменения в настоящую Политику
              конфиденциальности. Актуальная версия всегда доступна на этой странице.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Контакты</h2>
            <p>
              По вопросам, связанным с обработкой персональных данных, вы можете
              связаться с нами через форму на сайте или по контактам, указанным
              на главной странице.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg transition"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  )
}
