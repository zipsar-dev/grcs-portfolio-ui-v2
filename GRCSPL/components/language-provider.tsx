"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ta"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Simple translation dictionary
export const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.business": "Business Opportunity",
    "nav.products": "Products",
    "nav.events": "Events",
    "nav.offers": "Offers",
    "nav.portal": "User Login",
    "nav.resources": "Resources",
    "nav.contact": "Contact Us",
    "nav.announcement": "Announcements", // <-- corrected spelling
    "hero.title": "Build Your Business in Tamil Nadu",
    "hero.subtitle": "Join our network of successful entrepreneurs",
    "hero.cta": "Get Started Today",
    "hero.learnMore": "View Products",
    "announcements": [
      "Big discounts available this month!",
      "Join our upcoming business event!",
      "New product line launching soon!",
      "Special promotions for new users!",
    ],
  },
  ta: {
    "nav.home": "முகப்பு",
    "nav.about": "எங்களைப் பற்றி",
    "nav.business": "வணிக வாய்ப்பு",
    "nav.products": "தயாரிப்புகள்",
    "nav.events": "நிகழ்வுகள்",
    "nav.offers": "சலுகைகள்",
    "nav.portal": "இணை போர்டல்",
    "nav.resources": "வளங்கள்",
    "nav.contact": "தொடர்பு கொள்ளவும்",
    "nav.announcement": "அறிக்கைகள்", 
    "hero.title": "தமிழ்நாட்டில் உங்கள் வணிகத்தை உருவாக்குங்கள்",
    "hero.subtitle": "வெற்றிகரமான தொழில்முனைவோர்களின் வலையமைப்பில் இணையுங்கள்",
    "hero.cta": "இன்றே தொடங்குங்கள்",
    "hero.learnMore": "மேலும் அறிய",
    "announcements": [
      "இந்த மாதம் பெரிய தள்ளுபடிகள்!",
      "எங்கள் வணிக நிகழ்வில் சேருங்கள்!",
      "புதிய தயாரிப்பு வரிசை விரைவில் வருகிறது!",
      "புதிய பயனர்களுக்கான சிறப்பு சலுகைகள்!",
    ],
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ta")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    const value = translations[language][key as keyof (typeof translations)[typeof language]]
    if (typeof value === "string") {
      return value
    }
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
