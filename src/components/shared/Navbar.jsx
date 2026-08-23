import Image from "next/image";
import rentoraLogo from "../../app/assets/logo.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import ScrollNavWrapper from "./ScrollNavWrapper";

export default function Navbar() {
  return (
    <ScrollNavWrapper>
      <div>
        <Image src={rentoraLogo} alt="rentora logo" width={40} height={40} />
      </div>

      <div className="flex gap-2">
        <Link href="/" className="cursor-pointer p-2">
          Home
        </Link>

        <Link href="/properties" className="cursor-pointer p-2">
          All Properties
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button>Log in</Button>
      </div>
    </ScrollNavWrapper>
  );
}
