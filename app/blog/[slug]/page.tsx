import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Header from '../../components/Header'

export const dynamic = 'force-dynamic'

async function getBlogPost(slug: string) {
  try {
    if (!prisma) return null
    return await prisma.blogPost.findUnique({
      where: { slug, isPublished: true },
    })
  } catch {
    return null
  }
}

const categoryLabels: Record<string, { label: string; color: string }> = {
  guides: { label: 'Гайды', color: 'bg-blue-100 text-blue-700' },
  news: { label: 'Новости', color: 'bg-green-100 text-green-700' },
  tips: { label: 'Советы', color: 'bg-orange-100 text-orange-700' },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />

      <main className="pt-24 pb-16 px-6 min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-orange-50">
        <article className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-green-600">Главная</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-green-600">Блог</Link></li>
              <li>/</li>
              <li className="text-gray-700 truncate max-w-[200px]">{post.titleRu}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${categoryLabels[post.category]?.color || 'bg-gray-100 text-gray-700'}`}>
                {categoryLabels[post.category]?.label || post.category}
              </span>
              <span className="text-sm text-gray-500">{post.readTime} мин чтения</span>
            </div>
            <h1 className="text-4xl font-black mb-4 leading-tight">{post.titleRu}</h1>
            <p className="text-xl text-gray-600">{post.excerptRu}</p>
            {post.publishedAt && (
              <p className="text-sm text-gray-400 mt-4">
                {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-8 rounded-3xl overflow-hidden shadow-lg">
              <img
                src={post.coverImage}
                alt={post.titleRu}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-lg border border-white/50">
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: formatContent(post.contentRu) }}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 text-gray-700 font-semibold rounded-xl hover:bg-white transition"
            >
              ← Все статьи
            </Link>
          </div>
        </article>
      </main>

      <footer className="py-8 px-6 border-t border-gray-100 bg-white/50">
        <div className="max-w-5xl mx-auto text-center">
          <Link href="/" className="text-green-600 hover:underline">
            ← Вернуться на главную
          </Link>
        </div>
      </footer>
    </>
  )
}

// Simple markdown-like formatting
function formatContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Lists
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Wrap in paragraph
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<h') || match.startsWith('<li') || match.startsWith('<p') || match.startsWith('</p')) {
        return match
      }
      return `<p>${match}</p>`
    })
}
