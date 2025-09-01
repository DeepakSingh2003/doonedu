"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  ChevronRight,
  IndianRupee,
  GraduationCap,
  Users,
  BookOpen,
} from "lucide-react";

export default function SchoolTabs() {
  const [activeTab, setActiveTab] = useState("locations");

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
      {
        title: "All Schools in Delhi",
        link: "/admissions/school-admission-in-delhi",
      },
      {
        title: "Schools in Shahdara, Delhi",
        link: "/admissions/school-admission-in-shahdara",
      },
      {
        title: "Schools in North Delhi, Delhi",
        link: "/admissions/school-admission-in-north-delhi",
      },
      {
        title: "Schools in West Delhi, Delhi",
        link: "/admissions/school-admission-in-west-delhi",
      },
      {
        title: "Schools in South West Delhi, Delhi",
        link: "/admissions/school-admission-in-south-west-delhi",
      },
      {
        title: "Schools in East Delhi, Delhi",
        link: "/admissions/school-admission-in-east-delhi",
      },
      {
        title: "Schools in South Delhi, Delhi",
        link: "/admissions/school-admission-in-south-delhi",
      },
      {
        title: "Schools in Central Delhi, Delhi",
        link: "/admissions/school-admission-in-central-delhi",
      },
      {
        title: "Schools in South East Delhi, Delhi",
        link: "/admissions/school-admission-in-south-east-delhi",
      },
      {
        title: "Schools in North West Delhi, Delhi",
        link: "/admissions/school-admission-in-north-west-delhi",
      },
      {
        title: "Schools in North East Delhi, Delhi",
        link: "/admissions/school-admission-in-north-east-delhi",
      },
      {
        title: "Schools in New Delhi, Delhi",
        link: "/admissions/school-admission-in-new-delhi",
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
              className={`flex items-center px-6 py-2 font-medium text-sm whitespace-nowrap border-b ${
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 h-[250px] overflow-auto custom-scrollbar">
              {content[activeTab].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="flex items-center py-3 px-4 hover:bg-gray-50 rounded-lg border border-gray-100 transition-all hover:shadow-sm group h-[60px]"
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
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
