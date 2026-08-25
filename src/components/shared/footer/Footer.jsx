// import Link from "next/link";
import { Building2, Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground transition-colors duration-300">
      {/* Top Footer Call-to-Action Banner */}
      <div className="border-b border-border bg-secondary/40 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Subscribe to Rentora Properties
              </h3>
              <p className="text-sm text-muted-foreground">
                Get notified about new verified properties and rental price
                drops.
              </p>
            </div>
            <form
              className="flex w-full max-w-md items-center gap-2"
              // onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <span>Subscribe</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand Info (Spans 2 columns on lg) */}
          <div className="space-y-4 lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-primary"
            >
              <Building2 className="h-6 w-6 text-primary" />
              <span>Rentora</span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Connecting tenants and property owners through a transparent,
              secure, and modern rental marketplace. Find, book, and manage
              verified rentals effortlessly.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Modern X (Twitter) Icon Requirement */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Facebook Icon */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              {/* LinkedIn Icon */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Home Page
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  All Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Login Account
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Register as Tenant/Owner
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Property Types */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Property Types
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/properties?type=apartment"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Apartments
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=house"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Family Houses
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=villa"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=studio"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Studio Spaces
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>100 Market St, Suite 400, San Francisco, CA</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+1 (555) 019-2834</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>support@rentora.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-card/50 py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
          <p>© 2026 Nestify Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/support"
              className="hover:text-primary transition-colors"
            >
              Support Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
