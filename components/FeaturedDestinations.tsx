const FeaturedDestinations = () => {
  const destinations = [
    { city: 'Tokyo', country: 'Japan', hotelCount: 47 },
    { city: 'Paris', country: 'France', hotelCount: 62 },
    { city: 'Dubai', country: 'UAE', hotelCount: 31 },
    { city: 'New York', country: 'USA', hotelCount: 58 },
    { city: 'London', country: 'UK', hotelCount: 73 },
    { city: 'Singapore', country: 'Singapore', hotelCount: 29 }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of the world's most exclusive luxury destinations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {destinations.map((destination, index) => (
            <a 
              key={index}
              href={`/destinations/${destination.city.toLowerCase()}`}
              className="group cursor-pointer"
            >
              <div className="aspect-square bg-gray-200 rounded-xl mb-3 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-3xl font-display">
                    {destination.city[0]}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                {destination.city}
              </h3>
              <p className="text-sm text-gray-600">{destination.country}</p>
              <p className="text-xs text-gray-500 mt-1">{destination.hotelCount} Hotels</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedDestinations