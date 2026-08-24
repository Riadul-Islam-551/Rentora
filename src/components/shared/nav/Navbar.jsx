import Image from "next/image";
import Link from "next/link";

import rentoraLogo from "../../../app/assets/logo.png";

import { ModeToggle } from "./ModeToggle";
import ScrollNavWrapper from "./ScrollNavWrapper";
import MobileActions from "./MobileActions";

import { getLoggedInUser, logOutUser } from "@/lib/core/session";
import ActiveNavLink from "./ActiveNavLink";
import { Button } from "@/components/ui/button";
import LogOutUser from "../authentication/LogOutUser";

export default async function Navbar() {
  const user = await getLoggedInUser();
  console.log("log in user", user);

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
    ...(user
      ? [
          {
            href: "/dashboard",
            label: "Dashboard",
            icon: "dashboard",
          },
        ]
      : []),
  ];

  return (
    <ScrollNavWrapper>
      <header className="flex w-full items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Rentora home"
          className="shrink-0 transition-opacity hover:opacity-80"
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

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="
           flex items-center gap-1
            rounded-full border border-border/60
            bg-background/60 p-1
            shadow-sm backdrop-blur-md
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

        {/* Right Actions */}
        <div className="flex lg:flex-row-reverse  shrink-0 items-center gap-2">
          <ModeToggle />
          {user ? <LogOutUser></LogOutUser> : <MobileActions />}
        </div>
      </header>
    </ScrollNavWrapper>
  );
}
