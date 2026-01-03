import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const [
      totalRequests,
      newRequests,
      todayRequests,
      weekRequests,
      activeVisaTypes,
      totalVisaTypes,
      activeFaqs,
      totalFaqs,
      recentRequests,
      requestsByStatus,
      // Viewing requests stats
      totalViewingRequests,
      newViewingRequests,
      todayViewingRequests,
      weekViewingRequests,
      viewingRequestsByStatus,
      viewingRequestsByType,
      recentViewingRequests,
      totalApartments,
      availableApartments,
    ] = await Promise.all([
      prisma.contactRequest.count(),
      prisma.contactRequest.count({ where: { status: 'new' } }),
      prisma.contactRequest.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.contactRequest.count({ where: { createdAt: { gte: weekAgo } } }),
      prisma.visaType.count({ where: { isActive: true } }),
      prisma.visaType.count(),
      prisma.fAQ.count({ where: { isActive: true } }),
      prisma.fAQ.count(),
      prisma.contactRequest.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.contactRequest.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      // Viewing requests
      prisma.viewingRequest.count(),
      prisma.viewingRequest.count({ where: { status: 'new' } }),
      prisma.viewingRequest.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.viewingRequest.count({ where: { createdAt: { gte: weekAgo } } }),
      prisma.viewingRequest.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      prisma.viewingRequest.groupBy({
        by: ['type'],
        _count: { type: true },
      }),
      prisma.viewingRequest.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          apartment: {
            select: { titleRu: true },
          },
        },
      }),
      prisma.apartment.count(),
      prisma.apartment.count({ where: { isAvailable: true } }),
    ])

    const statusCounts = requestsByStatus.reduce((acc, item) => {
      acc[item.status] = item._count.status
      return acc
    }, {} as Record<string, number>)

    const viewingStatusCounts = viewingRequestsByStatus.reduce((acc, item) => {
      acc[item.status] = item._count.status
      return acc
    }, {} as Record<string, number>)

    const viewingTypeCounts = viewingRequestsByType.reduce((acc, item) => {
      acc[item.type] = item._count.type
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      requests: {
        total: totalRequests,
        new: newRequests,
        today: todayRequests,
        week: weekRequests,
        byStatus: statusCounts,
      },
      visaTypes: {
        total: totalVisaTypes,
        active: activeVisaTypes,
      },
      faqs: {
        total: totalFaqs,
        active: activeFaqs,
      },
      recentRequests: recentRequests.map(r => ({
        id: r.id,
        name: r.name,
        visaType: r.visaType,
        status: r.status,
        createdAt: r.createdAt,
      })),
      // Viewing requests (rent)
      viewingRequests: {
        total: totalViewingRequests,
        new: newViewingRequests,
        today: todayViewingRequests,
        week: weekViewingRequests,
        byStatus: viewingStatusCounts,
        byType: viewingTypeCounts,
      },
      recentViewingRequests: recentViewingRequests.map(r => ({
        id: r.id,
        name: r.name,
        type: r.type,
        status: r.status,
        apartmentTitle: r.apartment?.titleRu || '',
        createdAt: r.createdAt,
      })),
      apartments: {
        total: totalApartments,
        available: availableApartments,
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
