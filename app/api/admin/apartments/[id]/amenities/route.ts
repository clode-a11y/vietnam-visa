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

    const apartmentAmenities = await prisma.apartmentAmenity.findMany({
      where: { apartmentId: id },
      include: {
        amenity: true,
      },
    })

    return NextResponse.json(apartmentAmenities.map(aa => aa.amenity))
  } catch (error) {
    console.error('Error fetching apartment amenities:', error)
    return NextResponse.json({ error: 'Failed to fetch apartment amenities' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const { id } = await params
    const body = await request.json()
    const amenityIds: string[] = body.amenityIds || []

    // Delete all existing amenities for this apartment
    await prisma.apartmentAmenity.deleteMany({
      where: { apartmentId: id },
    })

    // Create new connections
    if (amenityIds.length > 0) {
      await prisma.apartmentAmenity.createMany({
        data: amenityIds.map(amenityId => ({
          apartmentId: id,
          amenityId,
        })),
      })
    }

    // Fetch updated list
    const apartmentAmenities = await prisma.apartmentAmenity.findMany({
      where: { apartmentId: id },
      include: {
        amenity: true,
      },
    })

    return NextResponse.json(apartmentAmenities.map(aa => aa.amenity))
  } catch (error) {
    console.error('Error updating apartment amenities:', error)
    return NextResponse.json({ error: 'Failed to update apartment amenities' }, { status: 500 })
  }
}
