"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "../../ui/button";
import { LoginPage } from "../authentication/Login";
import { BusinessAccountPage } from "../authentication/BusinessAccount";

export default function MobileActions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Desktop Actions */}
      <div className="hidden items-center gap-2 md:flex">
        <ActionButtons />
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Mobile Dropdown */}
      <div
        className={`
          absolute right-0 top-12 z-50 w-64
          rounded-xl border border-border
          bg-background p-2 shadow-lg
          transition-all duration-200
          md:hidden
          ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 pointer-events-none opacity-0"
          }
        `}
      >
        <ActionButtons
          orientation="vertical"
          onAction={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}

function ActionButtons({ orientation = "horizontal", onAction }) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={isVertical ? "flex flex-col gap-2" : "flex items-center gap-2"}
    >
      {/* Create business account */}
      <BusinessAccountPage
        trigger={
          <Button
            variant="outline"
            className={isVertical ? "w-full justify-start" : ""}
            onClick={onAction}
          >
            Create Business Account
          </Button>
        }
      />
      
      {/* Login */}
      <LoginPage
        trigger={
          <Button
            className={isVertical ? "w-full justify-start" : ""}
            onClick={onAction}
          >
            Log in
          </Button>
        }
      />

      {/* Create Business Account */}
      {/* <Button
        className={isVertical ? "w-full justify-start" : ""}
        onClick={onAction}
      >
        Create Business Account
      </Button> */}
    </div>
  );
}
