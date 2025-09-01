"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaRegHeart,
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import {
  FaSchool,
  FaBalanceScale,
  FaClipboardList,
  FaBookOpen,
  FaQuestionCircle,
  FaPhoneAlt,
} from "react-icons/fa";
import { Search } from "lucide-react";

export default function Navbar() {
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("English");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("day");

  const tabs = [
    { id: "day", label: "Day Schools" },
    { id: "boarding", label: "Boarding Schools" },
    { id: "online", label: "Online Schools" },
  ];

  const popularCities = [
    {
      name: "Delhi",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/delhi/Delhi_India_Gate_vruZc1j.svg",
    },
    {
      name: "Bangalore",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/bangalore/banglore_j0eqVHu_88dSI8P.svg",
    },
    {
      name: "Pune",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/pune/Pune_Saniwarwada.svg",
    },
    {
      name: "Kolkata",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/kolkata/kolkata_xqXrXjl_hU0Hgr9.svg",
    },
    {
      name: "Gurgaon",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/gurgaon/Gurgoan_DLF.svg",
    },
    {
      name: "Ghaziabad",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/ghaziabad/Ghaziabad_vtMnilQ_vYVfN7t.svg",
    },
    {
      name: "Faridabad",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/faridabad/Faridabad_Nahar_Singh_Palce_1yWHXub.svg",
    },
    {
      name: "Noida",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/noida/Noida_Border.svg",
    },
    {
      name: "Greater Noida",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/greater-noida/Gr_Noida_Parichock.svg",
    },
    {
      name: "Greater Noida West",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/greater-noida-west/Gr_noida_west.svg",
    },
  ];

  const otherCities = [
    "Agra",
    "Ahmednagar",
    "Amritsar",
    "Aurangabad",
    "Bareilly",
    "Bathinda",
    "Bhopal",
    "Chennai",
    "Firozabad",
    "Hisar",
    "Hyderabad",
    "Indore",
    "Jabalpur",
    "Jaipur",
    "Jodhpur",
    "Kanpur",
    "Kochi",
    "Ludhiana",
    "Meerut",
    "Mohali",
    "Moradabad",
  ];

  const boardingStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <nav className="shadow bg-white fixed top-0 left-0 w-full z-50">
      {/* ----------- DESKTOP NAV ----------- */}
      <div className="hidden md:flex justify-between items-center px-6 py-3">
        {/* Left: Logo + Selectors */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Image
            src="/logo.webp"
            alt="Ezyschooling"
            width={100}
            height={40}
            priority
          />

          {/* City Selector */}
          <div
            onClick={() => setCityModalOpen(true)}
            className="flex items-center border border-gray-300 rounded px-2 py-1 cursor-pointer"
          >
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <span className="text-[11px] font-bold">
              {city || "Select City"}
            </span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center border border-gray-300 rounded px-2 py-1">
            <FaGlobeAmericas className="text-blue-500 mr-2" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent focus:outline-none text-[11px] font-bold"
            >
              <option value="English">English</option>
              <option value="हिंदी">हिंदी</option>
            </select>
          </div>
        </div>

        {/* Right: Heart + Login + Menu */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full shadow">
            <FaRegHeart />
          </button>
          <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white text-[12px]">
            Log in
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-1">
              <div className="w-5 h-0.5 bg-black"></div>
              <div className="w-5 h-0.5 bg-black"></div>
              <div className="w-5 h-0.5 bg-black"></div>
            </div>
          </button>
        </div>
      </div>

      {/* ----------- MOBILE NAV ----------- */}
      <div className="flex md:hidden justify-between items-center px-4 py-3">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-3">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-1">
              <div className="w-5 h-0.5 bg-black"></div>
              <div className="w-5 h-0.5 bg-black"></div>
              <div className="w-5 h-0.5 bg-black"></div>
            </div>
          </button>
          <Image
            src="/logo.webp"
            alt="Ezyschooling"
            width={70}
            height={30}
            priority
          />
          <div
            onClick={() => setCityModalOpen(true)}
            className="flex items-center border border-gray-300 rounded px-2 py-1 cursor-pointer"
          >
            <FaMapMarkerAlt className="text-blue-500 mr-1 text-sm" />
            <span className="text-xs font-bold">{city || "Select City"}</span>
          </div>
        </div>

        {/* Right: Heart */}
        <button className="p-2">
          <FaRegHeart className="text-gray-600" />
        </button>
      </div>

      {/* ----------- MENU DROPDOWN ----------- */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Dropdown */}
          <div
            className="
          absolute 
          top-14
          left-4 md:left-auto md:right-4
          z-50
        "
          >
            <div className="relative bg-white rounded-md shadow-xl py-1 w-72">
              {/* Arrow */}
              <div className="absolute -top-1 left-2 md:left-auto md:right-4 w-3 h-3 bg-white rotate-45 shadow-sm z-40"></div>

              {/* Close button */}
              <button
                aria-label="Close Menu"
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-gray-600 absolute top-3 right-1 md:right-3"
              >
                <FaTimes size={16} />
              </button>

              {/* Mobile-only login */}
              <div className="flex justify-center md:hidden px-5 mb-3 mt-2">
                <button className="px-4 py-2.5 text-xs md:text-sm font-semibold text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 transition">
                  Login to Ezyschooling
                </button>
              </div>

              {/* Menu Items */}
              <div className="divide-y divide-gray-200">
                <div className="flex items-center justify-between gap-3 px-5 py-2.5 cursor-pointer hover:bg-gray-50 md:hidden">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <div className="flex flex-col flex-1">
                    <span className="text-xxs font-medium text-gray-500">
                      Selected Category
                    </span>
                    <div className="text-xs font-semibold text-gray-800">
                      Boarding Schools
                      <span className="text-xxs pl-1 text-blue-500 underline decoration-dotted cursor-pointer">
                        (Change)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-5 py-2.5 cursor-pointer hover:bg-gray-50">
                  <FaSchool className="text-blue-500" />
                  <span className="text-xs font-medium text-gray-800">
                    Explore Schools
                  </span>
                </div>

                <div className="flex items-center gap-3 px-5 py-2.5 cursor-pointer hover:bg-gray-50">
                  <FaBalanceScale className="text-blue-500" />
                  <span className="text-xs font-medium text-gray-800">
                    Compare Schools
                  </span>
                </div>

                <div className="flex items-center gap-3 px-5 py-2.5 cursor-pointer hover:bg-gray-50">
                  <FaClipboardList className="text-blue-500" />
                  <span className="text-xs font-medium text-gray-800">
                    Delhi Recommendations
                  </span>
                </div>

                <div className="flex items-center gap-3 px-5 py-2.5 cursor-pointer hover:bg-gray-50">
                  <FaBookOpen className="text-blue-500" />
                  <span className="text-xs font-medium text-gray-800">
                    Parenting Articles
                  </span>
                </div>

                <div className="flex items-center gap-3 px-5 py-2.5 cursor-pointer hover:bg-gray-50">
                  <FaQuestionCircle className="text-blue-500" />
                  <span className="text-xs font-medium text-gray-800">
                    Ask a Question
                  </span>
                </div>

                <div className="flex items-center gap-3 px-5 py-2.5 cursor-pointer hover:bg-gray-50">
                  <FaPhoneAlt className="text-blue-500" />
                  <span className="text-xs font-medium text-gray-800">
                    Get Free Counselling
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------- CITY MODAL ----------- */}
      {cityModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          {/* Background Blur */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setCityModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white w-full md:w-[90%] max-w-6xl h-full md:h-auto rounded-t-2xl md:rounded-xl shadow-lg p-4 md:p-6 overflow-y-auto z-50">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-base md:text-lg font-semibold">
                Where are you looking for schools?
              </h2>
              <button onClick={() => setCityModalOpen(false)}>
                <FaTimes
                  className="text-gray-500 hover:text-red-500"
                  size={20}
                />
              </button>
            </div>

            {/* Tabs + Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 md:mb-6">
              {/* Tabs */}
              <div className="flex space-x-2 overflow-x-auto md:overflow-visible mb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 md:px-4 md:py-2 rounded-md border whitespace-nowrap text-sm md:text-base ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 font-semibold bg-blue-50"
                        : "border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab} schools`}
                  className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* TAB CONTENT */}
            {activeTab === "day" && (
              <>
                <h3 className="font-medium mb-2">Popular Cities</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap justify-center gap-4 mb-4">
                  {popularCities.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setCity(c.name);
                        setCityModalOpen(false);
                      }}
                      className="flex flex-col items-center hover:scale-105 transition"
                    >
                      <Image
                        src={c.image}
                        alt={c.name}
                        width={50}
                        height={50}
                        className="mb-1"
                      />
                      <span className="text-xs md:text-sm font-medium">
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>

                <h3 className="font-medium mb-2">Other Cities</h3>
                <div className="flex flex-wrap gap-2">
                  {otherCities.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCity(c);
                        setCityModalOpen(false);
                      }}
                      className="px-3 py-1 border rounded-full text-xs md:text-sm hover:bg-blue-50"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </>
            )}

            {activeTab === "boarding" && (
              <div className="text-center">
                <a
                  href="/boarding-schools"
                  className="text-blue-600 font-semibold underline block mb-3 text-sm md:text-base"
                >
                  View All Boarding Schools in India
                </a>
                <div className="flex flex-wrap justify-center gap-2">
                  {boardingStates.map((state) => (
                    <button
                      key={state}
                      onClick={() => {
                        setCity(state);
                        setCityModalOpen(false);
                      }}
                      className="px-3 py-1 border rounded-lg text-xs md:text-sm hover:bg-blue-50"
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "online" && (
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setCity("Online");
                    setCityModalOpen(false);
                  }}
                  className="px-4 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100 font-medium text-sm md:text-base"
                >
                  Explore Online/Virtual Schools in India
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
