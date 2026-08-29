"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

import { createPropertyRejection } from "@/lib/actions/rejection";
import { patchProperty } from "@/lib/actions/property";
import { useToast } from "@/lib/core/toastContext";

import { X, Loader2, Send } from "lucide-react";

export function PropertyRejectDialogue({ property, user }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { toast } = useToast();
  const router = useRouter();

  const handleReject = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      toast({
        message: "Please provide a rejection reason",
        type: "error",
      });

      return;
    }

    try {
      setLoading(true);

      const rejectionData = {
        propertyId: property?._id,
        message: trimmedMessage,
        createdBy: user?.id,
        propertyOwner: property?.ownerId,
      };

      const rejectionResponse = await createPropertyRejection(rejectionData);

      if (!rejectionResponse?.success) {
        throw new Error(
          rejectionResponse?.message || "Failed to create rejection",
        );
      }

      const updatePropertyStatus = {
        status: "rejected",
      };

      const response = await patchProperty(property?._id, updatePropertyStatus);

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to update property status",
        );
      }

      /*
       * Everything succeeded.
       */
      toast({
        message: "Property rejected successfully",
        type: "success",
      });

      setMessage("");
      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error("Reject property error:", error);

      toast({
        message: "Failed to reject property",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!loading) {
          setOpen(value);

          if (!value) {
            setMessage("");
          }
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="h-8 flex-1 w-full text-xs text-error border-error/30 hover:bg-error/20 hover:text-error"
        >
          <X className="size-4" />
          Reject
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reject Property</DialogTitle>

          <DialogDescription>
            Are you sure you want to reject
            <span className="font-medium text-foreground">
              {property?.title}
            </span>
            ? Please provide a reason for the rejection.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <label htmlFor="rejection-message" className="text-sm font-medium">
            Rejection Reason
            <span className="ml-1 text-error">*</span>
          </label>

          <Textarea
            id="rejection-message"
            placeholder="Explain why this property is being rejected..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            disabled={loading}
            rows={5}
            maxLength={500}
          />

          <div className="flex justify-end">
            <span className="text-xs text-muted-foreground">
              {message.length}/500
            </span>
          </div>
        </div>

        <DialogFooter className="border-t bg-muted/30 px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            variant="destructive"
            onClick={handleReject}
            disabled={loading || !message.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Rejecting...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Reject Property
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
