"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

const reviews = [
  {
    id: 1,
    username: "John Doe",
    avatar: "/images/avatar1.jpg",
    review: "Absolutely amazing experience! I loved every moment of my trip.",
    date:"10/Sep/2025"
  },
  {
    id: 2,
    username: "Sarah Lee",
    avatar: "/images/avatar2.jpg",
    review: "The service was outstanding and the destinations were breathtaking.",
    date:"10/Sep/2025"

  },
  {
    id: 3,
    username: "Michael Smith",
    avatar: "/images/avatar3.jpg",
    review: "Best travel experience I’ve ever had. Highly recommend!",
    date:"10/September/2025"

  },
  {
    id: 4,
    username: "Emily Davis",
    avatar: "/images/avatar4.jpg",
    review: "Smooth planning, great recommendations, and unforgettable memories!",
    date:"10/Sep/2025"

  },
  {
    id: 5,
    username: "Amina Yusuf",
    avatar: "/images/avatar5.jpg",
    review: "The team was so helpful and made my safari truly unforgettable. Will book again!",
    date:"12/September/2025"

  },
  {
    id: 6,
    username: "Peter Kimani",
    avatar: "/images/avatar6.jpg",
    review: "Loved the attention to detail and the friendly guides. Highly recommended for families.",
    date:"15/July/2025"

  },
  {
    id: 7,
    username: "Linda Mwangi",
    avatar: "/images/avatar7.jpg",
    review: "From booking to the actual trip, everything was seamless. Thank you for a wonderful adventure!",
    date:"13/August/2025"

  },
]

export default function InfiniteReviewScroll() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current
      if (!container) return

      const totalWidth = container.scrollWidth / 2 // half since duplicated
      gsap.to(container, {
        x: -totalWidth,
        duration: 40,
        repeat: -1,
        ease: "linear",
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth), // seamless wrap
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="w-full overflow-hidden pt-5 pb-2 font-sans">
      <div ref={containerRef} className="flex">
        {[...reviews, ...reviews].map((review, idx) => ( // duplicate row
          <div
            key={idx}
            className="flex-shrink-0 w-[320px] sm:w-[400px] mx-4 p-6 bg-white rounded-3xl shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="size-12 bg-gradient-to-r from-violet-100 to-emerald-400 rounded-full" />
              <div>
               <p className="font-semibold text-gray-800">{review.username}</p>
               <span className="text-sm text-gray-600 font-medium">{review.date}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
