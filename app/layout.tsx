import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import GlobalSearchBar from '@/components/GlobalSearchBar'
import { useRouter } from 'next/navigation'

// ... your existing font and metadata code ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <GlobalSearchBar 
          onSearch={(query) => {
            // Handle search - could redirect to search page
            if (query.trim()) {
              window.location.href = `/search?q=${encodeURIComponent(query)}`
            }
          }} 
        />
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}