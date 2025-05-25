"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"


interface Testimonial {
  id: number
  name: string
  location: string
  quote: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Chennai",
    quote:
      "Joining this business opportunity was the best decision I made. The training and support have been exceptional, and my income has grown steadily over the past year.",
    rating: 5,
    image: '/placeholder.svg?height=80&width=80',
  },
  {
    id: 2,
    name: "Priya Venkatesh",
    location: "Coimbatore",
    quote:
      "I started as a part-time associate while working my regular job. Now I've built a team and run this business full-time. The products are excellent and customers keep coming back.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Senthil Murugan",
    location: "Madurai",
    quote:
      "The business model is straightforward and the company provides all the tools needed to succeed. I've been able to create a sustainable income for my family.",
    rating: 4,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Lakshmi Narayanan",
    location: "Salem",
    quote:
      "What impressed me most is the genuine support from the team. They're always available to help and guide you through challenges. My business has flourished beyond expectations.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "Arun Prakash",
    location: "Trichy",
    quote:
      "The flexible nature of this business allows me to work around my schedule. I've built a steady passive income while maintaining my work-life balance.",
    rating: 4,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    name: "Meena Ravi",
    location: "Tirunelveli",
    quote:
      "Starting with zero experience in business, I was nervous. But the comprehensive training program made everything clear. Now I'm mentoring others to succeed too.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  
  const testimonialsPerPage: number = 3
  const totalPages: number = Math.ceil(testimonials.length / testimonialsPerPage)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev: number) => (prev + 1) % totalPages)
    }, 5000) 

    return () => clearInterval(interval)
  }, [totalPages, isPaused])

  const getCurrentTestimonials = (): Testimonial[] => {
    const start: number = currentIndex * testimonialsPerPage
    const end: number = start + testimonialsPerPage
    return testimonials.slice(start, end)
  }

  const nextSlide = (): void => {
    setCurrentIndex((prev: number) => (prev + 1) % totalPages)
  }

  const prevSlide = (): void => {
    setCurrentIndex((prev: number) => (prev - 1 + totalPages) % totalPages)
  }

  const handlePageClick = (index: number): void => {
    setCurrentIndex(index)
  }

  const handleCardMouseEnter = (id: number): void => {
    setHoveredCard(id)
    setIsPaused(true) 
  }

  const handleCardMouseLeave = (): void => {
    setHoveredCard(null)
    setIsPaused(false) 
  }

  const handleNavigationClick = (callback: () => void): void => {
    setIsPaused(true)
    callback()
    setTimeout(() => setIsPaused(false), 3000)
  }

  const starVariants: Variants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        duration: 0.6
      }
    }
  }

  const cardVariants: Variants = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -50, 
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
          <p className="mt-4 text-lg text-gray-600">
            Hear from entrepreneurs who have built successful businesses in Tamil Nadu
          </p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {getCurrentTestimonials().map((testimonial: Testimonial, index: number) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  variants={cardVariants}
                  onMouseEnter={() => handleCardMouseEnter(testimonial.id)}
                  onMouseLeave={handleCardMouseLeave}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-center mb-4">
                    {Array.from({ length: 5 }, (_, i: number) => (
                      <motion.div
                        key={i}
                        variants={starVariants}
                        initial="initial"
                        animate={hoveredCard === testimonial.id && i < testimonial.rating ? "hover" : "initial"}
                        custom={i}
                      >
                        <Star
                          className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <motion.div 
                      className="h-12 w-12 rounded-full overflow-hidden mr-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8">
            <motion.button
              className="mr-2 rounded-full p-2 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleNavigationClick(prevSlide)}
              disabled={currentIndex === 0}
              aria-label="Previous testimonials"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </motion.button>
            
            <motion.button
              className="rounded-full p-2 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleNavigationClick(nextSlide)}
              disabled={currentIndex === totalPages - 1}
              aria-label="Next testimonials"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}