"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { FiX, FiExternalLink } from "react-icons/fi";
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
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  // Boarding school links data
  const boardingSchoolLinks = [
    { name: "Dehradun", href: "/boarding-schools-dehradun" },
    { name: "Mussoorie", href: "/boarding-schools-mussoorie" },
    { name: "Shimla", href: "/boarding-schools-shimla" },
    { name: "Bengaluru", href: "/boarding-schools-bengaluru" },
    { name: "Nainital", href: "/boarding-schools-nainital" },
    { name: "Panchgani", href: "/boarding-schools-panchgani" },
    { name: "Mumbai", href: "/boarding-schools-mumbai" },
    { name: "Darjeeling", href: "/boarding-schools-darjeeling" },
    { name: "Delhi", href: "/boarding-schools-delhi" },
    { name: "Pune", href: "/boarding-schools-pune" },
    { name: "Jaipur", href: "/boarding-schools-jaipur" },
    { name: "Chandigarh", href: "/boarding-schools-chandigarh" },
    { name: "Noida", href: "/boarding-schools-noida" },
    { name: "Gurugram", href: "/boarding-schools-gurugram" },
    { name: "Faridabad", href: "/boarding-schools-faridabad" },
    { name: "Patna", href: "/boarding-schools-patna" },
    { name: "Kolkata", href: "/boarding-schools-kolkata" },
    { name: "Hisar", href: "/boarding-schools-hisar" },
    { name: "Ahmedabad", href: "/boarding-schools-ahmedabad" },
    { name: "Kota", href: "/boarding-schools-kota" },
    { name: "Solan", href: "/boarding-schools-solan" },
    { name: "Bhopal", href: "/boarding-schools-bhopal" },
    { name: "Indore", href: "/boarding-schools-indore" },
  ];

  // 🔹 Filter suggestions based on search text
  useEffect(() => {
    if (searchText.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = boardingSchoolLinks.filter((link) =>
        link.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [searchText]);

  // 🔹 Typing effect for placeholder
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

  // 🔹 Close modal on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // 🔹 Handle Search & Redirect
  const handleSearch = (query) => {
    if (!query.trim()) return;

    const lower = query.toLowerCase().trim();
    const slug = lower.replace(/\s+/g, "-");

    if (lower.split(" ").length === 1) {
      // ✅ Only location → boarding-schools-location
      router.push(`/boarding-schools-${slug}`);
    } else {
      // ✅ School → location + school
      // 👇 default location "mussoorie" for now
      router.push(`/mussoorie/${slug}`);
    }

    setIsModalOpen(false);
    setSearchText("");
  };

  // 🔹 Handle Suggestion Click
  const handleSuggestionClick = (href) => {
    router.push(href);
    setIsModalOpen(false);
    setSearchText("");
    setSuggestions([]);
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-no-repeat bg-center text-center py-6 w-full flex items-center justify-center h-[14rem] mt-0 sm:mt-[53px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dnq8fbcxh/image/upload/v1757161778/doon-edu_kqj01d.png')",
        }}
      >
        <div className="relative z-10 max-w-[890px] mx-auto px-4 text-center">
          <p className="text-base sm:text-xl font-bold text-white leading-snug">
            Welcome to India's Largest & Oldest Consulting Group for Boarding
            Schools.
          </p>
          <p className="text-base sm:text-xl font-bold text-[#FFE032] leading-snug mb-3">
            Global Edu Consulting. Since - 2010
          </p>

          <p className="text-xs sm:text-sm text-white mb-1">
            Your admission, our responsibility
          </p>
          <p className="text-xs sm:text-sm text-white mb-4">
            Find your boarding school below
          </p>

          <div
            className="flex items-center bg-white rounded-sm shadow-lg overflow-hidden h-[38px] cursor-pointer mx-auto w-[280px] sm:w-[350px] md:w-[430px]"
            onClick={() => setIsModalOpen(true)}
          >
            <input
              type="text"
              className="w-full px-4 py-2 outline-none text-gray-700 text-[11px] sm:text-[12px] pointer-events-none"
              placeholder="Search School by Location..."
              readOnly
            />
            <button className="px-4 text-[#1978cd] flex items-center justify-center">
              <FaSearch size={16} className="sm:size-5" />
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
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <FiX size={20} />
            </button>

            <h2 className="text-xl font-bold mb-2">
              Find the right <span className="text-blue-600">school</span>
            </h2>
            <p className="text-gray-500 mb-4">
              Your admission, our responsibility
            </p>

            {/* Search Input */}
            <div className="relative">
              <div className="flex items-center bg-white rounded-full shadow-md border overflow-hidden h-[44px] transition-all">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full px-4 py-2 outline-none text-gray-700 text-sm"
                  placeholder="Search School by Location..."
                  autoFocus
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSearch(searchText)
                  }
                />
                {searchText && (
                  <button
                    onClick={() => setSearchText("")}
                    className="px-3 text-gray-500 hover:text-gray-700 transition"
                  >
                    <MdClear size={20} />
                  </button>
                )}
                <button
                  onClick={() => handleSearch(searchText)}
                  className="px-4 text-[#1978cd] h-full flex items-center justify-center"
                >
                  <FaSearch size={18} />
                </button>
              </div>

              {/* Search Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-10">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleSuggestionClick(suggestion.href)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800 font-medium">
                          {suggestion.name}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Boarding School
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Click to view boarding schools in {suggestion.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">Quick Links</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  {
                    label: "Boarding Schools in Mussoorie",
                    path: "/boarding-schools-mussoorie",
                  },
                  {
                    label: "Boarding Schools in Dehradun",
                    path: "/boarding-schools-dehradun",
                  },
                  {
                    label: "Boarding Schools in Shimla",
                    path: "/boarding-schools-shimla",
                  },
                  {
                    label: "Boarding Schools in Bengaluru",
                    path: "/boarding-schools-bengaluru",
                  },
                  {
                    label: "Boarding Schools in Nainital",
                    path: "/boarding-schools-nainital",
                  },
                  {
                    label: "Boarding Schools in Noida",
                    path: "/boarding-schools-noida",
                  },
                ].map((link, i) => (
                  <button
                    key={i}
                    onClick={() => router.push(link.path)}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-100 rounded-full text-sm font-semibold hover:bg-blue-200"
                  >
                    <FiExternalLink size={16} />
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}