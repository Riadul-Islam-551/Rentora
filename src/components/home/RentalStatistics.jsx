import React from "react";
import { Building, Users, CheckCircle2, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    icon: Building,
    value: "1,200+",
    label: "Properties Listed",
    description: "Verified homes available across major cities",
  },
  {
    icon: Users,
    value: "5,000+",
    label: "Happy Tenants",
    description: "Successfully matched with their dream rentals",
  },
  {
    icon: CheckCircle2,
    value: "98%",
    label: "Approval Rate",
    description: "Fast admin turnarounds for valid listings",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Secure Payments",
    description: "All deposit transactions handled via Stripe",
  },
];

export default function RentalStatistics() {
  return (
    <section className="py-20 bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 shadow-xs">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge
              variant="secondary"
              className="mb-3 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary text-secondary-foreground rounded-full"
            >
              Platform Overview
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
              Trust Built on Numbers
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Our transparent metrics demonstrate our commitment to tenants and
              property owners alike[cite: 1, 2].
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={idx}
                  className="border border-border bg-background/50 hover:border-primary/40 transition-all duration-300 text-center"
                >
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-1">
                      {stat.value}
                    </span>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {stat.label}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
