import { getAllProducts } from "@/app/lib/shopify"
import ProductsClient from "./ProductsClient"

export const metadata = {
  title: "Tienda — PURESKA",
  description: "Explora todos los suplementos y cosméticos PURESKA.",
}

export default async function ProductsPage() {
  const products = await getAllProducts()
  return <ProductsClient products={products} />
}
