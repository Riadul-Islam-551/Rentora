import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/core/session";

export default async function DashboardPage() {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/");
  }

  const role = user.role?.toLowerCase();

  if (role === "tenant") {
    redirect("/dashboard/tenant");
  }

  if (role === "owner") {
    redirect("/dashboard/owner");
  }

  if (role === "admin") {
    redirect("/dashboard/admin");
  }

  redirect("/");
}
