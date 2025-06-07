import type { Metadata } from "next"
import PageHeader from "@/components/ui-custom/page-header"
import PromotionsList from "@/components/offers/promotions-list"
import OfferTitleCard from "@/components/offers/OfferTitleCard"

export const metadata: Metadata = {
  title: "Offers & Promotions | Business Opportunities in Tamil Nadu",
  description: "Discover our latest offers and promotions in Tamil Nadu",
}

export default function OffersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <PageHeader
              title="GRCSPL Offers & Promotions"
              description="Discover exclusive offers and promotions designed to help you save on high-quality products and services. Explore our latest deals and take advantage of limited-time discounts."
            />

            <br />
      <OfferTitleCard
        title="Exclusive Offers & Promotions"
        description="Explore our latest offers and promotions designed to help you save on high-quality products."
        discount="Up to 50% OFF"
        validity="Valid until 20th October 2025"
        ctaText="View All Offers"
        ctaLink="https://pages.razorpay.com/stores/st_QD6JmHuMK8AMiy"
      />
      {/* <div className="mt-8">
        <PromotionsList />
      </div> */}
    </div>
  )
}
