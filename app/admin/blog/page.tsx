'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface BlogPost {
  id: string
  slug: string
  titleRu: string
  excerptRu: string
  category: string
  isPublished: boolean
  publishedAt: string | null
  createdAt: string
}

const categoryLabels: Record<string, { label: string; color: string }> = {
  guides: { label: 'Гайды', color: 'blue' },
  news: { label: 'Новости', color: 'green' },
  tips: { label: 'Советы', color: 'orange' },
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog')
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm('Удалить эту статью?')) return

    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setPosts(posts.filter(p => p.id !== id))
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const togglePublish = async (post: BlogPost) => {
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !post.isPublished }),
      })
      if (res.ok) {
        setPosts(posts.map(p =>
          p.id === post.id ? { ...p, isPublished: !p.isPublished } : p
        ))
      }
    } catch (error) {
      console.error('Error toggling publish:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Блог</h1>
          <p className="text-gray-500">Управление статьями ({posts.length})</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Новая статья
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Статья</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Категория</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Статус</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Дата</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  Нет статей
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{post.titleRu}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">{post.excerptRu}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-${categoryLabels[post.category]?.color || 'gray'}-100 text-${categoryLabels[post.category]?.color || 'gray'}-700`}>
                      {categoryLabels[post.category]?.label || post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(post)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full transition ${
                        post.isPublished
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {post.isPublished ? 'Опубликовано' : 'Черновик'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {post.isPublished && (
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                          title="Просмотр"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-green-600 hover:text-green-700 font-medium text-sm"
                      >
                        Редактировать
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
