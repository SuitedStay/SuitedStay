import { mockData } from '../lib/mockData'

const FeaturedDestinations = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of the world's most exclusive luxury destinations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockData.destinations.map((destination, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">{destination.city}</h3>
                  <p className="text-sm opacity-90">{destination.country}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="text-2xl font-bold text-gray-900">
                  {destination.hotelCount}
                </div>
                <div className="text-gray-600">Hotels</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedDestinations