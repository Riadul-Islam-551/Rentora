import Link from "next/link";
import { Home, Building2, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Animated Floating Spheres */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-75 w-75 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-primary/10 blur-[100px] sm:h-125 sm:w-125" />

      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        {/* Animated Icon Badge */}
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-muted/60 p-4 shadow-inner outline outline-border">
          <Building2 className="h-12 w-12 animate-bounce text-primary transition-transform" />
          <div className="absolute -right-2 -top-2 flex h-8 w-8 animate-spin items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md animation-duration:[8s]">
            <Compass className="h-5 w-5" />
          </div>
        </div>

        {/* 404 Code Display */}
        <span className="text-sm font-semibold uppercase tracking-widest text-primary">
          Error 404
        </span>

        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Page Not Found
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Oops! The page you are looking for has moved, been
          unlisted or doesn&apos;t exist in our rental marketplace.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl active:scale-95"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

        {/* Quick Helper */}
        <p className="mt-10 text-xs text-muted-foreground">
          If you believe this is a system error, please contact Rentora <Link href='#' className="text-primary underline">support</Link>.
        </p>
      </div>
    </div>
  );
}
