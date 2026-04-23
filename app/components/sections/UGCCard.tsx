"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import type { UGCVideo } from "@/app/data/ugcVideos"
import StarRating from "@/app/components/ui/StarRating"

type UGCCardProps = {
  video: UGCVideo
  index: number
}

export default function UGCCard({ video, index }: UGCCardProps) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rotation = index % 2 === 0 ? -1.5 : 1.5

  function handlePlay() {
    if (videoRef.current) {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <div className="flex flex-col items-center flex-shrink-0">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06, duration: 0.5 }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        style={{ rotate: rotation }}
        className="relative overflow-hidden cursor-pointer"
        onClick={handlePlay}
        role="button"
        aria-label={`Play video by ${video.name}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handlePlay()}
        css-vars="none"
      >
        <div
          className="relative overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.10)]"
          style={{ width: 220, height: 390, background: "#1a1a1a" }}
        >
          {/* Thumbnail / video */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.thumbnail}
            alt={`${video.name} thumbnail`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {video.videoUrl && (
            <video
              ref={videoRef}
              src={video.videoUrl}
              className={`absolute inset-0 w-full h-full object-cover ${playing ? "opacity-100" : "opacity-0"}`}
              loop
              playsInline
            />
          )}

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/40 rounded-full px-2 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
            <span className="text-white text-[10px] font-bold">REC</span>
          </div>
          <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-0.5 flex items-center gap-1">
            <span className="text-[#FF5C47] text-[9px]">✓</span>
            <span className="text-[#1A1A1A] text-[10px] font-medium">Verified</span>
          </div>

          {/* Play button */}
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ opacity: 1, scale: 58 / 52 }}
                className="w-13 h-13 rounded-full bg-white/40 flex items-center justify-center"
                style={{ width: 52, height: 52 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </motion.div>
            </div>
          )}

          {/* Bottom overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 p-4"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
          >
            <p className="text-white font-medium text-[13px]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              {video.name}
            </p>
            <p className="text-[#FF5C47] text-[11px]">{video.city}</p>
            <p className="text-white text-[12px] italic mb-1" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}>
              {video.product}
            </p>
            <StarRating stars={video.stars} size="sm" />
          </div>
        </div>
      </motion.div>

      <p
        className="text-[#7A7060] text-[13px] italic text-center mt-3 max-w-[200px]"
        style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}
      >
        &ldquo;{video.quote}&rdquo;
      </p>
    </div>
  )
}
