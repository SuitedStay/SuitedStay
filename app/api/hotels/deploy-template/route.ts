import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('=== DEBUG START ===')
    
    // Check if Supabase is available
    try {
      const { createClient } = await import('@supabase/supabase-js')
      console.log('✅ Supabase import successful')
    } catch (err) {
      console.log('❌ Supabase import failed:', err)
      return NextResponse.json({ error: 'Supabase not available', details: err.message })
    }

    // Check if Handlebars is available
    try {
      const Handlebars = await import('handlebars')
      console.log('✅ Handlebars import successful')
    } catch (err) {
      console.log('❌ Handlebars import failed:', err)
      return NextResponse.json({ error: 'Handlebars not available', details: err.message })
    }

    // Check environment variables
    console.log('ENV VARS:')
    console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING')
    console.log('SUPABASE_SERVICE_KEY:', process.env.SUPABASE_SERVICE_KEY ? 'SET' : 'MISSING')

    const body = await request.json()
    console.log('Request body:', body)

    return NextResponse.json({ 
      debug: true,
      message: 'Debug endpoint working',
      env_vars_present: {
        supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        service_key: !!process.env.SUPABASE_SERVICE_KEY
      },
      body
    })

  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}