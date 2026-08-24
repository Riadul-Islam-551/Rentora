"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  LandPlot,
  LayoutDashboard,
} from "lucide-react";

const icons = {
  home: House,
  properties: LandPlot,
  dashboard: LayoutDashboard,
};

export default function ActiveNavLink({
  href,
  label,
  icon,
}) {
  const pathname = usePathname();

  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const Icon = icons[icon];

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`
        group relative flex items-center gap-2
        rounded-full px-4 py-2
        text-sm font-medium
        transition-all duration-200

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-2

        ${
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }
      `}
    >
      <Icon
        size={17}
        strokeWidth={isActive ? 2.5 : 2}
        className="transition-transform duration-200 group-hover:scale-105"
      />

      <span className="hidden md:block ">{label}</span>

      {isActive && (
        <span
          aria-hidden="true"
          className="
            absolute -bottom-1.75 left-1/2
            h-1 w-1
            -translate-x-1/2
            rounded-full
            bg-primary
          "
        />
      )}
    </Link>
  );
}