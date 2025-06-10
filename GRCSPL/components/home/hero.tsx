"use client";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import AnnouncementBanner from "@/components/AnnouncementBanner";


export default function Hero() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/banner/1.jpg",
    "/banner/2.jpg",
    "/banner/5.jpg",
    "/banner/6.jpg",
    "/banner/7.jpg",
    "/banner/8.jpg",
    "/banner/9.jpg",
    "/banner/10.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-10 md:py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="p-4">
              <AnnouncementBanner />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-xl text-gray-600">{t("hero.subtitle")}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/business-opportunity">
                <Button className="bg-[#39b54b] hover:bg-[#2da03e] text-white px-6 py-3 text-lg">
                  {t("hero.cta")}
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="border-[#39b54b] text-[#39b54b] hover:bg-[#f0f9f1] px-6 py-3 text-lg"
                >
                  {t("hero.learnMore")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/4] rounded-lg overflow-hidden shadow-xl relative">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Business opportunity in Tamil Nadu"
                  className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
            {/* <div className="absolute -bottom-2 -left-10 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="h-12 w-12 rounded-full bg-[#39b54b] flex items-center justify-center text-white font-bold text-xl">
                  ₹
                </div>
                <div>
                  <p className="font-bold text-gray-900">Start earning today</p>
                  <p className="text-sm text-gray-600">Join as entrepreneurs</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
