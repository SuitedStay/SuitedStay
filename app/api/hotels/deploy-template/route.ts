import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      hotel_name = 'Unnamed Hotel', 
      hotel_slug = 'unnamed-hotel', 
      overall_score = '0.0',
      address = 'Address not available',
      website = '',
      booking_link = '',
      phone_number = '',
      neighbourhood = '',
      check_in_time = '3:00 PM',
      check_out_time = '12:00 PM',
      accommodation_score = '0.0',
      dining_score = '0.0',
      ambience_score = '0.0',
      value_service_score = '0.0',
      location_score = '0.0',
      price_indicator = '$$$$',
      claimed_status = false,
      hero_photo = '',
      public_review_sentiment = '',
      best_times_to_stay = '',
      getting_there = '',
      tags = [],
      faq_1 = '',
      answer_1 = '',
      faq_2 = '',
      answer_2 = '',
      faq_3 = '',
      answer_3 = '',
      faq_4 = '',
      answer_4 = '',
      faq_5 = '',
      answer_5 = ''
    } = body

    // Load the Handlebars template
    const templatePath = path.join(process.cwd(), 'templates', 'hotel-template.hbs')
    let template = await fs.readFile(templatePath, 'utf-8')

    // Replace all Handlebars variables with actual data
    template = template
      .replace(/\{\{hotel_name\}\}/g, hotel_name)
      .replace(/\{\{overall_score\}\}/g, overall_score)
      .replace(/\{\{address\}\}/g, address)
      .replace(/\{\{website\}\}/g, website)
      .replace(/\{\{booking_link\}\}/g, booking_link)
      .replace(/\{\{phone_number\}\}/g, phone_number)
      .replace(/\{\{hotel_slug\}\}/g, hotel_slug)
      .replace(/\{\{neighbourhood\}\}/g, neighbourhood)
      .replace(/\{\{check_in_time\}\}/g, check_in_time)
      .replace(/\{\{check_out_time\}\}/g, check_out_time)
      .replace(/\{\{accommodation_score\}\}/g, accommodation_score)
      .replace(/\{\{dining_score\}\}/g, dining_score)
      .replace(/\{\{ambience_score\}\}/g, ambience_score)
      .replace(/\{\{value_service_score\}\}/g, value_service_score)
      .replace(/\{\{location_score\}\}/g, location_score)
      .replace(/\{\{price_indicator\}\}/g, price_indicator)
      .replace(/\{\{claimed_status\}\}/g, claimed_status.toString())
      .replace(/\{\{hero_photo\}\}/g, hero_photo)
      .replace(/\{\{public_review_sentiment\}\}/g, public_review_sentiment)
      .replace(/\{\{best_times_to_stay\}\}/g, best_times_to_stay)
      .replace(/\{\{getting_there\}\}/g, getting_there)
      .replace(/\{\{faq_1\}\}/g, faq_1)
      .replace(/\{\{answer_1\}\}/g, answer_1)
      .replace(/\{\{faq_2\}\}/g, faq_2)
      .replace(/\{\{answer_2\}\}/g, answer_2)
      .replace(/\{\{faq_3\}\}/g, faq_3)
      .replace(/\{\{answer_3\}\}/g, answer_3)
      .replace(/\{\{faq_4\}\}/g, faq_4)
      .replace(/\{\{answer_4\}\}/g, answer_4)
      .replace(/\{\{faq_5\}\}/g, faq_5)
      .replace(/\{\{answer_5\}\}/g, answer_5)

    // Create output directory and save file
    const outputDir = path.join(process.cwd(), 'public', 'hotels')
    await fs.mkdir(outputDir, { recursive: true })
    
    const outputPath = path.join(outputDir, `${hotel_slug}.html`)
    await fs.writeFile(outputPath, template)

    return NextResponse.json({ 
      success: true,
      message: 'Hotel page generated successfully',
      url: `/hotels/${hotel_slug}.html`,
      hotel_name,
      generated_at: new Date().toISOString()
    })

  } catch (error) {
    console.error('Deploy template error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to deploy template',
        details: error.message 
      }, 
      { status: 500 }
    )
  }
}