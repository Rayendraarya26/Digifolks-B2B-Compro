import HeroSection from "@/components/dom/HeroSection";
import OurDNA from "@/components/dom/OurDNA";
import Services from "@/components/dom/Services";
import Portfolio from "@/components/dom/Portfolio";
import Testimonials from "@/components/dom/Testimonials";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection />
      <OurDNA />
      <Services />
      <Portfolio />
      <Testimonials />
    </div>
  );
}