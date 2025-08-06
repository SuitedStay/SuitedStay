// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',  // Current API version - correct!
})

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json()

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID required' }, { status: 400 })
    }

    // Optional: Add some validation for known price IDs
    const validPriceIds = [
      'price_1Rt4IF2Lnx5KeWpDmY5hmWY0', // Early Bird
      'price_1Rt4I92Lnx5KeWpDlUC6Jw7i', // Standard
    ]

    if (!validPriceIds.includes(priceId)) {
      console.warn('Unknown price ID:', priceId)
      // Continue anyway - useful for testing with different prices
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/partners/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/partners?canceled=true`,
      
      // Collect customer information
      customer_email: undefined, // Stripe will collect this
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      
      // Add metadata for tracking
      metadata: {
        source: 'suitedstay_partners',
        priceId: priceId,
        timestamp: new Date().toISOString(),
      },
      
      // Optional: Allow promo codes
      allow_promotion_codes: true,
      
      // Optional: Custom fields to collect hotel info
      custom_fields: [
        {
          key: 'hotel_name',
          label: {
            type: 'custom',
            custom: 'Hotel Name',
          },
          type: 'text',
          text: {
            minimum_length: 2,
            maximum_length: 100,
          },
        },
        {
          key: 'website',
          label: {
            type: 'custom',
            custom: 'Hotel Website (optional)',
          },
          type: 'text',
          optional: true,
        },
      ],
    })

    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error('Stripe checkout error:', error)
    
    // More detailed error logging
    if (error instanceof Stripe.errors.StripeError) {
      console.error('Stripe error type:', error.type)
      console.error('Stripe error message:', error.message)
      
      return NextResponse.json(
        { 
          error: 'Checkout session creation failed',
          details: error.message 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

// Optional: Add a GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    status: 'OK',
    message: 'Checkout API is running',
    prices: {
      earlyBird: 'price_1Rt4IF2Lnx5KeWpDmY5hmWY0',
      standard: 'price_1Rt4I92Lnx5KeWpDlUC6Jw7i'
    }
  })
}