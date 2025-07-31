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
      throw new Error(`Hotel not found: ${hotelError.message}`)
    }

    // Prepare template data with all your Supabase fields
    const templateData = {
      hotel_name: hotel.hotel_name || 'Luxury Hotel',
      hotel_slug: hotel.slug || slug,
      overall_score: hotel.overall_score || '0.0',
      accommodation_score: hotel.accommodation_score || '0.0',
      dining_score: hotel.dining_score || '0.0',
      ambience_score: hotel.ambience_score || '0.0',
      value_service_score: hotel.value_service_score || '0.0',
      location_score: hotel.location_score || '0.0',
      address: hotel.address || 'Address not available',
      neighbourhood: hotel.neighbourhood || '',
      website: hotel.website || '',
      booking_link: hotel.booking_link || '',
      phone_number: hotel.phone_number || '',
      phone_url: hotel.phone_url || '',
      check_in_time: hotel.check_in_time || '3:00 PM',
      check_out_time: hotel.check_out_time || '12:00 PM',
      price_indicator: hotel.price_indicator || '$$$$',
      star_rating: Array.from({ length: hotel.star_rating || 5 }, () => '★'),
      claimed_status: hotel.claimed_status || false,
      hero_photo: hotel.hero_photo || '',
      google_map_url: hotel.google_map_url || '',
      public_review_sentiment: hotel.public_review_sentiment || '',
      best_times_to_stay: hotel.best_times_to_stay || '',
      getting_there: hotel.getting_there || '',
      tags: Array.isArray(hotel.tags) ? hotel.tags : [],
      faq_1: hotel.faq_1 || '',
      answer_1: hotel.answer_1 || '',
      faq_2: hotel.faq_2 || '',
      answer_2: hotel.answer_2 || '',
      faq_3: hotel.faq_3 || '',
      answer_3: hotel.answer_3 || '',
      faq_4: hotel.faq_4 || '',
      answer_4: hotel.answer_4 || '',
      faq_5: hotel.faq_5 || '',
      answer_5: hotel.answer_5 || ''
    }

    // Load and compile Handlebars template
    const templatePath = path.join(process.cwd(), 'templates', 'hotel-template.hbs')
    const templateSource = await fs.readFile(templatePath, 'utf8')
    const template = Handlebars.compile(templateSource)

    // Generate HTML using proper Handlebars compilation
    const htmlContent = template(templateData)

    // Store HTML back in Supabase
    const { error: updateError } = await supabase
      .from('hotels')
      .update({ 
        generated_html: htmlContent,
        is_published: true,
        publish_date: new Date().toISOString()
      })
      .eq('id', hotel_id)

    if (updateError) {
      throw new Error(`Failed to save HTML: ${updateError.message}`)
    }

    console.log('Hotel page created successfully!')

    return NextResponse.json({ 
      success: true,
      message: 'Hotel page created successfully',
      url: `https://suited-stay.vercel.app/hotels/${slug}`,
      hotel_id: hotel_id,
      generated_at: new Date().toISOString()
    })

  } catch (error) {
    console.error('Hotel page generation error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create hotel page',
        details: error.message 
      }, 
      { status: 500 }
    )
  }
}