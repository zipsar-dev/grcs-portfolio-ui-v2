'use client';

import { motion } from 'framer-motion';
import { Ghost, ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col justify-center items-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="bg-[#39b54b]/20 p-6 rounded-full mb-4 shadow-lg"
      >
        <Ghost size={80} color="#39b54b" strokeWidth={1.5} />
      </motion.div>

      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Page Not Found
      </motion.h1>

      <motion.p
        className="mt-4 text-lg text-gray-600 dark:text-gray-400 text-center max-w-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Oops! The page you&#39;re looking for doesn&#39;t exist or has been moved.
      </motion.p>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-[#39b54b] text-white rounded-full hover:bg-[#2d9c3e] transition-all group"
        >
          <ArrowLeftCircle className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
