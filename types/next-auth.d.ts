import { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  tier: string
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
  
  interface User {
    tier?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    tier?: string
  }
}