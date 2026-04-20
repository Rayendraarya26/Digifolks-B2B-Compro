import ContactLaunchpad from "@/components/dom/page/ContactLaunchpad";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Start Your System Development",
  description: "Discuss your system requirements with our team. We design scalable, reliable, and efficient operational solutions.",
};

export default function PortfoliosPage() {
  return (
    <div className="flex w-full flex-col">
        <ContactLaunchpad />
    </div>
  );
}