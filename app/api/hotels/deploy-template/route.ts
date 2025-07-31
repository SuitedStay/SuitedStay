import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { hotel_name, hotel_slug, overall_score } = body

    // For now, let's just return success without file creation
    // We'll add the Handlebars template processing later
    
    return NextResponse.json({ 
      success: true,
      message: 'Template deployment endpoint working',
      receivedData: {
        hotel_name,
        hotel_slug, 
        overall_score
      },
      url: `/hotels/${hotel_slug}.html`
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