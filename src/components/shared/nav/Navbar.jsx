import Image from "next/image";
import Link from "next/link";

import rentoraLogo from "../../../app/assets/logo.png";

import { ModeToggle } from "./ModeToggle";
import ScrollNavWrapper from "./ScrollNavWrapper";
import MobileActions from "./MobileActions";

export default function Navbar() {
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
      <div className="flex items-center gap-2">
        {/* Desktop + Mobile actions/menu */}
        <MobileActions />{" "}
        {/* This remains completely independent from the menu */}
        <ModeToggle />
      </div>
    </ScrollNavWrapper>
  );
}
