import Link from 'next/link'

export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Authentication Test</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-900 border border-green-600 rounded">
            <h2 className="text-xl font-semibold">✅ Working Routes</h2>
            <ul className="mt-2 space-y-1">
              <li>• Homepage (no auth): <Link href="/" className="text-blue-400 hover:underline">https://diamondsmp.iamdonshults.com/</Link></li>
              <li>• Debug API: <Link href="/api/debug" className="text-blue-400 hover:underline">/api/debug</Link></li>
              <li>• Test Page: <Link href="/test" className="text-blue-400 hover:underline">/test</Link></li>
            </ul>
          </div>
          
          <div className="p-4 bg-red-900 border border-red-600 rounded">
            <h2 className="text-xl font-semibold">❌ Failing Routes (Server Error)</h2>
            <ul className="mt-2 space-y-1">
              <li>• Login: <Link href="/auth/login" className="text-blue-400 hover:underline">/auth/login</Link></li>
              <li>• Register: <Link href="/auth/register" className="text-blue-400 hover:underline">/auth/register</Link></li>
            </ul>
          </div>
          
          <div className="p-4 bg-yellow-900 border border-yellow-600 rounded">
            <h2 className="text-xl font-semibold">🔍 Diagnosis</h2>
            <p className="mt-2">The server error is happening specifically on authentication routes. This suggests:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>NextAuth initialization problems</li>
              <li>Database connection issues when auth tries to connect</li>
              <li>Prisma adapter configuration problems</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8">
          <Link 
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}