'use client'

import { useState } from 'react'
import { Check, TrendingUp, Shield, Clock, Award, Users, CreditCard, BarChart } from 'lucide-react'

export default function PartnersPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')

  const handleCheckout = async (priceId: string, tierName: string) => {
    setLoading(tierName)
    
    try {
      // Call your API endpoint to create a Stripe checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
      setLoading(null)
    }
  }

  const pricingTiers = [
    {
      name: 'Early Bird',
      monthlyPrice: 399,
      annualPrice: 2993, // 25% discount (9 months for price of 12)
      originalPrice: 799,
      priceIdMonthly: 'price_1Rt4IF2Lnx5KeWpDmY5hmWY0', // Early Bird monthly
      priceIdAnnual: 'price_1Rt4IF2Lnx5KeWpDmY5hmWY0', // Using monthly for now
      features: [
        'First 50 properties only',
        'Price locked forever',
        'Full page customization',
        'Direct booking links',
        'Priority support',
        'Advanced analytics',
        'Lead generation forms',
        'SEO optimization'
      ],
      popular: true,
      limitedOffer: true,
      spotsLeft: 47
    },
    {
      name: 'Standard',
      monthlyPrice: 799,
      annualPrice: 5993, // 25% discount
      priceIdMonthly: 'price_1Rt4I92Lnx5KeWpDlUC6Jw7i', // Standard monthly
      priceIdAnnual: 'price_1Rt4I92Lnx5KeWpDlUC6Jw7i', // Using monthly for now
      features: [
        'Full page control',
        'Direct booking integration',
        'Premium badge',
        'Analytics dashboard',
        'Lead capture forms',
        'Monthly performance reports',
        'Priority in search results',
        'API access'
      ],
      popular: false
    }
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Increase Direct Bookings',
      description: 'Reduce OTA commissions with our powerful direct booking tools'
    },
    {
      icon: Shield,
      title: 'Brand Control',
      description: 'Full control over your property\'s presentation and messaging'
    },
    {
      icon: Clock,
      title: '2-Minute Setup',
      description: 'Get started immediately with pre-built, optimized pages'
    },
    {
      icon: BarChart,
      title: 'Performance Analytics',
      description: 'Track views, inquiries, and conversion rates in real-time'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-display text-2xl font-bold">SuitedStay</div>
          <a href="/" className="text-gray-600 hover:text-gray-900">← Back to Home</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-6">
            <Award className="w-4 h-4" />
            <span className="text-sm font-semibold">Limited Time: First 50 Properties Lock £399/mo Forever</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Luxury Hotel Deserves a Premium Presence
          </h1>
          
          <p className="text-xl text-gray-600 mb-12">
            Join the world's most exclusive hotels on SuitedStay. Reach affluent travelers actively searching for extraordinary experiences.
          </p>

          {/* Sample Performance Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <p className="text-sm text-gray-500 mb-4">Average performance for claimed properties</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-gray-900">1,247</div>
                <div className="text-gray-600">Monthly Views</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">43</div>
                <div className="text-gray-600">Direct Inquiries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">12%</div>
                <div className="text-gray-600">Conversion Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">3×</div>
                <div className="text-gray-600">vs Competitors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl">
                <benefit.icon className="w-8 h-8 text-yellow-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              No setup fees. Cancel anytime. Start getting bookings today.
            </p>

            {/* Temporarily hidden - Annual billing coming soon */}
            {/* <div className="inline-flex items-center gap-4 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  billingPeriod === 'monthly' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  billingPeriod === 'annual' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600'
                }`}
              >
                Annual
                <span className="ml-2 text-green-600 text-sm font-semibold">Save 25%</span>
              </button>
            </div> */}
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`rounded-2xl border-2 p-8 relative ${
                  tier.popular 
                    ? 'border-yellow-400 bg-yellow-50 shadow-xl scale-105' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR - {tier.spotsLeft} SPOTS LEFT
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    {tier.originalPrice && (
                      <span className="text-2xl text-gray-400 line-through">£{tier.originalPrice}</span>
                    )}
                    <span className="text-5xl font-bold text-gray-900">
                      £{tier.monthlyPrice}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleCheckout(tier.priceIdMonthly, tier.name)}
                  disabled={loading !== null}
                  className={`w-full py-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 shadow-lg'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } ${loading === tier.name ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading === tier.name ? (
                    <span className="flex items-center justify-center gap-2">
                      <CreditCard className="w-5 h-5 animate-pulse" />
                      Processing...
                    </span>
                  ) : (
                    'Claim Your Listing Now'
                  )}
                </button>

                {tier.limitedOffer && (
                  <p className="text-center text-sm text-gray-600 mt-4">
                    🔒 Price locked forever for early adopters
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <span>Powered by Stripe</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Join 50+ Hotels</span>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">How quickly can I get started?</h4>
                <p className="text-gray-600">Your property page is already live! Complete the 2-minute checkout and you can start customizing immediately.</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">What's included in the Early Bird offer?</h4>
                <p className="text-gray-600">Everything in the Standard plan, but at £399/month forever instead of £799. This price is locked for as long as you maintain your subscription.</p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
                <p className="text-gray-600">Yes, you can cancel your subscription at any time. No questions asked, no cancellation fees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Increase Your Direct Bookings?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join SuitedStay today and start receiving qualified inquiries from luxury travelers.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Claim Your Listing Now
          </button>
        </div>
      </section>
    </div>
  )
}