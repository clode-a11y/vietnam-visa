'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function HomePage() {
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
      <style jsx global>{`
        :root {
          --green-light: #86EFAC;
          --green: #22C55E;
          --green-dark: #166534;
          --pink-light: #FECDD3;
          --pink: #FB7185;
          --pink-dark: #E11D48;
          --orange-light: #FED7AA;
          --orange: #F97316;
          --orange-dark: #EA580C;
          --white: #FFFFFF;
          --black: #1A1A1A;
          --text-primary: #1A1A1A;
          --text-secondary: rgba(26, 26, 26, 0.7);
          --text-muted: rgba(26, 26, 26, 0.5);
          --text-inverse: #FFFFFF;
          --card-bg: rgba(255, 255, 255, 0.85);
          --card-bg-solid: #FFFFFF;
          --card-border: rgba(255, 255, 255, 0.5);
          --card-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          --gradient-main: linear-gradient(135deg, #86EFAC 0%, #FECDD3 50%, #FED7AA 100%);
          --gradient-accent: linear-gradient(135deg, #22C55E 0%, #FB7185 50%, #F97316 100%);
        }

        .gradient-bg-animated {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #86EFAC 0%, #A7F3D0 15%, #FECDD3 35%, #FBCFE8 50%, #FED7AA 70%, #FDBA74 85%, #FED7AA 100%);
          background-size: 400% 400%;
          animation: gradientFlow 20s ease infinite;
          z-index: -1;
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          25% { background-position: 50% 100%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 0%; }
          100% { background-position: 0% 50%; }
        }

        .reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        header.scrolled {
          background: rgba(255, 255, 255, 0.95) !important;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .calc-result {
          display: none;
          margin-top: 2rem;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(134, 239, 172, 0.2), rgba(254, 205, 211, 0.2));
          border-radius: 24px;
          text-align: center;
        }

        .calc-result.show {
          display: block;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .result-emoji { font-size: 4rem; margin-bottom: 1rem; }
        .result-visa { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; }
        .result-desc { color: var(--text-secondary); margin-bottom: 1.5rem; }

        .result-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .result-stat-value {
          font-size: 2rem;
          font-weight: 800;
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .result-stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .faq-item .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .faq-item.active .faq-answer {
          max-height: 200px;
        }

        .faq-item.active .faq-icon {
          transform: rotate(45deg);
        }

        .vietnam-map {
          max-width: 280px;
          margin: 0 auto;
          filter: drop-shadow(0 20px 40px rgba(34, 197, 94, 0.3));
        }

        .map-shape {
          animation: mapPulse 3s ease-in-out infinite;
        }

        @keyframes mapPulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.3)); }
          50% { filter: drop-shadow(0 0 40px rgba(251, 113, 133, 0.4)); }
        }

        .city-marker {
          animation: markerPulse 2s ease-in-out infinite;
        }

        @keyframes markerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>

      <div className="gradient-bg-animated"></div>

      {/* Header */}
      <header id="header" className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-white/70 backdrop-blur-xl border-b border-white/50 transition-all">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-gray-900">
          <span>🇻🇳</span>
          VietVisa
        </Link>
        <nav className="hidden md:flex gap-8">
          <a href="#features" className="text-gray-700 hover:text-green-600 font-medium transition">Типы виз</a>
          <a href="#process" className="text-gray-700 hover:text-green-600 font-medium transition">Процесс</a>
          <a href="#calculator" className="text-gray-700 hover:text-green-600 font-medium transition">Калькулятор</a>
          <a href="#faq" className="text-gray-700 hover:text-green-600 font-medium transition">FAQ</a>
        </nav>
        <a href="#calculator" className="px-5 py-2.5 bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg transition">
          Рассчитать визу
        </a>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full text-sm font-semibold text-green-700 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Актуально на 2025 год
            </div>
            <h1 className="reveal reveal-delay-1 text-5xl md:text-6xl font-black mb-6 leading-tight">
              Виза во <span className="bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Вьетнам</span>
            </h1>
            <p className="reveal reveal-delay-2 text-xl text-gray-700 mb-8 max-w-lg">
              Полный гайд для россиян: безвизовый въезд до 45 дней, электронная виза и виза по прилёту
            </p>
            <a href="#calculator" className="reveal reveal-delay-3 inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition text-lg">
              Рассчитать визу
              <span>→</span>
            </a>
          </div>

          {/* Vietnam Map */}
          <div className="reveal reveal-delay-4 relative">
            <svg className="vietnam-map" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#22C55E'}}/>
                  <stop offset="50%" style={{stopColor:'#FB7185'}}/>
                  <stop offset="100%" style={{stopColor:'#F97316'}}/>
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="#22C55E" floodOpacity="0.3"/>
                </filter>
              </defs>

              <path className="map-shape" d="M 145 25 C 160 28, 175 35, 185 45 C 195 55, 200 70, 195 85 C 190 100, 175 110, 170 125 C 165 140, 170 155, 180 170 C 190 185, 200 195, 195 215 C 190 235, 175 250, 170 270 C 165 290, 170 310, 175 330 C 180 350, 175 370, 165 390 C 155 410, 140 425, 125 440 C 110 455, 90 465, 75 470 C 60 475, 45 470, 40 455 C 35 440, 45 420, 55 400 C 65 380, 75 360, 80 340 C 85 320, 80 300, 85 280 C 90 260, 100 245, 105 225 C 110 205, 105 185, 100 165 C 95 145, 90 125, 95 105 C 100 85, 115 70, 125 55 C 135 40, 140 30, 145 25 Z" fill="url(#mapGradient)" filter="url(#shadow)"/>

              {/* City markers */}
              <g className="city-markers">
                <g className="city-marker">
                  <circle cx="155" cy="75" r="8" fill="#FFFFFF" stroke="url(#mapGradient)" strokeWidth="3"/>
                  <circle cx="155" cy="75" r="4" fill="url(#mapGradient)"/>
                </g>
                <g className="city-marker" style={{animationDelay: '0.3s'}}>
                  <circle cx="175" cy="200" r="7" fill="#FFFFFF" stroke="url(#mapGradient)" strokeWidth="3"/>
                  <circle cx="175" cy="200" r="3" fill="url(#mapGradient)"/>
                </g>
                <g className="city-marker" style={{animationDelay: '0.6s'}}>
                  <circle cx="160" cy="300" r="7" fill="#FFFFFF" stroke="url(#mapGradient)" strokeWidth="3"/>
                  <circle cx="160" cy="300" r="3" fill="url(#mapGradient)"/>
                </g>
                <g className="city-marker" style={{animationDelay: '0.9s'}}>
                  <circle cx="100" cy="400" r="8" fill="#FFFFFF" stroke="url(#mapGradient)" strokeWidth="3"/>
                  <circle cx="100" cy="400" r="4" fill="url(#mapGradient)"/>
                </g>
                <g className="city-marker" style={{animationDelay: '1.2s'}}>
                  <circle cx="55" cy="445" r="6" fill="#FFFFFF" stroke="url(#mapGradient)" strokeWidth="3"/>
                  <circle cx="55" cy="445" r="2.5" fill="url(#mapGradient)"/>
                </g>
              </g>

              {/* City labels */}
              <g fill="#1A1A1A" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="12">
                <text x="175" y="80">Ханой</text>
                <text x="195" y="205">Дананг</text>
                <text x="180" y="305">Нячанг</text>
                <text x="120" y="405">Хошимин</text>
                <text x="70" y="455">Фукуок</text>
              </g>
            </svg>

            {/* Decorative badges */}
            <div className="absolute top-4 right-0 px-3 py-2 bg-white/90 backdrop-blur rounded-xl shadow-lg flex items-center gap-2">
              <span>🏖️</span>
              <span className="text-sm font-semibold">Пляжи</span>
            </div>
            <div className="absolute bottom-20 left-0 px-3 py-2 bg-white/90 backdrop-blur rounded-xl shadow-lg flex items-center gap-2">
              <span>🍜</span>
              <span className="text-sm font-semibold">Еда</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '45', label: 'дней без визы' },
            { value: '$25', label: 'стоимость e-Visa' },
            { value: '3', label: 'дня оформление' },
            { value: '90', label: 'дней максимум' },
          ].map((stat, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} bg-white/80 backdrop-blur-xl rounded-3xl p-6 text-center shadow-lg border border-white/50 hover:shadow-xl hover:-translate-y-2 transition-all`}>
              <div className="text-4xl font-black bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-green-700 uppercase tracking-wider mb-2">Типы виз</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black">Выберите подходящий вариант</h2>
            <p className="reveal reveal-delay-2 text-lg text-gray-600 mt-2">Три способа легально находиться во Вьетнаме</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🆓', title: 'Безвизовый въезд', duration: 'до 45 дней', price: 'Бесплатно', desc: 'Для туристов с загранпаспортом РФ' },
              { icon: '💻', title: 'E-Visa', duration: 'до 90 дней', price: 'от $25', desc: 'Электронная виза онлайн', popular: true },
              { icon: '✈️', title: 'Виза по прилёту', duration: 'до 30 дней', price: 'от $50', desc: 'Оформление в аэропорту' },
            ].map((visa, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border ${visa.popular ? 'border-green-400 ring-2 ring-green-400/20' : 'border-white/50'} hover:shadow-xl hover:-translate-y-2 transition-all`}>
                {visa.popular && (
                  <div className="text-xs font-bold text-green-600 mb-3">ПОПУЛЯРНО</div>
                )}
                <div className="text-5xl mb-4">{visa.icon}</div>
                <h3 className="text-xl font-bold mb-2">{visa.title}</h3>
                <p className="text-gray-600 mb-4">{visa.desc}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{visa.duration}</span>
                  <span className="font-bold text-green-600">{visa.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-green-700 uppercase tracking-wider mb-2">Процесс</p>
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
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg">
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
            <p className="reveal text-sm font-bold text-green-700 uppercase tracking-wider mb-2">Калькулятор</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black">Узнайте какая виза нужна</h2>
          </div>

          <div className="reveal reveal-delay-2 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Дата прилёта</label>
                <input type="date" id="arrival" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Дата вылета</label>
                <input type="date" id="departure" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Цель поездки</label>
                <select id="purpose" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
                  <option value="tourism">🏖️ Туризм</option>
                  <option value="business">💼 Бизнес</option>
                  <option value="work">👔 Работа</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Въезды</label>
                <select id="entries" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
                  <option value="single">Однократный</option>
                  <option value="multiple">Многократный</option>
                </select>
              </div>
            </div>

            <button onClick={calculateVisa} className="w-full py-4 bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg hover:opacity-90 transition text-lg">
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

      {/* FAQ */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-green-700 uppercase tracking-wider mb-2">FAQ</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black">Частые вопросы</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: 'Нужна ли виза россиянам во Вьетнам?', a: 'Нет, для поездки до 45 дней виза не нужна. Просто возьмите загранпаспорт со сроком действия минимум 6 месяцев.' },
              { q: 'Сколько стоит электронная виза?', a: 'E-Visa стоит $25 (оплата картой онлайн). Срок оформления — 3 рабочих дня.' },
              { q: 'Можно ли продлить пребывание?', a: 'Да! Можно сделать visa-run — выехать в Камбоджу или Таиланд и въехать заново на 45 дней.' },
              { q: 'Какие документы нужны?', a: 'Загранпаспорт (срок от 6 месяцев), обратные билеты, бронь отеля. Для e-Visa — фото 4x6 см.' },
            ].map((faq, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} faq-item bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden`}>
                <button onClick={toggleFaq} className="faq-question w-full px-6 py-5 text-left font-bold flex justify-between items-center hover:bg-gray-50 transition">
                  {faq.q}
                  <span className="faq-icon text-green-600 text-2xl transition-transform">+</span>
                </button>
                <div className="faq-answer">
                  <div className="px-6 pb-5 text-gray-600">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="reveal text-6xl mb-4">🌴</div>
        <h2 className="reveal reveal-delay-1 text-4xl font-black mb-4">Готовы к приключению?</h2>
        <p className="reveal reveal-delay-2 text-xl text-gray-600 mb-8">Вьетнам ждёт вас!</p>
        <a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="reveal reveal-delay-3 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg transition text-lg">
          Оформить e-Visa →
        </a>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-black/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">🇻🇳 VietVisa</h3>
            <p className="text-gray-600 text-sm">Гайд по визам во Вьетнам для россиян. 2025</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-800">Разделы</h4>
            <div className="space-y-2">
              <a href="#features" className="block text-gray-600 hover:text-green-600 text-sm">Типы виз</a>
              <a href="#process" className="block text-gray-600 hover:text-green-600 text-sm">Процесс</a>
              <a href="#calculator" className="block text-gray-600 hover:text-green-600 text-sm">Калькулятор</a>
              <a href="#faq" className="block text-gray-600 hover:text-green-600 text-sm">FAQ</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-800">Полезное</h4>
            <div className="space-y-2">
              <a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="block text-gray-600 hover:text-green-600 text-sm">Сайт e-Visa</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-800">Города</h4>
            <div className="space-y-2">
              <span className="block text-gray-600 text-sm">Нячанг</span>
              <span className="block text-gray-600 text-sm">Хошимин</span>
              <span className="block text-gray-600 text-sm">Ханой</span>
              <span className="block text-gray-600 text-sm">Фукуок</span>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-8 border-t border-gray-100 flex justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 VietVisa</p>
          <Link href="/admin" className="text-gray-400 hover:text-gray-600 text-sm">
            Админ
          </Link>
        </div>
      </footer>
    </>
  )
}
