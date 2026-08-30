import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";

const FavoriteTable = ({ properties = [] }) => {
//   const getStatusClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return "bg-success/10 text-success border-success/20";

//       case "pending":
//         return "bg-warning/10 text-warning border-warning/20";

//       case "rejected":
//         return "bg-destructive/10 text-destructive border-destructive/20";

//       default:
//         return "bg-muted text-muted-foreground border-border";
//     }
//   };

  const formatRent = (rent) => {
    if (rent === undefined || rent === null) return "N/A";

    return `৳${Number(rent).toLocaleString("en-BD")}`;
  };

  const formatSize = (size) => {
    if (size === undefined || size === null) return "N/A";

    return `${Number(size).toLocaleString("en-BD")} sq ft`;
  };

  if (!properties.length) {
    return (
      <div className="flex min-h-[280px] w-full flex-col items-center justify-center rounded-xl border border-dashed bg-card p-6 text-center">
        <Heart className="mb-3 size-10 text-muted-foreground" />

        <h3 className="text-lg font-semibold">No Favorite Properties</h3>

        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          You haven&apos;t added any properties to your favorites yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* =====================================================
          DESKTOP / LARGE SCREEN TABLE HEADER
          ===================================================== */}

      <div
        className="
          hidden
          lg:grid
          lg:grid-cols-[70px_2fr_1.4fr_1fr_1.2fr_1fr_1fr]
          items-center
          gap-4
          rounded-t-xl
          border
          border-b-0
          bg-muted
          px-5
          py-3
          text-center
          text-sm
          font-semibold
          text-muted-foreground
        "
      >
        <div>Image</div>
        <div>Property</div>
        <div>Location</div>
        <div>Type</div>
        <div>Rent</div>
        <div>Size</div>
        <div>Actions</div>
      </div>

      {/* =====================================================
          PROPERTIES
          ===================================================== */}

      {properties.map((property) => (
        <div
          key={property._id}
          className="
            border
            border-b-0
            bg-card
            transition-colors
            hover:bg-muted/20
          "
        >
          {/* =================================================
              DESKTOP / LARGE SCREEN
              TABLE-LIKE ROW
              ================================================= */}

          <div
            className="
              hidden
              lg:grid
              lg:grid-cols-[70px_2fr_1.4fr_1fr_1.2fr_1fr_1fr]
              items-center
              gap-4
              px-5
              py-4
            "
          >
            {/* IMAGE */}

            <div className="flex justify-center">
              <div className="relative size-14 overflow-hidden rounded-lg bg-muted">
                {property.bannerImage ? (
                  <Image
                    src={property.bannerImage}
                    alt={property.title || "Property"}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <Heart className="size-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>

            {/* PROPERTY */}

            <div className="min-w-0">
              <p className="truncate font-medium text-foreground">
                {property.title || "Untitled Property"}
              </p>

              {property.extraFeature && (
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {property.extraFeature}
                </p>
              )}
            </div>

            {/* LOCATION */}

            <div className="min-w-0">
              <p className="break-words text-sm text-muted-foreground">
                {property.location || "N/A"}
              </p>
            </div>

            {/* TYPE */}

            <div>
              <span className="text-sm text-foreground">
                {property.propertyType || "N/A"}
              </span>
            </div>

            {/* RENT */}

            <div>
              <p className="text-sm font-medium text-foreground">
                {formatRent(property.rent)}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {property.rentType || "N/A"}
              </p>
            </div>

            {/* SIZE */}

            <div>
              <p className="text-sm text-muted-foreground">
                {formatSize(property.propertySize)}
              </p>
            </div>

            {/* ACTIONS */}

            <div className="flex justify-center">
              <Button variant="outline" size="xs"
              >
                Remove Favorite
              </Button>
            </div>
          </div>

          {/* =================================================
              MOBILE / TABLET
              RESPONSIVE PROPERTY CARD
              ================================================= */}

          <div className="lg:hidden p-4 sm:p-5">
            {/* PROPERTY HEADER */}

            <div className="flex items-start gap-3 border-b pb-4">
              {/* IMAGE */}

              <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-24">
                {property.bannerImage ? (
                  <Image
                    src={property.bannerImage}
                    alt={property.title || "Property"}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <Heart className="size-6 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* TITLE */}

              <div className="min-w-0 flex-1">
                <h3 className="wrap-break-words font-semibold text-foreground">
                  {property.title || "Untitled Property"}
                </h3>

                <p className="mt-1 wrap-break-words text-sm text-muted-foreground">
                  {property.location || "N/A"}
                </p>

                {property.extraFeature && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {property.extraFeature}
                  </p>
                )}
              </div>

              {/* ACTIONS */}

              <div className="shrink-0">
                 <Button variant="outline" size="xs"
              >
                Remove Favorite
              </Button>
              </div>
            </div>

            {/* PROPERTY INFORMATION */}

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {/* PROPERTY TYPE */}

              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Property Type
                </p>

                <p className="wrap-break-words text-sm text-foreground">
                  {property.propertyType || "N/A"}
                </p>
              </div>

              {/* RENT */}

              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Rent
                </p>

                <p className="text-sm font-medium text-foreground">
                  {formatRent(property.rent)}
                </p>

                <p className="text-xs text-muted-foreground">
                  {property.rentType || ""}
                </p>
              </div>

              {/* SIZE */}

              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Property Size
                </p>

                <p className="wrap-break-words text-sm text-foreground">
                  {formatSize(property.propertySize)}
                </p>
              </div>

              {/* BATHROOMS */}

              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Bathrooms
                </p>

                <p className="text-sm text-foreground">
                  {property.bathrooms ?? "N/A"}
                </p>
              </div>

              {/* LOCATION */}

              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Location
                </p>

                <p className="wrap-break-words text-sm text-foreground">
                  {property.location || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* =====================================================
          TOTAL FAVORITES
          ===================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          rounded-b-xl
          border
          bg-muted/30
          px-5
          py-3
        "
      >
        <span className="text-sm font-medium">Total Favorites</span>

        <span className="text-sm font-bold">{properties.length}</span>
      </div>
    </div>
  );
};

export default FavoriteTable;
