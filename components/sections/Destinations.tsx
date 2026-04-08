import { fetchJourneys, getAllTrips } from '@/lib/api';
import { CalendarFold, MapIcon, MapPinIcon, MapPinXInside, PlaneTakeoff, StarIcon, VolleyballIcon } from 'lucide-react';
import gsap from 'gsap';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import Image from 'next/image';

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
    <div className='mx-auto max-w-350 py-10 px-4 space-y-4'>
       <div className='flex flex-col items-center justify-center'>
        <h2 className="max-w-7xl pl-4 mx-auto text-3xl md:text-5xl font-bold text-neutral-700 text-center font-sans">
        Latest Destinations
      </h2>
         <p className="text-neutral-600  text-base md:text-xl text-center py-4 font-sans max-w-3xl mx-auto">
           Step into the wild heart of Africa. East Africa offers diverse safari experiences, blending majestic wildlife, stunning scenery, and authentic cultural encounters — all in one unforgettable journey.
         </p>
       </div>
       


         
           <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
  {trips.slice(0,8).map((trip: Destination) => (
    <Link key={trip.name} href={`/details/${trip.id}`}>
        <div className="w-full card font-heading">
            <div className="card-pattern-grid"></div>
            <Image
                src={trip.imgUrl}
                alt={trip.name}
                className="relative z-20 aspect-video w-full h-full md:h-50 object-cover"
                width={1000}
                height={1000}
            />

            <div className={'p-4 bg-white space-y-1'}>
                <div className="flex items-center justify-between">
                    <Badge className={'py-1.5 capitalize bg-emerald-600'}>
                        <p className={'text-white font-semibold'}>{trip.country}</p>
                    </Badge>


                </div>

                <h1 className="truncate font-semibold  text-gray-700">
                    {trip.name}
                </h1>

                <p className="text-gray-600 truncate font-heading font-semibold text-sm flex items-center gap-x-1.5">
                    <MapIcon size={15} className={'text-gray-700 fill-gray-700'}/>
                    {trip.location}
                </p>


                <div className="card-actions">

                    <p className="font-bold font-heading flex items-center gap-x-1.5 text-gray-700">
                        <StarIcon className={'text-amber-300 fill-amber-300'}/>
                        {trip.rating}/5
                    </p>

                    <button className={'card-button bg-emerald-500'}>
                        <p className="font-semibold capitalize">
                            Explore destination
                        </p>
                    </button>
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
