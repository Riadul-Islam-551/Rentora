import UnauthorizedPage from "@/app/Unauthorized";
import { checkAuthentication } from "@/lib/core/session";


export default async function OwnerDashboardLayout({ children }) {
  const result = await checkAuthentication("owner");

  if (!result.authorized) {
    return <UnauthorizedPage />;
  }

  return children;
}