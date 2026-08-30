import { getProperty } from "@/lib/api/property";
import React from "react";
import PublicPropertyGrid from "../reusable/PublicPropertyGrid";

const FeaturedProperties = async () => {
  const response = await getProperty();
  const properties = response?.data?.slice(0, 6) || [];
  console.log("home properties", properties);
  return (
    <div className="py-24 container mx-auto px-3">
      <h1 className="text-3xl text-primary font-bold text-center mb-9">
        Popular Rental Destinations
      </h1>
      <PublicPropertyGrid properties={properties}></PublicPropertyGrid>
    </div>
  );
};

export default FeaturedProperties;
