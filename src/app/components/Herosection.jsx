"use client";

import { useEffect, useState } from "react";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { FiExternalLink, FiX } from "react-icons/fi";
import { MdClear } from "react-icons/md";

export default function HeroSection() {
  const placeholders = [
    "Schools in Noida",
    "Schools in Delhi",
    "Schools near me",
  ];
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Typing effect
  useEffect(() => {
    if (index < placeholders[placeholderIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + placeholders[placeholderIndex][index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentText("");
        setIndex(0);
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [index, placeholderIndex, placeholders]);

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-no-repeat bg-center text-center py-6 w-full flex items-center justify-center h-[12rem] mt-0 sm:mt-[53px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dnq8fbcxh/image/upload/v1756989507/welcome-back-to-school-banner-background-school-supplies-on-blue-background-vector_bhxhzg.jpg')",
        }}
      >
        <div className="relative z-10 w-[580px] mx-auto px-4">
          {/* Heading */}
          <p className="text-3xl md:text-2xl font-bold text-white mb-4">
            Find the right School
          </p>
          <p className="text-sm text-white mb-8">
            Your admission, our responsibility
          </p>

          {/* Search Box */}
          <div
            className="flex items-center bg-white rounded-sm shadow-lg overflow-hidden h-[38px] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <input
              type="text"
              className="w-full px-4 py-3 outline-none text-gray-700 text-[11px] pointer-events-none"
              placeholder={currentText || "Search School by Name..."}
              readOnly
            />
            <button className="px-4 text-[#1978cd] flex items-center justify-center">
              <FaSearch size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[90%] max-w-[900px] p-6 relative animate-[fadeIn_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <FiX size={20} />
            </button>

            {/* Modal Content */}
            <h2 className="text-xl font-bold mb-2">
              Find the right <span className="text-blue-600">school</span>
            </h2>
            <p className="text-gray-500 mb-4">
              Your admission, our responsibility
            </p>

            {/* Styled Search Input */}
            <div className="flex items-center bg-white rounded-full shadow-md border overflow-hidden h-[44px] transition-all">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-4 py-2 outline-none text-gray-700 text-sm"
                placeholder="Search School by Name or Location..."
                autoFocus
              />

              {/* Clear Button (only when typing) */}
              {searchText && (
                <button
                  onClick={() => setSearchText("")}
                  className="px-3 text-gray-500 hover:text-gray-700 transition"
                >
                  <MdClear size={20} />
                </button>
              )}

              {/* Search Button */}
              <button className="px-4 text-[#1978cd] h-full flex items-center justify-center">
                <FaSearch size={18} />
              </button>
            </div>

            {/* Quick Links */}
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Quick Links</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  "Schools Near Me",
                  "Boarding Schools in India",
                  "Online Schools in India",
                ].map((link, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-100 rounded-full text-sm font-semibold hover:bg-blue-200"
                  >
                    <FiExternalLink size={16} />
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
