"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  ChevronRight,
  IndianRupee,
  GraduationCap,
  Users,
  BookOpen,
} from "lucide-react";
import { useCity } from "../contexts/CityContext";

export default function SchoolTabs() {
  const { city } = useCity();
  const [activeTab, setActiveTab] = useState("locations");
  const router = useRouter();

  const tabs = [
    {
      id: "locations",
      label: "Schools by Location",
      short: "Location",
      icon: "https://ezyschooling.com/_next/image?url=%2Fimages%2Ficons%2Fmap.png&w=48&q=75",
    },
    {
      id: "fees",
      label: "Schools by Fees",
      short: "Fees",
      icon: "https://ezyschooling.com/_next/image?url=%2Fimages%2Ficons%2Frupee.png&w=48&q=75",
    },
    {
      id: "boards",
      label: "Schools by Board",
      short: "Board",
      icon: "https://ezyschooling.com/_next/image?url=%2Fimages%2Ficons%2Fgraduation.png&w=48&q=75",
    },
    {
      id: "coeds",
      label: "Schools by Gender",
      short: "Gender",
      icon: "https://ezyschooling.com/_next/image?url=%2Fimages%2Ficons%2Fequality.png&w=48&q=75",
    },
    {
      id: "classes",
      label: "Schools by Classes",
      short: "Classes",
      icon: "https://ezyschooling.com/_next/image?url=%2Fimages%2Ficons%2Fstart.png&w=48&q=75",
    },
  ];

  const content = {
    locations: [
      // Delhi Locations
      {
        title: "All Schools in Delhi",
        link: "/admissions/school-admission-in-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in Shahdara, Delhi",
        link: "/admissions/school-admission-in-shahdara",
        city: "Delhi",
      },
      {
        title: "Schools in North Delhi, Delhi",
        link: "/admissions/school-admission-in-north-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in West Delhi, Delhi",
        link: "/admissions/school-admission-in-west-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in South West Delhi, Delhi",
        link: "/admissions/school-admission-in-south-west-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in East Delhi, Delhi",
        link: "/admissions/school-admission-in-east-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in South Delhi, Delhi",
        link: "/admissions/school-admission-in-south-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in Central Delhi, Delhi",
        link: "/admissions/school-admission-in-central-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in South East Delhi, Delhi",
        link: "/admissions/school-admission-in-south-east-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in North West Delhi, Delhi",
        link: "/admissions/school-admission-in-north-west-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in North East Delhi, Delhi",
        link: "/admissions/school-admission-in-north-east-delhi",
        city: "Delhi",
      },
      {
        title: "Schools in New Delhi, Delhi",
        link: "/admissions/school-admission-in-new-delhi",
        city: "Delhi",
      },
      // Bangalore Locations
      {
        title: "All Schools in Bangalore",
        link: "/admissions/school-admission-in-bangalore",
        city: "Bangalore",
      },
      {
        title: "Schools in Koramangala, Bangalore",
        link: "/admissions/school-admission-in-koramangala",
        city: "Bangalore",
      },
      {
        title: "Schools in Whitefield, Bangalore",
        link: "/admissions/school-admission-in-whitefield",
        city: "Bangalore",
      },
      {
        title: "Schools in Indiranagar, Bangalore",
        link: "/admissions/school-admission-in-indiranagar",
        city: "Bangalore",
      },
      {
        title: "Schools in Jayanagar, Bangalore",
        link: "/admissions/school-admission-in-jayanagar",
        city: "Bangalore",
      },
      {
        title: "Schools in Electronic City, Bangalore",
        link: "/admissions/school-admission-in-electronic-city",
        city: "Bangalore",
      },
      // Pune Locations
      {
        title: "All Schools in Pune",
        link: "/admissions/school-admission-in-pune",
        city: "Pune",
      },
      {
        title: "Schools in Kothrud, Pune",
        link: "/admissions/school-admission-in-kothrud",
        city: "Pune",
      },
      {
        title: "Schools in Aundh, Pune",
        link: "/admissions/school-admission-in-aundh",
        city: "Pune",
      },
      {
        title: "Schools in Baner, Pune",
        link: "/admissions/school-admission-in-baner",
        city: "Pune",
      },
      // Kolkata Locations
      {
        title: "All Schools in Kolkata",
        link: "/admissions/school-admission-in-kolkata",
        city: "Kolkata",
      },
      {
        title: "Schools in Salt Lake, Kolkata",
        link: "/admissions/school-admission-in-salt-lake",
        city: "Kolkata",
      },
      {
        title: "Schools in Howrah, Kolkata",
        link: "/admissions/school-admission-in-howrah",
        city: "Kolkata",
      },
      {
        title: "Schools in Park Street, Kolkata",
        link: "/admissions/school-admission-in-park-street",
        city: "Kolkata",
      },
      // Gurgaon Locations
      {
        title: "All Schools in Gurgaon",
        link: "/admissions/school-admission-in-gurgaon",
        city: "Gurgaon",
      },
      {
        title: "Schools in DLF Phase 1, Gurgaon",
        link: "/admissions/school-admission-in-dlf-phase-1",
        city: "Gurgaon",
      },
      {
        title: "Schools in Sector 56, Gurgaon",
        link: "/admissions/school-admission-in-sector-56",
        city: "Gurgaon",
      },
      // Ghaziabad Locations
      {
        title: "All Schools in Ghaziabad",
        link: "/admissions/school-admission-in-ghaziabad",
        city: "Ghaziabad",
      },
      {
        title: "Schools in Vaishali, Ghaziabad",
        link: "/admissions/school-admission-in-vaishali",
        city: "Ghaziabad",
      },
      {
        title: "Schools in Indirapuram, Ghaziabad",
        link: "/admissions/school-admission-in-indirapuram",
        city: "Ghaziabad",
      },
      // Faridabad Locations
      {
        title: "All Schools in Faridabad",
        link: "/admissions/school-admission-in-faridabad",
        city: "Faridabad",
      },
      {
        title: "Schools in Sector 15, Faridabad",
        link: "/admissions/school-admission-in-sector-15",
        city: "Faridabad",
      },
      // Noida Locations
      {
        title: "All Schools in Noida",
        link: "/admissions/school-admission-in-noida",
        city: "Noida",
      },
      {
        title: "Schools in Sector 62, Noida",
        link: "/admissions/school-admission-in-sector-62",
        city: "Noida",
      },
      // Greater Noida Locations
      {
        title: "All Schools in Greater Noida",
        link: "/admissions/school-admission-in-greater-noida",
        city: "Greater Noida",
      },
      {
        title: "Schools in Pari Chowk, Greater Noida",
        link: "/admissions/school-admission-in-pari-chowk",
        city: "Greater Noida",
      },
      // Greater Noida West Locations
      {
        title: "All Schools in Greater Noida West",
        link: "/admissions/school-admission-in-greater-noida-west",
        city: "Greater Noida West",
      },
      {
        title: "Schools in Gaur City, Greater Noida West",
        link: "/admissions/school-admission-in-gaur-city",
        city: "Greater Noida West",
      },
      // Hyderabad Locations
      {
        title: "All Schools in Hyderabad",
        link: "/admissions/school-admission-in-hyderabad",
        city: "Hyderabad",
      },
      {
        title: "Schools in Banjara Hills, Hyderabad",
        link: "/admissions/school-admission-in-banjara-hills",
        city: "Hyderabad",
      },
      // Chennai Locations
      {
        title: "All Schools in Chennai",
        link: "/admissions/school-admission-in-chennai",
        city: "Chennai",
      },
      {
        title: "Schools in Adyar, Chennai",
        link: "/admissions/school-admission-in-adyar",
        city: "Chennai",
      },
      // Jaipur Locations
      {
        title: "All Schools in Jaipur",
        link: "/admissions/school-admission-in-jaipur",
        city: "Jaipur",
      },
      {
        title: "Schools in Vaishali Nagar, Jaipur",
        link: "/admissions/school-admission-in-vaishali-nagar",
        city: "Jaipur",
      },
    ],
    fees: [
      { title: "Below ₹50,000", link: "#" },
      { title: "₹50,000 - ₹1,00,000", link: "#" },
      { title: "₹1,00,000 - ₹2,00,000", link: "#" },
      { title: "Above ₹2,00,000", link: "#" },
    ],
    boards: [
      { title: "CBSE Schools", link: "#" },
      { title: "ICSE Schools", link: "#" },
      { title: "IB Schools", link: "#" },
      { title: "State Board Schools", link: "#" },
    ],
    coeds: [
      { title: "Boys Schools", link: "#" },
      { title: "Girls Schools", link: "#" },
      { title: "Co-ed Schools", link: "#" },
    ],
    classes: [
      { title: "Nursery", link: "#" },
      { title: "Primary", link: "#" },
      { title: "Secondary", link: "#" },
      { title: "Senior Secondary", link: "#" },
    ],
  };

  // Filter locations based on selected city
  const filteredLocations = city
    ? content.locations.filter(
        (item) => item.city.toLowerCase() === city.toLowerCase()
      )
    : content.locations;

  // Map tab IDs to their respective icons for content
  const getContentIcon = (tabId) => {
    switch (tabId) {
      case "locations":
        return <MapPin className="h-4 w-4 text-primary" />;
      case "fees":
        return <IndianRupee className="h-4 w-4 text-primary" />;
      case "boards":
        return <GraduationCap className="h-4 w-4 text-primary" />;
      case "coeds":
        return <Users className="h-4 w-4 text-primary" />;
      case "classes":
        return <BookOpen className="h-4 w-4 text-primary" />;
      default:
        return <MapPin className="h-4 w-4 text-primary" />;
    }
  };

  // Function to handle navigation to explore schools
  const handleNavigateToExploreSchools = (tabType, filterValue, title) => {
    // Create query parameters based on the tab type and filter value
    const queryParams = new URLSearchParams();

    // Add city filter if available
    if (city) {
      queryParams.append("city", city.toLowerCase());
    }

    // Add the specific filter based on tab type
    switch (tabType) {
      case "locations":
        // For locations, we need to extract the area from the title
        if (title.includes("All Schools")) {
          queryParams.append(
            "city",
            title.replace("All Schools in ", "").toLowerCase()
          );
        } else {
          const area = title
            .replace("Schools in ", "")
            .split(",")[0]
            .toLowerCase();
          queryParams.append("area", area);
        }
        break;
      case "fees":
        queryParams.append(
          "fee_range",
          title
            .toLowerCase()
            .replace("₹", "rs")
            .replace(",", "")
            .replace(" ", "_")
        );
        break;
      case "boards":
        queryParams.append(
          "board",
          title.replace(" Schools", "").toLowerCase()
        );
        break;
      case "coeds":
        queryParams.append(
          "gender",
          title.replace(" Schools", "").toLowerCase()
        );
        break;
      case "classes":
        queryParams.append("class", title.toLowerCase());
        break;
      default:
        break;
    }

    // Navigate to explore schools page with query parameters
    router.push(`/exploreschools?${queryParams.toString()}`);
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md overflow-hidden mt-6 border border-gray-200 mx-auto p-8">
      {/* Tabs */}
      <div className="relative flex lg:justify-center">
        <div
          className="overflow-x-auto lg:overflow-x-hidden flex custom-scrollbar scroll-smooth"
          role="tablist"
          aria-label="School categories"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-2 font-medium text-sm whitespace-nowrap border-b cursor-pointer ${
                activeTab === tab.id
                  ? "border-b-2 border-[#1978cd] text-[#1978cd] bg-blue-50 rounded-tl-lg rounded-tr-lg"
                  : "text-gray-600 hover:text-gray-700"
              }`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
            >
              <img
                src={tab.icon}
                alt={tab.label}
                width={20}
                height={20}
                className="inline-block mr-2"
              />
              <span className="max-sm:hidden">{tab.label}</span>
              <span className="sm:hidden">{tab.short}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-2 pt-1">
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          <div className="mt-4">
            {activeTab === "locations" && filteredLocations.length === 0 ? (
              <div className="text-center text-gray-500">
                No schools found for {city}. Please select another city.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 h-[250px] overflow-auto custom-scrollbar">
                {(activeTab === "locations"
                  ? filteredLocations
                  : content[activeTab]
                ).map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      handleNavigateToExploreSchools(
                        activeTab,
                        item.title,
                        item.title
                      )
                    }
                    className="flex items-center py-3 px-4 hover:bg-gray-50 rounded-lg border border-gray-100 transition-all hover:shadow-sm group h-[60px] cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                      {getContentIcon(activeTab)}
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-700 group-hover:text-primary text-xs font-medium block line-clamp-1">
                        {item.title}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
