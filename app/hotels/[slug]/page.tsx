// app/hotels/[slug]/page.tsx
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'

// Create Supabase client with error handling
function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables:', { supabaseUrl: !!supabaseUrl, supabaseKey: !!supabaseKey })
    return null
  }

  return createClient(supabaseUrl, supabaseKey)
}

// Main page component
export default async function HotelPage({ params }: { params: { slug: string } }) {
  const supabase = createSupabaseClient()
  
  if (!supabase) {
    return <div style={{ padding: '2rem' }}>
      <h1>Configuration Error</h1>
      <p>Unable to connect to database</p>
    </div>
  }

  // Fetch hotel data from Supabase
  const { data: hotel, error } = await supabase
    .from('hotels')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !hotel) {
    console.log('Hotel not found:', error)
    return <div style={{ padding: '2rem' }}>
      <h1>Hotel Not Found</h1>
      <p>Slug: {params.slug}</p>
      <p>Error: {error?.message || 'No data found'}</p>
    </div>
  }

  // Read the Handlebars template
  const templatePath = path.join(process.cwd(), 'templates', 'hotel-template.hbs')
  
  let templateSource
  try {
    templateSource = fs.readFileSync(templatePath, 'utf8')
  } catch (err) {
    console.error('Template file not found:', templatePath)
    return <div style={{ padding: '2rem' }}>
      <h1>Template Error</h1>
      <p>Hotel: {hotel.name || hotel.hotel_name}</p>
      <p>Template file not found at: {templatePath}</p>
    </div>
  }

  const template = Handlebars.compile(templateSource)

  // Render the template with hotel data
  const htmlContent = template(hotel)

  // Return the rendered HTML
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

// Generate metadata for SEO - ONLY ONE VERSION
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createSupabaseClient()
  
  if (!supabase) {
    return {
      title: 'Hotel Page - SuitedStay',
      description: 'Luxury hotel listing on SuitedStay'
    }
  }

  const { data: hotel } = await supabase
    .from('hotels')
    .select('name, hotel_name, description, meta_title, meta_description')
    .eq('slug', params.slug)
    .single()

  if (!hotel) {
    return {
      title: 'Hotel Not Found - SuitedStay',
      description: 'The requested hotel could not be found.'
    }
  }

  // Use meta fields if available, otherwise fall back to regular fields
  const title = hotel.meta_title || `${hotel.name || hotel.hotel_name} - Luxury Hotel | SuitedStay`
  const description = hotel.meta_description || hotel.description || `Discover ${hotel.name || hotel.hotel_name} on SuitedStay - Premium luxury accommodation.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'SuitedStay',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  }
}