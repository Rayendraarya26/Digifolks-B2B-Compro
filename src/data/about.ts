// Tipe data untuk interaksi About Us ("Our DNA")
export interface TeamDNA {
  id: string;
  value: string;
  shortPitch: string;
}

export const teamDNAData: TeamDNA[] = [
  {
    id: "dna-1",
    value: "Build Fast. Scale Safely.",
    shortPitch: "Speed matters—but system stability is never compromised.",
  },
  {
    id: "dna-2",
    value: "Function Over Interface Noise",
    shortPitch: "Every interface is designed to support real operational workflows.",
  },
  {
    id: "dna-3",
    value: "Systems That Evolve",
    shortPitch: "Built with modular architecture to adapt as your business grows.",
  }
];