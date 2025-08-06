'use client'

import { useEffect, useState } from 'react'
import { Mail, MapPin, Star } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const FeaturedProperties = () => {
  const [hotels, setHotels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .eq('is_published', true)
          .limit(6)
          .order('overall_score', { ascending: false, nullsFirst: false })

        if (error) {
          console.error('Error fetching hotels:', error)
          setHotels([])
        } else {
          setHotels(data || [])
        }
      } catch (error) {
        console.error('Error:', error)
        setHotels([])
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </section>
    )
  }

  if (hotels.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-gray-600">No hotels available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

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
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
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
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-gray-900 mb-2">
                      {hotel.hotel_name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {hotel.city}{hotel.country ? `, ${hotel.country}` : ''}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    {hotel.overall_score && (
                      <div className="flex items-center mb-1">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-bold text-lg">
                          {hotel.overall_score}
                        </span>
                      </div>
                    )}
                    {hotel.price_indicator && (
                      <div className="text-sm text-gray-600">
                        {hotel.price_indicator}
                      </div>
                    )}
                  </div>
                </div>

                {hotel.reviews_count && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">Performance</p>
                    <p className="text-xs text-gray-600">
                      {hotel.reviews_count} reviews
                    </p>
                  </div>
                )}

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
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties