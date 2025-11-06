"use client";
import React, { useState, useEffect } from 'react';
import { useLogin } from '../contexts/LoginContext';

const Popuplogin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { isLoggedIn, login } = useLogin();

  useEffect(() => {
    // Check both context and localStorage to avoid showing popup if already logged in
    const isUserLoggedIn = isLoggedIn || localStorage.getItem('loggedIn') === 'true';

    if (!isUserLoggedIn) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 8000); // Show after 8 seconds
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);

    // Create user data object

    const formData = new FormData();
    formData.append("cname", name);
    formData.append("phone", phone);

    try {
      // Send data to API
      const response = await fetch('https://admin.doonedu.com/front/customer/customer_entry_api', {
        method: 'POST',

        body: formData
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();

      // If API call is successful, use the context login function
      login(formData);

      // Show success in popup
      setShowSuccess(true);
      setTimeout(() => {
        setIsVisible(false);
        setShowSuccess(false);
        // Reset form
        setName('');
        setPhone('');
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Failed to submit. Please try again.');
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show if user is logged in
  if (!isVisible || isLoggedIn) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '24px 20px',
        zIndex: 9999,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div style={{ maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
        {showSuccess ? (
          <div
            style={{
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: '600',
              color: '#10b981',
              animation: 'pulse 0.6s ease-in-out',
            }}
          >
            Successfully Logged In!
          </div>
        ) : (
          <>
            {/* Main Text */}
            <p
              style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#1f2937',
                marginBottom: '8px',
                lineHeight: '1.4',
              }}
            >
              Enter your details to see complete list of{' '}
              <strong>5 thousands+</strong> Boarding Schools on our platform.
            </p>
            <p
              style={{
                fontSize: '14px',
                color: '#4b5563',
                marginBottom: '8px',
              }}
            >
              Register with the largest consulting group of India. It's free and easy.
            </p>
            <p
              style={{
                fontSize: '14px',
                color: '#4b5563',
                marginBottom: '20px',
              }}
            >
              <strong>5M+</strong> Parents | <strong>5K+</strong> Schools |{' '}
              <strong>10+</strong> Years of Experience
            </p>

            {/* Error Message */}
            {showError && (
              <div
                style={{
                  padding: '12px',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  color: '#dc2626',
                  fontSize: '14px',
                  marginBottom: '16px',
                }}
              >
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div style={{ marginBottom: '12px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px',
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
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    opacity: isLoading ? 0.6 : 1,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                  onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                />
              </div>

              {/* Phone Field */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px',
                  }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 e.g. 9434333174"
                  required
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    opacity: isLoading ? 0.6 : 1,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                  onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: isLoading
                    ? '#9ca3af'
                    : 'linear-gradient(135deg, #1d4ed8, #1e40af)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(29, 78, 216, 0.3)',
                  transition: 'all 0.2s',
                  opacity: isLoading ? 0.7 : 1,
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Optional: Add pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default Popuplogin;