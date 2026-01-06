'use client'

import { useEffect, useState } from 'react'
import { useLocale } from '@/lib/i18n/context'

interface VisaType {
  id: string
  nameRu: string
  nameEn?: string
  icon: string
  duration: string
  durationEn?: string
  description: string
  descriptionEn?: string
  price: number
  isPopular: boolean
}

interface FAQ {
  id: string
  question: string
  questionEn?: string
  answer: string
  answerEn?: string
}

interface VisaClientProps {
  visaTypes: VisaType[]
  faqs: FAQ[]
}

interface CalcResult {
  emoji: string
  visa: string
  desc: string
  days: number
  cost: string
  time: string
  show: boolean
}

// CIS Countries visa conditions
// Last updated: 2025-01-06
// Source: https://evisa.xuatnhapcanh.gov.vn, https://visa.mofa.gov.vn
interface CISCountry {
  id: string
  flag: string
  visaFreeDays: number // 0 = no visa-free
  hasEvisa: boolean
  noteKey: string
}

const CIS_COUNTRIES: CISCountry[] = [
  { id: 'russia', flag: '🇷🇺', visaFreeDays: 45, hasEvisa: true, noteKey: 'cis.note.russia' },
  { id: 'belarus', flag: '🇧🇾', visaFreeDays: 45, hasEvisa: true, noteKey: 'cis.note.belarus' },
  { id: 'kazakhstan', flag: '🇰🇿', visaFreeDays: 30, hasEvisa: true, noteKey: 'cis.note.kazakhstan' },
  { id: 'ukraine', flag: '🇺🇦', visaFreeDays: 45, hasEvisa: true, noteKey: 'cis.note.ukraine' },
  { id: 'uzbekistan', flag: '🇺🇿', visaFreeDays: 0, hasEvisa: true, noteKey: 'cis.note.uzbekistan' },
]

export default function VisaClient({ visaTypes, faqs }: VisaClientProps) {
  const { locale, t } = useLocale()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    messenger: 'telegram',
    visaType: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [calcResult, setCalcResult] = useState<CalcResult>({
    emoji: '🎉',
    visa: '',
    desc: '',
    days: 0,
    cost: '$0',
    time: '',
    show: false
  })
  const [selectedCitizenship, setSelectedCitizenship] = useState('russia')

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
    if (days <= 0) { alert(t('calc.checkDates')); return }

    // Get visa-free days for selected citizenship
    const country = CIS_COUNTRIES.find(c => c.id === selectedCitizenship)
    const visaFreeDays = country?.visaFreeDays || 0

    let emoji: string, visa: string, desc: string, cost: string, time: string

    // Check if country has visa-free entry
    if (visaFreeDays > 0 && purpose === 'tourism' && days <= visaFreeDays && entries === 'single') {
      emoji = '🎉'
      visa = t('calc.visaFree')
      desc = t('calc.visaFreeDesc')
      cost = '$0'
      time = t('calc.days0')
    } else if (days <= 90) {
      emoji = '💻'
      visa = t('calc.evisa')
      desc = visaFreeDays === 0
        ? t('cis.needEvisa')
        : t('calc.evisaDesc')
      cost = '$25'
      time = t('calc.days3')
    } else {
      emoji = '🏛️'
      visa = t('calc.longTerm')
      desc = t('calc.longTermDesc')
      cost = `${t('calc.from')} $50`
      time = t('calc.days14plus')
    }

    if (entries === 'multiple') cost = '$50'
    if (purpose === 'work') {
      visa = t('calc.workVisa')
      cost = `${t('calc.from')} $100`
      time = t('calc.days14to30')
    }

    setCalcResult({
      emoji,
      visa,
      desc,
      days,
      cost,
      time,
      show: true
    })
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
            <p className="reveal text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">{t('visaTypes.title')}</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black dark:text-white">{t('visaTypes.heading')}</h2>
            <p className="reveal reveal-delay-2 text-lg text-gray-600 dark:text-gray-400 mt-2">{t('visaTypes.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {visaTypes.map((visa, i) => (
              <div key={visa.id} className={`reveal reveal-delay-${(i % 3) + 1} bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border ${visa.isPopular ? 'border-teal-400 ring-2 ring-teal-400/20' : 'border-white/50 dark:border-slate-700/50'} hover:shadow-xl hover:-translate-y-2 transition-all`}>
                {visa.isPopular && (
                  <div className="text-xs font-bold text-teal-600 dark:text-teal-400 mb-3">{t('visaTypes.popular')}</div>
                )}
                <div className="text-5xl mb-4">{visa.icon}</div>
                <h3 className="text-xl font-bold dark:text-white mb-2">{locale === 'en' && visa.nameEn ? visa.nameEn : visa.nameRu}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{locale === 'en' && visa.descriptionEn ? visa.descriptionEn : visa.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-slate-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{locale === 'en' && visa.durationEn ? visa.durationEn : visa.duration}</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">{visa.price === 0 ? t('visaTypes.free') : `$${visa.price}`}</span>
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
            <p className="reveal text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">{t('comparison.title')}</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black dark:text-white">{t('comparison.heading')}</h2>
            <p className="reveal reveal-delay-2 text-lg text-gray-600 dark:text-gray-400 mt-2">{t('comparison.subtitle')}</p>
          </div>

          <div className="reveal reveal-delay-3 bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 dark:border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-500/10 via-teal-400/10 to-teal-300/10">
                    <th className="px-6 py-4 text-left font-bold text-gray-700 dark:text-gray-200">{t('comparison.parameter')}</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-200">{t('comparison.visaFree')}</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-200">{t('comparison.evisa')}</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-200">{t('comparison.voa')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium dark:text-white">{t('comparison.duration')}</td>
                    <td className="px-6 py-4 text-center dark:text-gray-300">{t('table.upTo45days')}</td>
                    <td className="px-6 py-4 text-center dark:text-gray-300">{t('table.upTo90days')}</td>
                    <td className="px-6 py-4 text-center dark:text-gray-300">{t('table.upTo30days')}</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium dark:text-white">{t('comparison.cost')}</td>
                    <td className="px-6 py-4 text-center text-teal-600 dark:text-teal-400 font-bold">{t('visaTypes.free')}</td>
                    <td className="px-6 py-4 text-center dark:text-gray-300">$25-50</td>
                    <td className="px-6 py-4 text-center dark:text-gray-300">$25-50</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium dark:text-white">{t('comparison.processingTime')}</td>
                    <td className="px-6 py-4 text-center text-teal-600 dark:text-teal-400 font-bold">{t('comparison.immediately')}</td>
                    <td className="px-6 py-4 text-center dark:text-gray-300">{t('table.3to5days')}</td>
                    <td className="px-6 py-4 text-center dark:text-gray-300">{t('comparison.onSite')}</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium dark:text-white">{t('comparison.extension')}</td>
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
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium dark:text-white">{t('comparison.multiEntry')}</td>
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
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium dark:text-white">{t('comparison.entryPoints')}</td>
                    <td className="px-6 py-4 text-center dark:text-gray-300">{t('comparison.all')}</td>
                    <td className="px-6 py-4 text-center dark:text-gray-300">{t('table.13airports')}</td>
                    <td className="px-6 py-4 text-center dark:text-gray-300">{t('comparison.airportsOnly')}</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium dark:text-white">{t('comparison.invitation')}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-teal-500">{t('comparison.notNeeded')}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-teal-500">{t('comparison.notNeeded')}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-orange-500">{t('comparison.needed')}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CIS Countries Comparison */}
      <section id="cis-countries" className="py-20 px-6 bg-gradient-to-b from-transparent to-teal-50/50 dark:to-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">{t('cis.title')}</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black dark:text-white">{t('cis.heading')}</h2>
            <p className="reveal reveal-delay-2 text-lg text-gray-600 dark:text-gray-400 mt-2">{t('cis.subtitle')}</p>
          </div>

          <div className="reveal reveal-delay-3 bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 dark:border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-500/10 via-teal-400/10 to-teal-300/10">
                    <th className="px-6 py-4 text-left font-bold text-gray-700 dark:text-gray-200">{t('cis.country')}</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-200">{t('cis.visaFreeDays')}</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-200">{t('cis.evisa')}</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700 dark:text-gray-200">{t('cis.note')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {CIS_COUNTRIES.map((country) => (
                    <tr key={country.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50">
                      <td className="px-6 py-4 font-medium dark:text-white">
                        <span className="text-xl mr-2">{country.flag}</span>
                        {t(`country.${country.id}`)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {country.visaFreeDays > 0 ? (
                          <span className="text-teal-600 dark:text-teal-400 font-bold">{country.visaFreeDays}</span>
                        ) : (
                          <span className="text-red-500">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {country.hasEvisa ? (
                          <span className="text-teal-500">✓</span>
                        ) : (
                          <span className="text-red-500">✗</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {t(country.noteKey)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50/50 dark:bg-slate-900/50 text-sm text-gray-500 dark:text-gray-400">
              {t('cis.footnote')}
            </div>
          </div>
        </div>
      </section>

      {/* Document Checklist */}
      <section id="documents" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">{t('documents.title')}</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black dark:text-white">{t('documents.heading')}</h2>
            <p className="reveal reveal-delay-2 text-lg text-gray-600 dark:text-gray-400 mt-2">{t('documents.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Visa-free */}
            <div className="reveal reveal-delay-1 bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 dark:border-slate-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center text-2xl">
                  🎉
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-white">{t('docs.visaFreeEntry')}</h3>
                  <span className="text-sm text-teal-600 dark:text-teal-400">{t('table.upTo45days')}</span>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  t('docs.passport6months'),
                  t('docs.returnTicket'),
                  t('docs.hotelBooking'),
                  t('docs.insurance'),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-teal-100 dark:bg-teal-900/50 rounded flex items-center justify-center text-teal-600 dark:text-teal-400 text-sm flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* E-Visa */}
            <div className="reveal reveal-delay-2 bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-teal-400 ring-2 ring-teal-400/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center text-2xl">
                  💻
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-white">E-Visa</h3>
                  <span className="text-sm text-teal-600 dark:text-teal-400">{t('table.upTo90days')}</span>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  t('docs.passport6months'),
                  t('docs.passportPhoto'),
                  t('docs.photo4x6'),
                  t('docs.bankCard'),
                  t('docs.emailReceipt'),
                  t('docs.travelDates'),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-teal-100 dark:bg-teal-900/50 rounded flex items-center justify-center text-teal-600 dark:text-teal-400 text-sm flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* VOA */}
            <div className="reveal reveal-delay-3 bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 dark:border-slate-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center text-2xl">
                  ✈️
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-white">{t('docs.visaOnArrival')}</h3>
                  <span className="text-sm text-orange-600 dark:text-orange-400">{t('table.upTo30days')}</span>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  t('docs.passport6months'),
                  t('docs.invitationLetter'),
                  t('docs.2photos'),
                  t('docs.formOnsite'),
                  t('docs.fee25cash'),
                  t('docs.stampFee25'),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-orange-100 dark:bg-orange-900/50 rounded flex items-center justify-center text-orange-600 dark:text-orange-400 text-sm flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
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
            <p className="reveal text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">{t('process.title')}</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black dark:text-white">{t('process.heading')}</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: t('process.step1title'), desc: t('process.step1desc') },
              { num: '2', title: t('process.step2title'), desc: t('process.step2desc') },
              { num: '3', title: t('process.step3title'), desc: t('process.step3desc') },
              { num: '4', title: t('process.step4title'), desc: t('process.step4desc') },
            ].map((step, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} text-center`}>
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg">
                  {step.num}
                </div>
                <h4 className="font-bold mb-1 dark:text-white">{step.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">{t('calculator.title')}</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black dark:text-white">{t('calculator.heading')}</h2>
          </div>

          <div className="reveal reveal-delay-2 bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 dark:border-slate-700/50">
            {/* Citizenship Selector - Full Width */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('calculator.citizenship')}</label>
              <select
                value={selectedCitizenship}
                onChange={(e) => setSelectedCitizenship(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              >
                {CIS_COUNTRIES.map(country => (
                  <option key={country.id} value={country.id}>
                    {country.flag} {t(`country.${country.id}`)}
                  </option>
                ))}
                <option value="other">🌍 {t('country.other')}</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('calculator.arrivalDate')}</label>
                <input type="date" id="arrival" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('calculator.departureDate')}</label>
                <input type="date" id="departure" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('calculator.purpose')}</label>
                <select id="purpose" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none">
                  <option value="tourism">🏖️ {t('calculator.tourism')}</option>
                  <option value="business">💼 {t('calculator.business')}</option>
                  <option value="work">👔 {t('calculator.work')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('calculator.entries')}</label>
                <select id="entries" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none">
                  <option value="single">{t('calculator.single')}</option>
                  <option value="multiple">{t('calculator.multiple')}</option>
                </select>
              </div>
            </div>

            <button onClick={calculateVisa} className="w-full py-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 text-white font-bold rounded-xl hover:shadow-lg hover:opacity-90 active:scale-[0.98] transition text-lg">
              {t('calculator.calculate')} →
            </button>

            <div className={`calc-result ${calcResult.show ? 'show' : ''}`}>
              <div className="result-emoji">{calcResult.emoji}</div>
              <div className="result-visa">{calcResult.visa || t('calc.visaFree')}</div>
              <p className="result-desc">{calcResult.desc || t('calc.visaFreeDesc')}</p>
              <div className="result-stats">
                <div>
                  <div className="result-stat-value">{calcResult.days}</div>
                  <div className="result-stat-label">{t('calculator.days')}</div>
                </div>
                <div>
                  <div className="result-stat-value">{calcResult.cost}</div>
                  <div className="result-stat-label">{t('calculator.cost')}</div>
                </div>
                <div>
                  <div className="result-stat-value">{calcResult.time || t('calc.days0')}</div>
                  <div className="result-stat-label">{t('calculator.processing')}</div>
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
            <p className="reveal text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">{t('faq.title')}</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black dark:text-white">{t('faq.heading')}</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={faq.id} className={`reveal reveal-delay-${(i % 4) + 1} faq-item bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 dark:border-slate-700/50 overflow-hidden`}>
                <button onClick={toggleFaq} className="faq-question w-full px-6 py-5 text-left font-bold dark:text-white flex justify-between items-center hover:bg-gray-50 dark:hover:bg-slate-700/50 transition">
                  {locale === 'en' && faq.questionEn ? faq.questionEn : faq.question}
                  <span className="faq-icon text-teal-600 dark:text-teal-400 text-2xl transition-transform">+</span>
                </button>
                <div className="faq-answer">
                  <div className="px-6 pb-5 text-gray-600 dark:text-gray-400">{locale === 'en' && faq.answerEn ? faq.answerEn : faq.answer}</div>
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
            <p className="reveal text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">{t('testimonials.title')}</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black dark:text-white">{t('testimonials.heading')}</h2>
            <p className="reveal reveal-delay-2 text-lg text-gray-600 dark:text-gray-400 mt-2">{t('testimonials.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {(locale === 'en' ? [
              {
                name: 'Alex M.',
                location: 'Moscow',
                text: 'Got e-Visa in 3 days. Everything went smoothly, no questions at the border. Recommend!',
                rating: 5,
                visa: 'E-Visa 90 days',
              },
              {
                name: 'Kate S.',
                location: 'St. Petersburg',
                text: 'First time flying to Vietnam. Thanks to the calculator, I understood that no visa needed. Super convenient!',
                rating: 5,
                visa: 'Visa-Free Entry',
              },
              {
                name: 'Dmitry K.',
                location: 'Novosibirsk',
                text: 'Was looking for visa info for a long time. Here everything is clear and up-to-date. Saved time and nerves.',
                rating: 5,
                visa: 'E-Visa 30 days',
              },
            ] : [
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
            ]).map((review, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50 dark:border-slate-700/50`}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{review.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{review.location}</p>
                  </div>
                  <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400 text-xs font-semibold rounded-full">
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
            <p className="reveal text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">{t('contact.title')}</p>
            <h2 className="reveal reveal-delay-1 text-4xl font-black dark:text-white">{t('contact.heading')}</h2>
            <p className="reveal reveal-delay-2 text-lg text-gray-600 dark:text-gray-400 mt-2">{t('contact.subtitle')}</p>
          </div>

          <div className="reveal reveal-delay-3 bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 dark:border-slate-700/50">
            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold dark:text-white mb-2">{t('contact.success')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{t('contact.successMessage')}</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="px-6 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition"
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('contact.name')} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      placeholder={locale === 'en' ? 'John' : 'Иван'}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('contact.phone')} *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      placeholder="+7 999 123 4567"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('contact.messenger')}</label>
                    <select
                      name="messenger"
                      value={formData.messenger}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    >
                      <option value="telegram">Telegram</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="zalo">Zalo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('contact.visaType')}</label>
                    <select
                      name="visaType"
                      value={formData.visaType}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    >
                      <option value="">{t('contact.noVisa')}</option>
                      {visaTypes.map(visa => (
                        <option key={visa.id} value={visa.nameRu}>{locale === 'en' && visa.nameEn ? visa.nameEn : visa.nameRu}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('contact.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={3}
                    placeholder={locale === 'en' ? 'Tell us about your situation...' : 'Расскажите о вашей ситуации...'}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                {formStatus === 'error' && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
                    {t('error.sending')}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full py-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 text-white font-bold rounded-xl hover:shadow-lg hover:opacity-90 active:scale-[0.98] transition text-lg disabled:opacity-50"
                >
                  {formStatus === 'loading' ? t('contact.sending') : t('contact.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
