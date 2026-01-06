const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

interface ContactRequest {
  name: string
  phone: string
  messenger: string
  visaType: string
  message?: string | null
}

export async function sendTelegramNotification(request: ContactRequest) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Telegram not configured, skipping notification')
    return
  }

  const messengerEmoji: Record<string, string> = {
    telegram: '📱 Telegram',
    whatsapp: '💬 WhatsApp',
    zalo: '📞 Zalo'
  }

  const text = `
🔔 *Новая заявка на визу!*

👤 *Имя:* ${escapeMarkdown(request.name)}
📞 *Телефон:* ${escapeMarkdown(request.phone)}
💬 *Мессенджер:* ${messengerEmoji[request.messenger] || request.messenger}
🛂 *Тип визы:* ${escapeMarkdown(request.visaType || 'Не указан')}
${request.message ? `\n📝 *Сообщение:*\n${escapeMarkdown(request.message)}` : ''}

⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Ho_Chi_Minh' })}
`.trim()

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'Markdown'
        })
      }
    )

    if (!res.ok) {
      const error = await res.text()
      console.error('Telegram API error:', error)
    }
  } catch (error) {
    console.error('Failed to send Telegram notification:', error)
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&')
}

interface ViewingRequest {
  name: string
  phone: string
  messenger: string
  type: 'viewing' | 'video_call'
  date?: string | null
  comment?: string | null
  apartmentTitle: string
  apartmentId: string
}

export async function sendViewingRequestNotification(request: ViewingRequest) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Telegram not configured, skipping notification')
    return
  }

  const messengerEmoji: Record<string, string> = {
    telegram: '📱 Telegram',
    whatsapp: '💬 WhatsApp',
    zalo: '📞 Zalo'
  }

  const typeEmoji = request.type === 'viewing' ? '🏠 Просмотр' : '🎥 Видео-звонок'

  const text = `
🔔 *Новая заявка на аренду\\!*

${typeEmoji}

🏢 *Квартира:* ${escapeMarkdown(request.apartmentTitle)}
👤 *Имя:* ${escapeMarkdown(request.name)}
📞 *Телефон:* ${escapeMarkdown(request.phone)}
💬 *Мессенджер:* ${messengerEmoji[request.messenger] || request.messenger}
${request.date ? `📅 *Желаемая дата:* ${escapeMarkdown(request.date)}` : ''}
${request.comment ? `\n📝 *Комментарий:*\n${escapeMarkdown(request.comment)}` : ''}

🔗 [Открыть квартиру](${process.env.NEXT_PUBLIC_SITE_URL || 'https://visa-beta-azure.vercel.app'}/rent/apartments/${request.apartmentId})

⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Ho_Chi_Minh' })}
`.trim()

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'MarkdownV2'
        })
      }
    )

    if (!res.ok) {
      const error = await res.text()
      console.error('Telegram API error:', error)
    }
  } catch (error) {
    console.error('Failed to send Telegram notification:', error)
  }
}

interface NewApartmentNotification {
  id: string
  title: string
  district: string
  priceUsd: number
  rooms: number
  area: number
  matchingSubscribers: number
}

export async function sendNewApartmentNotification(apartment: NewApartmentNotification) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Telegram not configured, skipping notification')
    return
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://visa-beta-azure.vercel.app'

  const text = `
🏠 *Новая квартира добавлена\\!*

📍 *${escapeMarkdown(apartment.title)}*
📌 Район: ${escapeMarkdown(apartment.district)}
💰 Цена: $${apartment.priceUsd}/мес
🛏️ Комнат: ${apartment.rooms === 0 ? 'Студия' : apartment.rooms}
📐 Площадь: ${apartment.area} м²

👥 Подписчиков подходит: *${apartment.matchingSubscribers}*

🔗 [Открыть квартиру](${siteUrl}/rent/apartments/${apartment.id})

⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Ho_Chi_Minh' })}
`.trim()

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'MarkdownV2'
        })
      }
    )

    if (!res.ok) {
      const error = await res.text()
      console.error('Telegram API error:', error)
    }
  } catch (error) {
    console.error('Failed to send new apartment notification:', error)
  }
}

interface SubscriberNotification {
  email: string
  apartmentTitle: string
  apartmentId: string
  priceUsd: number
  rooms: number
  district: string
}

export async function sendSubscriberAlertToAdmin(subscribers: SubscriberNotification[]) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || subscribers.length === 0) {
    return
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://visa-beta-azure.vercel.app'

  const emailList = subscribers.map(s => `• ${escapeMarkdown(s.email)}`).join('\n')

  const text = `
📬 *Подписчики для уведомления\\!*

🏠 *${escapeMarkdown(subscribers[0].apartmentTitle)}*
💰 $${subscribers[0].priceUsd} \\| 🛏️ ${subscribers[0].rooms === 0 ? 'Студия' : subscribers[0].rooms} комн\\.

📧 *Email адреса \\(${subscribers.length}\\):*
${emailList}

🔗 [Открыть квартиру](${siteUrl}/rent/apartments/${subscribers[0].apartmentId})
`.trim()

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'MarkdownV2'
        })
      }
    )

    if (!res.ok) {
      const error = await res.text()
      console.error('Telegram API error:', error)
    }
  } catch (error) {
    console.error('Failed to send subscriber alert:', error)
  }
}

interface ContactFormRequest {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactFormNotification(request: ContactFormRequest) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Telegram not configured, skipping notification')
    return
  }

  const subjectLabels: Record<string, string> = {
    visa: '🛂 Вопрос по визам',
    rent: '🏠 Аренда квартиры',
    other: '📋 Другое'
  }

  const text = `
📩 *Новое сообщение с сайта\\!*

${subjectLabels[request.subject] || request.subject}

👤 *Имя:* ${escapeMarkdown(request.name)}
📧 *Email:* ${escapeMarkdown(request.email)}

📝 *Сообщение:*
${escapeMarkdown(request.message)}

⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Ho_Chi_Minh' })}
`.trim()

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'MarkdownV2'
        })
      }
    )

    if (!res.ok) {
      const error = await res.text()
      console.error('Telegram API error:', error)
    }
  } catch (error) {
    console.error('Failed to send contact form notification:', error)
  }
}
