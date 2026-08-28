import { serverFetch } from "../core/server";

export const getOwnerProperty = async (ownerId, page = 1) => {
  if (!ownerId) {
    throw new Error("Owner ID is required");
  }

  return serverFetch(`/api/owner/property?owner=${ownerId}&page=${page}`);
};

export const getProperty = async (page = 1) => {
  return serverFetch(`/api/property?page=${page}`);
};
