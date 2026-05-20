"use client"

import Lottie from "lottie-react"
import journeyLoader from "@/components/animations/journey-loader.json"

export default function JourneyLoading() {
    return (
        <main className="min-h-[70vh] bg-white px-4 py-20 font-heading">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">
                <div
                    className="h-56 w-56"
                    role="img"
                    aria-label="Loading journey information"
                >
                    <Lottie animationData={journeyLoader} loop autoplay />
                </div>

                <p className="text-[11px] font-bold uppercase tracking-[3px] text-emerald-700">
                    Journey information
                </p>

                <h1 className="mt-2 text-2xl font-extrabold text-gray-800">
                    Loading your safari details
                </h1>

                <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-gray-500">
                    Preparing the itinerary, highlights, photos, and related journeys.
                </p>
            </div>
        </main>
    )
}
