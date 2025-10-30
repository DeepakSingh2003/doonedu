"use client";
import Link from "next/link";
import { FaHome, FaList, FaPhoneAlt, FaUser, FaWhatsapp } from "react-icons/fa"; // ✅ use FaPhoneAlt
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLogin } from "../contexts/LoginContext";

const BottomNav = () => {
  const [isHidden, setIsHidden] = useState(false);
  const lastScroll = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  const { isLoggedIn, openModal } = useLogin();

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

const navItems = [
  { path: "/", label: "Home", icon: FaHome },
  { path: "/Counselling", label: "Counselling", icon: FaPhoneAlt },
  {
    path: "https://api.whatsapp.com/send?phone=919634333174",
    label: "WhatsApp",
    icon: FaWhatsapp,
    external: true, // Flag to know it's external
  },
];

  return (
    <nav
      className={`fixed bottom-0 w-full z-50 bg-white flex justify-around items-center shadow-[0_-2px_5px_rgba(0,0,0,0.1)] md:hidden transition-transform duration-300 ${
        isHidden ? "translate-y-full" : ""
      }`}
    >
      {/* Standard nav links */}
      {navItems.map(({ path, label, icon: Icon }) => {
        const isActive = pathname === path;
        return (
          <Link
            key={path}
            href={path}
            className="relative flex flex-col items-center justify-center w-full py-2"
          >
            {isActive && (
              <span className="absolute top-0 left-0 right-0 h-0.5 bg-[#1978CD] rounded-full"></span>
            )}
            <Icon
              className={`text-lg ${
                isActive ? "text-[#1978CD]" : "text-gray-600"
              }`}
            />
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

      {/* Profile Button */}
      <button
        onClick={() => {
          if (isLoggedIn) {
            router.push("/profile");
          } else {
            openModal("login");
          }
        }}
        className="relative flex flex-col items-center justify-center w-full py-2"
      >
        {pathname === "/profile" && (
          <span className="absolute top-0 left-0 right-0 h-0.5 bg-[#1978CD] rounded-full"></span>
        )}
        <FaUser
          className={`text-lg ${
            pathname === "/profile" ? "text-[#1978CD]" : "text-gray-600"
          }`}
        />
        <span
          className={`mt-2 text-[11px] ${
            pathname === "/profile" ? "text-[#1978CD]" : "text-gray-600"
          }`}
        >
          Profile
        </span>
      </button>
    </nav>
  );
};

export default BottomNav;
