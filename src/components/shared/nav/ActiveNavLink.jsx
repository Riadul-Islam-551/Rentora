"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { House, LandPlot, LayoutDashboard } from "lucide-react";

const icons = {
  home: House,
  properties: LandPlot,
  dashboard: LayoutDashboard,
};

export default function ActiveNavLink({ href, label, icon }) {
  const pathname = usePathname();

  const Icon = icons[icon];

  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`
        flex items-center gap-2
        rounded-full
        px-4 py-2
        text-sm
        font-medium
        transition-all
        ${
          active
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }
      `}
    >
      <Icon className="size-4" />
      <span className="hidden md:block">{label}</span>
    </Link>
  );
}
