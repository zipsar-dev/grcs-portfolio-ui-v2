"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Gift, Star, Clock, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { initMixpanel } from "@/lib/mixpanelClient";
import { useRouter } from "next/navigation";

const OfferPopupCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 2);

  // Countdown logic
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = expiryDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft("Expired");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Delay show
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClaimOffer = () => {
    initMixpanel();
    window.location.href = "https://pages.razorpay.com/stores/st_QD6JmHuMK8AMiy";
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#39b54b", "#ffffff", "#facc15"],
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <canvas
        ref={confettiRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden transform transition-all duration-300 scale-100 hover:scale-[1.02]">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow hover:rotate-90 transition-transform duration-200"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Decorative Circles */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#39b54b] opacity-20 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#39b54b] opacity-10 rounded-full" />

        {/* Content */}
        <div className="relative p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#39b54b] rounded-full mb-6 shadow-lg">
            <Gift className="w-10 h-10 text-white" />
          </div>

          <div className="inline-flex items-center gap-2 bg-[#39b54b] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow">
            <Star className="w-4 h-4 fill-current" />
            Limited Time Offer
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Get <span className="text-[#39b54b]">50% OFF</span>
          </h2>

          <p className="text-lg text-gray-600 mb-6">for all Users</p>

          <p className="text-gray-500 mb-8">
            Unlock all premium features and get unlimited access to our entire
            platform. Perfect for professionals and teams.
          </p>

          <div className="flex items-center justify-center gap-2 mb-6 text-orange-600">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">
              {timeLeft === "Expired"
                ? "Offer expired"
                : `Expires in ${timeLeft}`}
            </span>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleClaimOffer}
              className="w-full bg-[#39b54b] hover:bg-[#2fa644] text-white font-semibold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 group transition-all"
            >
              Claim Offer Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            <button
              onClick={() => setIsVisible(false)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl border border-gray-200 hover:border-gray-300 transition"
            >
              Maybe Later
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            * Terms and conditions apply. Offer valid for new customers only.
          </p>
        </div>

        {/* Optional animated gradient border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-[#39b54b] via-[#2ea441] to-[#1f7e30] opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
      </div>
    </div>
  );
};

export default OfferPopupCard;
