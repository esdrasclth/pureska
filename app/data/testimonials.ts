export type Testimonial = {
  id: number
  quote: string
  name: string
  tag: string
  stars: number
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "I've tried dozens of serums. The Glow Surge is the first one where I actually saw a difference in the mirror.",
    name: "Isabella T.",
    tag: "Dry skin · Brightening",
    stars: 5,
  },
  {
    id: 2,
    quote:
      "The Vitality Greens don't taste like lawn. That alone deserves five stars. The energy boost is real and doesn't crash like caffeine.",
    name: "Miguel A.",
    tag: "Energy · Fitness",
    stars: 5,
  },
  {
    id: 3,
    quote:
      "PURESKA is the first brand where I bought skincare AND a supplement in the same cart and felt like they were made for each other.",
    name: "Camila R.",
    tag: "All skin types · Wellness",
    stars: 5,
  },
]
