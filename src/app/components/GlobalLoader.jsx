"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function GlobalLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // show loader when route changes
    setLoading(true);

    // small delay feels smooth + avoids flicker
    const t = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(t);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] backdrop-blur-md bg-black/40 flex items-center justify-center">
      <div className="bg-white px-6 py-4 rounded-2xl shadow-lg text-lg font-semibold flex items-center gap-3">
        <span className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></span>
        Loading… Please wait
      </div>
    </div>
  );
}
