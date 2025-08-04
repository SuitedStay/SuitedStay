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
              {hotel.overall_score || '9.0'}
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="text-xl font-bold text-gray-900">
              Suited<span style={{ color: goldColor }}>Stay</span>
            </a>
            <div className="flex items-center space-x-4">
              <a href="/claim" className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                List Your Property
              </a>
              <a href="/login" className="text-gray-600 hover:text-gray-900 text-sm">Login</a>
            </div>
          </div>
        </div>
      </header>

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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold mb-4">
                Suited<span style={{ color: goldColor }}>Stay</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Curating the world's most exclusive luxury hotels for discerning travelers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/hotels" className="text-gray-400 hover:text-white transition-colors">All Hotels</a></li>
                <li><a href="/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</a></li>
                <li><a href="/luxury" className="text-gray-400 hover:text-white transition-colors">Ultra-Luxury</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Partners</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/claim" className="text-gray-400 hover:text-white transition-colors">List Your Property</a></li>
                <li><a href="/partnership" className="text-gray-400 hover:text-white transition-colors">Partnership Program</a></li>
                <li><a href="/media" className="text-gray-400 hover:text-white transition-colors">Media Kit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 SuitedStay. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.74-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
