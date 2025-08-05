import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About SuitedStay - Curated Luxury Hotel Collection',
  description: 'SuitedStay curates the world\'s finest luxury hotels, providing detailed insights and seamless booking experiences for discerning travelers.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About SuitedStay</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            SuitedStay curates the world's most exceptional luxury hotels, 
            providing discerning travelers with detailed insights and seamless booking experiences.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            We believe luxury travel should be effortless. Our team of hospitality experts 
            personally evaluates each property using our proprietary 10-point scoring system, 
            ensuring only the finest establishments join our collection.
          </p>
        </div>
      </div>
    </div>
  )
}