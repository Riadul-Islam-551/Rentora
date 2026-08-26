"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  User,
  Building2,
  Heart,
  CalendarDays,
  CreditCard,
  Users,
  Settings,
  Home,
  FileText,
} from "lucide-react";
import Image from "next/image";
import rentoraLogo from "@/app/assets/logo.png";

const roleLinks = {
  tenant: [
    {
      title: "Dashboard",
      href: "/dashboard/tenant",
      icon: LayoutDashboard,
    },
    {
      title: "My Rentals",
      href: "/dashboard/tenant/rentals",
      icon: Home,
    },
    {
      title: "Saved Properties",
      href: "/dashboard/tenant/saved",
      icon: Heart,
    },
    {
      title: "Bookings",
      href: "/dashboard/tenant/bookings",
      icon: CalendarDays,
    },
    {
      title: "Payments",
      href: "/dashboard/tenant/payments",
      icon: CreditCard,
    },
  ],

  owner: [
    {
      title: "Dashboard",
      href: "/dashboard/owner",
      icon: LayoutDashboard,
    },
    {
      title: "My Properties",
      href: "/dashboard/owner/properties",
      icon: Building2,
    },
    {
      title: "Add Property",
      href: "/dashboard/owner/newProperty",
      icon: FileText,
    },
    {
      title: "Bookings",
      href: "/dashboard/owner/bookings",
      icon: CalendarDays,
    },
    // {
    //   title: "Payments",
    //   href: "/dashboard/owner/payments",
    //   icon: CreditCard,
    // },
  ],

  admin: [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "Properties",
      href: "/dashboard/admin/properties",
      icon: Building2,
    },
    {
      title: "Reports",
      href: "/dashboard/admin/reports",
      icon: FileText,
    },
    {
      title: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
};

export default function DashboardSidebar({ user }) {
  const pathname = usePathname();

  const role = user?.role?.toLowerCase();

  const links = roleLinks[role] || [];

  const isActive = (href) => {
    // Dashboard must only be active on the exact dashboard route.
    if (
      href === "/dashboard/tenant" ||
      href === "/dashboard/owner" ||
      href === "/dashboard/admin"
    ) {
      return pathname === href;
    }

    // Other links remain active for nested routes.
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      {/* =================HEADER======================== */}
      <SidebarHeader className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              tooltip="Rentora"
              className="
                group-data-[collapsible=icon]:size-8!
                group-data-[collapsible=icon]:p-0!
                group-data-[collapsible=icon]:justify-center
              "
            >
              <Link href="/" className="flex items-center justify-start gap-2">
                {/* Logo */}
                <Image
                  src={rentoraLogo}
                  alt="Go to Home"
                  width={23}
                  height={23}
                ></Image>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate text-xs capitalize text-muted-foreground">
                    {role || "user"} dashboard
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ===========================CONTENT================== */}
      <SidebarContent>
        <SidebarGroup>
          {/* Hide group title when collapsed */}
          <SidebarGroupLabel
            className="
              group-data-[collapsible=icon]:hidden
            "
          >
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      tooltip={item.title}
                      className="
                        group-data-[collapsible=icon]:size-8!
                        group-data-[collapsible=icon]:p-0!
                        group-data-[collapsible=icon]:justify-center
                        my-1
                      "
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 w-full py-2 "
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ==============FOOTER=============================== */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Profile"
              isActive={pathname === `/dashboard/${role}/profile`}
              className="
                group-data-[collapsible=icon]:size-8!
                group-data-[collapsible=icon]:p-0!
                group-data-[collapsible=icon]:justify-center
              "
            >
              <Link href={`/dashboard/${role}/profile`}>
                <User className="size-4 shrink-0" />

                <span
                  className="
                    group-data-[collapsible=icon]:hidden
                  "
                >
                  Profile
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
