import { headers } from "next/headers";
import { auth } from "../auth";
import { authClient } from "../auth-client";

export const getLoggedInUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  return session?.user;
};

export const logOutUser = async () => {
  await authClient.signOut();
};
