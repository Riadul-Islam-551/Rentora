import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  Home,
  MapPin,
  Maximize,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { getPropertyById } from "@/lib/api/property";
import { Bookmark } from "lucide-react";
import { TicketCheck } from "lucide-react";
import { getLoggedInUser } from "@/lib/core/session";
import FavoriteButton from "@/components/tenant/FavoriteButton";

const PropertyDetails = async ({ params }) => {
  const { id } = await params;
  const tenant = await getLoggedInUser();
  console.log("tenant",tenant?.id);

  let response;

  try {
    response = await getPropertyById(id);
  } catch (error) {
    console.error("Failed to fetch property:", error);
    notFound();
  }

  const property = response?.data;

  if (!property) {
    notFound();
  }

  const formattedDate = property?.createdAt
    ? new Date(property.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  const cleanImageUrl = (url) => {
    if (!url) return "";

    const markdownMatch = url.match(/\((.*?)\)/);

    if (markdownMatch) {
      return markdownMatch[1];
    }

    return url;
  };

  const galleryImages = Array.isArray(property?.galleryImages)
    ? property.galleryImages.map(cleanImageUrl).filter(Boolean)
    : [];

  return (
    <div className="container mx-auto min-w-0 space-y-6 px-4 py-6 md:px-6 lg:py-8">
      {/* Back Button */}
      <div>
        <Button variant="ghost" asChild className="-ml-2">
          <Link href="/properties">
            <ArrowLeft className="size-4" />
            Back to Properties
          </Link>
        </Button>
      </div>

      {/* Property */}
      <div className="grid min-w-0 gap-6 lg:grid-cols-3">
        {/* Left Side */}
        <div className="min-w-0 space-y-6 lg:col-span-2">
          {/* Banner */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted">
            {property?.bannerImage ? (
              <Image
                src={cleanImageUrl(property.bannerImage)}
                alt={property?.title || "Property"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Home className="size-12 text-muted-foreground" />
              </div>
            )}

            {/* Property Type */}
            <div className="absolute left-4 top-4">
              <Badge className="bg-black/60 text-white backdrop-blur-md">
                {property?.propertyType || "Property"}
              </Badge>
            </div>
          </div>

          {/* Gallery Images */}
          {galleryImages.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Property Gallery</h2>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {galleryImages.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
                    >
                      <Image
                        src={image}
                        alt={`${property?.title || "Property"} - ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Title & Location */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              {property?.title}
            </h1>

            {property?.location && (
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>{property.location}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {property?.description && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">About this property</h2>
              </CardHeader>

              <CardContent>
                <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
                  {property.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Property Features */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Property Details</h2>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <BedDouble className="mb-2 size-5 text-primary" />

                  <p className="text-lg font-semibold">
                    {property?.bedrooms ?? 0}
                  </p>

                  <p className="text-xs text-muted-foreground">Bedrooms</p>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <Bath className="mb-2 size-5 text-primary" />

                  <p className="text-lg font-semibold">
                    {property?.bathrooms ?? 0}
                  </p>

                  <p className="text-xs text-muted-foreground">Bathrooms</p>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <Maximize className="mb-2 size-5 text-primary" />

                  <p className="text-lg font-semibold">
                    {property?.propertySize ?? 0}
                  </p>

                  <p className="text-xs text-muted-foreground">Sq Ft</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          {property?.amenities?.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Amenities</h2>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <Badge
                      key={amenity}
                      variant="secondary"
                      className="px-3 py-1.5 font-normal"
                    >
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Extra Feature */}
          {property?.extraFeature && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Extra Feature</h2>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {property.extraFeature}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Side - Rent */}
        <div className="min-w-0">
          <Card className="sticky top-20">
            <CardContent className="space-y-5 p-5">
              {/* Rent */}
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>

                <p className="mt-1 text-3xl font-bold text-primary">
                  ৳{Number(property?.rent || 0).toLocaleString()}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    /{property?.rentType?.toLowerCase() || "month"}
                  </span>
                </p>
              </div>

              {/* Listed Date */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="size-4" />
                    Listed
                  </span>

                  <span className="font-medium">{formattedDate}</span>
                </div>
              </div>

              {/* Property Type */}
              <div className="border-t pt-4">
                <p className="mb-2 text-xs text-muted-foreground">
                  Property Type
                </p>

                <Badge variant="secondary">
                  {property?.propertyType || "N/A"}
                </Badge>
              </div>

              {/* Location */}
              {property?.location && (
                <div className="border-t pt-4">
                  <p className="mb-2 text-xs text-muted-foreground">Location</p>

                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />

                    <span>{property.location}</span>
                  </div>
                </div>
              )}

              {/* Contact */}
              <div className="flex items-center gap-3">
                <Button className="flex-1" size="lg">
                  <TicketCheck className="size-4" />
                  Book the property
                </Button>
                {tenant?.role?.toLowerCase() === "tenant" && (
                  <FavoriteButton
                    propertyId={property?._id}
                    tenantId={tenant?.id}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
