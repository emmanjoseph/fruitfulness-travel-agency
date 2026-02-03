import React from 'react'
import { Props } from '../kenya-safaris/page';
import { getAllTrips } from '@/lib/api';
import TripsGrid from '@/components/trips-grid';
import SemiFooter from '@/components/SemiFooter';
import FAQ from '@/components/sections/FAQ';

const Tanzania = async ({ searchParams }: Props) => {
   const params = await searchParams;
  
       const page = Number(params.page) || 1;
       const trips = await getAllTrips({
          page,
          limit:8,
          country:"tanzania"
       });
  return (
    <section className='max-w-[1440px] mx-auto px-6 py-10 font-sans'>
         <div className="pt-32 pb-24">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl lg:text-7xl font-extrabold text-gray-700
          ">Tanzania Safaris</h1>

          <p className="text-gray-600 text-center max-w-xl font-medium text-base">
  Tanzania is home to some of Africa’s most iconic landscapes, from the endless plains of the Serengeti to the majestic Mount Kilimanjaro and the wildlife-rich Ngorongoro Crater. Its safaris offer unforgettable encounters with abundant wildlife, vibrant cultures, and breathtaking natural beauty.
</p>

         
        </div>

      </div>
      <h1 className="text-2xl font-medium">Explore Tanzanian Destinations</h1>
                    <TripsGrid trips={trips.data} />
                    <FAQ/>
                    <SemiFooter/>
    </section>
  )
}

export default Tanzania