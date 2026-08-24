"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/lib/core/toastContext";

export default function LogOutUser({ className = "" }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogOut = async () => {
    setIsLoggingOut(true);

    try {
      await authClient.signOut();

      toast({
        message: "You have been successfully signed out.",
        type: "success",
      });

      // Refresh route state and redirect user to home/login
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);

      toast({
        type: "error",
        message: "Unable to log out right now. Please try again.",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      onClick={handleLogOut}
      disabled={isLoggingOut}
      className={`gap-2 ${className}`}
    >
      {isLoggingOut ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
        </>
      ) : (
        <>
          <span>Log Out</span>
        </>
      )}
    </Button>
  );
}
