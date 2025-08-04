import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Hotel Card Component
function HotelCard({ hotel, index }: { hotel: any; index: number }) {
  const getGradientColors = (index: number) => {
    const gradients = [
      'from-gray-200 to-gray-300',
      'from-blue-200 to-blue-300', 
      'from-green-200 to-green-300',
      'from-purple-200 to-purple-300',
      'from-orange-200 to-orange-300',
      'from-indigo-200 to-indigo-300'
    ]
    return gradients[index % gradients.length]
  }

  const goldColor = '#c5a46d'
  
  // Format score to always show 1 decimal place
  const formatScore = (score: any) => {
    const numScore = parseFloat(score || 0)
    return numScore.toFixed(1)
  }

  return (
    <a href={`/hotels/${hotel.slug}`} className="block">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
        {/* Hotel Image Placeholder with Score */}
        <div className={`h-48 bg-gradient-to-br ${getGradientColors(index)} relative`}>
          {hotel.hero_photo_url && (
            <img 
              src={hotel.hero_photo_url} 
              alt={hotel.hotel_name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute top-3 left-3">
            <div className="bg-emerald-500 text-white text-sm font-bold w-12 h-12 rounded-xl flex items-center justify-center">
              {formatScore(hotel.overall_score)}
            </div>
          </div>
          <div className="absolute bottom-3 left-3">
            <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              Ultra-Luxury
            </div>
          </div>
        </div>

        {/* Hotel Info */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
            {hotel.hotel_name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {hotel.city && hotel.neighbourhood 
              ? `${hotel.city} • ${hotel.neighbourhood}`
              : hotel.city || hotel.neighbourhood || 'Location'}
          </p>
          <p className="text-sm text-gray-700 mb-4" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {hotel.description || 'Luxury accommodation with exceptional service and amenities.'}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-yellow-400">
              <span>{hotel.star_rating_icons || '★★★★★'}</span>
              <span className="text-sm text-gray-600 ml-2">
                {hotel.star_rating_text || '5 stars'}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {hotel.price_indicator || '$$$$'}
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

export default async function HomePage() {
  // Fetch top-rated hotels from Supabase
  const { data: hotels, error } = await supabase
    .from('hotels')
    .select('*')
    .eq('is_published', true)
    .order('overall_score', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching hotels:', error)
  }

  const featuredHotels = hotels || []
  const goldColor = '#c5a46d'

  return (
    <div className="bg-white font-sans text-sm leading-relaxed text-gray-700">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          {/* Hero Badges */}
          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              ✓ Curated Collection
            </div>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: goldColor }}></span>
              Ultra-Luxury
            </div>
            <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
              World's Finest
            </div>
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            The World's Most 
            <span style={{ color: goldColor }}> Exclusive Hotels</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover ultra-luxury accommodations, from Michelin-starred city escapes to private island retreats. Every property is curated for the discerning traveler.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a href="#featured-hotels" className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              Explore Collection
            </a>
            <a href="/claim" className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              List Your Property
            </a>
          </div>

          {/* Dynamic Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{featuredHotels.length}+</div>
              <div className="text-sm text-gray-600">Luxury Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {new Set(featuredHotels.map(h => h.city).filter(Boolean)).size}+
              </div>
              <div className="text-sm text-gray-600">Global Cities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {featuredHotels.length > 0 
                  ? (featuredHotels.reduce((sum, h) => sum + parseFloat(h.overall_score || 0), 0) / featuredHotels.length).toFixed(1)
                  : '9.2'
                }
              </div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Hotels Section - DYNAMIC */}
      <section id="featured-hotels" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our highest-rated luxury hotels, curated for exceptional experiences
            </p>
          </div>

          {/* Dynamic Hotel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel, index) => (
              <HotelCard key={hotel.id} hotel={hotel} index={index} />
            ))}
            
            {/* Fallback if no hotels */}
            {featuredHotels.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No hotels available at the moment.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <a href="/hotels" className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              View All Properties
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose SuitedStay */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SuitedStay</h2>
            <p className="text-lg text-gray-600">
              We curate only the finest luxury accommodations worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Curated Excellence</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every property is hand-selected for exceptional quality, service, and luxury standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Reviews</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our proprietary 10-point scoring system provides transparent, expert-verified ratings.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Global Coverage</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                From cosmopolitan cities to remote paradises, discover luxury in every corner of the world.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}