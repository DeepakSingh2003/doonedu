"use client";
import React, { useRef, useEffect } from "react";

const schools = [
  {
    name: "Lovely Heritage School",
    location: "Mayur Vihar Phase 2, East Delhi",
    board: "CBSE",
    image:
      "https://images.ezyschooling.com/prod/resize?url=https://d3bat55ebwjhsf.cloudfront.net/schools/cover/11354/user_lovelyheritageschool/IMG-20241116-WA0011_-_Shefali_Gulati.jpg&bucket=prod&height=300",
    link: "#",
  },
  {
    name: "Pragati Public School",
    location: "Dwarka, South West Delhi",
    board: "CBSE",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?fit=crop&w=600&q=80",
    link: "#",
  },
  {
    name: "Richmondd Global School",
    location: "Paschim Vihar, West Delhi",
    board: "CBSE",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?fit=crop&w=600&q=80",
    link: "#",
  },
  {
    name: "Vivekanand International",
    location: "Preet Vihar, East Delhi",
    board: "CBSE",
    image:
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?fit=crop&w=600&q=80",
    link: "#",
  },
  {
    name: "Maxfort School",
    location: "Paschim Vihar, West Delhi",
    board: "CBSE",
    image:
      "https://images.unsplash.com/photo-1580584128409-ec97d2b55a68?fit=crop&w=600&q=80",
    link: "#",
  },
];

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
        <h1 className="text-[22px] font-medium sm:text-[28px">
          Featured Schools of India
        </h1>
      </div>

      <div className="relative">
        {/* Prev Button */}
        <button
          aria-label="carousel-previous"
          className="absolute left-2 md:left-[-20px] top-1/2 -translate-y-1/2 z-30 flex w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-gray-300 text-black shadow-lg"
          onClick={() => scroll(-1)}
        >
          &#8249;
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-4 md:gap-6 overflow-x-scroll hide-scrollbar scroll-smooth px-[40px] md:px-[60px]"
        >
          {schools.map((school, idx) => (
            <div
              key={idx}
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
                <a
                  href={school.link}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-md px-4 py-2"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          aria-label="carousel-next"
          className="absolute right-2 md:right-[-20px] top-1/2 -translate-y-1/2 z-30 flex w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-gray-300 text-black shadow-lg"
          onClick={() => scroll(1)}
        >
          &#8250;
        </button>
      </div>
    </section>
  );
}
