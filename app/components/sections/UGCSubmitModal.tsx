"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { products } from "@/app/data/products"

type UGCSubmitModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function UGCSubmitModal({ isOpen, onClose }: UGCSubmitModalProps) {
  const [form, setForm] = useState({
    name: "",
    city: "",
    product: "",
    quote: "",
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
      setForm({ name: "", city: "", product: "", quote: "" })
    }, 2500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 30 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-[20px] w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-[#7A7060] hover:text-[#1A1A1A] transition-colors"
                aria-label="Close"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✨</div>
                  <h3
                    className="text-[#3D1A4B] text-2xl font-bold mb-2"
                    style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                  >
                    Story submitted!
                  </h3>
                  <p className="text-[#7A7060]">We&apos;ll review and feature you soon.</p>
                </div>
              ) : (
                <>
                  <h2
                    className="text-[#1A1A1A] text-3xl font-bold mb-6"
                    style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                  >
                    Share Your Story
                  </h2>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="section-label text-[#7A7060] block mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full border border-[#E8E0D5] rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:border-[#FF5C47] transition-colors"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="section-label text-[#7A7060] block mb-1.5">City</label>
                      <input
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                        className="w-full border border-[#E8E0D5] rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:border-[#FF5C47] transition-colors"
                        placeholder="City, Country"
                      />
                    </div>

                    <div>
                      <label className="section-label text-[#7A7060] block mb-1.5">Product Used</label>
                      <select
                        required
                        value={form.product}
                        onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
                        className="w-full border border-[#E8E0D5] rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:border-[#FF5C47] transition-colors bg-white"
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
                        required
                        value={form.quote}
                        onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
                        rows={3}
                        className="w-full border border-[#E8E0D5] rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:border-[#FF5C47] transition-colors resize-none"
                        placeholder="Tell us about your experience..."
                      />
                    </div>

                    <div>
                      <label className="section-label text-[#7A7060] block mb-1.5">Video (optional)</label>
                      <div className="border-2 border-dashed border-[#E8E0D5] rounded-xl p-8 text-center hover:border-[#FF5C47] transition-colors cursor-pointer">
                        <p className="text-[#7A7060] text-sm">Drag & drop your video here</p>
                        <p className="text-[#7A7060] text-xs mt-1">MP4, MOV up to 50MB</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#FF5C47] text-white py-4 rounded-full font-bold hover:bg-[#e64e3a] transition-colors mt-2"
                      style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                    >
                      Submit Your Story →
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
