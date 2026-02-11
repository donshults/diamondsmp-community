import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function WorkshopPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-blue-400 hover:text-blue-300">← Back to Dashboard</Link>
              <h1 className="text-xl font-bold text-white">Trading with Claude Workshop</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Introduction */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Learn AI-Powered Trading Workflows</h2>
            <p className="text-gray-300 text-lg">
              Discover how Don uses Claude Desktop Projects, databases, and automation 
              to manage his Diamond Money Press trading workflow.
            </p>
          </div>

          {/* Important Disclaimer */}
          <div className="mb-8 p-4 bg-yellow-900 border border-yellow-600 rounded-lg">
            <h3 className="text-yellow-200 font-semibold mb-2">Important Disclaimer</h3>
            <p className="text-yellow-100 text-sm">
              This content reflects Don Shults' personal experience applying AI tools to trading.
              As a brand-new Diamonds trader, information may differ from Alex Rodriguez's official teaching.
              Always defer to Alex's guidance. Not affiliated with Traders Edge Network.
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">📹 Complete Walkthrough Video</h3>
            <p className="text-gray-300 mb-4">
              25-30 minute narrated presentation covering the complete Claude Project setup, 
              daily trading workflow, and real trade execution examples.
            </p>
            <div className="bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <p className="text-gray-400 mb-2">🎬 Video Player</p>
              <p className="text-gray-500 text-sm">Content upload in progress</p>
              <p className="text-gray-500 text-sm">File: trading-with-claude-presentation.mp4</p>
            </div>
          </div>

          {/* Downloadable Documents */}
          <div className="mb-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">📄 Downloadable Resources</h3>
            <div className="space-y-4">
              
              <div className="border border-gray-700 rounded p-4">
                <h4 className="text-white font-medium mb-2">How I Use Claude Desktop Projects for Trading (v2)</h4>
                <p className="text-gray-400 text-sm mb-3">
                  299-line comprehensive walkthrough documenting a real February 10, 2026 trading session.
                </p>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50" disabled>
                  📎 Download PDF (Coming Soon)
                </button>
              </div>

              <div className="border border-gray-700 rounded p-4">
                <h4 className="text-white font-medium mb-2">MP Diamonds Master Strategy Guide (v5.2)</h4>
                <p className="text-gray-400 text-sm mb-3">
                  The living strategy document that Claude and Don maintain collaboratively.
                  Reference document - Don's interpretation, not official Traders Edge content.
                </p>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50" disabled>
                  📎 Download PDF (Coming Soon)
                </button>
              </div>

            </div>
          </div>

          {/* Future Content */}
          <div className="mb-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">🔮 Additional Resources (Planned)</h3>
            <div className="space-y-2 text-gray-400">
              <p>• Claude Project Setup Guide (step-by-step)</p>
              <p>• Context Vault Configuration</p>
              <p>• Neon Database Schema & Setup</p>
              <p>• Trade Ticket System Documentation</p>
              <p>• TradingView Chart Configuration</p>
            </div>
          </div>

          {/* Community Note */}
          <div className="bg-blue-900 border border-blue-600 rounded-lg p-4">
            <h3 className="text-blue-200 font-semibold mb-2">Join the Discussion</h3>
            <p className="text-blue-100 text-sm">
              Community forum launching in Phase 2 with Telegram integration.
              Share your own AI trading workflows and learn from other members!
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}