"use client";

import { useState } from "react";
import { schoolsData } from "../data";
import { useParams, useRouter } from "next/navigation";
import {
  FaSchool,
  FaMapMarkerAlt,
  FaClock,
  FaHome,
  FaEnvelope,
  FaGlobe,
  FaInfoCircle,
  FaMoneyBill,
  FaImages,
  FaIdCard,
  FaGraduationCap,
  FaCalendarAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaShieldAlt,
  FaFutbol,
  FaGamepad,
  FaComment,
  FaQuestionCircle,
  FaBook,
  FaCertificate,
  FaUserCheck,
  FaChevronDown,
  FaChevronUp,
  FaUniversity,
  FaBus,
  FaTrain,
  FaPlaneDeparture,
  FaVenus,
  FaMars,
  FaVenusMars,
  FaTableTennis,
  FaBasketballBall,
  FaVolleyballBall,
  FaChess,
  FaSwimmer,
  FaRunning,
  FaMusic,
  FaBuilding,
  FaTools,
  FaFileAlt,
  FaHandsHelping,
} from "react-icons/fa";
import { Phone, Heart } from "lucide-react";
import { useModal } from "../../contexts/ModalContext";
import { useWishlist } from "../../contexts/WishlistContext";
import ApplyModal from "../../components/ApplyModal";

export default function SchoolPage() {
  const { id } = useParams();
  const router = useRouter();
  const { openModal } = useModal();
  const { wishlist, addToWishlist, removeFromWishlist, isWishlisted } =
    useWishlist();
  const school = schoolsData.find((s) => String(s.id) === id);
  const [activeTab, setActiveTab] = useState("summary");
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    review: "",
    parentName: "",
  });
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [galleryTab, setGalleryTab] = useState("all");
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const toggleWishlist = (school, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted(school.id)) {
      removeFromWishlist(school.id);
    } else {
      addToWishlist(school);
    }
  };

  if (!school) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold text-base sm:text-lg">
        ❌ School not found
      </div>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", reviewForm);
    setReviewForm({ rating: 0, review: "", parentName: "" });
  };

  const toggleFaq = (index, e) => {
    e.stopPropagation();
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const filteredGallery =
    galleryTab === "all"
      ? school.gallery || []
      : (school.gallery || []).filter((item) => item.type === galleryTab);

  const similarSchools = schoolsData.filter(
    (s) => school.similarSchools?.includes(Number(s.id)) || []
  );

  const openGalleryModal = (index = 0) => {
    setCurrentGalleryIndex(index);
    setShowGalleryModal(true);
  };

  const closeGalleryModal = () => {
    setShowGalleryModal(false);
  };

  const navigateGallery = (direction, e) => {
    e.stopPropagation();
    if (direction === "next") {
      setCurrentGalleryIndex(
        (prevIndex) => (prevIndex + 1) % filteredGallery.length
      );
    } else {
      setCurrentGalleryIndex((prevIndex) =>
        prevIndex === 0 ? filteredGallery.length - 1 : prevIndex - 1
      );
    }
  };

  const handleSimilarSchoolClick = (schoolId, e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/schools/${schoolId}`);
  };

  const handleApplyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(<ApplyModal schoolId={school.id} schoolName={school.name} />);
  };

  const handleCallNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `tel:${school.phone || ""}`;
  };

  const getGalleryImageUrl = (index) => {
    if (!school.gallery || school.gallery.length === 0)
      return "/placeholder.jpg";

    const item = school.gallery[index];
    if (typeof item === "string") return item;
    if (item && item.url) return item.url;
    return "/placeholder.jpg";
  };

  const GenderIcon = () => {
    switch (school.gender.toLowerCase()) {
      case "boys":
        return <FaMars className="h-4 w-4 mr-1 text-blue-500" />;
      case "girls":
        return <FaVenus className="h-4 w-4 mr-1 text-pink-500" />;
      case "co-ed":
        return <FaVenusMars className="h-4 w-4 mr-1 text-purple-500" />;
      default:
        return <FaUsers className="h-4 w-4 mr-1" />;
    }
  };

  const getActivityIcon = (activity) => {
    const activityLower = activity.toLowerCase();
    switch (activityLower) {
      case "cricket":
        return <FaFutbol className="h-4 w-4 mr-1 text-green-500" />;
      case "basketball":
        return <FaBasketballBall className="h-4 w-4 mr-1 text-orange-500" />;
      case "table tennis":
        return <FaTableTennis className="h-4 w-4 mr-1 text-blue-500" />;
      case "volleyball":
        return <FaVolleyballBall className="h-4 w-4 mr-1 text-yellow-500" />;
      case "chess":
        return <FaChess className="h-4 w-4 mr-1 text-purple-500" />;
      case "swimming":
        return <FaSwimmer className="h-4 w-4 mr-1 text-blue-600" />;
      case "athletics":
        return <FaRunning className="h-4 w-4 mr-1 text-red-500" />;
      case "music":
        return <FaMusic className="h-4 w-4 mr-1 text-pink-500" />;
      default:
        return <FaGamepad className="h-4 w-4 mr-1 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {showGalleryModal && (
        <div
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
          onClick={closeGalleryModal}
        >
          <div className="absolute top-4 left-4 text-white text-xs sm:text-sm">
            {currentGalleryIndex + 1} / {filteredGallery.length}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeGalleryModal();
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl sm:text-2xl z-10 cursor-pointer"
            aria-label="Close gallery"
          >
            ✕
          </button>

          <div
            className="flex-1 flex items-center justify-center w-full px-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => navigateGallery("prev", e)}
              className="absolute left-4 sm:left-6 bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60 transition z-10 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 sm:h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {filteredGallery[currentGalleryIndex]?.type === "image" ? (
              <img
                src={filteredGallery[currentGalleryIndex]?.url}
                alt={filteredGallery[currentGalleryIndex]?.caption}
                className="max-h-[75vh] w-auto object-contain rounded-lg"
              />
            ) : (
              <div className="h-[70vh] w-full bg-gray-900 flex items-center justify-center rounded-lg">
                <span className="text-4xl sm:text-6xl text-white">🎥</span>
              </div>
            )}

            <button
              onClick={(e) => navigateGallery("next", e)}
              className="absolute right-4 sm:right-6 bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60 transition z-10 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div
            className="text-center text-white text-xs sm:text-sm mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredGallery[currentGalleryIndex]?.caption || "Cover Pic"}
          </div>

          {filteredGallery.length > 1 && (
            <div
              className="mt-3 flex gap-2 overflow-x-auto px-4 pb-4"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredGallery.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`w-20 h-16 cursor-pointer border-2 rounded overflow-hidden ${
                    index === currentGalleryIndex
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentGalleryIndex(index);
                  }}
                >
                  {item.type === "image" ? (
                    <img
                      src={item.thumbnailUrl || item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-lg sm:text-xl">🎥</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* HERO SECTION */}
      <div className="relative mt-2 sm:mt-14 px-4 sm:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto">
          <div className="col-span-1 md:col-span-2 h-full">
            <img
              src={school.image}
              alt={school.name}
              className="w-full object-cover rounded-lg h-[200px] sm:h-[400px]"
            />
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            <img
              src={getGalleryImageUrl(0)}
              alt="Gallery 1"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src={getGalleryImageUrl(1)}
              alt="Gallery 2"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="absolute top-[10rem] right-8 sm:right-20 flex gap-2 sm:top-[22rem]">
          <button
            onClick={() => openGalleryModal()}
            className="text-white text-xs sm:text-sm bg-purple-600/80 px-3 py-2 rounded-full hover:bg-purple-700 flex items-center gap-1 cursor-pointer"
          >
            <FaImages className="h-4 w-4" />
            View Gallery
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-2/3">
            {/* School title and basic info */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100 relative">
              <button
                onClick={(e) => toggleWishlist(school, e)}
                className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-transform duration-200 ease-in-out transform hover:scale-110 cursor-pointer"
                aria-label={
                  isWishlisted(school.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <Heart
                  size={20}
                  className={`transition-colors duration-200 ${
                    isWishlisted(school.id)
                      ? "fill-red-500 text-red-500"
                      : "fill-white text-red-500"
                  }`}
                />
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                {school.isVerified && (
                  <svg
                    className="w-8 h-8 sm:w-5 sm:h-5 text-green-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                )}
                {school.name} | {school.location}
              </h2>
              <p className="text-gray-600 mt-1 flex items-center text-sm sm:text-base">
                <FaMapMarkerAlt className="h-4 w-4 mr-4" />
                {school.address || "Address not specified"}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg sm:text-xl ${
                        i < Math.floor(school.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-gray-700 font-medium text-sm sm:text-base">
                    {school.rating} / 5
                  </span>
                </div>
                <div className="text-gray-700 flex items-center bg-blue-50 px-3 py-1 rounded-full text-sm sm:text-base">
                  <FaClock className="h-4 w-4 mr-1 text-blue-500" />
                  <span className="font-medium">Day School</span> - ₹
                  {school.fees} / annum
                </div>
                {school.boardingFees && (
                  <div className="text-gray-700 flex items-center bg-green-50 px-3 py-1 rounded-full text-sm sm:text-base">
                    <FaHome className="h-4 w-4 mr-1 text-green-500" />
                    <span className="font-medium">Boarding</span> - ₹
                    {school.boardingFees} / annum
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center">
                  <FaGraduationCap className="h-4 w-4 mr-1" />
                  {school.board}
                </span>
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center">
                  <GenderIcon />
                  {school.gender}
                </span>
                <div className="ml-auto flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={handleCallNow}
                    className="bg-red-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-red-700 flex items-center cursor-pointer"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call Now
                  </button>
                  <button
                    onClick={handleApplyNow}
                    className="bg-green-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-green-700 flex items-center cursor-pointer"
                  >
                    <FaFileAlt className="h-4 w-4 mr-1" />
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-100">
              <div className="flex overflow-x-auto border-b">
                <button
                  className={`px-4 py-3 font-medium text-xs sm:text-sm flex items-center cursor-pointer ${
                    activeTab === "summary"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("summary")}
                >
                  <FaInfoCircle className="h-4 w-4 mr-1" />
                  SUMMARY
                </button>
                <button
                  className={`px-4 py-3 font-medium text-xs sm:text-sm flex items-center cursor-pointer ${
                    activeTab === "basic-info"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("basic-info")}
                >
                  <FaIdCard className="h-4 w-4 mr-1" />
                  BASIC INFO
                </button>
                <button
                  className={`px-4 py-3 font-medium text-xs sm:text-sm flex items-center cursor-pointer ${
                    activeTab === "fees"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("fees")}
                >
                  <FaMoneyBill className="h-4 w-4 mr-1" />
                  FEES
                </button>
                <button
                  className={`px-4 py-3 font-medium text-xs sm:text-sm flex items-center cursor-pointer ${
                    activeTab === "gallery"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("gallery")}
                >
                  <FaImages className="h-4 w-4 mr-1" />
                  GALLERY
                </button>
                <button
                  className={`px-4 py-3 font-medium text-xs sm:text-sm flex items-center cursor-pointer ${
                    activeTab === "contact"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("contact")}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  CONTACT
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "summary" && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                      <FaInfoCircle className="h-5 w-5 mr-2 text-blue-700" />
                      About School
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {school.about || school.comment}
                    </p>

                    <h3 className="text-base sm:text-lg font-bold mt-6 mb-4 flex items-center">
                      <FaBook className="h-5 w-5 mr-2 text-blue-700" />
                      Key Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <FaGraduationCap className="h-5 w-5 mr-2 mt-1 text-blue-700" />
                        <div>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            Affiliation / Examination Board
                          </p>
                          <p className="font-medium text-sm sm:text-base">
                            {school.board}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaSchool className="h-5 w-5 mr-2 mt-1 text-blue-700" />
                        <div>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            Type of School
                          </p>
                          <p className="font-medium text-sm sm:text-base">
                            {school.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaClock className="h-5 w-5 mr-2 mt-1 text-blue-700" />
                        <div>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            Grade
                          </p>
                          <p className="font-medium text-sm sm:text-base">
                            {school.grade}
                          </p>
                        </div>
                      </div>
                      {school.establishmentYear && (
                        <div className="flex items-start">
                          <FaCalendarAlt className="h-5 w-5 mr-2 mt-1 text-blue-700" />
                          <div>
                            <p className="text-gray-600 text-xs sm:text-sm">
                              Establishment Year
                            </p>
                            <p className="font-medium text-sm sm:text-base">
                              {school.establishmentYear}
                            </p>
                          </div>
                        </div>
                      )}
                      {school.studentTeacherRatio && (
                        <div className="flex items-start">
                          <FaChalkboardTeacher className="h-5 w-5 mr-2 mt-1 text-blue-700" />
                          <div>
                            <p className="text-gray-600 text-xs sm:text-sm">
                              Student Teacher Ratio
                            </p>
                            <p className="font-medium text-sm sm:text-base">
                              {school.studentTeacherRatio}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "basic-info" && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                      <FaInfoCircle className="h-5 w-5 mr-2 text-blue-700" />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {school.trustName && (
                        <div className="flex items-start">
                          <FaShieldAlt className="h-5 w-5 mr-2 mt-1 text-blue-700" />
                          <div>
                            <p className="text-gray-600 text-xs sm:text-sm">
                              Trust/Society/Company registered with
                            </p>
                            <p className="font-medium text-sm sm:text-base">
                              {school.trustName}
                            </p>
                          </div>
                        </div>
                      )}
                      {school.affiliationStatus && (
                        <div className="flex items-start">
                          <FaCertificate className="h-5 w-5 mr-2 mt-1 text-blue-700" />
                          <div>
                            <p className="text-gray-600 text-xs sm:text-sm">
                              Affiliation Status
                            </p>
                            <p className="font-medium text-sm sm:text-base">
                              {school.affiliationStatus}
                            </p>
                          </div>
                        </div>
                      )}
                      {school.affiliationGrantYear && (
                        <div className="flex items-start">
                          <FaCalendarAlt className="h-5 w-5 mr-2 mt-1 text-blue-700" />
                          <div>
                            <p className="text-gray-600 text-xs sm:text-sm">
                              Affiliation Grant Year
                            </p>
                            <p className="font-medium text-sm sm:text-base">
                              {school.affiliationGrantYear}
                            </p>
                          </div>
                        </div>
                      )}
                      {school.totalTeachers && (
                        <div className="flex items-start">
                          <FaChalkboardTeacher className="h-5 w-5 mr-2 mt-1 text-blue-700" />
                          <div>
                            <p className="text-gray-600 text-xs sm:text-sm">
                              Total no. of Teachers
                            </p>
                            <p className="font-medium text-sm sm:text-base">
                              {school.totalTeachers}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "fees" && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                      <FaMoneyBill className="h-5 w-5 mr-2 text-blue-700" />
                      Fee Structure
                    </h3>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-2 flex items-center text-sm sm:text-base">
                        <FaClock className="h-4 w-4 mr-1" />
                        {school.board} Board Fee Structure - Day School
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 border-b border-blue-100">
                          <span className="text-gray-600 flex items-center text-xs sm:text-sm">
                            <FaMoneyBill className="h-4 w-4 mr-1" />
                            Annual Fee
                          </span>
                          <span className="font-medium text-green-600 text-sm sm:text-base">
                            ₹{school.fees}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-blue-100">
                          <span className="text-gray-600 text-xs sm:text-sm">
                            Admission Fee
                          </span>
                          <span className="font-medium text-sm sm:text-base">
                            ₹10,000
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600 text-xs sm:text-sm">
                            Application Fee
                          </span>
                          <span className="font-medium text-sm sm:text-base">
                            ₹2,000
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm mt-4">
                      *The above listed fees details are information available.
                      Current fees might vary, depending on recent changes.
                    </p>
                  </div>
                )}

                {activeTab === "gallery" && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                      <FaImages className="h-5 w-5 mr-2 text-blue-500" />
                      Gallery
                    </h3>
                    <div className="flex border-b mb-4">
                      <button
                        className={`px-4 py-2 flex items-center text-xs sm:text-sm cursor-pointer ${
                          galleryTab === "all"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600"
                        }`}
                        onClick={() => setGalleryTab("all")}
                      >
                        <FaImages className="h-4 w-4 mr-1" />
                        All
                      </button>
                      <button
                        className={`px-4 py-2 flex items-center text-xs sm:text-sm cursor-pointer ${
                          galleryTab === "image"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600"
                        }`}
                        onClick={() => setGalleryTab("image")}
                      >
                        <FaImages className="h-4 w-4 mr-1" />
                        Photos
                      </button>
                      <button
                        className={`px-4 py-2 flex items-center text-xs sm:text-sm cursor-pointer ${
                          galleryTab === "video"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600"
                        }`}
                        onClick={() => setGalleryTab("video")}
                      >
                        <FaImages className="h-4 w-4 mr-1" />
                        Videos
                      </button>
                    </div>
                    {filteredGallery.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredGallery.map((item, index) => (
                          <div
                            key={item.id || index}
                            className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                            onClick={() => openGalleryModal(index)}
                          >
                            {item.type === "image" ? (
                              <img
                                src={item.url}
                                alt={item.caption}
                                className="h-40 w-full object-cover"
                              />
                            ) : (
                              <div className="h-40 bg-gray-300 flex items-center justify-center">
                                <span className="text-4xl">🎥</span>
                              </div>
                            )}
                            <div className="p-3">
                              <p className="text-xs sm:text-sm font-medium">
                                {item.caption}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <FaImages className="h-12 w-12 mx-auto text-gray-400" />
                        <p className="text-gray-500 mt-2 text-sm sm:text-base">
                          No gallery items available
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "contact" && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-blue-500" />
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      {school.email && (
                        <p className="flex items-center p-3 bg-blue-50 rounded-lg text-sm sm:text-base">
                          <FaEnvelope className="h-5 w-5 mr-3 text-blue-500" />
                          <span>{school.email}</span>
                        </p>
                      )}
                      {school.phone && (
                        <p className="flex items-center p-3 bg-green-50 rounded-lg text-sm sm:text-base">
                          <Phone className="h-5 w-5 mr-3 text-green-500" />
                          <span>{school.phone}</span>
                        </p>
                      )}
                      {school.address && (
                        <p className="flex items-center p-3 bg-purple-50 rounded-lg text-sm sm:text-base">
                          <FaMapMarkerAlt className="h-5 w-5 mr-3 text-purple-500" />
                          <span>{school.address}</span>
                        </p>
                      )}
                      {school.website && (
                        <p className="flex items-center p-3 bg-orange-50 rounded-lg text-sm sm:text-base">
                          <FaGlobe className="h-5 w-5 mr-3 text-orange-500" />
                          <a
                            href={school.website}
                            className="text-blue-600 cursor-pointer"
                          >
                            {school.website}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Co-curricular Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                <FaFutbol className="h-5 w-5 mr-2 text-blue-500" />
                Co-curricular Activities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center text-sm sm:text-base">
                    <FaFutbol className="h-4 w-4 mr-1 text-green-500" />
                    Outdoor Sports
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {school.outdoorSports?.map((sport, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center"
                      >
                        {getActivityIcon(sport)}
                        {sport}
                      </span>
                    )) || (
                      <span className="text-gray-500 text-sm">
                        Not specified
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center text-sm sm:text-base">
                    <FaGamepad className="h-4 w-4 mr-1 text-purple-500" />
                    Indoor Sports
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {school.indoorSports?.map((sport, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center"
                      >
                        {getActivityIcon(sport)}
                        {sport}
                      </span>
                    )) || (
                      <span className="text-gray-500 text-sm">
                        Not specified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                <FaBus className="h-5 w-5 mr-2 text-yellow-500" />
                Travel Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center text-sm sm:text-base">
                    <FaPlaneDeparture className="h-4 w-4 mr-1 text-blue-500" />
                    Nearest Airport
                  </h4>
                  <p className="text-sm text-gray-700">
                    {school.nearestAirport
                      ? `${school.nearestAirport.name} (${school.nearestAirport.distance})`
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center text-sm sm:text-base">
                    <FaTrain className="h-4 w-4 mr-1 text-green-500" />
                    Nearest Railway Station
                  </h4>
                  <p className="text-sm text-gray-700">
                    {school.nearestRailway
                      ? `${school.nearestRailway.name} (${school.nearestRailway.distance})`
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center text-sm sm:text-base">
                    <FaBus className="h-4 w-4 mr-1 text-purple-500" />
                    Nearest Bus Stand
                  </h4>
                  <p className="text-sm text-gray-700">
                    {school.nearestBus || "Not specified"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center text-sm sm:text-base">
                    <FaUniversity className="h-4 w-4 mr-1 text-red-500" />
                    Nearest Bank
                  </h4>
                  <p className="text-sm text-gray-700">
                    {school.nearestBank || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-gray-800 flex items-center">
                <FaQuestionCircle className="h-5 w-5 mr-2 text-blue-500" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {school.faqs?.map((faq, index) => (
                  <div key={index} className="border-b pb-3">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={(e) => toggleFaq(index, e)}
                    >
                      <span className="text-gray-700 text-sm sm:text-base">
                        {faq.question}
                      </span>
                      <span className="text-gray-500">
                        {expandedFaq === index ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </div>
                    {expandedFaq === index && (
                      <div className="mt-2 text-gray-600 text-xs sm:text-sm bg-blue-50 p-3 rounded-lg">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )) || (
                  <div className="text-center py-4 bg-gray-50 rounded-lg">
                    <FaQuestionCircle className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                      No FAQs available
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                <FaComment className="h-5 w-5 mr-2 text-blue-500" />
                Reviews
              </h3>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center md:w-1/3 border border-blue-100">
                  <p className="text-2xl sm:text-3xl font-bold text-blue-800">
                    {school.rating}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">out of 5</p>
                  <div className="flex justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg sm:text-xl ${
                          i < Math.floor(school.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    ({school.votes} Parent Reviews)
                  </p>
                </div>
                <div className="md:w-2/3">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                      <FaBuilding
                        className="mx-auto mb-2 text-gray-600"
                        size={24}
                      />
                      <p className="text-gray-600 text-[9px] sm:text-sm">
                        Infrastructure
                      </p>
                      <p className="font-bold text-base sm:text-lg text-blue-600">
                        4.5/5
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                      <FaBook
                        className="mx-auto mb-2 text-gray-600"
                        size={24}
                      />
                      <p className="text-gray-600 text-[9px] sm:text-sm">
                        Academics
                      </p>
                      <p className="font-bold text-base sm:text-lg text-green-600">
                        4.3/5
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                      <FaTools
                        className="mx-auto mb-2 text-gray-600"
                        size={24}
                      />
                      <p className="text-gray-600 text-[9px] sm:text-sm">
                        Facilities
                      </p>
                      <p className="font-bold text-base sm:text-lg text-purple-600">
                        3.5/5
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="text-lg font-bold mb-2 text-green-800">
                  Global Edu.Consulting Rating Score
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Our Counsellors provide these ratings to this school
                </p>
                <div className="flex justify-center mb-2">
                  <span className="text-2xl font-bold text-green-700">
                    4.9 out of 5
                  </span>
                </div>
                <div className="flex justify-center items-center gap-4 text-center mt-4 sm:gap-36">
                  <div>
                    <div className="flex justify-center mb-1">
                      <span className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <FaBuilding className="text-green-500" size={24} />
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Infrastructure</p>
                    <p className="font-bold text-green-600">4.6/5</p>
                  </div>
                  <div>
                    <div className="flex justify-center mb-1">
                      <span className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <FaUsers className="text-green-500" size={24} />
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Academics</p>
                    <p className="font-bold text-green-600">4.5/5</p>
                  </div>
                  <div>
                    <div className="flex justify-center mb-1">
                      <span className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <FaHandsHelping className="text-green-500" size={24} />
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Facilities</p>
                    <p className="font-bold text-green-600">4.6/5</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <h4 className="font-medium mb-3 text-sm sm:text-base">
                  How would you rate your overall experience with this school?
                </h4>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`text-xl sm:text-2xl cursor-pointer ${
                          reviewForm.rating >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() =>
                          setReviewForm({ ...reviewForm, rating: star })
                        }
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Parent's name"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base cursor-pointer"
                      value={reviewForm.parentName}
                      onChange={(e) =>
                        setReviewForm({
                          ...reviewForm,
                          parentName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Enter review"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base cursor-pointer"
                      rows="3"
                      value={reviewForm.review}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, review: e.target.value })
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 font-medium text-sm sm:text-base cursor-pointer"
                  >
                    SUBMIT REVIEW
                  </button>
                </form>
              </div>
              <div className="mt-6 space-y-4">
                {school.reviews?.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm sm:text-base">
                        {review.parentName}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm sm:text-base ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      {review.comment}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-gray-500">
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                          <FaUserCheck className="h-3 w-3 mr-1" />
                          Verified Parent
                        </span>
                      )}
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <FaComment className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                      No reviews yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Counselling Form and Similar Schools */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-center text-gray-800 flex items-center justify-center">
                <FaComment className="h-5 w-5 mr-2 text-blue-500" />
                FREE Counselling
              </h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Enter Parent's name"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 rounded-l-lg bg-gray-50 text-gray-600 text-sm sm:text-base">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="Enter Parent's mobile"
                      className="w-full p-3 border rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base cursor-pointer">
                    <option>Boarding School</option>
                    <option>Day School</option>
                  </select>
                </div>
                <div>
                  <textarea
                    placeholder="Message..."
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base cursor-pointer"
                    rows="3"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base cursor-pointer"
                >
                  GET COUNSELLING
                </button>
              </form>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-gray-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Similar Schools
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {similarSchools.map((similarSchool) => (
                  <div
                    key={similarSchool.id}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-gray-100"
                    onClick={(e) =>
                      handleSimilarSchoolClick(similarSchool.id, e)
                    }
                  >
                    <div className="bg-gray-200 w-16 h-16 rounded flex-shrink-0">
                      <img
                        src={similarSchool.image}
                        alt={similarSchool.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        {similarSchool.name}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs sm:text-sm ${
                              i < Math.floor(similarSchool.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="text-gray-600 text-xs sm:text-sm ml-1">
                          ({similarSchool.votes} votes)
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {similarSchool.location}
                      </p>
                    </div>
                  </div>
                ))}
                {similarSchools.length === 0 && (
                  <div className="text-center py-4 bg-gray-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mx-auto text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                      No similar schools found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
