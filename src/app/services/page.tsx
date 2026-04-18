// import ServicesScrollytelling from "@/components/dom/page/ServicesScrollyTelling";
// import ServicesHyperBento from "@/components/dom/page/ServiceHyperBento";
import ServicesSplitSync from "@/components/dom/page/ServicesSplitSync";

export default function ServicesPage() {
  return (
    <div className="flex w-full flex-col">
        {/* <ServicesScrollytelling /> */}
        {/* <ServicesHyperBento /> */}
        <ServicesSplitSync />
    </div>
  );
}