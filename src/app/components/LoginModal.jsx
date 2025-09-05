"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", activeTab, formData);
  };

  const isSchool = activeTab === "schoolSignup" || activeTab === "schoolLogin";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl md:max-w-5xl flex flex-col md:flex-row overflow-hidden animate-fadeIn">
        {/* Left Info Section */}
        <div className="hidden w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 md:p-8 space-y-6 sm:flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center md:text-left">
            Why Join Us?
          </h2>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔍</span>
            <p>Discover, compare, and shortlist your preferred schools.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📄</span>
            <p>Apply to multiple schools with a single application.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📅</span>
            <p>Stay updated with admissions, fees, and more.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">👨‍👩‍👧‍👦</span>
            <p>Trusted by thousands of parents for expert counseling.</p>
          </div>
        </div>

        {/* Right Auth Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 relative bg-gray-50">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X size={24} />
          </button>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            <button
              onClick={() => setActiveTab(isSchool ? "schoolSignup" : "signup")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
                activeTab === (isSchool ? "schoolSignup" : "signup")
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setActiveTab(isSchool ? "schoolLogin" : "login")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
                activeTab === (isSchool ? "schoolLogin" : "login")
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              Log In
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 animate-slideUp">
            {/* USER SIGNUP */}
            {activeTab === "signup" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="flex items-center px-3 py-2 bg-gray-100 rounded-l-md border border-r-0">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                      className="flex-1 px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md cursor-pointer"
                >
                  Send OTP
                </button>
              </>
            )}

            {/* USER LOGIN */}
            {activeTab === "login" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="flex items-center px-3 py-2 bg-gray-100 rounded-l-md border border-r-0">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                      className="flex-1 px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md cursor-pointer"
                >
                  Send OTP
                </button>
              </>
            )}

            {/* SCHOOL SIGNUP */}
            {activeTab === "schoolSignup" && (
              <>
                <InputField
                  label="School Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter School Name"
                />
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
                <InputField
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                />
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md cursor-pointer"
                >
                  Register School
                </button>
              </>
            )}

            {/* SCHOOL LOGIN */}
            {activeTab === "schoolLogin" && (
              <>
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md cursor-pointer"
                >
                  School Log In
                </button>
              </>
            )}
          </form>

          {/* Switch Links */}
          <div className="text-center text-sm mt-6 text-gray-600">
            {!isSchool ? (
              <>
                Are you a school?{" "}
                <span
                  onClick={() => setActiveTab("schoolLogin")}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Log in
                </span>{" "}
                |{" "}
                <span
                  onClick={() => setActiveTab("schoolSignup")}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Register
                </span>
              </>
            ) : (
              <span
                onClick={() => setActiveTab("signup")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Back to User Sign Up
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, type = "text", ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        {...props}
        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 shadow-sm transition"
        required
      />
    </div>
  );
}
