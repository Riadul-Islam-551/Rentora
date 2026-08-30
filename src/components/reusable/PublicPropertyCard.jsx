import Image from "next/image";
import Link from "next/link";

import { Home } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PublicPropertyCard = ({ property }) => {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Banner Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-muted">
        {property?.bannerImage ? (
          <Image
            src={property.bannerImage}
            alt={property?.title || "Property"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-sm text-muted-foreground">
              No image available
            </span>
          </div>
        )}

        {/* Property Type */}
        <div className="absolute left-3 top-3">
          <Badge
            variant="outline"
            className="border-white/30 bg-black/50 text-white backdrop-blur-md"
          >
            {property?.propertyType || "Property"}
          </Badge>
        </div>
      </div>

      {/* Header */}
      <CardHeader className="pb-2">
        <h2
          className="line-clamp-2 text-lg font-semibold tracking-tight"
          title={property?.title}
        >
          {property?.title}
        </h2>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-1 space-y-4">
        {/* Price */}
        <div>
          <p className="text-xs text-muted-foreground">Rent</p>

          <p className="text-xl font-bold text-primary">
            ৳{Number(property?.rent || 0).toLocaleString()}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              /{property?.rentType?.toLowerCase() || "month"}
            </span>
          </p>
        </div>

        {/* Amenities */}
        {property?.amenities?.length > 0 && (
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
      <CardFooter className="p-4">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/properties/${property?._id}`} className="flex items-center justify-center  gap-2 w-full">
            <Home className="size-4" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PublicPropertyCard;
