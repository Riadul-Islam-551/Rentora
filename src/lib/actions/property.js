"use server";

import { serverDelete, serverPost } from "../core/server";

export const createProperty = async (newProperty) => {
  return serverPost("/api/property", newProperty);
};

export const deleteProperty = async (propertyId) => {
  return serverDelete("/api/property", {
    id: propertyId,
  });
};
