"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="flex w-full flex-col gap-3 rounded-xl border bg-card p-4 md:flex-row md:items-center">
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-4">
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

        <Select
          value={propertyType}
          onValueChange={(value) => updateFilter("propertyType", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Property Types" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Apartment">Apartment</SelectItem>

            <SelectItem value="House">House</SelectItem>

            <SelectItem value="Triplex">Triplex</SelectItem>

            <SelectItem value="Duplex">Duplex</SelectItem>

            <SelectItem value="Villa">Villa</SelectItem>

            <SelectItem value="Commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>

        {/* Price */}

        <Select
          value={sortPrice}
          onValueChange={(value) => updateFilter("sortPrice", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="asc">Price: Low to High</SelectItem>

            <SelectItem value="desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}

      {hasFilters && (
        <div>
          <Button
            className="w-full md:w-auto"
            variant="outline"
            size="sm"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
