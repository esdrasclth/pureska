"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

export default function MaintenancePage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError("Algo salió mal. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#F7F3EE" }}
    >
      {/* Honey glow — bottom right */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: "80vw",
          height: "75vh",
          background:
            "radial-gradient(ellipse at center, rgba(242,196,109,1) 0%, rgba(242,196,109,0.6) 40%, transparent 65%)",
          filter: "blur(35px)",
        }}
      />
      {/* Honey glow — top left */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: "65vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse at center, rgba(242,196,109,0.55) 0%, transparent 70%)",
          filter: "blur(35px)",
        }}
      />

      {/* Animated blob — clamped to viewport width on mobile */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "clamp(300px, 90vw, 980px)",
          height: "clamp(480px, 80vh, 980px)",
          background: "#3D1A4B",
          opacity: 0.9,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
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
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center w-full px-6"
        style={{ maxWidth: "min(480px, 92vw)" }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-9"
        >
          <Image
            src="/images/logo.png"
            alt="PURESKA"
            width={400}
            height={128}
            className="brightness-0 invert object-contain"
            style={{ height: "clamp(30px, 8vw, 52px)", width: "auto" }}
            priority
          />
        </motion.div>

        {/* Headline */}
        <div style={{ overflow: "hidden", paddingBottom: "0.3em" }}>
          <motion.h1
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(32px, 9vw, 88px)",
              lineHeight: 1.08,
              color: "#FFFFFF",
            }}
          >
            Algo hermoso
          </motion.h1>
        </div>
        <div style={{ overflow: "hidden", paddingBottom: "0.3em" }}>
          <motion.h1
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(32px, 9vw, 88px)",
              lineHeight: 1.08,
              color: "#FF5C47",
            }}
          >
            está tomando forma.
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-6 mb-8 text-sm"
          style={{
            fontFamily: "'Satoshi', sans-serif",
            color: "rgba(247,243,238,0.65)",
            lineHeight: 1.75,
            maxWidth: "360px",
          }}
        >
          Estamos preparando una experiencia que merecen tus rituales de bienestar.
          Pronto podrás descubrirla.
        </motion.p>

        {/* Email form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="w-full"
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 px-6 text-center"
              style={{
                background: "rgba(255,92,71,0.12)",
                border: "1px solid rgba(255,92,71,0.3)",
                borderRadius: "0px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  color: "#FF5C47",
                  fontSize: "18px",
                }}
              >
                ¡Perfecto! Te avisamos en cuanto abramos.
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-5 bg-transparent outline-none text-sm"
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  border: "1.5px solid rgba(247,243,238,0.25)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#F7F3EE",
                  caretColor: "#FF5C47",
                  height: "44px",
                  borderRadius: "0px",
                  fontSize: "16px",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-semibold transition-all active:scale-[0.98] disabled:opacity-60"
                style={{
                  background: "#FF5C47",
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  fontSize: "14px",
                  height: "44px",
                  borderRadius: "0px",
                }}
              >
                {loading ? "ENVIANDO…" : "AVÍSAME"}
              </button>
            </div>
          )}
          {!sent && error && (
            <p
              className="mt-3 text-xs text-center"
              style={{ color: "#FF5C47", fontFamily: "'Satoshi', sans-serif" }}
            >
              {error}
            </p>
          )}
          {!sent && !error && (
            <p
              className="mt-3 text-xs text-center"
              style={{ color: "rgba(247,243,238,0.35)", fontFamily: "'Satoshi', sans-serif" }}
            >
              Sin spam. Solo el aviso de lanzamiento.
            </p>
          )}
        </motion.form>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="w-16 my-10"
          style={{ height: "1px", background: "rgba(247,243,238,0.15)" }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            color: "rgba(242,196,109,0.7)",
            fontSize: "14px",
            letterSpacing: "0.04em",
          }}
        >
          Vive puro. Brilla diferente.
        </motion.p>
      </div>
    </div>
  )
}
