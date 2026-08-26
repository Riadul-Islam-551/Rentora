"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Pencil,
  ShieldCheck,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const roleConfig = {
  tenant: {
    label: "Tenant",
    description: "Property renter",
    className: "bg-info/10 text-info border-info/20",
  },

  owner: {
    label: "Owner",
    description: "Property owner",
    className: "bg-success/10 text-success border-success/20",
  },

  admin: {
    label: "Administrator",
    description: "Platform administrator",
    className: "bg-warning/10 text-warning border-warning/20",
  },
};

function formatDate(date) {
  if (!date) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function getInitials(name) {
  if (!name) return "U";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function ProfileClient({ user }) {
  const role = roleConfig[user.role] || roleConfig.tenant;

  const initials = getInitials(user.name);

  return (
    <main className="min-h-screen w-full overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 overflow-hidden">
        <div className="absolute left-[10%] top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute right-[10%] top-20 h-64 w-64 rounded-full bg-info/10 blur-3xl" />
      </div>

      <div className="">
        {/* Page header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Account</p>

            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              My Profile
            </h1>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft />
              Dashboard
            </Link>
          </Button>
        </div>

        {/* Profile Hero */}
        <Card
          className="
            relative overflow-hidden rounded-3xl
            border-border/60
            bg-card/80
            shadow-lg shadow-primary/5
            backdrop-blur-xl
          "
        >
          {/* Hero background */}
          <div
            className="
              absolute inset-x-0 top-0 h-36
              bg-gradient-to-r
              from-primary/20
              via-info/10
              to-primary/5
            "
          />

          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-primary/10" />

          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full border border-primary/10" />

          <CardContent className="relative p-6 pt-24 md:p-8 md:pt-24">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              {/* Identity */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className="
                      relative flex size-28
                      items-center justify-center
                      overflow-hidden rounded-full
                      border-4 border-card
                      bg-primary/10
                      shadow-xl
                      md:size-32
                    "
                  >
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={`${user.name}'s profile`}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-primary">
                        {initials}
                      </span>
                    )}
                  </div>

                  {/* Active indicator */}
                  <span
                    className="
                      absolute bottom-2 right-2
                      size-5 rounded-full
                      border-4 border-card
                      bg-success
                    "
                    title="Active account"
                  />
                </div>

                {/* User information */}
                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                      {user.name}
                    </h2>

                    {user.emailVerified && (
                      <CheckCircle2
                        className="size-5 text-success"
                        aria-label="Email verified"
                      />
                    )}
                  </div>

                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-4" />
                    {user.email}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={role.className}>
                      <ShieldCheck className="size-3.5" />
                      {role.label}
                    </Badge>

                    <span className="text-xs text-muted-foreground">
                      {role.description}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit */}
              <Button>
                <Pencil />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProfileStat
            icon={User}
            title="Account Type"
            value={role.label}
            description={role.description}
            iconClass="bg-primary/10 text-primary"
          />

          <ProfileStat
            icon={user.emailVerified ? CheckCircle2 : Clock3}
            title="Email Status"
            value={user.emailVerified ? "Verified" : "Not Verified"}
            description={
              user.emailVerified
                ? "Your email is verified"
                : "Email verification required"
            }
            iconClass={
              user.emailVerified
                ? "bg-success/10 text-success"
                : "bg-warning/10 text-warning"
            }
          />

          <ProfileStat
            icon={CalendarDays}
            title="Member Since"
            value={formatDate(user.createdAt)}
            description="Rentora account creation date"
            iconClass="bg-info/10 text-info"
          />
        </section>

        {/* Account Information */}
        <Card
          className="
            mt-6 rounded-3xl
            border-border/60
            bg-card/80
            shadow-sm
            backdrop-blur-xl
          "
        >
          <CardContent className="p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Account Information</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Basic information associated with your Rentora account.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem label="Full Name" value={user.name} icon={User} />

              <InfoItem label="Email Address" value={user.email} icon={Mail} />

              <InfoItem label="Role" value={role.label} icon={ShieldCheck} />

              <InfoItem
                label="Member Since"
                value={formatDate(user.createdAt)}
                icon={CalendarDays}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card
          className="
            mt-6 overflow-hidden rounded-3xl
            border-info/20
            bg-info/5
          "
        >
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info">
                <ShieldCheck className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold">Account Security</h3>

                <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                  Keep your account information up to date and make sure your
                  email address is verified.
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className="
                w-fit
                border-info/20
                bg-info/10
                text-info
              "
            >
              Secure Account
            </Badge>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function ProfileStat({ icon: Icon, title, value, description, iconClass }) {
  return (
    <Card
      className="
        group rounded-2xl
        border-border/60
        bg-card/80
        shadow-sm
        backdrop-blur-xl
      "
    >
      <CardContent className="flex items-start gap-4 p-5">
        <div
          className={`
            flex size-11 shrink-0 items-center justify-center
            rounded-xl
            ${iconClass}
          `}
        >
          <Icon className="size-5" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>

          <p className="mt-1 truncate font-semibold">{value}</p>

          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({ label, value, icon: Icon }) {
  return (
    <div
      className="
        flex items-center gap-4
        rounded-2xl border
        bg-background/50
        p-4
      "
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4.5" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>

        <p className="mt-1 truncate text-sm font-medium">
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
}
