'use client'

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Hotel {
  id: string
  hotel_name: string
  slug: string
  city: string
  country: string
  description: string
  address: string
  hero_photo_url: string
  overall_score: number
  star_rating_icons: string
  star_rating_text: string
  price_indicator: string
  price_range: string
  tags: string[]
  amenities: string[]
  accommodation_quality_score: number
  dining_amenities_score: number
  ambience_design_score: number
  value_service_score: number
  location_accessibility_score: number
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [sortBy, setSortBy] = useState('rating_desc')
  
  // Filter states
  const [selectedAwards, setSelectedAwards] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedStarRatings, setSelectedStarRatings] = useState<number[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  // Available options
  const [availableCountries, setAvailableCountries] = useState<string[]>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [availableAmenities, setAvailableAmenities] = useState<string[]>([])
  const [availableAwards, setAvailableAwards] = useState<string[]>([])

  const hotelTypes = [
    'Beach Resorts',
    'Boutique Hotels',
    'Airport Hotels',
    'Serviced Apartments',
    'Budget Hotels'
  ]

  const starRatings = [
    { value: 5, label: '★★★★★' },
    { value: 4, label: '★★★★' },
    { value: 3, label: '★★★' }
  ]

  const priceRanges = ['$', '$$', '$$$', '$$$$']

  useEffect(() => {
    fetchHotels()
  }, [])

  useEffect(() => {
    if (hotels.length > 0) {
      extractFilterOptions()
      filterAndSortHotels()
    }
  }, [hotels, selectedAwards, selectedTypes, selectedCountry, selectedCity, selectedStarRatings, selectedPrices, selectedAmenities, sortBy])

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('overall_score', { ascending: false })

      if (error) throw error

      setHotels(data || [])
    } catch (err) {
      console.error('Error fetching hotels:', err)
      setError('Failed to load hotels')
    } finally {
      setLoading(false)
    }
  }

  const extractFilterOptions = () => {
    const countries = new Set<string>()
    const cities = new Set<string>()
    const amenities = new Set<string>()
    const awards = new Set<string>()

    hotels.forEach(hotel => {
      if (hotel.country) countries.add(hotel.country)
      if (hotel.city) cities.add(hotel.city)
      
      if (hotel.tags && Array.isArray(hotel.tags)) {
        hotel.tags.forEach(tag => {
          if (['Ultra-Luxury', 'Exceptional Experience', 'Best Value', 'Top Choice'].includes(tag)) {
            awards.add(tag)
          }
        })
      }
      
      if (hotel.amenities && Array.isArray(hotel.amenities)) {
        hotel.amenities.forEach(amenity => amenities.add(amenity))
      }
    })

    setAvailableCountries(Array.from(countries).sort())
    setAvailableCities(Array.from(cities).sort())
    setAvailableAmenities(Array.from(amenities).sort())
    setAvailableAwards(Array.from(awards).sort())
  }

  const filterAndSortHotels = () => {
    let filtered = hotels.filter(hotel => {
      // Awards filter
      if (selectedAwards.length > 0) {
        const hasAward = selectedAwards.some(award => 
          hotel.tags && hotel.tags.includes(award)
        )
        if (!hasAward) return false
      }

      // Types filter
      if (selectedTypes.length > 0) {
        const hasType = selectedTypes.some(type => 
          hotel.tags && hotel.tags.includes(type)
        )
        if (!hasType) return false
      }

      // Country filter
      if (selectedCountry && hotel.country !== selectedCountry) {
        return false
      }

      // City filter
      if (selectedCity && hotel.city !== selectedCity) {
        return false
      }

      // Star rating filter
      if (selectedStarRatings.length > 0) {
        const starCount = hotel.star_rating_icons ? hotel.star_rating_icons.length : 0
        if (!selectedStarRatings.includes(starCount)) return false
      }

      // Price filter
      if (selectedPrices.length > 0) {
        if (!selectedPrices.includes(hotel.price_indicator)) return false
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAmenity = selectedAmenities.some(amenity => 
          hotel.amenities && hotel.amenities.includes(amenity)
        )
        if (!hasAmenity) return false
      }

      return true
    })

    // Sort hotels
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating_desc':
          return (b.overall_score || 0) - (a.overall_score || 0)
        case 'rating_asc':
          return (a.overall_score || 0) - (b.overall_score || 0)
        case 'name_asc':
          return (a.hotel_name || '').localeCompare(b.hotel_name || '')
        case 'price_asc':
          const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 }
          return (priceOrder[a.price_indicator as keyof typeof priceOrder] || 0) - 
                 (priceOrder[b.price_indicator as keyof typeof priceOrder] || 0)
        default:
          return 0
      }
    })

    setFilteredHotels(filtered)
  }

  const HotelCard = ({ hotel }: { hotel: Hotel }) => (
    <div 
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => window.location.href = `/hotels/${hotel.slug}`}
    >
      <div className="relative">
        {hotel.hero_photo_url ? (
          <img src={hotel.hero_photo_url} alt={hotel.hotel_name} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
        )}
        
        {hotel.overall_score && (
          <div className="absolute top-3 right-3">
            <span className="bg-green-500 text-white font-semibold px-2 py-1 rounded-lg text-sm">
              {hotel.overall_score}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{hotel.hotel_name}</h3>
        </div>
        
        {hotel.address && (
          <p className="text-sm text-gray-600 mb-2">{hotel.address}</p>
        )}
        
        <div className="flex justify-between items-center mb-2">
          {hotel.star_rating_icons && (
            <div className="text-yellow-400 text-sm">{hotel.star_rating_icons}</div>
          )}
          {hotel.price_indicator && (
            <span className="text-yellow-600 font-semibold text-sm">{hotel.price_indicator}</span>
          )}
        </div>

        {hotel.tags && (
          <div className="flex flex-wrap gap-1 mt-2">
            {hotel.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                {tag}
              </span>
            ))}
            {hotel.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{hotel.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotels...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Hotels</h1>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-gray-900">
                Suited<span className="text-yellow-600">Stay</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/claim" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                List Your Property
              </a>
              <a href="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Login
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-sm text-gray-500">
          <a href="/" className="hover:text-gray-700">SuitedStay</a>
          <span className="mx-2">/</span>
          <a href="/places-to-stay" className="hover:text-gray-700">Places to Stay</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Hotels</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar - simplified for now */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Country</h3>
                  <select 
                    value={selectedCountry} 
                    onChange={(e) => {
                      setSelectedCountry(e.target.value)
                      setSelectedCity('') // Reset city when country changes
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">All Countries</option>
                    {availableCountries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">City</h3>
                  <select 
                    value={selectedCity} 
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">All Cities</option>
                    {availableCities
                      .filter(city => !selectedCountry || hotels.some(h => h.country === selectedCountry && h.city === city))
                      .map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map(price => (
                      <label key={price} className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={selectedPrices.includes(price)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPrices([...selectedPrices, price])
                            } else {
                              setSelectedPrices(selectedPrices.filter(p => p !== price))
                            }
                          }}
                          className="mr-2" 
                        />
                        <span className="text-yellow-600 font-semibold">{price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Best Hotels</h1>
              <p className="text-lg text-gray-600">
                Explore the world's finest accommodations, from opulent beachfront resorts to sleek city-center hotels. 
                Indulge in world-class luxury, innovative designs, and impeccable service.
              </p>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-600">
                  {filteredHotels.length} hotels found
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Sort:</label>
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="rating_desc">Rating (High to Low)</option>
                      <option value="rating_asc">Rating (Low to High)</option>
                      <option value="name_asc">Name (A-Z)</option>
                      <option value="price_asc">Price (Low to High)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsCompact(false)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        !isCompact ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Spacious
                    </button>
                    <button 
                      onClick={() => setIsCompact(true)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        isCompact ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Compact
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Grid */}
            <div className={`grid gap-6 ${
              isCompact 
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            }`}>
              {filteredHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>

            {/* No Results */}
            {filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

// Metadata export for SEO
export const metadata = {
  title: 'Best Hotels | SuitedStay',
  description: 'Discover the world\'s most exclusive hotels. From luxury resorts to boutique accommodations, find your perfect stay with SuitedStay.',
}