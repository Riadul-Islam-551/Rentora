"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/core/toastContext";
import { createFavoriteProperty } from "@/lib/actions/favorite";

const FavoriteButton = ({ propertyId, tenantId }) => {
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);
  console.log("information", propertyId, tenantId);

  const { toast } = useToast();

  const handleFavorite = async () => {
    if (!propertyId || !tenantId) {
      toast({
        message: "Property or tenant information is missing",
        type: "error",
      });

      return;
    }

    try {
      setLoading(true);

      const response = await createFavoriteProperty({
        propertyId,
        tenantId,
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to add property to favorites",
        );
      }

      setFavorite(true);

      toast({
        message: "Property added to favorites",
        type: "success",
      });
    } catch (error) {
      console.error("Favorite error:", error);

      toast({
        message: error.message || "Failed to add property to favorites",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="w-full flex-1"
      onClick={handleFavorite}
      disabled={loading || favorite}
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <Heart
            className={`size-4 ${favorite ? "fill-current text-red-500" : ""}`}
          />

          {favorite ? "Added to Favorites" : "Mark as Favorite"}
        </>
      )}
    </Button>
  );
};

export default FavoriteButton;
