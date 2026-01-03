import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const districtId = searchParams.get('districtId')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const rooms = searchParams.get('rooms')

    const where: Record<string, unknown> = {
      isAvailable: true,
    }

    if (districtId) {
      where.districtId = districtId
    }

    if (minPrice || maxPrice) {
      where.priceUsd = {}
      if (minPrice) (where.priceUsd as Record<string, number>).gte = parseInt(minPrice)
      if (maxPrice) (where.priceUsd as Record<string, number>).lte = parseInt(maxPrice)
    }

    if (rooms) {
      where.rooms = parseInt(rooms)
    }

    const apartments = await prisma.apartment.findMany({
      where,
      include: {
        district: true,
        images: {
          where: { isCover: true },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(apartments)
  } catch (error) {
    console.error('Error fetching apartments:', error)
    return NextResponse.json({ error: 'Failed to fetch apartments' }, { status: 500 })
  }
}
