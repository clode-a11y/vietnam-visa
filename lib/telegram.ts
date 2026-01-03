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
