import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export default async function HotelPage({ params }: { params: { slug: string } }) {
  try {
    // Fetch hotel data by slug
    const { data: hotel, error } = await supabase
      .from('hotels')
      .select('generated_html, hotel_name')
      .eq('slug', params.slug)
      .single()

    if (error || !hotel) {
      notFound()
    }

    // Return the generated HTML
    return (
      <div dangerouslySetInnerHTML={{ __html: hotel.generated_html || 'Page not generated yet' }} />
    )

  } catch (error) {
    console.error('Error loading hotel page:', error)
    notFound()
  }
}