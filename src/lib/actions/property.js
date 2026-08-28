"use server";

import { serverDelete, serverPatch, serverPost } from "../core/server";

export const createProperty = async (newProperty) => {
  return serverPost("/api/property", newProperty);
};

export const deleteProperty = async (propertyId) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  return serverDelete("/api/property", {
    id: propertyId,
  });
};

export async function patchProperty(propertyId, updateProperty) {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  if (!updateProperty || Object.keys(updateProperty).length === 0) {
    throw new Error("No property data provided");
  }

  return serverPatch("/api/property", {
    id: propertyId,
    ...updateProperty,
  });
}
