"use client";
import Link from "next/link";
import { FaHome, FaList, FaSearch, FaUser } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const [isHidden, setIsHidden] = useState(false);
  const lastScroll = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll.current && currentScroll > 50) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Nav items data
  const navItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/schools", label: "All Schools", icon: FaList },
    { path: "/search", label: "Search", icon: FaSearch },
    { path: "/profile", label: "Profile", icon: FaUser },
  ];

  return (
    <nav
      className={`fixed bottom-0 w-full z-50 bg-white flex justify-around items-center shadow-[0_-2px_5px_rgba(0,0,0,0.1)] md:hidden transition-transform duration-300 ${
        isHidden ? "translate-y-full" : ""
      }`}
    >
      {navItems.map(({ path, label, icon: Icon }) => {
        const isActive = pathname === path;
        return (
          <Link
            key={path}
            href={path}
            className="relative flex flex-col items-center justify-center w-full py-2"
          >
            {/* Blue line indicator */}
            {isActive && (
              <span className="absolute top-0 left-0 right-0 h-0.5 bg-[#1978CD] rounded-full"></span>
            )}

            {/* Icon */}
            <Icon
              className={`text-lg ${
                isActive ? "text-[#1978CD]" : "text-gray-600"
              }`}
            />

            {/* Label with more gap */}
            <span
              className={`mt-2 text-[11px] ${
                isActive ? "text-[#1978CD]" : "text-gray-600"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
