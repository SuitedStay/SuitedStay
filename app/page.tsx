import Hero from './components/Hero'
import LiveCounter from './components/LiveCounter'
import FeaturedDestinations from './components/FeaturedDestinations'
import FeaturedProperties from './components/FeaturedProperties'
import ValueProps from './components/ValueProps'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <LiveCounter />
      <FeaturedDestinations />
      <FeaturedProperties />
      <ValueProps />
      <Footer />
    </main>
  )
}