'use client'

import { useState } from 'react'
import { Instagram } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [showStickyCTA, setShowStickyCTA] = useState(true)

  // Custom X (Twitter) icon component
  const XIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )

  // Custom TikTok icon component
  const TikTokIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.849-1.294-1.924-1.294-3.124V.75h-3.094v16.219c0 1.775-1.294 3.219-2.888 3.219-1.594 0-2.888-1.444-2.888-3.219s1.294-3.219 2.888-3.219c.321 0 .628.058.914.163v-3.094c-.286-.035-.579-.058-.879-.058-3.449 0-6.25 2.801-6.25 6.25s2.801 6.25 6.25 6.25 6.25-2.801 6.25-6.25V8.321c1.348.914 2.941 1.348 4.571 1.348V6.575c-.879 0-1.713-.321-2.344-.914-.321-.321-.586-.692-.786-1.099z"/>
    </svg>
  )

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
          <div className="grid md:grid-cols-5 gap-12">
            {/* Left: Logo & Pitch */}
            <div className="md:col-span-2">
              <div className="font-display text-2xl font-bold mb-4">
                SuitedStay
              </div>
              <p className="text-gray-300 mb-6">
                Curating the world's most exclusive luxury hotels for discerning travelers.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <XIcon />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <TikTokIcon />
                </a>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Explore</h3>
              <ul className="space-y-4">
                <li><a href="/hotels" className="text-gray-300 hover:text-white transition-colors">All Hotels</a></li>
              </ul>
            </div>

            {/* Partners */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Partners</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Partnership Program</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Support</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
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