import Hero from "@/components/home/hero"
import Benefits from "@/components/home/benefits"
import FeaturedProducts from "@/components/home/featured-products"
import Testimonials from "@/components/home/testimonials"
import TrustBadges from "@/components/home/trust-badges"
import CallToAction from "@/components/home/call-to-action"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pt-8">
      <Hero />
      <Benefits />
      <FeaturedProducts />
      <Testimonials />
      <TrustBadges />
      <CallToAction />
    </div>
  )
}
