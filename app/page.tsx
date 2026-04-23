import { getAllProducts } from "@/app/lib/shopify"
import Hero from "@/app/components/sections/Hero"
import ValuesSection from "@/app/components/sections/ValuesSection"
import FeaturedProducts from "@/app/components/sections/FeaturedProducts"
import UGCSection from "@/app/components/sections/UGCSection"
import CategorySplit from "@/app/components/sections/CategorySplit"
import CommunityCounter from "@/app/components/sections/CommunityCounter"
import Testimonials from "@/app/components/sections/Testimonials"
import NewsletterBanner from "@/app/components/sections/NewsletterBanner"

export default async function Home() {
  const products = await getAllProducts()

  return (
    <>
      <Hero />
      <ValuesSection />
      <FeaturedProducts products={products} />
      <UGCSection />
      <CategorySplit />
      <CommunityCounter />
      <Testimonials />
      <NewsletterBanner />
    </>
  )
}
