"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider" // correct this import

export default function AnnouncementBanner() {
  const { language } = useLanguage()
  const [current, setCurrent] = useState(0)

  const messages = translations[language]["announcements"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="bg-[#39b54b] text-white p-2 rounded-md shadow-md overflow-hidden">
      <div className="transition-all duration-700 ease-in-out text-center">
        {messages[current]}
      </div>
    </div>
  )
}

// You need to make sure `translations` is imported here too
import { translations } from "@/components/language-provider" // adjust path
