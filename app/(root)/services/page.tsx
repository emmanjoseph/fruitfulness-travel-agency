import { Suspense } from "react";
import FiltersBar from "@/components/FiltersBar";
import Pagination from "@/components/Pagination";
import FAQ from "@/components/sections/FAQ";
import SemiFooter from "@/components/SemiFooter";
import { getAllTrips } from "@/lib/api";
import {TripsGridSkeleton} from "@/components/journey-skeleton";
import {TripsList} from "@/components/journey-list";
import {ScatterHero} from "@/components/sections/services-hero";
import CustomizeCta from "@/components/sections/customize";
import PhotoStrip from "@/components/sections/photo-strip";

const slides = [
    {
        src: "https://images.unsplash.com/photo-1577315734214-4b3dec92d9ad?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHphbnppYmFyfGVufDB8fDB8fHww",
        alt: "Masai Mara",
    },
    {
        src: "https://images.unsplash.com/photo-1577315734214-4b3dec92d9ad?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHphbnppYmFyfGVufDB8fDB8fHww",
        alt: "Masai Mara",
    },    {
        src: "https://images.unsplash.com/photo-1524414621493-7dec026782c3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGtlbnlhfGVufDB8fDB8fHww",
        alt: "Amboseli",
    },
    {
        src: "https://images.unsplash.com/photo-1558907530-fe311178388a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGtlbnlhfGVufDB8fDB8fHww",
        alt: "Samburu",
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1661863287056-5c1d73ad5dec?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGtlbnlhfGVufDB8fDB8fHww",
        alt: "Tsavo",
    },
    {
        src: "https://images.unsplash.com/photo-1613457231357-a5db3bc5bd81?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fGtlbnlhfGVufDB8fDB8fHww",
        alt: "Nairobi",
    },
    {
        src: "https://images.unsplash.com/photo-1535940587896-3a4e0ce292f4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fGtlbnlhfGVufDB8fDB8fHww",
        alt: "safari1",
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1733259771911-f76d15695baf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9tYmFzYXxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Mombasa",
    },
    {
        src: "https://images.unsplash.com/photo-1624813825929-d7b9ca29c51b?w=600&auto=format&fit=crop&q=70",
        alt: "Tsavo",
    },
    // ... rest of your photos
];

type Props = {
    searchParams: Promise<{
        page?: string;
        tags?: string;
        country?: string;
        q?: string;
        category?: string;
        month?: string;
    }>;
};

export default async function ServicesPage({ searchParams }: Props) {
    const params = await searchParams;
    const page = Number(params.page) || 1;

    // Fetch trips metadata for pagination (this is fast)
    const tripsMetadata = await getAllTrips({
        page,
        limit: 8,
        tags: params.category || params.tags,
        country: params.country,
        search: params.q,
    });

    // Create a unique key for Suspense boundary
    const suspenseKey = JSON.stringify({
        page,
        tags: params.tags,
        category: params.category,
        country: params.country,
        search: params.q,
        month: params.month,
    });

    return (
        <main className="font-sans">
            <ScatterHero
                backgroundImage={'https://plus.unsplash.com/premium_photo-1697729918007-3ff509bb2468?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGFmcmljYXxlbnwwfHwwfHx8MA%3D%3D'}
                heading={'Explore Africa'}
                headingText={'discover'}
                paragraph={'Africa is vast, vibrant, and full of contrast. From golden savannas and ancient deserts to lively cities, rainforest trails, and turquoise coastlines, every journey reveals something different. It is a place of deep culture, warm hospitality, unforgettable wildlife, and stories that stay with you long after you leave.'}
            />

            <PhotoStrip slides={slides} options={{ dragFree: true, loop: true }}/>

            {/* ── MAIN CONTENT ── */}
            <section className="container mx-auto px-4 pt-20 rounded-t-3xl">
                <div className="w-full space-y-8">
                    <FiltersBar />

                        <Suspense key={suspenseKey} fallback={<TripsGridSkeleton />}>
                            <TripsList
                                page={page}
                                tags={params.tags}
                                category={params.category}
                                country={params.country}
                                search={params.q}
                                month={params.month}
                            />
                        </Suspense>
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={page}
                    totalPages={tripsMetadata.meta.totalPages}
                    basePath="/services"
                />

                <FAQ />
            </section>

            <CustomizeCta/>
            <SemiFooter />

        </main>
    );
}
