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

    console.log('Hotel data fetched:', hotel?.hotel_name || 'No name')

    // Prepare template data with all your Supabase fields
    const templateData = {
      hotel_name: hotel.hotel_name || 'Luxury Hotel',
      hotel_slug: hotel.slu