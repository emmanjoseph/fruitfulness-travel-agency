import { fetchJourneys, getAllTrips } from '@/lib/api';
import { CalendarFold, MapIcon, MapPinIcon, MapPinXInside, PlaneTakeoff, StarIcon, VolleyballIcon } from 'lucide-react';
import gsap from 'gsap';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'react-day-picker';
import { Card, CardHeader, CardAction, CardTitle, CardDescription, CardFooter } from '../ui/card';


export type Destination = {
  id: string;
  country:string
  name: string
  imgUrl: string
  location: string
  numberOfDays:string
  description: string
  tags:string []
  rating: number
  href?: string 
}

const Destinations = async () => {
  const trips:Destination[] = await fetchJourneys();
  
     return (
    <div className='mx-auto max-w-[1400px] py-10 px-4 space-y-4'>
       <div className='flex flex-col items-center justify-center'>
        <h2 className="max-w-7xl pl-4 mx-auto text-3xl md:text-5xl font-bold text-neutral-700 text-center font-sans">
        Latest Destinations
      </h2>
         <p className="text-neutral-600  text-base md:text-xl text-center py-4 font-sans max-w-3xl mx-auto">
           Step into the wild heart of Africa. East Africa offers diverse safari experiences, blending majestic wildlife, stunning scenery, and authentic cultural encounters — all in one unforgettable journey.
         </p>
       </div>
       


         
           <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-2'>
  {trips.map((trip: Destination) => (
    <Link key={trip.name} href={`/details/${trip.id}`}>
      <div className="relative mx-auto w-full h-96 max-w-sm pt-0 rounded-[40px] hover:shadow-lg transition-shadow">
        <Image
          src={trip.imgUrl}
          alt={trip.name}
          className="relative z-20 aspect-video w-full h-full object-cover brightness-65 dark:brightness-40 rounded-[40px]"
          width={1000}
          height={1000}
        />
        
        <div className="absolute top-0 right-0 bg-neutral-950/40 rounded-[40px] p-6 z-30 w-full h-full flex flex-col justify-between text-gray-100">
          <div className="flex items-center justify-between">
            <Badge className='text-sm font-semibold bg-white text-gray-900'>
              <p>{trip.country}</p>
            </Badge>
          </div>

          <div className='space-y-0.5'>
            <h1 className="font-bold text-lg truncate">{trip.name}</h1>
            <div className="flex items-center justify-between">
            <p className='text-sm font-semibold truncate'>{trip.location}</p>

            <p className="font-bold flex items-center gap-x-1.5">
              <StarIcon className='text-amber-500 fill-amber-500' size={15}/>
              <span className='text-base'>{trip.rating}/5</span>

            </p>
            </div>
          </div>
        </div>
   
      </div>
    </Link>
  ))}
</div>
        </div> 
  )
}

export default Destinations
