"use client";

import { useState, useEffect } from "react";

export default function SubNavbar() {
  const [active, setActive] = useState("Home");
  const [show, setShow] = useState(true); // visible on page load
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const linksLeft = ["Home", "Explore Schools"];
  const linksRight = ["Smart Search", "Ask a Question"];

  // Detect desktop view
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // scrolling down → hide
        setShow(false);
      } else {
        // scrolling up → show
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isDesktop]);

  if (!isDesktop) return null; // hide completely on mobile

  return (
    <div
      className={`fixed top-16 left-0 w-full bg-blue-50 border-t border-gray-200 shadow-md transition-transform duration-300 z-20 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between px-6 py-2">
        {/* Left Links */}
        <div className="flex space-x-6">
          {linksLeft.map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`py-2 text-sm font-medium relative ${
                active === link ? "text-black" : "text-gray-700"
              }`}
            >
              {link}
              {active === link && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
              )}
            </button>
          ))}
        </div>

        {/* Right Links */}
        <div className="flex space-x-6">
          {linksRight.map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`py-2 text-sm font-medium relative ${
                active === link ? "text-black" : "text-gray-700"
              }`}
            >
              {link}
              {active === link && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
