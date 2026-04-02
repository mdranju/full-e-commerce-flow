"use client";

import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

export const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-40 lg:bottom-20 right-5 z-50 w-12 h-12 bg-[#0B1221] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-600 hover:scale-110 active:scale-95 transition-all duration-300 group ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
      <span className="absolute right-full mr-4 px-3 py-1 bg-[#0B1221] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Scroll To Top
      </span>
    </button>
  );
};
