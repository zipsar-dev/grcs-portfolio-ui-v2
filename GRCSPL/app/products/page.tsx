"use client";
import type { Metadata } from "next";
import PageHeader from "@/components/ui-custom/page-header";
import ProductFilter from "@/components/products/product-filter";
import ProductGrid from "@/components/products/product-grid";
import React, { useState, useEffect } from "react";
import { Zap, TrendingUp, Gift, ChevronLeft, ChevronRight } from "lucide-react";

// export const metadata: Metadata = {
//   title: "Products | Business Opportunities in Tamil Nadu",
//   description: "Browse our range of products available in Tamil Nadu",
// }

const bannerSlides = [
  {
    id: 1,
    type: "offer",
    title: "MEGA SALE",
    subtitle: "Up to 50% OFF",
    description: "On all Home Care Products",
    cta: "Shop Now",
    gradient: "from-purple-600 via-pink-600 to-red-500",
    icon: <Gift className="w-8 h-8" />,
    bgPattern:
      "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
  },
  {
    id: 2,
    type: "product",
    title: "TRENDING NOW",
    subtitle: "Fabricare Liquid Detergent",
    description: "₹195 (was ₹215)",
    cta: "Buy Now",
    gradient: "from-blue-600 via-cyan-500 to-teal-400",
    icon: <TrendingUp className="w-8 h-8" />,
    bgPattern:
      "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
  },
  {
    id: 3,
    type: "flash",
    title: "FLASH DEAL",
    subtitle: "Limited Time Offer",
    description: "Extra 20% off on Health Care",
    cta: "Grab Deal",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    icon: <Zap className="w-8 h-8" />,
    bgPattern:
      "radial-gradient(circle at 30% 70%, rgba(251, 146, 60, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)",
  },
];

export default function ProductsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length
    );
  };
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner Slider */}
      <div
        className=" relative h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={` absolute inset-0 transition-all duration-700 ease-in-out transform ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <div
              className={`pl-16 h-full bg-gradient-to-br ${slide.gradient} relative overflow-hidden`}
              style={{ background: slide.bgPattern }}
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-4 sm:top-6 md:top-10 right-4 sm:right-6 md:right-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 w-12 h-12 sm:w-18 sm:h-18 md:w-24 md:h-24 bg-white/10 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/5 rounded-full animate-ping"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-12">
                  <div className="max-w-xl md:max-w-2xl">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                      <div className="p-1.5 sm:p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        {slide.icon}
                      </div>
                      <span className="text-white/10 text-xs sm:text-sm font-medium uppercase tracking-wide">
                        {slide.type}
                      </span>
                    </div>

                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-green-700 mb-1 sm:mb-2 leading-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-black mb-2 sm:mb-3 md:mb-4">
                      {slide.subtitle}
                    </h2>
                    <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-black mb-4 sm:mb-6 md:mb-8 line-clamp-2">
                      {slide.description}
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 md:p-3 bg-white/40 backdrop-blur-sm rounded-full text-black hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 md:p-3 bg-white/40 backdrop-blur-sm rounded-full text-black hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-6 sm:w-7 md:w-8"
                  : "bg-white/50 hover:bg-white/75 w-2 sm:w-2.5 md:w-3"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        {/* <div className="w-full md:w-1/4">
          <ProductFilter />
        </div> */}
        <div className="w-full md:w-4/4">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}
