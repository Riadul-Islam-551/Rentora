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
      href: "/dashboard/owner/properties/new",
      icon: FileText,
    },
    {
      title: "Bookings",
      href: "/dashboard/owner/bookings",
      icon: CalendarDays,
    },
    {
      title: "Payments",
      href: "/dashboard/owner/payments",
      icon: CreditCard,
    },
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
    if (
      href === "/dashboard/tenant" ||
      href === "/dashboard/owner" ||
      href === "/dashboard/admin"
    ) {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="px-2 py-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Rentora
          </p>

          <h3 className="mt-1 text-lg font-bold capitalize">{role} Panel</h3>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

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
                    >
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Profile"
              isActive={pathname === `/dashboard/${role}/profile`}
            >
              <Link href={`/dashboard/${role}/profile`}>
                <User />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
