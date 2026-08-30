import { serverPost } from "@/lib/core/server";

export const createFavoriteProperty = async (data) => {
  return serverPost("/api/favorite", data);
};
