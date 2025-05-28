import type { Metadata } from "next"
import LegalContent from "@/components/legal/legal-content"
import TermsAndConditions from "@/components/legal/tnc"


export const metadata: Metadata = {
title: "Terms of Service GRCSPL",
  description: "Our terms of service and conditions of use",
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <TermsAndConditions />
    </div>
  )
}
