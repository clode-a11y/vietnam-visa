import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const requests = await prisma.viewingRequest.findMany({
      include: {
        apartment: {
          select: { titleRu: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching viewing requests:', error)
    return NextResponse.json({ error: 'Failed to fetch viewing requests' }, { status: 500 })
  }
}
