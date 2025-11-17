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

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {/* Card 1 - Mobile: No border/shadow, left image + text */}
          <Link
            href="#"
            className="sm:border sm:border-[#004c73] rounded-sm bg-white p-4 sm:p-6 flex flex-row sm:flex-col items-center sm:items-center justify-start sm:justify-center text-left sm:text-center hover:shadow-lg transition-all duration-300 w-full max-w-[350px] h-auto sm:h-[200px]"
          >
            <img
              src="https://admin.doonedu.com/assets/img/school-boarding.png"
              alt="Affordable Boarding Schools"
              width={60}
              height={60}
              className="mb-0 sm:mb-3 mr-4 sm:mr-0"
            />
            <div className="flex-1 sm:flex-none">
              <h3 className="font-bold text-[#004c73] text-sm sm:text-base">
                Best Affordable Boarding Schools
              </h3>
              <p className="text-gray-600 text-xs mt-1">
                Fee: under 2 lakh Per Annum
              </p>
            </div>
          </Link>

          {/* Card 2 Container */}
          <div className="flex flex-col gap-4 w-full max-w-[350px]">
            {/* Girls School Card */}
            <Link
              href="#"
              className="sm:border sm:border-[#004c73] rounded-sm bg-white p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300 w-full h-auto sm:h-[90px]"
            >
              <div className="flex items-center gap-3 w-full">
                <img
                  src="https://admin.doonedu.com/assets/img/girl-icon.png"
                  alt="Top Girls Boarding Schools"
                  width={50}
                  height={50}
                  className="rounded-full sm:rounded-full"
                />
                <h3 className="font-bold text-[#004c73] text-sm sm:text-base">
                  Top Girls Boarding Schools <span className="hidden sm:inline"><br /></span> In India
                </h3>
              </div>
            </Link>

            {/* Boys School Card */}
            <Link
              href="#"
              className="sm:border sm:border-[#004c73] rounded-sm bg-white p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300 w-full h-auto sm:h-[90px]"
            >
              <div className="flex items-center gap-3 w-full">
                <img
                  src="https://admin.doonedu.com/assets/img/boy-%20icon.png"
                  alt="Top Boys Boarding Schools"
                  width={50}
                  height={50}
                  className="rounded-full sm:rounded-full"
                />
                <h3 className="font-bold text-[#004c73] text-sm sm:text-base">
                  Top Boys Boarding Schools <span className="hidden sm:inline"><br /></span> In India
                </h3>
              </div>
            </Link>
          </div>

          {/* Card 4 - Mobile: No border/shadow, left image + text */}
          <Link
            href="#"
            className="sm:border sm:border-[#004c73] rounded-sm bg-white p-4 sm:p-6 flex flex-row sm:flex-col items-center sm:items-center justify-start sm:justify-center text-left sm:text-center hover:shadow-lg transition-all duration-300 w-full max-w-[350px] h-auto sm:h-[200px]"
          >
            <img
              src="https://admin.doonedu.com/assets/img/school-boarding.png"
              alt="Top Fully Residential Schools"
              width={60}
              height={60}
              className="mb-0 sm:mb-3 mr-4 sm:mr-0"
            />
            <div className="flex-1 sm:flex-none">
              <h3 className="font-bold text-[#004c73] text-sm sm:text-base">
                Top Fully Residential Schools <span className="hidden sm:inline"><br /></span> In India
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}