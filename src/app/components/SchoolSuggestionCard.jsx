"use client";
import Image from "next/image";
import Link from "next/link";

export default function TopSchoolCategories() {
  return (
    <section className="bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
          Top Schools Category:{" "}
          <span className="text-[#004c73]">Boarding Schools</span>
        </h2>

        {/* Category Grid - 2 cards per row on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
          {/* Card 1 - Affordable Boarding Schools */}
          <Link
            href="#"
            className="shadow-md rounded-sm bg-white p-4 sm:p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300 w-full max-w-[280px] h-[200px] relative"
          >
            <img
              src="/affordable-bording-school.png"
              alt="Affordable Boarding Schools"
              width={80}
              height={80}
              className="mb-4 transform -translate-y-2"
            />

            <h3 className="font-bold text-[#004c73] text-sm sm:text-base">
              Best Affordable Boarding Schools
            </h3>
            <p className="text-gray-600 text-xs mt-1">
              Fee: under 2 lakh Per Annum
            </p>
          </Link>

          {/* Card 2 - Girls Boarding Schools */}
          <Link
            href="/best-girls-boarding-schools-in-india"
            className="shadow-md rounded-sm bg-white p-4 sm:p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300 w-full max-w-[280px] h-[200px] relative"
          >
            <img
              src="/girls-bording-school.png"
              alt="Top Girls Boarding Schools"
              width={80}
              height={80}
              className="mb-4 rounded-full transform -translate-y-2"
            />
            <h3 className="font-bold text-[#004c73] text-sm sm:text-base">
              Top Girls Boarding Schools In India
            </h3>
          </Link>

          {/* Card 3 - Boys Boarding Schools */}
          <Link
            href="/best-boys-boarding-schools-in-india"
            className="shadow-md rounded-sm bg-white p-4 sm:p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300 w-full max-w-[280px] h-[200px] relative"
          >
            <img
              src="/boys-bording-school.png"
              alt="Top Boys Boarding Schools"
              width={80}
              height={80}
              className="mb-4 rounded-full transform -translate-y-2"
            />
            <h3 className="font-bold text-[#004c73] text-sm sm:text-base">
              Top Boys Boarding Schools In India
            </h3>
          </Link>

          {/* Card 4 - Fully Residential Schools */}
          <Link
            href="#"
            className="shadow-md rounded-sm bg-white p-4 sm:p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300 w-full max-w-[280px] h-[200px] relative"
          >
            <img
              src="/residential-bording-school.png"
              alt="Top Fully Residential Schools"
              width={80}
              height={80}
              className="mb-4 transform -translate-y-2"
            />
            <h3 className="font-bold text-[#004c73] text-sm sm:text-base">
              Top Fully Residential Schools In India
            </h3>
          </Link>
        </div>
      </div>
    </section>
  );
}