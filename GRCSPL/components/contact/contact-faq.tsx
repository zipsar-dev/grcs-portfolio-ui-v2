"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

// Mock FAQ data
const faqs = [
  {
    question: "How can I become an associate?",
    answer:
      "To become an associate, you can fill out the registration form on our website, contact our office, or reach out to an existing associate. We'll guide you through the registration process and provide all necessary training.",
  },
  {
    question: "What are your office hours?",
    answer:
      "Our main office in Chennai is open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 2:00 PM. We are closed on Sundays and public holidays.",
  },
  {
    question: "How can I order products?",
    answer:
      "Associates can order products through our online portal, mobile app, or by visiting any of our offices. Customers can purchase products directly from our associates or through our official website.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day money-back guarantee on most products. If you're not satisfied with your purchase, you can return the unused portion for a full refund. Please refer to our Return Policy page for detailed information.",
  },
  {
    question: "Do you offer product training?",
    answer:
      "Yes, we provide comprehensive product training for all our associates. Training sessions are conducted regularly at our offices and are also available online through our associate portal.",
  },
]

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>

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
    </div>
  )
}
