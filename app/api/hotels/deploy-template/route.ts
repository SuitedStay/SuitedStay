import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Handlebars from 'handlebars'
import fs from 'fs/promises'
import path from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { hotel_id, slug } = await request.json()
    console.log('Creating page for hotel:', hotel_id, slug)

    // Fetch hotel data from Supabase
    const { data: hotel, error: hotelError } = await supabase
      .from('hotels')
      .select('*')
      .eq('id', hotel_id)
      .single()

    if (hotelError) {
      console.error('Supabase error:', hotelError)
      throw new Error(`Hotel not found: ${hotelError.message}`)
    }

    // Prepare template data
    const templateData = {
      hotel_name: hotel.hotel_name || 'Luxury Hotel',
      hotel_slug: hotel.slug || slug,
      overall_score: hotel.overall_score || '0.0',
      address: hotel.address || 'Address not available',
      website: hotel.website || '',
      booking_link: hotel.booking_link || ''
    }

    // Load and compile template
    const templatePath = path.join(process.cwd(), 'templates', 'hotel-template.hbs')
    const templateSource = await fs.readFile(templatePath, 'utf8')
    const template = Handlebars.compile(templateSource)

    // Generate HTML
    const htmlContent = template(templateData)

    return NextResponse.json({ 
      success: true,
      message: 'Hotel page created successfully',
      hotel_name: templateData.hotel_name,
      hotel_id: hotel_id
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create hotel page',
        details: error.message 
      }, 
      { status: 500 }
    )
  }
}