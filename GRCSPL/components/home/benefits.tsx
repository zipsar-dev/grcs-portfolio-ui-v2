"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, Award, ShieldCheck } from "lucide-react"

const benefits = [
  {
    icon: <TrendingUp className="h-10 w-10 text-green-500" />,
    title: "Proven Business Model",
    description: "Join a business with a proven track record of success across Tamil Nadu.",
  },
  {
    icon: <Users className="h-10 w-10 text-green-500" />,
    title: "Supportive Community",
    description: "Connect with a network of entrepreneurs who help each other succeed.",
  },
  {
    icon: <Award className="h-10 w-10 text-green-500" />,
    title: "Quality Products",
    description: "Offer high-quality products that customers love and trust.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-green-500" />,
    title: "Comprehensive Training",
    description: "Receive thorough training and ongoing support to build your business.",
  },
]

export default function Benefits() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 } 
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3    
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section  className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Business Opportunity</h2>
          <p className="mt-4 text-lg text-gray-600">
            We provide everything you need to build a successful business in Tamil Nadu
          </p>
        </motion.div>

        <motion.div ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="mb-4"
                initial={{ scale: 0 }}
                animate={isVisible ? { scale: 1 } : { scale: 0 }}
                transition={{ 
                  delay: 0.5 + (index * 0.2),
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}