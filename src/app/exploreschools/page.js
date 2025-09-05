"use client";

import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { ChevronDown, ChevronUp, Heart, Phone, Filter, X } from "lucide-react";
import { schoolsData } from "./data";
import Link from "next/link";
import { useModal } from "../contexts/ModalContext";
import ApplyModal from "../components/ApplyModal";
import { useCity } from "../contexts/CityContext";
import { useWishlist } from "../contexts/WishlistContext";

export default function Page() {
  const { city } = useCity();
  const { wishlist, addToWishlist, removeFromWishlist, isWishlisted } =
    useWishlist();
  const [filters, setFilters] = useState({
    fees: [],
    board: [],
    gender: [],
    region: [],
    school: [],
  });

  const [sortBy, setSortBy] = useState("");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [accordion, setAccordion] = useState({
    fees: true,
    board: false,
    gender: false,
    region: false,
    school: false,
  });

  const [expanded, setExpanded] = useState({});
  const [showMoreHighlights, setShowMoreHighlights] = useState(false);
  const [showMoreSuggestions, setShowMoreSuggestions] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { openModal } = useModal();

  const toggleAccordion = (section) => {
    setAccordion((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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
    if (isWishlisted(school.id)) {
      removeFromWishlist(school.id);
    } else {
      addToWishlist(school);
    }
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    setSortDropdownOpen(false);
  };

  const handleApplyNow = (school, e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(<ApplyModal schoolId={school.id} schoolName={school.name} />);
  };

  const handleCallNow = (school, e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `tel:${school.phone || ""}`;
  };

  const getCityFromLocation = (location) => {
    return location.split(", ")[0].trim();
  };

  const getRegionFromLocation = (location) => {
    const state = location.split(", ")[1]?.trim().toLowerCase();
    const regionMap = {
      uttarakhand: "North",
      "andhra pradesh": "South",
      rajasthan: "West",
      "uttar pradesh": "North",
      delhi: "North",
    };
    return regionMap[state] || "Unknown";
  };

  const filteredSchools = schoolsData.filter((school) => {
    if (filters.fees.length > 0 && !filters.fees.includes(school.feesRange))
      return false;

    if (
      filters.board.length > 0 &&
      !filters.board.some((b) =>
        school.board.toLowerCase().includes(b.toLowerCase())
      )
    )
      return false;

    const genderMap = {
      Boys: "boys",
      Girls: "girls",
      "Co-Ed": "co-ed",
    };
    if (
      filters.gender.length > 0 &&
      !filters.gender.some((g) => school.gender === genderMap[g])
    )
      return false;

    if (
      filters.region.length > 0 &&
      !filters.region.includes(getRegionFromLocation(school.location))
    )
      return false;

    if (
      filters.school.length > 0 &&
      !filters.school.includes(school.managementType)
    )
      return false;

    return true;
  });

  const sortedSchools = [...filteredSchools].sort((a, b) => {
    if (city) {
      const aCity = getCityFromLocation(a.location).toLowerCase();
      const bCity = getCityFromLocation(b.location).toLowerCase();
      const aMatchesCity = aCity === city.toLowerCase();
      const bMatchesCity = bCity === city.toLowerCase();
      if (aMatchesCity && !bMatchesCity) return -1;
      if (!aMatchesCity && bMatchesCity) return 1;
    }

    if (sortBy === "fee-high-to-low") {
      return (
        parseFloat(b.fees.replace(/,/g, "")) -
        parseFloat(a.fees.replace(/,/g, ""))
      );
    }
    if (sortBy === "fee-low-to-high") {
      return (
        parseFloat(a.fees.replace(/,/g, "")) -
        parseFloat(b.fees.replace(/,/g, ""))
      );
    }
    if (sortBy === "rating-high-to-low") {
      return parseFloat(b.rating) - parseFloat(a.rating);
    }
    return 0;
  });

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
                className="flex items-center space-x-2 text-[13px]"
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
            {["CBSE", "IB", "ICSE & ISC", "IGCSE & CIE"].map((board) => (
              <label
                key={board}
                className="flex items-center space-x-2 text-[13px]"
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
                className="flex items-center space-x-2 text-[13px]"
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

      <div className="border-b border-gray-300">
        <button
          onClick={() => toggleAccordion("region")}
          className="flex justify-between w-full px-4 py-5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          <span className="font-bold text-black">Region</span>
          {accordion.region ? (
            <ChevronUp size={18} className="text-gray-500" />
          ) : (
            <ChevronDown size={18} className="text-gray-500" />
          )}
        </button>
        {accordion.region && (
          <div className="px-4 py-2 space-y-1">
            {["North", "South", "West"].map((region) => (
              <label
                key={region}
                className="flex items-center space-x-2 text-[13px]"
              >
                <input
                  type="checkbox"
                  checked={filters.region.includes(region)}
                  onChange={() => toggleFilter("region", region)}
                  className="h-3 w-3 text-indigo-600 border-gray-300 rounded cursor-pointer"
                />
                <span className="text-gray-700">{region}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-b border-gray-300">
        <button
          onClick={() => toggleAccordion("school")}
          className="flex justify-between w-full px-4 py-5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          <span className="font-bold text-black">School</span>
          {accordion.school ? (
            <ChevronUp size={18} className="text-gray-500" />
          ) : (
            <ChevronDown size={18} className="text-gray-500" />
          )}
        </button>
        {accordion.school && (
          <div className="px-4 py-2 space-y-1">
            {["Private", "Government"].map((s) => (
              <label
                key={s}
                className="flex items-center space-x-2 text-[13px]"
              >
                <input
                  type="checkbox"
                  checked={filters.school.includes(s)}
                  onChange={() => toggleFilter("school", s)}
                  className="h-3 w-3 text-indigo-600 border-gray-300 rounded cursor-pointer"
                />
                <span className="text-gray-700">{s}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
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

        <div className="bg-white shadow-md rounded-xl p-6 space-y-3 border-l-8 border-blue-400">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Highlights</h2>
            <button
              onClick={() => setShowMoreHighlights(!showMoreHighlights)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-full cursor-pointer"
            >
              {showMoreHighlights ? "Show Less" : "Show More"}
            </button>
          </div>
          <ul className="text-gray-700 text-sm space-y-2">
            <li>
              ✅ The top boarding schools in India are known for their rich
              legacy of academic excellence, holistic development and
              disciplined environment.
            </li>
            {showMoreHighlights && (
              <li>
                ✅ From The Doon School, Mayo College or Bishop Cotton School to
                newer ones such as The International School Bangalore, the best
                schools offer national + international curricula.
              </li>
            )}
          </ul>
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
                : sortBy === "rating-high-to-low"
                ? "Rating - high to low"
                : "Sort By"}
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  sortDropdownOpen ? "rotate-180" : ""
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
                  <button
                    onClick={() => handleSort("rating-high-to-low")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Rating - high to low
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {sortedSchools.length > 0 ? (
          sortedSchools.map((school) => (
            <Link
              key={school.id}
              href={`/exploreschools/${school.id}`}
              className="block"
            >
              <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col md:flex-row gap-5 cursor-pointer">
                <button
                  onClick={(e) => toggleWishlist(school, e)}
                  className="absolute top-3 right-3 z-10 bg-white p-1 rounded-full shadow-md cursor-pointer"
                >
                  <Heart
                    size={20}
                    className={`transition-colors ${
                      isWishlisted(school.id)
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
                  <div className="h-40 rounded-lg overflow-hidden">
                    <img
                      src={school.image}
                      alt={school.name}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>
                  <div className="mx-auto -mt-3 bg-black/70 text-white text-xs px-4 py-1 rounded-t-xl flex items-center justify-center gap-2 w-36 sm:w-40 relative z-10">
                    <FaEye className="text-xs" />
                    <span>{school.views}</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 flex items-center">
                    {school.isVerified && (
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-green-600 mr-1.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    )}
                    {school.name}
                  </h3>
                  <p className="text-gray-600 text-xs mt-1 flex items-center gap-1">
                    📍 {school.location}
                  </p>
                  <p className="text-red-600 font-bold text-sm md:text-base mt-1">
                    ₹ {school.fees}
                    <span className="font-normal text-xs text-gray-500">
                      {" "}
                      / annum
                    </span>
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-xs bg-yellow-50 px-2 py-1 rounded-full">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{school.rating}</span>
                      <span className="text-gray-500">({school.votes})</span>
                    </div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[0.65rem] rounded-full font-medium">
                      {school.type}
                    </span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-[0.65rem] rounded-full font-medium">
                      {school.board}
                    </span>
                    <span className="px-2 py-1 bg-pink-50 text-pink-700 text-[0.65rem] rounded-full font-medium">
                      {school.gender}
                    </span>
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-[0.65rem] rounded-full font-medium">
                      Class {school.grade}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 mt-4">
                    <span className="font-semibold">Expert Comment: </span>
                    {expanded[school.id]
                      ? school.comment
                      : school.comment.slice(0, 150) + "... "}
                    {school.comment.length > 150 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setExpanded((prev) => ({
                            ...prev,
                            [school.id]: !prev[school.id],
                          }));
                        }}
                        className="text-red-500 font-medium cursor-pointer"
                      >
                        {expanded[school.id] ? "Read less" : "Read more"}
                      </button>
                    )}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1 md:gap-3">
                    <button className="px-3 py-1.5 border border-red-600 text-red-600 text-xs rounded-lg hover:bg-red-600 hover:text-white transition cursor-pointer">
                      View School
                    </button>
                    <button
                      onClick={(e) => handleApplyNow(school, e)}
                      className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition cursor-pointer"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={(e) => handleCallNow(school, e)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition cursor-pointer"
                    >
                      <Phone size={12} />
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-6 bg-white rounded-xl shadow-md">
            No schools match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
}
