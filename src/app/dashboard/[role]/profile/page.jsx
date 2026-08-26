import ProfileClient from "@/components/shared/profile/ProfileClient";
import { getLoggedInUser } from "@/lib/core/session";


export default async function ProfilePage() {
  const user = await getLoggedInUser();

  if (!user) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold">Profile unavailable</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Please log in to view your profile.
          </p>
        </div>
      </section>
    );
  }

  /*
   * Only pass plain serializable values to the client component.
   * This prevents Server → Client serialization problems.
   */
  const profile = {
    id: user?.id,
    name: user?.name ?? "User",
    email: user?.email ?? "",
    image: user?.image ?? "",
    role: user?.role?.toLowerCase() ?? "tenant",
    emailVerified: Boolean(user?.emailVerified),
    createdAt: user?.createdAt ? new Date(user.createdAt).toISOString() : null,
  };

  return <ProfileClient user={user} />;
}
