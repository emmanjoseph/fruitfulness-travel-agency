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
    <section className='font-sans'>

       <div  className="h-100 lg:h-140 relative bg-[url('https://images.unsplash.com/photo-1631646109206-4b5616964f84?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lsaW1hbmphcm98ZW58MHx8MHx8fDA%3D')] bg-fixed bg-cover bg-center text-gray-200 overflow-hidden">
  <div className="absolute inset-0  bg-linear-to-t from-white via-black/70 to-black/80" />

        <div className="relative h-full z-10 flex flex-col items-center space-y-2 text-white pt-40">
          <h1 className="text-4xl lg:text-7xl text-center font-bold font-heading
          ">Tanzania Safaris</h1>
          <p className="text-gray-100 text-center max-w-xl font-medium text-base"> Tanzania is home to some of Africa’s most iconic landscapes, from the endless plains of the Serengeti to the majestic Mount Kilimanjaro and the wildlife-rich Ngorongoro Crater. Its safaris offer unforgettable encounters with abundant wildlife, vibrant cultures, and breathtaking natural beauty.</p>
        </div>

      </div>

     <div className="max-w-350 mx-auto px-4">
              <h1 className="text-2xl mt-10 font-semibold">Explore Tanzania Destinations</h1>
                 <TripsGrid trips={trips.data} />
           </div>
                    <FAQ/>
                    <SemiFooter/>
    </section>
  )
}

export default Tanzania