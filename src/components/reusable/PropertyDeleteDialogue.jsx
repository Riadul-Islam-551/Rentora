"use client";

import { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";

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
import { useToast } from "@/lib/core/toastContext";
import { deleteProperty } from "@/lib/actions/property";
import { useRouter } from "next/navigation";

export default function PropertyDeleteDialogue({ property }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await deleteProperty(property._id);

      if (!response?.success) {
        throw new Error(response?.message || "Failed to delete property");
      }

      // Close dialog after successful deletion
      setOpen(false);
      toast({
        message: "Delete the property successfully !",
        type: "success",
      });

      // Refresh the current Server Component/page
      router.refresh();
    } catch (error) {
      console.error("Delete property error:", error);
      toast({
        message: "Something went wrong !",
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
          <Button variant="destructive" className="flex-1 w-full gap-2">
            <Trash2 className="size-4" />
            Delete
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="size-5 text-destructive" />
          </div>

          <DialogTitle>Delete property?</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="text-primary">{property.title} ?</span>
            <span className="text-destructive block text-xs mt-3 ">
              This action cannot be undone.
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-2">
          <DialogClose
            render={
              <Button variant="outline" disabled={loading}>
                Cancel
              </Button>
            }
          />

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete Property
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
