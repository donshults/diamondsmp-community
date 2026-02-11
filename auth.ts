import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // Temporarily remove Prisma adapter to test
  // adapter: PrismaAdapter(db),
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