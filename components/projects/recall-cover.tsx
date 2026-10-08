import Image from "next/image"
import type { CSSProperties } from "react"

const heights = [18, 27, 39, 25, 49, 68, 89, 62, 104, 135, 96, 73, 119, 149, 108, 81, 54, 76, 111, 138, 158, 117, 84, 65, 91, 127, 102, 69, 51, 78, 99, 62, 43, 29, 38, 24, 17]

/** A project illustration, not a recording interface or an app screenshot. */
export function RecallCover({ background, animated = false, priority = false }: {
  background: string
  animated?: boolean
  priority?: boolean
}) {
  return (
    <span className="recall-cover relative block size-full" data-animated={animated}>
      <Image src={background} alt="" fill sizes="(max-width: 640px) 100vw, 672px" priority={priority} className="object-cover" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 1200 675" aria-hidden>
        <rect x="115" y="112" width="970" height="451" rx="8" fill="white" fillOpacity=".97" />
        <text x="165" y="229" fontFamily="Satoshi, Arial, sans-serif" fontSize="74" fontWeight="600" letterSpacing="-2.5" fill="#172338">Recall</text>
        <path d="M165 267H1035" stroke="#d9e6fa" />
        <path d="M165 404H1035" stroke="#e1ebfa" />
        {heights.map((height, index) => (
          <rect key={index} className="recall-wave-bar" x={177 + index * 23} y={404 - height / 2} width="9" height={height} rx="4.5" fill={index % 3 === 0 ? "#2459a7" : "#4285e4"} style={{ "--wave-delay": `${-index * 0.13}s` } as CSSProperties} />
        ))}
      </svg>
    </span>
  )
}
