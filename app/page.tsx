export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Виза во Вьетнам
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Полное руководство для граждан России
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <section className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
            <span className="text-3xl">🛂</span> Нужна ли виза?
          </h2>
          <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
            <p className="text-lg font-semibold text-teal-800">
              Для граждан РФ виза НЕ нужна при въезде до 45 дней
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <p className="flex items-start gap-2">
              <span className="text-teal-500 mt-1">✓</span>
              <span>Загранпаспорт должен быть действителен минимум <strong>6 месяцев</strong> с даты въезда</span>
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
            <span className="text-3xl">✈️</span> Безвизовый въезд
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Срок пребывания</h3>
              <p className="text-2xl font-bold text-cyan-600">45 дней</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Продление</h3>
              <p className="text-2xl font-bold text-teal-600">+45 дней</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-3">Что нужно:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm">1</span>
                <span>Загранпаспорт (действителен 6+ месяцев)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm">2</span>
                <span>Обратный билет или билет в другую страну</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800">
              <strong>💡 Совет:</strong> Можно продлить на 45 дней, находясь во Вьетнаме
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
            <span className="text-3xl">💻</span> E-Visa (электронная виза)
          </h2>
          <p className="text-gray-600 mb-4">
            Для пребывания более 45 дней или многократных въездов
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Срок пребывания</p>
              <p className="text-xl font-bold text-cyan-700">до 90 дней</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Стоимость</p>
              <p className="text-xl font-bold text-cyan-700">~$25</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Оформление</p>
              <p className="text-xl font-bold text-cyan-700">3-5 дней</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">📋 Как оформить E-Visa:</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                <span>Зайдите на официальный сайт <a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline font-medium">evisa.xuatnhapcanh.gov.vn</a></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                <span>Заполните анкету на английском языке</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                <span>Загрузите фото (4x6 см) и скан загранпаспорта</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
                <span>Оплатите визовый сбор картой (~$25)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</span>
                <span>Получите E-Visa на email через 3-5 рабочих дней</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">6</span>
                <span>Распечатайте и возьмите с собой в аэропорт</span>
              </li>
            </ol>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
            <span className="text-3xl">🛬</span> Виза по прилёту (Visa on Arrival)
          </h2>
          <p className="text-gray-600 mb-4">
            Альтернативный способ получения визы прямо в аэропорту
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">📧</span>
              <div>
                <h3 className="font-semibold text-gray-800">Пригласительное письмо</h3>
                <p className="text-gray-600">Заранее оформите через агентство — <strong>$20-30</strong></p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">💵</span>
              <div>
                <h3 className="font-semibold text-gray-800">Сбор в аэропорту</h3>
                <p className="text-gray-600">Оплата наличными по прилёту — <strong>$25-50</strong></p>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>ℹ️ Важно:</strong> Этот способ занимает больше времени в аэропорту. E-Visa быстрее и удобнее.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
            <span className="text-3xl">🔗</span> Полезные ссылки
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://evisa.xuatnhapcanh.gov.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all"
            >
              <h3 className="font-bold text-lg">🌐 E-Visa Вьетнам</h3>
              <p className="text-sm opacity-90">Официальный сайт электронных виз</p>
            </a>
            <a
              href="https://www.timaticweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all"
            >
              <h3 className="font-bold text-lg">📋 Timatic</h3>
              <p className="text-sm opacity-90">Проверка визовых требований</p>
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm">
            Информация актуальна на 2024-2025 год. Рекомендуем проверять требования перед поездкой.
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Нячанг, Вьетнам
          </p>
        </div>
      </footer>
    </div>
  );
}
