import Image from "next/image";
import Link from "next/link";
import rentoraLogo from "../../../app/assets/logo.png";
import { ModeToggle } from "./ModeToggle";
import ScrollNavWrapper from "./ScrollNavWrapper";
import MobileActions from "./MobileActions";
import ActiveNavLink from "./ActiveNavLink";
import { getLoggedInUser } from "@/lib/core/session";
import { AvatarWithBadge } from "./AvatarWithDropDown";

export default async function Navbar() {
  const user = await getLoggedInUser();

  const role = user?.role?.toLowerCase();
  // * Get the correct dashboard URL based on the
  const dashboardHref =
    role === "tenant"
      ? "/dashboard/tenant"
      : role === "owner"
        ? "/dashboard/owner"
        : role === "admin"
          ? "/dashboard/admin"
          : null;

  /*** Public navigation. */
  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: "home",
    },
    {
      href: "/properties",
      label: "Properties",
      icon: "properties",
    },

    // Only logged-in users get Dashboard.
    ...(dashboardHref
      ? [
          {
            href: dashboardHref,
            label: "Dashboard",
            icon: "dashboard",
          },
        ]
      : []),
  ];

  return (
    <ScrollNavWrapper>
      <header
        className="
          flex w-full items-center justify-between
          gap-3 px-1 md:px-3
        "
      >
        {/* ===============LOGO=============================== */}
        <Link
          href="/"
          aria-label="Rentora home"
          className="
            flex shrink-0 items-center
            transition-opacity hover:opacity-80
          "
        >
          <Image
            src={rentoraLogo}
            alt="Rentora logo"
            width={42}
            height={42}
            priority
            className="h-10 w-10 object-contain"
          />
        </Link>

        {/* ====================NAVIGATION======================= */}
        <nav
          aria-label="Main navigation"
          className="
            flex items-center gap-1
            rounded-full
            border border-border/60
            bg-background/70
            p-1
            shadow-sm
            backdrop-blur-md
          "
        >
          {navItems.map((item) => (
            <ActiveNavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </nav>

        {/* ============= ACTIONS============ */}
        <div className="flex shrink-0 items-center gap-2">
          <ModeToggle />
          {user ? (
            <>
              <AvatarWithBadge user={user} />
            </>
          ) : (
            <MobileActions />
          )}
        </div>
      </header>
    </ScrollNavWrapper>
  );
}
