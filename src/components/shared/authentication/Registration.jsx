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

export function RegistrationPage({ trigger, open, onOpenChange }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* Only render the trigger when one is provided */}
      {trigger && <SheetTrigger render={trigger} />}

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Registration</SheetTitle>

          <SheetDescription>
            Enter your valid information to book any property or view property
            details.
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <label htmlFor="registration-email">Email</label>

            <Input
              id="registration-email"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="grid gap-3">
            <label htmlFor="registration-password">Password</label>

            <Input
              id="registration-password"
              type="password"
              placeholder="••••••••"
            />
          </div>
        </div>

        <SheetFooter>
          <Button type="submit">Create Account</Button>

          <SheetClose render={<Button variant="outline">Cancel</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
