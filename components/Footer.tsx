'use client'

import { useState } from 'react'
import { Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [showStickyCTA, setShowStickyCTA] = useState(true)

  return (
    <>
      {/* Sticky CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4">
            <span className="font-medium">Ready to list your property?</span>
            <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
              Claim Your Page
            </button>
            <button 
              onClick={() => setShowStickyCTA(false)}
              className="text-white/70 hover:text-white ml-2"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left: Logo & Pitch */}
            <div>
              <div className="font-display text-2xl font-bold mb-4">
                SuitedStay
              </div>
              <p className="text-gray-300 mb-6">
                The world's most exclusive hotels, all in one place. Connect with luxury accommodations that define exceptional hospitality.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Center: Navigation */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About SuitedStay</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Premium Listings</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Right: Newsletter */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Stay Updated</h3>
              <p className="text-gray-300 mb-6">
                Get exclusive access to new luxury properties and special offers.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-gray-500 outline-none transition-colors"
                />
                <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SuitedStay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer