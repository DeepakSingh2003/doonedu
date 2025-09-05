"use client"; // Needed in Next.js (App Router)

import React from "react";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottiePlayer = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
        <DotLottieReact
          src="https://lottie.host/e41b9b00-935b-4d4e-a5a0-4ecbc6d40d10/xcrZFet3b5.lottie"
          loop
          autoplay
          className="w-full h-auto"
        />
      </div>
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-block text-sm sm:text-base md:text-lg text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
        >
          Go back to the Homepage
        </Link>
      </div>
    </div>
  );
};

export default LottiePlayer;
