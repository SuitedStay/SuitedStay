import { 
  Crown, 
  MapPin, 
  Heart, 
  TrendingUp, 
  BarChart3, 
  Users 
} from 'lucide-react'

const ValueProps = () => {
  const travelerBenefits = [
    {
      icon: Crown,
      title: 'Curated ultra-luxury experiences',
      description: 'Hand-selected properties meeting the highest standards'
    },
    {
      icon: MapPin,
      title: 'Exclusive access to hidden gems',
      description: 'Discover private collections and invitation-only properties'
    },
    {
      icon: Heart,
      title: 'Personalized travel recommendations',
      description: 'AI-powered suggestions based on your preferences'
    }
  ]

  const hotelBenefits = [
    {
      icon: Users,
      title: 'Reach qualified luxury travelers',
      description: 'Connect with high-net-worth individuals seeking premium experiences'
    },
    {
      icon: BarChart3,
      title: 'Transparent performance metrics',
      description: 'Track views, inquiries, and booking conversions in real-time'
    },
    {
      icon: TrendingUp,
      title: 'Premium brand positioning',
      description: 'Showcase your property alongside the world\'s finest hotels'
    }
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose SuitedStay
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The premier platform connecting luxury travelers with exceptional accommodations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* For Travelers */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              For Luxury Travelers
            </h3>
            <div className="space-y-8">
              {travelerBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Hotels */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              For Hotel Partners
            </h3>
            <div className="space-y-8">
              {hotelBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValueProps