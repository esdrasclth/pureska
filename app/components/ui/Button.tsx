"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type ButtonProps = {
  variant?: "primary" | "ghost" | "ghost-white" | "ghost-plum"
  size?: "sm" | "md" | "lg"
  children: ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  type = "button",
  disabled,
  className = "",
  fullWidth,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-[Cabinet_Grotesk] font-700 cursor-pointer transition-all duration-300 rounded-full select-none"

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-4 text-lg",
  }

  const variants = {
    primary: "bg-[#FF5C47] text-white hover:bg-[#e64e3a]",
    ghost: "border border-[#FF5C47] text-[#FF5C47] bg-transparent hover:bg-[#FF5C47] hover:text-white",
    "ghost-white": "border border-white text-white bg-transparent hover:bg-white hover:text-[#3D1A4B]",
    "ghost-plum": "border border-[#3D1A4B] text-[#3D1A4B] bg-transparent hover:bg-[#3D1A4B] hover:text-white",
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
    >
      {children}
    </motion.button>
  )
}
