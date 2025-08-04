import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    console.log('Search API called with query:', query)

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ 
        success: true, 
        results: [] 
      })
    }

    // Search hotels in Supabase
    const { data, error } = await supabase
      .from('hotels')
      .select('id, hotel_name, city, country, slug, overall_score, hero_photo_url')
      .eq('is_published', true)
      .or(`hotel_name.ilike.%${query}%,city.ilike.%${query}%,country.ilike.%${query}%`)
      .order('overall_score', { ascending: false })
      .limit(6)

    if (error) {
      console.error('Supabase search error:', error)
      return NextResponse.json({ 
        success: false, 
        error: 'Search failed',
        results: [] 
      }, { status: 500 })
    }

    console.log('Search results found:', data?.length || 0)

    return NextResponse.json({ 
      success: true, 
      results: data || [] 
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      results: [] 
    }, { status: 500 })
  }
}