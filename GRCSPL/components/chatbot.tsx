"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BotMessageSquare, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "👋 Hi there! I'm your GRCSPL Online assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate bot response with common college-related queries
    setTimeout(() => {
      let botResponse =
        "Hello! I'm here to help you with information about our products, business opportunities, and company details. Ask me about home care, personal care, health care, auto care products, or joining our network!";

      const lowerCaseMessage = message.toLowerCase();

      // Home Care Products
      if (
        lowerCaseMessage.includes("home care") ||
        lowerCaseMessage.includes("cleaning") ||
        lowerCaseMessage.includes("detergent")
      ) {
        botResponse =
          "🏠 Our Home Care range includes: FABRICARE LIQUID DETERGENT 500ml, GR SANITONE TOILET CLEANER 500ml, GR FABRICOOL AFTER WASH 250ml, KITCHEN SCRUBE 3pc (WITH SS THREAD), MULTIPURPOSE CLEANING SCRUBBER 1pc, MULTI PURPOSE STAIN REMOVER 200ml, BATH ROOM TILE CLEANER 500ml, DISH WASH PLUS (GREEN) 250ml, FLOREX PLUS CLEANER 500ml, GLASS CLEANER 500ml. All products available at 50% off until October 20! Which product interests you?";
      } else if (
        lowerCaseMessage.includes("fabricare") ||
        lowerCaseMessage.includes("liquid detergent")
      ) {
        botResponse =
          "FABRICARE LIQUID DETERGENT 500ml is our premium fabric care solution. Perfect for all types of clothing, it removes tough stains while being gentle on fabrics. Currently available at 50% off! Would you like to know about bulk pricing or ordering?";
      } else if (
        lowerCaseMessage.includes("toilet cleaner") ||
        lowerCaseMessage.includes("sanitone")
      ) {
        botResponse =
          "GR SANITONE TOILET CLEANER 500ml provides powerful disinfection and removes tough stains. Safe for all toilet types and kills 99.9% germs. Special 50% discount available until October 20. Need ordering details?";
      } else if (
        lowerCaseMessage.includes("kitchen scrub") ||
        lowerCaseMessage.includes("scrubber")
      ) {
        botResponse =
          "Our KITCHEN SCRUBE 3pc (WITH SS THREAD) and MULTIPURPOSE CLEANING SCRUBBER are perfect for tough cleaning jobs. Durable, long-lasting, and effective on all surfaces. Both available at 50% off. Want to add these to your order?";

        // Personal Care Products
      } else if (
        lowerCaseMessage.includes("personal care") ||
        lowerCaseMessage.includes("beauty") ||
        lowerCaseMessage.includes("skin care")
      ) {
        botResponse =
          "✨ Our Personal Care collection includes: Natural Aloe Vera Gel 60gm, ALOENOVA Milk Soap 80gm, ALOENOVA Lemon Grass Soap 100gm, GEEAAR GLOW & SECRETS RED ONION HAIR OIL 200ml, Body Lotion 200ml, Anti-Dandruff Shampoo 200ml, Herbal Shampoo 200ml, Body Wash 200ml, Face Wash Cake 30gm. All at 50% off until October 20! Which product would you like to know more about?";
      } else if (
        lowerCaseMessage.includes("aloe vera") ||
        lowerCaseMessage.includes("gel")
      ) {
        botResponse =
          "Natural Aloe Vera Gel 60gm is 100% pure and natural. Perfect for skin hydration, healing minor cuts, and soothing sunburn. Currently 50% off! Great for daily skincare routine. Want to order?";
      } else if (
        lowerCaseMessage.includes("red onion") ||
        lowerCaseMessage.includes("hair oil")
      ) {
        botResponse =
          "GEEAAR GLOW & SECRETS RED ONION HAIR OIL 200ml promotes hair growth, reduces hair fall, and adds natural shine. Enriched with natural extracts. 50% discount available! Perfect for all hair types. Interested in trying it?";
      } else if (
        lowerCaseMessage.includes("shampoo") ||
        lowerCaseMessage.includes("anti-dandruff") ||
        lowerCaseMessage.includes("herbal")
      ) {
        botResponse =
          "We have GEEAAR GLOW & SECRETS ANTI-DANDRUFF SHAMPOO 200ml and HERBAL SHAMPOO 200ml. Both are sulfate-free, natural, and effective. Anti-dandruff variant fights flakes, while herbal variant nourishes hair naturally. Both at 50% off! Which one suits your needs?";

        // Health Care Products
      } else if (
        lowerCaseMessage.includes("health care") ||
        lowerCaseMessage.includes("supplement") ||
        lowerCaseMessage.includes("capsule")
      ) {
        botResponse =
          "🌿 Our Health Care range includes: MORINGO CAPSULES 60tablets, JOINT PAIN RELEAVER CAPSULE 30tablets, GR NATURE CARE STAMINA BOOSTER 10tablets, GR NATURE FRESH ORGANIC MORINGA TEA 50gm. All natural, safe, and effective. 50% off until October 20! Which health concern can we help you with?";
      } else if (
        lowerCaseMessage.includes("moringa") ||
        lowerCaseMessage.includes("moringo")
      ) {
        botResponse =
          "MORINGO CAPSULES 60tablets and ORGANIC MORINGA TEA 50gm are packed with vitamins, minerals, and antioxidants. Boosts immunity, energy levels, and overall health. 100% natural and organic. Both available at 50% off! Want to start your wellness journey?";
      } else if (
        lowerCaseMessage.includes("joint pain") ||
        lowerCaseMessage.includes("pain relief")
      ) {
        botResponse =
          "JOINT PAIN RELEAVER CAPSULE 30tablets provides natural relief from joint pain and inflammation. Made with herbal ingredients, safe for long-term use. Currently 50% off! Consult your doctor before use. Need more information?";
      } else if (
        lowerCaseMessage.includes("stamina") ||
        lowerCaseMessage.includes("booster")
      ) {
        botResponse =
          "GR NATURE CARE STAMINA BOOSTER 10tablets enhances energy, stamina, and vitality naturally. Perfect for active lifestyle and daily energy needs. 50% discount available! Want to boost your energy levels?";

        // Auto Care Products
      } else if (
        lowerCaseMessage.includes("auto care") ||
        lowerCaseMessage.includes("car care") ||
        lowerCaseMessage.includes("vehicle")
      ) {
        botResponse =
          "🚗 Our Auto Care collection includes: PLASTIC RESTORER 200ml, CAR INTERIOR POLISH 200ml, CAR SCREEN WASH Liquid 200ml, CAR DASHBOARD Shine 100gm, CAR Ultra Foam SHAMPOO 200ml, G.COAT WIND SHIELD PROTECTOR 50ml, WATER SPOT REMOVER 200ml. Keep your car looking new! All at 50% off until October 20. Which product do you need?";
      } else if (
        lowerCaseMessage.includes("car shampoo") ||
        lowerCaseMessage.includes("foam")
      ) {
        botResponse =
          "CAR Ultra Foam SHAMPOO 200ml creates rich foam that gently cleans your car's exterior without scratching. Removes dirt, grime, and road salt effectively. 50% off currently! Perfect for weekly car wash routine. Ready to order?";
      } else if (
        lowerCaseMessage.includes("dashboard") ||
        lowerCaseMessage.includes("interior polish")
      ) {
        botResponse =
          "CAR DASHBOARD Shine 100gm and CAR INTERIOR POLISH 200ml keep your car's interior looking new. Dashboard shine provides UV protection and lustrous finish. Interior polish cleans and protects all surfaces. Both 50% off! Want to upgrade your car care?";

        // Business Opportunity
      } else if (
        lowerCaseMessage.includes("join") ||
        lowerCaseMessage.includes("business") ||
        lowerCaseMessage.includes("opportunity")
      ) {
        botResponse =
          "🚀 Join our network with ZERO joining fee! Enjoy weekly and monthly payouts, fixed income options, and regular offers. We provide free training, webinars, product knowledge sessions, business presentations, and sales training. Start earning today! Want to know more about our compensation plan?";
      } else if (
        lowerCaseMessage.includes("joining fee") ||
        lowerCaseMessage.includes("fee") ||
        lowerCaseMessage.includes("cost")
      ) {
        botResponse =
          "Great news! There's absolutely NO JOINING FEE to start your business with us. You can begin earning immediately with our weekly and monthly payout system. We also offer fixed income options for steady earnings. Ready to start your entrepreneurial journey?";
      } else if (
        lowerCaseMessage.includes("payout") ||
        lowerCaseMessage.includes("income") ||
        lowerCaseMessage.includes("earning")
      ) {
        botResponse =
          "We offer multiple earning options: Weekly payouts for quick cash flow, Monthly payouts for steady income, and Fixed income plans for guaranteed returns. Plus regular monthly, weekly, and yearly special offers to boost your earnings! Want details about our compensation structure?";
      } else if (
        lowerCaseMessage.includes("training") ||
        lowerCaseMessage.includes("webinar") ||
        lowerCaseMessage.includes("learn")
      ) {
        botResponse =
          "We provide comprehensive FREE training including: Product knowledge sessions, Business presentation training, Sales training, Motivational webinars, and ongoing support. Our training ensures your success in the network marketing business. Ready to join our next training session?";

        // Company Updates
      } else if (
        lowerCaseMessage.includes("software") ||
        lowerCaseMessage.includes("dashboard") ||
        lowerCaseMessage.includes("october") ||
        lowerCaseMessage.includes("commission")
      ) {
        botResponse =
          "🔄 Important Update: Our new user dashboard and commission system will be ready by October 20, 2024. Until then, all commissions are on hold, but you can enjoy 50% discount on ALL products! This is the perfect time to stock up and build your customer base. Questions about the transition?";
      } else if (
        lowerCaseMessage.includes("50%") ||
        lowerCaseMessage.includes("discount") ||
        lowerCaseMessage.includes("offer")
      ) {
        botResponse =
          "🎉 SPECIAL OFFER: 50% discount on ALL products until October 20, 2024! This includes all home care, personal care, health care, and auto care products. Perfect time to try our products or stock up. Plus we have regular monthly, weekly, and yearly offers for ongoing savings!";

        // Price Inquiry
      } else if (
        lowerCaseMessage.includes("price") ||
        lowerCaseMessage.includes("cost") ||
        lowerCaseMessage.includes("how much")
      ) {
        botResponse =
          "All our products are currently available at 50% OFF until October 20! Prices vary by product category. Home care products start from ₹50, Personal care from ₹75, Health care from ₹200, and Auto care from ₹100. Which specific product pricing would you like to know?";

        // Ordering
      } else if (
        lowerCaseMessage.includes("order") ||
        lowerCaseMessage.includes("buy") ||
        lowerCaseMessage.includes("purchase")
      ) {
        botResponse =
          "Ready to order? You can place orders through our network partners or contact our customer service. With 50% off until October 20, it's the perfect time to try our products! Would you like me to connect you with a nearby distributor or provide ordering contact details?";

        // General Product Inquiry
      } else if (
        lowerCaseMessage.includes("product") ||
        lowerCaseMessage.includes("catalog") ||
        lowerCaseMessage.includes("list")
      ) {
        botResponse =
          "We offer 4 main categories: 🏠 Home Care (10 products), ✨ Personal Care (9 products), 🌿 Health Care (4 products), and 🚗 Auto Care (7 products). All currently 50% off until October 20! Which category interests you most?";

        // Contact/Support
      } else if (
        lowerCaseMessage.includes("contact") ||
        lowerCaseMessage.includes("support") ||
        lowerCaseMessage.includes("help")
      ) {
        botResponse =
          "I'm here to help! You can ask me about any product details, business opportunities, pricing, or company information. For direct support or to connect with a distributor in your area, I can provide contact details. What specific help do you need?";
      } else {
        botResponse =
          "I can help you with information about our Home Care, Personal Care, Health Care, and Auto Care products, business opportunities, current offers, or joining our network. What would you like to know more about?";
      }

      const botMessageObj: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessageObj]);
      setIsTyping(false);
    }, 1000);
  };

  const [showMessage, setShowMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setShowMessage(true);
    audioRef.current?.play().catch(() => {
      console.warn("Autoplay blocked by browser.");
    });
  }, []);

  return (
    <>
      {/* Chat toggle button */}
      <motion.div
        className="fixed bottom-6 right-6 z-10 flex flex-col items-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.img
          key={Date.now()}
          src="/robo.gif"
          alt="Robot assistant" 
          className="w-[125px] h-[125px] cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            duration: 1.8,
            ease: "easeOut"
          }}
        />

        {/* Music */}
        <audio ref={audioRef} src="/robot-tone.mp3" preload="auto" />
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex w-96 max-w-[calc(100vw-2rem)] flex-col rounded-2xl bg-white shadow-xl dark:bg-gray-800"
          >
            {/* Chat  flex-col rounded-2xl bg-white shadow-xl dark:bg-gray-800"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between rounded-t-2xl bg-[#39b54b] p-4 text-white">
              <div className="flex items-center">
                <Bot className="mr-2 h-6 w-6" />
                <div>
                  <h3 className="font-bold">GRCSPL Assistant</h3>
                  <p className="text-xs text-orange-100">
                    Online | Typically replies instantly
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-white hover:bg-[#39b54b]"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat messages */}
            <div
              className="flex flex-1 flex-col overflow-y-auto p-4 chat-window"
              style={{ maxHeight: "350px" }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 max-w-[80%] rounded-2xl p-3 ${
                    msg.sender === "user"
                      ? "ml-auto bg-[#39b54b] text-white"
                      : "mr-auto bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="mt-1 text-right text-xs opacity-70">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}

              {isTyping && (
                <div className="mr-auto mb-4 flex max-w-[80%] items-center rounded-2xl bg-gray-100 p-3 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  <div className="flex space-x-1">
                    <motion.div
                      className="h-2 w-2 rounded-full bg-gray-500"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                    />
                    <motion.div
                      className="h-2 w-2 rounded-full bg-gray-500"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                    />
                    <motion.div
                      className="h-2 w-2 rounded-full bg-gray-500"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form
              onSubmit={handleSendMessage}
              className="border-t p-3 dark:border-gray-700"
            >
              <div className="flex items-center rounded-full border bg-gray-50 px-4 py-2 dark:border-gray-600 dark:bg-gray-700">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent text-sm focus:outline-none dark:text-white"
                />
                <Button
                  type="submit"
                  disabled={!message.trim()}
                  size="icon"
                  className="ml-2 h-8 w-8 rounded-full bg-[#39b54b] p-0 text-white hover:bg-[#39b54b] disabled:bg-green-400"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                Ask about products quries,business eraning or anything else!
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
