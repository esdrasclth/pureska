"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/app/context/CartContext"

const navLinks = [
  { label: "Tienda", href: "/products" },
  { label: "Suplementos", href: "/products?category=supplement" },
  { label: "Cosméticos", href: "/products?category=cosmetic" },
  { label: "Nosotros", href: "/about" },
  { label: "Contacto", href: "/contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bump, setBump] = useState(false)
  const { itemCount, openCart } = useCart()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (itemCount > 0) {
      setBump(true)
      const t = setTimeout(() => setBump(false), 350)
      return () => clearTimeout(t)
    }
  }, [itemCount])

  return (
    <>
      <motion.header
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0)",
          borderBottomColor: scrolled ? "#E8E0D5" : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 border-b-[0.5px]"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="PURESKA"
              width={100}
              height={32}
              className="h-6 md:h-8 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[#1A1A1A] hover:text-[#FF5C47] transition-colors duration-200 section-label"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="p-2 text-[#1A1A1A] hover:text-[#FF5C47] transition-colors"
            >
              <SearchIcon />
            </button>

            <button
              aria-label="Cart"
              onClick={openCart}
              className="relative p-2 text-[#1A1A1A] hover:text-[#FF5C47] transition-colors"
            >
              <CartIcon />
              {itemCount > 0 && (
                <span
                  className="absolute top-0 right-0 bg-[#FF5C47] text-white text-[10px] h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center font-bold transition-transform duration-200"
                  style={{ transform: bump ? "scale(1.35)" : "scale(1)" }}
                >
                  {itemCount}
                </span>
              )}
            </button>

            <button
              className="lg:hidden p-2 text-[#1A1A1A]"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
        style={{ background: "#3D1A4B" }}
      >
        <div className="flex justify-between items-center px-6 h-16 md:h-20">
          <Image
            src="/images/logo.png"
            alt="PURESKA"
            width={120}
            height={40}
            className="h-9 w-auto object-contain brightness-0 invert"
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-col px-8 mt-10 gap-5">
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white font-bold uppercase tracking-wide hover:text-[#FF5C47] transition-colors"
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: "clamp(32px, 8vw, 48px)",
                animation: menuOpen ? `fadeUp 0.4s ${i * 60}ms both` : "none",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}
