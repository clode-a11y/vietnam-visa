import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { del } from '@vercel/blob'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const { id } = await params

    const images = await prisma.apartmentImage.findMany({
      where: { apartmentId: id },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 })
    }

    const { id } = await params
    const body = await request.json()

    // Get current max order
    const maxOrder = await prisma.apartmentImage.findFirst({
      where: { apartmentId: id },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const image = await prisma.apartmentImage.create({
      data: {
        url: body.url,
        order: (maxOrder?.order ?? -1) + 1,
        isCover: body.isCover ?? false,
        apartmentId: id,
      },
    })

    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error('Error creating image:', error)
    return NextResponse.json({ error: 'Failed to create image' }, { status: 500 })
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

    // Update image orders
    if (body.images && Array.isArray(body.images)) {
      await Promise.all(
        body.images.map((img: { id: string; order: number; isCover?: boolean }, index: number) =>
          prisma!.apartmentImage.update({
            where: { id: img.id },
            data: {
              order: index,
              isCover: img.isCover ?? false,
            },
          })
        )
      )
    }

    const images = await prisma.apartmentImage.findMany({
      where: { apartmentId: id },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(images)
  } catch (error) {
    console.error('Error updating images:', error)
    return NextResponse.json({ error: 'Failed to update images' }, { status: 500 })
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

    const { searchParams } = new URL(request.url)
    const imageId = searchParams.get('imageId')

    if (!imageId) {
      return NextResponse.json({ error: 'Image ID required' }, { status: 400 })
    }

    // Get the image to delete from blob storage
    const image = await prisma.apartmentImage.findUnique({
      where: { id: imageId },
    })

    if (image) {
      // Delete from blob storage
      try {
        await del(image.url)
      } catch (e) {
        console.error('Error deleting from blob:', e)
      }

      // Delete from database
      await prisma.apartmentImage.delete({
        where: { id: imageId },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
  }
}
