"use client"

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ShoppingCart, Clock, Gift, Globe, Zap, Shield, CheckCircle } from 'lucide-react';

export default function TrendyLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});
  const [isActive, setIsActive] = useState(false);

  // Countdown timer to October 20th
  useEffect(() => {
    const targetDate = new Date('2025-10-20T00:00:00');
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setIsActive(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const content = {
    en: {
      title: "Welcome Back",
      subtitle: "Happy to see you again!",
      email: "Email Address",
      password: "Password",
      forgotPassword: "Forgot Password?",
      signIn: "Sign In",
      noAccount: "Don't have an account?",
      signUp: "Sign Up",
      comingSoon: "Coming Soon",
      launchDate: "Launching October 20th, 2025",
      specialOffer: "50% OFF on All Products",
      offerDesc: "Get exclusive early access and save big on our daily use products!",
      features: ["Premium Quality Products", "Fast Delivery Network", "24/7 Customer Support", "Secure Payments"],
      notifyMe: "Notify Me",
      earlyAccess: "Get Early Access"
    },
    ta: {
      title: "மீண்டும் வரவேற்கிறோம்",
      subtitle: "உங்களை மீண்டும் பார்த்ததில் மகிழ்ச்சி!",
      email: "மின்னஞ்சல் முகவரி",
      password: "கடவுச்சொல்",
      forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
      signIn: "உள்நுழைய",
      noAccount: "கணக்கு இல்லையா?",
      signUp: "பதிவு செய்ய",
      comingSoon: "விரைவில் வரும்",
      launchDate: "அக்டோபர் 20, 2025 அன்று தொடங்கும்",
      specialOffer: "அனைத்து பொருட்களிலும் 50% தள்ளுபடி",
      offerDesc: "பிரத்யேக முன்கூட்டிய அணுகலைப் பெறுங்கள் மற்றும் தினசரி பயன்பாட்டு தயாரிப்புகளில் பெரும் சேமிப்பு!",
      features: ["உயர்தர பொருட்கள்", "வேகமான விநியோக நெட்வொர்க்", "24/7 வாடிக்கையாளர் ஆதரவு", "பாதுகாப்பான பேமென்ட்"],
      notifyMe: "எனக்கு அறிவிக்கவும்",
      earlyAccess: "முன்கூட்டிய அணுகல் பெறுங்கள்"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 relative z-10">
        {/* Left Side - Coming Soon Info */}
        <div className="space-y-8 text-white">
          {/* Language Toggle */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                language === 'en' 
                  ? 'bg-[#39b54b] text-white shadow-lg' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Globe className="w-4 h-4" />
              English
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                language === 'ta' 
                  ? 'bg-[#39b54b] text-white shadow-lg' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Globe className="w-4 h-4" />
              தமிழ்
            </button>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#39b54b]/20 to-emerald-500/20 px-4 py-2 rounded-full border border-[#39b54b]/30">
              <Clock className="w-5 h-5 text-[#39b54b]" />
              <span className="text-[#39b54b] font-semibold">{t.comingSoon}</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
              {t.launchDate}
            </h1>

            <div className="bg-gradient-to-r from-[#39b54b]/20 to-emerald-500/20 p-6 rounded-2xl border border-[#39b54b]/30">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-8 h-8 text-[#39b54b]" />
                <h2 className="text-2xl font-bold text-[#39b54b]">{t.specialOffer}</h2>
              </div>
              <p className="text-gray-300 mb-4">{t.offerDesc}</p>
              
              {/* Countdown Timer */}
              {!isActive && Object.keys(timeLeft).length > 0 && (
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="text-center">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                        <div className="text-2xl font-bold text-[#39b54b]">{value.toString()}</div>
                        <div className="text-xs text-white/70 uppercase tracking-wide">{unit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <CheckCircle className="w-5 h-5 text-[#39b54b] flex-shrink-0" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#39b54b] to-emerald-500 rounded-2xl mb-4 shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{t.title}</h2>
                <p className="text-gray-400">{t.subtitle}</p>
              </div>

              {/* <form className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder={t.email}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={t.password}
                      className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-400">
                    <input type="checkbox" className="rounded border-gray-600 bg-white/10" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm text-[#39b54b] hover:text-emerald-400 transition-colors">
                    {t.forgotPassword}
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={!isActive}
                  className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#39b54b] to-emerald-500 hover:from-emerald-500 hover:to-[#39b54b] shadow-lg hover:shadow-xl hover:shadow-[#39b54b]/25' 
                      : 'bg-gray-600 cursor-not-allowed'
                  }`}
                >
                  {isActive ? t.signIn : t.earlyAccess}
                </button>

                {!isActive && (
                  <button
                    type="button"
                    className="w-full py-4 rounded-2xl font-semibold text-[#39b54b] border-2 border-[#39b54b] hover:bg-[#39b54b] hover:text-white transition-all duration-300"
                  >
                    {t.notifyMe}
                  </button>
                )}

                <div className="text-center">
                  <span className="text-gray-400">{t.noAccount}</span>
                  <a href="#" className="text-[#39b54b] hover:text-emerald-400 transition-colors ml-2">
                    {t.signUp}
                  </a>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
