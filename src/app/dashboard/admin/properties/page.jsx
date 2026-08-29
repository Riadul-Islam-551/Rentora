import PropertyTable from "@/components/admin/propertyTable";
import RentoraLoader from "@/components/reusable/RentoraLoader";
import TotalPage from "@/components/reusable/TotalPage";
import { getProperty } from "@/lib/api/property";
import React from "react";

const PropertyPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page) || 1);
  const response = await getProperty(page);

  const properties = response?.data || [];
  const pagination = response?.pagination || {
    currentPage: page,
    pageSize: 10,
    totalProperties: 0,
    totalPages: 0,
  };

  return (
    /* max-w-full and min-w-0 stop the parent layout from expanding */
    <div className="w-full max-w-full min-w-0 space-y-6 overflow-hidden">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
        <p className="text-sm text-muted-foreground">
          Manage and view all your properties.
        </p>
      </div>

      {/* Responsive Table Container */}
      <PropertyTable
        properties={properties}
        pagination={pagination}
      />

      <TotalPage
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    </div>
  );
};

export default PropertyPage;