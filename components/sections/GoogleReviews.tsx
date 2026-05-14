"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Review {
    author_name: string;
    author_url: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
}

interface ReviewsData {
    name: string;
    rating: number;
    totalReviews: number;
    reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? "text-amber-400" : "text-stone-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

const cardStyles = [
    { color: "bg-gradient-to-br from-orange-100 to-pink-100", rotation: "-rotate-2", zIndex: "z-10" },
    { color: "bg-gradient-to-br from-yellow-100 to-amber-100", rotation: "rotate-1", zIndex: "z-20" },
    { color: "bg-gradient-to-br from-purple-100 to-indigo-200", rotation: "-rotate-1", zIndex: "z-30" },
    { color: "bg-gradient-to-br from-rose-100 to-pink-100", rotation: "rotate-2", zIndex: "z-20" },
];

function ReviewCard({ review, index }: { review: Review; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = review.text.length > 180;
    const displayText = isLong && !expanded ? review.text.slice(0, 180) + "…" : review.text;
    const style = cardStyles[index % cardStyles.length];

    return (
        <div
            className={`${style.color} ${style.rotation} ${style.zIndex} p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-0 relative overflow-hidden group`}
        >
            <div className="absolute top-4 left-4 text-6xl font-serif text-black/5 leading-none">"</div>
            <div className="mb-4">
                <StarRating rating={review.rating} />
            </div>
            <p className="text-gray-800 text-base leading-relaxed mb-6 relative z-10 font-medium">
                "{displayText}"
                {isLong && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="ml-1 text-gray-700 underline hover:text-gray-900 transition-colors text-sm"
                    >
                        {expanded ? "Show less" : "Read more"}
                    </button>
                )}
            </p>
            <div className="flex items-center gap-3 mt-auto">
                <div className="size-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                    <span className="font-bold text-white text-sm uppercase">
                        {review.author_name.slice(0, 2)}
                    </span>
                </div>
                <div>
                    <p className="font-bold text-gray-900 text-sm">{review.author_name}</p>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">{review.relative_time_description}</p>
                </div>
            </div>
        </div>
    );
}

// ─── Word splitter helper ────────────────────────────────────────────────────
function splitIntoWordSpans(text: string, className = "") {
    return text.split(" ").map((word, i) => (
        <span
            key={i}
            className={`inline-block overflow-hidden ${className}`}
            style={{ verticalAlign: "top" }}
        >
            <span
                className="word-inner inline-block"
                style={{ willChange: "transform, opacity" }}
            >
                {word}&nbsp;
            </span>
        </span>
    ));
}

export default function GoogleReviews() {
    const [data, setData] = useState<ReviewsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // ── Fetch data ────────────────────────────────────────────────────────────
    useEffect(() => {
        fetch("/api/reviews")
            .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
            .then(setData)
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    // ── GSAP animations (fires after data loads) ──────────────────────────────
    useEffect(() => {
        if (!data || !titleRef.current || !paraRef.current || !cardsRef.current) return;

        const ctx = gsap.context(() => {

            // ── 1. TITLE — word-by-word scrub ──────────────────────────────
            const titleWords = titleRef.current!.querySelectorAll<HTMLElement>(".word-inner");

            gsap.set(titleWords, { y: "110%", opacity: 0 });

            const titleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 85%",
                    end: "top 45%",
                    scrub: 1,
                },
            });

            titleTl.to(titleWords, {
                y: "0%",
                opacity: 1,
                stagger: 0.04,
                ease: "none",
            });

            // ── 2. PARAGRAPH — word-by-word scrub (offset) ─────────────────
            const paraWords = paraRef.current!.querySelectorAll<HTMLElement>(".word-inner");

            gsap.set(paraWords, { y: "100%", opacity: 0 });

            const paraTl = gsap.timeline({
                scrollTrigger: {
                    trigger: paraRef.current,
                    start: "top 88%",
                    end: "top 50%",
                    scrub: 1,
                },
            });

            paraTl.to(paraWords, {
                y: "0%",
                opacity: 1,
                stagger: 0.03,
                ease: "none",
            });

            // ── 3. CARDS — staggered fly-up + fade, pinned scrub ───────────
            const cards = cardsRef.current!.querySelectorAll<HTMLElement>(".review-card");

            gsap.set(cards, { y: 80, opacity: 0, scale: 0.92 });

            const cardTl = gsap.timeline({
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 1.2,
                },
            });

            cardTl.to(cards, {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.15,
                ease: "none",
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [data]);

    // ── Loading skeleton ───────────────────────────────────────────────────────
    if (loading) {
        return (
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-4 justify-center">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-200 rounded-3xl w-80 h-96 animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error || !data) return null;

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <section
            ref={sectionRef}
            className="py-24 px-4 bg-gradient-to-b from-amber-50/70 to-white overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center justify-between md:flex-row md:justify-between">
                    <div className="max-w-4xl">

                        {/* ── Animated title ── */}
                        <h2
                            ref={titleRef}
                            className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-heading leading-tight"
                            aria-label="Travelers Who Got Wild"
                        >
                            {splitIntoWordSpans("Travelers Who Got Wild")}
                        </h2>

                        {/* ── Animated paragraph ── */}
                        <p
                            ref={paraRef}
                            className="text-gray-600 text-xl leading-relaxed max-w-lg tracking-tight py-2"
                            aria-label="Great safaris create memories, and memories get shared. Here's what travelers experienced after their adventures turned into unforgettable journeys."
                        >
                            {splitIntoWordSpans(
                                "Great safaris create memories, and memories get shared. Here's what travelers experienced after their adventures turned into unforgettable journeys."
                            )}
                        </p>
                    </div>

                    {/* Google Reviews Badge */}
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md border border-gray-200">
                            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <div className="text-left">
                                <div className="flex items-center gap-1">
                                    <StarRating rating={5} />
                                </div>
                                <p className="text-xs text-gray-600 font-medium mt-1">
                                    {data.rating} • {data.totalReviews} Google reviews
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Animated cards ── */}
                <div
                    ref={cardsRef}
                    className="flex justify-center items-center min-h-[500px] relative px-4"
                >
                    <div className="flex">
                        {data.reviews.slice(0, 4).map((review, i) => (
                            <div
                                key={i}
                                className="review-card w-[280px] md:w-[320px] flex-shrink-0"
                                style={{ marginLeft: i > 0 ? "-30px" : "0" }}
                            >
                                <ReviewCard review={review} index={i} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}