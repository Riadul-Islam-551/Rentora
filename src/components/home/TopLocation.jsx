import React from "react";
import { MapPin, ArrowUpRight, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import newYork from "../../app/assets/new-york.avif";
import losAngelas from "../../app/assets/los-angelas.avif";
import miami from "../../app/assets/miami.avif";
import austin from "../../app/assets/austin.avif";

const locations = [
  {
    city: "New York, NY",
    properties: "120+ Listings",
    avgPrice: "$2,800/mo",
    image: newYork,
    tag: "Most Popular",
  },
  {
    city: "Los Angeles, CA",
    properties: "95+ Listings",
    avgPrice: "$2,400/mo",
    image: losAngelas,
    tag: "High Demand",
  },
  {
    city: "Miami, FL",
    properties: "80+ Listings",
    avgPrice: "$2,100/mo",
    image: miami,
    tag: "Beachfront",
  },
  {
    city: "Austin, TX",
    properties: "65+ Listings",
    avgPrice: "$1,850/mo",
    image: austin,
    tag: "Fast Growing",
  },
];

export default function TopLocations() {
  return (
    <section className="py-20 bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge
            variant="secondary"
            className="mb-3 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary text-secondary-foreground rounded-full"
          >
            Explore Cities
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Top Rental Locations
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Find premium homes and apartments in the most sought-after cities.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, idx) => (
            <Card
              key={idx}
              className="group overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={loc.image}
                  alt={loc.city}
                  width={300} height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur-md text-foreground text-xs border border-border">
                  {loc.tag}
                </Badge>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-bold text-base">{loc.city}</span>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{loc.properties}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    Avg. {loc.avgPrice}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
