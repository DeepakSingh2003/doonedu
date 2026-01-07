"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import Navbar from "./Navbar";
import SubNavbar from "./Subnav";
import Footer from "./footer";
import Popuplogin from "./PopupLogin";
import { ToastContainer } from "react-toastify";

export default function PreviewWrapper({ children }) {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") !== null;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
