"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function CategorySplit() {
  return (
    <section className="flex flex-col md:flex-row min-h-[500px]">
      {/* Left — Supplements */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="flex-1 relative flex flex-col justify-center items-start p-12 md:p-16 overflow-hidden"
        style={{ background: "#1E0E2C" }}
      >
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 w-48 h-56 rounded-2xl overflow-hidden pointer-events-none"
          style={{ transform: "translateY(-50%) rotate(5deg)" }}
        >
          <img
            src="https://placehold.co/240x280/2a1040/FF5C47?text=Supplements"
            alt="Supplements"
            className="w-full h-full object-cover"
          />
        </div>

        <p
          className="section-label text-[#FF5C47] mb-4"
        >
          for your body
        </p>
        <h2
          className="text-white mb-6 leading-tight"
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(36px, 4vw, 56px)",
          }}
        >
          Fuel the inside.
        </h2>
        <Link
          href="/products?category=supplement"
          className="border-2 border-white text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-[#1E0E2C] transition-all inline-block"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
        >
          Shop Supplements →
        </Link>
      </motion.div>

      {/* Right — Cosmetics */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="flex-1 relative flex flex-col justify-center items-start p-12 md:p-16 overflow-hidden"
        style={{ background: "#F7F3EE" }}
      >
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 w-48 h-56 rounded-2xl overflow-hidden pointer-events-none"
          style={{ transform: "translateY(-50%) rotate(-5deg)" }}
        >
          <img
            src="https://placehold.co/240x280/F7F3EE/3D1A4B?text=Cosmetics"
            alt="Cosmetics"
            className="w-full h-full object-cover"
          />
        </div>

        <p
          className="section-label text-[#3D1A4B] mb-4"
        >
          for your skin
        </p>
        <h2
          className="text-[#3D1A4B] mb-6 leading-tight"
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(36px, 4vw, 56px)",
          }}
        >
          Glow the outside.
        </h2>
        <Link
          href="/products?category=cosmetic"
          className="border-2 border-[#3D1A4B] text-[#3D1A4B] px-7 py-3 rounded-full font-bold hover:bg-[#3D1A4B] hover:text-white transition-all inline-block"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
        >
          Shop Cosmetics →
        </Link>
      </motion.div>
    </section>
  )
}
