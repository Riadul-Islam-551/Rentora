import React from "react";

import { getProperty } from "@/lib/api/property";

import PropertyGrid from "@/components/owner/property/PropertyGrid";
import PropertyFilters from "../../../components/reusable/PropertyFilters";
import TotalPage from "@/components/reusable/TotalPage";
import { Suspense } from "react";
import RentoraLoader from "@/components/reusable/RentoraLoader";

const PropertyPage = async ({ searchParams }) => {
  const params = await searchParams;

  const page = Math.max(1, Number(params?.page) || 1);

  const search = typeof params?.search === "string" ? params.search : "";

  const propertyType =
    typeof params?.propertyType === "string" ? params.propertyType : "";

  const sortPrice =
    typeof params?.sortPrice === "string" ? params.sortPrice : "";

  const response = await getProperty({
    page,
    search,
    propertyType,
    sortPrice,
  });

  const properties = response?.data || [];

  const pagination = response?.pagination || {
    currentPage: page,
    pageSize: 10,
    totalProperties: 0,
    totalPages: 0,
  };

  return (
    <div className="container mx-auto mt-9 mb-24  min-w-0 space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold">Properties</h1>

        <p className="text-sm text-muted-foreground">
          {pagination.totalProperties} properties found
        </p>
      </div>

      {/* Filters */}

      <PropertyFilters />

      {/* Properties */}
      <Suspense fallback={<RentoraLoader></RentoraLoader>}>
        {" "}
        <PropertyGrid properties={properties} />
      </Suspense>

      {/* Pagination */}

      <TotalPage
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    </div>
  );
};

export default PropertyPage;
