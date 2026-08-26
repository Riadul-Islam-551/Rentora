import { getLoggedInUser } from "@/lib/core/session";

export default async function AdminDashboard() {
  const user = await getLoggedInUser();

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Admin Dashboard</p>

        <h1 className="text-3xl font-bold">Welcome, {user?.name || "Admin"}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Total Users" value="1,245" />

        <DashboardCard title="Properties" value="438" />

        <DashboardCard title="Active Rentals" value="289" />

        <DashboardCard title="Reports" value="17" />
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
