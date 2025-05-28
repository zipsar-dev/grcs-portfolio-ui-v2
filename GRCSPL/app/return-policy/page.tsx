import type { Metadata } from "next"
import RefundPolicy from "@/components/legal/rp"

export const metadata: Metadata = {
  title: "Return Policy | Business Opportunities in Tamil Nadu",
  description: "Our product return and refund policy",
}

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <RefundPolicy />
    </div>
  )
}
