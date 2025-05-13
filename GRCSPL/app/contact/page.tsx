import type { Metadata } from "next"
import PageHeader from "@/components/ui-custom/page-header"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import ContactMap from "@/components/contact/contact-map"
import ContactFAQ from "@/components/contact/contact-faq"

export const metadata: Metadata = {
  title: "Contact Us | Business Opportunities in Tamil Nadu",
  description: "Get in touch with our team in Tamil Nadu",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Contact Us" description="We're here to help. Reach out to us with any questions." />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContactInfo />
        <ContactForm />
      </div>

      <div className="mt-12">
        <ContactMap />
      </div>

      <div className="mt-12">
        <ContactFAQ />
      </div>
    </div>
  )
}
