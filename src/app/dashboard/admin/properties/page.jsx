import PropertyTable from "@/components/admin/propertyTable";
import PropertyFilters from "@/components/reusable/PropertyFilters";
import RentoraLoader from "@/components/reusable/RentoraLoader";
import TotalPage from "@/components/reusable/TotalPage";
import { getProperty } from "@/lib/api/property";
import React from "react";
import { Suspense } from "react";

const AdminPropertyPage = async ({ searchParams }) => {
  const params = await searchParams;

  // -----------------------------
  // Pagination
  // -----------------------------
  const page = Math.max(1, Number(params?.page) || 1);

  // -----------------------------
  // Filters
  // -----------------------------
  const search = typeof params?.search === "string" ? params.search : "";

  const propertyType =
    typeof params?.propertyType === "string" ? params.propertyType : "";

  const sortPrice =
    typeof params?.sortPrice === "string" ? params.sortPrice : "";

  const status = typeof params?.status === "string" ? params.status : "";

  // -----------------------------
  // Fetch properties
  // -----------------------------
  const response = await getProperty({
    page,
    search,
    propertyType,
    sortPrice,
    status,
  });

  const properties = response?.data || [];

  // -----------------------------
  // Pagination fallback
  // -----------------------------
  const pagination = response?.pagination || {
    currentPage: page,
    pageSize: 10,
    totalProperties: 0,
    totalPages: 0,
  };

  return (
    <div className="w-full max-w-full min-w-0 space-y-6 overflow-hidden">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Properties</h1>

        <p className="text-sm text-muted-foreground">
          {pagination.totalProperties} properties found
        </p>
      </div>

      <PropertyFilters></PropertyFilters>

      {/* Property Table */}
      <Suspense fallback={<RentoraLoader />}>
        <PropertyTable properties={properties} pagination={pagination} />
      </Suspense>

      {/* Pagination */}
      <TotalPage
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    </div>
  );
};

export default AdminPropertyPage;
