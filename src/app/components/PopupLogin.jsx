"use client";
import React, { useState, useEffect } from "react";
import { useLogin } from "../contexts/LoginContext";

const Popuplogin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { isLoggedIn, login } = useLogin();

  useEffect(() => {
    const isUserLoggedIn =
      isLoggedIn || localStorage.getItem("loggedIn") === "true";

    if (!isUserLoggedIn) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  // Function to validate phone number
  const validatePhoneNumber = (phoneNumber) => {
    // Remove all non-digit characters
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    
    // Check if it's exactly 10 digits and starts with 6,7,8, or 9
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(cleanedPhone);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    
    // Allow only numbers and limit to 10 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 10);
    setPhone(numericValue);
    
    // Clear error when user starts typing again
    if (showError && errorMessage.includes("phone")) {
      setShowError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number before submission
    if (!validatePhoneNumber(phone)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)");
      setShowError(true);
      return;
    }
    
    setIsLoading(true);
    setShowError(false);

    const formData = new FormData();
    formData.append("cname", name);
    formData.append("phone", phone);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_LOGIN_FORM_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      login(formData);

      // 🔥 Send event to Google Tag Manager for conversion tracking
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "popup_form_submit",
          user_name: name,
          user_phone: phone,
        });
      }

      setShowSuccess(true);
      setTimeout(() => {
        setIsVisible(false);
        setShowSuccess(false);
        setName("");
        setPhone("");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to submit. Please try again.");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible || isLoggedIn) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        padding: "24px 20px",
        zIndex: 9999,
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}
      >
        {showSuccess ? (
          <div
            style={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "600",
              color: "#10b981",
              animation: "pulse 0.6s ease-in-out",
            }}
          >
            Successfully Logged In!
          </div>
        ) : (
          <>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#1f2937",
                marginBottom: "8px",
                lineHeight: "1.4",
              }}
            >
              Enter your details to see complete list of{" "}
              <strong>5 thousands+</strong> Boarding Schools on our platform.
            </p>

            <p
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Register with the largest consulting group of India. It's free and
              easy.
            </p>

            <p
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "20px",
              }}
            >
              <strong>5M+</strong> Parents | <strong>5K+</strong> Schools |{" "}
              <strong>10+</strong> Years of Experience
            </p>

            {showError && (
              <div
                style={{
                  padding: "12px",
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "6px",
                  color: "#dc2626",
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "12px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                  disabled={isLoading}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    fontSize: "14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    outline: "none",
                    transition: "all 0.2s",
                    opacity: isLoading ? 0.6 : 1,
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="10-digit mobile number (e.g., 9434333174)"
                  required
                  disabled={isLoading}
                  maxLength="10"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    fontSize: "14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    outline: "none",
                    transition: "all 0.2s",
                    opacity: isLoading ? 0.6 : 1,
                  }}
                />
                <div
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginTop: "4px",
                  }}
                >
                  Enter 10-digit number starting with 6, 7, 8, or 9
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: isLoading
                    ? "#9ca3af"
                    : "linear-gradient(135deg, #1d4ed8, #1e40af)",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "6px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default Popuplogin;