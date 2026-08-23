import Image from "next/image";
import rentoraLogo from "../../app/assets/logo.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <section className="sticky top-0 z-50 px-2 py-5 shadow bg-background ">
      <div className="container mx-auto flex items-center justify-between">
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
      </div>
    </section>
  );
}
