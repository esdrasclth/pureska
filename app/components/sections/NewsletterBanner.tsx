"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function NewsletterBanner() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setDone(true)
    setTimeout(() => setDone(false), 3000)
    setEmail("")
  }

  return (
    <section className="py-20 px-6 overflow-hidden" style={{ background: "#FF5C47" }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2
            className="text-white leading-none"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(40px, 7vw, 88px)",
            }}
          >
            <span className="block text-left">Good things,</span>
            <span className="block text-right">your inbox.</span>
          </h2>
        </div>

        {done ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-xl font-medium text-center py-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            You&apos;re in! 🎉 Welcome to the PURESKA family.
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-white rounded-full px-6 py-4 text-[#1A1A1A] placeholder:text-[#7A7060] focus:outline-none focus:ring-2 focus:ring-[#3D1A4B]"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            />
            <button
              type="submit"
              className="bg-[#3D1A4B] text-white px-8 py-4 rounded-full font-bold hover:bg-[#2a0e35] transition-colors whitespace-nowrap"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Subscribe →
            </button>
          </form>
        )}

        <p
          className="text-white/80 text-sm mt-4"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          No spam. Just launches, tips, and member-only deals.
        </p>
      </div>
    </section>
  )
}
