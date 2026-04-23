"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useCart } from "@/app/context/CartContext"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const [placed, setPlaced] = useState(false)
  const [form, setForm] = useState({
    email: "", firstName: "", lastName: "", address: "", city: "", zip: "", country: "",
    shipping: "standard", card: "", expiry: "", cvv: "",
  })

  const shipping = form.shipping === "express" ? 12.99 : subtotal >= 50 ? 0 : 5.99
  const total = subtotal + shipping

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPlaced(true)
    clear()
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-[#F7F3EE] pt-28 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" }}
          className="text-center px-6 max-w-md"
        >
          <div className="text-6xl mb-6">🎉</div>
          <h1
            className="text-[#3D1A4B] font-bold text-4xl mb-3"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Order placed!
          </h1>
          <p className="text-[#7A7060] text-lg mb-8" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}>
            Your PURESKA ritual is on its way.
          </p>
          <Link
            href="/"
            className="bg-[#FF5C47] text-white px-8 py-4 rounded-full font-bold hover:bg-[#e64e3a] transition-colors inline-block"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F3EE] pt-28 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#7A7060] text-xl mb-6">Your cart is empty.</p>
          <Link
            href="/products"
            className="bg-[#FF5C47] text-white px-8 py-4 rounded-full font-bold"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Shop Now →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1
          className="text-[#1A1A1A] font-bold mb-10"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)" }}
        >
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <section>
              <h2 className="text-[#1A1A1A] font-bold text-lg mb-4" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                Contact Info
              </h2>
              <input
                type="email" required placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full border border-[#E8E0D5] rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-[#FF5C47] transition-colors"
              />
            </section>

            <section>
              <h2 className="text-[#1A1A1A] font-bold text-lg mb-4" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                Shipping Address
              </h2>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="First name" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    className="border border-[#E8E0D5] rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-[#FF5C47] transition-colors" />
                  <input required placeholder="Last name" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    className="border border-[#E8E0D5] rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-[#FF5C47] transition-colors" />
                </div>
                <input required placeholder="Address" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="border border-[#E8E0D5] rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-[#FF5C47] transition-colors" />
                <div className="grid grid-cols-3 gap-3">
                  <input required placeholder="City" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    className="border border-[#E8E0D5] rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-[#FF5C47] transition-colors" />
                  <input required placeholder="ZIP" value={form.zip} onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
                    className="border border-[#E8E0D5] rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-[#FF5C47] transition-colors" />
                  <input required placeholder="Country" value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                    className="border border-[#E8E0D5] rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-[#FF5C47] transition-colors" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[#1A1A1A] font-bold text-lg mb-4" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                Shipping Method
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { value: "standard", label: "Standard Shipping", desc: subtotal >= 50 ? "Free" : "$5.99", sub: "5–7 business days" },
                  { value: "express", label: "Express Shipping", desc: "$12.99", sub: "2–3 business days" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all"
                    style={{ borderColor: form.shipping === opt.value ? "#FF5C47" : "#E8E0D5", background: form.shipping === opt.value ? "#fff8f7" : "white" }}
                  >
                    <input type="radio" name="shipping" value={opt.value} checked={form.shipping === opt.value}
                      onChange={(e) => setForm((f) => ({ ...f, shipping: e.target.value }))} className="accent-[#FF5C47]" />
                    <div className="flex-1">
                      <p className="font-medium text-[#1A1A1A] text-sm" style={{ fontFamily: "'Satoshi', sans-serif" }}>{opt.label}</p>
                      <p className="text-[#7A7060] text-xs">{opt.sub}</p>
                    </div>
                    <span className="text-[#3D1A4B] font-bold text-sm">{opt.desc}</span>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[#1A1A1A] font-bold text-lg mb-4" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                Payment
              </h2>
              <div className="flex flex-col gap-3">
                <input required placeholder="Card number" value={form.card} onChange={(e) => setForm((f) => ({ ...f, card: e.target.value }))}
                  className="border border-[#E8E0D5] rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-[#FF5C47] transition-colors" />
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="MM / YY" value={form.expiry} onChange={(e) => setForm((f) => ({ ...f, expiry: e.target.value }))}
                    className="border border-[#E8E0D5] rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-[#FF5C47] transition-colors" />
                  <input required placeholder="CVV" value={form.cvv} onChange={(e) => setForm((f) => ({ ...f, cvv: e.target.value }))}
                    className="border border-[#E8E0D5] rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-[#FF5C47] transition-colors" />
                </div>
              </div>
            </section>

            {/* Trust row */}
            <div className="flex flex-wrap gap-4 text-xs text-[#7A7060]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              <span>🔒 SSL Secure</span>
              <span>🚚 Free shipping over $50</span>
              <span>↩️ 30-day returns</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF5C47] text-white py-4 rounded-full font-bold text-lg hover:bg-[#e64e3a] transition-colors"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              Place Order →
            </button>
          </form>

          {/* Right — Order summary */}
          <div className="md:sticky md:top-28 h-fit">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2
                className="text-[#1A1A1A] font-bold text-lg mb-5"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#F7F3EE] flex-shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1A1A1A] text-sm font-medium truncate" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                        {item.product.name}
                      </p>
                      <p className="text-[#7A7060] text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-[#3D1A4B] font-bold text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E8E0D5] pt-4 flex flex-col gap-2">
                <div className="flex justify-between text-sm text-[#7A7060]">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#7A7060]">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-[#1A1A1A] text-lg mt-2 pt-2 border-t border-[#E8E0D5]">
                  <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Total</span>
                  <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
