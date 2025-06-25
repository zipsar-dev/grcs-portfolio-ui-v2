"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  CheckCircle,
  Mail,
  ChevronDown,
  ArrowRight,
  Send,
} from "lucide-react";
import { sendotp, verifyotp } from "@/components/api/otp";
import { Notification } from "@/components/Notification";
import { registeruser } from "@/components/api/createuser";

export default function RegisterPage() {
  const [language, setLanguage] = useState<"english" | "tamil">("english");
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(true); 

  const locationapi = process.env.NEXT_PUBLIC_LOCATION_API_KEY;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "User@123",
    dateOfBirth: "",
    gender: "",
    occupation: "",
    location: {
      city: "",
    },
    purpose: "",
    referralCode: "",
    otpCode: "",
    otpVerified: true,
  });

  // Add a state for field errors
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    // Handle special case for location and otp
    if (name === "location") {
      setFormData({ ...formData, location: { city: value } });
    } else if (name === "otp") {
      setFormData({ ...formData, otpCode: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Email validation helper
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendOTP = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    sendotp({ phoneNumber: formData.phoneNumber })
      .then((response) => {
        if (response.success) {
          setSuccessMessage("OTP sent successfully!");
          setOtpSent(true);
        } else {
          setErrorMessage("Something went wrong. Please try again later.");
        }
      })
      .catch(() => {
        setErrorMessage("Something went wrong. Please try again later.");
      });
  };

  const verifyOTP = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    verifyotp({ phoneNumber: formData.phoneNumber, otp: formData.otpCode })
      .then((response) => {
        if (response.success) {
          setSuccessMessage("OTP verified successfully!");
          setTimeout(() => {
            setStep(2);
          }, 2000);
        } else {
          setErrorMessage("Incorrect OTP. Please try again.");
        }
      })
      .catch(() => {
        setErrorMessage("Something went wrong. Please try again later.");
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
      setSuccessMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorMessage, successMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setFieldErrors({});
    // Client-side validation
    let errors: { [key: string]: string } = {};
    if (!isValidEmail(formData.email)) {
      errors.email = "Valid email is required";
    }
    if (!formData.purpose) {
      errors.purpose = "Valid purpose is required";
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Please fix the errors in the form.");
      return;
    }
    try {
      // Ensure phone number has +91 prefix
      let phoneNumber = formData.phoneNumber;
      if (!phoneNumber.startsWith("+91")) {
        phoneNumber = "+91" + phoneNumber;
      }

      // Create the payload with the exact format expected by the API
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: phoneNumber,
        password: "User@123", // Fixed password as required
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        occupation: formData.occupation,
        location: {
          city: formData.location.city,
        },
        purpose: formData.purpose, // Purpose should match exactly "Full time work"
        referralCode: formData.referralCode || "",
        otpCode: formData.otpCode,
        otpVerified: true,
      };

      console.log("Sending payload:", payload); // For debugging

      const res = await registeruser(payload);
      if (res && res.success === false && res.errors) {
        // Show server-side validation errors
        let apiErrors: { [key: string]: string } = {};
        res.errors.forEach((err: any) => {
          if (err.path && err.msg) apiErrors[err.path] = err.msg;
        });
        setFieldErrors(apiErrors);
        setErrorMessage(
          res.message || "Registration failed. Please try again."
        );
        return;
      }
      setSuccess(true);
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const content = {
    english: {
      title: "Join Our Community",
      subtitle: "Fill in your details to get started",
      fullName: "Full Name",
      phone: "Phone Number",
      sendOtp: "Send OTP",
      enterOtp: "Enter OTP",
      verifyOtp: "Verify",
      dob: "Date of Birth",
      gender: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      occupation: "Occupation",
      location: "Location",
      purpose: "Purpose",
      purpose1: "Full Time Work",
      purpose2: "Part Time Work",
      purpose3: "Only to Purchase Products",
      purpose4: "Company Benefits",
      purpose5: "Others",
      register: "Complete Registration",
      next: "Next",
      back: "Back",
      success: "Registration Successful!",
      thankYou:
        "Thank you for joining us. We look forward to working with you.",
      home: "Return to Home",
    },
    tamil: {
      title: "எங்கள் சமூகத்தில் இணையுங்கள்",
      subtitle: "தொடங்குவதற்கு உங்கள் விவரங்களை நிரப்பவும்",
      fullName: "முழு பெயர்",
      phone: "தொலைபேசி எண்",
      sendOtp: "OTP அனுப்பு",
      enterOtp: "OTP ஐ உள்ளிடவும்",
      verifyOtp: "சரிபார்க்க",
      dob: "பிறந்த தேதி",
      gender: "பாலினம்",
      male: "ஆண்",
      female: "பெண்",
      other: "மற்றவை",
      occupation: "தொழில்",
      location: "இருப்பிடம்",
      purpose: "நோக்கம்",
      purpose1: "முழு நேர வேலை",
      purpose2: "பகுதி நேர வேலை",
      purpose3: "தயாரிப்புகளை வாங்க மட்டுமே",
      purpose4: "நிறுவன நன்மைகள்",
      purpose5: "மற்றவை",
      register: "பதிவை முடிக்கவும்",
      next: "அடுத்து",
      back: "பின்செல்",
      success: "பதிவு வெற்றிகரமாக முடிந்தது!",
      thankYou: "இணைந்ததற்கு நன்றி. உங்களுடன் பணியாற்ற எதிர்நோக்குகிறோம்.",
      home: "முகப்புக்கு திரும்பு",
    },
  };

  const text = language === "english" ? content.english : content.tamil;

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-20 w-20 text-[#39b54b]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {text.success}
          </h1>
          <p className="text-gray-600 mb-8">{text.thankYou}</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#39b54b] text-white font-semibold rounded-full hover:bg-[#2d9d3c] transition-colors"
          >
            {text.home}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification UI */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
        {errorMessage && (
          <Notification
            message={errorMessage}
            type="error"
            onClose={() => setErrorMessage(null)}
          />
        )}
        {successMessage && (
          <Notification
            message={successMessage}
            type="success"
            onClose={() => setSuccessMessage(null)}
          />
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-end mb-6">
          <div className="relative inline-block">
            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value as "english" | "tamil")
              }
              className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#39b54b]"
            >
              <option value="english">English</option>
              <option value="tamil">தமிழ்</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5 bg-[#39b54b] p-8 text-white flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4">{text.title}</h1>
              <p className="mb-6">{text.subtitle}</p>
              <div className="mt-auto">
                <div className="h-2 bg-white/30 rounded-full mb-2">
                  <div
                    className={`h-full bg-white rounded-full ${
                      step === 1 ? "w-1/2" : "w-full"
                    }`}
                  ></div>
                </div>
                <p className="text-sm">{step === 1 ? "1/2" : "2/2"}</p>
              </div>
            </div>

            <div className="md:w-3/5 p-8">
              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        {text.fullName}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39b54b]"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border ${
                            fieldErrors.email
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39b54b]`}
                          required
                        />
                      </div>
                      {fieldErrors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        {text.phone}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                              handleChange(e);
                            }
                          }}
                          className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39b54b]"
                          placeholder="9876543210"
                          required
                        />
                        {formData.phoneNumber.length === 10 && (
                          <button
                            type="button"
                            onClick={sendOTP}
                            className="absolute right-2 top-2 px-3 py-1 text-sm bg-[#39b54b] text-white rounded-md hover:bg-[#2d9d3c]"
                          >
                            {text.sendOtp}
                          </button>
                        )}
                      </div>
                    </div>

                    {otpSent && (
                      <div>
                        <label className="block text-gray-700 mb-2">
                          {text.enterOtp}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="otp"
                            value={formData.otpCode}
                            onChange={handleChange}
                            maxLength={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39b54b]"
                            required
                          />
                          <button
                            type="button"
                            onClick={verifyOTP}
                            className="absolute right-2 top-2 px-3 py-1 text-sm bg-[#39b54b] text-white rounded-md hover:bg-[#2d9d3c]"
                          >
                            {text.verifyOtp}
                          </button>
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        otpSent && formData.otpCode.length === 6
                          ? setStep(2)
                          : null
                      }
                      className={`w-full py-3 rounded-lg flex items-center justify-center transition-all ${
                        otpSent && formData.otpCode.length === 6
                          ? "bg-[#39b54b] text-white hover:bg-[#2d9d3c]"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {text.next} <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        {text.dob}
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          max={
                            new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() - 18
                              )
                            )
                              .toISOString()
                              .split("T")[0]
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39b54b]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        {text.gender}
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <label className="flex items-center border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-[#39b54b]">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            onChange={handleChange}
                            className="mr-2 text-[#39b54b]"
                            required
                          />
                          {text.male}
                        </label>
                        <label className="flex items-center border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-[#39b54b]">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            onChange={handleChange}
                            className="mr-2 text-[#39b54b]"
                          />
                          {text.female}
                        </label>
                        <label className="flex items-center border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-[#39b54b]">
                          <input
                            type="radio"
                            name="gender"
                            value="other"
                            onChange={handleChange}
                            className="mr-2 text-[#39b54b]"
                          />
                          {text.other}
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        {text.occupation}
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39b54b]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        {text.location}
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="location"
                          value={formData.location.city}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39b54b]"
                          required
                          placeholder="Fetching location..."
                          disabled={!formData.location.city}
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(
                                async (position) => {
                                  const { latitude, longitude } =
                                    position.coords;
                                  try {
                                    const response = await fetch(
                                      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${locationapi}` // Use your API key here
                                    );
                                    const data = await response.json();
                                    if (
                                      data &&
                                      data.address &&
                                      data.address.city
                                    ) {
                                      setFormData((prev) => ({
                                        ...prev,
                                        location: { city: data.address.city },
                                      }));
                                    }
                                  } catch (error) {
                                    console.error(
                                      "Error fetching location:",
                                      error
                                    );
                                  }
                                },
                                (error) => {
                                  console.error("Geolocation error:", error);
                                }
                              );
                            } else {
                              console.error(
                                "Geolocation is not supported by this browser."
                              );
                            }
                          }}
                          className="absolute right-2 top-2 px-3 py-1 text-sm bg-[#39b54b] text-white rounded-md hover:bg-[#2d9d3c]"
                        >
                          Detect Location
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        {text.purpose}
                      </label>
                      <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          fieldErrors.purpose
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39b54b]`}
                        required
                      >
                        <option value="">-- {text.purpose} --</option>
                        <option value="Full_time_work">{text.purpose1}</option>
                        <option value="Part_time_work">{text.purpose2}</option>
                        <option value="only_to_purchase_products">
                          {text.purpose3}
                        </option>
                        <option value="company_benefits">
                          {text.purpose4}
                        </option>
                        <option value="others">{text.purpose5}</option>
                      </select>
                      {fieldErrors.purpose && (
                        <p className="text-red-500 text-xs mt-1">
                          {fieldErrors.purpose}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-1/3 py-3 border border-[#39b54b] text-[#39b54b] rounded-lg hover:bg-gray-50"
                      >
                        {text.back}
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-3 bg-[#39b54b] text-white rounded-lg hover:bg-[#2d9d3c] flex items-center justify-center"
                      >
                        {text.register} <Send className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
