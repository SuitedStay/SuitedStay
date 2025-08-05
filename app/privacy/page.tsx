import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - SuitedStay',
  description: 'SuitedStay privacy policy and data protection information.',
  robots: 'noindex, follow'
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-sm text-gray-500 mb-8">Last updated: August 2025</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you contact hotels or subscribe to updates.</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@suitedstay.com</p>
        </div>
      </div>
    </div>
  )
}