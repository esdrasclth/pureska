const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN
const API_URL = DOMAIN ? `https://${DOMAIN}/api/2024-01/graphql.json` : null

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!API_URL || !TOKEN) throw new Error("Shopify env vars not configured")
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })

  if (!res.ok) throw new Error(`Shopify fetch failed: ${res.status}`)
  const { data, errors } = await res.json()
  if (errors) throw new Error(errors[0].message)
  return data
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  tags: string[]
  availableForSale: boolean
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
  }
  images: { edges: { node: { url: string; altText: string | null } }[] }
  variants: {
    edges: {
      node: {
        id: string
        title: string
        availableForSale: boolean
        price: { amount: string }
      }
    }[]
  }
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

function normalize(p: ShopifyProduct): NormalizedProduct {
  const category = p.tags.some((t) => t.toLowerCase() === "cosmetic" || t.toLowerCase() === "cosmetics")
    ? "cosmetic"
    : "supplement"

  const stock: NormalizedProduct["stock"] = p.availableForSale ? "in_stock" : "out_of_stock"

  const lines = p.description.split("\n").filter(Boolean)
  const tagline = lines[0] || p.description.slice(0, 120)
  const description = p.description

  return {
    id: p.id,
    handle: p.handle,
    name: p.title,
    category,
    price: parseFloat(p.priceRange.minVariantPrice.amount),
    currencyCode: p.priceRange.minVariantPrice.currencyCode,
    tagline,
    description,
    descriptionHtml: p.descriptionHtml,
    tags: p.tags,
    stock,
    images: p.images.edges.map((e) => e.node.url),
    variants: p.variants.edges.map((e) => ({
      id: e.node.id,
      title: e.node.title,
      available: e.node.availableForSale,
      price: parseFloat(e.node.price.amount),
    })),
    stars: 4.8,
    reviews: 0,
  }
}

// ─── Fragments ───────────────────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    tags
    availableForSale
    priceRange {
      minVariantPrice { amount currencyCode }
    }
    images(first: 6) {
      edges { node { url altText } }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount }
        }
      }
    }
  }
`

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<NormalizedProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] }
  }>(`
    ${PRODUCT_FRAGMENT}
    query GetAllProducts {
      products(first: 50, sortKey: BEST_SELLING) {
        edges { node { ...ProductFields } }
      }
    }
  `)
  return data.products.edges.map((e) => normalize(e.node))
}

export async function getProductByHandle(handle: string): Promise<NormalizedProduct | null> {
  try {
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>(`
      ${PRODUCT_FRAGMENT}
      query GetProduct($handle: String!) {
        product(handle: $handle) { ...ProductFields }
      }
    `, { handle })
    return data.product ? normalize(data.product) : null
  } catch {
    return null
  }
}

export async function getProductsByCategory(category: "supplement" | "cosmetic"): Promise<NormalizedProduct[]> {
  const all = await getAllProducts()
  return all.filter((p) => p.category === category)
}
