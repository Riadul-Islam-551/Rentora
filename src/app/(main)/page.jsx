import FeaturedProperties from "@/components/home/FeaturedProperties";
import HeroSection from "@/components/home/Hero";
import PropertyFilters from "@/components/reusable/PropertyFilters";

export default function Home() {
  return (
    <section className="">
      <HeroSection></HeroSection>
      <div className="relative w-full">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-full max-w-4xl px-3">
          <PropertyFilters></PropertyFilters>
        </div>
      </div>
      <FeaturedProperties></FeaturedProperties>
    </section>
  );
}
