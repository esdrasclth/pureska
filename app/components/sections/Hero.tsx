"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

function WordReveal({
  word,
  color,
  align,
  delay,
  fontSize,
}: {
  word: string
  color: string
  align: "left" | "right"
  delay: number
  fontSize: string
}) {
  return (
    <div
      style={{
        overflow: "hidden",
        paddingBottom: "0.38em",
        paddingTop: "0.10em",
        textAlign: align,
      }}
    >
      <motion.span
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: "block",
          fontFamily: "'Fraunces', serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize,
          lineHeight: 1,
          color,
        }}
      >
        {word}
      </motion.span>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-[#F7F3EE]"
      style={{ overflow: "clip" }}
    >
      {/* Soft yellow glow — desktop only */}
      <div
        className="absolute right-0 bottom-0 pointer-events-none hidden md:block"
        style={{
          width: "55vw",
          height: "90vh",
          background: "radial-gradient(ellipse at center, rgba(242,196,109,0.75) 0%, rgba(242,196,109,0.3) 55%, transparent 100%)",
          filter: "blur(35px)",
        }}
      />

      {/* Blob background */}
      <motion.div
        className="absolute left-0 pointer-events-none translate-x-0 md:translate-x-[8%] w-full md:w-[52vw] h-[80vh] md:h-[82vh]"
        style={{
          top: "10%",
          background: "#3D1A4B",
          opacity: 1,
        }}
        animate={{
          borderRadius: [
            "58% 42% 63% 38% / 44% 56% 46% 58%",
            "52% 48% 58% 44% / 50% 50% 52% 54%",
            "62% 38% 55% 46% / 42% 60% 48% 56%",
            "54% 46% 66% 36% / 48% 54% 44% 60%",
            "58% 42% 63% 38% / 44% 56% 46% 58%",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-0 pt-24 md:pt-28 pb-16 w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left — text */}
        <div className="z-10">
          <WordReveal
            word="Brilla"
            color="#FFFFFF"
            align="left"
            delay={0}
            fontSize="clamp(72px, 14vw, 152px)"
          />
          <div className="mt-1 mb-4">
            <WordReveal
              word="Diferente."
              color="#FF5C47"
              align="right"
              delay={0.2}
              fontSize="clamp(60px, 11.5vw, 128px)"
            />
          </div>

          {/* Mobile product images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            className="block md:hidden relative my-6 h-[260px]"
          >
            {/* Serum — large, right */}
            <motion.div
              className="absolute right-0 top-0 w-[60%] h-[240px] overflow-hidden shadow-2xl"
              style={{ rotate: 4, zIndex: 0 }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/hero-serum.jpg"
                alt="Glow Surge Serum"
                fill
                className="object-cover"
                sizes="60vw"
                priority
              />
            </motion.div>
            {/* Collagen — small, left, overlapping */}
            <motion.div
              className="absolute left-0 bottom-0 w-[44%] h-[190px] overflow-hidden shadow-2xl"
              style={{ rotate: -3, zIndex: 1 }}
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <Image
                src="/images/hero-collagen.jpg"
                alt="Inner Glow Collagen+"
                fill
                className="object-cover"
                sizes="44vw"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-white text-sm md:text-xl mb-8 max-w-xl"
            style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}
          >
            De adentro hacia afuera. Suplementos y cosméticos pensados para personas que se toman en serio que el bienestar es identidad, no moda.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <Link
              href="/products"
              className="bg-[#FF5C47] text-white px-8 py-4 rounded-none hover:bg-[#e64e3a] transition-all hover:scale-[1.02] text-center section-label"
            >
              Comprar Ahora →
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-none hover:bg-white hover:text-[#3D1A4B] transition-all hover:scale-[1.02] text-center section-label"
            >
              Explorar la Colección
            </Link>
          </motion.div>
        </div>

        {/* Right — floating product images (desktop only) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="relative h-[640px] hidden md:block"
        >
          <motion.div
            className="absolute top-4 -right-20 w-[420px] h-[500px] overflow-hidden shadow-2xl"
            style={{ rotate: 4 }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/hero-serum.jpg"
              alt="Glow Surge Serum"
              fill
              className="object-cover"
              sizes="420px"
              priority
            />
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-36 w-[280px] h-[350px] overflow-hidden shadow-2xl"
            style={{ rotate: -3 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          >
            <Image
              src="/images/hero-collagen.jpg"
              alt="Inner Glow Collagen+"
              fill
              className="object-cover"
              sizes="340px"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-10 bg-[#3D1A4B] animate-pulse-down" style={{ opacity: 0.4 }} />
      </div>
    </section>
  )
}
