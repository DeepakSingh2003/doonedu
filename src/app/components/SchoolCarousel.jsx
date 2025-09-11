"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { FaSchool, FaMapMarkerAlt, FaCertificate } from "react-icons/fa";
import { slugify } from "../utils/slugify";

export default function SchoolCarousel() {
  const carouselRef = useRef(null);
  const [schools, setSchools] = useState([]);

  // Fetch featured schools from API
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("https://www.doonedu.com/?api_call=true");
        const data = await res.json();
        if (data.response.featured_schools) {
          console.log("Fetched schools:", data);
          setSchools(data.response.featured_schools);
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };
    fetchSchools();
  }, []);

  // Manual scroll function
  const scroll = (direction) => {
    if (carouselRef.current) {
      const cardWidth =
        carouselRef.current.querySelector("div").offsetWidth + 24;
      carouselRef.current.scrollBy({
        left: direction * cardWidth,
        behavior: "smooth",
      });
    }
  };

  // Auto scroll forward
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current && schools.length > 0) {
        const cardWidth =
          carouselRef.current.querySelector("div").offsetWidth + 24;
        if (
          carouselRef.current.scrollLeft + cardWidth * 3 >=
          carouselRef.current.scrollWidth
        ) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [schools]);

  return (
    <section className="pt-10 px-4 mx-auto max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-[22px] font-medium sm:text-[28px]">
          Featured Schools of India
        </h1>
      </div>

      <div className="relative">
        {/* Prev Button */}
        <button
          aria-label="carousel-previous"
          className="absolute left-0 md:left-[-20px] top-1/2 -translate-y-1/2 z-30 flex w-7 h-7 md:w-10 md:h-10 items-center justify-center rounded-full bg-gray-300 text-black shadow-lg cursor-pointer"
          onClick={() => scroll(-1)}
        >
          &#8249;
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-4 md:gap-6 overflow-x-scroll hide-scrollbar scroll-smooth px-[40px] md:px-[60px]"
        >
          {schools.length > 0 ? (
            schools.map((school) => (
              <div
                key={school.id}
                className="flex-none w-[95%] sm:w-[250px] md:w-[320px] bg-white shadow-lg rounded-2xl overflow-hidden transition hover:shadow-xl snap-start mb-7"
              >
                <div className="h-[140px] md:h-[160px]">
                  <img
                    src={
                      school.thumbnail && school.thumbnail !== ""
                        ? school.thumbnail
                        : "https://via.placeholder.com/320x160?text=No+Image"
                    }
                    alt={school.school_title}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="p-3 flex flex-col gap-2">
                  <h2 className="text-sm font-semibold flex items-center gap-2">
                    <FaSchool className="text-blue-600" />
                    {school.school_title}
                  </h2>
                  <p className="text-xs text-gray-600 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-600" />
                    {school.city_title || "Location not available"}
                  </p>
                  <p className="text-xs flex items-center gap-2">
                    <FaCertificate className="text-blue-600" />
                    <span className="font-medium">Affiliated To: </span>
                    {school.school_board || "N/A"}
                  </p>
                </div>

                <div className="flex justify-center mb-3">
                  <Link href={`/${school.seo_url}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-md px-4 py-2 cursor-pointer">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full text-gray-500">
              Loading schools...
            </p>
          )}
        </div>

        {/* Next Button */}
        <button
          aria-label="carousel-next"
          className="absolute right-0 md:right-[-20px] top-1/2 -translate-y-1/2 z-30 flex w-7 h-7 md:w-10 md:h-10 sm:w-9 sm:h-9 items-center justify-center rounded-full bg-gray-300 text-black shadow-lg cursor-pointer"
          onClick={() => scroll(1)}
        >
          &#8250;
        </button>
      </div>
    </section>
  );
}
