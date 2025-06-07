"use client"

import React, { useEffect } from "react"
import Hero from "@/components/home/hero"
import Benefits from "@/components/home/benefits"
import FeaturedProducts from "@/components/home/featured-products"
import Testimonials from "@/components/home/testimonials"
import TrustBadges from "@/components/home/trust-badges"
import CallToAction from "@/components/home/call-to-action"
import OfferPopupCard from "@/components/Popup/popup"
import { initMixpanel } from "@/lib/mixpanelClient"

export default function Home() {
  
   useEffect(() => {
    initMixpanel(); // Initialize Mixpanel
  }, []);
  return (
    <div className="flex flex-col gap-16">
      <OfferPopupCard />
      <Hero />
      <Benefits />
      <FeaturedProducts />
      <Testimonials />
      {/* <TrustBadges /> */}
      <CallToAction />
    </div>
  )
}
