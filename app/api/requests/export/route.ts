import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const requests = await prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // Create CSV content
    const headers = ['ID', 'Имя', 'Телефон', 'Email', 'Мессенджер', 'Тип визы', 'Сообщение', 'Статус', 'Дата']

    const statusLabels: Record<string, string> = {
      new: 'Новая',
      contacted: 'Связались',
      completed: 'Завершена',
      cancelled: 'Отменена',
    }

    const rows = requests.map(r => [
      r.id,
      r.name,
      r.phone,
      r.email || '',
      r.messenger,
      r.visaType || '',
      (r.message || '').replace(/"/g, '""'),
      statusLabels[r.status] || r.status,
      new Date(r.createdAt).toLocaleString('ru-RU'),
    ])

    const csvContent = [
      headers.join(';'),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(';'))
    ].join('\n')

    // Add BOM for Excel to recognize UTF-8
    const bom = '\uFEFF'

    return new NextResponse(bom + csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="requests_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Error exporting requests:', error)
    return NextResponse.json({ error: 'Failed to export requests' }, { status: 500 })
  }
}
