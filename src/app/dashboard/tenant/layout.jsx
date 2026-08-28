import UnauthorizedPage from "@/app/Unauthorized";
import { checkAuthentication } from "@/lib/core/session";

export default async function TenantDashboardLayout({ children }) {
  const result = await checkAuthentication("tenant");

  if (!result.authorized) {
    return <UnauthorizedPage />;
  }

  return children;
}
