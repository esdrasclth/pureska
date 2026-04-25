"use client"

import { useState } from "react"
import { ugcVideos } from "@/app/data/ugcVideos"
import UGCCard from "./UGCCard"
import UGCSubmitModal from "./UGCSubmitModal"

export default function UGCSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="py-20 bg-[#F7F3EE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className="section-label text-[#FF5C47] mb-4">— PERSONAS REALES. RESULTADOS REALES. —</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <h2
            className="text-[#1A1A1A] leading-none"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(40px, 6vw, 72px)",
            }}
          >
            Lo probaron.
          </h2>
          <p
            className="text-[#7A7060] text-xl italic sm:text-right max-w-sm"
            style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}
          >
            Y no pueden dejar de hablar de ello.
          </p>
        </div>
      </div>

      {/* Horizontal scroll row */}
      <div
        className="flex justify-center gap-5 overflow-x-auto pb-4"
        style={{
          scrollSnapType: "x mandatory",
          paddingLeft: "24px",
          paddingRight: "24px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {ugcVideos.map((video, i) => (
          <div key={video.id} style={{ scrollSnapAlign: "start", flexShrink: 0 }}>
            <UGCCard video={video} index={i} />
          </div>
        ))}
      </div>

      {/* Section footer */}
      <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
        <h3
          className="text-[#1A1A1A] font-bold mb-2"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: "28px" }}
        >
          ¿Quieres aparecer aquí?
        </h3>
        <p className="text-[#7A7060] text-base mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
          Comparte tu historia PURESKA y únete a nuestra comunidad.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="border-2 border-[#FF5C47] text-[#FF5C47] px-8 py-3 rounded-full font-bold hover:bg-[#FF5C47] hover:text-white transition-all"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
        >
          Envía tu Video →
        </button>
      </div>

      <UGCSubmitModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
