"use client"
import SemiFooter from '@/components/SemiFooter'
import { fetchJourneyById, fetchRelatedJourneys } from '@/lib/api'
import { Palmtree } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import PhotoStrip, { type PhotoStripSlide } from "@/components/sections/photo-strip";
import Carousel from "@/components/Carousel";
import JourneyLoading from "@/components/journey-loading";

gsap.registerPlugin(ScrollTrigger)

// ─── Animated Hero Component ──────────────────────────────────────────────────

function AnimatedHero({ details }: { details: any }) {
    const heroRef = useRef<HTMLDivElement>(null)
    const bgRef = useRef<HTMLDivElement>(null)
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

            // Animate the title and overview once when the page loads.
            gsap.timeline({
                defaults: { ease: "power3.out" }
            })
                .to(bgRef.current, {
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

        }, heroRef)

        return () => ctx.revert()
    }, [details])

    return (
        <div
            ref={heroRef}
            className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-end"
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
                        className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-4 text-[#f0ece0] font-heading"
                    >
                        {details.name}
                    </h1>

                    {/* Description */}
                    <p
                        ref={descRef}
                        className="text-sm md:text-base  text-white/90 leading-relaxed font-medium max-w-3xl"
                    >
                        {details.description}
                    </p>
                </div>
            </div>
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
            <h2 className="text-xl font-heading font-bold py-5">
                &#9978; Day-wise Itinerary
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
    const [photoStrip, setPhotoStrip] = useState<PhotoStripSlide[]>([])

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

    if (loading) return <JourneyLoading />

    if (!journeyDetails) return <div className='py-20 text-center'>Journey not found</div>

    const details = journeyDetails.data || journeyDetails
    const related = Array.isArray(relatedJourneys)
        ? relatedJourneys
        : relatedJourneys.data || []

    return (
        <section>
            {/* ✅ Animated Hero - Responsive height */}
            <AnimatedHero details={details} />

            <PhotoStrip
                slides={photoStrip}
                options={{ dragFree: true, loop: true }}
                location={details.location}
                rating={details.rating}
            />

            <section className='py-10 container mx-auto px-4 md:px-10 space-y-3.5 font-heading rounded-t-2xl grid lg:grid-cols-10'>
                <div className="space-y-3.5 lg:col-span-7">
                    {details.itineraries?.length > 0 && (
                        <ItineraryTimeline itineraries={details.itineraries} />
                    )}

                    {details.activities?.length > 0 && (
                        <div>
                            <h1 className='text-xl font-heading font-bold py-3'>&#127796; Travel highlights</h1>
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
                            <h2 className="text-xl font-heading font-bold py-3">&#128336; Best Time to Visit</h2>
                            <div className="flex flex-wrap gap-2">
                                {details.bestTimeToVisit.map((period: string, i: number) => (
                                    <span key={i} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-sm font-medium">
                                    {period}
                                </span>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                <div className="lg:col-span-3 lg:p-5">
                    <aside className="lg:sticky lg:top-24 space-y-4 rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
                        <div>
                            <p className="text-[11px] uppercase tracking-[2px] text-emerald-700 font-bold">
                                Trip snapshot
                            </p>

                            <h2 className="mt-2 font-heading text-xl font-extrabold text-gray-800 leading-tight">
                                Ready to begin your journey?
                            </h2>

                            <p className="mt-2 text-sm font-medium text-gray-500 leading-relaxed">
                                Review the key details, then choose the booking path that fits your trip.
                            </p>
                        </div>

                        <div className="space-y-3 rounded-2xl bg-gray-50 p-4 text-sm font-semibold text-gray-700">
                            <div className="flex justify-between gap-3">
                                <span>Duration</span>
                                <span>{details.numberOfDays} days</span>
                            </div>

                            <div className="flex justify-between gap-3">
                                <span>Location</span>
                                <span className="text-right">{details.location}</span>
                            </div>

                            <div className="flex justify-between gap-3">
                                <span>Rating</span>
                                <span>{details.rating} / 5</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <a
                                href={`/plan-trip/${details.id}`}
                                className="block rounded-2xl bg-emerald-700 px-5 py-3.5 text-center font-heading font-bold text-white transition hover:bg-emerald-600"
                            >
                                Book this itinerary
                            </a>

                            <a
                                href="/plan-safari"
                                className="block rounded-2xl border border-emerald-700 px-5 py-3.5 text-center font-heading font-bold text-emerald-800 transition hover:bg-emerald-50"
                            >
                                Customize this trip
                            </a>
                        </div>

                        <div className="border-t pt-4">
                            <p className="mb-3 text-sm font-bold text-gray-800">On this page</p>

                            <div className="space-y-2 text-sm font-medium text-gray-500">
                                <a href="#itinerary" className="block hover:text-emerald-700">
                                    Day-wise itinerary
                                </a>
                                <a href="#highlights" className="block hover:text-emerald-700">
                                    Travel highlights
                                </a>
                                <a href="#best-time" className="block hover:text-emerald-700">
                                    Best time to visit
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>



            </section>
            <h1 className={'container mx-auto text-xl font-heading font-bold pb-10 px-4 md:px-10'}>&#129654; You may also like </h1>

            <div className=" pb-10 px-4 md:px-4">
                {related.length > 0 && (
                    <Carousel slides={related} options={{ dragFree: true, loop: related.length > 3 }} />
                )}
            </div>

            <SemiFooter />
        </section>
    )
}

export default DetailsPage
