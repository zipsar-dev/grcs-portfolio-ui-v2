"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/components/language-provider" 
import { translations } from "@/components/language-provider" 

export default function AnnouncementBanner() {
  const { language } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const messages = translations[language]["announcements"]
  const currentMessage = messages[current]

  useEffect(() => {
    if (!currentMessage) return

    setIsTyping(true)
    setDisplayedText("")
    
    let index = 0
    const typingInterval = setInterval(() => {
      if (index < currentMessage.length) {
        setDisplayedText(currentMessage.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, 50) 

    return () => clearInterval(typingInterval)
  }, [currentMessage])

  // Message rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length)
    }, 4000) // Total time per message

    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="bg-[#39b54b] text-white p-2 rounded-md shadow-md overflow-hidden">
      <div className="text-center min-h-[1.5rem] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="w-full"
          >
            <span className="inline-block">
              {displayedText}
              {isTyping && (
                <motion.span
                  className="inline-block w-0.5 h-4 bg-white ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}