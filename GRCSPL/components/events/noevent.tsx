"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  Globe,
  Star,
  ArrowRight,
  Sparkles,
  Bell,
} from "lucide-react";
import { registerForNotification } from "../api/notify";

const EventsPage = () => {
  type LanguageType = "en" | "ta";
  const [language, setLanguage] = useState<LanguageType>("en");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = {
    en: {
      title: "Upcoming Events",
      subtitle: "Discover amazing experiences",
      searchPlaceholder: "Search events...",
      filterBtn: "Filter",
      noEventsTitle: "No Events Listed",
      noEventsSubtitle: "Upcoming events will be listed here",
      noEventsDescription:
        "Stay tuned for exciting events and experiences. We'll notify you when new events are available!",
      comingSoon: "Coming Soon",
      stayTuned: "Stay Tuned",
      notifyMe: "Notify Me",
    },
    ta: {
      title: "வரவிருக்கும் நிகழ்வுகள்",
      subtitle: "அற்புதமான அனுபவங்களை கண்டறியுங்கள்",
      searchPlaceholder: "நிகழ்வுகளை தேடுங்கள்...",
      filterBtn: "வடிகட்டி",
      noEventsTitle: "நிகழ்வுகள் பட்டியலிடப்படவில்லை",
      noEventsSubtitle: "வரவிருக்கும் நிகழ்வுகள் இங்கே பட்டியலிடப்படும்",
      noEventsDescription:
        "உற்சாகமான நிகழ்வுகள் மற்றும் அனுபவங்களுக்காக காத்திருங்கள். புதிய நிகழ்வுகள் கிடைக்கும்போது நாங்கள் உங்களுக்கு அறிவிப்போம்!",
      comingSoon: "விரைவில் வரும்",
      stayTuned: "தொடர்ந்து பார்க்கவும்",
      notifyMe: "எனக்கு அறிவிக்கவும்",
    },
  };

  const t = content[language];

  

  interface NotificationPreferences {
    newProduct: boolean;
    'discount & offer': boolean;
    'Product Traning': boolean;
    'Business updates': boolean;
  }

  interface FormData {
    name: string;
    phoneNumber: string;
    email?: string;
    notificationPreferences: NotificationPreferences;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: FormData = {
      name: formData.name,
      phoneNumber: formData.phone, // Corrected field name
      email: formData.email || 'info@grcspl.com',
      notificationPreferences: {
        newProduct: true,
        'discount & offer': true,
        'Product Traning': false,
        'Business updates': true,
      },
    };

    try {
      await registerForNotification(payload);
      setIsSubmitted(true);
    } catch (error) {
      alert(`Failed to register. Please try again. Error: ${error}`);
    }
  };

  const handleGetOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.phone) {
      // In a real application, this would trigger an API call to send an OTP.
      console.log(`Simulating OTP request for ${formData.phone}`);
      alert(`An OTP has been sent to ${formData.phone}.`);
    } else {
      alert("Please enter a phone number first.");
    }
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

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
            onClick={() => setLanguage(language === "en" ? "ta" : "en")}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100"
          >
            <Globe className="h-4 w-4 text-[#39b54b]" />
            <span className="text-sm font-medium text-gray-700">
              {language === "en" ? "தமிழ்" : "EN"}
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
            <h2 className="text-2xl font-bold text-gray-800">
              {t.noEventsTitle}
            </h2>
            <p className="text-lg text-[#39b54b] font-medium">
              {t.noEventsSubtitle}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t.noEventsDescription}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => setShowModal(true)}
              className="group flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#39b54b] to-[#4ade80] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
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
            <span className="text-[#39b54b] font-medium text-sm">
              {t.comingSoon}
            </span>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-gray-100">
            <button
              onClick={() => {
                setShowModal(false);
                setIsSubmitted(false);
                setFormData({ name: "", phone: "", email: "" });
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>

            {!isSubmitted ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl overflow-y-auto max-h-[90vh]">
                  {/* Close Button */}
                  <button
                    onClick={() =>  setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                  >
                    ✕
                  </button>

                  {/* Header Section */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#39b54b] to-[#4ade80] rounded-full flex items-center justify-center">
                      <Bell className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        Stay Updated
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Get notified about upcoming events
                      </p>
                    </div>
                  </div>

                  {/* Form Section */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#39b54b]/20 focus:border-[#39b54b] transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                      Phone Number
                      </label>
                      <div className="flex space-x-2">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,10}$/.test(value)) {
                          handleChange(e);
                        }
                        }}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#39b54b]/20 focus:border-[#39b54b] transition-all"
                      />
                      </div>
                      {formData.phone.length > 0 && formData.phone.length < 10 && (
                      <p className="text-xs text-red-500">
                        Phone number must be exactly 10 digits.
                      </p>
                      )}
                    </div>

                    

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#39b54b]/20 focus:border-[#39b54b] transition-all"
                      />
                      <p className="text-xs text-gray-500">
                        We'll use info@grland.com if not provided
                      </p>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">
                        Notification Preferences
                      </label>
                      <div className="space-y-2">
                        {[
                          { id: "newProduct", label: "New Products" },
                          { id: "discountOffer", label: "Discounts & Offers" },
                          { id: "productTraining", label: "Product Training" },
                          { id: "businessUpdates", label: "Business Updates" },
                        ].map((pref) => (
                          <div key={pref.id} className="flex items-center">
                            <input
                              id={pref.id}
                              type="checkbox"
                              defaultChecked
                              className="w-4 h-4 text-[#39b54b] rounded border-gray-300 focus:ring-[#39b54b]"
                            />
                            <label
                              htmlFor={pref.id}
                              className="ml-2 text-sm text-gray-700"
                            >
                              {pref.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-[#39b54b] to-[#4ade80] text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 mt-4"
                    >
                      <span>Submit</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            ) : (
                <div className="text-center py-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#39b54b] to-[#4ade80] rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                  Registration Successful!
                  </h3>
                  <p className="text-gray-600">
                  Thank you for registering. We will notify you about upcoming events.
                  </p>
                  <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gradient-to-r from-[#39b54b] to-[#4ade80] text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                  Close
                  </button>
                </div>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
