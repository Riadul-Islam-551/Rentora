import { serverPatch } from "../core/server";

export const patchUser = async (userId, updateUser) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  if (!updateUser || Object.keys(updateUser).length === 0) {
    throw new Error("No user data provided");
  }
  return serverPatch("/api/update/user", { id: userId, ...updateUser });
};
