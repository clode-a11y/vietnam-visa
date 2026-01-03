import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const apartments = await prisma.apartment.findMany({
      include: {
        district: {
          select: { nameRu: true },
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

export async function POST(request: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const body = await request.json()

    const apartment = await prisma.apartment.create({
      data: {
        titleRu: body.titleRu,
        titleEn: body.titleEn || body.titleRu,
        titleVi: body.titleVi || body.titleRu,
        descriptionRu: body.descriptionRu,
        descriptionEn: body.descriptionEn || body.descriptionRu,
        descriptionVi: body.descriptionVi || body.descriptionRu,
        priceUsd: body.priceUsd,
        priceVnd: body.priceVnd || body.priceUsd * 25000,
        rooms: body.rooms,
        area: body.area,
        floor: body.floor,
        totalFloors: body.totalFloors,
        address: body.address,
        lat: body.lat,
        lng: body.lng,
        districtId: body.districtId,
        isAvailable: body.isAvailable ?? true,
        canShow: body.canShow ?? true,
        hasVideo: body.hasVideo ?? false,
      },
    })

    return NextResponse.json(apartment, { status: 201 })
  } catch (error) {
    console.error('Error creating apartment:', error)
    return NextResponse.json({ error: 'Failed to create apartment' }, { status: 500 })
  }
}
