import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{
      background: 'linear-gradient(135deg, #86EFAC 0%, #FECDD3 50%, #FED7AA 100%)',
    }}>
      <div className="text-center">
        <div className="text-8xl mb-6">🌴</div>
        <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Страница не найдена</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Похоже, эта страница уехала во Вьетнам без визы.
          Вернитесь на главную и попробуйте снова.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg transition text-lg"
        >
          ← На главную
        </Link>
      </div>
    </div>
  )
}
