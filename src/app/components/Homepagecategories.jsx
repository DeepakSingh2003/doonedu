"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ChevronRight } from "lucide-react";

export default function SchoolTabs() {
  const router = useRouter();

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const content = {
    locations: [
      // Delhi Locations
      {
        title: "Boarding School in Rajkot",
        link: "/boarding-schools-rajkot",
      },
      {
        title: "Boarding School in Gujarat",
        link: "/boarding-schools-gujarat",
      },
      {
        title: "Boarding School in Bihar",
        link: "/boarding-schools-bihar",
      },
      {
        title: "Boarding School in Shimla",
        link: "/boarding-schools-shimla",
      },
      {
        title: "Boarding School in Jharkhand",
        link: "/boarding-schools-jharkhand",
      },
      {
        title: "Boarding School in Solan",
        link: "/boarding-schools-solan",
      },
      {
        title: "Boarding School in Surat",
        link: "/boarding-schools-surat",
      },
      {
        title: "Boarding School in Agra",
        link: "/boarding-schools-agra",
      },
      {
        title: "Boarding School in Kanpur",
        link: "/boarding-schools-kanpur",
      },
      {
        title: "Boarding School in Bhopal",
        link: "/boarding-schools-bhopal",
      },
      {
        title: "Boarding School in Gurugram",
        link: "/boarding-schools-gurugram",
      },
      {
        title: "Boarding School in Faridabad",
        link: "/boarding-schools-faridabad",
      },
      // Bengaluru Locations
      {
        title: "Boarding School in Nainital",
        link: "/boarding-schools-nainital",
      },
      {
        title: "Boarding School in Hisar",
        link: "/boarding-schools-hisar",
      },
      {
        title: "Boarding School in Chandigarh",
        link: "/boarding-schools-chandigarh",
      },
      {
        title: "Boarding School in Noida",
        link: "/boarding-schools-noida",
      },
      {
        title: "Boarding School in Darjeeling",
        link: "/boarding-schools-darjeeling",
      },
      {
        title: "Boarding School in Patna",
        link: "/boarding-schools-patna",
      },
      // Pune Locations
      {
        title: "Boarding School in Panchgani",
        link: "/boarding-schools-panchgani",
      },
      {
        title: "Boarding School in Jaipur",
        link: "/boarding-schools-jaipur",
      },
      {
        title: "Boarding School in Ahmedabad",
        link: "/boarding-schools-in-ahemdabad",
      },
      {
        title: "Boarding School in Pune",
        link: "/boarding-schools-pune",
      },
    ],
  };

  const totalPages = Math.ceil(content.locations.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedLocations = content.locations.slice(startIdx, endIdx);

  const handleNavigateToLink = (item) => {
    if (item.link && item.link.trim() !== "") {
      router.push(item.link);
    } else {
      alert("We are adding more schools for you soon!");
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-xl shadow-md border border-gray-200 mx-auto p-6 mt-0 sm:mt-10">
      {/* Heading */}
      <h2 className="text-lg md:text-xl font-bold text-gray-900 border-b-2 border-red-600 pb-3 mb-6">
        POPULAR BOARDING SCHOOLS LOCATIONS ACROSS INDIA
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedLocations.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleNavigateToLink(item)}
            className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:shadow-md transition"
          >
            {/* Left side: location name + icon */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-600" />
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                {item.title}
              </h3>
            </div>

            {/* Right side: arrow */}
            <div className="text-red-600">
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-red-600 border-red-600 hover:bg-red-50"
            }`}
          >
            Prev
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-red-600 border-red-600 hover:bg-red-50"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
