import Image from "next/image";
import {
  Bath,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Home,
  MapPin,
  Maximize,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
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

export default function PropertyDetailsDialog({ property }) {
  const status = property?.status?.toLowerCase() || "pending";

  const statusStyle = statusConfig[status] || {
    label: status,
    className: "border-info/30 bg-info/10 text-info hover:bg-info/10",
  };

  const formattedDate = property?.createdAt
    ? new Date(property.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" className="flex-1">
            <span className="flex items-center gap-2">
              <Home className="size-4" />
              View
            </span>
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{property.propertyType}</Badge>

            <Badge variant="outline" className={statusStyle.className}>
              {statusStyle.label}
            </Badge>
          </div>

          <DialogTitle className="pt-2 text-xl md:text-2xl">
            {property.title}
          </DialogTitle>

          <DialogDescription>
            Property details and information for this listing.
          </DialogDescription>
        </DialogHeader>

        {/* Main Image */}
        <div>
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
            <Image
              src={property.bannerImage}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          {/* <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center gap-2 text-sm text-white">
              <MapPin className="size-4 shrink-0" />
              <span>{property.location}</span>
            </div>
          </div> */}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="font-semibold">Description</h3>

          <p className="text-sm leading-6 text-muted-foreground">
            {property.description || "No description available."}
          </p>
        </div>

        <Separator />

        {/* Property Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <PropertyStat
            icon={<BedDouble className="size-4 text-primary" />}
            label="Bedrooms"
            value={property.bedrooms}
          />

          <PropertyStat
            icon={<Bath className="size-4 text-primary" />}
            label="Bathrooms"
            value={property.bathrooms}
          />

          <PropertyStat
            icon={<Maximize className="size-4 text-primary" />}
            label="Property Size"
            value={`${property.propertySize} sq ft`}
          />

          <PropertyStat
            icon={<CalendarDays className="size-4 text-primary" />}
            label="Listed"
            value={formattedDate}
          />
        </div>

        <Separator />

        {/* Rent */}
        <div className="rounded-xl border bg-muted/30 p-4">
          <p className="text-sm text-muted-foreground">Monthly Rent</p>

          <p className="mt-1 text-2xl font-bold text-primary">
            ৳{Number(property.rent).toLocaleString()}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              / {property.rentType?.toLowerCase() || "month"}
            </span>
          </p>
        </div>

        {/* Amenities */}
        {property.amenities?.length > 0 && (
          <>
            <div className="space-y-3">
              <h3 className="font-semibold">Amenities</h3>

              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <Badge
                    key={amenity}
                    variant="secondary"
                    className="gap-1 px-3 py-1.5 font-normal"
                  >
                    <CheckCircle2 className="size-3.5 text-success" />
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />
          </>
        )}

        {/* Extra Features */}
        {property.extraFeature && (
          <div className="space-y-2">
            <h3 className="font-semibold">Additional Features</h3>

            <p className="text-sm leading-6 text-muted-foreground">
              {property.extraFeature}
            </p>
          </div>
        )}

        {/* Gallery */}
        {property.galleryImages?.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Gallery</h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {property.galleryImages.map((image, index) => (
                <div
                  key={image}
                  className="relative aspect-video overflow-hidden rounded-lg bg-muted"
                >
                  <Image
                    src={image}
                    alt={`${property.title} - image ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" className="w-full sm:w-auto">
                Close
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PropertyStat({ icon, label, value }) {
  return (
    <div className="rounded-xl border bg-muted/30 p-3">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>

      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
