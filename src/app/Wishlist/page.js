// app/shortlist/page.jsx
"use client";

import { FaEye } from "react-icons/fa";
import { Heart, Phone } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "../contexts/WishlistContext";
import { useModal } from "../contexts/ModalContext";
import ApplyModal from "../components/ApplyModal";
import { useState } from "react";

export default function ShortlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { openModal } = useModal();
  const [expanded, setExpanded] = useState({});

  const handleApplyNow = (school, e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(
      <ApplyModal
        schoolId={school.id}
        schoolName={school.school_title || "School"}
      />
    );
  };

  const handleCallNow = (school, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (school.phone) window.location.href = `tel:${school.phone}`;
  };

  const decodeBase64 = (str) => {
    if (!str) return "";
    try {
      return decodeURIComponent(escape(window.atob(str)));
    } catch (e) {
      return "";
    }
  };

  const getPathFromUrl = (url) => {
    if (!url) return "/";
    try {
      const urlObj = new URL(url);
      return urlObj.pathname + urlObj.search;
    } catch (e) {
      return url.startsWith("/") ? url : `/${url}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-0 sm:mt-12">
      <h1 className="text-2xl font-bold mb-6">Your Shortlisted Schools</h1>

      {wishlist.length > 0 ? (
        <div className="space-y-4">
          {wishlist.map((school) => (
            <Link
              key={school.id}
              href={getPathFromUrl(school.url)}
              className="block"
            >
              <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col md:flex-row gap-5 cursor-pointer">
                {/* Remove from wishlist */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromWishlist(school.id);
                  }}
                  className="absolute top-3 right-3 z-10 bg-white p-1 rounded-full shadow-md cursor-pointer"
                >
                  <Heart size={20} className="fill-red-500 text-red-500" />
                </button>

                {/* Admission Open Badge */}
                {school.isAdmissionOpen && (
                  <img
                    src="https://res.cloudinary.com/dnq8fbcxh/image/upload/v1756874282/vecteezy_admissions-open-sign-red-yellow-hanging-board-new-student_60579933_echl2d.png"
                    alt="Admission Open"
                    className="absolute top-2 right-12 w-12 sm:w-14 animate-hang"
                  />
                )}

                {/* Thumbnail */}
                <div className="w-full md:w-56 flex-shrink-0 mx-auto">
                  <div className="h-40 rounded-lg overflow-hidden">
                    <img
                      src={
                        school.thumbnail
                          ? `https://www.doonedu.com/images/schools/${school.id}/${school.thumbnail}`
                          : "/placeholder-school.png"
                      }
                      alt={school.school_title || "School"}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>
                  <div className="mx-auto -mt-3 bg-black/70 text-white text-xs px-4 py-1 rounded-t-xl flex items-center justify-center gap-2 w-36 sm:w-40 relative z-10">
                    <FaEye className="text-xs" />
                    <span>{school.views || 0}</span>
                  </div>
                </div>

                {/* School Info */}
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
                    {school.school_title || "Unknown School"}
                  </h3>
                  <p className="text-gray-600 text-xs mt-1 flex items-center gap-1">
                    📍 {school.address || "Address not available"}
                  </p>
                  <p className="text-red-600 font-bold text-sm md:text-base mt-1">
                    ₹ {school.average_fee || "N/A"}
                    <span className="font-normal text-xs text-gray-500">
                      {" "}
                      / annum
                    </span>
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-[0.65rem] rounded-full font-medium">
                      {school.category || "N/A"}
                    </span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-[0.65rem] rounded-full font-medium">
                      {school.board?.title || "N/A"}
                    </span>
                    <span className="px-2 py-1 bg-pink-50 text-pink-700 text-[0.65rem] rounded-full font-medium">
                      {school.classification?.title || "N/A"}
                    </span>
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-[0.65rem] rounded-full font-medium">
                      Class {school.grade?.title || "-"}
                    </span>
                  </div>

                  {/* About Section */}
                  {school.about && (
                    <div className="text-xs text-gray-700 mt-2">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: expanded[`about-${school.id}`]
                            ? decodeBase64(school.about)
                            : decodeBase64(school.about).slice(0, 150) + "...",
                        }}
                      />
                      {decodeBase64(school.about).length > 140 && (
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

                  {/* Action Buttons */}
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
                    {school.phone && (
                      <button
                        onClick={(e) => handleCallNow(school, e)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition cursor-pointer"
                      >
                        <Phone size={12} />
                        Call Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm text-center py-6 bg-white rounded-xl shadow-md">
          No schools have been added to your shortlist yet.
        </p>
      )}
    </div>
  );
}
