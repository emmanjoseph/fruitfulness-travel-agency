"use client"
import React, { useState, useEffect, useRef } from "react"
import { Plane, Hotel, Briefcase, ChevronDown } from "lucide-react"
import Image from "next/image"
import { gsap } from "gsap"

const services = [
  {
    id: 1,
    title: "Flight & Ticketing",
    icon: Plane,
    description:
      "We handle all your flight bookings, ensuring timely schedules, flexible options, and priority support for corporate travelers.",
    image:
      "https://images.unsplash.com/photo-1592985684811-6c0f98adb014?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZsaWdodHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    title: "Hotel Booking",
    icon: Hotel,
    description:
      "Access top-rated hotels with exclusive corporate rates and seamless check-in experiences for your team’s comfort.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Conferencing",
    icon: Briefcase,
    description:
      "Plan your next business meeting or corporate retreat with ease. We manage venues, logistics, and event support to perfection.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop",
  },
]

const Corporate = () => {
  const [activeId, setActiveId] = useState(1)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<HTMLDivElement[]>([])

  // Animate image transition
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      )
    }
  }, [activeId])

  // Animate accordion open/close
  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (!el) return
      const isActive = services[index].id === activeId

      gsap.to(el, {
        height: isActive ? "auto" : 0,
        duration: 0.6,
        ease: "power2.inOut",
        opacity: isActive ? 1 : 0,
        paddingTop: isActive ? 12 : 0,
      })
    })
  }, [activeId])

  const activeService = services.find((s) => s.id === activeId)!

  return (
    <section className="max-w-[1440px] mx-auto p-4 py-28">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left: Accordion */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-gray-800 text-4xl md:text-4xl lg:text-5xl font-heading leading-tight max-w-md">
            Seamless <br /> Travel Solutions
          </h1>
          <p className="text-gray-600 tracking-wide font-medium max-w-lg">
            Our corporate package ensures your business trips are smooth,
            efficient, and stress-free. Explore our key services below:
          </p>

          <div className="space-y-4 max-w-lg">
            {services.map(({ id, title, icon: Icon, description }, i) => (
              <div
                key={id}
                className={`border border-gray-200 rounded-2xl p-4 tour-card cursor-pointer transition-all duration-300 ${
                  activeId === id
                    ? "bg-emerald-50 border-emerald-400 shadow-md"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveId(id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon
                      size={17}
                      className={`${
                        activeId === id ? "text-emerald-600" : "text-gray-500"
                      }`}
                    />
                    <h3
                      className={`font-semibold text-base ${
                        activeId === id
                          ? "text-emerald-700"
                          : "text-gray-700"
                      }`}
                    >
                      {title}
                    </h3>
                  </div>
                  <ChevronDown
                    size={17}
                    className={`transition-transform ${
                      activeId === id ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </div>

                {/* GSAP controlled content */}
                <div
                  ref={(el) => {
                    if (el) contentRefs.current[i] = el
                  }}
                  className="overflow-hidden text-gray-600 text-[15px] leading-relaxed"
                  style={{ height: 0, opacity: 0 }}
                >
                  <p className="mt-1">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Animated Image */}
        <div className="md:w-1/2 relative">
          <div
            ref={imageRef}
            className="overflow-hidden rounded-3xl shadow-lg w-full h-[300px] md:h-[430px] lg:h-[500px]"
          >
            <Image
              key={activeService.image}
              src={activeService.image}
              alt={activeService.title}
              width={800}
              height={600}
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Corporate
