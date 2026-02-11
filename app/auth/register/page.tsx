import { register } from '@/lib/actions'
import Link from 'next/link'
import { SubmitButton } from '@/components/ui/submit-button'

export default function RegisterPage() {

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg text-sm text-gray-300">
          <p className="font-semibold mb-2">Important Disclaimer:</p>
          <p>
            This platform is independently operated by Don Shults. 
            Not affiliated with Traders Edge Network or Alex Rodriguez.
            Content reflects personal AI tool experience.
          </p>
        </div>

        <form className="mt-8 space-y-6" action={register}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Password (minimum 8 characters)"
              />
            </div>
            <div>
              <label htmlFor="inviteCode" className="sr-only">
                Invite Code
              </label>
              <input
                id="inviteCode"
                name="inviteCode"
                type="text"
                required
                className="relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Invite Code"
              />
            </div>
          </div>

          <div>
            <SubmitButton pendingText="Creating account...">
              Create account
            </SubmitButton>
          </div>
        </form>

        <div className="mt-4 p-3 bg-blue-900 border border-blue-600 text-blue-200 text-sm rounded">
          <p className="font-semibold">Test Invite Codes:</p>
          <p className="text-xs mt-1">DIAMONDS-LAUNCH-2026 • TRADING-WITH-CLAUDE-MVP</p>
        </div>
      </div>
    </div>
  )
}