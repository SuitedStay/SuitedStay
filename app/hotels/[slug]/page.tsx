import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
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

  console.log('Current overall_score from Supabase:', hotel?.overall_score)

  if (error || !hotel) {
    console.log('Hotel not found:', error)
    return <div style={{ padding: '2rem' }}>
      <h1>Hotel Not Found</h1>
      <p>Slug: {params.slug}</p>
      <p>Error: {error?.message || 'No data found'}</p>
    </div>
  }

  // Fetch FAQs for this hotel
  const { data: faqs, error: faqError } = await supabase
    .from('hotel_faqs')
    .select('question, answer, order_number')
    .eq('hotel_id', hotel.id)
    .order('order_number')

  if (faqError) {
    console.warn('FAQ fetch error:', faqError)
  }

  const templateData = {
    ...hotel,
    faqs: faqs || [],
    amenities: hotel.amenities ? (Array.isArray(hotel.amenities) ? hotel.amenities : hotel.amenities.split(',').map(item => item.trim())) : [],
    google_maps_api_key: process.env.GOOGLE_MAPS_API_KEY
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
      <p>Hotel: {hotel.hotel_name}</p>
      <p>Template file not found at: {templatePath}</p>
    </div>
  }

  const template = Handlebars.compile(templateSource)
  const htmlContent = template(templateData)

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createSupabaseClient()
  
  if (!supabase) {
    return {
      title: 'Hotel Page',
    }
  }

  const { data: hotel } = await supabase
    .from('hotels')
    .select('hotel_name, description')
    .eq('slug', params.slug)
    .single()

  if (!hotel) {
    return {
      title: 'Hotel Not Found',
    }
  }

  return {
    title: `${hotel.hotel_name} - Luxury Hotel | SuitedStay`,
    description: hotel.description,
  }
}
