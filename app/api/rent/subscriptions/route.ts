import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const body = await request.json()
    const { email, minPrice, maxPrice, minRooms, maxRooms, districtId } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if subscription already exists
    const existing = await prisma.apartmentSubscription.findUnique({
      where: { email }
    })

    if (existing) {
      // Update existing subscription
      const subscription = await prisma.apartmentSubscription.update({
        where: { email },
        data: {
          minPrice: minPrice || null,
          maxPrice: maxPrice || null,
          minRooms: minRooms || null,
          maxRooms: maxRooms || null,
          districtId: districtId || null,
          isActive: true,
        }
      })
      return NextResponse.json({ success: true, subscription, updated: true })
    }

    // Create new subscription
    const subscription = await prisma.apartmentSubscription.create({
      data: {
        email,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        minRooms: minRooms || null,
        maxRooms: maxRooms || null,
        districtId: districtId || null,
      }
    })

    return NextResponse.json({ success: true, subscription })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    await prisma.apartmentSubscription.update({
      where: { email },
      data: { isActive: false }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 })
  }
}
