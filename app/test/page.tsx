export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold">Test Page</h1>
      <p className="mt-4">If you can see this, the Next.js app is working!</p>
      <div className="mt-8 space-y-2">
        <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
        <p><strong>Status:</strong> ✅ App is running</p>
      </div>
    </div>
  )
}