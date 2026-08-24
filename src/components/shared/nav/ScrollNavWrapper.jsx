"use client";

import { useEffect, useState } from "react";

export default function ScrollNavWrapper({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`
        sticky top-0 z-50 w-full
        border-b
        transition-all duration-300
        ${
          scrolled
            ? "border-border/60 bg-background/80 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-background"
        }
      `}
    >
      <div className="mx-auto flex min-h-[68px] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}