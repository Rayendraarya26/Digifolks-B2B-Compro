import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { securityData } from "@/data/legal/securityData";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> | { lang: string } 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang || 'en') as 'en' | 'id';
  const doc = securityData[lang] || securityData.en;
  const title = `${doc.title} — Digifolks`;
  const description = doc.intro.slice(0, 160);
  const url = `/${lang}/security`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: '/en/security',
        id: '/id/security',
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: "/Dih.webp",
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
  };
}

export default async function SecurityPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> | { lang: string } 
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang || 'en') as 'en' | 'id';
  const doc = securityData[lang] || securityData.en;

  return <LegalDocumentLayout document={doc} lang={lang} />;
}
