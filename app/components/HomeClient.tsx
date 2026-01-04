'use client'

import { useEffect, useState } from 'react'

interface VisaType {
  id: string
  nameRu: string
  icon: string
  duration: string
  description: string
  price: number
  isPopular: boolean
}

interface FAQ {
  id: string
  question: string
  answer: string
}

interface HomeClientProps {
  visaTypes: VisaType[]
  faqs: FAQ[]
}

export default function HomeClient({ visaTypes, faqs }: HomeClientProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    messenger: 'telegram',
    visaType: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('loading')

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', phone: '', messenger: 'telegram', visaType: '', message: '' })
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    // Header scroll effect
    const handleScroll = () => {
      const header = document.getElementById('header')
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50)
      }
    }
    window.addEventListener('scroll', handleScroll)

    // Set default dates
    const today = new Date()
    const twoWeeks = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
    const arrivalInput = document.getElementById('arrival') as HTMLInputElement
    const departureInput = document.getElementById('departure') as HTMLInputElement
    if (arrivalInput) arrivalInput.valueAsDate = today
    if (departureInput) departureInput.valueAsDate = twoWeeks

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const calculateVisa = () => {
    const arrival = new Date((document.getElementById('arrival') as HTMLInputElement).value)
    const departure = new Date((document.getElementById('departure') as HTMLInputElement).value)
    const purpose = (document.getElementById('purpose') as HTMLSelectElement).value
    const entries = (document.getElementById('entries') as HTMLSelectElement).value

    const days = Math.ceil((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24))
    if (days <= 0) { alert('Проверьте даты!'); return }

    let emoji, visa, desc, cost, time

    if (purpose === 'tourism' && days <= 45 && entries === 'single') {
      emoji = '🎉'; visa = 'Безвизовый въезд'; desc = 'Виза не требуется!'; cost = '$0'; time = '0 дней'
    } else if (days <= 90) {
      emoji = '💻'; visa = 'Электронная виза'; desc = 'Оформите e-Visa онлайн'; cost = '$25'; time = '3 дня'
    } else {
      emoji = '🏛️'; visa = 'Долгосрочная виза'; desc = 'Обратитесь в посольство'; cost = 'от $50'; time = '14+ дней'
    }

    if (entries === 'multiple') cost = '$50'
    if (purpose === 'work') { visa = 'Рабочая виза'; cost = 'от $100'; time = '14-30 дней' }

    const resultEmoji = document.getElementById('resultEmoji')
    const resultVisa = document.getElementById('resultVisa')
    const resultDesc = document.getElementById('resultDesc')
    const resultDays = document.getElementById('resultDays')
    const resultCost = document.getElementById('resultCost')
    const resultTime = document.getElementById('resultTime')
    const calcResult = document.getElementById('calcResult')

    if (resultEmoji) resultEmoji.textContent = emoji
    if (resultVisa) resultVisa.textContent = visa
    if (resultDesc) resultDesc.textContent = desc
    if (resultDays) resultDays.textContent = String(days)
    if (resultCost) resultCost.textContent = cost
    if (resultTime) resultTime.textContent = time
    if (calcResult) calcResult.classList.add('show')
  }

  const toggleFaq = (e: React.MouseEvent<HTMLButtonElement>) => {
    const item = e.currentTarget.parentElement
    const wasActive = item?.classList.contains('active')
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'))
    if (!wasActive && item) item.classList.add('active')
  }

  return (
    <>
      {/* Features - Visa Types from DB */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-teal-700 uppercase tracking-wider mb-2">Типы виз</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black">Выберите подходящий вариант</h2>
            <p className="reveal reveal-delay-2 text-lg text-gray-600 mt-2">Способы легально находиться во Вьетнаме</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {visaTypes.map((visa, i) => (
              <div key={visa.id} className={`reveal reveal-delay-${(i % 3) + 1} bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border ${visa.isPopular ? 'border-teal-400 ring-2 ring-teal-400/20' : 'border-white/50'} hover:shadow-xl hover:-translate-y-2 transition-all`}>
                {visa.isPopular && (
                  <div className="text-xs font-bold text-teal-600 mb-3">ПОПУЛЯРНО</div>
                )}
                <div className="text-5xl mb-4">{visa.icon}</div>
                <h3 className="text-xl font-bold mb-2">{visa.nameRu}</h3>
                <p className="text-gray-600 mb-4">{visa.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{visa.duration}</span>
                  <span className="font-bold text-teal-600">{visa.price === 0 ? 'Бесплатно' : `$${visa.price}`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Comparison Table */}
      <section id="comparison" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-teal-700 uppercase tracking-wider mb-2">Сравнение</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black">Какая виза вам подходит?</h2>
            <p className="reveal reveal-delay-2 text-lg text-gray-600 mt-2">Детальное сравнение всех вариантов</p>
          </div>

          <div className="reveal reveal-delay-3 bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-500/10 via-teal-400/10 to-teal-300/10">
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Параметр</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-700">Безвизовый</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-700">E-Visa</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-700">По прилёту</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium">Срок пребывания</td>
                    <td className="px-6 py-4 text-center">до 45 дней</td>
                    <td className="px-6 py-4 text-center">до 90 дней</td>
                    <td className="px-6 py-4 text-center">до 30 дней</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium">Стоимость</td>
                    <td className="px-6 py-4 text-center text-teal-600 font-bold">Бесплатно</td>
                    <td className="px-6 py-4 text-center">$25-50</td>
                    <td className="px-6 py-4 text-center">$25-50</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium">Время оформления</td>
                    <td className="px-6 py-4 text-center text-teal-600 font-bold">Сразу</td>
                    <td className="px-6 py-4 text-center">3-5 дней</td>
                    <td className="px-6 py-4 text-center">На месте</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium">Продление</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-red-500">✗</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-teal-500">✓</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-teal-500">✓</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium">Многократный въезд</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-red-500">✗</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-teal-500">✓ ($50)</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-teal-500">✓ ($50)</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium">Пункты въезда</td>
                    <td className="px-6 py-4 text-center">Все</td>
                    <td className="px-6 py-4 text-center">13 аэропортов</td>
                    <td className="px-6 py-4 text-center">Только аэропорты</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium">Приглашение</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-teal-500">Не нужно</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-teal-500">Не нужно</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-orange-500">Нужно</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Document Checklist */}
      <section id="documents" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-teal-700 uppercase tracking-wider mb-2">Документы</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black">Чек-лист документов</h2>
            <p className="reveal reveal-delay-2 text-lg text-gray-600 mt-2">Что нужно подготовить для каждого типа визы</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Visa-free */}
            <div className="reveal reveal-delay-1 bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-2xl">
                  🎉
                </div>
                <div>
                  <h3 className="font-bold text-lg">Безвизовый въезд</h3>
                  <span className="text-sm text-teal-600">до 45 дней</span>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'Загранпаспорт (6+ мес.)',
                  'Обратный билет',
                  'Бронь отеля',
                  'Страховка (рекоменд.)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-teal-100 rounded flex items-center justify-center text-teal-600 text-sm flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* E-Visa */}
            <div className="reveal reveal-delay-2 bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-teal-400 ring-2 ring-teal-400/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-2xl">
                  💻
                </div>
                <div>
                  <h3 className="font-bold text-lg">E-Visa</h3>
                  <span className="text-sm text-teal-600">до 90 дней</span>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'Загранпаспорт (6+ мес.)',
                  'Фото паспорта (скан)',
                  'Фото 4x6 см (цифровое)',
                  'Банковская карта ($25)',
                  'Email для получения',
                  'Даты поездки',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-teal-100 rounded flex items-center justify-center text-teal-600 text-sm flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* VOA */}
            <div className="reveal reveal-delay-3 bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                  ✈️
                </div>
                <div>
                  <h3 className="font-bold text-lg">Виза по прилёту</h3>
                  <span className="text-sm text-orange-600">до 30 дней</span>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'Загранпаспорт (6+ мес.)',
                  'Пригласительное письмо',
                  '2 фото 4x6 см',
                  'Анкета (на месте)',
                  'Сбор $25 наличными',
                  'Штамповый сбор $25',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-orange-100 rounded flex items-center justify-center text-orange-600 text-sm flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-teal-700 uppercase tracking-wider mb-2">Процесс</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black">Как получить e-Visa</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Заполните анкету', desc: 'На сайте evisa.gov.vn' },
              { num: '2', title: 'Загрузите фото', desc: 'Паспорт + фото 4x6' },
              { num: '3', title: 'Оплатите $25', desc: 'Картой онлайн' },
              { num: '4', title: 'Получите на email', desc: 'Через 3 дня' },
            ].map((step, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} text-center`}>
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg">
                  {step.num}
                </div>
                <h4 className="font-bold mb-1">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-teal-700 uppercase tracking-wider mb-2">Калькулятор</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black">Узнайте какая виза нужна</h2>
          </div>

          <div className="reveal reveal-delay-2 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Дата прилёта</label>
                <input type="date" id="arrival" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Дата вылета</label>
                <input type="date" id="departure" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Цель поездки</label>
                <select id="purpose" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none">
                  <option value="tourism">🏖️ Туризм</option>
                  <option value="business">💼 Бизнес</option>
                  <option value="work">👔 Работа</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Въезды</label>
                <select id="entries" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none">
                  <option value="single">Однократный</option>
                  <option value="multiple">Многократный</option>
                </select>
              </div>
            </div>

            <button onClick={calculateVisa} className="w-full py-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 text-white font-bold rounded-xl hover:shadow-lg hover:opacity-90 transition text-lg">
              Рассчитать →
            </button>

            <div className="calc-result" id="calcResult">
              <div className="result-emoji" id="resultEmoji">🎉</div>
              <div className="result-visa" id="resultVisa">Безвизовый въезд</div>
              <p className="result-desc" id="resultDesc">Виза не требуется!</p>
              <div className="result-stats">
                <div>
                  <div className="result-stat-value" id="resultDays">0</div>
                  <div className="result-stat-label">дней</div>
                </div>
                <div>
                  <div className="result-stat-value" id="resultCost">$0</div>
                  <div className="result-stat-label">стоимость</div>
                </div>
                <div>
                  <div className="result-stat-value" id="resultTime">0</div>
                  <div className="result-stat-label">оформление</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ from DB */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-teal-700 uppercase tracking-wider mb-2">FAQ</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black">Частые вопросы</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={faq.id} className={`reveal reveal-delay-${(i % 4) + 1} faq-item bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden`}>
                <button onClick={toggleFaq} className="faq-question w-full px-6 py-5 text-left font-bold flex justify-between items-center hover:bg-gray-50 transition">
                  {faq.question}
                  <span className="faq-icon text-teal-600 text-2xl transition-transform">+</span>
                </button>
                <div className="faq-answer">
                  <div className="px-6 pb-5 text-gray-600">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-teal-700 uppercase tracking-wider mb-2">Отзывы</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black">Что говорят клиенты</h2>
            <p className="reveal reveal-delay-2 text-lg text-gray-600 mt-2">Истории успешного оформления виз</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Алексей М.',
                location: 'Москва',
                text: 'Оформил e-Visa за 3 дня. Всё прошло гладко, на границе никаких вопросов. Рекомендую!',
                rating: 5,
                visa: 'E-Visa 90 дней',
              },
              {
                name: 'Екатерина С.',
                location: 'Санкт-Петербург',
                text: 'Первый раз летела во Вьетнам. Благодаря калькулятору поняла, что виза не нужна. Супер удобно!',
                rating: 5,
                visa: 'Безвизовый въезд',
              },
              {
                name: 'Дмитрий К.',
                location: 'Новосибирск',
                text: 'Долго искал информацию по визам. Здесь всё понятно и актуально. Сэкономил время и нервы.',
                rating: 5,
                visa: 'E-Visa 30 дней',
              },
            ].map((review, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50`}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
                    {review.visa}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-teal-700 uppercase tracking-wider mb-2">Консультация</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black">Оставить заявку</h2>
            <p className="reveal reveal-delay-2 text-lg text-gray-600 mt-2">Мы свяжемся с вами в ближайшее время</p>
          </div>

          <div className="reveal reveal-delay-3 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50">
            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold mb-2">Заявка отправлена!</h3>
                <p className="text-gray-600 mb-6">Мы свяжемся с вами в ближайшее время</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Ваше имя *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      placeholder="Иван"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Телефон *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      placeholder="+7 999 123 4567"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Мессенджер</label>
                    <select
                      name="messenger"
                      value={formData.messenger}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    >
                      <option value="telegram">Telegram</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="zalo">Zalo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Тип визы</label>
                    <select
                      name="visaType"
                      value={formData.visaType}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    >
                      <option value="">Не знаю / нужна консультация</option>
                      {visaTypes.map(visa => (
                        <option key={visa.id} value={visa.nameRu}>{visa.nameRu}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Сообщение</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={3}
                    placeholder="Расскажите о вашей ситуации..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                {formStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    Ошибка отправки. Попробуйте ещё раз.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full py-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 text-white font-bold rounded-xl hover:shadow-lg hover:opacity-90 transition text-lg disabled:opacity-50"
                >
                  {formStatus === 'loading' ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
