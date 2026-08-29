"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { patchProperty } from "@/lib/actions/property";
import { useToast } from "@/lib/core/toastContext";
import { Loader2, Pencil, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function PropertyApproveDialogue({ property }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleApprove = async () => {
    try {
      setLoading(true);

      const updateProperty = {
        status: "approved",
      };

      const response = await patchProperty(property?._id, updateProperty);

      if (!response?.success) {
        throw new Error(response?.message || "Failed to update property");
      }

      toast({
        message: "Property approved successfully",
        type: "success",
      });

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Update property error:", error);

      toast({
        message: error?.message || "Failed to update property",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-full flex-1 text-xs text-success border-success/30 hover:bg-success/20 hover:text-success"
          >
            <Check className="size-4" />
            Approve
          </Button>
        }
      />

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Approve Property</DialogTitle>

          <DialogDescription>
            Are you sure you want to approve{" "}
            <span className="font-medium text-foreground">
              {property?.title}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="border-t bg-muted/30 px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>

          <Button type="button" onClick={handleApprove} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Pencil className="size-4" />
                Approve
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
