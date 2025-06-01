"use client"

import { motion } from "framer-motion"

export default function Story() {
  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.5
      }
    }
  }

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.5
      }
    }
  }

  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.8, 
        type: "spring",
        bounce: 0.4
      }
    }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      x: -30 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-2xl font-bold mb-4"
            variants={textVariants}
          >
            Our Story
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 mb-4"
            variants={paragraphVariants}
            custom={0}
          >
            Founded in 2024, our company began with a simple mission: to provide quality products and business
            opportunities to the people of Tamil Nadu. What started as a small operation in Coimbatore has now grown into a
            thriving network spanning the entire state.
          </motion.p>
          
          <motion.p 
            className="text-gray-600 mb-4"
            variants={paragraphVariants}
            custom={1}
          >
            Our founder, Mr. Govintharajan, recognized the entrepreneurial spirit of Tamil Nadu and created a business
            model that would allow individuals to build their own businesses while providing valuable products to their
            communities.
          </motion.p>
          
          <motion.p 
            className="text-gray-600"
            variants={paragraphVariants}
            custom={2}
          >
            Today, we are proud to support over 100 entrepreneurs across Tamil Nadu, helping them achieve financial
            independence and personal growth.
          </motion.p>
        </motion.div>

        <motion.div 
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="h-[400px] w-[350px] rounded-lg overflow-hidden"
            variants={imageVariants}
          >
            <img
              src="/about.png"
              alt="Our company story"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-4 -right-4 bg-[#39b54b] p-4 rounded-lg text-white"
            variants={badgeVariants}
          >
            <p className="font-bold">Est. 2024</p>
            <p>Coimbatore, Tamil Nadu</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}