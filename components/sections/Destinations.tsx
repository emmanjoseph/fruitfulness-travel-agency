"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fetchJourneys } from "@/lib/api";
import { Badge } from "../ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, StarIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export type Destination = {
    id: string;
    country: string;
    name: string;
    imgUrl: string;
    location: string;
    numberOfDays: string;
    description: string;
    tags: string[];
    rating: number;
    href?: string;
};

function splitWords(text: string) {
    return text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: "top" }}>
      <span className="word-inner inline-block" style={{ willChange: "transform, opacity" }}>
        {word}&nbsp;
      </span>
    </span>
    ));
}

const Destinations = () => {
    const [trips, setTrips] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);

    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const prevBtnRef = useRef<HTMLButtonElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);

    const VISIBLE = 4; // cards visible at once
    const SLICE = 7;
    const total = Math.min(trips.length, SLICE);
    const maxIndex = Math.max(0, total - VISIBLE);

    useEffect(() => {
        fetchJourneys()
            .then(setTrips)
            .finally(() => setLoading(false));
    }, []);

    // Slide track on current change
    useEffect(() => {
        if (!trackRef.current) return;
        const cardWidth = trackRef.current.children[0]?.clientWidth ?? 0;
        const gap = 24;
        gsap.to(trackRef.current, {
            x: -(current * (cardWidth + gap)),
            duration: 0.55,
            ease: "power3.inOut",
        });

        // Button opacity feedback
        if (prevBtnRef.current) gsap.to(prevBtnRef.current, { opacity: current === 0 ? 0.35 : 1, duration: 0.2 });
        if (nextBtnRef.current) gsap.to(nextBtnRef.current, { opacity: current >= maxIndex ? 0.35 : 1, duration: 0.2 });
    }, [current, maxIndex]);

    // Scroll-triggered intro animations
    useEffect(() => {
        if (loading || !titleRef.current || !paraRef.current || !trackRef.current) return;

        const ctx = gsap.context(() => {
            const titleWords = titleRef.current!.querySelectorAll<HTMLElement>(".word-inner");
            gsap.set(titleWords, { y: "110%", opacity: 0 });
            gsap.timeline({
                scrollTrigger: { trigger: titleRef.current, start: "top 88%", end: "top 50%", scrub: 1 },
            }).to(titleWords, { y: "0%", opacity: 1, stagger: 0.04, ease: "none" });

            const paraWords = paraRef.current!.querySelectorAll<HTMLElement>(".word-inner");
            gsap.set(paraWords, { y: "100%", opacity: 0 });
            gsap.timeline({
                scrollTrigger: { trigger: paraRef.current, start: "top 90%", end: "top 55%", scrub: 1 },
            }).to(paraWords, { y: "0%", opacity: 1, stagger: 0.025, ease: "none" });

            const cards = trackRef.current!.querySelectorAll<HTMLElement>(".trip-card");
            gsap.set(cards, { y: 60, opacity: 0, scale: 0.94 });
            gsap.timeline({
                scrollTrigger: { trigger: trackRef.current, start: "top 85%", end: "bottom 60%", scrub: 1.2 },
            }).to(cards, { y: 0, opacity: 1, scale: 1, stagger: 0.1, ease: "none" });
        }, sectionRef);

        return () => ctx.revert();
    }, [loading]);

    const prev = () => setCurrent((c) => Math.max(0, c - 1));
    const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));

    if (loading) {
        return (
            <div className="mx-auto container px-4 space-y-4 py-14">
                <div className="max-w-7xl mx-auto space-y-3">
                    <div className="h-10 w-72 bg-gray-200 rounded-xl animate-pulse" />
                    <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-80 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex gap-6 pt-4 overflow-hidden">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="min-w-[calc(25%-18px)] rounded-[35px] overflow-hidden border border-stone-300 shrink-0">
                            <div className="h-64 bg-gray-200 animate-pulse" />
                            <div className="p-6 space-y-3">
                                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                                <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div ref={sectionRef} className="mx-auto container px-4 py-14 md:py-24 space-y-6">
            {/* Header row */}
            <div className="flex items-end justify-between max-w-7xl mx-auto">
                <div>
                    <h2
                        ref={titleRef}
                        className="text-3xl md:text-5xl font-heading font-bold text-neutral-700"
                        aria-label="Latest Destinations"
                    >
                        {splitWords("Latest Destinations")}
                    </h2>
                    <p
                        ref={paraRef}
                        className="text-neutral-600 text-base lg:text-lg pt-4 max-w-2xl"
                    >
                        {splitWords(
                            "Step into the wild heart of Africa. East Africa offers diverse safari experiences, blending majestic wildlife, stunning scenery, and authentic cultural encounters — all in one unforgettable journey."
                        )}
                    </p>
                </div>

                {/* Arrow buttons */}
                <div className="flex items-center gap-3 shrink-0 pb-1">
                    <button
                        ref={prevBtnRef}
                        onClick={prev}
                        disabled={current === 0}
                        className="w-11 h-11 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition disabled:cursor-not-allowed"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={20} className="text-gray-700" />
                    </button>
                    <button
                        ref={nextBtnRef}
                        onClick={next}
                        disabled={current >= maxIndex}
                        className="w-11 h-11 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition disabled:cursor-not-allowed"
                        aria-label="Next"
                    >
                        <ChevronRight size={20} className="text-gray-700" />
                    </button>
                </div>
            </div>

            {/* Carousel viewport */}
            <div className="overflow-hidden">
                <div
                    ref={trackRef}
                    className="flex gap-2"
                    style={{ willChange: "transform" }}
                >
                    {trips.slice(0, SLICE).map((trip) => (
                        <Link
                            href={`/details/${trip.id}`}
                            key={trip.id}
                            className="trip-card shrink-0 w-[350px] rounded-[35px] overflow-hidden border border-stone-300 bg-emerald-50/50 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-64 md:h-70 overflow-hidden">
                                <Image
                                    src={trip.imgUrl}
                                    alt={trip.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute z-10 p-6">
                                    <Badge className="bg-emerald-600 font-semibold text-base">
                                        {trip.numberOfDays} days
                                    </Badge>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-3">
                                <h3 className="font-bold font-heading text-lg text-gray-700 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                    {trip.name}
                                </h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold font-heading text-gray-900">{trip.rating}</span>
                                    <StarIcon className="fill-amber-400 text-amber-400" size={16} />
                                    <span className="text-sm text-gray-600">
                    {trip.rating >= 4.5 ? "Superb" : "Good"}
                  </span>
                                </div>
                                {trip.description && (
                                    <p className="text-sm font-medium text-gray-600 line-clamp-2">
                                        {trip.description}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 pt-2">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full transition-all duration-300 ${
                            current === i ? "w-6 h-2 bg-emerald-600" : "w-2 h-2 bg-gray-300"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Destinations;