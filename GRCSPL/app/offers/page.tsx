import type { Metadata } from "next"
import PageHeader from "@/components/ui-custom/page-header"
import PromotionsList from "@/components/offers/promotions-list"

export const metadata: Metadata = {
  title: "Offers & Promotions | Business Opportunities in Tamil Nadu",
  description: "Discover our latest offers and promotions in Tamil Nadu",
}

export default function OffersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Offers & Promotions" description="Take advantage of our latest offers and promotions" />

      <div className="mt-8">
        <PromotionsList />
      </div>
    </div>
  )
}
