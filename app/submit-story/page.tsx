"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { products } from "@/app/data/products"

export default function SubmitStoryPage() {
  const [form, setForm] = useState({ name: "", city: "", product: "", quote: "" })
  const [done, setDone] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setDone(true)
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE] pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label text-[#FF5C47] mb-4">Community</p>
          <h1
            className="text-[#1A1A1A] font-bold mb-3"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Share Your Story
          </h1>
          <p
            className="text-[#7A7060] text-lg italic mb-10"
            style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}
          >
            Real people. Real results. Be featured on the PURESKA site.
          </p>

          {done ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">✨</div>
              <h2
                className="text-[#3D1A4B] font-bold text-3xl mb-2"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                You&apos;re awesome!
              </h2>
              <p className="text-[#7A7060] text-lg">
                We&apos;ll review your story and reach out if we feature you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {[
                { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                { name: "city", label: "City", type: "text", placeholder: "City, Country" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="section-label text-[#7A7060] block mb-1.5">{field.label}</label>
                  <input
                    type={field.type} required
                    value={form[field.name as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full border border-[#E8E0D5] rounded-xl px-4 py-3 bg-white text-[#1A1A1A] focus:outline-none focus:border-[#FF5C47] transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="section-label text-[#7A7060] block mb-1.5">Product Used</label>
                <select
                  required value={form.product}
                  onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
                  className="w-full border border-[#E8E0D5] rounded-xl px-4 py-3 bg-white text-[#1A1A1A] focus:outline-none focus:border-[#FF5C47] transition-colors"
                >
                  <option value="">Select a product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="section-label text-[#7A7060] block mb-1.5">Your Quote</label>
                <textarea
                  required rows={4}
                  value={form.quote}
                  onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
                  placeholder="Tell us about your experience with PURESKA..."
                  className="w-full border border-[#E8E0D5] rounded-xl px-4 py-3 bg-white text-[#1A1A1A] focus:outline-none focus:border-[#FF5C47] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="section-label text-[#7A7060] block mb-1.5">Video (optional)</label>
                <div className="border-2 border-dashed border-[#E8E0D5] rounded-xl p-10 text-center hover:border-[#FF5C47] transition-colors cursor-pointer">
                  <p className="text-[#7A7060]">Drag & drop your video here</p>
                  <p className="text-[#7A7060] text-xs mt-1">MP4, MOV up to 50MB</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF5C47] text-white py-4 rounded-full font-bold text-lg hover:bg-[#e64e3a] transition-colors"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                Submit Your Story →
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
