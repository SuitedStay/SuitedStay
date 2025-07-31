import { Mail, MapPin, Star } from 'lucide-react'
import { mockData } from '../lib/mockData'

const FeaturedProperties = () => {
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
          {mockData.featuredHotels.map((hotel, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="aspect-[4/3] bg-gray-200 relative">
                <div className="absolute top-4 left-4 flex gap-2">
                  {hotel.isPremium && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Premium Listing
                    </span>
                  )}
                  {hotel.recentlyClaimed && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Recently Claimed
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900 mb-2">{hotel.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-bold text-lg">{hotel.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">{hotel.priceRange}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="text-sm text-gray-600 mb-1">Performance</div>
                  <div className="font-semibold text-gray-900">
                    {hotel.monthlyViews.toLocaleString()} views • {hotel.inquiries} inquiries this month
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-gray-900 text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                    View Details
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                    <Mail className="w-5 h-5 text-gray-600" />
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