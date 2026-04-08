"use client";

import { useEffect, useState } from "react";

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
                    className={`w-4 h-4 ${
                        star <= rating ? "text-amber-400" : "text-stone-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

function ReviewCard({ review }: { review: Review }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = review.text.length > 200;
    const displayText =
        isLong && !expanded ? review.text.slice(0, 200) + "…" : review.text;

    return (
        <div
            className="card p-6"
        >
            <div className="card-pattern-grid"></div>
            {/* Google G watermark */}
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                </svg>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-full bg-linear-to-t from-10% from-emerald-600 to-indigo-800 flex items-center justify-center">
                    <h1 className={'font-heading font-bold text-white uppercase tracking-light'}>
                        {review.author_name.slice(0,2)}
                    </h1>
                </div>
                <div>
                    <p className="font-semibold text-stone-800 text-sm leading-tight">
                        {review.author_name}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                        {review.relative_time_description}
                    </p>
                </div>
            </div>

            <StarRating rating={review.rating}/>

            {/* Review text */}
            <p className="mt-3 text-stone-600 text-sm leading-relaxed">
                {displayText}
                {isLong && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="ml-1 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                    >
                        {expanded ? "Show less" : "Read more"}
                    </button>
                )}
            </p>
        </div>
    );
}

export default function GoogleReviews() {
    const [data, setData] = useState<ReviewsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("/api/reviews")
            .then((r) => {
                if (!r.ok) throw new Error();
                return r.json();
            })
            .then(setData)
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-stone-100 rounded-2xl h-48 animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error || !data) return null;

    return (
        <section className="py-20 lg:py-28 px-4 bg-stone-50">
            <div className="max-w-350 mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="max-w-7xl pl-4 mx-auto text-3xl md:text-5xl font-bold text-neutral-700 text-center font-sans">
                        Results That Speak Volumes
                    </h2>
                    <p className="text-2xl text-gray-500 mt-2">
                        Read success stories
                    </p>
                    <p className="text-gray-500 mt-3">
                        Discover how travelers from around the world experience Africa with us.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Reviews grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {data.reviews.map((review, i) => (
                            <ReviewCard key={i} review={review} />
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
}
