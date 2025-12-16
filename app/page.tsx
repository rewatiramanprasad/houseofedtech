import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen  bg-zinc-50 font-sans">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  )
}
