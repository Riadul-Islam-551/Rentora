import React from "react";
import {
  ShieldCheck,
  CreditCard,
  MessageSquare,
  Headphones,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    description:
      "Every property listing is manually verified by our admin team before going live to eliminate fraud.",
    highlight: "100% Admin Approved",
  },
  {
    icon: CreditCard,
    title: "Secure Stripe Payments",
    description:
      "Integrated with Stripe to ensure all reservation transactions and booking fees are safe and instant.",
    highlight: "Encrypted Transactions",
  },
  {
    icon: MessageSquare,
    title: "Direct Owner Messaging",
    description:
      "Connect, inquire, and coordinate directly with verified property owners without middleman delays.",
    highlight: "Transparent Communication",
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Support",
    description:
      "Our customer service team is available around the clock to assist you at every step of your rental journey.",
    highlight: "Round-the-Clock Help",
  },
];

const platformHighlights = [
  "Zero hidden listing fees or surprise charges",
  "Instant online reservation confirmation",
  "Seamless dashboard for managing bookings",
  "Real tenant reviews and verified ratings",
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="secondary"
            className="mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-secondary text-secondary-foreground rounded-full"
          >
            The Rentora Advantage
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Why Rentora is Your Best Rental Partner
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            We provide a secure, transparent, and hassle-free experience for
            both tenants looking for a dream home and property owners.
          </p>
        </div>

        {/* Feature Cards Grid (4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="h-full border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Icon & Highlight */}
                  <div className="flex items-center justify-between flex-wrap gap-2  mb-6">
                    <div className="p-3.5 rounded-2xl bg-primary/10 text-primary">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                      {feature.highlight}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Highlight Banner / Platform Benefits Summary */}
        <div className="rounded-2xl bg-card border border-border p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Experience a smarter way to rent properties
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Whether you are renting your first apartment or managing a
                portfolio of rental properties, Rentora simplifies real estate
                transactions with state-of-the-art tools and built-in
                protection.
              </p>

              {/* Bulleted Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {platformHighlights.map((benefit, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Side Action */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-4 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
              <div className="text-left lg:text-right">
                <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Ready to get started?
                </p>
                <p className="text-lg font-bold text-foreground">
                  Find your home in minutes
                </p>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md flex items-center justify-center gap-2">
                Explore All Listings
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
