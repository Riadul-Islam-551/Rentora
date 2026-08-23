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

export function LoginPage({ trigger }) {
  return (
    <Sheet>
      <SheetTrigger render={trigger} />

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

            <Input id="login-password" type="password" placeholder="••••••••" />
          </div>
        </div>

        <SheetFooter>
          <Button type="submit">Log in</Button>

          <SheetClose render={<Button variant="outline">Cancel</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
