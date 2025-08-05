import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome to SuitedStay Partners!',
  description: 'Your subscription is confirmed. Welcome to the SuitedStay partner network.',
  robots: 'noindex, follow'
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to SuitedStay!</h1>
        <p className="text-gray-600 mb-8">
          Your subscription is confirmed. We'll be in touch within 24 hours to help you claim and customize your hotel listing.
        </p>
        <a 
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Return to Homepage
        </a>
      </div>
    </div>
  )
}