import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

const PropertyTable = ({ properties, pagination }) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-card">
      <div className="w-full overflow-x-auto">
        <Table className="">
          <TableCaption className={"py-3 border-t"}>
            <span className="text-primary">
              Showing {properties.length} of {pagination.totalProperties}{" "}
              properties.
            </span>
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead className="min-w-[250px]">Property</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Rent</TableHead>
              <TableHead>Bedrooms</TableHead>
              <TableHead>Bathrooms</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Update Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {properties.length > 0 ? (
              properties.map((property) => (
                <TableRow key={property._id}>
                  {/* Image */}
                  <TableCell>
                    <div className="h-12 w-16 overflow-hidden rounded-md border bg-muted">
                      <Image
                        src={property.bannerImage}
                        alt={property.title}
                        width={100}
                        height={50}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>

                  {/* Property */}
                  <TableCell>
                    <div className="max-w-70">
                      <p className="truncate font-medium">{property.title}</p>

                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {property.extraFeature}
                      </p>
                    </div>
                  </TableCell>

                  {/* Location */}
                  <TableCell>
                    <span className="whitespace-nowrap">
                      {property.location}
                    </span>
                  </TableCell>

                  {/* Property Type */}
                  <TableCell>
                    <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                      {property.propertyType}
                    </span>
                  </TableCell>

                  {/* Rent */}
                  <TableCell className="text-right">
                    <div className="whitespace-nowrap font-semibold">
                      ৳{property.rent.toLocaleString()}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {property.rentType}
                    </div>
                  </TableCell>

                  {/* Bedrooms */}
                  <TableCell>{property.bedrooms}</TableCell>

                  {/* Bathrooms */}
                  <TableCell>{property.bathrooms}</TableCell>

                  {/* Property Size */}
                  <TableCell>
                    <span className="whitespace-nowrap">
                      {property.propertySize.toLocaleString()} sq ft
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <span
                      className={
                        property.status === "approved"
                          ? "rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success"
                          : property.status === "pending"
                            ? "rounded-full bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning"
                            : "rounded-full bg-error/10 px-2.5 py-1 text-xs font-medium text-error"
                      }
                    >
                      {property.status}
                    </span>
                  </TableCell>

                  {/*Update Status */}
                  <TableCell>
                    {property.status.toLowerCase() === "pending" && (
                      <>
                        <Button variant="outline" size="xs">
                          Approve
                        </Button>{" "}
                        <Button variant="destructive" size="xs">
                          Reject
                        </Button>
                      </>
                    )}
                    {property.status.toLowerCase() === "approved" && (
                      <>
                        <Button variant="destructive" size="xs">
                          <Trash></Trash> Delete
                        </Button>
                      </>
                    )}
                  </TableCell>

                  {/* Created */}
                  <TableCell>
                    <span className="whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(property.createdAt).toLocaleDateString(
                        "en-BD",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="h-32 text-center text-muted-foreground"
                >
                  No properties found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total Properties</TableCell>

                <TableCell className="text-right font-semibold">
                  {pagination.totalProperties}
                </TableCell>

                <TableCell colSpan={5} />
              </TableRow>
            </TableFooter> */}
        </Table>
      </div>
    </div>
  );
};

export default PropertyTable;
