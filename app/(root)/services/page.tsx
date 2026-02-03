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
    <main className="max-w-[1440px] mx-auto px-6 py-10 font-sans">
      <div className="pt-36 pb-24">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl lg:text-7xl font-extrabold text-gray-700
          ">Your Perfect Getaway</h1>
          <p className="text-gray-600 text-center max-w-xl font-medium text-base">Whether you crave sandy beaches, majestic mountains, bustling cities, or serene forests, we bring you the best destinations from around the globe. Start your journey here and discover your dream getaway.</p>
        </div>

      </div>
  
      <FiltersBar />

      <TripsGrid trips={trips.data} />

      <Pagination
        currentPage={page}
        totalPages={trips.meta.totalPages}
        basePath="/services"
      />

      <FAQ/>

      <SemiFooter/>
    </main>
  );
}
