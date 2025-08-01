cat > "app/hotels/[slug]/page.tsx" << 'EOF'
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
      <p>Hotel: {hotel.hotel_name}</p>
      <p>Template file not found</p>
    </div>
  }

  const template = Handlebars.compile(templateSource)

  // Render the template with hotel data
  const htmlContent = template(hotel)

  // Return the rendered HTML
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createSupabaseClient()
  
  if (!supabase) {
    return {
      title: 'Hotel Page',
    }
  }

  const { data: hotel } = await supabase
    .from('hotels')
    .select('hotel_name, hotel_description')
    .eq('slug', params.slug)
    .single()

  if (!hotel) {
    return {
      title: 'Hotel Not Found',
    }
  }

  return {
    title: `${hotel.hotel_name} - Luxury Hotel | SuitedStay`,
    description: hotel.hotel_description,
  }
}
EOF