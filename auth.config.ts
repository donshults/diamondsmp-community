import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export default {
  trustHost: true,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials)
        
        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          
          // Temporary test user - bypass database for now
          if (email === 'test@example.com' && password === 'test123') {
            return {
              id: '1',
              email: 'test@example.com',
              name: 'Test User',
              tier: 'FREE',
            }
          }
        }
        
        return null
      },
    }),
  ],
} satisfies NextAuthConfig