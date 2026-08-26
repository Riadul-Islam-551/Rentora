"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ScrollNavWrapper({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className={cn(
        "z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled
          ? "fixed inset-x-0 top-0 flex justify-center px-2 pt-2"
          : "sticky top-0 px-2 py-4 md:py-5",
      )}
    >
      <div
        className={cn(
          "w-full transition-all duration-300 ease-in-out",
          !isScrolled && "mx-auto max-w-7xl",

          // Floating navbar
          isScrolled && [
            "max-w-7xl",
            "rounded-full",
            "border",
            "border-border/60",
            "bg-background/80",
            "px-3",
            "py-2",
            "shadow-lg",
            "backdrop-blur-xl",
            "supports-[backdrop-filter]:bg-background/60",
          ],
        )}
      >
        {children}
      </div>
    </section>
  );
}
