"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Award, ShieldCheck } from "lucide-react"

const benefits = [
  {
    icon: <TrendingUp className="h-10 w-10 text-[#39b54b]" />,
    title: "Proven Business Model",
    description: "Join a business with a proven track record of success across Tamil Nadu.",
  },
  {
    icon: <Users className="h-10 w-10 text-[#39b54b]" />,
    title: "Supportive Community",
    description: "Connect with a network of entrepreneurs who help each other succeed.",
  },
  {
    icon: <Award className="h-10 w-10 text-[#39b54b]" />,
    title: "Quality Products",
    description: "Offer high-quality products that customers love and trust.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-[#39b54b]" />,
    title: "Comprehensive Training",
    description: "Receive thorough training and ongoing support to build your business.",
  },
]

export default function Benefits() {
  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const containerVariants = {
    hidden: {},
    visible: {
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
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180
    },
    visible: { 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Business Opportunity</h2>
          <p className="mt-4 text-lg text-gray-600">
            We provide everything you need to build a successful business in Tamil Nadu
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-all ease-in"
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="mb-4"
                variants={iconVariants}
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}