"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isRecording, setIsRecording] = useState(false);
  const [audioText, setAudioText] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  useEffect(() => {
    if (audioText) {
      setFormData((prev) => ({ ...prev, message: audioText }));
    }
  }, [audioText]);

  const handleVoiceInput = async () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (!window.navigator.onLine) {
      alert(
        "You're offline. Please connect to the internet for voice recognition."
      );
      return;
    }

    setIsRecording(true);

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "ta-IN";
    recognition.interimResults = false;

    recognition.onresult = async (event: any) => {
      const transcript: string = event.results[0][0].transcript;
      console.log("Spoken:", transcript);

      setAudioText(transcript);
      setFormData((prev) => ({ ...prev, message: transcript }));
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-transparent"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-transparent"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-transparent"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-transparent"
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="">Select a subject</option>
              <option value="business">Business Opportunity</option>
              <option value="products">Product Information</option>
              <option value="support">Customer Support</option>
              <option value="other">Other</option>
            </select>
          </div>

            <div className="mb-4 w-full">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-transparent transition-all duration-200"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
            ></textarea>

            <button
              type="button"
              onClick={() => {
              handleVoiceInput();
              const textarea = document.getElementById("message") as HTMLTextAreaElement;
              if (textarea) {
                textarea.focus();
                textarea.select();
              }
              }}
              className={`mt-2 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
              isRecording
                ? "text-red-500 hover:text-red-600"
                : "text-[#39b54b] hover:text-[#2da03e]"
              }`}
            >
              {isRecording ? (
              <>
                <MicOff className="w-5 h-5 animate-pulse" />
                Stop Recording
              </>
              ) : (
              <>
                <Mic className="w-5 h-5" />
                Use Voice Input
              </>
              )}
            </button>
            </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-[#39b54b] hover:bg-[#2da03e]"
            >
              Send Message
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
