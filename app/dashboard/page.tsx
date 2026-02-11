import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Diamonds MP Community</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {session.user?.name}</span>
              <form
                action={async () => {
                  'use server'
                  await signOut({ redirectTo: '/' })
                }}
              >
                <button 
                  type="submit"
                  className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Workshop Card */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🎬</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Trading with Claude</h3>
                    <p className="text-gray-400">Learn how to use Claude Projects for trading</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="/workshop/trading-with-claude"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Start Workshop
                  </Link>
                </div>
              </div>
            </div>

            {/* Community Card */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">💬</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Community Forum</h3>
                    <p className="text-gray-400">Connect with other AI-powered traders</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-400 bg-gray-700">
                    Coming in Phase 2
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Important Disclaimer</h4>
            <p className="text-gray-300 text-sm">
              This platform is independently operated by Don Shults. It is not authorized, endorsed, 
              or affiliated with Traders Edge Network or Alex Rodriguez. The content shared here reflects 
              one trader's personal experience applying AI tools to the Diamond Money Press strategy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}