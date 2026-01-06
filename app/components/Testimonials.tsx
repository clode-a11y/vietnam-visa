'use client'

import { useState } from 'react'

interface Testimonial {
  id: number
  name: string
  location: string
  avatar: string
  text: string
  rating: number
  date: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Александр К.',
    location: 'Москва',
    avatar: '👨‍💼',
    text: 'Очень полезный калькулятор! Быстро разобрался с датами визы. Оформил e-Visa по инструкции за 10 минут, через 3 дня получил на почту. Рекомендую!',
    rating: 5,
    date: 'Декабрь 2024',
  },
  {
    id: 2,
    name: 'Елена М.',
    location: 'Санкт-Петербург',
    avatar: '👩‍🦰',
    text: 'Спасибо за понятное объяснение про безвизовый въезд. Мы с мужем летим на 45 дней, теперь точно знаем что никаких документов заранее не нужно.',
    rating: 5,
    date: 'Январь 2025',
  },
  {
    id: 3,
    name: 'Дмитрий П.',
    location: 'Казахстан',
    avatar: '👨',
    text: 'Наконец нашёл сайт с актуальной информацией для Казахстана! У нас только 30 дней безвиза, а не 45 как у россиян. Сайт сразу это показал.',
    rating: 5,
    date: 'Январь 2025',
  },
  {
    id: 4,
    name: 'Ольга С.',
    location: 'Краснодар',
    avatar: '👩',
    text: 'Статья про ошибки при оформлении e-Visa очень помогла. Чуть не загрузила фото на синем фоне! Теперь виза одобрена.',
    rating: 5,
    date: 'Декабрь 2024',
  },
  {
    id: 5,
    name: 'Михаил Р.',
    location: 'Новосибирск',
    avatar: '👨‍🔬',
    text: 'Живу во Вьетнаме уже год, делаю visa run каждые 45 дней. Гайд по продлению визы — лучший что видел. Всё по делу, без воды.',
    rating: 5,
    date: 'Ноябрь 2024',
  },
]

interface TestimonialsProps {
  title?: string
  subtitle?: string
}

export default function Testimonials({
  title = 'Отзывы наших клиентов',
  subtitle = 'Что говорят туристы, которые уже воспользовались нашими советами'
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <TestimonialCard testimonial={testimonials[currentIndex]} />

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white dark:bg-slate-700 shadow-md hover:bg-gray-50 dark:hover:bg-slate-600 transition"
                aria-label="Предыдущий отзыв"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition ${
                      index === currentIndex
                        ? 'bg-teal-600 w-4'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Отзыв ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white dark:bg-slate-700 shadow-md hover:bg-gray-50 dark:hover:bg-slate-600 transition"
                aria-label="Следующий отзыв"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* View all link */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Более 500+ довольных клиентов
          </p>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-2xl">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {testimonial.location}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
        "{testimonial.text}"
      </p>

      {/* Date */}
      <p className="text-xs text-gray-400 dark:text-gray-500">
        {testimonial.date}
      </p>
    </div>
  )
}
