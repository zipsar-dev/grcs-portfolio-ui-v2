"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

// Mock FAQ data
const faqs = [
  {
    question: "How much does it cost to join this business opportunity?",
    answer:
      "The registration fee is ₹999, which includes your business kit, online account, and initial training. Additionally, you can choose from various product starter kits ranging from ₹5,000 to ₹25,000 depending on your business goals.",
  },
  {
    question: "Do I need prior business experience?",
    answer:
      "No prior business experience is required. We provide comprehensive training and support to help you build your business from scratch. Many of our successful associates started with no previous business experience.",
  },
  {
    question: "Can I do this business part-time?",
    answer:
      "Yes, many of our associates start part-time while maintaining their current jobs. You can set your own hours and work at your own pace. As your business grows, you may choose to transition to full-time.",
  },
  {
    question: "How do I get paid?",
    answer:
      "You earn through multiple streams: retail profit from direct sales, commissions from your team's sales, and various bonuses and incentives. Payments are made directly to your bank account on a weekly or monthly basis.",
  },
  {
    question: "What kind of support will I receive?",
    answer:
      "You'll receive comprehensive support including initial and ongoing training, marketing materials, a personalized website, mobile app, mentoring from experienced leaders, and access to business-building events and workshops.",
  },
  {
    question: "Is this business model legal in India?",
    answer:
      "Yes, our business model complies with all Indian regulations for direct selling. We are a legitimate business opportunity, not a pyramid scheme. Our focus is on product sales and building a sustainable business.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <p className="text-gray-600 mb-8">Get answers to common questions about our business opportunity:</p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-[#39b54b]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#39b54b]" />
              )}
            </button>

            {openIndex === index && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
