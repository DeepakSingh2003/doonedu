"use client";
import React, { useState } from "react";
import CallBackPopup from "./CallBackPopup";

export default function FactCarousel() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      <section className="bg-[#1978cd] text-white py-10 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center px-4 relative">
          {/* Faded background middle text */}
          <div className="hidden sm:flex absolute top-[11rem] inset-0 items-center justify-center text-[7.5rem] text-white opacity-10 font-bold pointer-events-none">
            GlobalEduConsulting
          </div>

          {/* Main content */}
          <p className="text-2xl font-semibold opacity-90 text-[#A3C9EB] relative z-10 mb-4">
            Confused about the Boarding School?
          </p>

          {/* Middle text */}
          <h2 className="text-lg sm:text-3xl font-bold my-4 relative z-10">
            Let us help you out.
          </h2>

          {/* Bottom text */}
          <p className="text-base opacity-90 relative z-10 mb-8">
            Just click on the button below and get all your queries sorted.
          </p>

          {/* Request Call Back Button */}
          <button 
            onClick={openForm}
            className="bg-white text-[#1978cd] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 relative z-10"
          >
            Request Call Back
          </button>
        </div>
      </section>

      {/* Render the callback form popup when isFormOpen is true */}
      {isFormOpen && <CallBackPopup onClose={closeForm} />}
    </>
  );
}