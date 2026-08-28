import UnauthorizedPage from "@/app/Unauthorized";
import { checkAuthentication } from "@/lib/core/session";


export default async function AdminDashboardLayout({ children }) {
  const result = await checkAuthentication("admin");

  if (!result.authorized) {
    return <UnauthorizedPage />;
  }

  return children;
}
