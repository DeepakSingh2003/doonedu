"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaRegHeart,
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaTimes,
  FaSchool,
  FaClipboardList,
  FaBookOpen,
  FaQuestionCircle,
  FaPhoneAlt,
} from "react-icons/fa";
import { Search } from "lucide-react";
import { useCity } from "../contexts/CityContext"; // city context
import LoginModal from "./LoginModal"; // import login modal
import { useLogin } from "../contexts/LoginContext"; // login context

export default function Navbar() {
  const { city, setCity } = useCity();
  const { isLoggedIn, user, logout } = useLogin();

  const [language, setLanguage] = useState("English");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("day");
  const [showLogin, setShowLogin] = useState(false); // control login modal
  const [wishlistCount, setWishlistCount] = useState(0); // track wishlist count

  // Load wishlist count from localStorage on mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistCount(storedWishlist.length);
  }, []);

  // Update wishlist count when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      setWishlistCount(storedWishlist.length);
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const tabs = [{ id: "day", label: "Boarding Schools" }];

  const popularCities = [
    {
      name: "Delhi",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/delhi/Delhi_India_Gate_vruZc1j.svg",
      href: "/boarding-schools-delhi",
    },
    {
      name: "Bangalore",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/bangalore/banglore_j0eqVHu_88dSI8P.svg",
      href: "boarding-schools-bengaluru",
    },
    {
      name: "Pune",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/pune/Pune_Saniwarwada.svg",
      href: "/boarding-schools-pune",
    },
    {
      name: "Kolkata",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/kolkata/kolkata_xqXrXjl_hU0Hgr9.svg",
      href: "/boarding-schools-kolkata",
    },
    {
      name: "Gurgaon",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/gurgaon/Gurgoan_DLF.svg",
      href: "/boarding-schools-gurugram",
    },
    {
      name: "Ghaziabad",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/ghaziabad/Ghaziabad_vtMnilQ_vYVfN7t.svg",
      href: "/boarding-schools-ghaziabad",
    },
    {
      name: "Faridabad",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/faridabad/Faridabad_Nahar_Singh_Palce_1yWHXub.svg",
      href: "/boarding-schools-faridabad",
    },
    {
      name: "Noida",
      image:
        "https://d3bat55ebwjhsf.cloudfront.net/schools/city/noida/Noida_Border.svg",
      href: "/boarding-schools-noida",
    },

    {
      name: "Dehradun",
      image:
        "https://res.cloudinary.com/dnq8fbcxh/image/upload/v1757399898/hand-drawn-sketch-forest-research-260nw-746498470-removebg-preview_kx5hzh.png",
      href: "/boarding-schools-dehradun",
    },
    {
      name: "Shimla",
      image:
        "https://res.cloudinary.com/dnq8fbcxh/image/upload/v1757400035/240167208-detailed-vector-coloring-page-of-an-ancient-cobblestone-street_nsdghy.jpg",
      href: "/boarding-schools-shimla",
    },
  ];

  const otherCities = [
    { name: "Agra", href: "/boarding-schools-agra" },

    { name: "Amritsar", href: "/boarding-schools-amritsar" },

    { name: "Bathinda", href: "/boarding-schools-bathinda" },
    { name: "Bhopal", href: "/boarding-schools-bhopal" },
    { name: "Chennai", href: "/boarding-schools-chennai" },
    { name: "Firozabad", href: "/boarding-schools-firozabad" },
    { name: "Hisar", href: "/boarding-schools-hisar" },
    { name: "Hyderabad", href: "/boarding-schools-hyderabad" },
    { name: "Indore", href: "/boarding-schools-indore" },
    { name: "Jabalpur", href: "/boarding-schools-jabalpur" },
    { name: "Jaipur", href: "/boarding-schools-jaipur" },
    { name: "Jodhpur", href: "/boarding-schools-jodhpur" },
    { name: "Kanpur", href: "/boarding-schools-kanpur" },
    { name: "Kochi", href: "/boarding-schools-kochi" },
    { name: "Ludhiana", href: "/boarding-schools-ludhiana" },
    { name: "Meerut", href: "/boarding-schools-meerut" },
    { name: "Mohali", href: "/boarding-schools-mohali" },
    { name: "Moradabad", href: "/boarding-schools-moradabad" },
  ];

  return (
    <nav className="shadow bg-white fixed top-0 left-0 w-full z-50">
      {/* ----------- DESKTOP NAV ----------- */}
      <div className="hidden md:flex justify-between items-center px-6 py-3">
        <div className="flex items-center space-x-6">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/logo.webp"
              alt="Ezyschooling"
              width={100}
              height={40}
              priority
            />
          </Link>
          <div
            onClick={() => setCityModalOpen(true)}
            className="flex items-center border border-gray-300 rounded px-2 py-1 cursor-pointer"
          >
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <span className="text-[11px] font-bold">
              {city || "Select City"}
            </span>
          </div>
          <div className="flex items-center border border-gray-300 rounded px-2 py-1 cursor-pointer">
            <FaGlobeAmericas className="text-blue-500 mr-2" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent focus:outline-none text-[11px] font-bold cursor-pointer"
            >
              <option value="English">English</option>
              <option value="हिंदी">हिंदी</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/Wishlist" className="relative">
            <button className="p-2 rounded-full shadow cursor-pointer">
              <FaRegHeart />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
          </Link>
          {isLoggedIn ? (
            <>
              <span className="text-sm">Hi, {user?.name}</span>
              <button
                onClick={logout}
                className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white text-[12px] cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white text-[12px] cursor-pointer"
            >
              Log in
            </button>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer"
          >
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer"
          >
            <div className="space-y-1">
              <div className="w-5 h-0.5 bg-black"></div>
              <div className="w-5 h-0.5 bg-black"></div>
              <div className="w-5 h-0.5 bg-black"></div>
            </div>
          </button>
          <Link href="/" className="cursor-pointer">
            <Image
              src="/logo.webp"
              alt="Ezyschooling"
              width={70}
              height={30}
              priority
            />
          </Link>
          <div
            onClick={() => setCityModalOpen(true)}
            className="flex items-center border border-gray-300 rounded px-2 py-1 cursor-pointer"
          >
            <FaMapMarkerAlt className="text-blue-500 mr-1 text-sm" />
            <span className="text-xs font-bold">{city || "Select City"}</span>
          </div>
        </div>
        <Link href="/Wishlist" className="relative">
          <button className="p-2 cursor-pointer">
            <FaRegHeart className="text-gray-600" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
        </Link>
      </div>

      {/* ----------- MENU DROPDOWN ----------- */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div className="absolute top-14 left-4 md:left-auto md:right-4 z-50">
            <div className="relative bg-white rounded-md shadow-xl py-1 w-72">
              <div className="absolute -top-1 left-2 md:left-auto md:right-4 w-3 h-3 bg-white rotate-45 shadow-sm z-40"></div>
              <button
                aria-label="Close Menu"
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-gray-600 absolute top-3 right-1 md:right-3 cursor-pointer"
              >
                <FaTimes size={16} />
              </button>
              <div className="flex justify-center md:hidden px-5 mb-3 mt-2">
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2.5 text-xs md:text-sm font-semibold text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 transition cursor-pointer"
                >
                  Login to Global Edu.Consulting
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                <Link
                  href="/Blog"
                  className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaBookOpen className="text-blue-500" />
                  <span className="text-xs font-medium text-gray-800">
                    Parenting Articles
                  </span>
                </Link>
                <Link
                  href="/Askquestion"
                  className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaQuestionCircle className="text-blue-500" />
                  <span className="text-xs font-medium text-gray-800">
                    Ask a Question
                  </span>
                </Link>
                <Link
                  href="/Counselling"
                  className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaPhoneAlt className="text-blue-500" />
                  <span className="text-xs font-medium text-gray-800">
                    Get Free Counselling
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------- CITY MODAL ----------- */}
      {cityModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm cursor-pointer"
            onClick={() => setCityModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full md:w-[90%] max-w-6xl h-full md:h-auto rounded-t-2xl md:rounded-xl shadow-lg p-4 md:p-6 overflow-y-auto z-50">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-base md:text-lg font-semibold flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                Where are you looking for schools?
              </h2>
              <button
                onClick={() => setCityModalOpen(false)}
                className="cursor-pointer"
              >
                <FaTimes
                  className="text-gray-500 hover:text-red-500"
                  size={20}
                />
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 md:mb-6">
              <div className="flex space-x-2 overflow-x-auto md:overflow-visible mb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 md:px-4 md:py-2 rounded-md border whitespace-nowrap text-sm md:text-base flex items-center gap-2 cursor-pointer ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 font-semibold bg-blue-50"
                        : "border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500"
                    }`}
                  >
                    {tab.id === "day" && <FaSchool />}
                    {tab.id === "boarding" && <FaClipboardList />}
                    {tab.id === "online" && <FaGlobeAmericas />}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "day" && (
              <>
                <Link
                  href="/day-schools"
                  className="text-blue-600 font-semibold underline mb-3 text-sm md:text-base cursor-pointer flex items-center justify-center gap-2"
                  onClick={() => setCityModalOpen(false)}
                >
                  <FaSchool /> View All Boarding Schools in India
                </Link>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-500" /> Popular Cities
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap justify-center gap-4 mb-4">
                  {popularCities.map((c) => (
                    <Link
                      key={c.name}
                      href={c.href}
                      className="flex flex-col items-center hover:scale-105 transition cursor-pointer"
                      onClick={() => {
                        setCity(c.name);
                        setCityModalOpen(false);
                      }}
                    >
                      <img
                        src={c.image}
                        alt={c.name}
                        width={80}
                        height={80}
                        className="mb-1"
                      />
                      <span className="text-xs md:text-sm font-medium flex items-center gap-1">
                        {c.name}
                      </span>
                    </Link>
                  ))}
                </div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <FaGlobeAmericas className="text-green-500" /> Other Cities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {otherCities.map((c) => (
                    <Link
                      key={c.name}
                      href={c.href}
                      className="px-3 py-1 border rounded-full text-xs md:text-sm hover:bg-blue-50 cursor-pointer flex items-center gap-1"
                      onClick={() => {
                        setCity(c.name);
                        setCityModalOpen(false);
                      }}
                    >
                      <FaMapMarkerAlt className="text-gray-400" size={10} />
                      {c.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ----------- LOGIN MODAL ----------- */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </nav>
  );
}
