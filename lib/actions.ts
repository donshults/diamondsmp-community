'use server'

// NextAuth v5 imports - signIn from configured auth instance
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { db } from './db'
import { validateInviteCode, useInviteCode } from './data'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { redirect } from 'next/navigation'

const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  inviteCode: z.string().min(1, 'Invite code is required'),
})

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export async function register(formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
    inviteCode: formData.get('inviteCode'),
  })

  if (!validatedFields.success) {
    throw new Error('Invalid form data')
  }

  const { email, password, name, inviteCode } = validatedFields.data

  // Validate invite code
  console.log('Validating invite code:', inviteCode)
  const isValidCode = await validateInviteCode(inviteCode)
  console.log('Invite code validation result:', isValidCode)
  
  if (!isValidCode) {
    throw new Error('Invalid or expired invite code')
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new Error('User with this email already exists')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    // Create user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        inviteCodeUsed: inviteCode,
        tier: 'FREE',
      },
    })

    // Use invite code
    await useInviteCode(inviteCode)

    console.log('User created successfully:', user.email)
    
    // Redirect to login with success message
    redirect('/auth/login?message=Registration successful. Please log in.')
  } catch (error) {
    console.error('Registration error:', error)
    throw new Error('Failed to create account')
  }
}

export async function login(formData: FormData) {
  console.log('🔍 Login action called')
  
  try {
    const validatedFields = LoginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (!validatedFields.success) {
      console.error('❌ Validation failed:', validatedFields.error)
      throw new Error('Invalid form data')
    }

    const { email, password } = validatedFields.data
    console.log('🔍 Attempting login for:', email)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // Don't redirect, handle manually
    })
    
    console.log('✅ SignIn result:', result)
    
    // Manual redirect after successful login
    if (result?.error) {
      throw new Error('Invalid email or password')
    }
    
    redirect('/dashboard')
  } catch (error) {
    console.error('❌ Login error:', error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          throw new Error('Invalid email or password')
        default:
          throw new Error('Something went wrong: ' + error.message)
      }
    }
    throw error
  }
}