"use client";
import { useModal } from "../contexts/ModalContext";
import { X, User, Mail, Phone, GraduationCap, Send } from "lucide-react";
import { useState } from "react";

export default function ApplyModal({ schoolId, schoolName }) {
  const { closeModal } = useModal();
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null); // Reset status

    const formData = new FormData(e.target);
    const apiData = new FormData();
    apiData.append("name", formData.get("parentName"));
    apiData.append("email", formData.get("email"));
    apiData.append("phone", formData.get("phone"));
    apiData.append("student_class", formData.get("class"));
    apiData.append("message", formData.get("message"));
    apiData.append("school_id", schoolId);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_APPLY_FORM_URL, {
        method: "POST",
        body: apiData,
      });
      const responseText = await response.text();

      if (response.ok) {
        setSubmitStatus("success");

        // Optional: Close modal after 3 seconds
        setTimeout(() => {
          closeModal();
        }, 3000);
      } else {
        console.error("Error submitting application");
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Network error:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl mx-auto relative overflow-hidden border border-gray-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/80 hover:bg-gray-100 shadow-md transition cursor-pointer"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-[90vh]">
          {/* LEFT SIDE - FORM */}
          <div className="p-6 md:p-10 flex flex-col h-full overflow-y-auto">
            <div className="text-center mb-6 shrink-0">
              <h2 className="text-xl md:text-3xl font-bold text-gray-800">
                Apply to{" "}
                <span className="font-semibold text-blue-600">
                  {schoolName}
                </span>
              </h2>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Please fill out the form below to apply.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 flex-1">
              {/* Parent Name */}
              <div>
                <label
                  htmlFor="parentName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Parent Name *
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                  <span className="px-3 text-gray-500">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    placeholder="Enter Parent's Full Name"
                    className="flex-1 p-3 focus:outline-none text-sm"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                  <span className="px-3 text-gray-500">
                    <Phone size={18} />
                  </span>
                  <div className="bg-gray-100 px-3 py-2 text-sm text-gray-600 border-r">
                    +91
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="10-digit Mobile Number"
                    className="flex-1 p-3 focus:outline-none text-sm"
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address 
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                  <span className="px-3 text-gray-500">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="flex-1 p-3 focus:outline-none text-sm"
       
                  />
                </div>
              </div>

              {/* Class */}
              <div>
                <label
                  htmlFor="class"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Class *
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                  <span className="px-3 text-gray-500">
                    <GraduationCap size={18} />
                  </span>
                  <select
                    id="class"
                    name="class"
                    className="flex-1 p-3 focus:outline-none text-sm"
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="Pre-Nursery">Pre-Nursery</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(
                      (grade) => (
                        <option key={grade} value={grade.toString()}>
                          Class {grade}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter any additional message"
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  rows="4"
                />
              </div>

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                  <strong className="font-bold">Success! </strong>
                  <span className="block sm:inline">
                    Application submitted successfully!
                  </span>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  <strong className="font-bold">Error! </strong>
                  <span className="block sm:inline">
                    There was an error submitting your application. Please try
                    again.
                  </span>
                </div>
              )}

              {/* Privacy */}
              <p className="text-xs text-gray-600 text-center">
                By submitting, you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>{" "}
                &{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms
                </a>
              </p>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={18} /> Submit Application
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex relative h-full">
            <img
              src="https://res.cloudinary.com/dnq8fbcxh/image/upload/v1756959969/ChatGPT_Image_Sep_4_2025_09_53_00_AM_qgecs2.png"
              alt="Admissions"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 md:p-10 text-white">
              <img
                src="https://res.cloudinary.com/dnq8fbcxh/image/upload/v1756960347/logo_la8ski.webp"
                alt="School Logo"
                className="w-40 h-40 md:w-48 md:h-36 object-contain drop-shadow-lg"
              />
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                Unlock Your Child's Bright Future
              </h3>
              <p className="text-sm md:text-lg max-w-md leading-relaxed">
                Join thousands of parents who trusted us for the best school
                recommendations, expert counselling, and hassle-free admissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
