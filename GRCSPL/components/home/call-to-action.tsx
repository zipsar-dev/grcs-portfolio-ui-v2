import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="py-24 bg-gradient-to-r from-[#39b54b] to-[#2d8a3a] text-white">
  <div className="container mx-auto px-6">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in">
        Ready to Start Your Business Journey?
      </h2>
      <p className="text-lg md:text-xl mb-10 text-white/90">
        Join thousands of successful entrepreneurs in Tamil Nadu and build a business you can be proud of.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/business-opportunity">
          <Button className="bg-white text-[#39b54b] font-semibold hover:bg-gray-100 transition-all duration-300 px-8 py-3 text-lg rounded-xl shadow-md hover:shadow-lg">
            Learn About the Opportunity
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" className="border-white text-green-500 hover:bg-white/10 hover:text-white px-8 py-3 text-lg rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  </div>
</section>

  )
}
