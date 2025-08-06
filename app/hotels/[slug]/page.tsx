import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function HotelPage({ params }: { params: { slug: string } }) {
  // Use the PRE-GENERATED HTML from your deploy-template API
  const { data: hotel, error } = await supabase
    .from('hotels')
    .select('generated_html, hotel_name, overall_score')
    .eq('slug', params.slug)
    .single()

  if (error || !hotel) {
    notFound()
  }

  // DEBUG: Log what we got from Supabase
  console.log('Hotel data:', { 
    name: hotel.hotel_name, 
    score: hotel.overall_score,
    hasGeneratedHTML: !!hotel.generated_html 
  })

  // Use the pre-generated HTML if it exists
  if (hotel.generated_html) {
    return <div dangerouslySetInnerHTML={{ __html: hotel.generated_html }} />
  }

  // Fallback
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{hotel.hotel_name}</h1>
      <p>Score: {hotel.overall_score}</p>
      <p>No generated HTML found. Please regenerate the page.</p>
    </div>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data: hotel } = await supabase
    .from('hotels')
    .select('hotel_name, description')
    .eq('slug', params.slug)
    .single()

  if (!hotel) {
    return { title: 'Hotel Not Found' }
  }

  return {
    title: `${hotel.hotel_name} - Luxury Hotel | SuitedStay`,
    description: hotel.description,
  }
}
// Add this to your existing hotel page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createSupabaseClient()
  
  if (!supabase) {
    return { title: 'Hotel Page' }
  }

  const { data: hotel } = await supabase
    .from('hotels')
    .select('hotel_name, description, address, hero_photo_url, overall_score, tags')
    .eq('slug', params.slug)
    .single()

  if (!hotel) {
    return { title: 'Hotel Not Found' }
  }

  return {
    title: `${hotel.hotel_name} - Luxury Hotel | SuitedStay`,
    description: hotel.description || `Experience luxury at ${hotel.hotel_name}. Verified by SuitedStay's hospitality experts.`,
    openGraph: {
      title: hotel.hotel_name,
      description: hotel.description,
      url: `https://suitedstay.com/hotels/${params.slug}`,
      images: hotel.hero_photo_url ? [{ url: hotel.hero_photo_url }] : undefined,
      type: 'website',
    },
    other: {
      'hotel:name': hotel.hotel_name,
      'hotel:address': hotel.address,
      'hotel:rating': hotel.overall_score?.toString(),
    }
  }
}