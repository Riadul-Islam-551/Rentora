import { serverFetch } from "../core/server";

export const getOwnerProperty = async (ownerId, page = 1) => {
  if (!ownerId) {
    throw new Error("Owner ID is required");
  }

  return serverFetch(`/api/owner/property?owner=${ownerId}&page=${page}`);
};

// export const getProperty = async (page = 1) => {
//   return serverFetch(`/api/property?page=${page}`);
// };

export const getProperty = async ({
  page = 1,
  search = "",
  propertyType = "",
  sortPrice = "",
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

  return serverFetch(`/api/property?${params.toString()}`);
};
