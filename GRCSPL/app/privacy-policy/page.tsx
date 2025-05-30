import type { Metadata } from "next"
import PrivacyPolicy
 from "@/components/legal/pp"
 
export const metadata: Metadata = {
  title: "Privacy Policy | Business Opportunities in Tamil Nadu",
  description: "Our privacy policy and how we protect your data",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PrivacyPolicy />
    </div>
  )
}
