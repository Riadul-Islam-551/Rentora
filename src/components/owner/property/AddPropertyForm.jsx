"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  Camera,
  Check,
  ImagePlus,
  MapPin,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import PropertyPreviewDialog from "./PropertyPreviewDialog";
import { uploadPropertyPhoto } from "@/lib/core/uploadPropertyPhoto";
import { useToast } from "@/lib/core/toastContext";
import { Trash } from "lucide-react";

const PROPERTY_TYPES = [
  "Apartment",
  "House",
  "Villa",
  "Studio",
  "Duplex",
  "Office",
  "Shop",
];

const RENT_TYPES = ["Monthly", "Weekly", "Daily"];

const MAX_GALLERY_IMAGES = 2;

const initialForm = {
  title: "",
  description: "",
  location: "",
  propertyType: "",
  rent: "",
  rentType: "",
  bedrooms: "",
  bathrooms: "",
  propertySize: "",
  amenities: "",
  extraFeature: "",
  status: "pending",
};

export default function AddPropertyForm({ user }) {
  const { toast } = useToast();

  const [form, setForm] = useState(initialForm);

  const [bannerImage, setBannerImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const [bannerPreview, setBannerPreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);

  /*
   * -------------------------
   * Generic input handler
   * -------------------------
   */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  /*
   * -------------------------
   * Banner image
   * -------------------------
   */

  const handleBannerChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const validationError = validateImage(file);

    if (validationError) {
      setErrors((previous) => ({
        ...previous,
        bannerImage: validationError,
      }));

      event.target.value = "";
      return;
    }

    setErrors((previous) => ({
      ...previous,
      bannerImage: "",
    }));

    // Release previous object URL
    if (bannerPreview) {
      URL.revokeObjectURL(bannerPreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setBannerImage(file);
    setBannerPreview(previewUrl);

    event.target.value = "";
  };

  const removeBanner = () => {
    if (bannerPreview) {
      URL.revokeObjectURL(bannerPreview);
    }

    setBannerImage(null);
    setBannerPreview("");

    setErrors((previous) => ({
      ...previous,
      bannerImage: "",
    }));
  };

  /*
   * -------------------------
   * Gallery images
   * -------------------------
   */

  const handleGalleryChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) return;

    const availableSlots = MAX_GALLERY_IMAGES - galleryImages.length;

    if (availableSlots <= 0) {
      setErrors((previous) => ({
        ...previous,
        galleryImages: "You can select maximum 2 gallery images.",
      }));

      event.target.value = "";
      return;
    }

    const filesToAdd = selectedFiles.slice(0, availableSlots);

    const invalidFile = filesToAdd.find((file) => {
      return validateImage(file);
    });

    if (invalidFile) {
      setErrors((previous) => ({
        ...previous,
        galleryImages: validateImage(invalidFile),
      }));

      event.target.value = "";
      return;
    }

    const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));

    /*
     * IMPORTANT:
     * Add the new files to the existing array.
     * Do NOT replace galleryImages.
     */
    setGalleryImages((previous) => [...previous, ...filesToAdd]);

    setGalleryPreviews((previous) => [...previous, ...newPreviews]);

    setErrors((previous) => ({
      ...previous,
      galleryImages: "",
    }));

    event.target.value = "";
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index),
    );

    setGalleryPreviews((previous) => {
      const url = previous[index];

      if (url) {
        URL.revokeObjectURL(url);
      }

      return previous.filter((_, imageIndex) => imageIndex !== index);
    });

    setErrors((previous) => ({
      ...previous,
      galleryImages: "",
    }));
  };

  /*
   * -------------------------
   * Image validation
   * -------------------------
   */

  const validateImage = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return "Only JPG, PNG, and WebP images are allowed.";
    }

    if (file.size > 2 * 1024 * 1024) {
      return "Each image must be smaller than 2MB.";
    }

    return "";
  };

  /*
   * -------------------------
   * Form validation
   * -------------------------
   */

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Property title is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!form.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!form.propertyType) {
      newErrors.propertyType = "Please select a property type.";
    }

    if (!form.rent) {
      newErrors.rent = "Rent price is required.";
    } else if (Number(form.rent) <= 0) {
      newErrors.rent = "Rent must be greater than 0.";
    }

    if (!form.rentType) {
      newErrors.rentType = "Please select a rent type.";
    }

    if (!form.bedrooms) {
      newErrors.bedrooms = "Bedrooms are required.";
    } else if (Number(form.bedrooms) < 0) {
      newErrors.bedrooms = "Invalid bedroom count.";
    }

    if (!form.bathrooms) {
      newErrors.bathrooms = "Bathrooms are required.";
    } else if (Number(form.bathrooms) < 0) {
      newErrors.bathrooms = "Invalid bathroom count.";
    }

    if (!form.propertySize) {
      newErrors.propertySize = "Property size is required.";
    } else if (Number(form.propertySize) <= 0) {
      newErrors.propertySize = "Property size must be greater than 0.";
    }

    if (!form.amenities.trim()) {
      newErrors.amenities = "Please enter at least one amenity.";
    }

    if (!bannerImage) {
      newErrors.bannerImage = "Please select one banner image.";
    }

    if (galleryImages.length > MAX_GALLERY_IMAGES) {
      newErrors.galleryImages = "Maximum 2 gallery images are allowed.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*
   * -------------------------
   * Preview
   * -------------------------
   */

  const handlePreview = () => {
    if (!validateForm()) {
      toast?.({
        title: "Please check the form",
        description: "Complete all required fields before previewing.",
        variant: "destructive",
      });

      return;
    }

    setPreviewOpen(true);
  };

  /*
   * -------------------------
   * Submit
   * -------------------------
   */

  const handleSubmit = async () => {
    if (!validateForm()) {
      setPreviewOpen(false);
      return;
    }

    if (!user?.id) {
      toast?.({
        title: "Authentication required",
        description: "Could not identify the property owner.",
        variant: "destructive",
      });

      return;
    }

    try {
      setIsUploading(true);

      /*
       * Upload banner
       */

      const bannerUrl = await uploadPropertyPhoto(bannerImage, user.id);

      /*
       * Upload gallery images
       *
       * Promise.all makes sure both gallery images
       * are uploaded and returned as an array.
       */

      const galleryUrls = await Promise.all(
        galleryImages.map((file, index) => uploadPropertyPhoto(file, user.id)),
      );

      /*
       * Final form data
       *
       * Files are replaced with public URLs.
       */

      const submittedData = {
        ...form,

        ownerId: user.id,

        rent: Number(form.rent),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        propertySize: Number(form.propertySize),

        amenities: form.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        bannerImage: bannerUrl,

        galleryImages: galleryUrls,

        status: "pending",
      };

      /*
       * NO BACKEND HERE.
       *
       * This is intentionally the only action
       * after submission.
       */

      console.log("========== PROPERTY FORM DATA ==========");

      console.log(submittedData);

      console.log("========================================");

      toast({
        message: "Property data ready",
        type: "success",
      });

      setPreviewOpen(false);
    } catch (error) {
      console.error("Property submission error:", error);

      toast?.({
        title: "Upload failed",
        description:
          error?.message || "Something went wrong while uploading images.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  /*
   * -------------------------
   * UI
   * -------------------------
   */

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handlePreview();
        }}
        className="mx-auto w-full space-y-8"
      >

        {/* Basic Information */}

        <section className="rounded-xl border bg-card p-5 shadow-sm md:p-6">
          <div className="mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Building2 className="size-5 text-primary" />
              Property Information
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Provide the basic details of your property.
            </p>
          </div>

          <div className="grid gap-5">
            {/* Title */}

            <FormField label="Property Title" required error={errors.title}>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Modern 3 Bedroom Apartment"
              />
            </FormField>

            {/* Description */}

            <FormField label="Description" required error={errors.description}>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your property..."
                rows={5}
              />
            </FormField>

            {/* Location */}

            <FormField label="Location" required error={errors.location}>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 size-4 text-muted-foreground" />

                <Input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className="pl-9"
                />
              </div>
            </FormField>

            {/* Property Type + Rent Type */}

            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label="Property Type"
                required
                error={errors.propertyType}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-between font-normal"
                      >
                        {form.propertyType || "Select property type"}
                      </Button>
                    }
                  />

                  <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    {PROPERTY_TYPES.map((type) => (
                      <DropdownMenuItem
                        key={type}
                        onClick={() => {
                          setForm((previous) => ({
                            ...previous,
                            propertyType: type,
                          }));

                          setErrors((previous) => ({
                            ...previous,
                            propertyType: "",
                          }));
                        }}
                      >
                        {type}

                        {form.propertyType === type && (
                          <Check className="ml-auto size-4" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormField>

              <FormField label="Rent Type" required error={errors.rentType}>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-between font-normal"
                      >
                        {form.rentType || "Select rent type"}
                      </Button>
                    }
                  />

                  <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    {RENT_TYPES.map((type) => (
                      <DropdownMenuItem
                        key={type}
                        onClick={() => {
                          setForm((previous) => ({
                            ...previous,
                            rentType: type,
                          }));

                          setErrors((previous) => ({
                            ...previous,
                            rentType: "",
                          }));
                        }}
                      >
                        {type}

                        {form.rentType === type && (
                          <Check className="ml-auto size-4" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormField>
            </div>

            {/* Rent */}

            <FormField label="Rent Price" required error={errors.rent}>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm font-medium text-muted-foreground">
                  ৳
                </span>

                <Input
                  name="rent"
                  type="number"
                  min="0"
                  value={form.rent}
                  onChange={handleChange}
                  placeholder="25000"
                  className="pl-8"
                />
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                Rent amount in Bangladeshi Taka (৳).
              </p>
            </FormField>

            {/* Numbers */}

            <div className="grid gap-5 sm:grid-cols-3">
              <FormField label="Bedrooms" required error={errors.bedrooms}>
                <Input
                  name="bedrooms"
                  type="number"
                  min="0"
                  value={form.bedrooms}
                  onChange={handleChange}
                  placeholder="3"
                />
              </FormField>

              <FormField label="Bathrooms" required error={errors.bathrooms}>
                <Input
                  name="bathrooms"
                  type="number"
                  min="0"
                  value={form.bathrooms}
                  onChange={handleChange}
                  placeholder="2"
                />
              </FormField>

              <FormField
                label="Property Size"
                required
                error={errors.propertySize}
              >
                <div className="relative">
                  <Input
                    name="propertySize"
                    type="number"
                    min="0"
                    value={form.propertySize}
                    onChange={handleChange}
                    placeholder="1200"
                    className="pr-14"
                  />

                  <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
                    sq ft
                  </span>
                </div>
              </FormField>
            </div>

            {/* Amenities */}

            <FormField label="Amenities" required error={errors.amenities}>
              <Textarea
                name="amenities"
                value={form.amenities}
                onChange={handleChange}
                placeholder="WiFi, Parking, Lift, Security, Generator"
                rows={3}
              />

              <p className="mt-1 text-xs text-muted-foreground">
                Separate amenities using commas.
              </p>
            </FormField>

            {/* Extra Feature */}

            <FormField label="Extra Feature">
              <Textarea
                name="extraFeature"
                value={form.extraFeature}
                onChange={handleChange}
                placeholder="Any additional feature or information..."
                rows={3}
              />
            </FormField>
          </div>
        </section>

        {/* Images */}

        <section className="rounded-xl border bg-card p-5 shadow-sm md:p-6">
          <div className="mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Camera className="size-5 text-primary" />
              Property Images
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Upload one banner image and up to two gallery images.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Banner */}

            <div className="space-y-3">
              <div>
                <Label className="font-medium">
                  Banner Image <span className="text-destructive">*</span>
                </Label>

                <p className="text-xs text-muted-foreground">
                  Select exactly one image.
                </p>
              </div>

              {bannerPreview ? (
                <div className="group relative overflow-hidden rounded-xl border">
                  <Image
                    src={bannerPreview}
                    alt="Banner preview"
                    width={900}
                    height={500}
                    className="aspect-video w-full object-cover"
                    unoptimized
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={removeBanner}
                  >
                    <Trash2 className="size-4" />
                  </Button>

                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2 text-xs text-white">
                    Banner image
                  </div>
                </div>
              ) : (
                <ImageUploadBox
                  htmlFor="banner-image"
                  icon={<ImagePlus />}
                  title="Upload banner image"
                  description="JPG, PNG or WebP · Max 2MB"
                />
              )}

              <input
                id="banner-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleBannerChange}
              />

              {errors.bannerImage && (
                <ErrorText>{errors.bannerImage}</ErrorText>
              )}
            </div>

            {/* Gallery */}

            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Label className="font-medium">Gallery Images</Label>

                  <p className="text-xs text-muted-foreground">
                    Maximum 2 images.
                  </p>
                </div>

                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                  {galleryImages.length}/2
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Selected gallery images */}

                {galleryPreviews.map((preview, index) => (
                  <div
                    key={`${preview}-${index}`}
                    className="group relative overflow-hidden rounded-xl border"
                  >
                    <Image
                      src={preview}
                      alt={`Gallery image ${index + 1}`}
                      width={500}
                      height={350}
                      className="aspect-[4/3] w-full object-cover"
                      unoptimized
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2 size-8"
                      onClick={() => removeGalleryImage(index)}
                    >
                      <Trash className="size-4" />
                    </Button>

                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1.5 text-xs text-white">
                      Gallery {index + 1}
                    </div>
                  </div>
                ))}

                {/* Add button */}

                {galleryImages.length < MAX_GALLERY_IMAGES && (
                  <label
                    htmlFor="gallery-images"
                    className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/20 p-4 text-center transition-colors hover:bg-muted/40"
                  >
                    <Upload className="mb-2 size-6 text-muted-foreground" />

                    <span className="text-sm font-medium">
                      Add gallery image
                    </span>

                    <span className="mt-1 text-xs text-muted-foreground">
                      {MAX_GALLERY_IMAGES - galleryImages.length} slot
                      {MAX_GALLERY_IMAGES - galleryImages.length !== 1
                        ? "s"
                        : ""}{" "}
                      remaining
                    </span>
                  </label>
                )}
              </div>

              <input
                id="gallery-images"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleGalleryChange}
              />

              {errors.galleryImages && (
                <ErrorText>{errors.galleryImages}</ErrorText>
              )}
            </div>
          </div>
        </section>

        {/* Status */}

        <div className="rounded-lg border border-warning/30 bg-warning/10 p-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-warning" />

            <p className="text-sm font-medium">
              Property status: <span className="capitalize">{form.status}</span>
            </p>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            New properties are submitted as pending and require approval.
          </p>
        </div>

        {/* Actions */}

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setForm(initialForm);
              removeBanner();

              galleryPreviews.forEach((url) => URL.revokeObjectURL(url));

              setGalleryImages([]);
              setGalleryPreviews([]);
              setErrors({});
            }}
          >
            Reset
          </Button>

          <Button type="submit">
            <ImagePlus className="size-4" />
            Preview Property
          </Button>
        </div>
      </form>

      {/* Separate Preview Component */}

      <PropertyPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        form={form}
        bannerPreview={bannerPreview}
        galleryPreviews={galleryPreviews}
        onCreate={handleSubmit}
        isUploading={isUploading}
      />
    </>
  );
}

/*
 * ------------------------------------
 * Small reusable form components
 * ------------------------------------
 */

function FormField({ label, required, error, children }) {
  return (
    <div className="space-y-2">
      <Label>
        {label}

        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>

      {children}

      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }) {
  return (
    <p className="flex items-center gap-1 text-xs text-destructive">
      <X className="size-3" />
      {children}
    </p>
  );
}

function ImageUploadBox({ htmlFor, icon, title, description }) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/20 p-6 text-center transition-colors hover:bg-muted/40"
    >
      <div className="mb-3 rounded-full bg-primary/10 p-3 text-primary">
        {icon}
      </div>

      <span className="text-sm font-medium">{title}</span>

      <span className="mt-1 text-xs text-muted-foreground">{description}</span>
    </label>
  );
}
