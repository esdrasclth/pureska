export type Product = {
  id: number
  name: string
  category: "supplement" | "cosmetic"
  price: number
  tagline: string
  description: string
  ingredients: string[]
  howToUse: string
  tags: string[]
  stars: number
  reviews: number
  stock: "in_stock" | "low_stock" | "out_of_stock"
  images: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Inner Glow Collagen+",
    category: "supplement",
    price: 42.0,
    tagline: "Marine collagen + hyaluronic acid for skin from within",
    description:
      "A daily supplement combining hydrolyzed marine collagen with hyaluronic acid and vitamin C to support skin elasticity, hydration, and joint health.",
    ingredients: [
      "Hydrolyzed Marine Collagen 5000mg",
      "Hyaluronic Acid 100mg",
      "Vitamin C 80mg",
      "Biotin 500mcg",
    ],
    howToUse:
      "Mix 1 scoop in 250ml of water or juice daily, preferably in the morning.",
    tags: ["skin", "anti-aging", "joints"],
    stars: 4.9,
    reviews: 214,
    stock: "in_stock",
    images: ["https://placehold.co/600x700/F7F3EE/3D1A4B?text=Inner+Glow+Collagen%2B"],
  },
  {
    id: 2,
    name: "Vitality Stack Greens",
    category: "supplement",
    price: 47.0,
    tagline: "22-plant superfood blend, natural energy",
    description:
      "A comprehensive greens powder with 22 plants, adaptogens, and digestive enzymes for sustained energy and daily detox support.",
    ingredients: [
      "Spirulina 2g",
      "Chlorella 1g",
      "Ashwagandha 300mg",
      "Digestive Enzyme Blend 150mg",
    ],
    howToUse:
      "Mix 1 scoop in water or a smoothie every morning on an empty stomach.",
    tags: ["energy", "detox", "immunity"],
    stars: 4.7,
    reviews: 189,
    stock: "in_stock",
    images: ["https://placehold.co/600x700/F7F3EE/3D1A4B?text=Vitality+Stack+Greens"],
  },
  {
    id: 3,
    name: "Omega Shield 3x",
    category: "supplement",
    price: 32.0,
    tagline: "Ultra-pure omega-3, cold-pressed, no fishy aftertaste",
    description:
      "Triple-concentrated omega-3 from wild-caught fish, molecularly distilled for purity.",
    ingredients: ["EPA 660mg", "DHA 440mg", "Vitamin E 5mg"],
    howToUse: "Take 2 softgels daily with a meal.",
    tags: ["brain", "joints", "heart"],
    stars: 4.8,
    reviews: 302,
    stock: "in_stock",
    images: ["https://placehold.co/600x700/F7F3EE/3D1A4B?text=Omega+Shield+3x"],
  },
  {
    id: 4,
    name: "Glow Surge Vitamin C Serum",
    category: "cosmetic",
    price: 55.0,
    tagline: "15% stable Vitamin C, brightens in 7 days",
    description:
      "A powerful brightening serum with 15% ethyl ascorbic acid, niacinamide, and ferulic acid. Clinically shown to reduce dark spots in 7 days.",
    ingredients: [
      "Ethyl Ascorbic Acid 15%",
      "Niacinamide 5%",
      "Ferulic Acid 0.5%",
      "Hyaluronic Acid",
    ],
    howToUse:
      "Apply 3–4 drops to clean skin every morning before SPF.",
    tags: ["brightening", "all skin types", "anti-aging"],
    stars: 4.9,
    reviews: 427,
    stock: "in_stock",
    images: ["https://placehold.co/600x700/F7F3EE/3D1A4B?text=Glow+Surge+Serum"],
  },
  {
    id: 5,
    name: "Hydra-Repair Night Balm",
    category: "cosmetic",
    price: 49.0,
    tagline: "Retinol 0.3% + ceramides for overnight renewal",
    description:
      "An intensive overnight balm combining retinol, ceramides, and squalane to resurface and deeply moisturize while you sleep.",
    ingredients: [
      "Retinol 0.3%",
      "Ceramide NP + AP + EOP",
      "Squalane",
      "Panthenol 2%",
    ],
    howToUse:
      "Apply a pea-sized amount to face and neck at night, after serum.",
    tags: ["anti-aging", "dry skin", "repair"],
    stars: 4.8,
    reviews: 183,
    stock: "low_stock",
    images: ["https://placehold.co/600x700/F7F3EE/3D1A4B?text=Hydra-Repair+Night+Balm"],
  },
  {
    id: 6,
    name: "Pure Foam Cleanser",
    category: "cosmetic",
    price: 29.0,
    tagline: "pH-balanced, sulfate-free, leaves skin bouncy",
    description:
      "A gentle foaming cleanser that removes makeup and impurities without stripping the skin barrier. Fragrance-free and dermatologist tested.",
    ingredients: [
      "Glucoside Surfactant Blend",
      "Aloe Vera Extract",
      "Allantoin",
      "Panthenol",
    ],
    howToUse:
      "Massage onto wet face morning and evening, rinse thoroughly.",
    tags: ["sensitive", "daily", "all skin types"],
    stars: 4.6,
    reviews: 291,
    stock: "in_stock",
    images: ["https://placehold.co/600x700/F7F3EE/3D1A4B?text=Pure+Foam+Cleanser"],
  },
]
