import DashboardSidebar from "@/components/shared/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/shared/dashboard/DashboardNavbar";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { getLoggedInUser } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/");
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebar user={user} />

      <SidebarInset>
        <DashboardNavbar user={user} />

        <main className="min-h-[calc(100vh-4rem)] bg-background p-4 lg:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
