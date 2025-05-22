"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/components/language-provider"

export default function AnnouncementBanner() {
  const { language } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const messages = translations[language]["announcements"]
  const currentMessage = messages[current]

  useEffect(() => {
    setDisplayText("")
    setIsTyping(true)
    
    let index = 0
    const typingInterval = setInterval(() => {
      if (index < currentMessage.length) {
        setDisplayText(currentMessage.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, 50) 

    return () => clearInterval(typingInterval)
  }, [currentMessage])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length)
    }, 4000) 

    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="bg-[#39b54b] text-white p-2 rounded-md shadow-md overflow-hidden">
      <div className="text-center min-h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <span className="font-medium">
              {displayText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                  className="ml-1"
                >
                  |
                </motion.span>
              )}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
