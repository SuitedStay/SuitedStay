'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import ClaimModal from './ClaimModal'

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const mockSearchResults = [
    'Tokyo', 'Dubai', 'Maldives', 'Switzerland', 'Napa Valley', 'Monaco',
    'Aman Tokyo', 'Burj Al Arab', 'Four Seasons George V', 'The Ritz Paris'
  ]

  const filteredResults = mockSearchResults.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5)

  return (
    <>
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src="/hero-luxury-hotel.jpg"
          alt="Luxury hotel suite with city view"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Header with Search */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="text-white font-display text-2xl font-bold">
              SuitedStay
            </div>
            
            <div className="relative">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-white/70 mr-2" />
                <input
                  type="text"
                  placeholder="Search cities or hotels..."
                  className="bg-transparent text-white placeholder-white/70 outline-none w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {searchQuery && filteredResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                  {filteredResults.map((result, index) => (
                    <div key={index} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The World's Most Exclusive Hotels, All in One Place
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto">
            Discover ultra-luxury accommodations, from Michelin-starred city escapes to private island retreats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Explore Luxury Hotels
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              List Your Property
            </button>
          </div>
        </div>
      </section>

      <ClaimModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Hero
