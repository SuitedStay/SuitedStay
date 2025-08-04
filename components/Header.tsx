'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Header = () => {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const router = useRouter()

  const goldColor = '#c5a46d'

  // Debounced search
  const debouncedSearch = useCallback((searchQuery: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      }
    }, 300)
  }, [router])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    debouncedSearch(value)
  }

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
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
      if (e.key === 'Escape' && isFocused) {
        inputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFocused])

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
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSubmit} className="relative">
              <div className={`
                relative flex items-center h-10 bg-gray-50 border border-gray-200 rounded-full transition-all duration-200
                ${isFocused ? 'border-gray-400 bg-white shadow-sm' : 'hover:bg-gray-100'}
              `}>
                {/* Search Icon */}
                <div className="pl-4 pr-2">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>

                {/* Input Field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Search hotels"
                  className="flex-1 h-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 text-sm focus:ring-0"
                />

                {/* Keyboard Hint */}
                {!isFocused && !query && (
                  <div className="pr-3">
                    <kbd className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium text-gray-400 bg-gray-200 border border-gray-300 rounded">
                      /
                    </kbd>
                  </div>
                )}
              </div>
            </form>
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