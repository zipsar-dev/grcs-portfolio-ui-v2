import type { Metadata } from "next"
import PageHeader from "@/components/ui-custom/page-header"
import IncomeExamples from "@/components/business/income-examples"
import RegistrationGuide from "@/components/business/registration-guide"
import SuccessStories from "@/components/business/success-stories"
import FAQ from "@/components/business/faq"

export const metadata: Metadata = {
  title: "Business Opportunity | Business Opportunities in Tamil Nadu",
  description: "Explore business opportunities, income potential, and success stories in Tamil Nadu",
}

export default function BusinessOpportunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Business Opportunity"
        description="Discover how you can build a successful business with us in Tamil Nadu"
      />

      <div className="mt-12 space-y-16">
        <IncomeExamples />
        <RegistrationGuide />
        <SuccessStories />
        <FAQ />
      </div>
    </div>
  )
}
