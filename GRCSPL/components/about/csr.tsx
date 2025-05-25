"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Heart, BookOpen } from "lucide-react";

const initiatives = [
  {
    icon: <Leaf className="h-8 w-8 text-[#39b54b]" />,
    title: "Environmental Sustainability",
    description:
      "We are committed to reducing our environmental footprint through eco-friendly packaging, waste reduction, and carbon offset programs.",
  },
  {
    icon: <Heart className="h-8 w-8 text-[#39b54b]" />,
    title: "Community Support",
    description:
      "Our company regularly organizes health camps, food drives, and disaster relief efforts across Tamil Nadu.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-[#39b54b]" />,
    title: "Education Initiatives",
    description:
      "We provide scholarships to underprivileged students and support vocational training programs in rural areas of Tamil Nadu.",
  },
];

export default function CSR() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="mt-16" ref={ref}>
      <h2 className="text-2xl font-bold mb-4">Corporate Social Responsibility</h2>
      <p className="text-gray-600 mb-8">
        We believe in giving back to the communities that have supported our growth. Our CSR initiatives focus on
        creating positive impact across Tamil Nadu.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {initiatives.map((initiative, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-all ease-in-out"
            initial={{ 
              opacity: 0, 
              y: 50 
            }}
            animate={isInView ? {
              opacity: 1,
              y: 0
            } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeOut"
            }}
          >
            <div className="mb-4">{initiative.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
            <p className="text-gray-600">{initiative.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}