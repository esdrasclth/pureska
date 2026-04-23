type BadgeProps = {
  variant?: "category" | "tag" | "stock"
  children: React.ReactNode
  className?: string
}

export default function Badge({ variant = "category", children, className = "" }: BadgeProps) {
  const styles = {
    category:
      "bg-[#F2C46D] text-[#3D1A4B] text-xs font-medium px-3 py-1 rounded-full inline-block",
    tag: "bg-[#F7F3EE] text-[#7A7060] text-xs px-2 py-0.5 rounded-full inline-block border border-[#E8E0D5]",
    stock: "text-xs font-medium px-2 py-0.5 rounded-full inline-block",
  }

  return (
    <span className={`${styles[variant]} ${className}`} style={{ fontFamily: "'Satoshi', sans-serif" }}>
      {children}
    </span>
  )
}
