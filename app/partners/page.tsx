import { Metadata } from 'next'
import { Suspense } from 'react'
import SubscriptionTiers from './SubscriptionTiers'

export const metadata: Metadata = {
  title: 'Partner with SuitedStay - Claim Your Hotel Listing',
  description: 'Join SuitedStay\'s exclusive network of luxury hotels. Claim your listing and start receiving qualified bookings from discerning travelers.',
  openGraph: {
    title: 'Partner with SuitedStay',
    description: 'Claim your luxury hotel listing and join our exclusive network',
    url: 'https://suitedstay.com/partners',
  }
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Partner with SuitedStay
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join our exclusive network of luxury hotels and start receiving qualified bookings 
            from discerning travelers worldwide.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-amber-800 font-semibold">
              ⏰ Early Bird Special: First 50 properties lock £399/mo forever
            </p>
          </div>
        </div>

        {/* Subscription Tiers */}
        <Suspense fallback={<div className="text-center">Loading pricing...</div>}>
          <SubscriptionTiers />
        </Suspense>

        {/* Benefits Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Increase Direct Bookings</h3>
            <p className="text-gray-600">Drive qualified traffic directly to your booking system, reducing OTA commissions.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Listing</h3>
            <p className="text-gray-600">Stand out with our exclusive "Claimed" badge and detailed property information.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Analytics</h3>
            <p className="text-gray-600">Monthly reports showing views, engagement, and booking performance vs competitors.</p>
          </div>
        </div>
      </div>
    </div>
  )
}