"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ScrollNavWrapper({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={cn(
        "sticky top-0 z-50 px-2 transition-all duration-300 ease-in-out",
        isScrolled ? "py-3" : "py-5",
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-center transition-all duration-200 ease-in-out",
          isScrolled
            ? "container fixed flex items-center justify-center  max-w-container rounded-full border bg-background/60 px-7 py-2 shadow-lg backdrop-blur-md"
            : "container bg-background px-2 py-0 shadow-none",
        )}
      >
        {children}
      </div>
    </section>
  );
}
