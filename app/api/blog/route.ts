import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 })
  }

  try {
    const body = await request.json()

    // Generate slug from title if not provided
    const slug = body.slug || body.titleRu
      .toLowerCase()
      .replace(/[^a-zа-яё0-9\s-]/gi, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 100)

    const post = await prisma.blogPost.create({
      data: {
        slug,
        titleRu: body.titleRu,
        titleEn: body.titleEn || null,
        excerptRu: body.excerptRu,
        excerptEn: body.excerptEn || null,
        contentRu: body.contentRu,
        contentEn: body.contentEn || null,
        coverImage: body.coverImage || null,
        category: body.category || 'guides',
        tags: body.tags || [],
        readTime: body.readTime || 5,
        isPublished: body.isPublished || false,
        publishedAt: body.isPublished ? new Date() : null,
      },
    })
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
