"use client";

import { useEffect, useState } from "react";
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
import { patchUser } from "@/lib/actions/user";
import { useToast } from "@/lib/core/toastContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function UpdateUserRoleDialogue({ user }) {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (user?.role) {
      setSelectedRole(user.role.toLowerCase());
    }
  }, [user]);

  const currentRole = user?.role?.toLowerCase();

  const availableRoles = ["admin", "owner", "tenant"].filter(
    (role) => role !== currentRole,
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedRole) {
      toast({
        message: "Please select a role",
        type: "error",
      });

      return;
    }

    try {
      setLoading(true);

      const updateUser = {
        role: selectedRole,
      };

      console.log("Updating user:", {
        id: user?._id,
        updateUser,
      });

      const response = await patchUser(user?._id, updateUser);

      if (!response?.success) {
        throw new Error(response?.message || "Failed to update user");
      }

      toast({
        message: "User role updated successfully",
        type: "success",
      });

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error("Update user error:", error);

      toast({
        message: error?.message || "Failed to update user",
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
          <Button variant="outline" size="xs">
            Change Role
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>

          <DialogDescription>
            Select a new role for{" "}
            <span className="font-medium text-foreground">{user?.name}</span>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3 py-4">
            <p className="text-sm font-medium">Select Role</p>

            <div className="grid gap-3">
              {availableRoles.map((role) => (
                <label
                  key={role}
                  className={`
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-lg
                    border
                    p-4
                    transition-all
                    hover:bg-muted/50
                    ${
                      selectedRole === role
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={selectedRole === role}
                    onChange={(event) => setSelectedRole(event.target.value)}
                    disabled={loading}
                    className="size-4 accent-primary"
                  />

                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <p className="font-medium capitalize">{role}</p>

                      <p className="text-xs text-muted-foreground">
                        Change user role to {role}
                      </p>
                    </div>

                    {selectedRole === role && (
                      <span className="text-xs font-medium text-primary">
                        Selected
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>

            <div className="rounded-lg bg-muted/50 px-4 py-3">
              <p className="text-xs text-muted-foreground">Selected role</p>

              <p className="mt-1 font-semibold capitalize">
                {selectedRole || "No role selected"}
              </p>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={
                loading || !selectedRole || selectedRole === currentRole
              }
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
