// Tipe data untuk info general
export interface GeneralData {
  id: string;
  heroAnimationUrl: string;
  heroCTAUrl: string;
  grandCTAUrl: string;
  footerContactUrl: {
    instagram: string;
    linkedin: string;
    github: string;
  };
}

export const GeneralData: GeneralData[] = [
  {
    id: "gen-1",
    heroAnimationUrl: "/Video/Hero/HeroAnimV2.webm",
    heroCTAUrl: "/contact",
    grandCTAUrl: "/services",
    footerContactUrl: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  }
];