// components/SearchWrapper.tsx
'use client'

import { useRouter } from 'next/navigation'
import GlobalSearchBar from './GlobalSearchBar'

const SearchWrapper = () => {
  const router = useRouter()

  const handleSearch = (query: string) => {
    // Navigate to search results with the query
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return <GlobalSearchBar onSearch={handleSearch} />
}

export default SearchWrapper