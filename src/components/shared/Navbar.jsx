import Image from "next/image";
import React from "react";
import rentoraLogo from "../../app/assets/logo.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <section className="py-5 px-2  sticky shadow">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Image src={rentoraLogo} alt="rentora logo" width={40} height={40} />
        </div>
        <div className="flex gap-2">
          <Link href={"#"} className="p-2 cursor-pointer">
            Home
          </Link>
          <Link href={"#"} className="p-2 cursor-pointer">
            All Properties
          </Link>
        </div>
        <div>
          <ModeToggle></ModeToggle>
          <Button>Log in</Button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
