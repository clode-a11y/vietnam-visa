import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

// Fallback admin user when database is not connected
const FALLBACK_ADMIN = {
  id: '1',
  email: 'admin@vietvisa.com',
  // Password: admin123
  password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lLLyOaZ.2G',
  name: 'Admin',
  role: 'admin',
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          let user = null

          // Try database first if available
          if (prisma) {
            user = await prisma.user.findUnique({
              where: { email: credentials.email },
            })
          }

          // Fallback to hardcoded admin if no database
          if (!user && credentials.email === FALLBACK_ADMIN.email) {
            user = FALLBACK_ADMIN
          }

          if (!user) {
            return null
          }

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, user.password)

          if (!isValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('Auth error:', error)

          // Fallback to hardcoded admin on database error
          if (credentials.email === FALLBACK_ADMIN.email) {
            const isValid = await bcrypt.compare(credentials.password, FALLBACK_ADMIN.password)
            if (isValid) {
              return {
                id: FALLBACK_ADMIN.id,
                email: FALLBACK_ADMIN.email,
                name: FALLBACK_ADMIN.name,
                role: FALLBACK_ADMIN.role,
              }
            }
          }
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev',
}
