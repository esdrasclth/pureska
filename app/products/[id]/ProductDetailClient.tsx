"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import type { NormalizedProduct } from "@/app/lib/shopify"
import { useCart } from "@/app/context/CartContext"
import Badge from "@/app/components/ui/Badge"
import StarRating from "@/app/components/ui/StarRating"
import ProductCard from "@/app/components/ui/ProductCard"

const ACCORDION_TABS = ["Ingredientes", "Cómo usar", "Reseñas"] as const
type AccordionTab = (typeof ACCORDION_TABS)[number]

type Props = { product: NormalizedProduct; related: NormalizedProduct[] }

export default function ProductDetailClient({ product, related }: Props) {
  const { addItem } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.id || "")
  const [addState, setAddState] = useState<"idle" | "shake" | "check">("idle")
  const [openTab, setOpenTab] = useState<AccordionTab | null>(null)

  const stockMap = {
    in_stock: { label: "En stock", color: "#22c55e" },
    low_stock: { label: "Pocas unidades", color: "#f59e0b" },
    out_of_stock: { label: "Agotado", color: "#ef4444" },
  }
  const stockInfo = stockMap[product.stock]
  const images = product.images.length > 0
    ? product.images
    : ["https://placehold.co/600x700/F7F3EE/3D1A4B?text=PURESKA"]

  function handleAddToCart() {
    if (product.stock === "out_of_stock") return
    addItem(product, selectedVariant)
    setAddState("shake")
    setTimeout(() => setAddState("check"), 400)
    setTimeout(() => setAddState("idle"), 2400)
  }

  const hasVariants = product.variants.length > 1

  return (
    <div className="min-h-screen bg-[#F7F3EE] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden bg-white shadow-md mb-4">
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="relative w-16 h-16 overflow-hidden border-2 transition-all"
                    style={{ borderColor: activeImage === i ? "#FF5C47" : "transparent" }}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <Badge variant="category" className="mb-4 w-fit">
              {product.category === "supplement" ? "Suplemento" : "Cosmético"}
            </Badge>

            <h1
              className="text-[#1A1A1A] font-bold mb-2"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              {product.name}
            </h1>

            <div
              className="prose-description mb-5"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            {product.stars > 0 && (
              <div className="flex items-center gap-3 mb-5">
                <StarRating stars={product.stars} count={product.reviews || undefined} size="md" />
              </div>
            )}

            <div
              className="text-[#3D1A4B] font-bold mb-5"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: "32px" }}
            >
              ${product.price.toFixed(2)} {product.currencyCode}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ background: stockInfo.color }} />
              <span className="text-sm" style={{ color: stockInfo.color }}>{stockInfo.label}</span>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C47] animate-pulse" />
              <span className="text-[#7A7060] text-xs">12 personas viendo esto ahora</span>
            </div>

            {/* Variants */}
            {hasVariants && (
              <div className="mb-5">
                <p className="section-label text-[#7A7060] mb-2">Variante</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id)}
                      disabled={!v.available}
                      className="px-4 py-2 text-sm font-medium border transition-all disabled:opacity-40"
                      style={{
                        background: selectedVariant === v.id ? "#FF5C47" : "transparent",
                        borderColor: selectedVariant === v.id ? "#FF5C47" : "#E8E0D5",
                        color: selectedVariant === v.id ? "white" : "#1A1A1A",
                      }}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-[#E8E0D5] bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#F7F3EE] transition-colors text-[#1A1A1A] text-lg">−</button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-[#F7F3EE] transition-colors text-[#1A1A1A] text-lg">+</button>
              </div>
            </div>

            <motion.button
              animate={addState === "shake" ? { x: [-4, 4, -4, 4, 0] } : {}}
              transition={{ duration: 0.3 }}
              onClick={handleAddToCart}
              disabled={product.stock === "out_of_stock"}
              className="w-full py-4 font-bold text-white text-lg mb-8 transition-all disabled:opacity-50"
              style={{
                background: addState === "check" ? "#3D1A4B" : "#FF5C47",
                fontFamily: "'Cabinet Grotesk', sans-serif",
                transition: "background 0.2s",
              }}
            >
              {addState === "check" ? "✓ Agregado al Carrito!" : product.stock === "out_of_stock" ? "Agotado" : "Agregar al Carrito"}
            </motion.button>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-5 bg-white">
              {[
                { icon: "🧬", label: "Clinicamente Probado", desc: "Fórmula validada" },
                { icon: "🌿", label: "Ingredientes Limpios", desc: "Sin rellenos" },
                { icon: "⚡", label: "Resultados Reales", desc: "En semanas" },
              ].map((b) => (
                <div key={b.label} className="text-center">
                  <div className="text-2xl mb-1">{b.icon}</div>
                  <p className="text-[#1A1A1A] font-medium text-xs">{b.label}</p>
                  <p className="text-[#7A7060] text-xs">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="flex flex-col divide-y divide-[#E8E0D5] border border-[#E8E0D5]">
              {ACCORDION_TABS.map((tab) => (
                <div key={tab}>
                  <button
                    onClick={() => setOpenTab(openTab === tab ? null : tab)}
                    className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-[#F7F3EE] transition-colors"
                  >
                    <span className="font-medium text-[#1A1A1A]" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>{tab}</span>
                    <span className="text-[#7A7060]" style={{ transform: openTab === tab ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
                  </button>
                  <AnimatePresence>
                    {openTab === tab && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-[#7A7060] text-sm leading-relaxed">
                          {tab === "Ingredientes" && (
                            <div
                              className="prose-description"
                              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                            />
                          )}
                          {tab === "Cómo usar" && (
                            <div
                              className="prose-description"
                              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                            />
                          )}
                          {tab === "Reseñas" && (
                            <div>
                              {product.stars > 0 && <StarRating stars={product.stars} size="md" />}
                              <p className="text-xs italic mt-2" style={{ fontFamily: "'Fraunces', serif" }}>
                                &ldquo;Producto increíble, exactamente lo que necesitaba.&rdquo;
                              </p>
                              <p className="text-xs text-[#FF5C47] mt-1">— Comprador Verificado</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-[#1A1A1A] font-bold mb-8" style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: "32px" }}>
              También te puede gustar
            </h2>
            <div className="flex gap-5 overflow-x-auto pb-4">
              {related.map((p) => (
                <div key={p.id} className="flex-shrink-0 w-64">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
