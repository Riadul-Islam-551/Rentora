import PropertyCard from "@/components/reusable/PropertyCard";
import { Button } from "@/components/ui/button";
import { getOwnerProperty } from "@/lib/api/property";
import { getLoggedInUser } from "@/lib/core/session";
import { Building2 } from "lucide-react";
import Link from "next/link";

const OwnerPropertyPage = async () => {
  const owner = await getLoggedInUser();

  if (!owner) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-muted-foreground">
          Please login to view your properties.
        </p>
      </div>
    );
  }

  const response = await getOwnerProperty(owner.id);

  const properties = response?.data || [];
  console.log("properties", properties)

  return (
    <section className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="size-5 text-primary" />

            <p className="text-sm font-medium text-primary">
              Owner Dashboard
            </p>
          </div>

          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            My Properties
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and monitor all your rental properties.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/owner/addProperty">
            Add Property
          </Link>
        </Button>
      </div>

      {/* Property Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Total Properties
          </p>

          <p className="mt-1 text-2xl font-bold">
            {properties.length}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Approved
          </p>

          <p className="mt-1 text-2xl font-bold text-success">
            {
              properties?.filter(
                (property) =>
                  property.status?.toLowerCase() === "approved"
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Pending
          </p>

          <p className="mt-1 text-2xl font-bold text-warning">
            {
              properties?.filter(
                (property) =>
                  property.status?.toLowerCase() === "pending"
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Rejected
          </p>

          <p className="mt-1 text-2xl font-bold text-error">
            {
              properties?.filter(
                (property) =>
                  property.status?.toLowerCase() === "rejected"
              ).length
            }
          </p>
        </div>
      </div>

      {/* Properties */}
      {properties.length === 0 ? (
        <div className="flex min-h-87.5 flex-col items-center justify-center rounded-xl border border-dashed bg-card/50 p-8 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
            <Building2 className="size-7 text-primary" />
          </div>

          <h2 className="text-lg font-semibold">
            No properties yet
          </h2>

          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            You haven&apos;t added any rental properties yet. Start by
            adding your first property.
          </p>

          <Button asChild className="mt-5">
            <Link href="/dashboard/owner/properties/new">
              Add Your First Property
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {properties?.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default OwnerPropertyPage;