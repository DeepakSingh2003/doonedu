"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ChevronRight } from "lucide-react";
import { useCity } from "../contexts/CityContext";

export default function SchoolTabs() {
  const { city } = useCity();
  const router = useRouter();

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const content = {
    locations: [
      // Delhi Locations
      {
        title: "All Schools in Delhi",
        link: "/boarding-schools-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in Shahdara, Delhi",
        link: "/boarding-schools-delhi-shahdara",
        city: "Delhi",
      },
      {
        title: "Schools in North Delhi, Delhi",
        link: "/boarding-schools-delhi-north-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in West Delhi, Delhi",
        link: "/boarding-schools-delhi-west-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in South West Delhi, Delhi",
        link: "/boarding-schools-delhi-south-west-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in East Delhi, Delhi",
        link: "/boarding-schools-delhi-east-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in South Delhi, Delhi",
        link: "/boarding-schools-delhi-south-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in Central Delhi, Delhi",
        link: "/boarding-schools-delhi-central-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in South East Delhi, Delhi",
        link: "/boarding-schools-delhi-south-east-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in North West Delhi, Delhi",
        link: "/boarding-schools-delhi-north-west-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in North East Delhi, Delhi",
        link: "/boarding-schools-delhi-north-east-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in New Delhi, Delhi",
        link: "/boarding-schools-delhi-new-delhi",
        city: "Delhi",
      },
      // Bengaluru Locations
      {
        title: "All Schools in Bengaluru",
        link: "/boarding-schools-bengaluru",
        city: "Bengaluru",
      },
      {
        title: "Schools in Koramangala, Bengaluru",
        link: "/boarding-schools-bengaluru-koramangala",
        city: "Bengaluru",
      },
      {
        title: "Schools in Whitefield, Bengaluru",
        link: "/boarding-schools-bengaluru-whitefield",
        city: "Bengaluru",
      },
      {
        title: "Schools in Indiranagar, Bengaluru",
        link: "/boarding-schools-bengaluru-indiranagar",
        city: "Bengaluru",
      },
      {
        title: "Schools in Jayanagar, Bengaluru",
        link: "/boarding-schools-bengaluru-jayanagar",
        city: "Bengaluru",
      },
      {
        title: "Schools in Electronic City, Bengaluru",
        link: "/boarding-schools-bengaluru-electronic-city",
        city: "Bengaluru",
      },
      // Pune Locations
      {
        title: "All Schools in Pune",
        link: "/boarding-schools-pune",
        city: "Pune",
      },
      {
        title: "Schools in Kothrud, Pune",
        link: "/boarding-schools-pune-kothrud",
        city: "Pune",
      },
      {
        title: "Schools in Aundh, Pune",
        link: "/boarding-schools-pune-aundh",
        city: "Pune",
      },
      {
        title: "Schools in Baner, Pune",
        link: "/boarding-schools-pune-baner",
        city: "Pune",
      },
      // Kolkata Locations
      {
        title: "All Schools in Kolkata",
        link: "/boarding-schools-kolkata",
        city: "Kolkata",
      },
      {
        title: "Schools in Salt Lake, Kolkata",
        link: "/boarding-schools-kolkata-salt-lake",
        city: "Kolkata",
      },
      {
        title: "Schools in Howrah, Kolkata",
        link: "/boarding-schools-kolkata-howrah",
        city: "Kolkata",
      },
      {
        title: "Schools in Park Street, Kolkata",
        link: "/boarding-schools-kolkata-park-street",
        city: "Kolkata",
      },
      // Gurugram Locations
      {
        title: "All Schools in Gurugram",
        link: "/boarding-schools-gurugram",
        city: "Gurugram",
      },
      {
        title: "Schools in DLF Phase 1, Gurugram",
        link: "/boarding-schools-gurugram-dlf-phase-1",
        city: "Gurugram",
      },
      {
        title: "Schools in Sector 56, Gurugram",
        link: "/boarding-schools-gurugram-sector-56",
        city: "Gurugram",
      },
      // Ghaziabad Locations
      {
        title: "All Schools in Ghaziabad",
        link: "/boarding-schools-ghaziabad",
        city: "Ghaziabad",
      },
      {
        title: "Schools in Vaishali, Ghaziabad",
        link: "/boarding-schools-ghaziabad-vaishali",
        city: "Ghaziabad",
      },
      {
        title: "Schools in Indirapuram, Ghaziabad",
        link: "/boarding-schools-ghaziabad-indirapuram",
        city: "Ghaziabad",
      },
      // Faridabad Locations
      {
        title: "All Schools in Faridabad",
        link: "/boarding-schools-faridabad",
        city: "Faridabad",
      },
      {
        title: "Schools in Sector 15, Faridabad",
        link: "/boarding-schools-faridabad-sector-15",
        city: "Faridabad",
      },
      // Noida Locations
      {
        title: "All Schools in Noida",
        link: "/boarding-schools-noida",
        city: "Noida",
      },
      {
        title: "Schools in Sector 62, Noida",
        link: "/boarding-schools-noida-sector-62",
        city: "Noida",
      },
      // Greater Noida Locations
      {
        title: "All Schools in Greater Noida",
        link: "/boarding-schools-greater-noida",
        city: "Greater Noida",
      },
      {
        title: "Schools in Pari Chowk, Greater Noida",
        link: "/boarding-schools-greater-noida-pari-chowk",
        city: "Greater Noida",
      },
      // Greater Noida West Locations
      {
        title: "All Schools in Greater Noida West",
        link: "/boarding-schools-greater-noida-west",
        city: "Greater Noida West",
      },
      {
        title: "Schools in Gaur City, Greater Noida West",
        link: "/boarding-schools-greater-noida-west-gaur-city",
        city: "Greater Noida West",
      },
      // Hyderabad Locations
      {
        title: "All Schools in Hyderabad",
        link: "/boarding-schools-hyderabad",
        city: "Hyderabad",
      },
      {
        title: "Schools in Banjara Hills, Hyderabad",
        link: "/boarding-schools-hyderabad-banjara-hills",
        city: "Hyderabad",
      },
      // Chennai Locations
      {
        title: "All Schools in Chennai",
        link: "/boarding-schools-chennai",
        city: "Chennai",
      },
      {
        title: "Schools in Adyar, Chennai",
        link: "/boarding-schools-chennai-adyar",
        city: "Chennai",
      },
      // Jaipur Locations
      {
        title: "All Schools in Jaipur",
        link: "/boarding-schools-jaipur",
        city: "Jaipur",
      },
      {
        title: "Schools in Vaishali Nagar, Jaipur",
        link: "/boarding-schools-jaipur-vaishali-nagar",
        city: "Jaipur",
      },
      // Additional Cities from Footer
      {
        title: "All Schools in Dehradun",
        link: "/boarding-schools-dehradun",
        city: "Dehradun",
      },
      {
        title: "All Schools in Mussoorie",
        link: "/boarding-schools-mussoorie",
        city: "Mussoorie",
      },
      {
        title: "All Schools in Shimla",
        link: "/boarding-schools-shimla",
        city: "Shimla",
      },
      {
        title: "All Schools in Nainital",
        link: "/boarding-schools-nainital",
        city: "Nainital",
      },
      {
        title: "All Schools in Panchgani",
        link: "/boarding-schools-panchgani",
        city: "Panchgani",
      },
      {
        title: "All Schools in Mumbai",
        link: "/boarding-schools-mumbai",
        city: "Mumbai",
      },
      {
        title: "All Schools in Darjeeling",
        link: "/boarding-schools-darjeeling",
        city: "Darjeeling",
      },
      {
        title: "All Schools in Chandigarh",
        link: "/boarding-schools-chandigarh",
        city: "Chandigarh",
      },
      {
        title: "All Schools in Patna",
        link: "/boarding-schools-patna",
        city: "Patna",
      },
      {
        title: "All Schools in Ahmedabad",
        link: "/boarding-schools-ahmedabad",
        city: "Ahmedabad",
      },
      {
        title: "All Schools in Kota",
        link: "/boarding-schools-kota",
        city: "Kota",
      },
      {
        title: "All Schools in Solan",
        link: "/boarding-schools-solan",
        city: "Solan",
      },
      {
        title: "All Schools in Bhopal",
        link: "/boarding-schools-bhopal",
        city: "Bhopal",
      },
      {
        title: "All Schools in Indore",
        link: "/boarding-schools-indore",
        city: "Indore",
      },
      { title: "Coming Soon in XYZ City", link: "", city: "XYZ" },
    ],
  };

  const filteredLocations = city
    ? content.locations.filter(
        (item) => item.city.toLowerCase() === city.toLowerCase()
      )
    : content.locations;

  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedLocations = filteredLocations.slice(startIdx, endIdx);

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
        POPULAR LOCALITIES IN AND AROUND {city || "CITY"}
      </h2>

      {/* Grid */}
      {filteredLocations.length === 0 ? (
        <div className="text-center text-gray-500">
          No schools found for {city}. Please select another city.
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
