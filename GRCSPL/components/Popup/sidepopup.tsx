"use client";
import { useState, useEffect } from "react";
import { Gift, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const OfferPopupCard = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleClaimOffer = () => {
       window.location.href = "https://pages.razorpay.com/stores/st_QD6JmHuMK8AMiy";
      confetti({
        particleCount: 530,
        spread:120,
        origin: { y: 0.5},
        colors: ["#ff6b6b", "#ffa502", "#f4d35e", "#2ed573", "#1e90ff", "#a29bfe", "#e84393"],
      });
    };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 w-80 max-w-xs rounded-2xl shadow-2xl bg-white p-4 border border-gray-200"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Gift className="text-[#39b54b]" size={24} />
              <h2 className="text-lg font-semibold text-gray-800">
                Special Offer!
              </h2>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-gray-400 hover:text-red-400 transition"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Get <span className="font-bold text-[#39b54b]">50% off </span> on
            your first purchase. Limited time only!
          </p>

          <div className="flex gap-2">
              <button onClick={handleClaimOffer} className="flex-1 bg-[#39b54b] hover:bg-[#2ea441] text-white font-medium py-2 rounded-xl transition">
                Claim Offer
              </button>
            <button
              onClick={() => setVisible(false)}
              className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-xl transition"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfferPopupCard;
