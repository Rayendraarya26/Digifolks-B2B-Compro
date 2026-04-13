export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "t1",
    quote: "THEY REBUILT OUR ENTIRE STACK IN 2 WEEKS.",
    author: "CTO, FINTECH STARTUP",
  },
  {
    id: "t2",
    quote: "AESTHETICS ON POINT. PERFORMANCE OFF THE CHARTS.",
    author: "FOUNDER, WEB3 DAO",
  },
  {
    id: "t3",
    quote: "WE STOPPED CRASHING ON BLACK FRIDAY.",
    author: "VP ENG, E-COMMERCE",
  },
  {
    id: "t4",
    quote: "THEY DON'T JUST WRITE CODE, THEY ENGINEER ART.",
    author: "DIRECTOR, CREATIVE AGENCY",
  }
];