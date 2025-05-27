"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Story() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1], 
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.3,
      },
    },
  };

  return (
    <section>
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={textVariants}>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, our company began with a simple mission: to provide
              quality products and business opportunities to the people of Tamil
              Nadu. What started as a small operation in Chennai has now grown
              into a thriving network spanning the entire state.
            </p>
            <p className="text-gray-600 mb-4">
              Our founder, Mr. Govintharajan, recognized the entrepreneurial
              spirit of Tamil Nadu and created a business model that would allow
              individuals to build their own businesses while providing valuable
              products to their communities.
            </p>
            <p className="text-gray-600">
              Today, we are proud to support over 100 entrepreneurs across Tamil
              Nadu, helping them achieve financial independence and personal
              growth.
            </p>
          </motion.div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <motion.img
                variants={imageVariants}
                src="/about.jpg"
                alt="Our company story"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              variants={badgeVariants}
              className="absolute -bottom-4 -right-4 bg-[#39b54b] p-4 rounded-lg text-white"
            >
              <p className="font-bold">Est. 2024</p>
              <p>Coimbatore, Tamil Nadu</p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}