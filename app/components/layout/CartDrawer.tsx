"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/app/context/CartContext"

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, itemCount, subtotal } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-[90] bg-black/40"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[95] bg-white flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E0D5]">
              <h2
                className="text-[#1A1A1A] text-xl font-bold"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                Your Cart ({itemCount})
              </h2>
              <button
                onClick={closeCart}
                className="text-[#7A7060] hover:text-[#1A1A1A] transition-colors p-1"
                aria-label="Close cart"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="text-6xl">🛒</div>
                <p
                  className="text-[#7A7060] text-lg"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Your cart is empty
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="bg-[#FF5C47] text-white px-7 py-3 rounded-full font-bold hover:bg-[#e64e3a] transition-colors"
                  style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                >
                  Start Shopping →
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.variant}`} className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F7F3EE] flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[#1A1A1A] font-bold text-sm leading-tight mb-0.5 truncate"
                          style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                        >
                          {item.product.name}
                        </p>
                        {item.variant && (
                          <p className="text-[#7A7060] text-xs mb-1">{item.variant}</p>
                        )}
                        <p
                          className="text-[#3D1A4B] font-medium text-sm mb-2"
                          style={{ fontFamily: "'Satoshi', sans-serif" }}
                        >
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-[#E8E0D5] rounded-full overflow-hidden">
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#F7F3EE] transition-colors text-[#1A1A1A]"
                            >
                              −
                            </button>
                            <span className="w-7 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#F7F3EE] transition-colors text-[#1A1A1A]"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-[#7A7060] hover:text-[#FF5C47] transition-colors text-xs underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-5 border-t border-[#E8E0D5] flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#7A7060] text-sm">Subtotal</span>
                    <span
                      className="text-[#1A1A1A] font-bold text-lg"
                      style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                    >
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full bg-[#FF5C47] text-white py-4 rounded-full text-center font-bold hover:bg-[#e64e3a] transition-colors block"
                    style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                  >
                    Checkout →
                  </Link>

                  <button
                    onClick={closeCart}
                    className="w-full border border-[#3D1A4B] text-[#3D1A4B] py-3 rounded-full text-center font-medium hover:bg-[#3D1A4B] hover:text-white transition-colors"
                    style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
