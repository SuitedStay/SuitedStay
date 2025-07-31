import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { hotel_id, slug, action } = body

    // Log the incoming data
    console.log('Received hotel data:', { hotel_id, slug, action })

    // Basic validation
    if (!hotel_id || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields: hotel_id and slug' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Validate the hotel data
    // 2. Store it in your database
    // 3. Trigger page generation

    return NextResponse.json({ 
      success: true, 
      message: 'Hotel page creation initiated',
      hotel_id,
      slug 
    })

  } catch (error) {
    console.error('Error processing hotel creation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
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

export async function GET() {
  return NextResponse.json({ 
    message: 'Hotel API endpoint is working',
    methods: ['POST'],
    timestamp: new Date().toISOString()
  })
}