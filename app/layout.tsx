import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'SuitedStay - Curated Luxury Hotel Collection',
    template: '%s | SuitedStay'
  },
  description: 'Discover the world\'s finest luxury hotels, personally curated and verified by hospitality experts. Direct booking links, detailed insights, and exclusive access.',
  keywords: ['luxury hotels', 'premium accommodation', 'boutique hotels', 'travel', 'hospitality'],
  authors: [{ name: 'SuitedStay' }],
  creator: 'SuitedStay',
  publisher: 'SuitedStay',
  metadataBase: new URL('https://suitedstay.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://suitedstay.com',
    siteName: 'SuitedStay',
    title: 'SuitedStay - Curated Luxury Hotel Collection',
    description: 'Discover the world\'s finest luxury hotels, personally curated by experts.',
    images: [
      {
        url: '/og-image.jpg', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'SuitedStay - Luxury Hotels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SuitedStay - Curated Luxury Hotel Collection',
    description: 'Discover the world\'s finest luxury hotels, personally curated by experts.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // We'll add this after setting up Search Console
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://suitedstay.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}