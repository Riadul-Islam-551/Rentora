import PropertyEmpty from "@/components/reusable/PropertyEmpty";
import PropertyGrid from "@/components/owner/property/PropertyGrid";
import PropertyStats from "@/components/owner/property/PropertyState";
import RentoraLoader from "@/components/reusable/RentoraLoader";
import TotalPage from "@/components/reusable/TotalPage";
import { Button } from "@/components/ui/button";
import { getOwnerProperty } from "@/lib/api/property";
import { getLoggedInUser } from "@/lib/core/session";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const OwnerPropertyPage = async ({ searchParams }) => {
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

  const params = await searchParams;

  const page = Math.max(1, Number(params?.page) || 1);

  const response = await getOwnerProperty({
    ownerId: owner.id,
    page,
  });

  const properties = response?.data || [];

  const pagination = response?.pagination || {
    currentPage: page,
    pageSize: 10,
    totalProperties: 0,
    totalPages: 0,
  };

  return (
    <section className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="size-5 text-primary" />

            <p className="text-sm font-medium text-primary">Owner Dashboard</p>
          </div>

          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            My Properties
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and monitor all your rental properties.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/owner/addProperty">Add Property</Link>
        </Button>
      </div>

      {/* Stats */}
      <PropertyStats
        properties={properties}
        totalProperties={pagination.totalProperties}
      />

      {/* Properties */}
      {properties.length === 0 ? (
        <PropertyEmpty />
      ) : (
        <>
          <Suspense fallback={<RentoraLoader />}>
            <PropertyGrid properties={properties} />
          </Suspense>

          {/* Pagination */}
          <TotalPage
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        </>
      )}
    </section>
  );
};

export default OwnerPropertyPage;
