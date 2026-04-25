"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import type { NormalizedProduct } from "@/app/lib/medusa"
import ProductCard from "@/app/components/ui/ProductCard"

export default function FeaturedProducts({ products }: { products: NormalizedProduct[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const featured = products.slice(0, 6)

  return (
    <section ref={ref} className="py-20 bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="section-label text-[#FF5C47]">— NUESTROS PRODUCTOS —</p>
            <Link
              href="/products"
              className="flex items-center gap-1 section-label text-[#FF5C47] hover:opacity-70 transition-opacity group"
            >
              VER MÁS
              <svg
                width="11"
                height="11"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <line x1="1" y1="9" x2="9" y2="1" />
                <polyline points="3,1 9,1 9,7" />
              </svg>
            </Link>
          </div>
          <h2
            className="text-[#1A1A1A] leading-none"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Lo Más Vendido.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {featured[0] && (
            <motion.div className="md:row-span-2" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.5 }}>
              <div className="h-full"><ProductCard product={featured[0]} size="large" /></div>
            </motion.div>
          )}
          {featured.slice(1, 6).map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: (i + 2) * 0.1, duration: 0.5 }}>
              <ProductCard product={p} size={i < 2 ? "medium" : "default"} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
