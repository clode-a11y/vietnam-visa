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
        amenities: { include: { amenity: true } },
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

    const apartment = await prisma.apartment.update({
      where: { id },
      data: {
        titleRu: body.titleRu,
        titleEn: body.titleEn,
        titleVi: body.titleVi,
        descriptionRu: body.descriptionRu,
        descriptionEn: body.descriptionEn,
        descriptionVi: body.descriptionVi,
        priceUsd: body.priceUsd,
        priceVnd: body.priceVnd,
        rooms: body.rooms,
        area: body.area,
        floor: body.floor,
        totalFloors: body.totalFloors,
        address: body.address,
        lat: body.lat,
        lng: body.lng,
        districtId: body.districtId,
        isAvailable: body.isAvailable,
        canShow: body.canShow,
        hasVideo: body.hasVideo,
      },
    })

    return NextResponse.json(apartment)
  } catch (error) {
    console.error('Error updating apartment:', error)
    return NextResponse.json({ error: 'Failed to update apartment' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const { id } = await params

    await prisma.apartment.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting apartment:', error)
    return NextResponse.json({ error: 'Failed to delete apartment' }, { status: 500 })
  }
}
