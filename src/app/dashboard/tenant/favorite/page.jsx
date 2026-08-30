import PropertyGrid from "@/components/admin/propertyTable";
import FavoriteEmpty from "@/components/tenant/FavoriteEmpty";
import FavoriteTable from "@/components/tenant/FavoriteTable";
import { getFavorites } from "@/lib/api/favorite";
import { getLoggedInUser } from "@/lib/core/session";
import React from "react";

const FavoritePage = async () => {
  const tenant = await getLoggedInUser();

  if (!tenant) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-muted-foreground">
          Please login to view your favorite properties.
        </p>
      </div>
    );
  }

  const response = await getFavorites(tenant.id);
  console.log(response);
  //   try {
  //     response = await getFavorites(tenant.id);
  //   } catch (error) {
  //     console.error("Failed to fetch favorites:", error);

  //     return (
  //       <div className="flex min-h-100 items-center justify-center">
  //         <p className="text-muted-foreground">
  //           Failed to load favorite properties.
  //         </p>
  //       </div>
  //     );
  //   }

  const favoriteProperties = response?.data;
  console.log("favorite", favoriteProperties);

  return (
    <section className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          My Favorites
        </h1>

        <p className="mt-1 text-sm text-muted-foreground space-x-1">
          <span>{response?.totalFavorites}</span>
          <span>
            {response?.totalFavorites === 1 ? "property" : "properties"}
          </span>{" "}
          saved
        </p>
      </div>

      {/* Properties */}
      {response?.totalFavorites === 0 ? (
        <FavoriteEmpty />
      ) : (
        <FavoriteTable properties={favoriteProperties} />
      )}
       {/* <PropertyGrid properties={favoriteProperties} /> */}
    </section>
  );
};

export default FavoritePage;
