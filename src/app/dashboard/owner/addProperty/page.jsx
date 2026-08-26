import AddPropertyForm from "@/components/owner/property/AddPropertyForm";
import { getLoggedInUser } from "@/lib/core/session";

export default async function AddPropertyPage() {
  const user = await getLoggedInUser();

  return (
    <div className="p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Add Property
        </h1>

        <p className="text-muted-foreground">
          Add your property information and submit it for review.
        </p>
      </div>

      <AddPropertyForm user={user} />
    </div>
  );
}