import { getAllProducts, getProductByHandle } from "@/app/lib/medusa"
import { notFound } from "next/navigation"
import ProductDetailClient from "./ProductDetailClient"
import type { Metadata } from "next"

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await getProductByHandle(id)
  if (!product) return { title: "Producto no encontrado — PURESKA" }
  return {
    title: `${product.name} — PURESKA`,
    description: product.description,
  }
}

export async function generateStaticParams() {
  try {
    const products = await getAllProducts()
    return products.map((p) => ({ id: p.handle }))
  } catch {
    return []
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const product = await getProductByHandle(id)
  if (!product) notFound()

  const all = await getAllProducts()
  const related = all.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

  return <ProductDetailClient product={product} related={related} />
}
