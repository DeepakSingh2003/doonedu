"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

function CallBackPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [preferredTime, setPreferredTime] = useState("Right Now");

  // Function to trigger popup after 8 seconds
  const triggerPopup = () => {
    const formSubmitted = localStorage.getItem("callbackFormSubmitted");
    if (!formSubmitted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  };

  // Initial trigger on component mount
  useEffect(() => {
    triggerPopup();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiData = new FormData();
    apiData.append("name", name);
    apiData.append("phone", mobile);
    apiData.append("preferredTime", preferredTime);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_APPLY_FORM_URL, {
        method: "POST",

        body: apiData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Form submitted successfully ✅");
      localStorage.setItem("callbackFormSubmitted", "true");
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // ⏳ Reopen again after 8 seconds if not submitted
    triggerPopup();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Blurred Overlay */}
      <div
        className="fixed inset-0 backdrop-blur-sm pointer-events-none z-40"
        aria-hidden="true"
      />

      {/* Popup Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div
          className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden pointer-events-auto"
          style={{ backdropFilter: "none" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Request Call Back</h3>
              <button
                onClick={handleClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-1">Save Your Precious Time</p>
            <p className="text-base font-medium text-gray-800 mb-6">
              Request a call back & Get All the info in just 2 Min.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Preferred Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option>Right Now</option>
                  <option>Today (10 AM - 12 PM)</option>
                  <option>Today (2 PM - 5 PM)</option>
                  <option>Tomorrow Morning</option>
                  <option>Tomorrow Afternoon</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter your Mobile Number
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your Mobile Number"
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition duration-200 shadow-md"
              >
                Call Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CallBackPopup;
