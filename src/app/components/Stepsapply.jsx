"use client";
import React from "react";

export default function Experience() {
  return (
    <section className="w-full bg-white text-[#005F8D] py-12">
      {/* Milestones Achieved Heading */}
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-black text-3xl sm:text-4xl font-bold mb-4">Milestones Achieved</h1>
      </div>

      {/* Experience Text Section */}
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Global Edu Consulting
        </h2>
        <p className="text-base sm:text-lg leading-relaxed mb-4">
          <span className="font-semibold">
            The largest and oldest consulting group for the boarding schools
          </span>{" "}
          across India providing services since 2010 comes from the capital of
          boarding schools, Dehradun.
          <br />
          <span className="font-bold">What we do, others follow…</span>
        </p>
      </div>

      {/* Stats Section (in one single line) */}
      <div className="mt-10 border-t border-gray-200 pt-8">
        <div className="flex justify-center items-center gap-6 sm:gap-12 text-center flex-wrap">
          {/* Stat 1 */}
          <div className="flex flex-col items-center px-6 py-4  bg-white rounded-lg shadow-md border border-[#005F8D]">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-red-600">
              1000+
            </h3>
            <p className="text-sm sm:text-base font-medium text-gray-800">
              Verified Boarding Schools
            </p>
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-gray-300 hidden sm:block"></div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center px-6 py-4 bg-white rounded-lg shadow-md border border-[#005F8D]">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-red-600">
              10k+
            </h3>
            <p className="text-sm sm:text-base font-medium text-gray-800">
              Students Placed
            </p>
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-gray-300 hidden sm:block"></div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center px-6 py-4 bg-white rounded-lg shadow-md border border-[#005F8D]">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-red-600">
              15+
            </h3>
            <p className="text-sm sm:text-base font-medium text-gray-800">
              Years of Experience
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-center font-bold text-xl">
            No ShowBiz - Pure Counselling
          </h1>
        </div>
      </div>
    </section>
  );
}