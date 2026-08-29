import PropertyGrid from "@/components/owner/property/PropertyGrid";
import { getProperty } from "@/lib/api/property";
import React from "react";
import PropertyFilters from "./PropertyFilters";
import TotalPage from "@/components/reusable/TotalPage";

const PropertyPage = async ({ searchParams }) => {
  const params = await searchParams;

  const page = Math.max(1, Number(params?.page) || 1);

  const search = params?.search || "";
  const propertyType = params?.propertyType || "";
  const sortPrice = params?.sortPrice || "";

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

  console.log("properties response:", response);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Properties</h1>

        <p className="text-sm text-muted-foreground">
          {pagination.totalProperties} properties found
        </p>
      </div>

      {/* Your filter component goes here */}
      <PropertyFilters></PropertyFilters>

      {/* Your PropertyGrid */}
      <PropertyGrid properties={properties} />
      <TotalPage
        currentPage={pagination?.currentPage}
        totalPages={pagination?.totalPages}
      ></TotalPage>
    </div>
  );
};

export default PropertyPage;
