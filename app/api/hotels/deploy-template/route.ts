import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Handlebars from 'handlebars'
import fs from 'fs/promises'
import path from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

// Register Handlebars helpers
Handlebars.registerHelper('contains', function(str, substring) {
  return str && str.toString().includes(substring)
})

Handlebars.registerHelper('eq', function(a, b) {
  return a === b
})

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

    // Fetch FAQs for this hotel
    const { data: faqs, error: faqError } = await supabase
      .from('hotel_faqs')
      .select('question, answer, order_number')
      .eq('hotel_id', hotel_id)
      .order('order_number')

    if (faqError) {
      console.warn('FAQ fetch error:', faqError)
    }

    // Map to template data - FIXED FIELD NAMES to match artifact template
    const templateData = {
      // Basic hotel info
      hotel_name: hotel.hotel_name || 'Luxury Hotel',
      slug: hotel.slug || slug,
      city: hotel.city || '',
      country: hotel.country || '',
      description: hotel.description || '', // Fixed: was hotel_description
      address: hotel.address || 'Address not available',
      neighbourhood: hotel.neighbourhood || '',
      
      // Scores - Fixed to match template
      overall_score: hotel.overall_score || '0.0',
      accommodation_quality_score: hotel.accommodation_quality_score || '0.0', // Fixed
      dining_amenities_score: hotel.dining_amenities_score || '0.0', // Fixed
      ambience_design_score: hotel.ambience_design_score || '0.0', // Fixed
      value_service_score: hotel.value_service_score || '0.0',
      location_accessibility_score: hotel.location_accessibility_score || '0.0', // Fixed
      
      // Contact & booking
      website: hotel.website || '',
      book_link: hotel.book_link || '',
      phone_formatted: hotel.phone_formatted || '',
      phone_url: hotel.phone_url || '',
      
      // Times & pricing
      check_in: hotel.check_in || '3:00 PM',
      check_out: hotel.check_out || '12:00 PM',
      price_indicator: hotel.price_indicator || '$$$$',
      price_range: hotel.price_range || '',
      
      // Star rating
      star_rating_text: hotel.star_rating_text || '',
      star_rating_icons: hotel.star_rating_icons || '',
      
      // Status & media
      claimed_status: hotel.claimed_status || 'unclaimed',
      hero_photo_url: hotel.hero_photo_url || '',
      
      // Location data
      address_google_maps_link: hotel.address_google_maps_link || '',
      directions_url: hotel.directions_url || '',
      latitude: hotel.latitude || '',
      longitude: hotel.longitude || '',
      getting_there: hotel.getting_there || '',
      
      // Reviews & sentiment
      reviews_count: hotel.reviews_count || 0,
      public_review_sentiment: hotel.public_review_sentiment || '',
      best_times_to_stay: hotel.best_times_to_stay || '',
      
      // Arrays
      amenities: hotel.amenities ? (Array.isArray(hotel.amenities) ? hotel.amenities : hotel.amenities.split(',')) : [],
      tags: hotel.tags ? (Array.isArray(hotel.tags) ? hotel.tags : hotel.tags.split(',')) : [],
      
      // SEO & schema
      page_url: hotel.page_url || `https://suitedstay.com/hotels/${hotel.slug}`,
      schema_data: hotel.schema_data || '',
      faq_schema: hotel.faq_schema || '',
      
      // FAQs - convert to array format for template
      faqs: faqs || []
    }

    // Load and compile template
    const templatePath = path.join(process.cwd(), 'templates', 'hotel-template.hbs')
    const templateSource = await fs.readFile(templatePath, 'utf8')
    const template = Handlebars.compile(templateSource)

    // Generate HTML
    const htmlContent = template(templateData)

    // Store HTML in Supabase
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

    return NextResponse.json({ 
      success: true,
      message: 'Hotel page created and saved successfully',
      hotel_name: templateData.hotel_name,
      faq_count: faqs ? faqs.length : 0,
      url: `https://suited-stay.vercel.app/hotels/${templateData.slug}`,
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
