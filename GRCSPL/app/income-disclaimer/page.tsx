import type { Metadata } from "next"
import PageHeader from "@/components/ui-custom/page-header"
import LegalContent from "@/components/legal/legal-content"

export const metadata: Metadata = {
  title: "Income Disclaimer | Business Opportunities in Tamil Nadu",
  description: "Important information about income potential",
}

export default function IncomeDisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Income Disclaimer" description="Important information about income potential and earnings" />

      <div className="mt-8">
        <LegalContent type="income-disclaimer" />
      </div>
    </div>
  )
}
