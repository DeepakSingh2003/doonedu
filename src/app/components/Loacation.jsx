"use client";

import { FaEye, FaCheckCircle, FaCrown } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp, Heart, Phone, Filter, X } from "lucide-react";
import Link from "next/link";

import { useModal } from "../contexts/ModalContext";
import ApplyModal from "../components/ApplyModal";
import EnquireModal from "../components/EnquireModal";
import { useCity } from "../contexts/CityContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useSearchParams, usePathname } from "next/navigation";
import Didyouknow from "../components/Didyouknow";
import RecommendationBanner from "../components/RecommendationBanner"; // Add this import

export default function Location({ locationData }) {
  // Memoize schoolsData to prevent infinite re-renders
  const schoolsData = useMemo(
    () =>
      locationData?.response.data.schools_list.filter(
        (school) => school.deleted_at === null
      ) || [],
    [locationData]
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { city: contextCity } = useCity();
  const { wishlist, addToWishlist, removeFromWishlist, isWishlisted } =
    useWishlist();
  const [filters, setFilters] = useState({
    fees: [],
    board: [],
    gender: [],
  });
  const [sortBy, setSortBy] = useState("");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [accordion, setAccordion] = useState({
    fees: true,
    board: false,
    gender: false,
  });
  const [expanded, setExpanded] = useState({});
  const [showMoreHighlights, setShowMoreHighlights] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState({});
  const [isClient, setIsClient] = useState(false);
  const [decodedAbout, setDecodedAbout] = useState({});
  const { openModal } = useModal();

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Decode about text on client side only to avoid hydration mismatch
  useEffect(() => {
    if (isClient && schoolsData.length > 0) {
      const decoded = {};
      let hasChanges = false;

      schoolsData.forEach((school) => {
        if (school.about) {
          const decodedText = decodeBase64(school.about);
          if (decodedText !== decodedAbout[school.id]) {
            decoded[school.id] = decodedText;
            hasChanges = true;
          }
        }
      });

      // Only update state if there are actual changes
      if (
        hasChanges ||
        Object.keys(decoded).length !== Object.keys(decodedAbout).length
      ) {
        setDecodedAbout(decoded);
      }
    }
  }, [isClient, schoolsData]); // Remove decodedAbout from dependencies to prevent loop

  // Helper function to get fee range from average_fee
  const getFeeRange = (fee) => {
    if (!fee) return "Unknown";
    const feeNum = parseFloat(fee.replace(/[^0-9.]/g, ""));
    if (feeNum < 100000) return "Under 1 Lac";
    if (feeNum < 300000) return "Under 3 Lac";
    if (feeNum < 500000) return "Above 3 Lac And Under 5 Lac";
    if (feeNum < 700000) return "Above 5 Lac And Under 7 Lac";
    if (feeNum < 1000000) return "Above 7 Lac And Under 10 Lac";
    return "Above 10 Lac";
  };

  const toggleFandq = (index) => {
    setFaqOpen((prev) => {
      const newState = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = false;
      });
      newState[index] = !prev[index];
      return newState;
    });
  };

  // Helper to decode base64 safely - client only
  const decodeBase64 = (str) => {
    if (!str || typeof window === "undefined") return "";
    try {
      return decodeURIComponent(escape(window.atob(str)));
    } catch (e) {
      return "";
    }
  };

  // Helper to strip HTML tags for length calculation - SSR compatible
  const stripHtml = (html) => {
    if (!html) return "";
    // Use regex to strip HTML tags for server-side rendering
    return html.replace(/<[^>]*>/g, "");
  };

  // Safe sanitize function that works on both client and server
  const safeSanitize = (html) => {
    if (!html) return "";

    // On server or before DOMPurify is available, use basic sanitization
    if (typeof window === "undefined" || !isClient) {
      // Basic sanitization using regex (remove script tags and dangerous attributes)
      return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/on\w+="[^"]*"/g, "")
        .replace(/on\w+='[^']*'/g, "")
        .replace(/javascript:/gi, "");
    }

    // On client, use DOMPurify
    try {
      const DOMPurify = require("dompurify");
      return DOMPurify.sanitize(html);
    } catch (error) {
      console.error("DOMPurify not available:", error);
      return html;
    }
  };

  // Parse SEO HTML content
  useEffect(() => {
    if (locationData?.response?.data?.seo_html && isClient) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        locationData.response.data.seo_html,
        "text/html"
      );
      const title = doc.querySelector("title")?.textContent;

      if (title) {
        document.title = title;
      }

      // You can also update the description if needed
      const description = doc
        .querySelector('meta[name="description"]')
        ?.getAttribute("content");
      if (description) {
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescription) {
          metaDescription.setAttribute("content", description);
        } else {
          const meta = document.createElement("meta");
          meta.name = "description";
          meta.content = description;
          document.head.appendChild(meta);
        }
      }
    }
    let urlCity = searchParams.get("city");
    let feeRange = searchParams.get("fee_range");
    let board = searchParams.get("board");
    let gender = searchParams.get("gender");
    let type = searchParams.get("type");

    if (pathname) {
      if (pathname.startsWith("/boarding-schools-in-")) {
        urlCity = pathname.replace("/boarding-schools-in-", "");
        type = "boarding";
      } else if (
        pathname.startsWith("/best-") &&
        pathname.endsWith("-boarding-schools-in-india")
      ) {
        gender = pathname
          .replace("/best-", "")
          .replace("-boarding-schools-in-india", "");
        type = "boarding";
      } else if (pathname === "/best-boarding-schools-in-india") {
        type = "boarding";
      } else if (pathname === "/top-boarding-schools-of-delhi-ncr") {
        urlCity = "delhi";
        type = "boarding";
      }
    }

    const newFilters = {
      fees: [],
      board: [],
      gender: [],
    };

    if (feeRange) {
      if (feeRange === "below_rs50000") {
        newFilters.fees = ["Under 1 Lac"];
      } else if (feeRange === "rs50000_rs100000") {
        newFilters.fees = ["Under 3 Lac"];
      } else if (feeRange === "rs100000_rs200000") {
        newFilters.fees = [
          "Above 3 Lac And Under 5 Lac",
          "Above 5 Lac And Under 7 Lac",
        ];
      } else if (feeRange === "above_rs200000") {
        newFilters.fees = ["Above 7 Lac And Under 10 Lac", "Above 10 Lac"];
      }
    }

    if (board) {
      if (board === "cbse") newFilters.board = ["CBSE"];
      else if (board === "icse") newFilters.board = ["ICSE"];
      else if (board === "ib") newFilters.board = ["IB"];
      else if (board === "state board")
        newFilters.board = ["CBSE", "ICSE", "IB", "IGCSE"];
    }

    if (gender) {
      if (gender === "boys") newFilters.gender = ["Boys"];
      else if (gender === "girls") newFilters.gender = ["Girls"];
      else if (gender === "co-ed") newFilters.gender = ["Co-Ed"];
    }

    setFilters(newFilters);

    if (feeRange) setAccordion((prev) => ({ ...prev, fees: true }));
    if (board) setAccordion((prev) => ({ ...prev, board: true }));
    if (gender) setAccordion((prev) => ({ ...prev, gender: true }));
  }, [searchParams, pathname, isClient]);

  const toggleAccordion = (section) =>
    setAccordion((prev) => ({ ...prev, [section]: !prev[section] }));

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updated };
    });
  };

  const toggleWishlist = (school, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted(school.id)) removeFromWishlist(school.id);
    else addToWishlist(school);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    setSortDropdownOpen(false);
  };

  const handleApplyNow = (school, e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(
      <ApplyModal schoolId={school.id} schoolName={school.school_title} />
    );
  };

  // NEW: Handle Request Call Back for partner schools
  const handleRequestCallBack = (school, e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(
      <EnquireModal schoolId={school.id} schoolName={school.school_title} />
    );
  };

  const handleCallNow = (school, e) => {
    e.preventDefault();
    e.stopPropagation();
    // Fixed number for all non-partner schools
    window.location.href = `tel:9634333174`;
  };

  const toggleFaq = (index) => {
    setFaqOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Apply all filters (query + slug + UI)
  const filteredSchools = useMemo(
    () =>
      schoolsData.filter((school) => {
        // Note: We've already filtered deleted schools at the schoolsData level,
        // but we can add an extra check here for safety
        if (school.deleted_at !== null) return false;

        if (filters.fees.length > 0) {
          const schoolFeeRange = getFeeRange(school.average_fee);
          if (!filters.fees.includes(schoolFeeRange)) return false;
        }

        if (filters.board.length > 0) {
          const schoolBoard = school.board?.title || "";
          if (
            !filters.board.some((b) =>
              schoolBoard.toLowerCase().includes(b.toLowerCase())
            )
          )
            return false;
        }

        if (filters.gender.length > 0) {
          const schoolGender = school.classification?.title || "";
          if (
            !filters.gender.some((g) =>
              schoolGender.toLowerCase().includes(g.toLowerCase())
            )
          )
            return false;
        }

        return true;
      }),
    [schoolsData, filters]
  );

  const sortedSchools = useMemo(
    () =>
      [...filteredSchools].sort((a, b) => {
        if (sortBy === "fee-high-to-low") {
          const feeA = parseFloat(a.average_fee?.replace(/[^0-9.]/g, "") || 0);
          const feeB = parseFloat(b.average_fee?.replace(/[^0-9.]/g, "") || 0);
          return feeB - feeA;
        }
        if (sortBy === "fee-low-to-high") {
          const feeA = parseFloat(a.average_fee?.replace(/[^0-9.]/g, "") || 0);
          const feeB = parseFloat(b.average_fee?.replace(/[^0-9.]/g, "") || 0);
          return feeA - feeB;
        }
        return 0;
      }),
    [filteredSchools, sortBy]
  );

  // Function to parse FAQ content from API - client only
  const [faqItems, setFaqItems] = useState([]);

  useEffect(() => {
    if (isClient && locationData?.response?.data?.footer_content) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(
          locationData.response.data.footer_content,
          "text/html"
        );
        const faqWrappers = doc.querySelectorAll(".faq-location-wrapper");

        const parsedFaqs = Array.from(faqWrappers).map((wrapper) => {
          const question =
            wrapper.querySelector(".faq-question")?.textContent || "";
          const answer = wrapper.querySelector(".faq-answer")?.innerHTML || "";
          return { question, answer: safeSanitize(answer) };
        });

        setFaqItems(parsedFaqs);
      } catch (error) {
        console.error("Error parsing FAQ content:", error);
        setFaqItems([]);
      }
    }
  }, [isClient, locationData]);

  // Check if highlights are available
  const hasHighlights =
    locationData?.response?.data?.location_descripton &&
    stripHtml(locationData.response.data.location_descripton).trim().length > 0;

  // Get location heading - use the page_title from location_ad in the API
  const getLocationHeading = () => {
    // Use the page_title from location_ad in the API response
    const pageTitle = locationData?.response?.data?.location_ad?.page_title;

    if (pageTitle) {
      return pageTitle;
    }

    // Fallback: extract from URL if API title is not available
    if (pathname && pathname.startsWith("/boarding-schools-")) {
      const stateName = pathname
        .replace("/boarding-schools-", "")
        .split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      return `Boarding Schools in ${stateName}`;
    }

    // Final fallback
    return "Boarding Schools";
  };

  // Get about text for a school - handles both server and client rendering
  const getAboutText = (school) => {
    if (!school.about) return "";

    // On server or before decoding, return empty or placeholder
    if (!isClient || !decodedAbout[school.id]) {
      return "";
    }

    const aboutText = decodedAbout[school.id];
    const isExpanded = expanded[`about-${school.id}`];

    return isExpanded ? aboutText : aboutText.slice(0, 150) + "...";
  };

  // Check if about text should show "Read more" button
  const shouldShowReadMore = (school) => {
    if (!school.about || !isClient || !decodedAbout[school.id]) return false;
    return decodedAbout[school.id].length > 140;
  };

  const SidebarContent = () => (
    <>
      <div className="border-b border-gray-300">
        <button
          onClick={() => toggleAccordion("fees")}
          className="flex justify-between w-full px-4 py-5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          <span className="font-bold text-black">Fees (Annual)</span>
          {accordion.fees ? (
            <ChevronUp size={18} className="text-gray-500" />
          ) : (
            <ChevronDown size={18} className="text-gray-500" />
          )}
        </button>
        {accordion.fees && (
          <div className="px-4 py-2 space-y-1">
            {[
              "Under 1 Lac",
              "Under 3 Lac",
              "Above 3 Lac And Under 5 Lac",
              "Above 5 Lac And Under 7 Lac",
              "Above 7 Lac And Under 10 Lac",
              "Above 10 Lac",
            ].map((fee) => (
              <label
                key={fee}
                className="flex items-center space-x-2 text-[13px] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.fees.includes(fee)}
                  onChange={() => toggleFilter("fees", fee)}
                  className="h-3 w-3 text-indigo-600 border-gray-300 rounded cursor-pointer"
                />
                <span className="text-gray-700">{fee}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="border-b border-gray-300">
        <button
          onClick={() => toggleAccordion("board")}
          className="flex justify-between w-full px-4 py-5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          <span className="font-bold text-black">Board</span>
          {accordion.board ? (
            <ChevronUp size={18} className="text-gray-500" />
          ) : (
            <ChevronDown size={18} className="text-gray-500" />
          )}
        </button>
        {accordion.board && (
          <div className="px-4 py-2 space-y-1">
            {["CBSE", "IB", "ICSE", "IGCSE"].map((board) => (
              <label
                key={board}
                className="flex items-center space-x-2 text-[13px] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.board.includes(board)}
                  onChange={() => toggleFilter("board", board)}
                  className="h-3 w-3 text-indigo-600 border-gray-300 rounded cursor-pointer"
                />
                <span className="text-gray-700">{board}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="border-b border-gray-300">
        <button
          onClick={() => toggleAccordion("gender")}
          className="flex justify-between w-full px-4 py-5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          <span className="font-bold text-black">Gender Classification</span>
          {accordion.gender ? (
            <ChevronUp size={18} className="text-gray-500" />
          ) : (
            <ChevronDown size={18} className="text-gray-500" />
          )}
        </button>
        {accordion.gender && (
          <div className="px-4 py-2 space-y-1">
            {["Boys", "Girls", "Co-Ed"].map((g) => (
              <label
                key={g}
                className="flex items-center space-x-2 text-[13px] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.gender.includes(g)}
                  onChange={() => toggleFilter("gender", g)}
                  className="h-3 w-3 text-indigo-600 border-gray-300 rounded cursor-pointer"
                />
                <span className="text-gray-700">{g}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pt-0 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 sm:pt-20">
        <aside className="hidden lg:block w-72 bg-white rounded-xl shadow-lg p-4 sticky top-24 h-fit max-h-[85vh] overflow-y-auto">
          <SidebarContent />
        </aside>
        <div className="flex-1 space-y-2">
          <div className="lg:hidden sticky top-14 z-40 bg-white py-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
            >
              <Filter size={18} /> Filter Schools
            </button>
          </div>
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 flex flex-col">
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setMobileFilterOpen(false)}
              ></div>
              <div className="relative bg-white w-full max-h-[85vh] mt-16 rounded-t-2xl overflow-y-auto animate-slideUp">
                <div className="sticky top-0 bg-white flex justify-between items-center p-4 border-b">
                  <h2 className="text-xl font-bold">Filter Schools</h2>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 rounded-full bg-gray-100 cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="p-4">
                  <SidebarContent />
                  <div className="mt-6">
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium cursor-pointer"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-8 border-blue-400">
            <div className="flex justify-between items-center">
              <h2 className="text-[10px] md:text-xl font-bold text-gray-800">
                {getLocationHeading()}
              </h2>
              {hasHighlights &&
                stripHtml(locationData.response.data.location_descripton)
                  .length > 150 && (
                  <button
                    onClick={() => setShowMoreHighlights(!showMoreHighlights)}
                    className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap text-[8px] md:text-sm px-4 py-1.5 rounded-full transition-all duration-200"
                  >
                    {showMoreHighlights ? "Show Less" : "Show More"}
                  </button>

                )}
            </div>
            <div className="relative text-gray-700 text-[6px] md:text-sm leading-relaxed">
              {hasHighlights ? (
                <>
                  <div
                    className="custom-html"
                    dangerouslySetInnerHTML={{
                      __html: safeSanitize(
                        showMoreHighlights
                          ? locationData.response.data.location_descripton
                          : stripHtml(
                            locationData.response.data.location_descripton
                          ).slice(0, 300) + "..."
                      ),
                    }}
                  />
                  {!showMoreHighlights && (
                    <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  )}
                </>
              ) : // Don't show any message when no highlights are available
                null}
            </div>
          </div>
          <div className="flex justify-end items-center bg-white p-4 rounded-xl">
            <div className="relative">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                {sortBy === "fee-high-to-low"
                  ? "Fee - high to low"
                  : sortBy === "fee-low-to-high"
                    ? "Fee - low to high"
                    : "Sort By"}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${sortDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {sortDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => handleSort("fee-high-to-low")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Fee - high to low
                    </button>
                    <button
                      onClick={() => handleSort("fee-low-to-high")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Fee - low to high
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {sortedSchools.length > 0 ? (
            <div className="space-y-6">
              {sortedSchools.map((school, index) => {
                const isPartnerSchool = school.partner === "2";

                return (
                  <div key={school.id} className="space-y-6">
                    <Link
                      href={new URL(school.url).pathname}
                      className="block"
                    >
                      <div
                        className={`
                        relative rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col md:flex-row gap-5 cursor-pointer
                        ${isPartnerSchool
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-blue-200"
                            : "bg-white"
                          }
                      `}
                      >
                        {/* Partner School Badge */}
                        {isPartnerSchool && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
                            <FaCrown className="h-3 w-3" />
                            <span className="text-xs font-bold">PARTNER</span>
                          </div>
                        )}

                        <button
                          onClick={(e) => toggleWishlist(school, e)}
                          className="absolute top-3 right-3 z-10 bg-white p-1 rounded-full shadow-md cursor-pointer"
                        >
                          <Heart
                            size={20}
                            className={`transition-colors ${isWishlisted(school.id)
                                ? "fill-red-500 text-red-500"
                                : "text-red-500"
                              }`}
                          />
                        </button>
                        {school.isAdmissionOpen && (
                          <img
                            src="https://res.cloudinary.com/dnq8fbcxh/image/upload/v1756874282/vecteezy_admissions-open-sign-red-yellow-hanging-board-new-student_60579933_echl2d.png"
                            alt="Admission Open"
                            className="absolute top-2 right-12 w-12 sm:w-14 animate-hang"
                          />
                        )}
                        <div className="w-full md:w-56 flex-shrink-0 mx-auto">
                          <div className="h-40 rounded-lg overflow-hidden relative">
                            <img
                              src={`${process.env.NEXT_PUBLIC_LOCATION_SCHOOL_CARD_IMG}/${school.id}/${school.thumbnail}`}
                              alt={school.school_title}
                              className="w-full h-full object-cover hover:scale-105 transition"
                            />
                            {/* Partner badge on image */}
                            {isPartnerSchool && (
                              <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full p-1">
                                <FaCheckCircle className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                          <div className="mx-auto -mt-3 bg-black/70 text-white text-xs px-4 py-1 rounded-t-xl flex items-center justify-center gap-2 w-36 sm:w-40 relative z-10">
                            <FaEye className="text-xs" />
                            <span>{school.views}</span>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                          <h3 className="text-base md:text-lg font-semibold text-gray-800 flex items-center">
                            {/* Partner School Verified Tick */}
                            {isPartnerSchool && (
                              <FaCheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-1.5" />
                            )}
                            {!isPartnerSchool && school.isVerified && (
                              <svg
                                className="w-4 h-4 md:w-5 md:h-5 text-green-600 mr-1.5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            )}
                            {school.school_title}
                          </h3>
                          <p className="text-gray-600 text-xs mt-1 flex items-center gap-1">
                            📍 {school.address}
                          </p>
                          <p
                            className={`
                            font-bold text-sm md:text-base mt-1
                            ${isPartnerSchool ? "text-blue-700" : "text-red-600"}
                          `}
                          >
                            ₹ {school.average_fee}
                            <span className="font-normal text-xs text-gray-500">
                              {" "}
                              / annum
                            </span>
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span
                              className={`
                              px-2 py-1 text-[0.65rem] rounded-full font-medium
                              ${isPartnerSchool
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-purple-50 text-purple-700"
                                }
                            `}
                            >
                              {school.category}
                            </span>
                            <span
                              className={`
                              px-2 py-1 text-[0.65rem] rounded-full font-medium
                              ${isPartnerSchool
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-purple-50 text-purple-700"
                                }
                            `}
                            >
                              {school.board?.title}
                            </span>
                            <span
                              className={`
                              px-2 py-1 text-[0.65rem] rounded-full font-medium
                              ${isPartnerSchool
                                  ? "bg-pink-100 text-pink-700"
                                  : "bg-pink-50 text-pink-700"
                                }
                            `}
                            >
                              {school.classification?.title}
                            </span>
                            <span
                              className={`
                              px-2 py-1 text-[0.65rem] rounded-full font-medium
                              ${isPartnerSchool
                                  ? "bg-green-100 text-green-700"
                                  : "bg-green-50 text-green-700"
                                }
                            `}
                            >
                              Class {school.grade?.title}
                            </span>
                          </div>
                          {school.about && (
                            <div className="text-xs text-gray-700 mt-2">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: safeSanitize(getAboutText(school)),
                                }}
                              />
                              {shouldShowReadMore(school) && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setExpanded((prev) => ({
                                      ...prev,
                                      [`about-${school.id}`]:
                                        !prev[`about-${school.id}`],
                                    }));
                                  }}
                                  className="text-red-500 font-medium cursor-pointer"
                                >
                                  {expanded[`about-${school.id}`]
                                    ? "Read less"
                                    : "Read more"}
                                </button>
                              )}
                            </div>
                          )}

                          {/* Partner School Benefits */}
                          {isPartnerSchool && (
                            <div className="mt-3 p-2 bg-blue-100 rounded-lg border border-blue-200">
                              <div className="flex items-center gap-2 text-blue-800 text-xs font-medium">
                                <FaCheckCircle className="h-3 w-3" />
                                <span>
                                  Partner Benefits: Priority Admission • Special
                                  Discounts • Dedicated Support
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="mt-5 flex flex-wrap gap-1 md:gap-3">
                            <button className="px-3 py-1.5 border border-red-600 text-red-600 text-xs rounded-lg hover:bg-red-600 hover:text-white transition cursor-pointer">
                              View School
                            </button>
                            <button
                              onClick={(e) => handleApplyNow(school, e)}
                              className={`
                                px-3 py-1.5 text-white text-xs rounded-lg hover:bg-green-700 transition cursor-pointer
                                ${isPartnerSchool
                                  ? "bg-purple-600 hover:bg-purple-700"
                                  : "bg-green-600 hover:bg-green-700"
                                }
                              `}
                            >
                              Enquire Now
                            </button>
                            {/* Conditional rendering for partner vs non-partner schools */}

                            {isPartnerSchool ? (
                              <>
                                <button
                                  onClick={(e) => handleRequestCallBack(school, e)}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition cursor-pointer"
                                >
                                  <Phone size={12} />
                                  Request a Call Back
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={(e) => handleCallNow(school, e)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition cursor-pointer"
                              >
                                <Phone size={12} />
                                Call Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                    
                    {/* Blue Line Partition - Add between schools except after the last one */}
                    {index < sortedSchools.length - 1 && (
                      <div className="h-1 bg-[#1447E6] rounded-full mx-4"></div>
                    )}

                    {/* Alternate banners after every 8 schools */}
                    {(index + 1) % 8 === 0 && (
                      <div className="my-10">
                        {Math.floor((index + 1) / 8) % 2 === 1 ? (
                          <Didyouknow />
                        ) : (
                          <RecommendationBanner />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-6 bg-white rounded-xl shadow-md">
              No schools match the selected filters.
            </p>
          )}
          {/* Only render FAQ section on client side to avoid hydration mismatch */}
          {isClient && faqItems.length > 0 && (
            <div className="bg-white shadow-lg rounded-xl p-6 mt-8 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 text-sm">
                  Find answers to common questions about our schools
                </p>
              </div>
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-sm"
                  >
                    <button
                      onClick={() => toggleFandq(index)}
                      className="flex justify-between items-center w-full text-left p-5 bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-blue-50 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <span className="text-base font-semibold text-gray-800">
                          {faq.question}
                        </span>
                      </div>
                      {faqOpen[index] ? (
                        <div className="bg-blue-100 p-1 rounded-full">
                          <ChevronUp
                            size={20}
                            className="text-blue-600 flex-shrink-0"
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-100 p-1 rounded-full">
                          <ChevronDown
                            size={20}
                            className="text-gray-600 flex-shrink-0"
                          />
                        </div>
                      )}
                    </button>
                    {faqOpen[index] && (
                      <div className="p-5 bg-white border-t border-gray-100 transition-all duration-300">
                        <div className="flex space-x-4">
                          <div className="bg-green-100 p-2 rounded-full h-9 w-9 flex-shrink-0">
                            <svg
                              className="w-5 h-5 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                          </div>
                          <div
                            className="text-sm text-gray-700 leading-relaxed prose prose-sm"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}