'use client'

import { useState } from 'react'

export default function SetPasswordPage() {
  const [email, setEmail] = useState('don@donshults.me')
  const [password, setPassword] = useState('test123')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(`✅ SUCCESS: Password set for ${data.user.email}`)
      } else {
        setResult(`❌ ERROR: ${data.error}`)
      }
    } catch (err) {
      setResult('❌ Network error')
      console.error('Set password error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Set Password for Testing
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Set a password for an existing user to test login
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email (existing user)
              </label>
              <select
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="don@donshults.me">don@donshults.me (FREE)</option>
                <option value="don@iamdonshults.com">don@iamdonshults.com (PRO)</option>
              </select>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="text"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Setting password...' : 'Set Password'}
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-4 p-3 bg-gray-800 border border-gray-600 text-white text-sm rounded">
            {result}
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-900 border border-blue-600 text-blue-200 text-sm rounded">
          <p><strong>Steps:</strong></p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Set password here</li>
            <li>Go to <a href="/simple-login" className="text-blue-400 hover:underline">/simple-login</a></li>
            <li>Login with the email and password</li>
            <li>Should redirect to dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  )
}