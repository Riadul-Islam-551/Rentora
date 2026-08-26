import Link from "next/link";
import Image from "next/image";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/shared/nav/ModeToggle";
import LogOutUser from "@/components/shared/authentication/LogOutUser";
import { AvatarWithBadge } from "@/components/shared/nav/AvatarWithBadge";

import rentoraLogo from "@/app/assets/logo.png";

export default function DashboardNavbar({ user }) {
  const role = user?.role?.toLowerCase();

  const dashboardHref =
    role === "tenant"
      ? "/dashboard/tenant"
      : role === "owner"
      ? "/dashboard/owner"
      : "/dashboard/admin";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <Link href={dashboardHref} className="flex items-center gap-2">
          <Image
            src={rentoraLogo}
            alt="Rentora"
            width={34}
            height={34}
            className="object-contain"
          />

          <div className="hidden sm:block">
            <h2 className="font-semibold leading-none">
              Rentora
            </h2>

            <p className="mt-1 text-xs capitalize text-muted-foreground">
              {role} dashboard
            </p>
          </div>
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <ModeToggle />

        <LogOutUser />

        <AvatarWithBadge user={user} />
      </div>
    </header>
  );
}