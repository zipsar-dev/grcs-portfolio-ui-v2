"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import devtools from "devtools-detect";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageSquare } from "lucide-react";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ta" : "en");
  };
  useEffect(() => {
    if (typeof window === "undefined") return;
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", disableContextMenu);
    return () => {
      window.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const checkDevTools = () => {
      if (devtools.isOpen) {
        window.close(); // or redirect or blank out screen
      }
    };
    const interval = setInterval(checkDevTools, 1000);
    return () => clearInterval(interval);
  }, []);

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
              className="text-gray-700 hover:text-[#39b54b] transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#39b54b] transition-colors"
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/business-opportunity"
              className="text-gray-700 hover:text-[#39b54b] transition-colors"
            >
              {t("nav.business")}
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-[#39b54b] transition-colors"
            >
              {t("nav.products")}
            </Link>
            <Link
              href="/events"
              className="text-gray-700 hover:text-[#39b54b] transition-colors"
            >
              {t("nav.events")}
            </Link>
            <Link
              href="/offers"
              className="text-gray-700 hover:text-[#39b54b] transition-colors"
            >
              {t("nav.offers")}
            </Link>
            <Link
              href="/resources"
              className="text-gray-700 hover:text-[#39b54b] transition-colors"
            >
              {t("nav.resources")}
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="text-gray-700"
            >
              {language === "en" ? "தமிழ்" : "English"}
            </Button>

            <Link href="/associate-portal">
              <Button
                variant="outline"
                className="border-[#39b54b] text-[#39b54b] hover:bg-[#39b54b] hover:text-white"
              >
                {t("nav.portal")}
              </Button>
            </Link>

            <Link href="/contact">
              <Button className="bg-[#39b54b] hover:bg-[#2da03e] text-white">
                {t("nav.contact")}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-700"
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
                className="text-gray-700 hover:text-[#39b54b] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-[#39b54b] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/business-opportunity"
                className="text-gray-700 hover:text-[#39b54b] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.business")}
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-[#39b54b] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.products")}
              </Link>
              <Link
                href="/events"
                className="text-gray-700 hover:text-[#39b54b] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.events")}
              </Link>
              <Link
                href="/offers"
                className="text-gray-700 hover:text-[#39b54b] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.offers")}
              </Link>
              <Link
                href="/resources"
                className="text-gray-700 hover:text-[#39b54b] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.resources")}
              </Link>
              <Link
                href="/associate-portal"
                className="text-gray-700 hover:text-[#39b54b] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.portal")}
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-[#39b54b] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.contact")}
              </Link>

              <div className="pt-2">
                <Button
                  variant="outline"
                  onClick={toggleLanguage}
                  className="w-full justify-center"
                >
                  {language === "en" ? "தமிழ்" : "English"}
                </Button>
              </div>

              <div className="flex space-x-4 pt-2">
                <Button className="flex-1 bg-[#39b54b] hover:bg-[#2da03e]">
                  <Phone size={16} className="mr-2" />
                  Call Us
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#39b54b] text-[#39b54b]"
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
