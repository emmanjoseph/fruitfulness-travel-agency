import React from 'react'
import AnimatedTitle from '../AnimatedTitle'
import {  mostPopularDestinations } from '@/constants'

import { Calendar1Icon, Clock10, MapPin, Plane, StarIcon } from 'lucide-react'
import Link from 'next/link'

const Services = () => {

    
  return (
    <section className='max-w-[1400px] mx-auto px-4 py-14 flex flex-col items-center'>
        <h1 className='text-3xl font-heading text-gray-600'>Other popular destinations</h1>

        <p className='mt-4 text-lg font-medium text-center text-gray-700 max-w-lg'>
          Explore our most popular travel destinations and start planning your next adventure today!
        </p>

        <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {
            mostPopularDestinations.slice(0,4).map((destination)=>{
              const {name,imageUrl,numberOfDays,location,bestTimeToVisit,description,id} = destination;
              return (
                 <div key={id} className='w-full flex flex-col md:flex-row gap-3 items-center shadow shadow-gray-300 p-2 rounded-[35px] tour-card'>
                   <div 
                   style={{
                     background:`url(${imageUrl})`,
                     backgroundPosition:"center",
                     backgroundSize:"cover"
                   }}
                   className="w-full md:w-1/2 h-40 md:h-72 rounded-[35px]" />

                   <div className='flex flex-col gap-2.5'>

                    <p className='flex flex-row gap-1.5 items-center font-bold text-amber-500'><Calendar1Icon size={17}/> <span>{numberOfDays} days</span></p>
                    <p className='flex flex-row gap-1.5 items-center font-bold text-gray-500 text-sm'><MapPin size={17}/> <span>{location}</span></p>
                      <h1 className='font-heading text-gray-700 text-xl'>{name}</h1>
                      <p className='max-w-sm text-base text-gray-600'>
                        {description.split(' ').slice(0, 18).join(' ')}...
                      </p>
                      <div className="text-base text-gray-600">
                        <p className='flex flex-row items-center font-semibold gap-1.5'><Clock10 size={16} className='text-amber-500 '/> best time to visit</p>
                        
                        {bestTimeToVisit}
                        </div>
                         
                         <Link href={`/details/${id}`}>
                            <button className='bg-emerald-600 text-white font-semibold rounded-3xl py-3 w-full md:w-2/3 flex flex-row items-center justify-center cursor-pointer gap-1.5'>
                          <span>View details</span>
                          <Plane size={16}/>
                        </button>
                         </Link>
                       
                   </div>
                 </div>
              )
            })
          }
        </div>
    </section>
  )
}

export default Services