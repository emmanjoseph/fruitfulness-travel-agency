import { fetchJourneys } from "@/lib/api";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "@/components/Carousel";

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

const Destinations = async () => {
    const trips: Destination[] = await fetchJourneys();

    const OPTIONS: EmblaOptionsType = {
        dragFree: true,
        loop: true,
        align: "start",
    };

    // Transform trips to carousel slides format
    const slides = trips.map(trip => ({
        id: trip.id,
        name: trip.name,
        imgUrl: trip.imgUrl,
        rating: trip.rating,
        numberOfDays: trip.numberOfDays,
    }));

    return (
        <section className="mx-auto container px-4 py-14 space-y-8">
            {/* Header */}
            <div className="max-w-6xl mx-auto space-y-4">
                <h2 className="text-xl md:text-3xl font-heading font-extrabold text-neutral-700">
                    Latest Destinations
                </h2>

                <p className="text-neutral-600 text-base leading-8 max-w-lg">
                    Step into the wild heart of Africa. East Africa offers diverse safari
                    experiences, blending majestic wildlife, stunning scenery, and
                    authentic cultural encounters — all in one unforgettable journey.
                </p>
            </div>

            {slides.length > 0 ? (
                <EmblaCarousel slides={slides} options={OPTIONS} />
            ) : (
                <p className="text-center text-gray-500 py-12">No destinations available</p>
            )}
        </section>
    );
};

export default Destinations;