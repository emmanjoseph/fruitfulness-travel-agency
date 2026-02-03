"use client"

import { useEffect, useRef, ReactNode } from "react"
import { gsap } from "gsap"

type Direction = "left" | "right"

interface InfiniteScrollProps {
  children: ReactNode
  speed?: number
  direction?: Direction
  gap?: number
  className?: string
  fadeWidth?: number        // NEW: width of gradient fade (px)
  fadeColor?: string        // NEW: background color to fade into
}

export default function InfiniteScroll({
  children,
  speed = 40,
  direction = "left",
  gap = 16,
  className = "",
  fadeWidth = 80,
  fadeColor = "#ffffff",
}: InfiniteScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current
      if (!container) return

      const totalWidth = container.scrollWidth / 2
      const xValue = direction === "left" ? -totalWidth : totalWidth

      gsap.to(container, {
        x: xValue,
        duration: speed,
        repeat: -1,
        ease: "linear",
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [speed, direction])

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Left Fade */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full z-10"
        style={{
          width: fadeWidth,
          background: `linear-gradient(to right, ${fadeColor}, transparent)`,
        }}
      />

      {/* Right Fade */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full z-10"
        style={{
          width: fadeWidth,
          background: `linear-gradient(to left, ${fadeColor}, transparent)`,
        }}
      />

     <div
  ref={containerRef}
  className="flex w-max"
  style={{ gap: `${gap}px` }}
>
  {children}
  {children}
</div>

    </div>
  )
}
