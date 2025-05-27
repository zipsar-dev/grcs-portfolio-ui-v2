"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
];

export default function Timeline() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.3,
      },
    },
  };

  const eventVariants = (isOdd:boolean) => ({
    hidden: { 
      opacity: 0, 
      x: isOdd ? 100 : -100, // Odd: from right, Even: from left
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        type: "tween",
      },
    },
  });

  return (
    <section className="mt-16">
      <motion.h2
        className="text-2xl font-bold mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        Our Journey
      </motion.h2>

      <div className="relative">
        <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

        <motion.div
          ref={sectionRef}
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <AnimatePresence>
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className={`relative w-full flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                variants={eventVariants(index % 2 === 0)}
              >
                <div className="md:w-1/2"></div>

                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[#39b54b] transform -translate-x-1/2 z-10"></div>

                <div className="pl-6 md:w-1/2 md:px-8">
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
        </motion.div>
      </div>
    </section>
  );
}