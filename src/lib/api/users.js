import { serverFetch } from "../core/server";

export const getAllUsers = async () => {
  return serverFetch("/api/users");
};

export const getUserById = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  return serverFetch(`/api/user/${userId}`);
};
