"use client"
import { getAllTrips } from '@/lib/api';
import { ArrowUpRight, Calendar, CalendarFold, MapIcon, MapPinIcon, MapPinXInside, StarIcon, VolleyballIcon } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import Image from 'next/image';

 
interface AnimationProps {
  [key: string]: string | number | boolean;
}

interface ScrollProps {
  [key: string]: string | number;
}

export const animateWithGsap = (
  target: string | HTMLElement,
  animationProps: AnimationProps,
  scrollProps: ScrollProps
): void => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    }
  })
}

export type Destination = {
  id: string;
  country:string
  name: string
  imgUrl: string
  location: string
  numberOfDays:string
  description: string
  activities: string[]
  tags:string []
  rating: number
  href?: string 
}

const shortenText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Destinations = () => {
  const currentPage = 1
  const [trips, setTrips] = useState<Destination[]>([])
    

   useEffect(() => {
    const fetchTrips = async () => {
     
      try {
        const data = await getAllTrips({
          page:currentPage,
          limit:8
        })
        setTrips(data.data || [])
      } catch (error) {
        console.error("Error fetching trips:", error)
      }
    }
    fetchTrips()
  }, [currentPage]);

  console.log(trips);

  useGSAP(()=> {
     animateWithGsap('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, {})
  },[]);
  
     return (
    <div className='mx-auto max-w-[1400px] px-4 space-y-4'>
       <div className='flex flex-col items-center justify-center'>
        <h1 className='text-xl md:text-3xl text-gray-600 text-center font-semibold'>Discover the best adventures <br /> for every kind of traveler</h1>
         <p className="text-base text-center font-medium text-gray-700 max-w-2xl py-4">
           Step into the wild heart of Africa. East Africa offers diverse safari experiences, blending majestic wildlife, stunning scenery, and authentic cultural encounters — all in one unforgettable journey.
         </p>
       </div>
       


         
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5'>
            {trips.map((trip)=> (
              <Link key={trip.name}  href={`/details/${trip.id}`}>
                 <div className="max-w-sm rounded-[35px] overflow-hidden bg-white shadow-lg">

  <div className="relative h-72">
    <Image
      src={trip.imgUrl}
      alt={trip.name}
      width={400}
      height={400}
      className="h-full w-full object-cover"
    />
    <span
      className="absolute top-4 left-4 rounded-full bg-white px-4 py-1 text-sm font-semibold text-emerald-500 shadow"
    >
      Top Rated
    </span>

    <div
      className="absolute -bottom-5 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow"
    >
      <span className="text-yellow-400"><StarIcon size={17} className='fill-yellow-500'/></span>
      <span className="font-semibold text-sm">{trip.rating}/5</span>
      <span className="text-sm text-gray-500">(672 reviews)</span>
    </div>
  </div>

 
  <div className="p-6">
    <h3 className="text-lg font-bold text-gray-900">
      {shortenText(trip.name,25)}
    </h3>


    <div className="flex flex-col gap-2 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <MapPinXInside className='fill-gray-500' size={15}/>
        <span className='font-semibold'>{trip.location}</span>
      </div>

      <div className="flex items-center gap-4">
         <div className="flex items-center gap-2">
        <CalendarFold size={17}/>
        <span className='font-semibold'>{trip.numberOfDays} days</span>
      </div>

         <div className="flex items-center gap-2">
        <VolleyballIcon size={17}/>
        <span className='font-semibold'>{trip.numberOfDays.length || 0} activities</span>
      </div>
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

// patience musembi
// jonathan kitaka 
// rechael matheka 
// deborah

