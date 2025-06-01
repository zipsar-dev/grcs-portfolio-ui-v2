"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageSquare } from "lucide-react";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ta" : "en");
  };

  const isActiveLink = (href:string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const getLinkClasses = (href:string) => {
    const baseClasses = "transition-all duration-300 ease-in-out relative";
    const isActive = isActiveLink(href);
    
    if (isActive) {
      return `${baseClasses} text-[#39b54b] font-medium`;
    }
    return `${baseClasses} text-gray-700 hover:text-[#39b54b]`;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/GR logo.png" alt="Logo" className="h-8 w-6" />
            <span className="text-2xl font-bold text-[#39b54b]">GRCSPL</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={getLinkClasses("/")}
            >
              <span className="relative">
                {t("nav.home")}
                {isActiveLink("/") && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#39b54b]"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </span>
            </Link>
            <Link
              href="/about"
              className={getLinkClasses("/about")}
            >
              <span className="relative">
                {t("nav.about")}
                {isActiveLink("/about") && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#39b54b]"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </span>
            </Link>
            <Link
              href="/business-opportunity"
              className={getLinkClasses("/business-opportunity")}
            >
              <span className="relative">
                {t("nav.business")}
                {isActiveLink("/business-opportunity") && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#39b54b]"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </span>
            </Link>
            <Link
              href="/products"
              className={getLinkClasses("/products")}
            >
              <span className="relative">
                {t("nav.products")}
                {isActiveLink("/products") && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#39b54b]"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </span>
            </Link>
            <Link
              href="/events"
              className={getLinkClasses("/events")}
            >
              <span className="relative">
                {t("nav.events")}
                {isActiveLink("/events") && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#39b54b]"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </span>
            </Link>
            <Link
              href="/offers"
              className={getLinkClasses("/offers")}
            >
              <span className="relative">
                {t("nav.offers")}
                {isActiveLink("/offers") && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#39b54b]"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </span>
            </Link>
            <Link
              href="/resources"
              className={getLinkClasses("/resources")}
            >
              <span className="relative">
                {t("nav.resources")}
                {isActiveLink("/resources") && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#39b54b]"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="text-gray-700 transition-colors duration-300 hover:text-[#39b54b]"
            >
              {language === "en" ? "தமிழ்" : "English"}
            </Button>

            <Link href="/associate-portal">
              <Button
                variant="outline"
                className={`transition-all duration-300 ease-in-out ${
                  isActiveLink("/associate-portal")
                    ? "border-[#39b54b] bg-[#39b54b] text-white"
                    : "border-[#39b54b] text-[#39b54b] hover:bg-[#39b54b] hover:text-white"
                }`}
              >
                {t("nav.portal")}
              </Button>
            </Link>

            <Link href="/contact">
              <Button className="bg-[#39b54b] hover:bg-[#2da03e] text-white transition-all duration-300 ease-in-out">
                {t("nav.contact")}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-700 transition-colors duration-300 hover:text-[#39b54b]"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 pb-6">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`${getLinkClasses("/")} block py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/about"
                className={`${getLinkClasses("/about")} block py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/business-opportunity"
                className={`${getLinkClasses("/business-opportunity")} block py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.business")}
              </Link>
              <Link
                href="/products"
                className={`${getLinkClasses("/products")} block py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.products")}
              </Link>
              <Link
                href="/events"
                className={`${getLinkClasses("/events")} block py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.events")}
              </Link>
              <Link
                href="/offers"
                className={`${getLinkClasses("/offers")} block py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.offers")}
              </Link>
              <Link
                href="/resources"
                className={`${getLinkClasses("/resources")} block py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.resources")}
              </Link>
              <Link
                href="/associate-portal"
                className={`${getLinkClasses("/associate-portal")} block py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.portal")}
              </Link>
              <Link
                href="/contact"
                className={`${getLinkClasses("/contact")} block py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.contact")}
              </Link>

              <div className="pt-2">
                <Button
                  variant="outline"
                  onClick={toggleLanguage}
                  className="w-full justify-center transition-all duration-300 hover:border-[#39b54b] hover:text-[#39b54b]"
                >
                  {language === "en" ? "தமிழ்" : "English"}
                </Button>
              </div>

              <div className="flex space-x-4 pt-2">
                <Button className="flex-1 bg-[#39b54b] hover:bg-[#2da03e] transition-all duration-300 ease-in-out">
                  <Phone size={16} className="mr-2" />
                  Call Us
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#39b54b] text-[#39b54b] hover:bg-[#39b54b] hover:text-white transition-all duration-300 ease-in-out"
                >
                  <MessageSquare size={16} className="mr-2" />
                  WhatsApp
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}