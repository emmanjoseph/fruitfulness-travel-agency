"use client"

import { LocationEdit } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    heading: "Find your destination",
    description:
      "Explore a handpicked selection of global gems, from hidden local retreats to iconic world wonders tailored to your travel style.",
    icon: LocationEdit,
    bgColor: "#FFF0EC",
  },
  {
    heading: "Book your trip",
    description:
      "Experience a seamless checkout with transparent pricing, flexible payment options, and instant digital confirmation sent to your inbox.",
    icon: LocationEdit,
    bgColor: "#E4F9F9",
  },
  {
    heading: "Enjoy the journey",
    description:
      "Travel with peace of mind knowing our 24/7 support is with you every step of the way as you create stories that last a lifetime.",
    icon: LocationEdit,
    bgColor: "#E3F0FF",
  },
]

const Steps = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])
  const imagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Steps animation
    gsap.fromTo(
      stepsRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    )

    // Image collage animation
    if (imagesRef.current) {
      gsap.fromTo(
        imagesRef.current.children,
        {
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imagesRef.current,
            start: "top 75%",
          },
        }
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[800px] w-full overflow-hidden mt-10 lg:mt-0"
    >
      {/* Background */}
      <Image
        src="/bg-1.png"
        alt="hero background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 lg:py-28">
        <div className="mx-auto max-w-[1100px] px-4 flex flex-col items-center">
          <h1 className="text-xl md:text-3xl text-gray-600 text-center font-semibold">
            How it works
          </h1>
          <p className="text-base text-center font-medium text-gray-700 max-w-2xl py-1">
            Get to your desired destination
          </p>

          <div className="flex items-center gap-6 mt-10 w-full">
            {/* Images */}
            <div
              ref={imagesRef}
              className="hidden w-1/2 lg:grid grid-cols-3 gap-10"
            >
              <Image
                src="https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=900"
                alt="img"
                width={1000}
                height={1000}
                className="rounded-4xl object-cover col-span-2 h-50"
              />
              <Image
                src="https://images.unsplash.com/photo-1564613469739-c78f970f9c17?w=900"
                alt="img"
                width={1000}
                height={1000}
                className="rounded-4xl object-cover h-52"
              />
              <Image
                src="https://plus.unsplash.com/premium_photo-1679619558250-41fa96ef187c?w=900"
                alt="img"
                width={1000}
                height={1000}
                className="rounded-4xl object-cover"
              />
              <Image
                src="https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=900"
                alt="img"
                width={1000}
                height={1000}
                className="rounded-4xl object-cover col-span-2 h-68"
              />
            </div>

            {/* Steps */}
            <div className="w-full lg:w-1/2 space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) stepsRef.current[index] = el
                    }}
                    style={{ background: step.bgColor }}
                    className="flex gap-4 rounded-2xl p-6 shadow-sm border"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {step.heading}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Steps
