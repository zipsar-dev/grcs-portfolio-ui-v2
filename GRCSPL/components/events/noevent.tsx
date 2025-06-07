
"use client";
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Search, Filter, Globe, Star, ArrowRight, Sparkles } from 'lucide-react';

const EventsPage = () => {
  type LanguageType = 'en' | 'ta';
  const [language, setLanguage] = useState<LanguageType>('en');
  const [searchTerm, setSearchTerm] = useState('');
  
  const content = {
    en: {
      title: "Upcoming Events",
      subtitle: "Discover amazing experiences",
      searchPlaceholder: "Search events...",
      filterBtn: "Filter",
      noEventsTitle: "No Events Listed",
      noEventsSubtitle: "Upcoming events will be listed here",
      noEventsDescription: "Stay tuned for exciting events and experiences. We'll notify you when new events are available!",
      comingSoon: "Coming Soon",
      stayTuned: "Stay Tuned",
      notifyMe: "Notify Me"
    },
    ta: {
      title: "வரவிருக்கும் நிகழ்வுகள்",
      subtitle: "அற்புதமான அனுபவங்களை கண்டறியுங்கள்",
      searchPlaceholder: "நிகழ்வுகளை தேடுங்கள்...",
      filterBtn: "வடிகட்டி",
      noEventsTitle: "நிகழ்வுகள் பட்டியலிடப்படவில்லை",
      noEventsSubtitle: "வரவிருக்கும் நிகழ்வுகள் இங்கே பட்டியலிடப்படும்",
      noEventsDescription: "உற்சாகமான நிகழ்வுகள் மற்றும் அனுபவங்களுக்காக காத்திருங்கள். புதிய நிகழ்வுகள் கிடைக்கும்போது நாங்கள் உங்களுக்கு அறிவிப்போம்!",
      comingSoon: "விரைவில் வரும்",
      stayTuned: "தொடர்ந்து பார்க்கவும்",
      notifyMe: "எனக்கு அறிவிக்கவும்"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#39b54b]/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#39b54b]/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#39b54b]/5 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-[#39b54b] to-[#4ade80] rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-2 w-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-[#39b54b] bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-gray-600 text-sm">{t.subtitle}</p>
            </div>
          </div>
          
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100"
          >
            <Globe className="h-4 w-4 text-[#39b54b]" />
            <span className="text-sm font-medium text-gray-700">
              {language === 'en' ? 'தமிழ்' : 'EN'}
            </span>
          </button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="relative mb-8">
            {/* Animated Calendar Icon */}
            <div className="w-32 h-32 bg-gradient-to-br from-[#39b54b]/10 to-[#39b54b]/5 rounded-3xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#39b54b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Calendar className="h-16 w-16 text-[#39b54b] relative z-10 transition-transform duration-500 group-hover:scale-110" />
              
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#39b54b] rounded-full flex items-center justify-center animate-bounce">
                <Star className="h-3 w-3 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-[#39b54b] to-[#4ade80] rounded-full flex items-center justify-center animate-pulse">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </div>
            
            {/* Animated Rings */}
            <div className="absolute inset-0 rounded-full border-2 border-[#39b54b]/20 animate-ping"></div>
            <div className="absolute inset-4 rounded-full border border-[#39b54b]/10 animate-pulse delay-200"></div>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{t.noEventsTitle}</h2>
            <p className="text-lg text-[#39b54b] font-medium">{t.noEventsSubtitle}</p>
            <p className="text-gray-600 leading-relaxed">{t.noEventsDescription}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="group flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#39b54b] to-[#4ade80] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span>{t.notifyMe}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            
            <button className="flex items-center space-x-2 px-8 py-4 bg-white text-[#39b54b] rounded-xl font-medium border-2 border-[#39b54b]/20 hover:border-[#39b54b] transition-all duration-300 shadow-sm hover:shadow-md">
              <Sparkles className="h-4 w-4" />
              <span>{t.stayTuned}</span>
            </button>
          </div>

          {/* Status Badge */}
          <div className="mt-8 inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#39b54b]/10 to-[#4ade80]/10 rounded-full border border-[#39b54b]/20">
            <div className="w-2 h-2 bg-[#39b54b] rounded-full animate-pulse"></div>
            <span className="text-[#39b54b] font-medium text-sm">{t.comingSoon}</span>
          </div>
        </div>

        {/* Footer Stats */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          {[
            { icon: Users, count: "500+", label: language === 'en' ? "Community Members" : "சமுதாய உறுப்பினர்கள்" },
            { icon: MapPin, count: "10+", label: language === 'en' ? "Locations" : "இடங்கள்" },
            { icon: Star, count: "4.9", label: language === 'en' ? "Rating" : "மதிப்பீடு" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/80 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#39b54b] to-[#4ade80] rounded-xl mb-3">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.count}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default EventsPage;