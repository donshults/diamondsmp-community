import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // Use JWT-only strategy for now - no database adapter
  // This avoids Prisma adapter issues while keeping user auth working
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Store user data in JWT token
      if (user) {
        token.tier = user.tier || 'FREE'
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      // Pass user data from token to session
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.tier = (token.tier as string) || 'FREE'
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  ...authConfig,
})