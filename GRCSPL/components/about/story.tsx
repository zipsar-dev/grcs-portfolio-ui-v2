"use client";
import { motion } from "framer-motion";

export default function Story() {
  return (
    <section>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <div>
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
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <motion.img
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              src="/about.jpg"
              alt="Our company story"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            initial={{ scale: 0, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ delay: 1, ease: "easeIn" }}
            className="absolute -bottom-4 -right-4 bg-[#39b54b] p-4 rounded-lg text-white"
          >
            <p className="font-bold">Est. 2024</p>
            <p>Coimbatore, Tamil Nadu</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
