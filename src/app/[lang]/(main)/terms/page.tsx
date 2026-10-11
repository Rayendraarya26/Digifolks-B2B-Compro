import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { termsData } from "@/data/legal/termsData";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> | { lang: string } 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang || 'en') as 'en' | 'id';
  const dict = await getDictionary(lang);
  const doc = termsData[lang] || termsData.en;
  const seo = dict.seo?.terms || {
    title: doc.title,
    description: doc.intro.slice(0, 160),
  };
  const url = `/${lang}/terms`;

  return {
    title: `${seo.title} — Digifolks`,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        en: '/en/terms',
        id: '/id/terms',
      },
    },
    openGraph: {
      title: `${seo.title} — Digifolks`,
      description: seo.description,
      url: url,
      type: "website",
      images: [
        {
          url: "/Dih.webp",
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
  };
}

export default async function TermsPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> | { lang: string } 
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang || 'en') as 'en' | 'id';
  const doc = termsData[lang] || termsData.en;

  return <LegalDocumentLayout document={doc} lang={lang} />;
}
