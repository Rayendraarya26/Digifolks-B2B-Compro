import { Metadata } from "next";
import ContactClient from "./ContactClient";
import { getDictionary } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "Contact Us — Digifolks",
  description: "Let's build something solid. Tell us about your operational challenges.",
};

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang || 'en') as 'en' | 'id';
  const dict = await getDictionary(lang);

  return <ContactClient dict={dict} />;
}