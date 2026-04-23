export type UGCVideo = {
  id: number
  name: string
  city: string
  product: string
  stars: number
  videoUrl: string
  thumbnail: string
  quote: string
}

export const ugcVideos: UGCVideo[] = [
  {
    id: 1,
    name: "Sofia M.",
    city: "Ciudad de México, MX",
    product: "Glow Surge Vitamin C Serum",
    stars: 5,
    videoUrl: "/videos/ugc-sofia.mp4",
    thumbnail: "https://placehold.co/220x390/1a1a1a/FF5C47?text=Sofia+M.",
    quote: "Semana 3 y mi piel literalmente brilla",
  },
  {
    id: 2,
    name: "Carlos R.",
    city: "Bogotá, CO",
    product: "Vitality Stack Greens",
    stars: 5,
    videoUrl: "/videos/ugc-carlos.mp4",
    thumbnail: "https://placehold.co/220x390/1a1a1a/FF5C47?text=Carlos+R.",
    quote: "Lo tomo antes del gym, la diferencia es real",
  },
  {
    id: 3,
    name: "Valentina P.",
    city: "San Pedro Sula, HN",
    product: "Hydra-Repair Night Balm",
    stars: 4,
    videoUrl: "/videos/ugc-valentina.mp4",
    thumbnail: "https://placehold.co/220x390/1a1a1a/FF5C47?text=Valentina+P.",
    quote: "Piel de bebé al despertar, en serio",
  },
  {
    id: 4,
    name: "Andrés L.",
    city: "Lima, PE",
    product: "Omega Shield 3x",
    stars: 5,
    videoUrl: "/videos/ugc-andres.mp4",
    thumbnail: "https://placehold.co/220x390/1a1a1a/FF5C47?text=Andr%C3%A9s+L.",
    quote: "Sin el sabor a pescado que odiaba antes",
  },
  {
    id: 5,
    name: "Mariana F.",
    city: "Buenos Aires, AR",
    product: "Inner Glow Collagen+",
    stars: 5,
    videoUrl: "/videos/ugc-mariana.mp4",
    thumbnail: "https://placehold.co/220x390/1a1a1a/FF5C47?text=Mariana+F.",
    quote: "2 meses después y mis uñas también cambiaron",
  },
]
