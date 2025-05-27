"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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

  // Normalize pathname to handle trailing slashes
  const normalizePath = (path:string) => path.replace(/\/$/, "") || "/";

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/business-opportunity", label: t("nav.business") },
    { href: "/products", label: t("nav.products") },
    { href: "/events", label: t("nav.events") },
    { href: "/offers", label: t("nav.offers") },
    { href: "/resources", label: t("nav.resources") },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-700 hover:text-[#39b54b] transition-colors duration-200 ${
                  normalizePath(pathname) === normalizePath(link.href)
                    ? "!text-[#39b54b] font-semibold"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                variant="ghost"
                onClick={toggleLanguage}
                className="text-gray-700 hover:text-[#39b54b]"
              >
                {language === "en" ? "தமிழ்" : "English"}
              </Button>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link href="/associate-portal">
                <Button
                  variant="outline"
                  className={`border-[#39b54b] text-[#39b54b] hover:bg-[#39b54b] hover:text-white ${
                    normalizePath(pathname) === "/associate-portal"
                      ? "!text-[#39b54b] !border-[#39b54b] font-semibold"
                      : ""
                  }`}
                >
                  {t("nav.portal")}
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link href="/contact">
                <Button
                  className={`bg-[#39b54b] hover:bg-[#2da03e] text-white ${
                    normalizePath(pathname) === "/contact" ? "!bg-[#2da03e] font-semibold" : ""
                  }`}
                >
                  {t("nav.contact")}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="lg:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden py-4 pb-6"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={linkVariants}>
                    <Link
                      href={link.href}
                      className={`text-gray-700 hover:text-[#39b54b] transition-colors duration-200 ${
                        normalizePath(pathname) === normalizePath(link.href)
                          ? "!text-[#39b54b] font-semibold"
                          : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={linkVariants}>
                  <Link
                    href="/associate-portal"
                    className={`text-gray-700 hover:text-[#39b54b] transition-colors duration-200 ${
                      normalizePath(pathname) === "/associate-portal"
                        ? "!text-[#39b54b] font-semibold"
                        : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.portal")}
                  </Link>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <Link
                    href="/contact"
                    className={`text-gray-700 hover:text-[#39b54b] transition-colors duration-200 ${
                      normalizePath(pathname) === "/contact" ? "!text-[#39b54b] font-semibold" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.contact")}
                  </Link>
                </motion.div>

                <motion.div className="pt-2" variants={linkVariants}>
                  <Button
                    variant="outline"
                    onClick={toggleLanguage}
                    className="w-full justify-center text-gray-700 hover:text-[#39b54b] hover:border-[#39b54b]"
                  >
                    {language === "en" ? "தமிழ்" : "English"}
                  </Button>
                </motion.div>

                <motion.div className="flex space-x-4 pt-2" variants={linkVariants}>
                  <Button className="flex-1 bg-[#39b54b] hover:bg-[#2da03e]">
                    <Phone size={16} className="mr-2" />
                    Call Us
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-[#39b54b] text-[#39b54b] hover:bg-[#39b54b] hover:text-white"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    WhatsApp
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}