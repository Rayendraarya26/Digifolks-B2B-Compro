import HeroSection from "@/components/dom/HeroSection";
import OurDNA from "@/components/dom/OurDNA";
import Services from "@/components/dom/Services";
import Portfolio from "@/components/dom/Portfolio";
import PortfolioV2 from "@/components/dom/PortfolioV2";
import PortfolioV3 from "@/components/dom/PortfolioV3";
import Testimonials from "@/components/dom/Testimonials";
import ContactArcade from "@/components/dom/contact/lp/ContactArcade";
import FaqChat from "@/components/dom/FaQ/lp/FaQChat";
import GrandCTA from "@/components/dom/GrandCTA";
import { GeneralData } from "@/data/general";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Scalable Operational Systems for Your Business",
  description: "We design and develop scalable systems that reduce operational complexity, improve reliability, and support long-term business growth. Talk to our team today.",
};


export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection heroAnim={GeneralData[0].heroAnimationUrl} heroCTA={GeneralData[0].heroCTAUrl} />
      <OurDNA />
      <Services />
      <PortfolioV3 />
      <Testimonials />
      <ContactArcade />
      <FaqChat />
      <GrandCTA grandCTAUrl={GeneralData[0].grandCTAUrl} />
    </div>
  );
}