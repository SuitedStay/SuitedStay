'use client'

import { useState, useEffect } from 'react'
import { mockData } from '../lib/mockData'

const LiveCounter = () => {
  const [count, setCount] = useState(mockData.totalProperties)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-6xl font-bold text-gray-900 mb-4">
            {count.toLocaleString()}
          </div>
          <h2 className="text-2xl text-gray-600 mb-8">
            Exclusive properties listed
          </h2>
          <p className="text-lg text-gray-500">
            {mockData.recentActivity[0]}
          </p>
        </div>

        {/* Premium Badges Scroll */}
        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4 min-w-max">
            {mockData.premiumBadges.map((badge, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm min-w-[280px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">{badge.hotel.charAt(0)}</span>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Premium Listing
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{badge.hotel}</h3>
                <p className="text-gray-600 text-sm mb-3">{badge.location}</p>
                <div className="text-lg font-bold text-gray-900">
                  {badge.views.toLocaleString()} views this month
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LiveCounter