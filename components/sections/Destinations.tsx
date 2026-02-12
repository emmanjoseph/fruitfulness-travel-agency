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

const shortenText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Destinations = async () => {
  const trips:Destination[] = await fetchJourneys();
  
     return (
    <div className='mx-auto max-w-[1400px] px-4 space-y-4'>
       <div className='flex flex-col items-center justify-center'>
        <h1 className='text-xl md:text-3xl text-gray-600 text-center font-semibold'>Discover the best adventures <br /> for every kind of traveler</h1>
         <p className="text-base text-center font-medium text-gray-700 max-w-2xl py-4">
           Step into the wild heart of Africa. East Africa offers diverse safari experiences, blending majestic wildlife, stunning scenery, and authentic cultural encounters — all in one unforgettable journey.
         </p>
       </div>
       


         
           <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5'>
  {trips.map((trip: Destination) => (
    <Link key={trip.name} href={`/details/${trip.id}`}>
      <Card className="relative mx-auto w-full max-w-sm pt-0 rounded-[30px] hover:shadow-lg transition-shadow">
        <Image
          src={trip.imgUrl}
          alt={trip.name}
          className="relative z-20 aspect-video w-full lg:h-64 object-cover brightness-90 dark:brightness-40 rounded-t-[30px]"
          width={400}
          height={700}
        />
        
       <CardHeader className="">
  {/* Country Badge */}
  <Badge className="w-fit capitalize bg-emerald-600 text-white font-semibold">
    {trip.country}
  </Badge>
  
  <CardTitle className="line-clamp-2">{trip.name}</CardTitle>
  
  {/* Location & Info Grid */}
  <div className="">
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-semibold">
      <MapPinIcon size={14} />
      <span className="truncate">{trip.location}</span>
    </div>
    
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-semibold">
        <CalendarFold size={14} />
        <span>{trip.numberOfDays} days</span>
      </div>
      
      <div className="flex items-center gap-1">
        <StarIcon size={14} className="fill-yellow-500 text-yellow-500" />
        <span className="font-semibold text-sm">{trip.rating}/5</span>
      </div>
    </div>
  </div>
</CardHeader>
        
        <CardFooter>
          <button className='flex items-center justify-center gap-x-1.5 bg-neutral-700 w-full text-white font-semibold py-3 rounded-3xl cursor-pointer hover:bg-neutral-800 transition-colors'>
            Explore destination
            <PlaneTakeoff size={15}/>
          </button>
        </CardFooter>
      </Card>
    </Link>
  ))}
</div>
        </div> 
  )
}

export default Destinations
