// components/GlobalSearchBar.tsx
'use client'

import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface GlobalSearchBarProps {
  onSearch?: (query: string) => void
}

export default function GlobalSearchBar({ onSearch }: GlobalSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    // If onSearch prop is provided, use it
    if (onSearch) {
      onSearch(searchQuery)
      return
    }
    
    // Otherwise, navigate to search results page
    const params = new URLSearchParams()
    if (searchQuery) params.append('q', searchQuery)
    if (location) params.append('location', location)
    
    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2">
        {/* Search Input */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search luxury hotels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Location Input */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 border-t md:border-t-0 md:border-l border-gray-200">
          <MapPin className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="City or destination"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-3 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Search
        </button>
      </div>
    </form>
  )
}