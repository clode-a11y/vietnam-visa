import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const { id } = await params
    const visaType = await prisma.visaType.findUnique({
      where: { id },
    })

    if (!visaType) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(visaType)
  } catch (error) {
    console.error('Error fetching visa type:', error)
    return NextResponse.json({ error: 'Failed to fetch visa type' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const { id } = await params
    const body = await request.json()

    const visaType = await prisma.visaType.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(visaType)
  } catch (error) {
    console.error('Error updating visa type:', error)
    return NextResponse.json({ error: 'Failed to update visa type' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const { id } = await params
    await prisma.visaType.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting visa type:', error)
    return NextResponse.json({ error: 'Failed to delete visa type' }, { status: 500 })
  }
}
