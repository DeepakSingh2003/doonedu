"use client";

import { useState } from "react";
import {
  CheckCircle2,
  School,
  Phone,
  Mail,
  User,
  BookOpen,
  Home,
  Search,
} from "lucide-react";

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    email: "",
    class: "",
    schoolType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mt-0 sm:mt-10">
      {/* Main Content */}
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center relative py-8"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1280&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80 z-0"></div>

        <div className="relative w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 px-4 z-10">
          {/* Left Section */}
          <div className="text-white hidden lg:w-2/5 text-center lg:text-left sm:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                Take the First Step to <br />
                <span className="text-yellow-300 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text ">
                  GET YOUR ADMISSION
                </span>
              </h1>

              <ul className="space-y-4 text-base">
                {[
                  "One to one free expert counselling*",
                  "In depth fees structure info*",
                  "Best schools in your area*",
                  "Priority application support*",
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-400 w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-blue-900/50 rounded-lg border border-blue-400/30">
                <p className="text-sm italic text-blue-100">
                  *Over 10,000+ students admitted last year*
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 lg:w-3/5 max-w-md w-full border border-white/20">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
                <School className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Start Your Admission Journey
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Fill in your details and our experts will contact you shortly
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Parent Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="parentName"
                  placeholder="Parent Name"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-10 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="flex gap-2">
                <div className="relative w-1/4">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <span className="text-gray-500 text-sm">🇮🇳</span>
                  </div>
                  <select className="w-full border border-gray-300 rounded-lg px-8 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50">
                    <option value="+91">+91</option>
                  </select>
                </div>
                <div className="relative w-3/4">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-10 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-10 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>

              {/* Select Class */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-10 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  required
                >
                  <option value="">-- Select Class --</option>
                  <option value="Nursery">Nursery</option>
                  <option value="KG">KG</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* School Type */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm font-medium text-gray-700 mb-2 text-center">
                  Preferred School Type
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="schoolType"
                      value="Day"
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      required
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Day School
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="schoolType"
                      value="Boarding"
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Boarding</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="schoolType"
                      value="Online"
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Online</span>
                  </label>
                </div>
              </div>

              <p className="text-xs text-gray-600 text-center">
                By submitting, you agree to our{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:text-blue-800 transition"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:text-blue-800 transition"
                >
                  Terms & Conditions
                </a>
                .
              </p>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium shadow-md"
              >
                Book Free Consultation
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse mr-1"></span>
                Our counsellors are available now
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
