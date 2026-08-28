import PropertyTable from "@/components/admin/propertyTable";
import RentoraLoader from "@/components/reusable/RentoraLoader";
import TotalPage from "@/components/reusable/TotalPage";
import { getProperty } from "@/lib/api/property";
import React from "react";
import { Suspense } from "react";

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
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Properties</h1>

        <p className="text-sm text-muted-foreground">
          Manage and view all your properties.
        </p>
      </div>

      {/* Responsive Table */}
      <Suspense fallback={<RentoraLoader></RentoraLoader>}>
        <PropertyTable
          properties={properties}
          pagination={pagination}
        ></PropertyTable>
      </Suspense>
      <TotalPage
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      ></TotalPage>
    </div>
  );
};

export default PropertyPage;
