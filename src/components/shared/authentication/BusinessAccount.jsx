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

export function BusinessAccountPage({ trigger }) {
  return (
    <Sheet>
      <SheetTrigger render={trigger} />

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Account</SheetTitle>

          <SheetDescription>
            Enter your valid information to create your business account.
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

            <Input id="login-password" type="password" placeholder="••••••••" />
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
