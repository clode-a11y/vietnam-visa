import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { path, secret } = await request.json()

    // Simple secret check (in production, use a proper secret)
    const expectedSecret = process.env.REVALIDATION_SECRET || 'revalidate-secret-2024'
    if (secret !== expectedSecret) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    revalidatePath(path)

    return NextResponse.json({
      success: true,
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
  }
}
