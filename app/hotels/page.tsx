import { createClient } from '@supabase/supabase-js'
import HotelsClient from './HotelsClient'
import { Metadata } from 'next'

// Create Supabase client with error handling
function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    return null
  }

  return createClient(supabaseUrl, supabaseKey)
}

export const metadata: Metadata = {
  title: 'Best Hotels | SuitedStay',
  description: 'Discover the world\'s most exclusive hotels. From luxury resorts to boutique accommodations, find your perfect stay with SuitedStay.',
}

export default async function HotelsPage() {
  const supabase = createSupabaseClient()
  
  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Configuration Error</h1>
          <p className="text-gray-600">Unable to connect to database</p>
        </div>
      </div>
    )
  }

  try {
    // Fetch hotels data on the server
    const { data: hotels, error } = await supabase
      .from('hotels')
      .select('*')
      .order('overall_score', { ascending: false })

    if (error) {
      console.error('Error fetching hotels:', error)
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Hotels</h1>
            <p className="text-gray-600">Failed to load hotels from database</p>
          </div>
        </div>
      )
    }

    // Pass the data to the client component
    return <HotelsClient initialHotels={hotels || []} />
  } catch (err) {
    console.error('Server error:', err)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Server Error</h1>
          <p className="text-gray-600">Something went wrong loading the hotels</p>
        </div>
      </div>
    )
  }
}