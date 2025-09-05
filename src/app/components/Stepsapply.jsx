"use client";
import React, { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import LoginModal from "./LoginModal"; // 🔹 import global login modal

export default function StepsSection() {
  const steps = [
    {
      number: "1",
      title: "REGISTER YOURSELF",
      img: "https://ezyschooling.com/_next/image?url=%2Fimages%2Fhomepage%2Fstep-1.webp&w=256&q=80",
      button: "Join Now",
    },
    {
      number: "2",
      title: "CREATE YOUR CHILD'S PROFILE",
      img: "https://ezyschooling.com/_next/image?url=%2Fimages%2Fhomepage%2Fstep-2.webp&w=256&q=80",
      button: "Register Now",
    },
    {
      number: "3",
      title: "ADD SCHOOLS TO CART",
      img: "https://ezyschooling.com/_next/image?url=%2Fimages%2Fhomepage%2Fstep-3.webp&w=256&q=80",
      button: "Register Now",
    },
    {
      number: "4",
      title: "FILL APPLICATION FORM",
      img: "https://ezyschooling.com/_next/image?url=%2Fimages%2Fhomepage%2Fstep-4.webp&w=256&q=80",
      button: "Register Now",
    },
    {
      number: "5",
      title: "TRACK APPLICATIONS",
      img: "https://ezyschooling.com/_next/image?url=%2Fimages%2Fhomepage%2Fstep-5.webp&w=256&q=80",
      button: "Register Now",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // 🔹 same as navbar

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-12 px-6 bg-[#F8FAFB]">
      {/* 🔹 Global Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          How to apply with{" "}
          <span className="text-red-500">Global Edu.Consulting</span>
        </h2>
        <p className="text-gray-600 mb-8">
          Getting Started: Complete these steps to fill form
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        {/* RIGHT SIDE */}
        <div className="w-full">
          {/* ===== Desktop view (cards) ===== */}
          <div className="hidden lg:flex flex-row gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative bg-gradient-to-br from-[#F4FBFE] to-white rounded-xl shadow-md p-4 flex items-center lg:flex-col lg:items-center justify-between text-left lg:text-center border border-gray-100 w-full"
              >
                {/* Number */}
                <span
                  className="absolute left-[-10px] top-1/2 -translate-y-1/2 text-3xl lg:text-4xl font-bold text-white select-none"
                  style={{
                    textShadow:
                      "2px 2px 0 #3B82F6, -2px 2px 0 #3B82F6, 2px -2px 0 #3B82F6, -2px -2px 0 #3B82F6",
                  }}
                >
                  {step.number}
                </span>

                {/* Image */}
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-10 h-10 object-contain mb-0 lg:mb-2 mr-3 lg:mr-0"
                />

                {/* Text + Button */}
                <div className="flex-1 flex flex-col lg:items-center justify-between">
                  <p className="text-sm font-semibold text-gray-800 leading-tight mb-2 lg:text-[10px] text-center">
                    {step.title}
                  </p>
                  <button
                    onClick={() => setIsLoginOpen(true)} // 🔹 open login modal
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md text-xs lg:text-[10px] font-medium hover:bg-blue-700 transition"
                  >
                    {step.button} <MdArrowForward className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ===== Mobile view (accordion) ===== */}
          <div className="lg:hidden flex flex-col gap-3">
            <div className="flex flex-col items-center p-6 ">
              {/* Top Image */}
              <img
                src="https://ezyschooling.com/_next/image?url=%2Fimages%2Fhomepage%2Fstep-5.webp&w=128&q=80"
                alt="Completed Steps"
                className="w-16 h-16 mb-3"
              />

              {/* Title */}
              <h3 className="text-lg  text-gray-900">Completed Steps</h3>

              {/* Subtitle */}
              <p className="text-sm text-gray-600 text-center mt-1">
                It takes only 5 steps to apply
              </p>
            </div>

            {steps.map((step, index) => (
              <div
                key={step.number}
                className="border border-gray-200 rounded-lg bg-white shadow-sm"
              >
                {/* Header */}
                <button
                  className="w-full flex justify-between items-center px-4 py-3 text-left"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-500" />
                    <span className="text-sm font-medium text-gray-800">
                      {step.number}. {step.title}
                    </span>
                  </div>
                  {openIndex === index ? (
                    <IoIosArrowUp className="text-gray-500" />
                  ) : (
                    <IoIosArrowDown className="text-gray-500" />
                  )}
                </button>

                {/* Expanded content */}
                {openIndex === index && (
                  <div className="px-4 pb-4">
                    <button
                      onClick={() => setIsLoginOpen(true)} // 🔹 open login modal
                      className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-700 transition mt-3"
                    >
                      {step.button} <MdArrowForward className="text-xs" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
