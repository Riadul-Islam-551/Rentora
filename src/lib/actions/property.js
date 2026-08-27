"use server";

import { serverPost } from "../core/server";

export const createProperty = async (newProperty) => {
  return serverPost("/api/property", newProperty);
};
