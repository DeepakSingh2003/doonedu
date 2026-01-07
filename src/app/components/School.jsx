"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  FaPlayCircle,
  FaCheckCircle,
  FaCrown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Phone, Heart } from "lucide-react";
import { useModal } from "../contexts/ModalContext";
import { useWishlist } from "../contexts/WishlistContext";
import ApplyModal from "../components/ApplyModal";
import EnquireModal from "../components/EnquireModal";

export default function SchoolProfile({ school, seo }) {
  // Add this at the top of your component to detect preview mode
  const searchParams = useSearchParams();
  const isPreviewMode = searchParams.get("preview") !== null;

  // Check if school is a partner (partner: "2")
  const isPartnerSchool = school?.school?.partner === "2";
  // Default contact number for non-partner schools
  const defaultContactNumber = "9634333174";

  const { slug } = useParams();
  const router = useRouter();
  const { openModal } = useModal();
  const { wishlist, addToWishlist, removeFromWishlist, isWishlisted } =
    useWishlist();

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
  const [parsedFaqs, setParsedFaqs] = useState([]);
  const [parsedAwards, setParsedAwards] = useState([]);
  const [parsedHighlights, setParsedHighlights] = useState("");
  const [parsedFeeStructure, setParsedFeeStructure] = useState("");

  // Mobile gallery slider state
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const autoPlayRef = useRef(null);

  // Set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper: Normalize title for comparison
  const normalizeTitle = (title = "", schoolTitle = "") => {
    if (!title) return "";
    return title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s]/g, "")
      .trim();
  };

  // Helper: Check if title matches any pattern
  const matchSectionTitle = (title = "", patterns = [], schoolTitle = "") => {
    const normalized = normalizeTitle(title, schoolTitle);
    const normalizedSchool = normalizeTitle(schoolTitle);

    return patterns.some((pattern) => {
      const normalizedPattern = normalizeTitle(pattern, schoolTitle).replace(
        "{school}",
        normalizedSchool
      );
      return normalized.includes(normalizedPattern);
    });
  };

  // Parse FAQs, Awards, Highlights, and Fee Structure with multiple title variations
  useEffect(() => {
    if (seo.seo_html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(seo.seo_html, "text/html");
      const title = doc.querySelector("title")?.textContent;

      if (title) {
        document.title = title;
      }

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

    const schoolTitle = school?.school?.school_title || "";
    const additionalInfo = school?.school_additional_information || [];
    const admissionInfo = school?.school_admission || [];

    // === FAQ Section ===
    const faqPatterns = [
      "frequently asked questions",
      `${schoolTitle} frequently asked questions`.toLowerCase(),
    ];
    const faqInfo = additionalInfo.find((info) =>
      matchSectionTitle(info?.title, faqPatterns, schoolTitle)
    );

    if (faqInfo?.description) {
      const decodedHtml = decodeURIComponent(
        faqInfo.description.replace(/\+/g, " ")
      );
      const parser = new DOMParser();
      const doc = parser.parseFromString(decodedHtml, "text/html");
      const faqItems = doc.querySelectorAll(".faq-item");

      const faqs = Array.from(faqItems).map((item) => {
        const questionElement = item.querySelector(".faq-question");
        const answerElement = item.querySelector(".faq-answer");
        return {
          question:
            questionElement?.textContent?.trim() || "No question available",
          answer: answerElement?.textContent?.trim() || "No answer available",
        };
      });
      setParsedFaqs(faqs);
    } else {
      setParsedFaqs([]);
    }

    // === Awards Section ===
    const awardsPatterns = [
      "awards and recognition",
      "Awards & Recognition",
      "awards and recognitions",
      `${schoolTitle} awards and recognition`.toLowerCase(),
    ];
    const awardsInfo = additionalInfo.find((info) =>
      matchSectionTitle(info?.title, awardsPatterns, schoolTitle)
    );

    if (awardsInfo?.description) {
      const decodedHtml = decodeURIComponent(
        awardsInfo.description.replace(/\+/g, " ")
      );
      const parser = new DOMParser();
      const doc = parser.parseFromString(decodedHtml, "text/html");
      const awardRows = doc.querySelectorAll("table tbody tr");

      const awards = Array.from(awardRows).map((row) => {
        const cells = row.querySelectorAll("td");
        return {
          category: cells[0]?.textContent?.trim() || "No category",
          details: cells[1]?.innerHTML?.trim() || "No details",
        };
      });
      setParsedAwards(awards);
    } else {
      setParsedAwards([]);
    }

    // === Highlights & Facilities Section ===
    const highlightsPatterns = [
      "school highlights and facilities",
      `${schoolTitle} highlights and facilities`.toLowerCase(),
      "additional highlights",
    ];
    const highlightsInfo = additionalInfo.find((info) =>
      matchSectionTitle(info?.title, highlightsPatterns, schoolTitle)
    );

    if (highlightsInfo?.description) {
      const decodedHtml = decodeURIComponent(
        highlightsInfo.description.replace(/\+/g, " ")
      );
      setParsedHighlights(decodedHtml);
    } else {
      setParsedHighlights("");
    }

    // === Fee Structure Section (check both school_additional_information and school_admission) ===
    const feePatterns = [
      "fee structure",
      `${schoolTitle} fee structure`.toLowerCase(),
    ];

    // First check in school_additional_information
    let feeInfo = additionalInfo.find((info) =>
      matchSectionTitle(info?.title, feePatterns, schoolTitle)
    );

    // If not found in additional information, check in school_admission
    if (!feeInfo) {
      feeInfo = admissionInfo.find((info) =>
        matchSectionTitle(info?.title, feePatterns, schoolTitle)
      );
    }

    if (feeInfo?.description) {
      const decodedHtml = decodeURIComponent(
        feeInfo.description.replace(/\+/g, " ")
      );
      setParsedFeeStructure(decodedHtml);
    } else {
      setParsedFeeStructure("");
    }
  }, [school, seo]);

  const transformedGallery = (school?.gallery || []).map((item) => ({
    id: item?.id || Date.now(),
    url: item?.image
      ? `${process.env.NEXT_PUBLIC_GALLERY_URL}/${
          item?.school_id || school?.school?.id || "unknown"
        }/gallery/${item.image}`
      : "/placeholder.jpg",
    thumbnailUrl: item?.image
      ? `${process.env.NEXT_PUBLIC_GALLERY_URL}/${
          item?.school_id || school?.school?.id || "unknown"
        }/gallery/${item.image}`
      : "/placeholder.jpg",
    caption: item?.title || item?.alt || "Gallery Image",
    type: "image",
  }));

  // Autoplay effect for mobile gallery
  useEffect(() => {
    if (transformedGallery.length > 1 && isClient) {
      autoPlayRef.current = setInterval(() => {
        setCurrentMobileSlide((prev) =>
          prev === transformedGallery.length - 1 ? 0 : prev + 1
        );
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [transformedGallery.length, isClient]);

  // Reset autoplay timer when user interacts with slider
  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    if (isClient && transformedGallery.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentMobileSlide((prev) =>
          prev === transformedGallery.length - 1 ? 0 : prev + 1
        );
      }, 3000);
    }
  };

  // Mobile gallery slider navigation
  const nextMobileSlide = () => {
    setCurrentMobileSlide((prev) =>
      prev === transformedGallery.length - 1 ? 0 : prev + 1
    );
    resetAutoPlay();
  };

  const prevMobileSlide = () => {
    setCurrentMobileSlide((prev) =>
      prev === 0 ? transformedGallery.length - 1 : prev - 1
    );
    resetAutoPlay();
  };

  // Handle Request Call Back for partner schools
  const handleRequestCallBack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPreviewMode) return; // Don't open modal in preview mode
    openModal(
      <EnquireModal
        schoolId={school?.school?.id || "unknown"}
        schoolName={school?.school?.school_title || "Unknown School"}
      />
    );
  };

  const handleCallNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPreviewMode) return; // Don't call in preview mode
    // Use school phone for partner schools, default number for non-partner schools
    const phoneNumber = isPartnerSchool
      ? school?.school?.phone
      : defaultContactNumber;
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  const handleApplyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPreviewMode) return; // Don't open modal in preview mode
    openModal(
      <ApplyModal
        schoolId={school?.school?.id || "unknown"}
        schoolName={school?.school?.school_title || "Unknown School"}
      />
    );
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (isPreviewMode) return; // Don't submit in preview mode
    console.log("Review submitted:", reviewForm);
    setReviewForm({ rating: 0, review: "", parentName: "" });
  };

  const toggleFaq = (index, e) => {
    e.stopPropagation();
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const filteredGallery = transformedGallery;

  const similarSchools = (school?.similar_schools || []).map((s) => ({
    id: s?.id || Date.now(),
    name: s?.school_title || "Unknown School",
    image: s?.thumbnail
      ? `${process.env.NEXT_PUBLIC_GALLERY_URL}/${s.id}/${s.thumbnail}`
      : "/placeholder.jpg",
    rating: s?.rating || 4.5,
    votes: s?.view_count || 0,
    location: s?.address || s?.location || "Location not specified",
    url: s?.url || "#",
    isPartner: s?.partner === "2",
  }));

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

  const handleSimilarSchoolClick = (schoolObj, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPreviewMode) return; // Don't navigate in preview mode
    router.push(`/${schoolObj.url}`);
  };

  const getGalleryImageUrl = (index) => {
    return filteredGallery[index]?.url || "/placeholder.jpg";
  };

  const GenderIcon = () => {
    switch (school?.school?.classification?.title?.toLowerCase()) {
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

  const getEmbeddedVideoUrl = (url) => {
    if (!url) return null;
    try {
      const parsedUrl = new URL(url);
      if (
        parsedUrl.hostname === "youtu.be" &&
        parsedUrl.pathname.startsWith("/embeded/")
      ) {
        const videoId = parsedUrl.pathname.split("/").pop();
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (parsedUrl.hostname === "youtu.be") {
        const videoId = parsedUrl.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (
        parsedUrl.hostname.includes("youtube.com") &&
        parsedUrl.pathname === "/watch"
      ) {
        const videoId = parsedUrl.searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (parsedUrl.hostname.includes("vimeo.com")) {
        const videoId = parsedUrl.pathname.split("/").pop();
        return `https://player.vimeo.com/video/${videoId}`;
      }
      return url;
    } catch (e) {
      console.error("Invalid video URL:", url);
      return null;
    }
  };

  const videoUrl = getEmbeddedVideoUrl(school?.school?.featured_video);

  // Safe HTML rendering function to prevent hydration mismatches
  const renderSafeHTML = (html, fallback = "No information available") => {
    if (!isClient) {
      return <div dangerouslySetInnerHTML={{ __html: fallback }} />;
    }
    return <div dangerouslySetInnerHTML={{ __html: html || fallback }} />;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Preview Mode Header - Show school name at top when in preview mode */}
      {isPreviewMode && (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 py-4 px-6 text-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">
            {school?.school?.school_title || "Unknown School"} |{" "}
            {school?.city_title || "Unknown City"}
          </h1>
        </div>
      )}

      {/* Gallery Modal - Now works in preview mode too */}
      {showGalleryModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-[60] flex flex-col items-center justify-center p-4"
          onClick={closeGalleryModal}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeGalleryModal();
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl sm:text-3xl z-10"
          >
            X
          </button>
          <div className="absolute top-4 left-4 text-white text-sm sm:text-base z-10">
            {currentGalleryIndex + 1} / {filteredGallery.length}
          </div>
          <div
            className="flex-1 flex items-center justify-center w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => navigateGallery("prev", e)}
              className="absolute left-4 sm:left-6 bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60 transition z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
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
            <img
              src={
                filteredGallery[currentGalleryIndex]?.url || "/placeholder.jpg"
              }
              alt={
                filteredGallery[currentGalleryIndex]?.caption || "Gallery Image"
              }
              className="max-h-[75vh] w-auto object-contain rounded-lg"
            />
            <button
              onClick={(e) => navigateGallery("next", e)}
              className="absolute right-4 sm:right-6 bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60 transition z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
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
          <div className="text-center text-white text-sm sm:text-base mt-3">
            {filteredGallery[currentGalleryIndex]?.caption ||
              "No caption available"}
          </div>
          <div
            className="mt-3 flex gap-2 overflow-x-auto px-4 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredGallery.map((item, index) => (
              <div
                key={item.id}
                className={`w-20 h-16 flex-shrink-0 cursor-pointer border-2 rounded overflow-hidden ${
                  index === currentGalleryIndex
                    ? "border-red-500"
                    : "border-transparent"
                }`}
                onClick={() => setCurrentGalleryIndex(index)}
              >
                <img
                  src={item.thumbnailUrl}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className={`relative px-4 sm:px-20 ${
          isPreviewMode ? "pt-24" : "mt-2 sm:mt-14"
        }`}
      >
        {/* Desktop Gallery View */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 h-auto">
          <div className="col-span-1 md:col-span-2 h-full">
            <img
              src={
                school?.school?.thumbnail
                  ? `${process.env.NEXT_PUBLIC_GALLERY_URL}/${
                      school?.school?.id || "unknown"
                    }/${school?.school?.thumbnail}`
                  : "/placeholder.jpg"
              }
              alt={school?.name || "School Image"}
              className="w-full object-cover rounded-lg h-[200px] sm:h-[400px]"
            />
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            <img
              src={getGalleryImageUrl(1)}
              alt="Gallery 1"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src={getGalleryImageUrl(2)}
              alt="Gallery 2"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Mobile Gallery Slider with Autoplay - Hidden arrows and dots */}
        <div className="md:hidden relative">
          <div className="relative overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentMobileSlide * 100}%)` }}
            >
              {transformedGallery.map((item, index) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View Gallery button - Now works in preview mode too */}
        <div
          className={`absolute ${
            isPreviewMode ? "top-[13rem]" : "top-[13rem] sm:top-[22rem]"
          } right-8 sm:right-20 flex gap-2`}
        >
          <button
            onClick={() => openGalleryModal()}
            className="text-white text-xs sm:text-sm bg-purple-600/80 px-3 py-2 rounded-full hover:bg-purple-700 flex items-center gap-1 cursor-pointer"
          >
            <FaImages className="h-4 w-4" />
            View Gallery
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div
            className={`w-full ${!isPreviewMode ? "lg:w-2/3" : "lg:w-full"}`}
          >
            {/* Main School Card */}
            <div
              className={`
              rounded-xl shadow-lg p-6 mb-6 border relative
              ${
                isPartnerSchool && !isPreviewMode
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-blue-200"
                  : "bg-white border-gray-100"
              }
            `}
            >
              {isPartnerSchool && !isPreviewMode && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-10">
                  <FaCrown className="h-4 w-4" />
                  <span className="text-xs font-bold">PARTNER SCHOOL</span>
                </div>
              )}

              {/* Hide school name in preview mode since we show it in header */}
              {!isPreviewMode && (
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                  {isPartnerSchool && !isPreviewMode && (
                    <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2" />
                  )}
                  {school?.isVerified && !isPartnerSchool && !isPreviewMode && (
                    <svg
                      className="w-8 h-8 sm:w-5 sm:h-5 text-green-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  )}
                  {school?.school?.school_title || "Unknown School"} |{" "}
                  {school?.city_title || "Unknown City"}
                </h2>
              )}

              <p className="text-gray-600 mt-1 flex items-center text-sm sm:text-base">
                <FaMapMarkerAlt
                  className={`h-4 w-4 mr-4 ${
                    isPartnerSchool && !isPreviewMode ? "text-blue-600" : ""
                  }`}
                />
                {school?.school?.address || "Address not specified"}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div
                  className={`
                  flex items-center px-3 py-1 rounded-full text-sm sm:text-base
                  ${
                    isPartnerSchool && !isPreviewMode
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-700 bg-green-50"
                  }
                `}
                >
                  <FaHome
                    className={`h-4 w-4 mr-1 ${
                      isPartnerSchool && !isPreviewMode
                        ? "text-blue-600"
                        : "text-green-500"
                    }`}
                  />
                  <span className="font-medium">Boarding</span> - ₹
                  {school?.school?.average_fee || "Not specified"} / annum
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <span
                  className={`
                  px-3 py-1 rounded-full text-xs sm:text-sm flex items-center
                  ${
                    isPartnerSchool && !isPreviewMode
                      ? "bg-blue-200 text-blue-800"
                      : "bg-blue-100 text-blue-800"
                  }
                `}
                >
                  <FaGraduationCap className="h-4 w-4 mr-1" />
                  {school?.school?.board?.title || "Not specified"}
                </span>
                <span
                  className={`
                  px-3 py-1 rounded-full text-xs sm:text-sm flex items-center
                  ${
                    isPartnerSchool && !isPreviewMode
                      ? "bg-pink-200 text-pink-800"
                      : "bg-pink-100 text-pink-800"
                  }
                `}
                >
                  <GenderIcon />
                  {school?.school?.classification?.title || "Not specified"}
                </span>
                {/* Only show action buttons if not in preview mode */}
                {!isPreviewMode && (
                  <div className="ml-auto flex gap-2 mt-2 sm:mt-0">
                    {isPartnerSchool ? (
                      <button
                        onClick={handleRequestCallBack}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs sm:text-sm flex items-center cursor-pointer"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Request a Call Back
                      </button>
                    ) : (
                      <button
                        onClick={handleCallNow}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-xs sm:text-sm flex items-center cursor-pointer"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call Now
                      </button>
                    )}
                    <button
                      onClick={handleApplyNow}
                      className={`
                        text-white px-4 py-2 rounded-full text-xs sm:text-sm flex items-center cursor-pointer
                        ${
                          isPartnerSchool
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "bg-green-600 hover:bg-green-700"
                        }
                      `}
                    >
                      <FaFileAlt className="h-4 w-4 mr-1" />
                      Enquire Now
                    </button>
                  </div>
                )}
              </div>

              {isPartnerSchool && !isPreviewMode && (
                <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-800 text-sm font-medium">
                    <FaCheckCircle className="h-4 w-4" />
                    <span>
                      Partner Benefits: Priority Admission • Special Discounts •
                      Dedicated Support
                    </span>
                  </div>
                </div>
              )}
            </div>

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
                    activeTab === "facilities"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("facilities")}
                >
                  <FaBuilding className="h-4 w-4 mr-1" />
                  FACILITIES
                </button>
                <button
                  className={`px-4 py-3 font-medium text-xs sm:text-sm flex items-center cursor-pointer ${
                    activeTab === "awards"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("awards")}
                >
                  <FaCertificate className="h-4 w-4 mr-1" />
                  AWARDS
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

              <div className="p-6">
                {activeTab === "summary" && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                      <FaInfoCircle className="h-5 w-5 mr-2 text-blue-700" />
                      About School
                    </h3>
                    <div className="text-gray-700 text-sm sm:text-base">
                      {renderSafeHTML(
                        school?.school?.about || school?.comment,
                        "No information available"
                      )}
                    </div>

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
                            {school?.school?.board?.title || "Not specified"}
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
                            Boarding School
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
                            {school?.classes?.length > 0
                              ? `${school.classes[0]} to ${
                                  school.classes[school.classes.length - 1]
                                } Class`
                              : "Not specified"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaCalendarAlt className="h-5 w-5 mr-2 mt-1 text-blue-700" />
                        <div>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            Establishment Year
                          </p>
                          <p className="font-medium text-sm sm:text-base">
                            {school?.school?.founding_year || "Not specified"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaChalkboardTeacher className="h-5 w-5 mr-2 mt-1 text-blue-700" />
                        <div>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            Student Teacher Ratio
                          </p>
                          <p className="font-medium text-sm sm:text-base">
                            {school?.key_information?.find(
                              (info) =>
                                info?.attribute?.title ===
                                "Student Teacher Ratio"
                            )?.value || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "fees" && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                      <FaMoneyBill className="h-5 w-5 mr-2 text-blue-700" />
                      Fee Structure
                    </h3>
                    {parsedFeeStructure ? (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 overflow-x-auto">
                        {renderSafeHTML(parsedFeeStructure)}
                      </div>
                    ) : school?.school_admission?.some(
                        (admission) =>
                          admission?.title === "Fee Structure" &&
                          Array.isArray(admission?.attribute) &&
                          admission.attribute.length > 0
                      ) ? (
                      school.school_admission.map((admission) =>
                        admission?.title === "Fee Structure" ? (
                          <div
                            key={admission.id}
                            className="bg-blue-50 p-4 rounded-lg border border-blue-100"
                          >
                            <table className="w-full text-sm text-left text-gray-700">
                              <tbody>
                                {admission.attribute.map((attr) => (
                                  <tr
                                    key={attr.id}
                                    className="border-b last:border-b-0"
                                  >
                                    <td className="py-2 pr-4 font-medium">
                                      {attr.title}
                                    </td>
                                    <td className="py-2">{attr.value}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : null
                      )
                    ) : (
                      <div className="bg-gray-50 text-center py-6 rounded-lg border border-gray-100">
                        <p className="text-gray-500 text-sm sm:text-base">
                          Fee details will be available soon.
                        </p>
                      </div>
                    )}
                    <p className="text-gray-500 text-xs sm:text-sm mt-4">
                      *The above listed fees are provided by the school. Current
                      fees may vary depending on recent updates.
                    </p>
                  </div>
                )}

                {activeTab === "facilities" && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                      School Facilities
                    </h3>
                    {parsedHighlights ? (
                      <div className="p-4 rounded-lg overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_th]:bg-blue-100 [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:p-2 [&_td]:align-top [&_td]:text-sm">
                        {renderSafeHTML(
                          parsedHighlights
                            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
                            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
                            .replace(/<\/?(html|head|body)[^>]*>/gi, ""),
                          "Facility details will be available soon."
                        )}
                      </div>
                    ) : (
                      <div className="bg-gray-50 text-center py-6 rounded-lg border border-gray-100">
                        <p className="text-gray-500 text-sm sm:text-base">
                          Facility details will be available soon.
                        </p>
                      </div>
                    )}
                    <p className="text-gray-500 text-xs sm:text-sm mt-4">
                      *Facilities listed are provided by the school. May vary
                      depending on availability.
                    </p>
                  </div>
                )}

                {activeTab === "awards" && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                      <FaCertificate className="h-5 w-5 mr-2 text-yellow-500" />
                      Awards & Recognition
                    </h3>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                      {parsedAwards.length > 0 ? (
                        <div className="space-y-4">
                          {parsedAwards.map((award, index) => (
                            <div key={index} className="border-b pb-3">
                              <h4 className="text-sm sm:text-base font-semibold text-gray-800">
                                {award.category}
                              </h4>
                              <div
                                className="text-gray-700 text-sm sm:text-base mt-2"
                                dangerouslySetInnerHTML={{
                                  __html: award.details,
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 bg-gray-50 rounded-lg">
                          <FaCertificate className="h-8 w-8 mx-auto text-gray-400" />
                          <p className="text-gray-500 mt-2 text-sm sm:text-base">
                            No awards information available
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm mt-4">
                      *Awards and recognitions listed are provided by the
                      school.
                    </p>
                  </div>
                )}

                {activeTab === "contact" && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-blue-500" />
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      {school?.school?.email && (
                        <p className="flex items-center p-3 bg-blue-50 rounded-lg text-sm sm:text-base">
                          <FaEnvelope className="h-5 w-5 mr-3 text-blue-500" />
                          <span>{school.school.email}</span>
                        </p>
                      )}
                      {isPartnerSchool ? (
                        school?.school?.phone && (
                          <p className="flex items-center p-3 bg-green-50 rounded-lg text-sm sm:text-base">
                            <Phone className="h-5 w-5 mr-3 text-green-500" />
                            <span>{school.school.phone}</span>
                          </p>
                        )
                      ) : (
                        <p className="flex items-center p-3 bg-green-50 rounded-lg text-sm sm:text-base">
                          <Phone className="h-5 w-5 mr-3 text-green-500" />
                          <span>{defaultContactNumber}</span>
                        </p>
                      )}
                      {school?.school?.address && (
                        <p className="flex items-center p-3 bg-purple-50 rounded-lg text-sm sm:text-base">
                          <FaMapMarkerAlt className="h-5 w-5 mr-3 text-purple-500" />
                          <span>{school.school.address}</span>
                        </p>
                      )}
                      {school?.school?.website && (
                        <p className="flex items-center p-3 bg-orange-50 rounded-lg text-sm sm:text-base">
                          <FaGlobe className="h-5 w-5 mr-3 text-orange-500" />
                          <a
                            href={school.school.website}
                            className="text-blue-600 cursor-pointer"
                          >
                            {school.school.website}
                          </a>
                        </p>
                      )}
                      {!school?.school?.email &&
                        !school?.school?.phone &&
                        !school?.school?.address &&
                        !school?.school?.website && (
                          <div className="text-center py-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 text-sm sm:text-base">
                              No contact information available
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Blue Line Partition after About School */}
            <div className="w-full h-1 bg-[#1447E6] rounded-full my-6"></div>

            {/* Co-curricular Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold mb-6 flex items-center">
                <FaFutbol className="h-5 w-5 mr-2 text-blue-500" />
                Co-curricular Activities
              </h3>
              <div className="space-y-6">
                {Array.isArray(school?.activities) &&
                school.activities.filter((activity) => activity?.title).length >
                  0 ? (
                  school.activities
                    .filter((activity) => activity?.title)
                    .map((activity, i) => (
                      <div key={i} className="border-b pb-4 last:border-b-0">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-sm sm:text-base">
                          {activity.title.includes("Outdoor") ? (
                            <FaFutbol className="h-5 w-5 mr-2 text-green-600" />
                          ) : (
                            <FaGamepad className="h-5 w-5 mr-2 text-purple-600" />
                          )}
                          {activity.title}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(activity.attributes) &&
                          activity.attributes.filter((attr) => attr?.title)
                            .length > 0 ? (
                            activity.attributes
                              .filter((attr) => attr?.title)
                              .map((attr) => (
                                <span
                                  key={attr.id}
                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm border transition-transform duration-200 hover:scale-105 cursor-pointer ${
                                    activity.title.includes("Outdoor")
                                      ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                                      : "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200"
                                  }`}
                                >
                                  {attr.image ? (
                                    <img
                                      src={`${process.env.NEXT_PUBLIC_CO_CURRICULAR_ICONS_URL}/${attr.id}/${attr.image}`}
                                      alt={attr.title}
                                      className="w-5 h-5 rounded-full object-cover"
                                      onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                      }}
                                    />
                                  ) : null}
                                  <span className="inline-block">
                                    {attr.title}
                                  </span>
                                </span>
                              ))
                          ) : (
                            <span className="text-gray-500 text-sm sm:text-base italic">
                              No activities specified
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-4 bg-gray-50 rounded-lg">
                    <FaGamepad className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                      Co-curricular activities will be available soon.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Blue Line Partition after Co-curricular Activities */}
            <div className="w-full h-1 bg-[#1447E6] rounded-full my-6"></div>

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
                    {school?.school_travel_information?.find(
                      (item) => item?.base_title === "By Air"
                    )?.title || "Not specified"}{" "}
                    (
                    {school?.school_travel_information?.find(
                      (item) => item?.base_title === "By Air"
                    )?.value || "Not specified"}
                    )
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center text-sm sm:text-base">
                    <FaTrain className="h-4 w-4 mr-1 text-green-500" />
                    Nearest Railway Station
                  </h4>
                  <p className="text-sm text-gray-700">
                    {school?.school_travel_information?.find(
                      (item) => item?.base_title === "By Train"
                    )?.title || "Not specified"}{" "}
                    (
                    {school?.school_travel_information?.find(
                      (item) => item?.base_title === "By Train"
                    )?.value || "Not specified"}
                    )
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center text-sm sm:text-base">
                    <FaBus className="h-4 w-4 mr-1 text-purple-500" />
                    Nearest Bus Stand
                  </h4>
                  <p className="text-sm text-gray-700">
                    {school?.school_travel_information?.find(
                      (item) => item?.base_title === "By Road"
                    )?.title || "Not specified"}{" "}
                    (
                    {school?.school_travel_information?.find(
                      (item) => item?.base_title === "By Road"
                    )?.value || "Not specified"}
                    )
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center text-sm sm:text-base">
                    <FaUniversity className="h-4 w-4 mr-1 text-red-500" />
                    Nearest Bank
                  </h4>
                  <p className="text-sm text-gray-700">
                    {school?.school_travel_information?.find(
                      (item) => item?.base_title === "By Bank"
                    )?.title || "Not specified"}{" "}
                    (
                    {school?.school_travel_information?.find(
                      (item) => item?.base_title === "By Bank"
                    )?.value || "Not specified"}
                    )
                  </p>
                </div>
              </div>
            </div>

            {/* Blue Line Partition after Travel Information */}
            <div className="w-full h-1 bg-[#1447E6] rounded-full my-6"></div>

            {/* Featured Video */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-gray-800 flex items-center">
                <FaPlayCircle className="h-5 w-5 mr-2 text-red-500" />
                Featured Video
              </h3>
              {videoUrl ? (
                <div className="bg-black rounded-lg overflow-hidden aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={videoUrl}
                    title={`Featured Video - ${
                      school?.school?.school_title || "Unknown School"
                    }`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="bg-gray-50 text-center py-6 rounded-lg border border-gray-100">
                  <p className="text-gray-500 text-sm sm:text-base">
                    No featured video available
                  </p>
                </div>
              )}
              <div className="mt-3 text-center">
                <p className="text-gray-600 text-sm">
                  Take a virtual tour of our campus and facilities
                </p>
              </div>
            </div>

            {/* NEW: Fee Structure Card */}
            {parsedFeeStructure && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
                <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                  <FaMoneyBill className="h-5 w-5 mr-2 text-blue-700" />
                  Fee Structure
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 overflow-x-auto">
                  {renderSafeHTML(parsedFeeStructure)}
                </div>
                <p className="text-gray-500 text-xs sm:text-sm mt-4">
                  *The above listed fees are provided by the school. Current
                  fees may vary depending on recent updates.
                </p>
              </div>
            )}

            {/* NEW: Awards & Recognition Card */}
            {parsedAwards.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
                <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                  <FaCertificate className="h-5 w-5 mr-2 text-yellow-500" />
                  Awards & Recognition
                </h3>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <div className="space-y-4">
                    {parsedAwards.map((award, index) => (
                      <div key={index} className="border-b pb-3">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-800">
                          {award.category}
                        </h4>
                        <div
                          className="text-gray-700 text-sm sm:text-base mt-2"
                          dangerouslySetInnerHTML={{
                            __html: award.details,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm mt-4">
                  *Awards and recognitions listed are provided by the school.
                </p>
              </div>
            )}

            {/* NEW: School Highlights & Facilities Card */}
            {parsedHighlights && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
                <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                  School Highlights & Facilities
                </h3>
                <div className="p-4 rounded-lg overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_th]:bg-blue-100 [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:p-2 [&_td]:align-top [&_td]:text-sm">
                  {renderSafeHTML(
                    parsedHighlights
                      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
                      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
                      .replace(/<\/?(html|head|body)[^>]*>/gi, ""),
                    "Facility details will be available soon."
                  )}
                </div>
                <p className="text-gray-500 text-xs sm:text-sm mt-4">
                  *Facilities listed are provided by the school. May vary
                  depending on availability.
                </p>
              </div>
            )}

            {/* FAQs */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-gray-800 flex items-center">
                <FaQuestionCircle className="h-5 w-5 mr-2 text-blue-500" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {Array.isArray(parsedFaqs) && parsedFaqs.length > 0 ? (
                  parsedFaqs.map((faq, index) => (
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
                  ))
                ) : (
                  <div className="text-center py-4 bg-gray-50 rounded-lg">
                    <FaQuestionCircle className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                      No FAQs available
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Blue Line Partition after Frequently Asked Questions */}
            <div className="w-full h-1 bg-[#1447E6] rounded-full my-6"></div>

            {/* Reviews - Only show if not in preview mode */}
            {!isPreviewMode && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
                <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center">
                  <FaComment className="h-5 w-5 mr-2 text-blue-500" />
                  Reviews
                </h3>
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
                          <FaHandsHelping
                            className="text-green-500"
                            size={24}
                          />
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
                          setReviewForm({
                            ...reviewForm,
                            review: e.target.value,
                          })
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
              </div>
            )}
          </div>

          {/* Sidebar - Only show if not in preview mode */}
          {!isPreviewMode && (
            <div className="w-full lg:w-1/3">
              {/* Counselling */}
              <div
                className={`
                rounded-xl shadow-lg p-6 mb-6 border
                ${
                  isPartnerSchool
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
                    : "bg-white border-gray-100"
                }
              `}
              >
                <h3 className="text-base sm:text-lg font-bold mb-4 text-center text-gray-800 flex items-center justify-center">
                  <FaComment className="h-5 w-5 mr-2 text-blue-500" />
                  {isPartnerSchool
                    ? "PARTNER SCHOOL COUNSELLING"
                    : "FREE Counselling"}
                </h3>
                {isPartnerSchool && (
                  <div className="mb-4 p-2 bg-blue-100 rounded-lg text-center">
                    <p className="text-blue-800 text-sm font-medium">
                      Priority Support for Partner Schools
                    </p>
                  </div>
                )}
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
                    className={`
                      w-full text-white py-3 rounded-lg font-medium transition-colors text-sm sm:text-base cursor-pointer
                      ${
                        isPartnerSchool
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          : "bg-green-600 hover:bg-green-700"
                      }
                    `}
                  >
                    {isPartnerSchool
                      ? "GET PRIORITY COUNSELLING"
                      : "GET COUNSELLING"}
                  </button>
                </form>
              </div>

              {/* Similar Schools */}
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
                  {similarSchools.length > 0 ? (
                    similarSchools.map((similarSchool) => (
                      <div
                        key={similarSchool.id}
                        className={`
                          flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer border
                          ${
                            similarSchool.isPartner
                              ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 hover:bg-blue-100"
                              : "hover:bg-gray-50 border-gray-100"
                          }
                        `}
                        onClick={(e) =>
                          handleSimilarSchoolClick(similarSchool, e)
                        }
                      >
                        <div className="bg-gray-200 w-16 h-16 rounded flex-shrink-0 relative">
                          <img
                            src={similarSchool.image}
                            alt={similarSchool.name}
                            className="w-full h-full object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.jpg";
                            }}
                          />
                          {similarSchool.isPartner && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                              <FaCheckCircle className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm sm:text-base">
                              {similarSchool.name}
                            </p>
                            {similarSchool.isPartner && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <FaCrown className="h-3 w-3" />
                                Partner
                              </span>
                            )}
                          </div>
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
                              ({similarSchool.votes} views)
                            </span>
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            {similarSchool.location}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
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

              {/* Related Blogs */}
              <div className="bg-white rounded-xl p-6 mb-6 border border-gray-100">
                <h3 className="text-base sm:text-lg font-bold mb-4 text-gray-800 flex items-center">
                  <FaBook className="h-5 w-5 mr-2 text-blue-500" />
                  Related Blog Posts
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {school?.blogs_in_schools &&
                  school.blogs_in_schools.length > 0 ? (
                    school.blogs_in_schools.map((blog) => {
                      const decodedShortDescription = decodeURIComponent(
                        blog.short_description?.replace(/\+/g, " ") ||
                          "No description available"
                      );
                      const formattedDate = blog.created_at
                        ? new Date(blog.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "Date not available";
                      const imageUrl = blog.thumb_image
                        ? `${process.env.NEXT_PUBLIC_BLOG_IMAGES_URL}/${blog.id}/${blog.thumb_image}`
                        : "/placeholder.jpg";

                      return (
                        <div
                          key={blog.id}
                          className="flex flex-col sm:flex-row items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-gray-100"
                          onClick={() =>
                            window.open(`/${blog.url || "#"}`, "_blank")
                          }
                        >
                          <div className="bg-gray-200 w-full sm:w-24 h-24 rounded flex-shrink-0 overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={blog.title || "Blog Image"}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.jpg";
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm sm:text-base line-clamp-2 break-words overflow-hidden text-ellipsis">
                              {blog.title || "Untitled Blog"}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              {formattedDate} • By{" "}
                              {blog.auther_name || "Unknown Author"}
                            </p>
                            <p className="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-2 break-words overflow-hidden text-ellipsis">
                              {decodedShortDescription}
                            </p>
                            <div className="flex items-center mt-2 text-blue-600 text-xs sm:text-sm">
                              Read more
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-4 bg-gray-50 rounded-lg">
                      <FaBook className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="text-gray-500 mt-2 text-sm sm:text-base">
                        No blog posts available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
