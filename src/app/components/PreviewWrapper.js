"use client";
import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import Navbar from "./Navbar";
import SubNavbar from "./Subnav";
import Footer from "./footer";
import Popuplogin from "./PopupLogin";
import { ToastContainer } from "react-toastify";

export default function PreviewWrapper({ children }) {
  const [isPreview, setIsPreview] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check for preview mode on client side only
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsPreview(params.get("preview") !== null);
    }
  }, []);

  if (!isClient) {
    return (
      <>
        <Navbar />
        <div className="pt-14 sm:pt-16">
          <SubNavbar />
        </div>
        {children}
        <Popuplogin />
        <ToastContainer />
        <Footer />
        <BottomNav />
      </>
    );
  }

  return (
    <>
      {!isPreview && (
        <>
          <Navbar />
          <div className="pt-14 sm:pt-16">
            <SubNavbar />
          </div>
        </>
      )}
      {children}
      {!isPreview && (
        <>
          <Popuplogin />
          <ToastContainer />
          <Footer />
          <BottomNav />
        </>
      )}
    </>
  );
}
