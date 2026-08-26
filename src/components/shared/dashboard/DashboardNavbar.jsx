import Link from "next/link";
import Image from "next/image";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/shared/nav/ModeToggle";
import LogOutUser from "@/components/shared/authentication/LogOutUser";
import { AvatarWithBadge } from "@/components/shared/nav/AvatarWithDropDown";

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
      <SidebarTrigger />

      {/* Right */}
      <div className="flex items-center gap-3">
        <ModeToggle />
        <AvatarWithBadge user={user} />
      </div>
    </header>
  );
}
