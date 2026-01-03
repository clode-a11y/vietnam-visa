import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendTelegramNotification } from '@/lib/telegram'

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const requests = await prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const body = await request.json()

    const contactRequest = await prisma.contactRequest.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        messenger: body.messenger || 'telegram',
        visaType: body.visaType,
        message: body.message || null,
        status: 'new',
      },
    })

    // Send Telegram notification (don't await to not block response)
    sendTelegramNotification({
      name: body.name,
      phone: body.phone,
      messenger: body.messenger || 'telegram',
      visaType: body.visaType,
      message: body.message,
    }).catch(console.error)

    return NextResponse.json(contactRequest, { status: 201 })
  } catch (error) {
    console.error('Error creating request:', error)
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 })
  }
}
