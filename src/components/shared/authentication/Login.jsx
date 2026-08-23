"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { RegistrationPage } from "./Registration";

export function LoginPage({ trigger }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);

  const handleRegistration = () => {
    // First close login
    setLoginOpen(false);

    // Then open registration
    setTimeout(() => {
      setRegistrationOpen(true);
    }, 150);
  };

  return (
    <>
      {/* Login Sheet */}
      <Sheet open={loginOpen} onOpenChange={setLoginOpen}>
        {trigger && <SheetTrigger render={trigger} />}

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Log in</SheetTitle>

            <SheetDescription>
              Enter your account information to continue.
            </SheetDescription>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <label htmlFor="login-email">Email</label>

              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="login-password">Password</label>

              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            {/* Registration link */}
            <div className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={handleRegistration}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Create one
              </button>
            </div>
          </div>

          <SheetFooter>
            <Button type="submit">Log in</Button>

            <SheetClose render={<Button variant="outline">Cancel</Button>} />
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Registration Sheet */}
      <RegistrationPage
        open={registrationOpen}
        onOpenChange={setRegistrationOpen}
      />
    </>
  );
}
