import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const visaTypes = await prisma.visaType.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(visaTypes)
  } catch (error) {
    console.error('Error fetching visa types:', error)
    return NextResponse.json({ error: 'Failed to fetch visa types' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const body = await request.json()

    const visaType = await prisma.visaType.create({
      data: {
        nameRu: body.nameRu,
        nameEn: body.nameEn || body.nameRu,
        icon: body.icon || '📋',
        duration: body.duration,
        description: body.description || '',
        price: parseInt(body.price) || 0,
        isPopular: body.isPopular || false,
        isActive: body.isActive ?? true,
      },
    })

    // Revalidate visa page cache
    revalidatePath('/visa')

    return NextResponse.json(visaType, { status: 201 })
  } catch (error) {
    console.error('Error creating visa type:', error)
    return NextResponse.json({ error: 'Failed to create visa type' }, { status: 500 })
  }
}
