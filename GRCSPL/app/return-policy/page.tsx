import type { Metadata } from "next"
import PageHeader from "@/components/ui-custom/page-header"
import LegalContent from "@/components/legal/legal-content"

export const metadata: Metadata = {
  title: "Return Policy | Business Opportunities in Tamil Nadu",
  description: "Our product return and refund policy",
}

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Return Policy" description="Learn about our product return and refund procedures" />

      <div className="mt-8">
        <LegalContent type="return-policy" />
      </div>
    </div>
  )
}
