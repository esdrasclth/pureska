"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { NormalizedProduct } from "@/app/lib/shopify"
import { useCart } from "@/app/context/CartContext"
import Badge from "./Badge"
import StarRating from "./StarRating"

type ProductCardProps = {
  product: NormalizedProduct
  size?: "large" | "medium" | "default"
}

export default function ProductCard({ product, size = "default" }: ProductCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [hovered, setHovered] = useState(false)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const imageHeight = size === "large" ? "h-96" : size === "medium" ? "h-64" : "h-52"
  const image = product.images[0] || "https://placehold.co/600x700/F7F3EE/3D1A4B?text=PURESKA"

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="bg-white overflow-hidden relative group cursor-pointer"
      style={{
        border: `1.5px solid ${hovered ? "#FF5C47" : "transparent"}`,
        transition: "border-color 0.25s ease",
        boxShadow: "0 2px 20px rgba(61,26,75,0.06)",
      }}
    >
      <Link href={`/products/${product.handle}`} className="block">
        <div className={`relative ${imageHeight} overflow-hidden bg-[#F7F3EE]`}>
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>

        <div className="p-5 pb-14 relative">
          <Badge variant="category" className="mb-3">
            {product.category === "supplement" ? "Suplemento" : "Cosmético"}
          </Badge>

          <h3
            className="text-[#1A1A1A] font-bold text-lg leading-tight mb-1"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700 }}
          >
            {product.name}
          </h3>

          <p
            className="text-[#7A7060] text-sm mb-3 italic line-clamp-2"
            style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}
          >
            {product.tagline}
          </p>

          <div className="flex items-center justify-between">
            {product.stars > 0 && <StarRating stars={product.stars} count={product.reviews || undefined} />}
            <span
              className="text-[#3D1A4B] font-bold text-lg ml-auto"
              style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
            >
              L {product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>

      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={handleAdd}
            className="absolute bottom-0 left-0 right-0 py-3 text-white text-sm font-semibold text-center"
            style={{
              background: added ? "#3D1A4B" : "#FF5C47",
              fontFamily: "'Cabinet Grotesk', sans-serif",
              transition: "background 0.2s",
            }}
          >
            {added ? "✓ Agregado!" : "Agregar al Carrito"}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
