import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendNewApartmentNotification, sendSubscriberAlertToAdmin } from '@/lib/telegram'

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
      include: {
        district: true,
      },
    })

    // Find matching subscribers and send notifications
    try {
      const matchingSubscribers = await prisma.apartmentSubscription.findMany({
        where: {
          isActive: true,
          AND: [
            {
              OR: [
                { minPrice: null },
                { minPrice: { lte: body.priceUsd } },
              ],
            },
            {
              OR: [
                { maxPrice: null },
                { maxPrice: { gte: body.priceUsd } },
              ],
            },
            {
              OR: [
                { minRooms: null },
                { minRooms: { lte: body.rooms } },
              ],
            },
            {
              OR: [
                { maxRooms: null },
                { maxRooms: { gte: body.rooms } },
              ],
            },
            {
              OR: [
                { districtId: null },
                { districtId: body.districtId },
              ],
            },
          ],
        },
      })

      // Send notification to admin about new apartment
      await sendNewApartmentNotification({
        id: apartment.id,
        title: apartment.titleRu,
        district: apartment.district.nameRu,
        priceUsd: apartment.priceUsd,
        rooms: apartment.rooms,
        area: apartment.area,
        matchingSubscribers: matchingSubscribers.length,
      })

      // If there are matching subscribers, send their emails to admin
      if (matchingSubscribers.length > 0) {
        await sendSubscriberAlertToAdmin(
          matchingSubscribers.map(sub => ({
            email: sub.email,
            apartmentTitle: apartment.titleRu,
            apartmentId: apartment.id,
            priceUsd: apartment.priceUsd,
            rooms: apartment.rooms,
            district: apartment.district.nameRu,
          }))
        )
      }
    } catch (notificationError) {
      console.error('Failed to send notifications:', notificationError)
      // Don't fail the apartment creation if notifications fail
    }

    return NextResponse.json(apartment, { status: 201 })
  } catch (error) {
    console.error('Error creating apartment:', error)
    return NextResponse.json({ error: 'Failed to create apartment' }, { status: 500 })
  }
}
