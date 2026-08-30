"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialPropertyType = searchParams.get("propertyType") || "";
  const initialSortPrice = searchParams.get("sortPrice") || "";

  const [search, setSearch] = useState(initialSearch);
  const [propertyType, setPropertyType] = useState(initialPropertyType);
  const [sortPrice, setSortPrice] = useState(initialSortPrice);

  const handleSearch = () => {
    const params = new URLSearchParams();

    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      params.set("search", trimmedSearch);
    }

    if (propertyType) {
      params.set("propertyType", propertyType);
    }

    if (sortPrice) {
      params.set("sortPrice", sortPrice);
    }

    params.set("page", "1");

    const query = params.toString();

    router.push(`/properties?${query}`);
  };

  const clearFilters = () => {
    setSearch("");
    setPropertyType("");
    setSortPrice("");

    router.push("/properties");
  };

  const hasFilters =
    Boolean(search.trim()) || Boolean(propertyType) || Boolean(sortPrice);

  return (
    <div className="w-full rounded-xl border bg-card p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
        {/* ==========SEARCH============== */}

        <div className="w-full lg:col-span-2">
          <Input
            type="search"
            placeholder="Search by title or location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {/* ====================PROPERTY TYPE============== */}

        <div className="w-full">
          <Select value={propertyType} onValueChange={setPropertyType}>
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
        </div>

        {/* ==================PRICE=============== */}

        <div className="w-full">
          <Select value={sortPrice} onValueChange={setSortPrice}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="asc">Price: Low to High</SelectItem>

              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* =============SEARCH BUTTON========== */}

        <div className="flex w-full gap-2">
          <Button type="button" className="flex-1" onClick={handleSearch}>
            Search
          </Button>

          {hasFilters && (
            <Button type="button" variant="outline" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
