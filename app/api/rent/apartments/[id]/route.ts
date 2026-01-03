import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const { id } = await params

    const apartment = await prisma.apartment.findUnique({
      where: { id },
      include: {
        district: true,
        images: { orderBy: { order: 'asc' } },
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    })

    if (!apartment) {
      return NextResponse.json({ error: 'Apartment not found' }, { status: 404 })
    }

    return NextResponse.json(apartment)
  } catch (error) {
    console.error('Error fetching apartment:', error)
    return NextResponse.json({ error: 'Failed to fetch apartment' }, { status: 500 })
  }
}
