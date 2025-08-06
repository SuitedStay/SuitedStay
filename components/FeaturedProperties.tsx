'use client'

import { useEffect, useState } from 'react'
import { Mail, MapPin, Star } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// This will work on Vercel with your environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)


const FeaturedProperties = () => {
  const [hotels, setHotels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        // Fetch real hotels from Supabase
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .eq('is_published', true)
          .limit(6)
          .order('overall_score', { ascending: false })

        if (error) {
          console.error('Supabase error:', error)
          // Use fallback data if no hotels in database
          setHotels(getFallbackHotels())
        } else if (!data || data.length === 0) {
          // Use fallback if no hotels exist
          setHotels(getFallbackHotels())
        } else {
          setHotels(data)
        }
      } catch (error) {
        console.error('Error fetching hotels:', error)
        setHotels(getFallbackHotels())
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  // Fallback hotels for when database is empty
  const getFallbackHotels = () => [
    {
      hotel_name: 'Aman Tokyo',
      city: 'Tokyo',
      country: 'Japan',
      overall_score: 9.2,
      price_range: '$800-1,200',
      price_indicator: '$$$$',
      slug: 'aman-tokyo',
      claimed_status: true,
      address: 'Otemachi, Tokyo',
      description: 'Urban sanctuary in the heart of Tokyo',
      hero_photo_url: 'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=800'
    },
    {
      hotel_name: 'Four Seasons George V',
      city: 'Paris', 
      country: 'France',
      overall_score: 9.1,
      price_range: '$1,200-2,000',
      price_indicator: '$$$$$',
      slug: 'four-seasons-george-v',
      claimed_status: false,
      address: '8th Arrondissement, Paris',
      description: 'Legendary luxury just off the Champs-Élysées',
      hero_photo_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
    },
    {
      hotel_name: 'Burj Al Arab',
      city: 'Dubai',
      country: 'UAE',
      overall_score: 8.9,
      price_range: '$2,000-5,000',
      price_indicator: '$$$$$',
      slug: 'burj-al-arab',
      claimed_status: true,
      address: 'Jumeirah, Dubai',
      description: 'The world\'s most luxurious hotel',
      hero_photo_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800'
    },
    {
      hotel_name: 'The Oberoi Udaivilas',
      city: 'Udaipur',
      country: 'India',
      overall_score: 9.3,
      price_range: '$600-1,000',
      price_indicator: '$$$$',
      slug: 'oberoi-udaivilas',
      claimed_status: false,
      address: 'Lake Pichola, Udaipur',
      description: 'Palatial hotel on the banks of Lake Pichola',
      hero_photo_url: 'https://images.unsplash.com/photo-1585418702352-5d0e26b1becc?w=800'
    },
    {
      hotel_name: 'Mandarin Oriental Bangkok',
      city: 'Bangkok',
      country: 'Thailand',
      overall_score: 9.0,
      price_range: '$400-800',
      price_indicator: '$$$',
      slug: 'mandarin-oriental-bangkok',
      claimed_status: true,
      address: 'Riverside, Bangkok',
      description: 'Legendary riverside luxury since 1876',
      hero_photo_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    },
    {
      hotel_name: 'The Ritz-Carlton Kyoto',
      city: 'Kyoto',
      country: 'Japan',
      overall_score: 9.4,
      price_range: '$700-1,500',
      price_indicator: '$$$$',
      slug: 'ritz-carlton-kyoto',
      claimed_status: false,
      address: 'Kamogawa River, Kyoto',
      description: 'Modern luxury meets ancient tradition',
      hero_photo_url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800'
    }
  ]

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading featured properties...</p>
          </div>
        </div>
      </section>
    )
  }

  // Generate mock performance data
  const getPerformanceData = (index: number) => ({
    monthlyViews: 800 + (index * 200) + Math.floor(Math.random() * 500),
    inquiries: 20 + (index * 5) + Math.floor(Math.random() * 20)
  })

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked ultra-luxury accommodations from our premium collection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => {
            const performance = getPerformanceData(index)
            return (
              <div key={hotel.slug || index} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200 relative">
                  {hotel.hero_photo_url && (
                    <img 
                      src={hotel.hero_photo_url} 
                      alt={hotel.hotel_name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {hotel.claimed_status && (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        Premium Listing
                      </span>
                    )}
                    {index === 0 && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Recently Claimed
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-xl text-gray-900 mb-2">
                        {hotel.hotel_name}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{hotel.city}, {hotel.country}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-bold text-lg">
                          {hotel.overall_score ? hotel.overall_score.toFixed(1) : 'N/A'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {hotel.price_indicator || '$$$'}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">Performance</p>
                    <p className="text-xs text-gray-600">
                      {performance.monthlyViews.toLocaleString()} views • {performance.inquiries} inquiries this month
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <a 
                      href={`/hotels/${hotel.slug}`}
                      className="flex-1 text-center py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      View Details
                    </a>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties