import EmblaCarousel from '@/components/Carousel'
import SemiFooter from '@/components/SemiFooter'
import { Badge } from '@/components/ui/badge';
import { kenyanDestinations, mostPopularDestinations } from '@/constants'
import { Calendar, MapPin, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


export const tourFilters = [
  {
    id: "wildlife",
    label: "Wildlife Safari",
    color: "#059669", // emerald-600
  },
  {
    id: "beach",
    label: "Beach & Coast",
    color: "#0ea5e9", // sky-500
  },
  {
    id: "cultural",
    label: "Cultural Tours",
    color: "#f59e0b", // amber-500
  },
  {
    id: "adventure",
    label: "Adventure",
    color: "#dc2626", // red-600
  },
  {
    id: "mountain",
    label: "Mountain Trekking",
    color: "#7c3aed", // violet-600
  },
  {
    id: "nature",
    label: "Nature & Parks",
    color: "#16a34a", // green-600
  },
  {
    id: "luxury",
    label: "Luxury Experience",
    color: "#d97706", // amber-600
  },
  {
    id: "budget",
    label: "Budget Friendly",
    color: "#0891b2", // cyan-600
  },
];



const Services = () => {
  return (
    <section className='font-sans px-4 md:px-4 lg:px-0'>

      
       <div className="max-w-[1400px] mx-auto text-gray-700 font-medium space-y-10 pt-2">
        <div className='space-y-3 pt-16'>
          <div className="shadow-xl rounded-[40px] grid md:grid-cols-2 p-2">
            <div className='p-5 flex flex-col justify-center'>
           <h1 className='py-4 text-5xl font-heading text-gray-700 hero-text'>Explore the best destinations</h1>

           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum cum quis sint.</p>
        </div>
          <div className="relative w-full overflow-hidden min-h-[30vh] rounded-[40px]">
        
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1661972249683-790fcb064838?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FmYXJpJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center" />
        
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
        
           <div className="absolute inset-0 w-full h-full z-10 p-6 lg:p-10 text-white flex flex-col items-center justify-center">
                      
          </div>
        
        </div>

        
      </div>
          <h1 className='font-semibold text-xl mt-10'>Popular destinations and experiences</h1>
          <EmblaCarousel
            slides={mostPopularDestinations}
          />
        </div>


        <div className="space-y-2.5">
          <h1 className='font-semibold text-xl'>Handpicked trips</h1>
          <p className='text-gray-600'>Explore well-planned trips designed for different travel styles and interests</p>

          <div className="flex items-center gap-2 py-3 overflow-x-auto">
             { tourFilters.map(({id,label,color})=>(
              <button type="button" key={id} className='cursor-pointer'>
                 <Badge  style={{
                background:color,
                  }}>
                <p className="font-semibold text-white p-1.5">
                  {label}
                </p>
              </Badge>
              </button>
             
             )) }
          </div>

          <div className='mt-3 grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
            {
              kenyanDestinations.map((destination)=>{
                const {id,name,location,imageUrl,numberOfDays,rating} = destination;
                return(
                  <Link href={`/kenya-safaris/${id}`} key={id} className='rounded-[35px] shadow-lg border border-gray-200'>
                    <div className='rounded-t-[35px]'>
                      <Image src={imageUrl} alt= {name} width={500} height={500} className='w-full h-60 rounded-t-[35px] object-center object-cover'/>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between">
                         <p className="font-semibold flex items-center gap-1">
                       <Calendar className='text-blue-500 fill-blue-500' size={14}/> {numberOfDays} days
                      </p>

                      <Badge className='bg-emerald-400 text-white py-1 px-2 font-semibold'>
                        <StarIcon className='fill-amber-500 text-amber-500'/> {rating}
                      </Badge>
                      </div>
                     
                      <h1 className="font-semibold">
                        {name}
                      </h1>
                      <p className="flex items-center gap-0.5 text-sm text-gray-500 font-semibold">
                       <MapPin size={14}/> {location}
                      </p>
                    </div>
                    
                  </Link>
                )
              })
            }
          </div>
        </div>
        <SemiFooter/>
         
       </div>
    </section>
  )
}

export default Services