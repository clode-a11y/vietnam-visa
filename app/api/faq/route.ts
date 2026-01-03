import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(faqs)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const body = await request.json()

    const faq = await prisma.fAQ.create({
      data: {
        question: body.question,
        answer: body.answer,
        category: body.category || 'general',
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(faq, { status: 201 })
  } catch (error) {
    console.error('Error creating FAQ:', error)
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
  }
}
