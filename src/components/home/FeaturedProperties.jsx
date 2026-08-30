import React from "react";
import { getProperty } from "@/lib/api/property";
import PublicPropertyGrid from "../reusable/PublicPropertyGrid";
import { Building2, Sparkles, MapPin } from "lucide-react";

const FeaturedProperties = async () => {
  const response = await getProperty();
  const properties = response?.data?.slice(0, 6) || [];
  console.log("home properties", properties);

  return (
    <section className="pt-56 md:pt-44 lg:pt-24 pb-16 bg-background text-foreground border-b border-border/50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Listings</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Popular Rental Destinations
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl">
            Explore our handpicked selection of top-rated apartments, villas,
            and homes available for rent.
          </p>

          {/* Decorative Subtle Accent Line */}
          <div className="w-16 h-1 bg-primary rounded-full mt-6 opacity-80" />
        </div>

        {/* Property Grid Content / Empty State Handling */}
        {properties.length > 0 && (
          <PublicPropertyGrid properties={properties} />
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
