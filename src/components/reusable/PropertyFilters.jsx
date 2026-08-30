"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PropertyFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /*
   * Get current URL values
   */
  const urlSearch = searchParams.get("search") || "";
  const propertyType = searchParams.get("propertyType") || "";
  const sortPrice = searchParams.get("sortPrice") || "";

  /*
   * Local state is only needed for the search input.
   */
  const [search, setSearch] = useState(urlSearch);

  /*
   * Create a stable string representation of
   * the current query parameters.
   */
  const currentQuery = searchParams.toString();

  /*
   * Debounced search
   */
  useEffect(() => {
    const trimmedSearch = search.trim();

    /*
     * Don't update the URL when the input
     * already matches the URL.
     */
    if (trimmedSearch === urlSearch) {
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(currentQuery);

      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      } else {
        params.delete("search");
      }

      /*
       * Search/filter changes should always
       * start from page 1.
       */
      params.delete("page");

      const query = params.toString();

      router.push(query ? `${pathname}?${query}` : pathname);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, urlSearch, currentQuery, pathname, router]);

  /*
   * Update select filters immediately.
   */
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(currentQuery);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    /*
     * Reset pagination whenever a filter changes.
     */
    params.delete("page");

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  /*
   * Clear all filters.
   */
  const clearFilters = () => {
    setSearch("");
    router.push(pathname);
  };

  const hasFilters =
    Boolean(search.trim()) || Boolean(propertyType) || Boolean(sortPrice);

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center  gap-3  rounded-xl border bg-card p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 flex-1 ">
        {/* Search */}

        <div className="w-full md:col-span-2">
          <Input
            type="search"
            placeholder="Search by title or location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {/* Property Type */}

        <select
          value={propertyType}
          onChange={(event) => updateFilter("propertyType", event.target.value)}
          className="
            h-10
            w-full
            rounded-md
            border
            border-input
            bg-background
            px-3
            text-sm
            outline-none
            focus:ring-2
            focus:ring-ring
          "
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
          className="
            h-10
            w-full
            rounded-md
            border
            border-input
            bg-background
            px-3
            text-sm
            outline-none
            focus:ring-2
            focus:ring-ring
          "
        >
          <option value="">Sort by Price</option>

          <option value="asc">Price: Low to High</option>

          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Clear Filters */}

      {hasFilters && (
        <div className="">
          <Button className="w-full md:w-auto" variant="outline" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
