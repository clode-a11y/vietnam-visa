import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json([])
    }

    const districts = await prisma.district.findMany({
      where: { isActive: true },
      select: {
        id: true,
        nameRu: true,
        nameEn: true,
        nameVi: true,
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(districts)
  } catch (error) {
    console.error('Error fetching districts:', error)
    return NextResponse.json([])
  }
}
