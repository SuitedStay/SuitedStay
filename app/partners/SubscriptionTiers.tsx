'use client'

import { useState } from 'react'

interface TierProps {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  badge?: string
  popular?: boolean
  priceId: string
}

const Tier = ({ name, price, period, description, features, badge, popular, priceId }: TierProps) => {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId })
      })
      
      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
    }
  }

  return (
    <div className={`relative bg-white rounded-2xl shadow-lg p-8 ${popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
      {badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-amber-400 text-amber-900 px-4 py-1 rounded-full text-sm font-semibold">
            {badge}
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-600 ml-1">{period}</span>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          popular 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-gray-900 hover:bg-gray-800 text-white'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Processing...' : 'Claim Your Listing'}
      </button>
    </div>
  )
}

export default function SubscriptionTiers() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <Tier
        name="Early Bird"
        price="£399"
        period="/month"
        description="First 50 properties - price locked forever"
        badge="LIMITED TIME"
        popular={true}
        priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_EARLY_BIRD!}
        features={[
          "Premium 'Claimed' listing badge",
          "Direct booking link integration",
          "Monthly performance analytics",
          "Priority customer support",
          "Price locked forever",
          "Edit photos and descriptions"
        ]}
      />
      
      <Tier
        name="Standard Claim"
        price="£799"
        period="/month"
        description="Full premium listing with all features"
        priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD!}
        features={[
          "Premium 'Claimed' listing badge",
          "Direct booking link integration", 
          "Monthly performance analytics",
          "Priority customer support",
          "Edit photos and descriptions",
          "Featured placement opportunities"
        ]}
      />
    </div>
  )
}