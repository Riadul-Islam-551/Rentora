import React from "react";
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  HeartHandshake,
} from "lucide-react";
import Image from "next/image";

import heroImage from "../../app/assets/hero-appartment.jpg";
import { Button } from "../ui/button";
import Feature from "../reusable/HeroFeature";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] w-full overflow-hidden bg-background">
      {/* Full-Bleed Hero Image */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src={heroImage}
          alt="Modern apartment complex"
          fill
          priority
          className="object-center object-cover"
        />

        {/* Left gradient for readable text */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/60  to-transparent" />

        {/* Additional subtle bottom gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-12">
        <div className="w-full max-w-200">
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Find a place you&apos;ll love
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-5xl font-bold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-[68px]">
            Find Your Next
            <br />
            <span className="text-primary">Perfect Home, Effortlessly.</span>
          </h1>

          {/* Accent */}
          <p className="mt-5 font-serif text-2xl italic leading-tight text-primary/90 sm:text-4xl">
            Your home. Your way.
          </p>

          {/* Subtitle */}
          <p className="mt-6 max-w-142.5 text-base leading-7 text-muted-foreground sm:text-lg">
            Discover verified rental properties, book seamlessly, and manage
            payments securely all in one place.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button className={"p-5"}>
              Explore Properties
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>

            <Button variant="outline" className={"p-5"}>
              How It Works
            </Button>
          </div>

          {/* Features */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-6">
            <Feature
              icon={<BadgeCheck size={22} strokeWidth={1.8} />}
              title="Verified Homes"
              description="Trusted listings"
            />

            <Feature
              icon={<HeartHandshake size={22} strokeWidth={1.8} />}
              title="Happy Renters"
              description="Stress-free renting"
            />

            <Feature
              icon={<CreditCard size={22} strokeWidth={1.8} />}
              title="Secure Payments"
              description="Safe & simple"
            />
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24 bg-linear-to-t from-background/30 to-transparent" />
    </section>
  );
}


