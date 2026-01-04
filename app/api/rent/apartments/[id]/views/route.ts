import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - increment view count
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const { id } = await params

    const apartment = await prisma.apartment.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
      select: {
        views: true,
      },
    })

    return NextResponse.json({ views: apartment.views })
  } catch (error) {
    console.error('Error incrementing views:', error)
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 })
  }
}

// GET - get current view count
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
      select: {
        views: true,
      },
    })

    if (!apartment) {
      return NextResponse.json({ error: 'Apartment not found' }, { status: 404 })
    }

    return NextResponse.json({ views: apartment.views })
  } catch (error) {
    console.error('Error getting views:', error)
    return NextResponse.json({ error: 'Failed to get views' }, { status: 500 })
  }
}
