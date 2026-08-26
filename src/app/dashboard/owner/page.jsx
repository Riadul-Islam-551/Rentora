import { getLoggedInUser } from "@/lib/core/session";

export default async function OwnerDashboard() {
  const user = await getLoggedInUser();

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Owner Dashboard</p>

        <h1 className="text-3xl font-bold">Welcome, {user?.name || "Owner"}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="My Properties" value="8" />

        <DashboardCard title="Active Bookings" value="14" />

        <DashboardCard title="Monthly Revenue" value="$8,450" />

        <DashboardCard title="Pending Requests" value="5" />
      </div>
    </section>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <p className="text-sm text-muted-foreground">{title}</p>

      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
