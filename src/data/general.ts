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
  email: string;
  contactNumber: {
    name: string;
    displayNumber: string;
    contactNumber: string; // wa -> https://wa.me/{number} atau telepon -> tel:{number}
    hoverColor: string;
  }[];
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
      github: "https://github.com",
    },
    email: "digifolkstech@gmail.com",
    contactNumber: [
      {
        name: "Ailsa",
        displayNumber: "+62 895-4010-88270",
        contactNumber: "https://wa.me/62895401088270",
        hoverColor: "hover:text-pop-green",
      },
      {
        name: "Vellan",
        displayNumber: "+62 895-8004-03266",
        contactNumber: "https://wa.me/62895800403266",
        hoverColor: "hover:text-pop-blue",
      },
      // {
      //   name: "Yahya",
      //   displayNumber: "+62 858-6696-3759",
      //   contactNumber: "https://wa.me/6285866963759",
      //   hoverColor: "hover:text-pop-pink",
      // },
    ],
  },
];
