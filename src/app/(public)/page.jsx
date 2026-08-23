import FeaturedProperties from "@/components/home/FeaturedProperties";
import HeroSection from "@/components/home/Hero";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="">
      <HeroSection></HeroSection>
      <FeaturedProperties></FeaturedProperties>
    </section>
  );
}
