import FiltersBar from "@/components/FiltersBar";
import Pagination from "@/components/Pagination";
import FAQ from "@/components/sections/FAQ";
import SemiFooter from "@/components/SemiFooter";
import TripsGrid from "@/components/trips-grid";
import { getAllTrips } from "@/lib/api";

type Props = {
  searchParams: Promise<{
    page?: string;
    tags?: string;
    country?: string;
    q?: string;
  }>;
};

export default async function ServicesPage({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page) || 1;

  const trips = await getAllTrips({
    page,
    limit: 8,
    tags: params.tags,
    country: params.country,
    search: params.q,
  });
  
  return (
    <main className="font-sans">
      <div  className="h-100 lg:h-140 relative bg-[url('https://images.unsplash.com/photo-1675156682569-1b91ed586a5a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHphbnppYmFyJTIwaXNsYW5kfGVufDB8fDB8fHww')] bg-fixed bg-cover bg-center text-gray-200 overflow-hidden">
  <div className="absolute inset-0  bg-linear-to-t from-white via-black/70 to-black/80" />

        <div className="relative h-full z-10 flex flex-col items-center space-y-2 text-white pt-40">
          <h1 className="text-4xl lg:text-7xl text-center font-bold font-heading
          ">Your Perfect Getaway</h1>
          <p className="text-gray-100 text-center max-w-xl font-medium text-base md:text-xl p-4">Whether you crave sandy beaches, majestic mountains, bustling cities, or serene forests, we bring you the best destinations from around the globe. Start your journey here and discover your dream getaway.</p>
        </div>

      </div>

      <section className="max-w-350 mx-auto px-6 py-10">
         <FiltersBar />

      <TripsGrid trips={trips.data} />

      <Pagination
        currentPage={page}
        totalPages={trips.meta.totalPages}
        basePath="/services"
      />

      <FAQ/>

      <SemiFooter/>
      </section>
     
    </main>
  );
}
