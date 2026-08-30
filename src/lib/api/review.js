import { serverFetch } from "../core/server";

export const getTopReview = async () => {
  return serverFetch("/api/reviews/top");
};
