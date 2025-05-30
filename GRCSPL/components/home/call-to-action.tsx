import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="py-20 bg-[#39b54b]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Business Journey?</h2>
          <p className="text-lg mb-8">
            Join thousands of successful entrepreneurs in Tamil Nadu and build a business you can be proud of.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/business-opportunity">
              <Button className="bg-white text-[#39b54b] hover:bg-gray-100 px-8 py-3 text-lg">
                Learn About the Opportunity
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-green-500 hover:bg-white/10 hover:text-white px-8 py-3 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
