import ServicesSplitSync from "@/components/dom/page/ServicesSplitSync";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Scalable System Development",
  description: "Custom system development, enterprise tools, AI-driven platforms, and integrated ecosystems built for scalability and efficiency.",
};

export default function ServicesPage() {
  return (
    <div className="flex w-full flex-col">
        <ServicesSplitSync />
    </div>
  );
}