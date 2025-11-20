"use client";
import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { useLogin } from "../contexts/LoginContext";

export default function AuthModal({ isOpen, onClose }) {
  const { login, isLoggedIn } = useLogin();

  // ✅ Separate states instead of single formData object
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen || isLoggedIn) return null;

  // ✅ Handle submit (same as Popuplogin)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);

    // ✅ FormData creation below inputs (as in Popuplogin)
    const formData = new FormData();
    formData.append("cname", name);
    formData.append("phone", phone);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_LOGIN_FORM_URL, {
        method: "POST",
        body: formData,
      }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      // ✅ Trigger context login (same as Popuplogin)
      login(formData);

      // ✅ Success handling
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setName("");
        setPhone("");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to submit. Please try again.");
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {/* Success Message */}
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center h-full py-10 animate-fadeIn">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
              <p className="text-xl font-semibold text-green-600">
                Successfully Logged In!
              </p>
            </div>
          ) : (
            <>
              {/* Heading */}
              <div className="flex justify-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">
                  User Login
                </h2>
              </div>

              {/* Error Message */}
              {showError && (
                <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
                  {errorMessage}
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5 animate-slideUp"
              >
                {/* ✅ Individual Name Input */}
                <InputField
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  disabled={isSubmitting}
                />

                {/* ✅ Individual Phone Input */}
                <PhoneInput
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isSubmitting}
                />

                <SubmitButton loading={isSubmitting} text="Submit" />
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
      <label className="block text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>
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
