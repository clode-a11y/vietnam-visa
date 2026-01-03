import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const requests = await prisma.viewingRequest.findMany({
      include: {
        apartment: {
          select: { titleRu: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Create CSV content
    const headers = [
      'ID',
      'Имя',
      'Телефон',
      'Мессенджер',
      'Тип заявки',
      'Квартира',
      'Желаемая дата',
      'Комментарий',
      'Статус',
      'Дата создания',
    ]

    const statusLabels: Record<string, string> = {
      new: 'Новая',
      contacted: 'Связались',
      completed: 'Завершена',
      cancelled: 'Отменена',
    }

    const typeLabels: Record<string, string> = {
      viewing: 'Просмотр',
      video_call: 'Видео-звонок',
    }

    const rows = requests.map(r => [
      r.id,
      r.name,
      r.phone,
      r.messenger,
      typeLabels[r.type] || r.type,
      r.apartment?.titleRu || '',
      r.date ? new Date(r.date).toLocaleDateString('ru-RU') : '',
      (r.comment || '').replace(/"/g, '""').replace(/\n/g, ' '),
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
        'Content-Disposition': `attachment; filename="viewing_requests_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Error exporting viewing requests:', error)
    return NextResponse.json({ error: 'Failed to export viewing requests' }, { status: 500 })
  }
}
