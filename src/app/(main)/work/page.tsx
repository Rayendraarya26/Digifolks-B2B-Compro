import PortfolioList from "@/components/dom/page/PortfolioList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Real Systems Built for Real Problems",
  description: "Explore case studies of scalable systems solving operational bottlenecks, data complexity, and business growth challenges.",
};

export default function PortfoliosPage() {
  return (
    <div className="flex w-full flex-col">
        <PortfolioList />
    </div>
  );
}