"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PropertyFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const propertyType = searchParams.get("propertyType") || "";

  const sortPrice = searchParams.get("sortPrice") || "";

  // Search with a small debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      // Reset pagination when search changes
      params.delete("page");

      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Always go back to page 1
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearch("");

    router.push(pathname);
  };

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            placeholder="Search by title or location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {/* Property Type */}
        <select
          value={propertyType}
          onChange={(event) => updateFilter("propertyType", event.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">All Property Types</option>

          <option value="Apartment">Apartment</option>

          <option value="House">House</option>

          <option value="Triplex">Triplex</option>

          <option value="Duplex">Duplex</option>

          <option value="Villa">Villa</option>

          <option value="Commercial">Commercial</option>
        </select>

        {/* Price */}
        <select
          value={sortPrice}
          onChange={(event) => updateFilter("sortPrice", event.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Sort by Price</option>

          <option value="asc">Price: Low to High</option>

          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {(search || propertyType || sortPrice) && (
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
