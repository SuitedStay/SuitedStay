import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'

// Create Supabase client with error handling
function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    return null
  }

  return createClient(supabaseUrl, supabaseKey)
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function HotelsIndexPage() {
  const supabase = createSupabaseClient()
  
  if (!supabase) {
    return <div style={{ padding: '2rem' }}>
      <h1>Configuration Error</h1>
      <p>Unable to connect to database</p>
    </div>
  }

  // Fetch all hotels from Supabase
  const { data: hotels, error } = await supabase
    .from('hotels')
    .select('*')
    .order('overall_score', { ascending: false })

  if (error) {
    console.error('Error fetching hotels:', error)
    return <div style={{ padding: '2rem' }}>
      <h1>Error Loading Hotels</h1>
      <p>Error: {error.message}</p>
    </div>
  }

  // Read the Handlebars template
  const templatePath = path.join(process.cwd(), 'templates', 'hotels-index.hbs')
  
  let templateSource
  try {
    templateSource = fs.readFileSync(templatePath, 'utf8')
  } catch (err) {
    console.error('Template file not found:', templatePath)
    return <div style={{ padding: '2rem' }}>
      <h1>Template Error</h1>
      <p>Template file not found at: {templatePath}</p>
      <p>Found {hotels?.length || 0} hotels in database</p>
    </div>
  }

  // Register essential Handlebars helpers inline
  Handlebars.registerHelper('eq', function (a, b) {
    return a === b
  })

  Handlebars.registerHelper('gt', function (a, b) {
    return a > b
  })

  Handlebars.registerHelper('subtract', function (a, b) {
    return a - b
  })

  Handlebars.registerHelper('limit', function (arr, limit, options) {
    if (!Array.isArray(arr)) return ''
    
    let result = ''
    const end = Math.min(arr.length, limit)
    
    for (let i = 0; i < end; i++) {
      result += options.fn(arr[i])
    }
    
    return result
  })

  // Register hotelCard partial
  try {
    const hotelCardPath = path.join(process.cwd(), 'templates', 'partials', 'hotelCard.hbs')
    const hotelCardSource = fs.readFileSync(hotelCardPath, 'utf8')
    Handlebars.registerPartial('hotelCard', hotelCardSource)
  } catch (err) {
    console.warn('hotelCard partial not found, using fallback')
    // Register a fallback partial
    Handlebars.registerPartial('hotelCard', `
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div class="aspect-w-16 aspect-h-9 bg-gray-200">
          {{#if hero_photo_url}}
          <img src="{{hero_photo_url}}" alt="{{hotel_name}}" class="w-full h-48 object-cover">
          {{else}}
          <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span class="text-gray-400">No Image</span>
          </div>
          {{/if}}
        </div>
        <div class="p-4">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">{{hotel_name}}</h3>
            {{#if overall_score}}
            <span class="score-pill">{{overall_score}}</span>
            {{/if}}
          </div>
          {{#if address}}
          <p class="text-sm text-gray-600 mb-2">{{address}}</p>
          {{/if}}
          <div class="flex justify-between items-center">
            {{#if star_rating_icons}}
            <div class="text-yellow-400">{{star_rating_icons}}</div>
            {{/if}}
            {{#if price_indicator}}
            <span class="price-indicator">{{price_indicator}}</span>
            {{/if}}
          </div>
          {{#if tags}}
          <div class="mt-2 flex flex-wrap gap-1">
            {{#each tags}}
            <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">{{this}}</span>
            {{/each}}
          </div>
          {{/if}}
        </div>
      </div>
    `)
  }

  const template = Handlebars.compile(templateSource)

  // Template data
  const templateData = {
    page_title: 'Best Hotels',
    page_subtitle: 'Explore the world\'s finest accommodations, from opulent beachfront resorts to sleek city-center hotels. Indulge in world-class luxury, innovative designs, and impeccable service.',
    hotels: hotels || [],
    hotelsJson: JSON.stringify(hotels || [])
  }

  // Render the template
  const htmlContent = template(templateData)

  // Return the rendered HTML
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Best Hotels | SuitedStay',
    description: 'Discover the world\'s most exclusive hotels. From luxury resorts to boutique accommodations, find your perfect stay with SuitedStay.',
  }
}