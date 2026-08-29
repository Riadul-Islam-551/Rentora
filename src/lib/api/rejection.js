import { serverFetch } from "../core/server";

export const getPropertyRejection = async (propertyId) => {
  return serverFetch(`/api/reject/property?propertyId=${propertyId}`);
};
