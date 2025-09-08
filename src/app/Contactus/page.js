"use client";
import React, { useState } from "react";
import { FiSend, FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Top Section */}
      <div className="relative flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl mx-auto border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Get in touch with us
              </h2>
              <p className="text-lg text-gray-600 mt-3">
                We're here to help and answer any questions you might have
              </p>
              <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name + Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="px-4 flex items-center border border-r-0 rounded-l-lg bg-gray-100 text-gray-700 font-medium">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full p-4 border rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="Your mobile number"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="doon.edu@gmail.com"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition h-36"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center gap-2 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                Send Message <FiSend className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Other Ways to Contact Us
          </h3>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiPhone className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-lg mb-3 text-gray-800">
                Get in Touch
              </h4>

              <p className="text-gray-800 font-medium">
                Call us at{" "}
                <a
                  href="tel:+919634333174"
                  className="text-blue-600 hover:underline"
                >
                  +91 963 433 3174
                </a>
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiMail className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-lg mb-3 text-gray-800">
                Email Address
              </h4>

              <p className="text-gray-800 font-medium">
                Email us at{" "}
                <a
                  href="mailto:doon.edu@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  doon.edu@gmail.com
                </a>
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiMapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-lg mb-3 text-gray-800">Location</h4>

              <p className="text-gray-800 font-medium text-sm">
                Visit us at{" "}
                <a
                  href="https://maps.app.goo.gl/Sxk9pGEcYnbjJvYz6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  153, Van Vihar Colony, opposite Dr Sadakat Ali, Pithuwala
                  Kalan, Dehradun, Uttarakhand 248018
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
