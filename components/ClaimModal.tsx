'use client'

import { X, Check } from 'lucide-react'

interface ClaimModalProps {
  isOpen: boolean
  onClose: () => void
}

const ClaimModal = ({ isOpen, onClose }: ClaimModalProps) => {
  if (!isOpen) return null

  const pricingTiers = [
    {
      name: 'Premium Listing',
      price: '£99',
      period: '/month',
      features: [
        'Light page editing',
        'Contact CTA button',
        'Premium badge',
        'Basic analytics'
      ],
      popular: false
    },
    {
      name: 'Early-bird Claim',
      price: '£299',
      period: '/month',
      features: [
        'First 50 hotels only',
        'Price locked forever',
        'Full page control',
        'Priority support',
        'Advanced analytics'
      ],
      popular: true,
      originalPrice: '£499'
    },
    {
      name: 'Standard Claim',
      price: '£499',
      period: '/month',
      features: [
        'Full page editing',
        'Lead generation',
        'Premium badge',
        'Detailed analytics',
        'Priority placement'
      ],
      popular: false
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Claim Your Property Page</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Sample Analytics */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Sample Performance Analytics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">1,247</div>
                <div className="text-gray-600">Monthly Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">43</div>
                <div className="text-gray-600">Inquiries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">3×</div>
                <div className="text-gray-600">vs Competitor</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">12%</div>
                <div className="text-gray-600">Conversion Rate</div>
              </div>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`rounded-xl border-2 p-6 relative ${
                  tier.popular 
                    ? 'border-yellow-400 bg-yellow-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    {tier.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">{tier.originalPrice}</span>
                    )}
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-600">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    tier.popular
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Start 2-Minute Setup
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Annual plans available with 25% discount • No setup fees • Cancel anytime
            </p>
            <button className="text-gray-900 font-semibold hover:underline">
              Have questions? Contact our team →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClaimModal