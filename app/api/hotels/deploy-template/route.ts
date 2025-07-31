import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      hotel_name, 
      hotel_slug, 
      overall_score, 
      address,
      website,
      booking_link,
      // ... all your Supabase fields
    } = body

    // Load the Handlebars template
    const templatePath = path.join(process.cwd(), 'templates', 'hotel-template.hbs')
    let template = await fs.readFile(templatePath, 'utf-8')

    // Replace Handlebars variables with actual data
    template = template
      .replace(/\{\{hotel_name\}\}/g, hotel_name || '')
      .replace(/\{\{overall_score\}\}/g, overall_score || '')
      .replace(/\{\{address\}\}/g, address || '')
      .replace(/\{\{website\}\}/g, website || '')
      .replace(/\{\{booking_link\}\}/g, booking_link || '')
      // Add more replacements for all your fields

    // Save the generated HTML file
    const outputDir = path.join(process.cwd(), 'public', 'hotels')
    await fs.mkdir(outputDir, { recursive: true })
    
    const outputPath = path.join(outputDir, `${hotel_slug}.html`)
    await fs.writeFile(outputPath, template)

    return NextResponse.json({ 
      success: true, 
      message: 'Hotel page deployed successfully',
      url: `/hotels/${hotel_slug}.html`
    })

  } catch (error) {
    console.error('Error deploying template:', error)
    return NextResponse.json(
      { error: 'Failed to deploy template' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}