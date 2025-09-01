"use client";
import React, { useState, useEffect } from "react";

export default function FactCarousel() {
  const facts = [
    {
      top: "Did you know?",
      middle: "An average of 8 kids compete",
      bottom: "for each Nursery seat.",
    },
    {
      top: "Did you know?",
      middle: "90% of parents miss deadlines",
      bottom: "while applying to schools.",
    },
    {
      top: "Did you know?",
      middle: "Top schools receive 1000+ forms",
      bottom: "for less than 100 seats.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % facts.length);
    }, 4000); // auto-slide every 4 sec
    return () => clearInterval(timer);
  }, [facts.length]);

  return (
    <section className="bg-[#1978cd] text-white py-10 relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center px-4 relative">
        {/* Faded background middle text */}
        <div className="hidden sm:flex absolute top-[11rem] inset-0 items-center justify-center text-[7.5rem] text-white opacity-10 font-bold pointer-events-none">
          GlobalEduConsulting
        </div>

        {/* Top text */}
        <p className="text-2xl font-semibold opacity-90 text-[#A3C9EB] relative z-10">
          {facts[current].top}
        </p>

        {/* Middle text (foreground) */}
        <h2 className="text-lg sm:text-3xl font-bold my-4 relative z-10">
          {facts[current].middle}
        </h2>

        {/* Bottom text */}
        <p className="text-base opacity-90 relative z-10">
          {facts[current].bottom}
        </p>

        {/* Dots navigation */}
        <div className="flex justify-center mt-6 gap-2 relative z-10">
          {facts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition ${
                current === index ? "bg-black" : "bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
