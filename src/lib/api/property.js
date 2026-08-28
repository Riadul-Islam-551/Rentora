import { serverFetch } from "../core/server";

export const getOwnerProperty = async (ownerId, page = 1) => {
  if (!ownerId) {
    throw new Error("Owner ID is required");
  }

  return serverFetch(`/api/property?owner=${ownerId}&page=${page}`);
};
