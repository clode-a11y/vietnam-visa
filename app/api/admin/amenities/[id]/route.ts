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

    const amenity = await prisma.amenity.findUnique({
      where: { id },
      include: {
        _count: {
          select: { apartments: true },
        },
      },
    })

    if (!amenity) {
      return NextResponse.json({ error: 'Amenity not found' }, { status: 404 })
    }

    return NextResponse.json(amenity)
  } catch (error) {
    console.error('Error fetching amenity:', error)
    return NextResponse.json({ error: 'Failed to fetch amenity' }, { status: 500 })
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

    const amenity = await prisma.amenity.update({
      where: { id },
      data: {
        nameRu: body.nameRu,
        nameEn: body.nameEn,
        nameVi: body.nameVi,
        icon: body.icon,
        category: body.category,
      },
    })

    return NextResponse.json(amenity)
  } catch (error) {
    console.error('Error updating amenity:', error)
    return NextResponse.json({ error: 'Failed to update amenity' }, { status: 500 })
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

    await prisma.amenity.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting amenity:', error)
    return NextResponse.json({ error: 'Failed to delete amenity' }, { status: 500 })
  }
}
