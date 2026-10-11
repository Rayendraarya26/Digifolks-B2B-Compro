import { Metadata } from "next";
import ContactClient from "./ContactClient";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const dict = await getDictionary(lang as 'en' | 'id');
  const seo = dict.seo?.contact || {
    title: "Contact Us",
    description: "Let's build something solid. Tell us about your operational challenges.",
  };
  const url = `/${lang}/contact`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        en: '/en/contact',
        id: '/id/contact',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: url,
      type: "website",
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang || 'en') as 'en' | 'id';
  const dict = await getDictionary(lang);

  return <ContactClient dict={dict} />;
}