import type { Metadata } from "next"
import ShippingPolicy from "@/components/legal/sp"

export const metadata: Metadata = {
  title: "Shipping Policy | Business Opportunities in Tamil Nadu",
  description: "Our product Shipping Policy",
}

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ShippingPolicy />
    </div>
  )
}
