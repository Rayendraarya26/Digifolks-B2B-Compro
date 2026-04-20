export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "Their frontend magic made our conversion rate skyrocket. Absolute wizards.",
    author: "Sarah J., Startup Founder",
  },
  {
    id: "2",
    quote: "I didn't know a dashboard could look this sexy. My team loves it.",
    author: "Mike T., Product Manager",
  },
  {
    id: "3",
    quote: "Fast, reliable, and they actually understand Gen Z aesthetics.",
    author: "Elena R., Creative Director",
  },
  {
    id: "4",
    quote:
      "They rebuilt our backend architecture from scratch. Zero downtime since.",
    author: "David L., CTO",
  },
  {
    id: "5",
    quote: "From Figma to React, pixel perfect. Best agency I've worked with.",
    author: "Chloe W., Designer",
  },
];
