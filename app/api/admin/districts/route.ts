import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const districts = await prisma.district.findMany({
      include: {
        _count: {
          select: { apartments: true },
        },
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(districts)
  } catch (error) {
    console.error('Error fetching districts:', error)
    return NextResponse.json({ error: 'Failed to fetch districts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const body = await request.json()

    const district = await prisma.district.create({
      data: {
        nameRu: body.nameRu,
        nameEn: body.nameEn,
        nameVi: body.nameVi,
        description: body.description || null,
        order: body.order || 0,
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(district, { status: 201 })
  } catch (error) {
    console.error('Error creating district:', error)
    return NextResponse.json({ error: 'Failed to create district' }, { status: 500 })
  }
}
