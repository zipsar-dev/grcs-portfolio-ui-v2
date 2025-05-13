import type { Metadata } from "next"
import PageHeader from "@/components/ui-custom/page-header"
import LegalContent from "@/components/legal/legal-content"

export const metadata: Metadata = {
  title: "Terms of Service | Business Opportunities in Tamil Nadu",
  description: "Our terms of service and conditions of use",
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Terms of Service" description="Please read these terms carefully before using our services" />

      <div className="mt-8">
        <LegalContent type="terms-of-service" />
      </div>
    </div>
  )
}
