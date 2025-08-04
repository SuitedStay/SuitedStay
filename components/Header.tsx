'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SearchResult {
  id: string
  hotel_name: string
  city: string
  country: string
  slug: string
  overall_score: number
  hero_photo_url?: string
}

const Header = () => {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const goldColor = '#c5a46d'

  // Mock search function for testing - replace with real API call
  const searchHotels = useCallback(async (searchQuery: string) => {
    console.log('Searching for:', searchQuery) // Debug log
    
    if (!searchQuery.trim()) {
      setSearchResults([])
      setShowResults(false)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setShowResults(true) // Show dropdown immediately
    
    try {
      // For debugging, let's use mock data first
      const mockResults: SearchResult[] = [
        {
          id: '1',
          hotel_name: 'The Ritz-Carlton Dubai',
          city: 'Dubai',
          country: 'UAE',
          slug: 'ritz-carlton-dubai',
          overall_score: 9.2
        },
        {
          id: '2', 
          hotel_name: 'Burj Al Arab Jumeirah',
          city: 'Dubai',
          country: 'UAE',
          slug: 'burj-al-arab',
          overall_score: 9.5
        },
        {
          id: '3',
          hotel_name: 'Atlantis The Palm',
          city: 'Dubai', 
          country: 'UAE',
          slug: 'atlantis-palm',
          overall_score: 8.8
        }
      ]

      // Filter mock results based on query
      const filteredResults = mockResults.filter(hotel => 
        hotel.hotel_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.country.toLowerCase().includes(searchQuery.toLowerCase())
      )

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setSearchResults(filteredResults)
      console.log('Search results:', filteredResults) // Debug log
      
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounced search
  const debouncedSearch = useCallback((searchQuery: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      searchHotels(searchQuery)
    }, 300)
  }, [searchHotels])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    console.log('Input changed:', value) // Debug log
    
    if (value.trim()) {
      debouncedSearch(value)
    } else {
      setShowResults(false)
      setSearchResults([])
    }
  }

  // Handle result click
  const handleResultClick = (slug: string) => {
    console.log('Clicking result:', slug) // Debug log
    router.push(`/hotels/${slug}`)
    setQuery('')
    setShowResults(false)
    inputRef.current?.blur()
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus on "/" key press
      if (e.key === '/' && !isFocused && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      
      // Blur on "Escape" key
      if (e.key === 'Escape') {
        setShowResults(false)
        setQuery('')
        inputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFocused])

  // Handle click outside - FIXED
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        // Delay hiding to allow clicks on results
        setTimeout(() => {
          setShowResults(false)
        }, 100)
      }
    }

    if (showResults) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showResults])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-xl font-bold text-gray-900">
            Suited<span style={{ color: goldColor }}>Stay</span>
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 relative" ref={dropdownRef}>
            <div className={`
              relative flex items-center h-10 bg-gray-50 border border-gray-200 rounded-full transition-all duration-200
              ${isFocused ? 'border-gray-400 bg-white shadow-sm' : 'hover:bg-gray-100'}
            `}>
              {/* Search Icon with better spacing */}
              <div className="pl-4 pr-3 flex-shrink-0">
                <Search className="w-4 h-4 text-gray-400" />
              </div>

              {/* Input Field */}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => {
                  setIsFocused(true)
                  console.log('Input focused') // Debug log
                }}
                onBlur={() => {
                  // Delay blur to allow dropdown clicks
                  setTimeout(() => {
                    setIsFocused(false)
                    console.log('Input blurred') // Debug log
                  }, 200)
                }}
                placeholder="Search hotels"
                className="flex-1 h-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 text-sm focus:ring-0 px-2"
              />

              {/* Keyboard Hint with better spacing */}
              {!isFocused && !query && (
                <div className="pr-4 pl-3 flex-shrink-0">
                  <kbd className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium text-gray-400 bg-gray-200 border border-gray-300 rounded">
                    /
                  </kbd>
                </div>
              )}
            </div>

            {/* Search Results Dropdown - ALWAYS VISIBLE WHEN showResults is true */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-[60]">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400 mx-auto"></div>
                    <p className="mt-2 text-sm">Searching...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                      Search Results ({searchResults.length})
                    </div>
                    {searchResults.map((hotel) => (
                      <div
                        key={hotel.id}
                        onClick={() => handleResultClick(hotel.slug)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-blue-600 text-xs font-medium">Hotel</span>
                              <div className="flex items-center text-gray-500">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span className="text-xs">{hotel.city}, {hotel.country}</span>
                              </div>
                            </div>
                            <h4 className="font-medium text-gray-900 text-sm">{hotel.hotel_name}</h4>
                            <div className="flex items-center mt-1">
                              <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">
                                {hotel.overall_score?.toFixed(1) || 'N/A'}
                              </div>
                              <span className="ml-2 text-xs text-green-600 font-medium">Open</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : query.trim() ? (
                  <div className="p-4 text-center text-gray-500">
                    <p className="text-sm">No hotels found for "{query}"</p>
                    <p className="text-xs mt-1">Try searching by hotel name, city, or country</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <a href="/claim" className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              List Your Property
            </a>
            <a href="/login" className="text-gray-600 hover:text-gray-900 text-sm">
              Login
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header