"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { testimonials } from "@/app/data/testimonials"
import StarRating from "@/app/components/ui/StarRating"

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 bg-[#F7F3EE] relative overflow-hidden">
      {/* Giant decorative quote mark */}
      <div
        className="absolute top-10 left-10 select-none pointer-events-none"
        style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: "160px",
          color: "#3D1A4B",
          opacity: 0.06,
          lineHeight: 1,
        }}
      >
        &ldquo;
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="section-label text-[#FF5C47] mb-12 text-center"
        >
          — WHAT THEY SAY —
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-[0_2px_20px_rgba(61,26,75,0.06)] flex flex-col"
            >
              <StarRating stars={t.stars} size="md" />
              <blockquote
                className="text-[#1A1A1A] text-[18px] italic leading-relaxed mt-4 mb-6 flex-1"
                style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <p
                  className="text-[#FF5C47] font-medium text-sm uppercase tracking-wide"
                  style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
                >
                  {t.name}
                </p>
                <span className="text-[#7A7060] text-xs mt-1 bg-[#F7F3EE] px-3 py-0.5 rounded-full inline-block">
                  {t.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
