"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";

import { Label } from "@/components/ui/label";

export default function PropertyPreviewDialog({
  open,
  onOpenChange,
  form,
  bannerPreview,
  galleryPreviews,
  onCreate,
  isUploading,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Preview Property</DialogTitle>

          <DialogDescription>
            Review all property information before creating the property.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Banner */}

          {bannerPreview && (
            <div className="overflow-hidden rounded-xl border">
              <Image
                src={bannerPreview}
                alt="Property banner"
                width={1200}
                height={650}
                className="aspect-video w-full object-cover"
                unoptimized
              />
            </div>
          )}

          {/* Gallery */}

          {galleryPreviews.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold">Gallery Images</h3>

              <div className="grid grid-cols-2 gap-3">
                {galleryPreviews.map((image, index) => (
                  <Image
                    key={`${image}-${index}`}
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    width={600}
                    height={450}
                    className="aspect-4/3 w-full rounded-lg border object-cover"
                    unoptimized
                  />
                ))}
              </div>
            </div>
          )}

          {/* Information */}

          <FieldGroup>
            <PreviewField label="Property Title" value={form.title} />

            <PreviewField label="Description" value={form.description} />

            <PreviewField label="Location" value={form.location} />

            <div className="grid gap-4 sm:grid-cols-2">
              <PreviewField label="Property Type" value={form.propertyType} />

              <PreviewField label="Rent Type" value={form.rentType} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <PreviewField
                label="Rent"
                value={
                  form.rent ? `৳ ${Number(form.rent).toLocaleString()}` : "-"
                }
              />

              <PreviewField label="Bedrooms" value={form.bedrooms} />

              <PreviewField label="Bathrooms" value={form.bathrooms} />
            </div>

            <PreviewField
              label="Property Size"
              value={
                form.propertySize
                  ? `${Number(form.propertySize).toLocaleString()} sq ft`
                  : "-"
              }
            />

            <PreviewField label="Amenities" value={form.amenities} />

            <PreviewField
              label="Extra Feature"
              value={form.extraFeature || "None"}
            />

            <PreviewField label="Status" value="Pending" />
          </FieldGroup>
        </div>

        <DialogFooter className="gap-2 sm:justify-end">
          <DialogClose
            render={
              <Button type="button" variant="outline" disabled={isUploading}>
                Back to Edit
              </Button>
            }
          />

          <Button type="button" onClick={onCreate} disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Create Property"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PreviewField({ label, value }) {
  return (
    <Field>
      <Label>{label}</Label>

      <div className="rounded-md border bg-muted/30 px-3 py-2 text-sm whitespace-pre-wrap">
        {value || "-"}
      </div>
    </Field>
  );
}
