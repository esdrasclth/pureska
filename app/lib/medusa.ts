const MEDUSA_URL = process.env.MEDUSA_BACKEND_URL
const API_KEY = process.env.MEDUSA_API_KEY
const REGION_ID = process.env.MEDUSA_REGION_ID

async function medusaFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  if (!MEDUSA_URL || !API_KEY) throw new Error("Medusa env vars not configured")

  const url = new URL(`${MEDUSA_URL}${path}`)
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  if (REGION_ID) url.searchParams.set("region_id", REGION_ID)

  const res = await fetch(url.toString(), {
    headers: { "x-publishable-api-key": API_KEY },
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`Medusa fetch failed: ${res.status}`)
  return res.json()
}

// ─── Types ───────────────────────────────────────────────────────────────────

type MedusaPrice = { amount: number; currency_code: string }

type MedusaVariant = {
  id: string
  title: string
  manage_inventory: boolean
  inventory_quantity: number | null
  prices: MedusaPrice[]
  calculated_price?: { calculated_amount: number; currency_code: string }
}

type MedusaProduct = {
  id: string
  handle: string | null
  title: string
  description: string | null
  thumbnail: string | null
  images: { url: string }[]
  tags: { value: string }[]
  categories: { handle: string; name: string }[]
  variants: MedusaVariant[]
}

export type NormalizedProduct = {
  id: string
  handle: string
  name: string
  category: "supplement" | "cosmetic"
  price: number
  currencyCode: string
  tagline: string
  description: string
  descriptionHtml: string
  tags: string[]
  stock: "in_stock" | "low_stock" | "out_of_stock"
  images: string[]
  variants: { id: string; title: string; available: boolean; price: number }[]
  stars: number
  reviews: number
}

// ─── Normalize ───────────────────────────────────────────────────────────────

function normalize(p: MedusaProduct): NormalizedProduct {
  const tags = p.tags?.map((t) => t.value) ?? []
  const categoryHandles = p.categories?.map((c) => c.handle.toLowerCase()) ?? []
  const categoryNames = p.categories?.map((c) => c.name.toLowerCase()) ?? []

  const isSupp =
    categoryHandles.some((h) => h.includes("supplement")) ||
    categoryNames.some((n) => n.includes("supplement")) ||
    tags.some((t) => t.toLowerCase() === "supplement" || t.toLowerCase() === "supplements")

  const category: NormalizedProduct["category"] = isSupp ? "supplement" : "cosmetic"

  const firstVariant = p.variants?.[0]
  const calcPrice = firstVariant?.calculated_price?.calculated_amount
  const rawPrice = firstVariant?.prices?.[0]?.amount
  const price = calcPrice != null ? calcPrice / 100 : rawPrice != null ? rawPrice / 100 : 0

  const currencyCode = (
    firstVariant?.calculated_price?.currency_code ??
    firstVariant?.prices?.[0]?.currency_code ??
    "usd"
  ).toUpperCase()

  const qty = firstVariant?.inventory_quantity ?? 100
  const managed = firstVariant?.manage_inventory ?? false
  const stock: NormalizedProduct["stock"] = !managed
    ? "in_stock"
    : qty <= 0
    ? "out_of_stock"
    : qty <= 5
    ? "low_stock"
    : "in_stock"

  const images =
    p.images?.map((i) => i.url).filter(Boolean) ??
    (p.thumbnail ? [p.thumbnail] : [])

  const description = p.description ?? ""
  const lines = description.split("\n").filter(Boolean)
  const tagline = lines[0] || description.slice(0, 120)

  return {
    id: p.id,
    handle: p.handle ?? p.id,
    name: p.title,
    category,
    price,
    currencyCode,
    tagline,
    description,
    descriptionHtml: description,
    tags,
    stock,
    images,
    variants: (p.variants ?? []).map((v) => {
      const vCalc = v.calculated_price?.calculated_amount
      const vRaw = v.prices?.[0]?.amount
      const vPrice = vCalc != null ? vCalc / 100 : vRaw != null ? vRaw / 100 : price
      return {
        id: v.id,
        title: v.title,
        available: !v.manage_inventory || (v.inventory_quantity ?? 1) > 0,
        price: vPrice,
      }
    }),
    stars: 4.8,
    reviews: 0,
  }
}

// ─── Queries ─────────────────────────────────────────────────────────────────

const PRODUCT_FIELDS =
  "+images,+tags,+categories,+variants.prices,+variants.calculated_price"

export async function getAllProducts(): Promise<NormalizedProduct[]> {
  try {
    const data = await medusaFetch<{ products: MedusaProduct[] }>("/store/products", {
      limit: "50",
      fields: PRODUCT_FIELDS,
    })
    return (data.products ?? []).map(normalize)
  } catch {
    return []
  }
}

export async function getProductByHandle(handle: string): Promise<NormalizedProduct | null> {
  try {
    const data = await medusaFetch<{ products: MedusaProduct[] }>("/store/products", {
      handle,
      fields: PRODUCT_FIELDS,
    })
    return data.products?.[0] ? normalize(data.products[0]) : null
  } catch {
    return null
  }
}

export async function getProductsByCategory(
  category: "supplement" | "cosmetic"
): Promise<NormalizedProduct[]> {
  const all = await getAllProducts()
  return all.filter((p) => p.category === category)
}
