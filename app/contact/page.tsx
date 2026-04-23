"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1
            className="text-[#1A1A1A]"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(48px, 7vw, 88px)" }}
          >
            Let&apos;s talk.
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {sent ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">✉️</div>
                <h3
                  className="text-[#3D1A4B] text-2xl font-bold mb-2"
                  style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                >
                  Message sent!
                </h3>
                <p className="text-[#7A7060]">We&apos;ll reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {[
                  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                  { name: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="section-label text-[#7A7060] block mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      required
                      value={form[field.name as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full border border-[#E8E0D5] rounded-xl px-4 py-3 text-[#1A1A1A] bg-white focus:outline-none focus:border-[#FF5C47] transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="section-label text-[#7A7060] block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us how we can help..."
                    className="w-full border border-[#E8E0D5] rounded-xl px-4 py-3 text-[#1A1A1A] bg-white focus:outline-none focus:border-[#FF5C47] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#FF5C47] text-white py-4 rounded-full font-bold hover:bg-[#e64e3a] transition-colors"
                  style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3
                className="text-[#1A1A1A] font-bold text-xl mb-6"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                Get in touch
              </h3>

              <div className="flex flex-col gap-5">
                <div>
                  <p className="section-label text-[#7A7060] mb-1">Email</p>
                  <a
                    href="mailto:hello@pureska.com"
                    className="text-[#3D1A4B] hover:text-[#FF5C47] transition-colors font-medium"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    hello@pureska.com
                  </a>
                </div>

                <div>
                  <p className="section-label text-[#7A7060] mb-1">Hours</p>
                  <p className="text-[#1A1A1A] text-sm" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                    Mon–Fri, 9 AM – 6 PM EST
                  </p>
                </div>

                <div>
                  <p className="section-label text-[#7A7060] mb-2">Response time</p>
                  <p className="text-[#22c55e] text-sm font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block" />
                    Reply within 24h
                  </p>
                </div>

                <a
                  href="https://wa.me/+1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#22c55e] text-white px-6 py-3 rounded-full font-bold hover:bg-[#16a34a] transition-colors"
                  style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-[#1E0E2C] rounded-2xl p-8">
              <p
                className="text-white font-bold text-xl mb-2"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                FAQ
              </p>
              <div className="flex flex-col gap-3 mt-4">
                {[
                  { q: "Free shipping?", a: "Free on orders over $50." },
                  { q: "Return policy?", a: "30-day hassle-free returns." },
                  { q: "International orders?", a: "We ship to 40+ countries." },
                ].map((item) => (
                  <div key={item.q} className="border-b border-white/10 pb-3 last:border-0">
                    <p className="text-white text-sm font-medium" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      {item.q}
                    </p>
                    <p className="text-white/50 text-xs mt-0.5">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
