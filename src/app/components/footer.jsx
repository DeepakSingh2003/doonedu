"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const socialLinks = [
    {
      href: "https://www.linkedin.com/company/ezyschooling",
      label: "LinkedIn",
      icon: "M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53S11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29.04c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z",
    },
    {
      href: "https://www.facebook.com/ezyschooling/",
      label: "Facebook",
      icon: "M37,19h-2c-2.14,0-3,0.5-3,2v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z",
    },
    {
      href: "https://www.instagram.com/ezyschooling/?hl=en",
      label: "Instagram",
      icon: "M16,3C8.83,3,3,8.83,3,16v18c0,7.17,5.83,13,13,13h18c7.17,0,13-5.83,13-13V16c0-7.17-5.83-13-13-13H16z M37,11c1.1,0,2,0.9,2,2 c0,1.1-0.9,2-2,2s-2-0.9-2-2C35,11.9,35.9,11,37,11z M25,14c6.07,0,11,4.93,11,11s-4.93,11-11,11s-11-4.93-11-11S18.93,14,25,14z M25,16c-4.96,0-9,4.04-9,9c0,4.96,4.04,9,9,9c4.96,0,9-4.04,9-9C34,20.04,29.96,16,25,16z",
    },
    {
      href: "https://twitter.com/ezyschooling?lang=en",
      label: "Twitter",
      icon: "M11,4C7.134,4,4,7.134,4,11v28c0,3.866,3.134,7,7,7h28c3.866,0,7-3.134,7-7V11c0-3.866-3.134-7-7-7H11z M13.08594,13h7.9375l5.63672,8.00977L33.5,13h2.5l-8.21094,9.61328L38,37h-7.93555l-6.54102-9.29297L15.5,37h-2.5l9.30859-10.89648 L13.08594,13z M16.91406,15L31.021,35h3.06445L20.0,15H16.91406z",
    },
    {
      href: "https://www.youtube.com/@Ezyschooling",
      label: "YouTube",
      icon: "M47.5,14.3c-0.6-2.3-2.4-4.1-4.7-4.7C39.3,9,25,9,25,9s-14.3,0-17.8,0.6c-2.3,0.6-4.1,2.4-4.7,4.7C2,17.8,2,25,2,25 s0,7.2,0.6,10.7c0.6,2.3,2.4,4.1,4.7,4.7C10.7,41,25,41,25,41s14.3,0,17.8-0.6c2.3-0.6,4.1-2.4,4.7-4.7C48,32.2,48,25,48,25 S48,17.8,47.5,14.3z M20,32V18l12,7L20,32z",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#2B2B39] to-[#1F1F2A] text-white">
      <div className="max-w-[90%] md:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex flex-col md:flex-row  gap-6 md:mb-8">
            {/* Logo Section */}
            <div className="flex-1 min-w-[200px] text-center md:text-left">
              <div className="flex flex-col items-center md:items-start space-y-4">
                <img
                  src="https://res.cloudinary.com/dnq8fbcxh/image/upload/v1757137090/global-edu-consulting_1_uohjgy.png"
                  alt="Ezyschooling Logo"
                  title="Ezyschooling Logo"
                  className="h-[50px] w-auto"
                />
                <p className="text-slate-300 text-[10px] leading-relaxed max-w-sm md:max-w-xs px-4 md:px-0">
                  Your trusted partner in finding the perfect school for your
                  child's bright future.
                </p>
                <div className="flex pt-2">
                  {socialLinks.map(({ href, label, icon }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      aria-label={label}
                      className="text-slate-400 hover:text-blue-400 transition-all duration-200 transform hover:scale-110 p-2 rounded-full hover:bg-slate-800/50 cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 50 50"
                      >
                        <path d={icon} />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            {[
              {
                key: "contact",
                title: "Contact Us",
                content: (
                  <>
                    <div className="text-slate-300 text-[10px] whitespace-pre-wrap py-1 px-2 md:px-0 flex">
                      <svg
                        className="w-3 h-3 text-slate-300 flex-shrink-0 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Doon Global Edu Consulting Privet Limited, 35 Lakhi Bagh,
                      Dehradun Central, Dehradun, Uttarakhand, India, 248001
                    </div>
                    <Link
                      href="mailto:query@ezyschooling.com"
                      className="text-slate-300 hover:text-white transition-all duration-200 text-[10px] hover:underline py-1 rounded-sm hover:bg-slate-800/30 px-2 md:px-0 flex items-center cursor-pointer"
                    >
                      <svg
                        className="w-3 h-3 text-slate-300 flex-shrink-0 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      doon.edu@gmail.com
                    </Link>
                    <Link
                      href="tel:+91-8766340464"
                      className="text-slate-300 hover:text-white transition-all duration-200 text-[10px] hover:underline py-1 rounded-sm hover:bg-slate-800/30 px-2 md:px-0 flex items-center cursor-pointer"
                    >
                      <svg
                        className="w-3 h-3 text-slate-300 flex-shrink-0 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      +91 963 433 3174
                    </Link>
                  </>
                ),
              },
              {
                key: "quick-links",
                title: "Quick Links",
                content: (
                  <>
                    {["Search Schools", "Parenting", "News"].map(
                      (text, index) => (
                        <Link
                          key={text}
                          href={["/exploreschools", "/Blog", "/Blog"][index]}
                          className="block text-slate-300 hover:text-white transition-all duration-200 text-[10px] hover:underline py-1 rounded-sm hover:bg-slate-800/30 px-2 md:px-0 cursor-pointer"
                        >
                          {text}
                        </Link>
                      )
                    )}
                  </>
                ),
              },
              {
                key: "for-schools",
                title: "For Schools",
                content: (
                  <>
                    <Link
                      href="/schoolregister"
                      className="block text-slate-300 hover:text-white transition-all duration-200 text-[10px] hover:underline py-1 rounded-sm hover:bg-slate-800/30 px-2 md:px-0 cursor-pointer"
                    >
                      Register School
                    </Link>
                    <Link
                      href="/schoolregister"
                      className="block text-slate-300 hover:text-white transition-all duration-200 text-[10px] hover:underline py-1 rounded-sm hover:bg-slate-800/30 px-2 md:px-0 cursor-pointer"
                    >
                      Login School
                    </Link>
                  </>
                ),
              },
              {
                key: "about",
                title: "About",
                content: (
                  <>
                    {["About Us", "Privacy Policy", "Contact Us", "FAQs"].map(
                      (text, index) => (
                        <Link
                          key={text}
                          href={
                            [
                              "/Aboutus",
                              "/Privacypolicy",
                              "/Contactus",
                              "/FAQs",
                            ][index]
                          }
                          className="block text-slate-300 hover:text-white transition-all duration-200 text-[10px] hover:underline py-1 rounded-sm hover:bg-slate-800/30 px-2 md:px-0 cursor-pointer"
                        >
                          {text}
                        </Link>
                      )
                    )}
                  </>
                ),
              },
            ].map(({ key, title, content }) => (
              <div key={key} className="flex-1 min-w-[200px]">
                <div className="space-y-3">
                  <button
                    onClick={() => toggleSection(key)}
                    className="flex justify-between items-center w-full md:cursor-default cursor-pointer"
                  >
                    <h4 className="text-xs font-semibold text-white border-b border-slate-700 pb-1">
                      {title}
                    </h4>
                    <svg
                      className={`w-3 h-3 md:hidden transition-transform ${
                        openSections[key] ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`space-y-2 transition-all duration-300 ease-in-out max-h-96 ${
                      openSections[key] ? "block" : "hidden"
                    } md:block`}
                  >
                    {content}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Locations & Regions */}
          <div className="border-t border-slate-700/50 pt-6 md:pt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                key: "top-locations",
                title: "Top Locations in India",
                items: [
                  { name: "Dehradun", href: "/boarding-schools-dehradun" },
                  { name: "Mussoorie", href: "/boarding-schools-mussoorie" },
                  { name: "Shimla", href: "/boarding-schools-shimla" },
                  { name: "Bengaluru", href: "/boarding-schools-bengaluru" },
                  { name: "Nainital", href: "/boarding-schools-nainital" },
                  { name: "Panchgani", href: "/boarding-schools-panchgani" },
                  { name: "Mumbai", href: "/boarding-schools-mumbai" },
                  { name: "Darjeeling", href: "/boarding-schools-darjeeling" },
                  { name: "Delhi", href: "/boarding-schools-delhi" },
                  { name: "Pune", href: "/boarding-schools-pune" },
                  { name: "Jaipur", href: "/boarding-schools-jaipur" },
                ],
              },
              {
                key: "popular-searches",
                title: "Popular Boarding Searches",
                items: [
                  { name: "Chandigarh", href: "/boarding-schools-chandigarh" },
                  { name: "Noida", href: "/boarding-schools-noida" },
                  { name: "Gurugram", href: "/boarding-schools-gurugram" },
                  { name: "Faridabad", href: "/boarding-schools-faridabad" },
                  { name: "Patna", href: "/boarding-schools-patna" },
                  { name: "Kolkata", href: "/boarding-schools-kolkata" },
                  { name: "Hisar", href: "/boarding-schools-hisar" },
                  { name: "Ahmedabad", href: "/boarding-schools-ahmedabad" },
                  { name: "Kota", href: "/boarding-schools-kota" },
                  { name: "Solan", href: "/boarding-schools-solan" },
                  { name: "Bhopal", href: "/boarding-schools-bhopal" },
                  { name: "Indore", href: "/boarding-schools-indore" },
                ],
              },
              {
                key: "top-region",
                title: "Top Region for Boarding Schools",
                items: [
                  { name: "India", href: "/top-boarding-schools-in-india" },
                  {
                    name: "North India",
                    href: "/boarding-schools-north-india",
                  },
                  {
                    name: "Central India",
                    href: "/boarding-schools-central-india",
                  },
                  { name: "East India", href: "/boarding-schools-east-india" },
                  { name: "West India", href: "/schools-in-west-india" },
                  {
                    name: "Best Boarding Schools In India",
                    href: "/best-boarding-schools-in-india",
                  },
                  {
                    name: "Best Girls Boarding Schools In India",
                    href: "/best-girls-boarding-schools-in-india",
                  },
                  {
                    name: "Best Boys Boarding Schools In India",
                    href: "/best-boys-boarding-schools-in-india",
                  },
                  {
                    name: "Best Co Ed Boarding Schools In India",
                    href: "/best-co-ed-boarding-schools-in-india",
                  },
                  {
                    name: "Best International Boarding Schools In India",
                    href: "/best-international-boarding-schools-in-india",
                  },
                  {
                    name: "Top Boarding Schools Of Delhi NCR",
                    href: "/top-boarding-schools-of-delhi-ncr",
                  },
                ],
              },
            ].map(({ key, title, items }) => (
              <div key={key} className="space-y-3">
                <button
                  onClick={() => toggleSection(key)}
                  className="flex justify-between items-center w-full md:cursor-default cursor-pointer"
                >
                  <h4 className="text-xs font-semibold text-white border-b border-slate-700/50 pb-1">
                    {title}
                  </h4>
                  <svg
                    className={`w-3 h-3 md:hidden transition-transform ${
                      openSections[key] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`space-y-2 ${
                    openSections[key] ? "block" : "hidden"
                  } md:block`}
                >
                  {items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-[10px] text-slate-300 hover:text-white py-1 hover:underline transition-all duration-200 rounded-sm hover:bg-slate-800/30 w-full text-left cursor-pointer"
                    >
                      {key !== "top-region"
                        ? `Boarding Schools In ${item.name}`
                        : item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-700/50 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-slate-400 text-[10px] text-center md:text-left">
            Copyright © 2025 Global Edu.Consulting. All rights reserved.
          </div>
          <div className="relative w-[200px] sm:w-[280px] aspect-[377/18]">
            <Image
              alt="cards logo"
              title="copyright"
              src="/copyright.avif"
              fill
              className="object-contain"
              sizes="(min-width: 640px) 280px, 200px"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
