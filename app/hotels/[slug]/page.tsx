import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'

// Create Supabase client with error handling
function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Debug logging
  console.log('Environment check:', {
    supabaseUrl: supabaseUrl ? 'EXISTS' : 'MISSING',
    supabaseKey: supabaseKey ? 'EXISTS' : 'MISSING',
    supabaseUrlValue: supabaseUrl?.substring(0, 20) + '...',
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('SUPABASE'))
  })

  if (!supabaseUrl || !supabaseKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseKey)
}

export default async function HotelPage({ params }: { params: { slug: string } }) {
  const supabase = createSupabaseClient()
  
  if (!supabase) {
    return <div style={{ padding: '2rem' }}>
      <h1>Configuration Error</h1>
      <p>Unable to connect to database</p>
      <p>Debug info:</p>
      <ul>
        <li>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'EXISTS' : 'MISSING'}</li>
        <li>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'EXISTS' : 'MISSING'}</li>
        <li>All SUPABASE env vars: {Object.keys(process.env).filter(key => key.includes('SUPABASE')).join(', ')}</li>
      </ul>
    </div>
  }

  // Rest of your code...
  const { data: hotel, error } = await supabase
    .from('hotels')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !hotel) {
    return <div style={{ padding: '2rem' }}>
      <h1>Hotel Not Found</h1>
      <p>Slug: {params.slug}</p>
      <p>Error: {error?.message || 'No data found'}</p>
    </div>
  }

  return <div style={{ padding: '2rem' }}>
    <h1>Success!</h1>
    <p>Hotel found: {hotel.hotel_name}</p>
  </div>
}