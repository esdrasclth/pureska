"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EE]">
      {/* Hero */}
      <div
        className="relative h-[60vh] flex items-end pb-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1E0E2C 0%, #3D1A4B 60%, #FF5C47 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-6 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 80px)",
              lineHeight: 1.1,
            }}
          >
            We believe pure<br />is powerful.
          </motion.h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Story blocks */}
        <div className="flex flex-col gap-20">
          <div className="grid md:grid-cols-2 gap-12 items-center" id="story">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#E8E0D5]">
                <img
                  src="https://placehold.co/600x450/F7F3EE/3D1A4B?text=Our+Story"
                  alt="Our story"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <p className="section-label text-[#FF5C47] mb-4">Our story</p>
              <h2
                className="text-[#1A1A1A] font-bold mb-4"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)" }}
              >
                Born from frustration, built on science.
              </h2>
              <p className="text-[#7A7060] leading-relaxed" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                PURESKA started when our founders grew tired of choosing between products that worked and products they could trust. The wellness industry was full of either clinical sterility or wellness theater — never both. So we built something different.
              </p>
            </motion.div>
          </div>

          {/* Pull quote */}
          <div className="text-center py-10 relative">
            <span
              className="absolute -top-6 left-1/2 -translate-x-1/2 select-none pointer-events-none"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: "120px", color: "#3D1A4B", opacity: 0.06, lineHeight: 1 }}
            >
              &ldquo;
            </span>
            <blockquote
              className="text-[#3D1A4B] text-2xl md:text-3xl italic max-w-2xl mx-auto relative z-10"
              style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}
            >
              &ldquo;Your wellness routine should feel like self-expression, not a chore.&rdquo;
            </blockquote>
            <p className="text-[#FF5C47] text-sm font-medium mt-4 uppercase tracking-wide" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              — The PURESKA founders
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <p className="section-label text-[#FF5C47] mb-4">Our mission</p>
              <h2
                className="text-[#1A1A1A] font-bold mb-4"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)" }}
              >
                Radical transparency, radical results.
              </h2>
              <p className="text-[#7A7060] leading-relaxed" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                Every ingredient is disclosed, every claim is backed by data. We partner with dermatologists, nutritionists, and everyday people to ensure PURESKA works in real life — not just in a lab.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#E8E0D5]">
                <img
                  src="https://placehold.co/600x450/1E0E2C/F2C46D?text=Our+Mission"
                  alt="Our mission"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Values grid */}
          <div>
            <h2
              className="text-[#1A1A1A] font-bold mb-8 text-center"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              What we stand for
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: "01", title: "Clinically Tested", desc: "Independent lab validation for every formula. No marketing fluff." },
                { num: "02", title: "Clean Ingredients", desc: "We know what's in our products. So will you — always." },
                { num: "03", title: "Made for Real Life", desc: "Simple routines that fit in, without taking over." },
              ].map((v) => (
                <motion.div
                  key={v.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 relative overflow-hidden"
                >
                  <span
                    className="absolute -top-3 -right-2 select-none"
                    style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: "72px", color: "#FF5C47", opacity: 0.08, lineHeight: 1 }}
                  >
                    {v.num}
                  </span>
                  <p className="section-label text-[#FF5C47] mb-3">{v.num}</p>
                  <h3
                    className="text-[#1A1A1A] font-bold text-xl mb-2"
                    style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-[#7A7060] text-sm leading-relaxed" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
