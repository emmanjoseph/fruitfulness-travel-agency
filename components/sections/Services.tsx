import React from 'react'
import AnimatedTitle from '../AnimatedTitle'
import { destinations } from '@/constants'
import Image from 'next/image'
import { MapPin, StarIcon } from 'lucide-react'
import Link from 'next/link'

const Services = () => {
  
    
  return (
    <section className='max-w-[1400px] mx-auto px-6 py-28 flex flex-col items-center'>
        <AnimatedTitle
             title='Visit  Popular destinations'
             className='text-gray-800 max-w-lg mx-auto'
        />

        <p className='mt-4 text-lg font-medium text-center text-gray-700 max-w-lg'>
          Explore our most popular travel destinations and start planning your next adventure today!
        </p>
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
             {destinations.map((destination)=>(
               <Link href={`/details/${destination.id}`} key={destination.id}>
                <div className="tour-card rounded-[35px] cursor-pointer">
                                 <Image
                    src={destination.imageUrl}
                    alt={destination.name}
                    width={300}
                    height={200}
                    className='w-full h-72 object-cover'
                 />

                 <div className='p-4'>
                   <h3 className='text-lg font-semibold text-gray-700'>
                        {destination.name}
                    </h3>
                   <div className="flex items-center justify-between">
                     <p className='flex items-center gap-1.5'>
                       <MapPin size={13} className='text-green-500'/>
                       <span className='text-sm font-semibold text-gray-500'>
                         {destination.location}
                       </span>
                     </p>

                     <p className='flex items-center gap-1.5 text-sm font-bold text-gray-500'>
                       <StarIcon size={13} className='text-yellow-500'/>
                       <span>{destination.rating}</span>
                     </p>
                   </div>
                 </div>

                </div>
  
               </Link>
             ))}
        </div>
    </section>
  )
}

export default Services