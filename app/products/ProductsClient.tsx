"use client"

import { useSearchParams } from "next/navigation"
import { useState, useMemo, Suspense } from "react"
import { motion } from "framer-motion"
import type { NormalizedProduct } from "@/app/lib/shopify"
import ProductCard from "@/app/components/ui/ProductCard"

const GOAL_TAGS = ["Energy", "Skin", "Anti-aging", "Detox", "Joints", "Brain"]
type SortKey = "bestselling" | "price-asc" | "price-desc" | "newest"

function ProductsInner({ products }: { products: NormalizedProduct[] }) {
  const searchParams = useSearchParams()
  const initCategory = searchParams.get("category") || "all"

  const [category, setCategory] = useState<string>(initCategory)
  const [sort, setSort] = useState<SortKey>("bestselling")
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [priceMax, setPriceMax] = useState(200)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]
    if (category !== "all") list = list.filter((p) => p.category === category)
    if (activeTags.length > 0) {
      list = list.filter((p) =>
        activeTags.some((tag) => p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()))
      )
    }
    list = list.filter((p) => p.price <= priceMax)
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break
      case "price-desc": list.sort((a, b) => b.price - a.price); break
      case "newest": list.sort((a, b) => a.name.localeCompare(b.name)); break
    }
    return list
  }, [products, category, sort, activeTags, priceMax])

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const categoryLabel =
    category === "all" ? "Todos los Productos"
    : category === "supplement" ? "Suplementos"
    : "Cosméticos"

  return (
    <div className="min-h-screen bg-[#F7F3EE] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h1
            className="text-[#1A1A1A] leading-none mb-2"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(40px, 6vw, 72px)" }}
          >
            {categoryLabel}
          </h1>
          <p className="text-[#7A7060] text-base">{filtered.length} producto{filtered.length !== 1 ? "s" : ""}</p>
        </div>

        <div className="flex gap-10">
          <aside className="hidden md:block w-56 flex-shrink-0">
            <FilterPanel
              category={category}
              setCategory={setCategory}
              activeTags={activeTags}
              toggleTag={toggleTag}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
            />
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setDrawerOpen(true)}
                className="md:hidden border border-[#3D1A4B] text-[#3D1A4B] px-5 py-2.5 rounded-lg text-sm font-medium"
              >
                Filtros
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border border-[#E8E0D5] rounded-lg px-4 py-2 text-sm text-[#1A1A1A] bg-white focus:outline-none focus:border-[#FF5C47] ml-auto"
              >
                <option value="bestselling">Más Vendidos</option>
                <option value="price-asc">Precio: Menor → Mayor</option>
                <option value="price-desc">Precio: Mayor → Menor</option>
                <option value="newest">Nombre A-Z</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#7A7060] text-xl">No hay productos con esos filtros.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setDrawerOpen(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Filtros</h3>
              <button onClick={() => setDrawerOpen(false)}>✕</button>
            </div>
            <FilterPanel category={category} setCategory={setCategory} activeTags={activeTags} toggleTag={toggleTag} priceMax={priceMax} setPriceMax={setPriceMax} />
            <button onClick={() => setDrawerOpen(false)} className="w-full mt-6 bg-[#FF5C47] text-white py-3 rounded-lg font-bold" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterPanel({ category, setCategory, activeTags, toggleTag, priceMax, setPriceMax }: {
  category: string
  setCategory: (v: string) => void
  activeTags: string[]
  toggleTag: (t: string) => void
  priceMax: number
  setPriceMax: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="section-label text-[#7A7060] mb-3">Categoría</h4>
        {[
          { value: "all", label: "Todos" },
          { value: "supplement", label: "Suplementos" },
          { value: "cosmetic", label: "Cosméticos" },
        ].map((c) => (
          <label key={c.value} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="radio" name="category" value={c.value} checked={category === c.value} onChange={() => setCategory(c.value)} className="accent-[#FF5C47]" />
            <span className="text-sm text-[#1A1A1A]">{c.label}</span>
          </label>
        ))}
      </div>
      <div>
        <h4 className="section-label text-[#7A7060] mb-3">Precio máx: ${priceMax}</h4>
        <input type="range" min={20} max={200} step={5} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-[#FF5C47]" />
      </div>
      <div>
        <h4 className="section-label text-[#7A7060] mb-3">Objetivo</h4>
        <div className="flex flex-wrap gap-2">
          {GOAL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="px-3 py-1 rounded-lg text-xs font-medium border transition-all"
              style={{
                background: activeTags.includes(tag) ? "#FF5C47" : "transparent",
                borderColor: activeTags.includes(tag) ? "#FF5C47" : "#E8E0D5",
                color: activeTags.includes(tag) ? "white" : "#7A7060",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProductsClient({ products }: { products: NormalizedProduct[] }) {
  return (
    <Suspense>
      <ProductsInner products={products} />
    </Suspense>
  )
}
