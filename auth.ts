import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { authDb } from '@/lib/auth-db'
import authConfig from '@/auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(authDb),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.tier = user.tier || 'FREE'
      }
      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.tier = (token.tier as string) || 'FREE'
      }
      return session
    },
  },
  ...authConfig,
})