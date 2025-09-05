"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { schoolsData } from "../exploreschools/data";

export default function SchoolCarousel() {
  const carouselRef = useRef(null);

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

  // Auto scroll forward only
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
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
  }, []);

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
          className="absolute left-2 md:left-[-20px] top-1/2 -translate-y-1/2 z-30 flex w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-gray-300 text-black shadow-lg cursor-pointer"
          onClick={() => scroll(-1)}
        >
          &#8249;
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-4 md:gap-6 overflow-x-scroll hide-scrollbar scroll-smooth px-[40px] md:px-[60px]"
        >
          {schoolsData.map((school) => (
            <div
              key={school.id}
              className="flex-none w-[80%] sm:w-[250px] md:w-[320px] bg-white shadow-lg rounded-2xl overflow-hidden transition hover:shadow-xl snap-start mb-7"
            >
              <div className="h-[140px] md:h-[160px]">
                <img
                  src={school.image}
                  alt={school.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-3 flex flex-col gap-2">
                <h2 className="text-sm font-semibold">{school.name}</h2>
                <p className="text-xs text-gray-600">{school.location}</p>
                <p className="text-xs">
                  <span className="font-medium">Affiliated To: </span>
                  {school.board}
                </p>
              </div>

              <div className="flex justify-center mb-3">
                <Link href={`/exploreschools/${school.id}`}>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-md px-4 py-2 cursor-pointer">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          aria-label="carousel-next"
          className="absolute right-2 md:right-[-20px] top-1/2 -translate-y-1/2 z-30 flex w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-gray-300 text-black shadow-lg cursor-pointer"
          onClick={() => scroll(1)}
        >
          &#8250;
        </button>
      </div>
    </section>
  );
}
