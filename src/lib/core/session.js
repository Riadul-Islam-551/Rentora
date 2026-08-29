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

export const checkAuthentication = async (requiredRole) => {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/");
  }

  const loggedInUserRole = user?.role?.toLowerCase();
  const role = requiredRole?.toLowerCase();

  if (loggedInUserRole !== role) {
    return {
      authorized: false,
      user,
    };
  }

  return {
    authorized: true,
    user,
  };
};
