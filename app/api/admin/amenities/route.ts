import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const amenities = await prisma.amenity.findMany({
      include: {
        _count: {
          select: { apartments: true },
        },
      },
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

export async function POST(request: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const body = await request.json()

    const amenity = await prisma.amenity.create({
      data: {
        nameRu: body.nameRu,
        nameEn: body.nameEn,
        nameVi: body.nameVi,
        icon: body.icon || '✨',
        category: body.category || 'general',
      },
    })

    return NextResponse.json(amenity, { status: 201 })
  } catch (error) {
    console.error('Error creating amenity:', error)
    return NextResponse.json({ error: 'Failed to create amenity' }, { status: 500 })
  }
}
