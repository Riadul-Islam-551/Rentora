"use client";

import { useState } from "react";
import {
  Bath,
  BedDouble,
  Building2,
  ImagePlus,
  Loader2,
  MapPin,
  Maximize,
  Pencil,
  X,
} from "lucide-react";

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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { useToast } from "@/lib/core/toastContext";
import { useRouter } from "next/navigation";
import { uploadPropertyPhoto } from "@/lib/core/uploadPropertyPhoto";
import { patchProperty } from "@/lib/actions/property";
import Image from "next/image";

export default function PropertyEditDialogue({ property }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const route = useRouter();

  const [form, setForm] = useState({
    title: property?.title || "",
    description: property?.description || "",
    location: property?.location || "",
    propertyType: property?.propertyType || "",
    rent: property?.rent || "",
    rentType: property?.rentType || "",
    bedrooms: property?.bedrooms || "",
    bathrooms: property?.bathrooms || "",
    propertySize: property?.propertySize || "",
    extraFeature: property?.extraFeature || "",
    amenities: property?.amenities || [],
  });

  const [newBanner, setNewBanner] = useState(null);
  const [newGallery, setNewGallery] = useState([]);

  const [galleryPreviews, setGalleryPreviews] = useState(
    property?.galleryImages || [],
  );

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Banner image

  const handleBannerChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setNewBanner(file);
  };

  // Gallery images

  const handleGalleryChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    setNewGallery(files);

    const previews = files.map((file) => URL.createObjectURL(file));

    setGalleryPreviews(previews);
  };

  // Amenities

  const handleAmenitiesChange = (event) => {
    const value = event.target.value;

    const amenities = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    updateField("amenities", amenities);
  };

  // Submit

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      let bannerImage = property.bannerImage;
      let galleryImages = property.galleryImages || [];

      // Upload new banner

      if (newBanner) {
        bannerImage = await uploadPropertyPhoto(newBanner, property?.ownerId);
      }

      // Upload new gallery

      if (newGallery.length > 0) {
        galleryImages = [];

        for (const file of newGallery) {
          const url = await uploadPropertyPhoto(file, property?.ownerId);

          galleryImages.push(url);
        }
      }

      // Prepare PATCH data

      const updateProperty = {
        title: form.title,
        description: form.description,
        location: form.location,
        propertyType: form.propertyType,

        rent: Number(form.rent),
        rentType: form.rentType,

        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        propertySize: Number(form.propertySize),

        amenities: form.amenities,
        extraFeature: form.extraFeature,

        bannerImage,
        galleryImages,
      };

      // PATCH

      const response = await patchProperty(property?._id, updateProperty);

      if (!response?.success) {
        throw new Error(response?.message || "Failed to update property");
      }

      toast({
        message: "Property updated successfully",
        type: "success",
      });

      setOpen(false);
      route.refresh();
    } catch (error) {
      console.error("Update property error:", error);

      toast({
        message: "Failed to update property",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            disabled={property?.status?.toLowerCase() === "rejected"}
            className="flex-1"
          >
            <Pencil className="size-4" />
            Edit
          </Button>
        }
      />

      <DialogContent
        className="
          max-h-[90vh]
          overflow-hidden
          p-0
          sm:max-w-3xl
        "
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}

          <DialogHeader className="border-b px-6 py-5">
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="size-5 text-primary" />
              Edit Property
            </DialogTitle>

            <DialogDescription>
              Update your property information, pricing, amenities, and photos.
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable content */}

          <div className="max-h-[65vh] overflow-y-auto px-6 py-6">
            <div className="space-y-8">
              {/* -------------------------------- */}
              {/* Basic Information */}
              {/* -------------------------------- */}

              <section className="space-y-4">
                <div>
                  <h3 className="font-semibold">Basic Information</h3>

                  <p className="text-sm text-muted-foreground">
                    Update the basic information of your property.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title</Label>

                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>

                    <Textarea
                      id="description"
                      value={form.description}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                      rows={5}
                      required
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* -------------------------------- */}
              {/* Location */}
              {/* -------------------------------- */}

              <section className="space-y-4">
                <div>
                  <h3 className="font-semibold">Location</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    <MapPin className="mr-1 inline size-4" />
                    Location
                  </Label>

                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    required
                  />
                </div>
              </section>

              <Separator />

              {/* -------------------------------- */}
              {/* Property Details */}
              {/* -------------------------------- */}

              <section className="space-y-4">
                <div>
                  <h3 className="font-semibold">Property Details</h3>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>

                    <Input
                      id="propertyType"
                      value={form.propertyType}
                      onChange={(e) =>
                        updateField("propertyType", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rentType">Rent Type</Label>

                    <Input
                      id="rentType"
                      value={form.rentType}
                      onChange={(e) => updateField("rentType", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rent">Rent</Label>

                    <Input
                      id="rent"
                      type="number"
                      value={form.rent}
                      onChange={(e) => updateField("rent", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertySize">Property Size</Label>

                    <Input
                      id="propertySize"
                      type="number"
                      value={form.propertySize}
                      onChange={(e) =>
                        updateField("propertySize", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">
                      <BedDouble className="mr-1 inline size-4" />
                      Bedrooms
                    </Label>

                    <Input
                      id="bedrooms"
                      type="number"
                      value={form.bedrooms}
                      onChange={(e) => updateField("bedrooms", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">
                      <Bath className="mr-1 inline size-4" />
                      Bathrooms
                    </Label>

                    <Input
                      id="bathrooms"
                      type="number"
                      value={form.bathrooms}
                      onChange={(e) => updateField("bathrooms", e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* -------------------------------- */}
              {/* Amenities */}
              {/* -------------------------------- */}

              <section className="space-y-4">
                <div>
                  <h3 className="font-semibold">Amenities</h3>

                  <p className="text-sm text-muted-foreground">
                    Separate amenities with commas.
                  </p>
                </div>

                <Input
                  value={form.amenities.join(", ")}
                  onChange={handleAmenitiesChange}
                  placeholder="Parking, Gym, Lift, Security"
                />

                <div className="flex flex-wrap gap-2">
                  {form.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </section>

              <Separator />

              {/* -------------------------------- */}
              {/* Extra Feature */}
              {/* -------------------------------- */}

              <section className="space-y-4">
                <div>
                  <h3 className="font-semibold">Extra Features</h3>
                </div>

                <Textarea
                  value={form.extraFeature}
                  onChange={(e) => updateField("extraFeature", e.target.value)}
                  placeholder="Full power backup, Intercom..."
                  rows={3}
                />
              </section>

              <Separator />

              {/* -------------------------------- */}
              {/* Banner Image */}
              {/* -------------------------------- */}

              <section className="space-y-4">
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <ImagePlus className="size-5 text-primary" />
                    Banner Photo
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Select a new banner image to replace the existing one.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-xl border">
                  <Image
                    src={
                      newBanner
                        ? URL.createObjectURL(newBanner)
                        : property.bannerImage
                    }
                    alt={property.title}
                    width={300}
                    height={100}
                    className="h-52 w-full object-cover"
                  />
                </div>

                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleBannerChange}
                />

                {newBanner && (
                  <p className="text-sm text-success">
                    New banner selected: {newBanner.name}
                  </p>
                )}
              </section>

              <Separator />

              {/* -------------------------------- */}
              {/* Gallery Images */}
              {/* -------------------------------- */}

              <section className="space-y-4">
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <ImagePlus className="size-5 text-primary" />
                    Gallery Photos
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Select images to replace the current gallery.
                  </p>
                </div>

                {galleryPreviews.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {galleryPreviews.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="group relative overflow-hidden rounded-lg border"
                      >
                        <Image
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          width={150}
                          height={80}
                          className="aspect-square w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleGalleryChange}
                />

                {newGallery.length > 0 && (
                  <p className="text-sm text-success">
                    {newGallery.length} new gallery image
                    {newGallery.length > 1 ? "s" : ""} selected.
                  </p>
                )}
              </section>
            </div>
          </div>

          {/* Footer */}

          <DialogFooter className="border-t bg-muted/30 px-6 py-4 mb-3 ">
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              }
            />

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Pencil className="size-4" />
                  Update Property
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
