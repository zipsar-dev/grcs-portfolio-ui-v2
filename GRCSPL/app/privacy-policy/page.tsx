import type { Metadata } from "next"
import PageHeader from "@/components/ui-custom/page-header"
import LegalContent from "@/components/legal/legal-content"

export const metadata: Metadata = {
  title: "Privacy Policy | Business Opportunities in Tamil Nadu",
  description: "Our privacy policy and how we protect your data",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Privacy Policy"
        description="Learn how we collect, use, and protect your personal information"
      />

      <div className="mt-8">
        <LegalContent type="privacy-policy" />
      </div>
    </div>
  )
}
