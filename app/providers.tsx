'use client'

import { SessionProvider } from 'next-auth/react'
import { LocaleProvider } from '@/lib/i18n/context'
import { FavoritesProvider } from '@/lib/favorites'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LocaleProvider>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </LocaleProvider>
    </SessionProvider>
  )
}
