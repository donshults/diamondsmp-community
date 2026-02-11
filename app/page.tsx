import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Diamonds MP Community
          </h1>
          <p className="text-gray-400 mb-8">
            Learn how to use AI tools for Diamond Money Press trading
          </p>
          <div className="space-y-4">
            <Link
              href="/auth/login"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors block text-center"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors block text-center"
            >
              Register with Invite Code
            </Link>
          </div>
          <div className="mt-8 p-4 bg-gray-800 rounded-lg text-sm text-gray-300">
            <p className="font-semibold mb-2">Important Disclaimer:</p>
            <p>
              This platform is independently operated by Don Shults. 
              Not affiliated with Traders Edge Network or Alex Rodriguez.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}