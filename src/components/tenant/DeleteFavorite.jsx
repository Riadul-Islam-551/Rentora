"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { deleteFavorite } from "@/lib/actions/favorite";
import { useToast } from "@/lib/core/toastContext";
import { useRouter } from "next/navigation";
import { Router } from "lucide-react";

const DeleteFavorite = ({ propertyId, tenantId }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const route = useRouter();

  const handleDeleteFavorite = async () => {
    try {
      setLoading(true);

      const response = await deleteFavorite(propertyId, tenantId);

      console.log(response);

      if (response.success) {
        toast({
          message: "Remove Favorite Successfully",
          type: "success",
        });
        route.refresh();
      }
    } catch (error) {
      console.error(error.message);
      toast({
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="xs"
      disabled={loading}
      onClick={handleDeleteFavorite}
    >
      {loading ? "Removing..." : "Remove Favorite"}
    </Button>
  );
};

export default DeleteFavorite;
