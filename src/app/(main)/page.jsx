import FeaturedProperties from "@/components/home/FeaturedProperties";
import HeroSection from "@/components/home/Hero";
import TopReviewSection from "@/components/home/TopReviewSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PropertyFilters from "@/components/reusable/PropertyFilters";

export default function Home() {
  return (
    <section className="">
      <HeroSection></HeroSection>
      <div className="relative w-full">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-3 z-10 ">
          <PropertyFilters></PropertyFilters>
        </div>
      </div>
      <FeaturedProperties></FeaturedProperties>
      <WhyChooseUs></WhyChooseUs>
      <TopReviewSection></TopReviewSection>
    </section>
  );
}
