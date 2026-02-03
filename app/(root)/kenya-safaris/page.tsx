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
     <section className='py-10 font-sans'>
         <div className="pt-32 pb-24">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl lg:text-7xl font-extrabold text-gray-700
          ">Kenyan Safaris</h1>
          <p className="text-gray-600 text-center max-w-xl font-medium text-base">Kenya is the birthplace of the classic African safari. From vast savannahs to dramatic escarpments and wildlife-rich wetlands, Kenyan safaris offer unmatched encounters with nature, culture, and adventure.</p>
        </div>

      </div>

      <div className="max-w-[1440px] mx-auto px-4">
         <h1 className="text-2xl font-medium">Explore Kenyan Destinations</h1>
            <TripsGrid trips={trips.data} />
      </div>
    
            <FAQ/>
            <SemiFooter/>
            
    </section>
  )
}

export default KenyanSafaris