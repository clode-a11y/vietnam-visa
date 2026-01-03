import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { name, phone, messenger, type, date, comment, apartmentId } = body

    // Validate required fields
    if (!name || !phone || !apartmentId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create viewing request
    const viewingRequest = await prisma.viewingRequest.create({
      data: {
        name,
        phone,
        messenger: messenger || 'whatsapp',
        type: type || 'viewing',
        date: date ? new Date(date) : null,
        comment: comment || null,
        apartmentId,
        status: 'new',
      },
    })

    // TODO: Send notification to Telegram

    return NextResponse.json(viewingRequest, { status: 201 })
  } catch (error) {
    console.error('Error creating viewing request:', error)
    return NextResponse.json(
      { error: 'Failed to create viewing request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      )
    }

    const requests = await prisma.viewingRequest.findMany({
      include: {
        apartment: {
          select: {
            titleRu: true,
            titleEn: true,
            titleVi: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching viewing requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch viewing requests' },
      { status: 500 }
    )
  }
}
