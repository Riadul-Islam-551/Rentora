
import DashboardNavbar from "@/components/shared/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/shared/dashboard/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getLoggedInUser } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/");
  }

  return (
    <SidebarProvider defaultOpen>
      <DashboardSidebar user={user} />

      <SidebarInset>
        <DashboardNavbar user={user} />

        <main className="min-h-screen bg-muted/30 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
