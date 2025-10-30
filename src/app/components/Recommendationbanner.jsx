"use client";
import { FaUserTie, FaMapMarkedAlt, FaSchool, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

export default function DiscoverSchools() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Main Section */}
      <section className="w-full max-w-6xl bg-white rounded-2xl shadow-md overflow-hidden mt-6 border border-gray-200 mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Side Image */}
          <div className="w-full lg:w-1/2 flex justify-center p-4 sm:p-6">
            <Image
              src="/recommendation-top.avif"
              alt="Discover Schools"
              width={220}
              height={220}
              className="sm:w-52 sm:h-52 lg:w-[220px] lg:h-[220px]"
            />
          </div>

          {/* Right Side Content */}
          <div className="w-full lg:w-1/2 bg-gray-50 p-4 sm:p-6">
            <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-4 text-center lg:text-left">
              Find Your Boarding | Get Your Personal Counsellor
            </h2>

            <ul className="space-y-3">
              {/* 1 School Suggestion */}
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full text-blue-600 text-sm sm:text-base">
                  <FaUserTie />
                </span>
                <p className="text-gray-700 leading-snug">
                  <strong>The Counselor </strong> will suggest the school as per
                  the student and parent requirements.
                </p>
              </li>

              {/* 2 Help with Visits */}
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full text-green-600 text-sm sm:text-base">
                  <FaMapMarkedAlt />
                </span>
                <p className="text-gray-700 leading-snug">
                  <strong>The Counselor </strong> will help you to sort out all
                  your queries & assist you through the school visits.
                </p>
              </li>

              {/* 3 Choose the Best School */}
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-full text-yellow-600 text-sm sm:text-base">
                  <FaSchool />
                </span>
                <p className="text-gray-700 leading-snug">
                  Finally, <strong>The Counselor </strong> will help you to choose
                  the Best Boarding School.
                </p>
              </li>
            </ul>

            {/* CTA Button */}
            <button
              onClick={openModal}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 rounded-md text-sm sm:text-base transition"
            >
              Get your personal Counselor now
            </button>
          </div>
        </div>
      </section>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          {/* Changed from: bg-black bg-opacity-50  →  bg-black/50 */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6 animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-5 text-center">
              Apply Now
            </h3>

            {/* Form */}
            <form className="space-y-4">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vaibhav Aggarwal"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. vaibhav@domain.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Phone & Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 963 433 3174"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Choose...</option>
                    <option>Pre School</option>
                    <option>1st</option>
                    <option>2nd</option>
                    <option>3rd</option>
                    <option>4th</option>
                    <option>5th</option>
                    <option>6th</option>
                    <option>7th</option>
                    <option>8th</option>
                    <option>9th</option>
                    <option>10th</option>
                    <option>11th</option>
                    <option>12th</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Write your message
                </label>
                <textarea
                  rows={4}
                  placeholder=""
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              {/* Counselor Info */}
              <p className="text-xs text-gray-600 text-center">
                You will be assigned a qualified & certified counsellors.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md text-sm transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}