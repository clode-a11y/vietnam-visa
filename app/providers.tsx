'use client'

import { SessionProvider } from 'next-auth/react'
import { LocaleProvider } from '@/lib/i18n/context'
import { FavoritesProvider } from '@/lib/favorites'
import { RecentlyViewedProvider } from '@/lib/recently-viewed'
import { CompareProvider } from '@/lib/compare'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LocaleProvider>
        <FavoritesProvider>
          <RecentlyViewedProvider>
            <CompareProvider>
              {children}
            </CompareProvider>
          </RecentlyViewedProvider>
        </FavoritesProvider>
      </LocaleProvider>
    </SessionProvider>
  )
}
