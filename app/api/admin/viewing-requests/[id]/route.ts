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

    const viewingRequest = await prisma.viewingRequest.findUnique({
      where: { id },
      include: {
        apartment: true,
      },
    })

    if (!viewingRequest) {
      return NextResponse.json({ error: 'Viewing request not found' }, { status: 404 })
    }

    return NextResponse.json(viewingRequest)
  } catch (error) {
    console.error('Error fetching viewing request:', error)
    return NextResponse.json({ error: 'Failed to fetch viewing request' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const { id } = await params
    const body = await request.json()

    const viewingRequest = await prisma.viewingRequest.update({
      where: { id },
      data: {
        status: body.status,
      },
    })

    return NextResponse.json(viewingRequest)
  } catch (error) {
    console.error('Error updating viewing request:', error)
    return NextResponse.json({ error: 'Failed to update viewing request' }, { status: 500 })
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

    await prisma.viewingRequest.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting viewing request:', error)
    return NextResponse.json({ error: 'Failed to delete viewing request' }, { status: 500 })
  }
}
