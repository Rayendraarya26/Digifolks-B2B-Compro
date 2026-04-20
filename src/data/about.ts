// Tipe data untuk interaksi About Us ("Our DNA")
export interface TeamDNA {
  id: string;
  value: string;
  shortPitch: string;
}

export const teamDNAData: TeamDNA[] = [
  {
    id: "dna-1",
    value: "Move Fast, Don't Break Things",
    shortPitch: "Agility meets pixel-perfect precision.",
  },
  {
    id: "dna-2",
    value: "Aesthetics = Function",
    shortPitch: "Ugly software is a bug. We patch it.",
  },
  {
    id: "dna-3",
    value: "Always Beta",
    shortPitch: "Iterate relentlessly. Stagnation is the enemy.",
  }
];