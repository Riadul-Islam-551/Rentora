import Link from "next/link";
import { ShieldAlert, Home, Lock, KeyRound } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <main className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-background px-4 py-12 text-foreground">
      {/* Background Glow Overlay */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/10 blur-[120px] sm:h-125 sm:w-125"
      />

      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
        {/* Header Icon Badge */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 text-destructive ring-8 ring-destructive/5">
          <ShieldAlert className="h-10 w-10 animate-pulse" />
        </div>

        {/* Text Content */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-destructive">
            <Lock className="h-3 w-3" />
            Error 403
          </span>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl">
            Access Denied
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            You don’t have permission to view this page or perform this action. Please log in with an authorized account or return home.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/login"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <KeyRound className="h-4 w-4" />
            Switch Account / Login
          </Link>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="h-4 w-4" />
            Return to Homepage
          </Link>
        </div>

        {/* Help Footer */}
        <div className="mt-6 border-t border-border pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Think this is a mistake? Contact support or check your active user role in the dashboard.
          </p>
        </div>
      </div>
    </main>
  );
}