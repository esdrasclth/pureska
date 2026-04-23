"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const values = [
  {
    num: "01",
    title: "Clínicamente Probado",
    desc: "Cada fórmula validada por laboratorios independientes. Sin suposiciones — solo resultados que puedes medir.",
  },
  {
    num: "02",
    title: "Ingredientes Limpios",
    desc: "Sin rellenos, sin colorantes artificiales, sin ingredientes raros. Transparentes desde el origen hasta el producto.",
  },
  {
    num: "03",
    title: "Hecho para la Vida Real",
    desc: "Diseñado para personas en movimiento — rituales que se adaptan a tu rutina, no al revés.",
  },
]

export default function ValuesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} style={{ background: "#1E0E2C" }} className="pt-6 pb-2 md:pt-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {values.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative px-6 py-7 md:px-8 md:py-10 overflow-hidden group"
              style={{ background: "#1E0E2C" }}
            >
              {/* Coral top accent line */}
              <motion.div
                className="absolute top-0 left-8 h-[2px] bg-[#FF5C47]"
                initial={{ width: 0 }}
                animate={inView ? { width: "2.5rem" } : {}}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.4, ease: "easeOut" }}
              />

              {/* Faded background number */}
              <span
                className="absolute -top-2 right-6 select-none pointer-events-none"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "80px",
                  color: "#FF5C47",
                  opacity: 0.07,
                  lineHeight: 1,
                }}
              >
                {v.num}
              </span>

              <span className="section-label text-[#FF5C47]/60 mb-4 block">{v.num}</span>
              <h3
                className="text-white font-bold text-xl mb-3"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700 }}
              >
                {v.title}
              </h3>
              <p
                className="text-[#A090B0] text-sm leading-relaxed"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
