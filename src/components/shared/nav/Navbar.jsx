import Image from "next/image";
import Link from "next/link";

import rentoraLogo from "../../../app/assets/logo.png";

import { ModeToggle } from "./ModeToggle";
import ScrollNavWrapper from "./ScrollNavWrapper";
import MobileActions from "./MobileActions";
import { getLoggedInUser } from "@/lib/core/session";

export default async function Navbar() {
  const user = await getLoggedInUser();
  console.log("logged in user", user);
  return (
    <ScrollNavWrapper>
      {/* Logo */}
      <div>
        <Image src={rentoraLogo} alt="Rentora logo" width={40} height={40} />
      </div>

      {/* Navigation */}
      <nav className="flex gap-2">
        <Link href="/" className="cursor-pointer p-2">
          Home
        </Link>

        <Link href="/properties" className="cursor-pointer p-2">
          All Properties
        </Link>
      </nav>

      {/* Right Actions */}
      <div className="flex md:flex-row-reverse items-center gap-2">
        {/* This remains completely independent from the menu */}
        <ModeToggle />
        {/* Desktop + Mobile actions/menu */}
        <MobileActions />{" "}
      </div>
    </ScrollNavWrapper>
  );
}
