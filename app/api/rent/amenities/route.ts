import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const amenities = await prisma.amenity.findMany({
      orderBy: [
        { category: 'asc' },
        { nameRu: 'asc' },
      ],
    })

    return NextResponse.json(amenities)
  } catch (error) {
    console.error('Error fetching amenities:', error)
    return NextResponse.json({ error: 'Failed to fetch amenities' }, { status: 500 })
  }
}
