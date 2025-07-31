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

    // Fetch FAQs for this hotel
    const { data: faqs, error: faqError } = await supabase
      .from('hotel_faqs')
      .select('question, answer, order_number')
      .eq('hotel_id', hotel_id)
      .order('order_number')

    if (faqError) {
      console.warn('FAQ fetch error:', faqError)
    }

    // Map to template data using actual Supabase column names
    const templateData = {
      hotel_name: hotel.hotel_name || 'Luxury Hotel',
      hotel_slug: hotel.slug || slug,
      city: hotel.city || '',
      country: hotel.country || '',
      hotel_description: hotel.description || '',
      overall_score: hotel.overall_score || '0.0',
      accommodation_score: hotel.accommodation_quality_score || '0.0',
      dining_score: hotel.dining_amenities_score || '0.0',
      ambience_score: hotel.ambience_design_score || '0.0',
      value_service_score: hotel.value_service_score || '0.0',
      location_score: hotel.location_accessibility_score || '0.0',
      address: hotel.address || 'Address not available',
      neighbourhood: hotel.neighbourhood || '',
      website: hotel.website || '',
      booking_link: hotel.book_link || '',
      phone_number: hotel.phone_formatted || '',
      phone_url: hotel.phone_url || '',
      check_in_time: hotel.check_in || '3:00 PM',
      check_out_time: hotel.check_out || '12:00 PM',
      price_indicator: hotel.price_indicator || '$$$$',
      price_range: hotel.price_range || '',
      star_rating: hotel.star_rating_icons ? hotel.star_rating_icons.split('') : ['★', '★', '★', '★', '★'],
      claimed_status: hotel.claimed_status || false,
      hero_photo: hotel.hero_photo_url || '',
      google_map_url: hotel.address_google_maps_link || '',
      directions_url: hotel.directions_url || '',
      public_review_sentiment: hotel.public_review_sentiment || '',
      best_times_to_stay: hotel.best_times_to_stay || '',
      getting_there: hotel.getting_there || '',
      tags: hotel.tags ? (Array.isArray(hotel.tags) ? hotel.tags : hotel.tags.split(',')) : [],
      amenities: hotel.amenities ? (Array.isArray(hotel.amenities) ? hotel.amenities : hotel.amenities.split(',')) : [],
      reviews_count: hotel.reviews_count || 0,
      latitude: hotel.latitude || '',
      longitude: hotel.longitude || '',
      city_slug: hotel.city ? hotel.city.toLowerCase().replace(/\s+/g, '-') : '',
      schema_data: hotel.schema_data || '',
      faq_schema: hotel.faq_schema || '',
      
      // Map FAQs from the separate table
      faq_1: (faqs && faqs[0]) ? faqs[0].question : '',
      answer_1: (faqs && faqs[0]) ? faqs[0].answer : '',
      faq_2: (faqs && faqs[1]) ? faqs[1].question : '',
      answer_2: (faqs && faqs[1]) ? faqs[1].answer : '',
      faq_3: (faqs && faqs[2]) ? faqs[2].question : '',
      answer_3: (faqs && faqs[2]) ? faqs[2].answer : '',
      faq_4: (faqs && faqs[3]) ? faqs[3].question : '',
      answer_4: (faqs && faqs[3]) ? faqs[3].answer : '',
      faq_5: (faqs && faqs[4]) ? faqs[4].question : '',
      answer_5: (faqs && faqs[4]) ? faqs[4].answer : ''
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
      url: `https://suited-stay.vercel.app/hotels/${templateData.hotel_slug}`,
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