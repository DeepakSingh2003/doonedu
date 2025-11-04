"use client";
import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { useLogin } from "../contexts/LoginContext"; // Import the context

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const { login } = useLogin(); // Get login function from context
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate API call
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Create user data based on form submission
      let userData = {};
      
      if (activeTab === "signup" || activeTab === "login") {
        userData = {
          name: formData.name,
          phone: formData.phone,
          type: "user"
        };
      } else if (activeTab === "schoolSignup" || activeTab === "schoolLogin") {
        userData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          type: "school"
        };
      }

      // Set success message based on tab
      if (activeTab === "signup") {
        setSuccessMessage("Successfully Registered!");
      } else if (activeTab === "login") {
        setSuccessMessage("Successfully Logged In!");
      } else if (activeTab === "schoolSignup") {
        setSuccessMessage("School Registered Successfully!");
      } else if (activeTab === "schoolLogin") {
        setSuccessMessage("School Logged In Successfully!");
      }

      setShowSuccess(true);

      // Call the login function with user data
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }

      // Auto-close after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
      }, 2000);
    }, 1000); // Simulate 1s API delay
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
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
            disabled={isSubmitting || showSuccess}
          >
            <X size={24} />
          </button>

          {/* Success State */}
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center h-full py-10 animate-fadeIn">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
              <p className="text-xl font-semibold text-green-600">{successMessage}</p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex justify-center gap-4 mb-6 flex-wrap">
                <button
                  onClick={() => setActiveTab(isSchool ? "schoolSignup" : "signup")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
                    activeTab === (isSchool ? "schoolSignup" : "signup")
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                >
                  Log In
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5 animate-slideUp">
                {/* USER SIGNUP */}
                {activeTab === "signup" && (
                  <>
                    <InputField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      disabled={isSubmitting}
                    />
                    <PhoneInput
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <SubmitButton loading={isSubmitting} text="Submit" />
                  </>
                )}

                {/* USER LOGIN */}
                {activeTab === "login" && (
                  <>
                    <InputField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      disabled={isSubmitting}
                    />
                    <PhoneInput
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <SubmitButton loading={isSubmitting} text="Submit" />
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
                      disabled={isSubmitting}
                    />
                    <InputField
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      disabled={isSubmitting}
                    />
                    <InputField
                      label="Phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                      disabled={isSubmitting}
                    />
                    <InputField
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      disabled={isSubmitting}
                    />
                    <SubmitButton loading={isSubmitting} text="Register School" />
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
                      disabled={isSubmitting}
                    />
                    <InputField
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      disabled={isSubmitting}
                    />
                    <SubmitButton loading={isSubmitting} text="School Log In" />
                  </>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Input Field
function InputField({ label, type = "text", disabled, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        {...props}
        disabled={disabled}
        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 shadow-sm transition disabled:bg-gray-100 disabled:cursor-not-allowed"
        required
      />
    </div>
  );
}

// Reusable Phone Input
function PhoneInput({ value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700">
        Phone Number
      </label>
      <div className="flex">
        <span className="flex items-center px-3 py-2 bg-gray-100 rounded-l-md border border-r-0 text-gray-600">
          India +91
        </span>
        <input
          type="tel"
          name="phone"
          value={value}
          onChange={onChange}
          placeholder="Enter Phone Number"
          disabled={disabled}
          className="flex-1 px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
        />
      </div>
    </div>
  );
}

// Reusable Submit Button with Loader
function SubmitButton({ loading, text }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Submitting...
        </>
      ) : (
        text
      )}
    </button>
  );
}