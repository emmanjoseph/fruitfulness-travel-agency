import FAQ from '@/components/sections/FAQ';
import SemiFooter from '@/components/SemiFooter';
import TripsGrid from '@/components/trips-grid';
import { getAllTrips } from '@/lib/api';


export type Props = {
  searchParams: Promise<{
    page?: string;
    country?: string;
  }>;
};

const KenyanSafaris = async ({ searchParams }: Props) => {
      const params = await searchParams;

     const page = Number(params.page) || 1;
     const trips = await getAllTrips({
        page,
        limit:8,
        country:"kenya"
     });

     
  return (
     <section className='font-sans'>
       <div  className="h-100 lg:h-130 relative bg-[url('https://images.unsplash.com/photo-1658926342182-512ff6dcc08e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGtlbnlhJTIwc2FmYXJpfGVufDB8fDB8fHww')] bg-fixed bg-cover bg-center text-gray-200 overflow-hidden">
  <div className="absolute inset-0  bg-linear-to-t from-white via-black/70 to-black/80" />

        <div className="relative h-full z-10 flex flex-col items-center space-y-2 text-white pt-40">
          <h1 className="text-4xl lg:text-7xl text-center font-bold font-heading
          ">Kenyan Safaris</h1>
          <p className="text-gray-100 text-center max-w-xl font-medium text-base">Kenya is the birthplace of the classic African safari. From vast savannahs to dramatic escarpments and wildlife-rich wetlands, Kenyan safaris offer unmatched encounters with nature, culture, and adventure.</p>
        </div>

      </div>

      <div className="max-w-350 mx-auto px-4">
         <h1 className="text-2xl font-semibold mt-10">Explore Kenyan Destinations</h1>
            <TripsGrid trips={trips.data} />
      </div>
    
            <FAQ/>
            <SemiFooter/>
            
    </section>
  )
}

export default KenyanSafaris