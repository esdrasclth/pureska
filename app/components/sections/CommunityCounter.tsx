"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import Link from "next/link"

const TARGET = 4218
const DURATION = 1500

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [active, target])

  return count
}

export default function CommunityCounter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const count = useCountUp(TARGET, inView)

  return (
    <section
      ref={ref}
      className="py-14 text-center"
      style={{ background: "#F2C46D" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <h2
          className="text-[#3D1A4B] leading-tight mb-2"
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(22px, 4vw, 36px)",
          }}
        >
          {count.toLocaleString()} people transforming their routine with PURESKA
        </h2>
        <p
          className="text-[#3D1A4B]/70 text-sm mb-5"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          Join them today.
        </p>
        <Link
          href="/products"
          className="bg-[#3D1A4B] text-white px-8 py-3 rounded-full font-bold hover:bg-[#2a0e35] transition-colors inline-block"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
        >
          Shop Now →
        </Link>
      </div>
    </section>
  )
}
