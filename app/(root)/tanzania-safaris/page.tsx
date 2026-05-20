import FAQ from '@/components/sections/FAQ';
import SemiFooter from '@/components/SemiFooter';
import TripsGrid from '@/components/trips-grid';
import { getAllTrips } from '@/lib/api';
import FiltersBar from "@/components/FiltersBar";
import {ScatterHero} from "@/components/sections/services-hero";
import CustomizeCta from "@/components/sections/customize";
import PhotoStrip from "@/components/sections/photo-strip";

export type Props = {
    searchParams: Promise<{
        page?: string;
        tags?: string;
        category?: string;
    }>;
};

const slides = [
    {
        src: "https://images.unsplash.com/photo-1602410141957-ee70b4739066?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHRhbnphbmlhJTIwc2FmYXJpfGVufDB8fDB8fHww",
        alt: "Tanzania safari",
    },
    {
        src: "https://images.unsplash.com/photo-1695787841479-614715857c28?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Tanzania wildlife",
    },
    {
        src: "https://images.unsplash.com/photo-1631646109248-a7264aae1790?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Tanzania landscape",
    },
    {
        src: "https://images.unsplash.com/photo-1575999502951-4ab25b5ca889?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8emFuemliYXJ8ZW58MHx8MHx8fDA%3D",
        alt: "Zanzibar beach",
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1664302985536-fda5dea69bff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8emFuemliYXJ8ZW58MHx8MHx8fDA%3D",
        alt: "Zanzibar shoreline",
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1697729715179-f9646b839c5b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8emFuemliYXIlMjBzdG9uZSUyMHRvd258ZW58MHx8MHx8fDA%3D",
        alt: "Stone Town Zanzibar",
    },
    {
        src: "https://images.unsplash.com/photo-1664270716975-33992d17fdb3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFuemFuaWElMjBzYWZhcml8ZW58MHx8MHx8fDA%3D",
        alt: "Tanzania safari plains",
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1733259771911-f76d15695baf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9tYmFzYXxlbnwwfHwwfHx8MA%3D%3D",
        alt: "East African coast",
    },
    {
        src: "https://images.unsplash.com/photo-1700221824708-012001e5ccb8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRhbnphbmlhJTIwc2FmYXJpfGVufDB8fDB8fHww",
        alt: "Tanzania wildlife drive",
    },
];

const TanzaniaSafaris = async ({ searchParams }: Props) => {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const trips = await getAllTrips({
        page,
        limit: 8,
        tags: params.category || params.tags,
        country: "tanzania",
    });

    return (
        <section className="font-sans bg-black text-[#f0ece0]">
            <ScatterHero
                backgroundImage={'https://images.unsplash.com/photo-1518729571365-9a891a9df2bd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHRhbnphbmlhfGVufDB8fDB8fHww'}
                heading={'Discover Tanzania'}
                headingText={'discover'}
                paragraph={'Tanzania is a breathtaking destination of wild beauty and timeless adventure, home to the Serengeti, Mount Kilimanjaro, Zanzibar’s turquoise shores, and some of Africa’s most iconic wildlife experiences. Its landscapes, cultures, and warm hospitality make every journey feel rich, natural, and unforgettable.'}
            />
            <PhotoStrip slides={slides} options={{ dragFree: true, loop: true }}/>




            <div className={'container mx-auto px-4 pt-7 pb-20'}>
                {/* Section intro */}
                <p className="text-[11px] tracking-[3px] uppercase text-[#d4a843] font-semibold mb-2">
                    About Tanzania
                </p>
                <h2 className="font-heading text-2xl lg:text-4xl  font-medium leading-tight mb-2">
                    Why visit Tanzania?
                </h2>
                <div className="w-10 h-px bg-linear-to-r from-[#d4a843] to-transparent mb-4" />
                <p className=" max-w-4xl leading-relaxed lg:text-lg mb-4">
                    Visit Tanzania for its unmatched mix of iconic wildlife, epic landscapes, and island beauty. From the endless Serengeti plains and the Great Migration to Mount Kilimanjaro, the Ngorongoro Crater, and Zanzibar’s turquoise beaches, Tanzania offers adventure, culture, relaxation, and once-in-a-lifetime safari experiences in one unforgettable destination.
                </p>

                <div className="w-10 h-px bg-linear-to-r from-[#d4a843] to-transparent mb-4" />
            </div>



            {/* ── BODY: description + trips + aside ── */}
            <div className="bg-white text-gray-800 rounded-t-3xl -mt-4 relative z-10">
                <div className="container mx-auto px-4 lg:px-10 pt-12">

                    <div className="space-y-2">
                        <FiltersBar
                            title="Popular Tanzania Safaris"
                            description="Handpicked journeys that bring you closer to Tanzania's untamed beauty."
                            basePath="/tanzania-safaris"
                            showCountryFilter={false}
                        />

                            <TripsGrid trips={trips.data} />
                        </div>

                </div>
                <FAQ />
                <CustomizeCta />
                <SemiFooter />
            </div>

        </section>
    );
};

export default TanzaniaSafaris;
