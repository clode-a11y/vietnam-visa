import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Некорректный email' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSubscription.findUnique({
      where: { email },
    })

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { error: 'Вы уже подписаны на рассылку' },
          { status: 400 }
        )
      }
      // Reactivate subscription
      await prisma.newsletterSubscription.update({
        where: { email },
        data: { isActive: true },
      })
      return NextResponse.json({ success: true, reactivated: true })
    }

    // Create new subscription
    await prisma.newsletterSubscription.create({
      data: { email },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const count = await prisma.newsletterSubscription.count({
      where: { isActive: true },
    })
    return NextResponse.json({ subscribers: count })
  } catch {
    return NextResponse.json({ subscribers: 0 })
  }
}
