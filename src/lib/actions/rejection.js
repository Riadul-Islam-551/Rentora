import { serverPost } from "../core/server";

export const createPropertyRejection = (data) => {
  return serverPost("/api/reject/property", data);
};
