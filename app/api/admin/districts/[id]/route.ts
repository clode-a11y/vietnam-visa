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

    const district = await prisma.district.findUnique({
      where: { id },
      include: {
        _count: {
          select: { apartments: true },
        },
      },
    })

    if (!district) {
      return NextResponse.json({ error: 'District not found' }, { status: 404 })
    }

    return NextResponse.json(district)
  } catch (error) {
    console.error('Error fetching district:', error)
    return NextResponse.json({ error: 'Failed to fetch district' }, { status: 500 })
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

    const district = await prisma.district.update({
      where: { id },
      data: {
        nameRu: body.nameRu,
        nameEn: body.nameEn,
        nameVi: body.nameVi,
        description: body.description || null,
        order: body.order || 0,
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(district)
  } catch (error) {
    console.error('Error updating district:', error)
    return NextResponse.json({ error: 'Failed to update district' }, { status: 500 })
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

    await prisma.district.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting district:', error)
    return NextResponse.json({ error: 'Failed to delete district' }, { status: 500 })
  }
}
