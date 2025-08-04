'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search } from 'lucide-react'

interface GlobalSearchBarProps {
 onSearch: (query: string) => void
 placeholder?: string
 disabled?: boolean
}

const GlobalSearchBar = ({ 
 onSearch, 
 placeholder = "Search Dubai",
 disabled = false 
}: GlobalSearchBarProps) => {
 const [query, setQuery] = useState('')
 const [isFocused, setIsFocused] = useState(false)
 const inputRef = useRef<HTMLInputElement>(null)
 const timeoutRef = useRef<NodeJS.Timeout>()

 // Debounced search
 const debouncedSearch = useCallback((searchQuery: string) => {
   if (timeoutRef.current) {
     clearTimeout(timeoutRef.current)
   }
   timeoutRef.current = setTimeout(() => {
     onSearch(searchQuery)
   }, 300)
 }, [onSearch])

 // Handle input change
 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const value = e.target.value
   setQuery(value)
   debouncedSearch(value)
 }

 // Handle keyboard shortcuts
 useEffect(() => {
   const handleKeyDown = (e: KeyboardEvent) => {
     // Focus on "/" key press
     if (e.key === '/' && !isFocused && document.activeElement?.tagName !== 'INPUT') {
       e.preventDefault()
       inputRef.current?.focus()
       // Announce to screen readers
       const announcement = document.createElement('div')
       announcement.setAttribute('aria-live', 'polite')
       announcement.setAttribute('aria-atomic', 'true')
       announcement.className = 'sr-only'
       announcement.textContent = 'Search field focused'
       document.body.appendChild(announcement)
       setTimeout(() => document.body.removeChild(announcement), 1000)
     }
     
     // Blur on "Escape" key
     if (e.key === 'Escape' && isFocused) {
       inputRef.current?.blur()
     }
   }

   document.addEventListener('keydown', handleKeyDown)
   return () => document.removeEventListener('keydown', handleKeyDown)
 }, [isFocused])

 // Handle click outside
 useEffect(() => {
   const handleClickOutside = (e: MouseEvent) => {
     if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
       setIsFocused(false)
     }
   }

   if (isFocused) {
     document.addEventListener('mousedown', handleClickOutside)
   }

   return () => document.removeEventListener('mousedown', handleClickOutside)
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
   <div 
     className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100"
     role="search"
     aria-label="Site search"
   >
     <div className="max-w-7xl mx-auto px-6 py-3">
       <div className="relative">
         <label htmlFor="global-search" className="sr-only">
           Search hotels and destinations
         </label>
         
         <div className={`
           relative flex items-center h-12 bg-white border-2 rounded-full transition-all duration-200
           ${isFocused ? 'border-primary-600 shadow-lg' : 'border-gray-200'}
           ${!disabled && 'hover:shadow-md'}
           ${disabled && 'opacity-50 pointer-events-none'}
         `}>
           {/* Search Icon */}
           <div className="pl-4 pr-3">
             <Search className="w-5 h-5 text-gray-400" />
           </div>

           {/* Input Field */}
           <input
             ref={inputRef}
             id="global-search"
             type="text"
             value={query}
             onChange={handleInputChange}
             onFocus={() => setIsFocused(true)}
             onBlur={() => setIsFocused(false)}
             placeholder={placeholder}
             disabled={disabled}
             aria-label="Site search"
             className="flex-1 h-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 focus:ring-0"
           />

           {/* Keyboard Hint */}
           {!isFocused && !query && (
             <div className="pr-4 pl-3">
               <kbd className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded">
                 /
               </kbd>
             </div>
           )}
         </div>
       </div>
     </div>
   </div>
 )
}

export default GlobalSearchBar