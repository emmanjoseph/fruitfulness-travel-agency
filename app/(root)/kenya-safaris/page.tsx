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
        src: "https://images.unsplash.com/photo-1585523658894-cc78fc2c8f67?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Masai Mara",
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1661846340419-89bf27138124?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGtlbnlhfGVufDB8fDB8fHww",
        alt: "Wildlife",
    },
    {
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
];

const KenyanSafaris = async ({ searchParams }: Props) => {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const trips = await getAllTrips({
        page,
        limit: 8,
        tags: params.category || params.tags,
        country: "kenya",
    });

    return (
        <section className="font-sans bg-[#0a0a08] text-[#f0ece0]">
            <ScatterHero
                backgroundImage={'https://images.unsplash.com/photo-1613457231357-a5db3bc5bd81?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fGtlbnlhfGVufDB8fDB8fHww'}
                heading={'Magical Kenya'}
                headingText={'discover'}
                paragraph={'                        Kenya is where the African safari was born. From the vast golden savannahs of the Masai Mara\n' +
                    '                        to dramatic Rift Valley escarpments and wildlife-rich wetlands — unmatched encounters with\n' +
                    '                        nature, culture, and adventure await.'}
            />

            <PhotoStrip slides={slides} options={{ dragFree: true, loop: true }}/>
 <div className="bg-black">
     <div className={'container mx-auto px-4 pt-4 pb-20 space-y-3'}>
         {/* Section intro */}
         <p className="text-[11px] tracking-[3px] uppercase text-[#d4a843] font-semibold">
             About Kenya
         </p>
         <h2 className="font-heading text-2xl lg:text-4xl  font-medium leading-tight">
             Why visit Kenya?
         </h2>
         <div className="w-10 h-px bg-linear-to-r from-[#d4a843] to-transparent" />
         <p className=" max-w-2xl leading-relaxed mb-4 text-base">
             Visit Kenya for the kind of journey that gives you everything in one place: world-famous safaris, the Great Migration, dramatic landscapes, rich culture, warm hospitality, and beautiful Indian Ocean beaches. From the Maasai Mara and Mount Kenya to Nairobi’s energy and Diani’s white sands, Kenya blends adventure, wildlife, relaxation, and authentic local experiences in a way few destinations can.
         </p>

         <div className="w-10 h-px bg-linear-to-r from-[#d4a843] to-transparent mb-4" />
     </div>
 </div>


            {/* ── BODY: description + trips + aside ── */}
            <div className="bg-white text-gray-800 rounded-t-3xl -mt-4 relative z-10">

                <div className="container mx-auto px-4 lg:px-10 pt-12">

                    <div className="space-y-2">
                        <FiltersBar
                            title="Popular Kenya Safaris"
                            description="Handpicked journeys that bring you closer to Kenya's wild places."
                            basePath="/kenya-safaris"
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

export default KenyanSafaris;
