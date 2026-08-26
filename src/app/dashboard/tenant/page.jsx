import { getLoggedInUser } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function TenantDashboard() {
  const user = await getLoggedInUser();

  if (user?.role?.toLowerCase() !== "tenant") {
    redirect("/");
  }

  return (
    <section>
      <p className="text-sm text-muted-foreground">
        Tenant Dashboard
      </p>

      <h1 className="mt-1 text-3xl font-bold">
        Welcome, {user.name}
      </h1>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="My Rentals" value="3" />
        <Card title="Saved Properties" value="12" />
        <Card title="Bookings" value="5" />
        <Card title="Payments" value="$420" />
      </div>
    </section>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        {value}
      </h3>
    </div>
  );
}