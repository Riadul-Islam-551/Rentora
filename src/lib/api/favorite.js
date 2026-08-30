import { serverFetch } from "../core/server";

export const getFavorites = async (tenantId) => {
  if (!tenantId) {
    throw new Error("Tenant ID is required");
  }

  return serverFetch(`/api/favorite?tenantId=${encodeURIComponent(tenantId)}`);
};
