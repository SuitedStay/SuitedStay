import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function HotelPage({ params }: { params: { slug: string } }) {
  // Fetch hotel data from Supabase
  const { data: hotel, error } = await supabase
    .from('hotels')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !hotel) {
    console.log('Hotel not found:', error)
    notFound()
  }

  // Read the Handlebars template
  const templatePath = path.join(process.cwd(), 'templates', 'hotel-template.hbs')
  const templateSource = fs.readFileSync(templatePath, 'utf8')
  const template = Handlebars.compile(templateSource)

  // Render the template with hotel data
  const htmlContent = template(hotel)

  // Return the rendered HTML
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
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