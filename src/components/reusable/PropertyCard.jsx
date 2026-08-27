import Image from "next/image";
import Link from "next/link";

import {
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  MapPin,
  Maximize,
  Pencil,
  MoreVertical,
  Eye,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const statusConfig = {
  approved: {
    label: "Approved",
    className:
      "border-success/30 bg-success/10 text-success hover:bg-success/10",
  },

  pending: {
    label: "Pending",
    className:
      "border-warning/30 bg-warning/10 text-warning hover:bg-warning/10",
  },

  rejected: {
    label: "Rejected",
    className: "border-error/30 bg-error/10 text-error hover:bg-error/10",
  },
};

const PropertyCard = ({ property }) => {
  const status = property?.status?.toLowerCase() || "pending";

  const statusStyle = statusConfig[status] || {
    label: status,
    className: "border-info/30 bg-info/10 text-info hover:bg-info/10",
  };

  const formattedDate = property?.createdAt
    ? new Date(property.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  return (
    <Card className="group overflow-hidden border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={property.bannerImage}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <Badge
            variant="outline"
            className="border-white/30 bg-black/50 text-white backdrop-blur-md"
          >
            {property.propertyType}
          </Badge>

          <Badge variant="outline" className={statusStyle.className}>
            {statusStyle.label}
          </Badge>
        </div>

        {/* Bottom image gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-sm text-white">
          <MapPin className="size-4" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
      </div>

      {/* Header */}
      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="line-clamp-1 text-lg font-semibold tracking-tight">
              {property.title}
            </h2>

            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {property.description}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            aria-label="More options"
          >
            <MoreVertical className="size-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-4">
        {/* Property features */}
        <div className="grid grid-cols-3 divide-x rounded-lg border bg-muted/30 py-3">
          <div className="flex flex-col items-center gap-1 px-2 text-center">
            <BedDouble className="size-4 text-primary" />

            <span className="text-sm font-semibold">{property.bedrooms}</span>

            <span className="text-xs text-muted-foreground">Bedrooms</span>
          </div>

          <div className="flex flex-col items-center gap-1 px-2 text-center">
            <Bath className="size-4 text-primary" />

            <span className="text-sm font-semibold">{property.bathrooms}</span>

            <span className="text-xs text-muted-foreground">Bathrooms</span>
          </div>

          <div className="flex flex-col items-center gap-1 px-2 text-center">
            <Maximize className="size-4 text-primary" />

            <span className="text-sm font-semibold">
              {property.propertySize}
            </span>

            <span className="text-xs text-muted-foreground">Sq Ft</span>
          </div>
        </div>

        {/* Rent */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Monthly Rent</p>

            <p className="text-xl font-bold text-primary">
              ৳{Number(property.rent).toLocaleString()}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                / {property.rentType?.toLowerCase()}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {formattedDate}
          </div>
        </div>

        {/* Amenities */}
        {property.amenities?.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Amenities
            </p>

            <div className="flex flex-wrap gap-1.5">
              {property.amenities.slice(0, 4).map((amenity) => (
                <Badge
                  key={amenity}
                  variant="secondary"
                  className="font-normal"
                >
                  {amenity}
                </Badge>
              ))}

              {property.amenities.length > 4 && (
                <Badge variant="outline" className="font-normal">
                  +{property.amenities.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>


      {/* Footer */}
      <CardFooter className="flex items-center justify-between gap-2 p-4">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/dashboard/owner/properties/${property._id}`} className="flex items-center gap-2 ">
            <Eye className="size-4" />
            View
          </Link>
        </Button>

        <Button asChild  className="flex-1">
          <Link href={`/dashboard/owner/properties/${property._id}/edit`} className="flex items-center gap-2"> 
            <Pencil className="size-4" />
            Edit
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
