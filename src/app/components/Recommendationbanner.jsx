"use client";
import { FaUserTie, FaMapMarkedAlt, FaSchool } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function DiscoverSchools() {
  return (
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
            {/* 1️⃣ School Suggestion */}
            <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full text-blue-600 text-sm sm:text-base">
                <FaUserTie />
              </span>
              <p className="text-gray-700 leading-snug">
                <strong>The Counselor </strong> will suggest the school as per
                the student and parent requirements.
              </p>
            </li>

            {/* 2️⃣ Help with Visits */}
            <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full text-green-600 text-sm sm:text-base">
                <FaMapMarkedAlt />
              </span>
              <p className="text-gray-700 leading-snug">
                <strong>The Counselor </strong> will help you to sort out all
                your queries & assist you through the school visits.
              </p>
            </li>

            {/* 3️⃣ Choose the Best School */}
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
          <Link href="#" className="mt-5 w-full block">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 rounded-md text-sm sm:text-base transition cursor-pointer mt-5">
              Get your personal Counselor now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
