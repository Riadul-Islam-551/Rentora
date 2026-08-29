import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  MoreVertical,
  Eye,
  CheckCircle2,
  XCircle,
  Trash2,
  Calendar,
} from "lucide-react";

const PropertyGrid = ({ properties = [] }) => {
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 capitalize">
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 capitalize animate-pulse">
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 capitalize">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary" className="capitalize">{status}</Badge>;
    }
  };

  if (!properties.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center bg-card">
        <Building2 className="h-10 w-10 text-muted-foreground mb-3" />
        <h3 className="font-semibold text-lg">No Properties Found</h3>
        <p className="text-sm text-muted-foreground">There are currently no property listings to display.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {properties.map((property) => (
          <div
            key={property._id}
            className="group relative flex flex-col justify-between rounded-2xl border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20"
          >
            {/* Top Image & Badge Header */}
            <div>
              <div className="relative h-44 w-full overflow-hidden rounded-xl bg-muted">
                {property.bannerImage ? (
                  <Image
                    src={property.bannerImage}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-secondary">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                
                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {getStatusBadge(property.status)}
                </div>

                <div className="absolute top-3 right-3">
                  <Badge className="bg-background/90 text-foreground backdrop-blur-md font-medium shadow-sm">
                    {property.propertyType}
                  </Badge>
                </div>
              </div>

              {/* Title & Location */}
              <div className="mt-3.5 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="font-semibold text-base line-clamp-1 text-foreground"
                    title={property.title}
                  >
                    {property.title}
                  </h3>
                  
                  {/* Options Menu */}
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 -mr-2 -mt-1">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer gap-2">
                        <Eye className="h-4 w-4" /> View Details
                      </DropdownMenuItem>

                      {property.status.toLowerCase() === "pending" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer gap-2 text-emerald-600">
                            <CheckCircle2 className="h-4 w-4" /> Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer gap-2 text-rose-600">
                            <XCircle className="h-4 w-4" /> Reject
                          </DropdownMenuItem>
                        </>
                      )}

                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive">
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="line-clamp-1">{property.location}</span>
                </div>
              </div>

              {/* Specs Pills */}
              <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 p-2.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5" title="Bedrooms">
                  <Bed className="h-3.5 w-3.5 text-foreground" />
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className="h-3 w-px bg-border" />
                <div className="flex items-center gap-1.5" title="Bathrooms">
                  <Bath className="h-3.5 w-3.5 text-foreground" />
                  <span>{property.bathrooms} Baths</span>
                </div>
                <div className="h-3 w-px bg-border" />
                <div className="flex items-center gap-1.5" title="Property Size">
                  <Maximize2 className="h-3 w-3 text-foreground" />
                  <span>{property.propertySize} sqft</span>
                </div>
              </div>
            </div>

            {/* Bottom Price & Approval Action Footer */}
            <div className="mt-4 border-t pt-3 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground block">Rent</span>
                  <span className="text-lg font-bold text-foreground">
                    ৳{property.rent?.toLocaleString()}
                    <span className="text-xs font-normal text-muted-foreground">
                      /{property.rentType?.toLowerCase()}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(property.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>

              {/* Quick Action Buttons for Pending Items */}
              {property.status.toLowerCase() === "pending" && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full h-8 text-xs text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full h-8 text-xs text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;