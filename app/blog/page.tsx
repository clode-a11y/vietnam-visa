import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Header from '../components/Header'

// ISR: revalidate every 2 minutes
export const revalidate = 120

async function getBlogPosts() {
  try {
    if (!prisma) return []
    return await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    })
  } catch {
    return []
  }
}

const categoryLabels: Record<string, { label: string; color: string }> = {
  guides: { label: 'Гайды', color: 'bg-teal-100 text-teal-700' },
  news: { label: 'Новости', color: 'bg-green-100 text-green-700' },
  tips: { label: 'Советы', color: 'bg-orange-100 text-orange-700' },
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <Header />

      <main className="pt-24 pb-16 px-6 min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-orange-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-400 bg-clip-text text-transparent">Блог о визах</h1>
            <p className="text-lg text-gray-600">Полезные статьи, новости и советы для путешественников</p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Пока нет статей</h2>
              <p className="text-gray-500">Скоро здесь появятся полезные материалы</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all"
                >
                  {post.coverImage && (
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.titleRu}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryLabels[post.category]?.color || 'bg-gray-100 text-gray-700'}`}>
                        {categoryLabels[post.category]?.label || post.category}
                      </span>
                      <span className="text-xs text-gray-400">{post.readTime} мин</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition-colors">
                      {post.titleRu}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.excerptRu}
                    </p>
                    {post.publishedAt && (
                      <p className="text-xs text-gray-400 mt-4">
                        {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 px-6 border-t border-gray-100 bg-white/50">
        <div className="max-w-5xl mx-auto text-center">
          <Link href="/" className="text-teal-600 hover:underline">
            ← Вернуться на главную
          </Link>
        </div>
      </footer>
    </>
  )
}
