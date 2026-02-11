import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { getUserByEmail } from '@/lib/data'

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
          
          try {
            const user = await getUserByEmail(email)
            if (!user || !user.password) return null
            
            const passwordsMatch = await bcrypt.compare(password, user.password)
            
            if (passwordsMatch) {
              return {
                id: user.id,
                email: user.email,
                name: user.name,
                tier: user.tier,
              }
            }
          } catch (error) {
            console.error('Auth error:', error)
            return null
          }
        }
        
        return null
      },
    }),
  ],
} satisfies NextAuthConfig