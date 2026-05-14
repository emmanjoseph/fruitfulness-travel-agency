"use client"
import SemiFooter from '@/components/SemiFooter'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchJourneyById, fetchRelatedJourneys } from '@/lib/api'
import {
    MapPin, Palmtree, StarIcon, Volleyball
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SliderCards from "@/components/slider";

gsap.registerPlugin(ScrollTrigger)

// ─── Animated Hero Component ──────────────────────────────────────────────────

function AnimatedHero({ details }: { details: any }) {
    const heroRef = useRef<HTMLDivElement>(null)
    const bgRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const descRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if (!heroRef.current) return

        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(bgRef.current, { scale: 1.2 })
            gsap.set([titleRef.current, descRef.current], {
                opacity: 0,
                y: 50
            })

            // Entrance animation timeline
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" }
            })

            tl.to(bgRef.current, {
                scale: 1,
                duration: 1.5,
                ease: "power2.out"
            })
                .to(titleRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1
                }, "-=0.8")
                .to(descRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1
                }, "-=0.6")

            // Parallax on scroll
            gsap.to(bgRef.current, {
                y: 100,
                scale: 1.1,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            })

            gsap.to([titleRef.current, descRef.current], {
                y: -50,
                opacity: 0.3,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            })

        }, heroRef)

        return () => ctx.revert()
    }, [details])

    return (
        <div
            ref={heroRef}
            className="relative h-[70vh] min-h-[500px] md:h-[600px] overflow-hidden flex items-end"
        >
            {/* Background Image */}
            <div
                ref={bgRef}
                className="absolute inset-0 will-change-transform"
                style={{
                    backgroundImage: `url('${details.imgUrl}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            />

            {/* Gradient Overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40"
            />

            {/* Content */}
            <div className="relative w-full z-10 px-6 lg:px-10 pb-12 md:pb-16 max-w-7xl mx-auto">
                <div className="max-w-4xl">
                    {/* Title */}
                    <h1
                        ref={titleRef}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4 text-[#f0ece0] font-heading"
                    >
                        {details.name}
                    </h1>

                    {/* Description */}
                    <p
                        ref={descRef}
                        className="text-sm md:text-base lg:text-lg text-white/90 leading-relaxed font-medium max-w-3xl"
                    >
                        {details.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

// ─── Photo Strip with Stats ───────────────────────────────────────────────────

function PhotoStripWithStats({
                                 photos,
                                 location,
                                 rating
                             }: {
    photos: { src: string; alt: string }[]
    location: string
    rating: number
}) {
    const stripRef = useRef<HTMLDivElement>(null)
    const photosRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (!stripRef.current || photos.length === 0) return

        const ctx = gsap.context(() => {
            const photoElements = photosRef.current.filter(Boolean)

            gsap.set(photoElements, {
                opacity: 0,
                y: 30,
                scale: 0.9
            })

            gsap.to(photoElements, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stripRef.current,
                    start: "top 80%"
                }
            })
        }, stripRef)

        return () => ctx.revert()
    }, [photos])

    return (
        <div className="bg-black">
            {/* Stats */}
            <div className="flex items-center gap-x-5 text-white max-w-7xl mx-auto px-6 lg:px-10 pt-6">
                <div className="flex items-center gap-x-1.5 font-semibold font-heading text-sm">
                    <MapPin className="fill-emerald-400 text-emerald-400" size={16} />
                    {location}
                </div>
                <div className="flex items-center gap-x-1.5 font-semibold font-heading text-sm">
                    <StarIcon className="fill-amber-400 text-amber-400" size={16} />
                    {rating} / 5
                </div>
            </div>

            {/* Photo Strip */}
            {photos.length > 0 && (
                <div
                    ref={stripRef}
                    className="flex gap-3 px-6 lg:px-10 py-10 overflow-x-auto scrollbar-hide"
                >
                    {photos.map((photo, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                photosRef.current[i] = el
                            }}
                            className={`flex-none w-[280px] md:w-[320px] h-[200px] md:h-[250px] rounded-xl overflow-hidden cursor-pointer
                                transition-transform duration-200 hover:scale-[1.03]
                                ${i === 0 ? "ring-2 ring-[#d4a843] ring-offset-2 ring-offset-black" : ""}
                            `}
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-full object-cover brightness-[0.88] saturate-110 hover:brightness-100 hover:saturate-[1.2] transition-all duration-200"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── Itinerary Timeline ───────────────────────────────────────────────────────

function ItineraryTimeline({ itineraries }: { itineraries: any[] }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current || !lineRef.current) return

        const items = containerRef.current.querySelectorAll(".itinerary-item")

        gsap.fromTo(
            lineRef.current,
            { scaleY: 0, transformOrigin: "top center" },
            {
                scaleY: 1,
                duration: items.length * 0.6,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "bottom 80%",
                    scrub: 1,
                },
            }
        )

        items.forEach((item, i) => {
            gsap.fromTo(
                item,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                    delay: i * 0.05,
                }
            )

            const dot = item.querySelector(".itinerary-dot")
            if (dot) {
                gsap.fromTo(
                    dot,
                    { scale: 0 },
                    {
                        scale: 1,
                        duration: 0.4,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                )
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [itineraries])

    return (
        <div className="py-6">
            <h2 className="text-2xl lg:text-3xl font-medium text-gray-700 mb-8 flex items-center gap-x-2 font-heading">
                Day-wise Itinerary
            </h2>

            <div ref={containerRef} className="relative">
                <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gray-100 overflow-hidden">
                    <div ref={lineRef} className="w-full h-full bg-emerald-400 origin-top" />
                </div>

                <div className="space-y-8">
                    {itineraries.map((item: any, index: number) => (
                        <div key={item.id} className="itinerary-item flex gap-5 pl-1">
                            <div className="relative z-10 shrink-0 mt-1">
                                <div className="itinerary-dot w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                                    <div className="size-8 bg-emerald-600 rounded-full flex items-center justify-center font-heading">
                                        {item.day}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 px-5 py-4 transition-all duration-200">
                                <h3 className="font-semibold text-gray-700 text-xl leading-tight">{item.title}</h3>
                                <p className="text-gray-500 text-[15px] mt-1 leading-relaxed font-medium">{item.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const DetailsPage = () => {
    const { id } = useParams()
    const idParam = Array.isArray(id) ? id[0] : id

    const [journeyDetails, setJourneyDetails] = useState<any>(null)
    const [relatedJourneys, setRelatedJourneys] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [photoStrip, setPhotoStrip] = useState<{ src: string; alt: string }[]>([])

    useEffect(() => {
        if (!idParam) return

        const getJourneyDetails = async () => {
            try {
                const details = await fetchJourneyById(idParam)
                setJourneyDetails(details)
            } catch (error) {
                console.error("Error fetching details:", error)
            } finally {
                setLoading(false)
            }
        }

        const getRelatedJourneys = async () => {
            try {
                const related = await fetchRelatedJourneys(idParam)
                setRelatedJourneys(related)
            } catch (error) {
                console.error("Error fetching related journeys:", error)
            }
        }

        getJourneyDetails()
        getRelatedJourneys()
    }, [idParam])

    useEffect(() => {
        if (!journeyDetails) return

        const resolved = journeyDetails.data || journeyDetails
        const query = encodeURIComponent(`${resolved.location} safari`)

        fetch(
            `https://api.pexels.com/v1/search?query=${query}&per_page=9&orientation=landscape`,
            { headers: { Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY! } }
        )
            .then(r => r.json())
            .then(data =>
                setPhotoStrip(
                    data.photos.map((p: any) => ({
                        src: p.src.large,
                        alt: p.alt || resolved.location,
                    }))
                )
            )
            .catch(console.error)
    }, [journeyDetails])

    if (loading) return (
        <div className='max-w-3xl mx-auto px-4 md:px-0 py-20 text-center flex items-center flex-col space-y-3'>
            <Skeleton className="h-12 w-3/4 rounded-xl" />
            <Skeleton className="h-[225px] w-9/10 bg-gray-200 rounded-[30px]" />
            <Skeleton className="h-[125px] w-9/10 bg-gray-200 rounded-[30px]" />
            <Skeleton className="h-12 w-1/2 bg-gray-200 rounded-[30px]" />
            <Skeleton className="h-12 w-1/2 bg-gray-200 rounded-[30px]" />
        </div>
    )

    if (!journeyDetails) return <div className='py-20 text-center'>Journey not found</div>

    const details = journeyDetails.data || journeyDetails
    const related = relatedJourneys.data || relatedJourneys

    return (
        <section>
            {/* ✅ Animated Hero - Responsive height */}
            <AnimatedHero details={details} />

            {/* ✅ Photo Strip with Stats */}
            <PhotoStripWithStats
                photos={photoStrip}
                location={details.location}
                rating={details.rating}
            />

            <section className='py-20 max-w-5xl mx-auto px-4 md:px-0 space-y-3.5 font-sans'>
                {details.tags?.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto py-3">
                        {details.tags.map((tag: string, index: number) => (
                            <Badge key={index} className="px-3 py-1.5 bg-black font-bold">{tag}</Badge>
                        ))}
                    </div>
                )}

                {details.itineraries?.length > 0 && (
                    <ItineraryTimeline itineraries={details.itineraries} />
                )}

                {details.activities?.length > 0 && (
                    <div>
                        <h1 className='text-2xl font-medium font-heading text-gray-600 py-3 flex items-center gap-x-1.5'>Travel highlights</h1>
                        <div className="space-y-2">
                            {details.activities.map((activity: string, index: number) => (
                                <div key={index} className="py-4 px-6 bg-gray-50 rounded-xl flex items-center gap-x-2.5 font-medium text-[15px] text-gray-600">
                                    <Palmtree size={17} className={'text-orange-500 fill-orange-500'} />
                                    {activity}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {details.bestTimeToVisit?.length > 0 && (
                    <div>
                        <h2 className="text-2xl py-3 flex items-center gap-x-1.5 font-heading font-medium text-gray-600">Best Time to Visit</h2>
                        <div className="flex flex-wrap gap-2">
                            {details.bestTimeToVisit.map((period: string, i: number) => (
                                <span key={i} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-sm font-medium">
                                    {period}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <Link href={`/plan-trip/${details.id}`}>
                    <button type="button" className='bg-emerald-700 w-full max-w-[400px] mx-auto rounded-[20px] py-4 px-6 text-white font-semibold cursor-pointer flex items-center justify-center gap-x-2 hover:bg-emerald-600 transition-all duration-150'>
                        <p className='text-base font-medium font-heading'>Plan your safari</p>
                    </button>
                </Link>
            </section>

            <div className="pb-20">
                <div className="max-w-5xl mx-auto px-4 lg:px-0 flex flex-col items-center gap-x-1.5">
                    <h2 className="text-3xl flex items-center gap-x-1.5 font-heading font-medium text-gray-600">You may also like</h2>
                    <p className={'text-gray-500 text-xl mt-1 leading-relaxed font-medium'}>Explore more unforgettable safari experiences</p>
                </div>
                <SliderCards journey={related}/>
            </div>

            <SemiFooter />
        </section>
    )
}

export default DetailsPage
