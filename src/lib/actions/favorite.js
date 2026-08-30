import { serverDelete, serverPost } from "@/lib/core/server";

export const createFavoriteProperty = async (data) => {
  return serverPost("/api/favorite", data);
};

export const deleteFavorite = async (propertyId, tenantId) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  if (!tenantId) {
    throw new Error("Tenant ID is required");
  }

  return serverDelete("/api/favorite", {
    propertyId,
    tenantId,
  });
};
