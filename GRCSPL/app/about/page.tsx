import type { Metadata } from "next"
import PageHeader from "@/components/ui-custom/page-header"
import Story from "@/components/about/story"
import Leadership from "@/components/about/leadership"
import Timeline from "@/components/about/timeline"
import CSR from "@/components/about/csr"

export const metadata: Metadata = {
  title: "About Us | Business Opportunities in Tamil Nadu",
  description: "Learn about our story, leadership, and commitment to Tamil Nadu",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="About Us"
        description="Learn about our journey, our leadership, and our commitment to Tamil Nadu"
      />

      <div className="mt-12 space-y-16">
        <Story />
        <Leadership />
        <Timeline />
        <CSR />
      </div>
    </div>
  )
}
