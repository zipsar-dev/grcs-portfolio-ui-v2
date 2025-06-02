import { ClipboardList, FileText, CreditCard, Package, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock registration steps
const registrationSteps = [
  {
    icon: <ClipboardList className="h-8 w-8 text-[#39b54b]" />,
    title: "Complete Application",
    description: "Fill out the online application form with your personal details.",
  },
  {
    icon: <FileText className="h-8 w-8 text-[#39b54b]" />,
    title: "Submit Documents",
    description: "Provide necessary identification and address proof documents.",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-[#39b54b]" />,
    title: "Pay Registration Fee",
    description: "Pay the one-time registration fee of ₹999 to activate your account.",
  },
  {
    icon: <Package className="h-8 w-8 text-[#39b54b]" />,
    title: "Select Starter Kit",
    description: "Choose a product starter kit that matches your business goals.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-[#39b54b]" />,
    title: "Complete Training",
    description: "Attend the initial training session online or at a local center.",
  },
  {
    icon: <Users className="h-8 w-8 text-[#39b54b]" />,
    title: "Start Building",
    description: "Begin selling products and building your team with ongoing support.",
  },
]

export default function RegistrationGuide() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-4">How to Get Started</h2>
      <p className="text-gray-600 mb-8">
        Joining our business opportunity is simple. Follow these steps to begin your entrepreneurial journey:
      </p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 md:hidden"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {registrationSteps.map((step, index) => (
            <div key={index} className="relative">
              {/* Mobile timeline dot */}
              <div className="absolute left-4 top-4 w-4 h-4 rounded-full bg-[#39b54b] transform -translate-x-1/2 z-10 md:hidden"></div>

              <div className="pl-10 md:pl-0">
                <div className="bg-white p-6 rounded-lg shadow-md h-full hover:scale-105 transition-all ease-in">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[#39b54b]/10 mb-4">
                    {step.icon}
                  </div>
                  <div className="flex md:hidden items-center mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/contact">
          <Button className="bg-[#39b54b] hover:bg-[#2da03e] text-white px-8 py-3 text-lg">Register Now</Button>
        </Link>
      </div>
    </section>
  )
}
