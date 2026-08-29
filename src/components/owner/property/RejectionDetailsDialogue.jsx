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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { BellRing, Calendar, MessageSquare, User } from "lucide-react";
import { getPropertyRejection } from "@/lib/api/rejection";

export async function RejectionDetailsDialogue({ property }) {
  const rejectionRes = await getPropertyRejection(property?._id);
  const rejectionData = rejectionRes?.data;

  if (!rejectionData) {
    return null;
  }

  const formattedDate = rejectionData.createdAt
    ? new Date(rejectionData.createdAt).toLocaleDateString("en-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const formattedTime = rejectionData.createdAt
    ? new Date(rejectionData.createdAt).toLocaleTimeString("en-BD", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="destructive" className="flex-1 ">
            <BellRing className="size-4" />
            View Rejection
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BellRing className="size-5 text-error" />
            Rejection Details
          </DialogTitle>

          <DialogDescription>
            Details about why this property was rejected.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Property */}
          <div className="space-y-2">
            <Label>Property</Label>

            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="font-medium">
                {property?.title || "Unknown property"}
              </p>

              {property?.location && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {property.location}
                </p>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <Label>Status</Label>

            <Badge
              variant="outline"
              className="border-error/30 bg-error/10 text-error capitalize"
            >
              Rejected
            </Badge>
          </div>

          {/* Rejection Message */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MessageSquare className="size-4" />
              Rejection Reason
            </Label>

            <div className="rounded-lg border bg-error/5 p-4">
              <p className="text-sm  text-error/70 font-semibold">
                {rejectionData.message}
              </p>
            </div>
          </div>

          {/* Created By */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <User className="size-4" />
              Rejected By
            </Label>

            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="font-mono text-xs text-muted-foreground">Admin</p>
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="size-4" />
              Rejection Date
            </Label>

            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-sm font-medium">{formattedDate}</p>

              <p className="text-xs text-muted-foreground">{formattedTime}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
