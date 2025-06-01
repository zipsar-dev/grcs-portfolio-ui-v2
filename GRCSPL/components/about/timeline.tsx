'use client'
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

const timelineEvents = [
  {
    year: 2024,
    title: "Company Founded",
    description: "Started operations in Coimbatore with a small team of 5 people.",
  },
  {
    year: 2025,
    title: "Website Launch",
    description: "Launched our first website to connect with customers and associates.",
  },
]

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });

  const eventVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
    }),
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.15
      }
    })
  };

  return (
    <section className="mt-16" ref={ref}>
      <h2 className="text-2xl font-bold mb-8">Our Journey</h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

        <div className="space-y-12">
          <AnimatePresence>
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                variants={eventVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={index}
              >
                <div className="md:w-1/2"></div>

                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[#39b54b] transform -translate-x-1/2 z-10"></div>

                <div className={`p-6 md:pl-0 md:w-1/2 md:px-8 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="inline-block px-3 py-1 rounded bg-[#39b54b]/10 text-[#39b54b] font-bold mb-2">
                      {event.year}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}