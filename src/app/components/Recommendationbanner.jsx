"use client";
import { FaTrophy, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
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
            Discover Your Ideal Schools
          </h2>

          <ul className="space-y-3">
            <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full text-yellow-500 text-sm sm:text-base">
                <FaTrophy />
              </span>
              <p className="text-gray-700 leading-snug">
                <strong>Find Your Perfect Match:</strong> Schools selected just
                for you
              </p>
            </li>
            <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full text-pink-500 text-sm sm:text-base">
                <FaMapMarkerAlt />
              </span>
              <p className="text-gray-700 leading-snug">
                <strong>Tailored Schools:</strong> Schools matched to your
                preferences
              </p>
            </li>
            <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full text-blue-500 text-sm sm:text-base">
                <FaSearch />
              </span>
              <p className="text-gray-700 leading-snug">
                <strong>Simple School Search:</strong> Easy way to explore Delhi
                schools
              </p>
            </li>
          </ul>

          {/* CTA Button */}
          <Link href="/exploreschools" className="mt-5 w-full">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 rounded-md text-sm sm:text-base transition cursor-pointer mt-5">
              Get School List
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
