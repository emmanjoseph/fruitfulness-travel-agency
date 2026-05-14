"use client"
import React, { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Journey {
    id: string
    name: string
    description: string
    rating: number
    location: string
    numberOfDays: number
    imgUrl: string
    country: string
    activities: string[]
    pricing?: Array<{
        citizenPrice: string
        nonResidentPrice: string
        currency: string
    }>
}

interface SliderCardsProps {
    journey: Journey[]
}

const CARD_WIDTH = 520
const GAP = 16

const SliderCards = ({ journey }: SliderCardsProps) => {
    const trackRef = useRef<HTMLDivElement>(null)
    const [index, setIndex] = useState(0)

    if (!journey?.length) return null

    const maxIndex = Math.max(0, journey.length - 1)

    const scrollTo = (next: number) => {
        const clamped = Math.max(0, Math.min(next, maxIndex))
        setIndex(clamped)
        if (trackRef.current) {
            trackRef.current.scrollTo({
                left: clamped * (CARD_WIDTH + GAP),
                behavior: "smooth",
            })
        }
    }

    return (
        <div className="relative overflow-hidden">
            {/*/!* Background texture *!/*/}
            {/*<div className="absolute inset-0 opacity-5"*/}
            {/*     style={{*/}
            {/*         backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,*/}
            {/*         backgroundSize: '40px 40px'*/}
            {/*     }}*/}
            {/*/>*/}

            <div className="relative">
                {/* Controls */}
                <div className="flex items-center justify-end gap-3 px-6 md:px-20 mb-8">
                    <button
                        onClick={() => scrollTo(index - 1)}
                        disabled={index === 0}
                        className="size-12 bg-black/10 backdrop-blur-sm border border-black/20 rounded-full
                            flex items-center justify-center transition-all hover:bg-black/20
                            disabled:opacity-20 disabled:cursor-not-allowed"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-5 h-5 text-black" />
                    </button>
                    <button
                        onClick={() => scrollTo(index + 1)}
                        disabled={index === maxIndex}
                        className="size-12 bg-black/10 backdrop-blur-sm border border-black/20 rounded-full
                            flex items-center justify-center transition-all hover:bg-black/20
                            disabled:opacity-20 disabled:cursor-not-allowed"
                        aria-label="Next"
                    >
                        <ChevronRight className="w-5 h-5 text-black" />
                    </button>
                </div>

                {/* Track */}
                <div
                    ref={trackRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide px-6 md:px-4 pb-2"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {journey.map((trip, index) => {
                        const price = trip.pricing?.[0];
                        const hasDiscount = Math.random() > 0.6; // Demo discount logic
                        const originalPrice = price ? Math.round(parseFloat(price.citizenPrice) * 1.25) : 0;

                        return (
                            <Link
                                key={trip.id}
                                href={`/details/${trip.id}`}
                                className={`group flex-none w-[520px] ${index === 0 ? 'pl-10' : ''}`}
                                style={{ scrollSnapAlign: "start" }}
                            >
                                <div className={`relative rounded-[40px] overflow-hidden h-110 `}>
                                    {/* Background Image */}
                                    <Image
                                        src={trip.imgUrl}
                                        alt={trip.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Dark gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                                    {/* Top Badges */}
                                    <div className="absolute top-5 left-5 flex gap-2">
                                        {hasDiscount && (
                                            <Badge className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 py-1.5 text-sm">
                                                20% off
                                            </Badge>
                                        )}
                                        <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-3 py-1.5 text-sm">
                                            New
                                        </Badge>
                                    </div>

                                    {/* Bottom Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                                        {/* Star Rating */}
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={
                                                        i < Math.floor(trip.rating)
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'fill-gray-600 text-gray-600'
                                                    }
                                                />
                                            ))}
                                            <span className="text-white/70 text-sm ml-1">(2 Reviews)</span>
                                        </div>

                                        {/* Title & Price */}
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-1 font-heading">
                                                {trip.name}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
                                            {trip.description || '6 excursions to the main cities of the country, admire the beautiful autumn gardens'}
                                        </p>

                                        {/* Duration */}
                                        <div className="flex items-center gap-2 text-white/80">
                                            <Clock size={18} />
                                            <span className="text-sm font-medium">{trip.numberOfDays} days</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 pt-8">
                    {journey.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                i === index ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SliderCards
