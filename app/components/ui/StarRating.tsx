type StarRatingProps = {
  stars: number
  count?: number
  size?: "sm" | "md"
}

export default function StarRating({ stars, count, size = "sm" }: StarRatingProps) {
  const full = Math.floor(stars)
  const half = stars % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  const sz = size === "sm" ? 14 : 18

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: full }).map((_, i) => (
          <StarIcon key={`f-${i}`} size={sz} fill="#F2C46D" />
        ))}
        {half && <StarIcon key="h" size={sz} fill="#F2C46D" half />}
        {Array.from({ length: empty }).map((_, i) => (
          <StarIcon key={`e-${i}`} size={sz} fill="transparent" stroke="#F2C46D" />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-[#7A7060] text-xs ml-1">({count})</span>
      )}
    </div>
  )
}

function StarIcon({
  size,
  fill,
  stroke,
  half,
}: {
  size: number
  fill: string
  stroke?: string
  half?: boolean
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="flex-shrink-0">
      {half ? (
        <>
          <defs>
            <linearGradient id="half-grad">
              <stop offset="50%" stopColor="#F2C46D" />
              <stop offset="50%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill="url(#half-grad)"
            stroke="#F2C46D"
            strokeWidth="1.5"
          />
        </>
      ) : (
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          fill={fill}
          stroke={stroke || fill}
          strokeWidth="1.5"
        />
      )}
    </svg>
  )
}
