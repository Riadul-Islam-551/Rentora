import { serverFetch } from "../core/server";

export const getOwnerProperty = async (ownerId) => {
  if (!ownerId) {
    throw new Error("Owner ID is required");
  }

  return serverFetch(`/api/property?owner=${ownerId}`);
};
