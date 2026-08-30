import { serverFetch } from "../core/server";

export const getOwnerProperty = async ({ ownerId, page = 1 } = {}) => {
  const params = new URLSearchParams();

  params.set("ownerId", ownerId);
  params.set("page", String(page));

  return serverFetch(`/api/property/owner?${params.toString()}`);
};

export const getProperty = async ({
  page = 1,
  search = "",
  propertyType = "",
  sortPrice = "",
  status = "",
} = {}) => {
  const params = new URLSearchParams();

  params.set("page", String(page));

  if (search.trim()) {
    params.set("search", search.trim());
  }

  if (propertyType.trim()) {
    params.set("propertyType", propertyType.trim());
  }

  if (sortPrice) {
    params.set("sortPrice", sortPrice);
  }

  if (status.trim()) {
    params.set("status", status.trim());
  }

  return serverFetch(`/api/property?${params.toString()}`);
};

export const getPropertyById = async (id) => {
  if (!id) {
    throw new Error("Property ID is required");
  }

  return serverFetch(`/api/property/${id}`);
};
